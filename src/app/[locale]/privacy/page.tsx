"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";

interface PrivacySection {
  h: string;
  body: string[];
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative min-h-[40vh] flex items-end pb-16 overflow-hidden noise-overlay bg-forest">
          <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
          <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36">
            <span className="eyebrow text-green-mint anim-fade-up">Green Up — Kosovo</span>
            <h1 className="display-xl text-white text-[44px] md:text-[72px] mt-4 anim-fade-up anim-delay-1">
              {t("title")}
            </h1>
            <p className="text-white/50 text-sm mt-5 font-mono anim-fade-up anim-delay-2">{t("updated")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide max-w-3xl">
            <p className="text-ink/70 text-[15.5px] leading-relaxed mb-12">{t("intro")}</p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="flex items-center gap-2.5 font-display text-2xl md:text-[28px] font-medium text-ink tracking-tight mb-4">
                    <span className="w-6 h-px bg-green-primary shrink-0" />
                    {section.h}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((p, j) => (
                      <p key={j} className="text-ink/65 text-[14.5px] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
