"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export default function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;
  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[32px] bg-forest noise-overlay aurora-bg px-6 py-16 md:px-16 md:py-24">
          {/* Diagonal lines pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 56px)",
            }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 glass-dark text-white/80 text-[10px] tracking-[0.28em] uppercase font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Green Up
            </span>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[0.95] tracking-tight">
              <span className="text-gradient-emerald">{t("title")}</span>
            </h2>
            <p className="text-white/65 text-lg mt-6 mb-10 max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href={`${prefix}/contact`}
                className="btn-base btn-gold cursor-pointer"
              >
                {t("quote")}
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href={`${prefix}/contact`}
                className="btn-base btn-ghost-light cursor-pointer"
              >
                <Phone size={14} />
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
