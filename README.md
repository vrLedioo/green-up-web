# Green Up — Premium Elevator Company Website

A multilingual, production-ready website for **Green Up**, a premium elevator company based in Kosovo.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — scroll animations, page transitions, counters
- **next-intl** — multilingual (Albanian, English, German)
- **Formspree** — contact form submissions

## Languages

| Code | Language | URL |
|------|----------|-----|
| `sq` | Albanian (default) | `/` |
| `en` | English | `/en/` |
| `de` | German | `/de/` |

## Getting Started

```bash
cd greenup
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page | Route |
|------|-------|
| Homepage | `/` |
| About | `/about` |
| Services | `/services` |
| Projects | `/projects` |
| Gallery | `/gallery` |
| FAQ | `/faq` |
| Contact | `/contact` |
| Partners | `/partners` |

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_ID=xzdkjeje
```

## Deployment (Netlify)

The `netlify.toml` is pre-configured. Build command: `npm run build`. Publish directory: `.next`.

## Customization Checklist

- [ ] Replace `+383 XX XXX XXX` phone placeholder with real number
- [ ] Replace `Prishtine, Kosove` address placeholder with real address
- [ ] Replace gradient image placeholders with real photos (search `TODO: Replace` in source)
- [ ] Replace partner logo placeholders with real logos (`/partners` page)
- [ ] Add real team photos (`/about` page)
- [ ] Embed real Google Maps iframe on contact page and footer
- [ ] Update social media links (Instagram, LinkedIn, TikTok) — currently `href="#"`
- [ ] Replace placeholder testimonials with real client quotes
- [ ] Update `info@greenup-ks.com` with real email
- [ ] Swap placeholder logo SVGs with real brand logo

## Brand Colors

| Name | Hex |
|------|-----|
| Primary Green | `#2D6A4F` |
| Medium Green | `#40916C` |
| Light Green | `#74C69D` |
| Mint | `#B7E4C7` |
| Pale | `#D8F3DC` |
| Dark | `#1B1B1B` |
| Cream | `#F8FAF9` |
| Gold | `#C9A84C` |
