"use client";

import { useTranslations } from "next-intl";
import { Globe, Award, Users, Shield } from "lucide-react";

const icons = [Globe, Award, Users, Shield];

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const itemKeys = ["coverage", "certified", "team", "warranty"] as const;

  return (
    <section className="section-padding bg-cream overflow-hidden" id="why-us">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: decorative shape */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px]">
              <div
                className="absolute inset-0 bg-gradient-to-br from-green-primary to-green-medium"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%", transform: "rotate(-6deg)" }}
              />
              <div
                className="absolute inset-4 bg-gradient-to-br from-green-medium to-green-light opacity-40"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%", transform: "rotate(-3deg)" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
                <div className="text-center">
                  <div className="font-mono text-6xl font-bold">500<span className="text-gold">+</span></div>
                  <div className="text-sm tracking-widest uppercase opacity-80 mt-1">Projekte</div>
                </div>
                <div className="w-16 h-px bg-white/30" />
                <div className="text-center">
                  <div className="font-mono text-6xl font-bold">15<span className="text-gold">+</span></div>
                  <div className="text-sm tracking-widest uppercase opacity-80 mt-1">Vjet</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-primary/30" />
                ))}
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <span className="text-green-primary text-sm font-semibold uppercase tracking-widest">— {t("title")} —</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mt-3 mb-3">{t("title")}</h2>
            <p className="text-dark/60 text-lg mb-10">{t("subtitle")}</p>

            <div className="space-y-6">
              {itemKeys.map((key, i) => {
                const Icon = icons[i];
                return (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-sm bg-green-primary flex items-center justify-center text-white shrink-0">
                      <Icon size={20} />
                    </div>
                    <p className="text-dark font-semibold text-base pt-2">{t(`items.${key}`)}</p>
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
