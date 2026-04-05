"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export default function CTABanner() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;
  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="relative py-24 overflow-hidden bg-green-primary">
      {/* Diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
      />
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-green-medium/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-dark/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">{t("title")}</h2>
        <p className="text-white/70 text-lg mb-10">{t("subtitle")}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`${prefix}/contact`}
            className="inline-flex items-center gap-2 border border-white text-white font-semibold px-8 py-4 rounded-sm hover:bg-white hover:text-green-primary transition-all duration-300 text-sm tracking-wide"
          >
            <Phone size={16} /> {t("contact")}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="inline-flex items-center gap-2 bg-gold text-dark font-semibold px-8 py-4 rounded-sm hover:bg-yellow-500 transition-all duration-300 shadow-xl shadow-gold/20 text-sm tracking-wide"
          >
            {t("quote")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
