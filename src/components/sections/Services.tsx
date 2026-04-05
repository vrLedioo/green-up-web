"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Wrench, Home, ArrowUpDown, Shield, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

function ElevatorIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 7l4-4 4 4M8 17l4 4 4-4" />
      <line x1="12" y1="3" x2="12" y2="21" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

function AccessibilityIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="1.5" />
      <path d="M9 9h6l-1 6-2 4-2-4-1-6" />
      <path d="M8 14H5M19 14h-3" />
    </svg>
  );
}

const serviceIcons = [ElevatorIcon, Wrench, Home, AccessibilityIcon, ArrowUpDown, Shield];
const serviceKeys = ["installation", "maintenance", "homelift", "accessibility", "escalators", "security"] as const;
const glowColors = [
  "hover:shadow-green-primary/20",
  "hover:shadow-green-medium/20",
  "hover:shadow-green-primary/20",
  "hover:shadow-green-medium/20",
  "hover:shadow-green-primary/20",
  "hover:shadow-green-medium/20",
];

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="section-padding bg-cream" id="services">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-primary text-sm font-semibold uppercase tracking-widest">— {t("title")} —</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mt-3 mb-4">{t("title")}</h2>
          <p className="text-dark/60 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Grid — always visible, hover animations only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={key}
                className={`group relative bg-white border border-green-mint/30 rounded-sm p-7 hover:border-green-primary/50 hover:shadow-xl ${glowColors[i]} transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 to-green-medium/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-sm bg-green-primary/10 flex items-center justify-center text-green-primary mb-5 group-hover:bg-green-primary group-hover:text-white transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-dark mb-2">{t(`items.${key}.title`)}</h3>
                  <p className="text-dark/60 text-sm leading-relaxed mb-5">{t(`items.${key}.description`)}</p>
                  <Link
                    href={`${prefix}/services`}
                    className="inline-flex items-center gap-1 text-green-primary text-sm font-semibold hover:gap-2 transition-all duration-200"
                  >
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
