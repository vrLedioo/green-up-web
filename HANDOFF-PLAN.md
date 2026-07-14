# 🤝 Green Up — Website Handoff Plan

> Written 2026-07-14. **UPDATE 2026-07-15: Phases 1–3 are DONE.** The site is
> live at **https://greenup-ks.com** with working email in both directions.
> Only Phase 4 (choosing the handoff model) remains — the client accepted the
> 79 €/yr managed offer (Option A), so this plan is effectively complete.
>
> Companion doc: `DOMAIN-SETUP.md` (step-by-step commands and DNS records).

---

## Current state (Phase 0 — done)

| Piece | Where | Account |
|---|---|---|
| Code | github.com/vrLedioo/green-up-web | Ledio (GitHub) |
| Hosting | Vercel project `greenup` → greenup-seven.vercel.app | Ledio (Vercel) |
| Contact-form email | Resend (sandbox) → ledionvranja2010@gmail.com | Ledio (Resend) |
| Domain | **not purchased yet** — greenup-ks.com is available | — |

Contact-form submissions currently arrive in **Ledio's** inbox (Resend sandbox
limitation). Forward anything real to the client until Phase 2 is done.

---

## Phase 1 — Domain purchase (human, one time)

**Recommended: buy through Vercel on the existing account.** This is the option
that lets Claude automate everything afterwards, because DNS then lives in the
same Vercel project it already controls.

- Vercel dashboard → project `greenup` → Settings → Domains → type
  `greenup-ks.com` → **Buy** (~$15–20/yr, card required).
- If the **client** wants to own/pay for the domain himself at another registrar
  (Namecheap, GoDaddy, etc.): fine — but then, at that registrar, set the
  nameservers to **`ns1.vercel-dns.com` / `ns2.vercel-dns.com`**. That one manual
  step delegates DNS to Vercel and unlocks the same automation. The client keeps
  ownership; renewal invoices go to him.

**When done, just tell Claude: "the domain is bought"** (mention where, if not Vercel).

## Phase 2 — Claude configures everything (~15 min, automated)

Once the domain resolves to Vercel DNS, Claude can do all of this via CLI/API
without any human input:

1. Attach `greenup-ks.com` + `www.greenup-ks.com` to the Vercel project
   (www → apex redirect), SSL auto-provisions.
2. Set `NEXT_PUBLIC_SITE_URL=https://greenup-ks.com` → sitemap, canonical URLs,
   Open Graph, robots all switch automatically.
3. Register the domain in Resend via their API, add the SPF/DKIM/DMARC records
   through Vercel DNS, and trigger verification.
4. After Resend shows *Verified*: switch env vars
   `CONTACT_FROM=Green Up <info@greenup-ks.com>` and
   `CONTACT_TO=bujarmorina@gmail.com` → **form submissions now go straight to
   the client**, sent from his own domain.
5. Redeploy and re-run the full test suite (all routes, all 3 languages, live
   form submission, security headers, origin checks).

**What Claude cannot do in this phase:** nothing — this phase is fully automatable,
*provided* Phase 1 put DNS on Vercel.

## Phase 3 — Incoming mail at info@greenup-ks.com (5 min human + automated rest)

Resend only sends. For the client to *receive* mail sent to info@:

1. **Human:** create a free ImprovMX account (improvmx.com) and add the domain
   with alias `info` → `bujarmorina@gmail.com`. (Free tier is enough.)
2. **Claude:** adds the two ImprovMX MX records + SPF merge via Vercel DNS and
   verifies mail flow with a test message.

Upgrade path (optional, later): Google Workspace (~$7/mo) if the client needs to
**reply from** info@greenup-ks.com — see DOMAIN-SETUP.md for the comparison.

## Phase 4 — Handoff model (decide with the client)

Two clean options:

**Option A — Managed (recommended for a non-technical client):**
Everything stays on Ledio's accounts (GitHub/Vercel/Resend). Ledio maintains the
site; the client owns the domain (if bought on his registrar) and pays Ledio a
small yearly maintenance fee covering hosting attention, content updates, and
renewals. Simplest for the client; nothing to teach him.

**Option B — Full transfer:**
- Client creates his own GitHub + Vercel + Resend accounts.
- Transfer the GitHub repo (Settings → Transfer ownership) and the Vercel
  project (Settings → Transfer), re-enter the 3 env vars, re-create the Resend
  API key under his account.
- Hand over this document + DOMAIN-SETUP.md + the credentials list below.

Either way, hand the client:
- URL of the live site + admin URLs (Vercel dashboard, Resend dashboard)
- Where content lives: all text in `src/locales/{sq,en,de}/common.json`,
  photos in `public/images/projects/`, videos in `public/videos/`
- The contact-form inbox is `bujarmorina@gmail.com` (after Phase 2)

### ⚠️ One billing note
Vercel's free **Hobby plan is licensed for personal, non-commercial use**. A
company website technically belongs on Vercel Pro ($20/mo) — or move the client
to Option B with his own Pro account, or host the static output elsewhere. Low
enforcement risk at this traffic level, but the client should know before launch
marketing starts.

## Checklist snapshot

- [x] Site live, 3 languages, real media, privacy/GDPR pass, hardened API
- [x] Contact form working end-to-end (sandbox inbox)
- [x] Phase 1: buy greenup-ks.com (client bought it on **Porkbun**, 2026-07-14)
- [x] Phase 2: domain + Resend wiring (done 2026-07-15 — see notes below)
- [x] Phase 3: info@ forwarding (ImprovMX active; info@/sales@ → client Gmail)
- [x] Phase 4: handoff model = **Option A (managed, 79 €/yr)** — client accepted

## As-built notes (2026-07-15)

| Piece | State |
|---|---|
| Domain | greenup-ks.com on client's **Porkbun**; nameservers → ns1/ns2.vercel-dns.com (switched via Porkbun API) |
| Site | https://greenup-ks.com (apex) + www → apex 308 redirect; SSL auto |
| DNS | Managed in Vercel (`vercel dns ls greenup-ks.com`): ImprovMX MX ×2 + SPF on apex, Resend DKIM/SPF/MX on `send` subdomain |
| Outbound email | **Dedicated Green Up Resend account** (old key belongs to Hyperyzer). Domain verified; form sends as `Green Up <info@greenup-ks.com>` → `CONTACT_TO=bujarmorina@gmail.com` |
| Inbound email | ImprovMX free: `info@`/`sales@` → bujarmorina@gmail.com, catch-all `*` → ilir.vranja@gmail.com |
| SEO | `NEXT_PUBLIC_SITE_URL=https://greenup-ks.com` — sitemap/canonical/hreflang all on the new domain |
| Credentials | Porkbun + ImprovMX API keys in local gitignored `.env.porkbun.local`; Resend key in `.env.local` + Vercel env |
