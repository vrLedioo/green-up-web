"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Wrench, Home, ArrowUpDown, Shield, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

function ElevatorIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 7l4-4 4 4M8 17l4 4 4-4" />
      <line x1="12" y1="3" x2="12" y2="21" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

function AccessibilityIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="1.5" />
      <path d="M9 9h6l-1 6-2 4-2-4-1-6" />
      <path d="M8 14H5M19 14h-3" />
    </svg>
  );
}

const serviceIcons = [ElevatorIcon, Wrench, Home, AccessibilityIcon, ArrowUpDown, Shield];
const serviceKeys = ["installation", "maintenance", "homelift", "accessibility", "escalators", "security"] as const;

// Bento layout: first + fourth tiles span 2 columns on lg
const tileSpan = [
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="relative section-padding bg-forest-soft overflow-hidden" id="services">
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-green-mint/50 blur-3xl pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="eyebrow text-green-primary">{t("title")}</span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-ink mt-4 leading-[0.95] tracking-tight">
              {t("subtitle")}
            </h2>
          </div>
          <Link
            href={`${prefix}/services`}
            className="link-arrow self-start md:self-end cursor-pointer"
          >
            {t("learnMore")}
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i];
            const isWide = tileSpan[i].includes("col-span-2");
            return (
              <Link
                key={key}
                href={`${prefix}/services`}
                className={`group relative rounded-[22px] bg-white/80 backdrop-blur-md border border-white/60 p-7 lift iridescent-border overflow-hidden cursor-pointer ${tileSpan[i]}`}
                style={{ minHeight: isWide ? "260px" : "240px" }}
              >
                {/* Ambient gradient */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 0%, rgba(64,145,108,0.18), transparent 60%), radial-gradient(circle at 0% 100%, rgba(201,168,76,0.12), transparent 55%)",
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-primary to-green-medium flex items-center justify-center text-white shadow-lg shadow-green-primary/20 transition-transform duration-500 group-hover:rotate-[-4deg]">
                      <Icon />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-ink/30">
                      {`0${i + 1}`}
                    </span>
                  </div>

                  <h3 className="font-display text-[26px] md:text-[30px] font-medium text-ink mt-6 leading-tight">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-ink/60 text-[14.5px] leading-relaxed mt-2 max-w-md">
                    {t(`items.${key}.description`)}
                  </p>

                  <div className="mt-auto pt-5 flex items-center gap-2 text-green-primary text-sm font-semibold transition-all duration-300 group-hover:gap-3">
                    {t("learnMore")}
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
