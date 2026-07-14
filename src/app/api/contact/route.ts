/**
 * POST /api/contact — delivers contact-form submissions via Resend.
 *
 * Security controls (OWASP mapping):
 *   A03 Injection       — Zod schema rejects unexpected fields / types / lengths;
 *                         user text is HTML-escaped before being embedded in the email
 *   A04 Insecure Design — Honeypot field silently drops bot submissions
 *   A05 Misconfiguration— RESEND_API_KEY / CONTACT_TO are server-only env vars
 *   A07 Auth Failures   — IP-based rate limit: 5 submissions per 15 min per client
 *   A09 Logging         — Failures are logged; PII (email, message) is NOT logged
 *
 * Env vars:
 *   RESEND_API_KEY — required. From resend.com → API Keys.
 *   CONTACT_TO     — required. Inbox that receives the submissions.
 *   CONTACT_FROM   — optional. Defaults to Resend's shared onboarding sender;
 *                    switch to e.g. "Green Up <info@greenup-ks.com>" once the
 *                    greenup-ks.com domain is verified in Resend.
 *
 * NOTE: The in-memory rate-limit Map is sufficient for a single serverless
 * instance. If you ever scale out, replace it with Upstash Redis.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Input schema ─────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email address").max(254, "Email too long").toLowerCase(),
  phone: z
    .string()
    .max(30, "Phone too long")
    .regex(/^[+\d\s\-().]*$/, "Invalid phone format")
    .optional()
    .default(""),
  type: z.enum(["quote", "maintenance", "info", "other"] as const, {
    error: "Invalid request type",
  }),
  message: z
    .string()
    .min(10, "Message is too short (10 chars minimum)")
    .max(5000, "Message is too long (5000 chars maximum)")
    .trim(),
  // Honeypot: must be empty — bots fill every visible-ish field
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

// ─── Rate limiter (in-memory) ─────────────────────────────────────────────────

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ─── Email rendering ──────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  quote: "Ofertë çmimi / Price quote",
  maintenance: "Mirëmbajtje / Maintenance",
  info: "Informacion / Information",
  other: "Tjetër / Other",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(data: { name: string; email: string; phone: string; type: string; message: string }) {
  const rows: [string, string][] = [
    ["Emri / Name", data.name],
    ["Email", data.email],
    ["Telefoni / Phone", data.phone || "—"],
    ["Lloji / Type", TYPE_LABELS[data.type] ?? data.type],
  ];
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1B1B1B">
    <div style="background:#2D6A4F;padding:18px 24px;border-radius:12px 12px 0 0">
      <h2 style="color:#fff;margin:0;font-size:18px">Green Up — Mesazh i ri nga web-faqja</h2>
    </div>
    <div style="border:1px solid #B7E4C7;border-top:0;border-radius:0 0 12px 12px;padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 0;color:#777;width:150px;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <hr style="border:0;border-top:1px solid #eee;margin:16px 0" />
      <p style="font-size:13px;color:#777;margin:0 0 6px">Mesazhi / Message:</p>
      <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
    </div>
  </div>`;

  const text = [
    "Green Up — Mesazh i ri nga web-faqja",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mesazhi / Message:",
    data.message,
  ].join("\n");

  return { html, text };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);

  // 1. Rate limit check
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    console.warn(`[contact] rate-limit exceeded ip=${ip}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 2. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    console.warn(`[contact] bad-json ip=${ip}`);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // 3. Validate with Zod
  const parsed = ContactSchema.safeParse(rawBody);
  if (!parsed.success) {
    const failedFields = Object.keys(parsed.error.flatten().fieldErrors);
    console.warn(`[contact] validation-failed ip=${ip} fields=${failedFields.join(",")}`);
    return NextResponse.json(
      { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { honeypot, ...formData } = parsed.data;

  // 4. Honeypot — silently accept to avoid tipping off bots
  if (honeypot) {
    console.warn(`[contact] honeypot-triggered ip=${ip}`);
    return NextResponse.json({ ok: true });
  }

  // 5. Ensure Resend is configured (OWASP A05 — no secrets in code)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY / CONTACT_TO env vars are not set");
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }
  const from = process.env.CONTACT_FROM ?? "Green Up Website <onboarding@resend.dev>";

  // 6. Send via Resend from the server (key never reaches the client bundle)
  const { html, text } = renderEmail(formData);
  let resendRes: Response;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: formData.email,
        subject: `[Green Up] ${TYPE_LABELS[formData.type] ?? formData.type} — ${formData.name}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error(`[contact] resend-network-error ip=${ip} err=${msg}`);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  if (!resendRes.ok) {
    // Resend returns a JSON error body — log status + error name only (no PII)
    let detail = "";
    try {
      const body = (await resendRes.json()) as { name?: string; message?: string };
      detail = body.name ?? "";
    } catch { /* ignore body parse errors */ }
    console.error(`[contact] resend-error ip=${ip} status=${resendRes.status} name=${detail}`);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  // 7. Success — log without PII
  console.info(`[contact] submitted ip=${ip} type=${formData.type} remaining=${remaining}`);
  return NextResponse.json(
    { ok: true },
    { headers: { "X-RateLimit-Remaining": String(remaining) } }
  );
}

// Only POST is allowed on this route
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
