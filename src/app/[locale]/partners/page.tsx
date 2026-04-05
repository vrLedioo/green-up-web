"use client";

import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";

const partnerCount = 12;

export default function PartnersPage() {
  const t = useTranslations("partners");

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
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-dark/70 text-lg leading-relaxed">{t("text")}</p>
            </div>

            {/* TODO: Replace placeholder boxes with actual partner logos from client */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: partnerCount }).map((_, i) => (
                <div key={i} className="bg-white border border-green-mint/30 rounded-sm h-28 flex flex-col items-center justify-center gap-2 hover:border-green-primary/50 hover:shadow-lg hover:shadow-green-primary/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-green-pale to-green-mint flex items-center justify-center group-hover:from-green-primary/20 group-hover:to-green-medium/20 transition-all duration-300">
                    <span className="text-green-primary font-bold text-lg font-display">{String.fromCharCode(65 + i)}</span>
                  </div>
                  <span className="text-dark/40 text-xs font-semibold tracking-wider uppercase">{t("logoPlaceholder")}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
