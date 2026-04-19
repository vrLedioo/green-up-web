"use client";

import { useTranslations } from "next-intl";
import { Globe, Award, Users, Shield } from "lucide-react";

const icons = [Globe, Award, Users, Shield];

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const itemKeys = ["coverage", "certified", "team", "warranty"] as const;

  return (
    <section className="relative section-padding bg-cream overflow-hidden" id="why-us">
      <div aria-hidden className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-mint/30 blur-3xl anim-aurora pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-10s" }} />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: editorial stat panel */}
          <div className="lg:col-span-5">
            <span className="eyebrow text-green-primary">{t("title")}</span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-ink mt-4 leading-[0.95] tracking-tight">
              {t("subtitle")}
            </h2>

            {/* Decorative stat tile */}
            <div className="mt-10 relative rounded-[28px] overflow-hidden bg-forest p-8 noise-overlay aspect-[4/5] max-w-md">
              <div aria-hidden className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative flex flex-col h-full text-white">
                <div className="eyebrow text-white/70">
                  Green Up — Est. 2010
                </div>

                <div className="mt-auto">
                  <div className="font-display text-[108px] leading-[0.85] font-medium text-gradient-emerald">
                    500+
                  </div>
                  <div className="text-white/60 text-sm tracking-wide mt-2">
                    Projekte të instaluara në Kosovë dhe rajon, nga rezidenca te qendra tregtare dhe hotele.
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-2xl text-white">15<span className="text-gold">+</span></div>
                    <div className="text-[10px] text-white/60 uppercase tracking-[0.22em] mt-1">Vjet</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl text-white">24<span className="text-gold">/7</span></div>
                    <div className="text-[10px] text-white/60 uppercase tracking-[0.22em] mt-1">Urgjencë</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: items */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {itemKeys.map((key, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={key}
                    className="group relative rounded-2xl bg-white border border-green-mint/30 p-6 lift overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-green-pale/0 group-hover:bg-green-pale/70 blur-2xl transition-colors duration-500"
                    />
                    <div className="relative flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-primary to-green-medium flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-primary/20 transition-transform duration-500 group-hover:rotate-[-4deg]">
                        <Icon size={19} />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] text-ink/40 tracking-widest mb-1">
                          {`0${i + 1}`}
                        </div>
                        <p className="font-display text-xl text-ink font-medium leading-snug">
                          {t(`items.${key}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
