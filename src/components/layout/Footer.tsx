"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
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
  const hero = useTranslations("hero");
  const locale = useLocale() as Locale;

  const getHref = (path: string) => {
    const prefix = locale !== "sq" ? `/${locale}` : "";
    return path === "/" ? prefix || "/" : `${prefix}${path}`;
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-forest text-white overflow-hidden noise-overlay">
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-green-medium/20 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative container-wide px-4 md:px-8 lg:px-16 pt-20 pb-10">
        {/* Big editorial headline */}
        <div className="max-w-4xl mb-16">
          <span className="eyebrow text-green-mint">{t("tagline")}</span>
          <h3 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight mt-4">
            <span className="text-gradient-emerald">{hero("headline")}</span>
          </h3>
          <div className="mt-8">
            <Link
              href={getHref("/contact")}
              className="btn-base btn-gold cursor-pointer"
            >
              {nav("getQuote")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-14">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo-white.svg"
              alt="Green Up"
              width={120}
              height={32}
              className="mb-5"
            />
            <p className="text-white/55 text-[13px] leading-relaxed mb-6 max-w-xs">
              {t("aboutText")}
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: InstagramIcon, label: "Instagram" },
                { icon: LinkedInIcon,  label: "LinkedIn" },
                { icon: TikTokIcon,    label: "TikTok" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-gold/60 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="font-display text-xl text-white mb-5">{t("pages")}</h4>
            <ul className="space-y-2.5">
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
                    className="text-white/55 hover:text-white text-[13.5px] transition-colors cursor-pointer"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-display text-xl text-white mb-5">{t("services")}</h4>
            <ul className="space-y-2.5">
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
                    className="text-white/55 hover:text-white text-[13.5px] transition-colors cursor-pointer"
                  >
                    {services(`${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-xl text-white mb-5">{t("contact")}</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-white/55 text-[13.5px]">
                <MapPin size={15} className="mt-0.5 text-gold shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li>
                <a
                  href={`tel:${t("phone")}`}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-[13.5px] transition-colors cursor-pointer"
                >
                  <Phone size={15} className="text-gold shrink-0" />
                  <span className="font-mono">{t("phone")}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-[13.5px] transition-colors cursor-pointer"
                >
                  <Mail size={15} className="text-gold shrink-0" />
                  <span>{t("email")}</span>
                </a>
              </li>
            </ul>

            {/* Maps placeholder */}
            {/* TODO: Replace with real Google Maps embed when address is confirmed */}
            <div className="mt-6 w-full h-28 rounded-xl glass-dark flex items-center justify-center text-white/35 text-xs">
              Google Maps · Prishtinë, Kosovë
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-[12px]">
          <p>© {year} Green Up. {t("rights")}</p>
          <p className="font-mono tracking-wide">{t("builtBy")}</p>
        </div>
      </div>
    </footer>
  );
}
