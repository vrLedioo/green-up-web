"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden noise-overlay bg-forest">
          <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
          <div aria-hidden className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-8s" }} />

          <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36">
            <span className="eyebrow text-green-mint anim-fade-up">Green Up — Kosovo</span>
            <h1 className="display-xl text-white text-[56px] md:text-[96px] lg:text-[120px] mt-4 anim-fade-up anim-delay-1">
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">{t("hero.subtitle")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-12">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden />
              <label htmlFor="faq-search" className="sr-only">{t("search")}</label>
              <input
                id="faq-search"
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-green-mint/40 rounded-2xl text-ink placeholder:text-ink/40 focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/15 transition-all"
              />
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {filtered.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={i} className="bg-white border border-green-mint/30 rounded-2xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-green-pale/30 transition-colors cursor-pointer"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                    >
                      <span className="font-semibold text-ink pr-4">{item.q}</span>
                      <span className="shrink-0 w-8 h-8 rounded-full bg-green-primary/10 flex items-center justify-center text-green-primary">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div id={`faq-panel-${i}`} className="px-6 pb-6 text-ink/70 leading-relaxed border-t border-green-mint/20 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-center text-ink/40 py-12">{t("noResults")}</p>
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
