"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";

const partnerCount = 12;

export default function PartnersPage() {
  const t = useTranslations("partners");

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
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-ink/70 text-lg leading-relaxed">{t("text")}</p>
            </div>

            {/* TODO: Replace placeholder boxes with actual partner logos from client */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: partnerCount }).map((_, i) => (
                <div key={i} className="bg-white border border-green-mint/30 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 hover:border-green-primary/50 hover:shadow-xl hover:shadow-green-primary/10 transition-all duration-300 group lift">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-pale to-green-mint flex items-center justify-center group-hover:from-green-primary/20 group-hover:to-green-medium/20 transition-all duration-300">
                    <span className="text-green-primary font-medium text-xl font-display">{String.fromCharCode(65 + i)}</span>
                  </div>
                  <span className="text-ink/40 text-[10px] font-semibold tracking-[0.2em] uppercase">{t("logoPlaceholder")}</span>
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
