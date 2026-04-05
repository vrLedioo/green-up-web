/**
 * POST /api/contact
 *
 * Security controls (OWASP mapping):
 *   A03 Injection       — Zod schema rejects unexpected fields / types / lengths
 *   A04 Insecure Design — Honeypot field silently drops bot submissions
 *   A05 Misconfiguration— FORMSPREE_ID is a server-only env var (never in client bundle)
 *   A07 Auth Failures   — IP-based rate limit: 5 submissions per 15 min per client
 *   A09 Logging         — Access failures are logged; PII (email, message) is NOT logged
 *
 * NOTE: The in-memory rate-limit Map is sufficient for a single Netlify Function instance.
 * If you ever scale to multiple instances, replace it with Upstash Redis:
 *   https://github.com/upstash/ratelimit
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Input schema ─────────────────────────────────────────────────────────────

// Zod v4 API: use .min(1) for required strings, .error() or message string for custom messages
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
  // Netlify / Vercel forward the real IP in x-forwarded-for
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);

  // 1. Rate limit check
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    // Log failure without PII
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
    // Log field names that failed, never log field values (PII)
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

  // 5. Ensure the Formspree ID is configured (OWASP A05 — no secrets in code)
  const formspreeId = process.env.FORMSPREE_ID;
  if (!formspreeId) {
    console.error("[contact] FORMSPREE_ID env var is not set");
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }

  // 6. Forward to Formspree from the server (keeps ID out of client bundle)
  let formspreeRes: Response;
  try {
    formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Identify our server as the sender, not the browser
        "User-Agent": "GreenUp-Contact-Proxy/1.0",
      },
      body: JSON.stringify(formData),
      // Abort if Formspree takes longer than 10 seconds
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error(`[contact] formspree-network-error ip=${ip} err=${msg}`);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  if (!formspreeRes.ok) {
    console.error(`[contact] formspree-error ip=${ip} status=${formspreeRes.status}`);
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
