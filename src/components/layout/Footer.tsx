"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.77a4.85 4.85 0 01-1.01-.08z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const services = useTranslations("services.items");
  const locale = useLocale() as Locale;

  const getHref = (path: string) => {
    const prefix = locale !== "sq" ? `/${locale}` : "";
    return path === "/" ? prefix || "/" : `${prefix}${path}`;
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <Image
              src="/logo-white.svg"
              alt="Green Up"
              width={130}
              height={34}
              className="mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {t("aboutText")}
            </p>
            <p className="text-green-mint text-xs italic mb-4">{t("tagline")}</p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-green-mint mb-4">
              {t("pages")}
            </h4>
            <ul className="space-y-2">
              {(
                [
                  ["home", "/"],
                  ["about", "/about"],
                  ["services", "/services"],
                  ["projects", "/projects"],
                  ["gallery", "/gallery"],
                  ["faq", "/faq"],
                  ["contact", "/contact"],
                  ["partners", "/partners"],
                ] as const
              ).map(([key, path]) => (
                <li key={key}>
                  <Link
                    href={getHref(path)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-green-mint mb-4">
              {t("services")}
            </h4>
            <ul className="space-y-2">
              {(
                [
                  "installation",
                  "maintenance",
                  "homelift",
                  "accessibility",
                  "escalators",
                  "security",
                ] as const
              ).map((key) => (
                <li key={key}>
                  <Link
                    href={getHref("/services")}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {services(`${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-green-mint mb-4">
              {t("contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 text-gold shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li>
                <a
                  href={`tel:${t("phone")}`}
                  className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Phone size={15} className="text-gold shrink-0" />
                  <span className="font-mono">{t("phone")}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Mail size={15} className="text-gold shrink-0" />
                  <span>{t("email")}</span>
                </a>
              </li>
            </ul>

            {/* Maps placeholder */}
            {/* TODO: Replace with real Google Maps embed when address is confirmed */}
            <div className="mt-5 w-full h-28 bg-white/5 border border-white/10 rounded flex items-center justify-center text-white/30 text-xs">
              Google Maps · Prishtinë, Kosovë
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>
            © {year} Green Up. {t("rights")}
          </p>
          <p>{t("builtBy")} ♥</p>
        </div>
      </div>
    </footer>
  );
}
