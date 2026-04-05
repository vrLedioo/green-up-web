"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import { Plus, Minus, Search } from "lucide-react";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const items = t.raw("items") as Array<{ q: string; a: string }>;
  const filtered = items.filter(
    (item) => item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <EmergencyBanner />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden noise-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2d1f] via-[#1a4332] to-[#2D6A4F]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-32">
            <span className="text-green-mint text-sm font-semibold uppercase tracking-widest anim-fade-up">— Green Up —</span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mt-3 anim-fade-up anim-delay-1">{t("hero.title")}</h1>
            <p className="text-white/70 text-xl mt-4 anim-fade-up anim-delay-2">{t("hero.subtitle")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-12">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" />
              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-green-mint/40 rounded-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-green-primary transition-colors"
              />
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <div key={i} className="bg-white border border-green-mint/30 rounded-sm overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-green-pale/30 transition-colors"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  >
                    <span className="font-semibold text-dark pr-4">{item.q}</span>
                    <span className="shrink-0 text-green-primary">
                      {openIdx === i ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {openIdx === i && (
                    <div className="px-6 pb-6 text-dark/70 leading-relaxed border-t border-green-mint/20 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-dark/40 py-12">Nuk u gjet asgjë.</p>
              )}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
