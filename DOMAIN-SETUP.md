# 🌐 Domain & Email Setup — greenup-ks.com

> Status as of 2026-07-14: **greenup-ks.com is unregistered and available.**
> The site is live at https://greenup-seven.vercel.app until the domain is purchased.
> Everything below is a one-time setup, ~30 minutes total.

---

## Step 1 — Buy the domain

Vercel does not allow AI agents to purchase domains, so this must be done by a person.

**Option A — Vercel (easiest, auto-configures DNS):**
1. Go to https://vercel.com/ledionvranja2010-1577s-projects/greenup/settings/domains
2. Type `greenup-ks.com` → **Buy** (~$15–20/year, requires a card on the Vercel account)
3. Vercel attaches it to the project and provisions SSL automatically. Done.

**Option B — Namecheap/Cloudflare (often cheaper):**
1. Buy `greenup-ks.com` at the registrar.
2. In Vercel → Project → Settings → Domains → Add `greenup-ks.com` and `www.greenup-ks.com`.
3. At the registrar, set the DNS records Vercel shows you (A record `76.76.21.21` for apex, CNAME `cname.vercel-dns.com` for www).

## Step 2 — Point the site at the new domain

In Vercel → Project → Settings → Environment Variables, add (Production):

```
NEXT_PUBLIC_SITE_URL=https://greenup-ks.com
```

Then redeploy (Deployments → ⋯ → Redeploy). This updates the sitemap, robots.txt, canonical URLs, and Open Graph links.

## Step 3 — Verify the domain in Resend (outgoing email)

Right now the contact form sends from Resend's shared sandbox sender, and **Resend sandbox
only delivers to the account owner's inbox (ledionvranja2010@gmail.com)**. Verifying the
domain removes both limits.

1. Log in at https://resend.com/domains → **Add Domain** → `greenup-ks.com`
2. Resend shows 3 DNS records (SPF TXT, DKIM TXT, optional DMARC). Add them:
   - If domain bought via Vercel: Vercel → Domains → greenup-ks.com → DNS Records
   - Otherwise: at your registrar's DNS panel
3. Wait for Resend to show **Verified** (minutes to a few hours).
4. Update the Vercel env vars (Production) and redeploy:

```
CONTACT_FROM=Green Up <info@greenup-ks.com>
CONTACT_TO=bujarmorina@gmail.com
```

After this, every contact-form submission lands in **bujarmorina@gmail.com**, sent from
info@greenup-ks.com, with Reply-To set to the customer's address.

## Step 4 — Receiving email at info@greenup-ks.com (incoming)

Resend only *sends*. To *receive* mail at info@greenup-ks.com, pick one:

**Free — email forwarding (recommended to start):**
- **Cloudflare Email Routing** (if DNS is on Cloudflare) or **ImprovMX** (works anywhere, free tier):
  create a rule `info@greenup-ks.com → bujarmorina@gmail.com`. Takes 5 minutes, costs nothing.
- Limitation: replies from Gmail will show `bujarmorina@gmail.com` as sender
  (Gmail's "Send mail as" can mask this using Resend SMTP, but it's fiddly).

**Paid — Google Workspace (~$7/user/month):**
- Real mailbox `info@greenup-ks.com` with Gmail interface, send *and* receive as info@,
  calendar, Drive. The professional option once the business relies on email.

### Recommendation
Start free: **Resend (verified domain) for the contact form + ImprovMX/Cloudflare forwarding
for incoming mail.** Upgrade to Google Workspace only when the client needs to *reply from*
info@greenup-ks.com regularly. Resend and Workspace coexist fine (separate DNS records).

## Current environment variables (reference)

| Variable | Local `.env.local` | Vercel Production | After domain verified |
|---|---|---|---|
| `RESEND_API_KEY` | set | set | unchanged |
| `CONTACT_TO` | ledionvranja2010@gmail.com | ledionvranja2010@gmail.com | `bujarmorina@gmail.com` |
| `CONTACT_FROM` | (default sandbox sender) | (default sandbox sender) | `Green Up <info@greenup-ks.com>` |
| `NEXT_PUBLIC_SITE_URL` | (default vercel.app) | (default vercel.app) | `https://greenup-ks.com` |

> ⚠️ The Resend API key is a secret. It lives only in `.env.local` (gitignored) and
> Vercel env vars — never commit it to the repository.
