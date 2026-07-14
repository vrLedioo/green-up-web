import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const isDev = process.env.NODE_ENV === "development";

// OWASP A05 — Security Misconfiguration
// All headers are applied to every route via the catch-all matcher.
const securityHeaders = [
  // Prevent the site from being embedded in iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Isolate the browsing context from cross-origin windows (Spectre-class leaks,
  // window.opener abuse). No OAuth popups on this site, so same-origin is safe.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Block other origins from embedding our images/videos/fonts (hotlinking +
  // cross-site inclusion). Social-media crawlers fetch og:image server-side,
  // so link previews are unaffected.
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Legacy Flash/PDF cross-domain policy files — explicitly forbid
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // Disable unused browser features (OWASP A05 / Permissions Policy).
  // fullscreen stays enabled for self (project videos) and the consented
  // Google Maps iframe ("View larger map" / fullscreen control).
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "bluetooth=()",
      "serial=()",
      "midi=()",
      "display-capture=()",
      "xr-spatial-tracking=()",
      'fullscreen=(self "https://www.google.com")',
    ].join(", "),
  },
  // Force HTTPS for 1 year, include subdomains (only effective on HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content Security Policy
  // Notes:
  //   • script-src 'unsafe-inline': required for Next.js hydration JSON blobs and
  //     Framer Motion inline animation styles in the App Router.
  //   • script-src 'unsafe-eval': required in development mode only — React dev tools
  //     use eval() to reconstruct call stacks across server/client boundaries (Turbopack).
  //     Production builds never use eval(), so this directive is omitted in prod.
  //   • style-src 'unsafe-inline': required for Tailwind's utility classes applied at runtime.
  //   • connect-src 'self' + ws://localhost: dev HMR WebSocket (Turbopack). Prod: 'self' only.
  //   • connect-src 'self': form now posts to /api/contact (same origin) — no client-side
  //     calls to formspree.io any more.
  //   • If you add Google Analytics, reCAPTCHA, or other third-party scripts in the
  //     future, extend the relevant directives here.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      isDev
        ? "connect-src 'self' ws://localhost:* http://localhost:*"
        : "connect-src 'self'",
      // Project videos are served from /videos (same origin)
      "media-src 'self'",
      "object-src 'none'",
      // Google Maps embed in Footer / contact / about. No other iframes are allowed.
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      ...(!isDev ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // API responses must never be cached or indexed
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
