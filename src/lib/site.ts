/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL (e.g. https://www.greenup-ks.com)
 * once the custom domain is attached; falls back to the Vercel production URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://greenup-seven.vercel.app";
