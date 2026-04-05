"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const serviceKeys = [
  "installation",
  "maintenance",
  "homelift",
  "accessibility",
  "escalators",
  "security",
] as const;

const serviceGradients = [
  "from-green-primary to-green-medium",
  "from-green-medium to-green-light",
  "from-[#1a4332] to-green-primary",
  "from-green-primary to-green-mint",
  "from-dark to-green-primary",
  "from-green-medium to-dark",
];


export default function ServicesPage() {
  const t = useTranslations("services");
  const page = useTranslations("servicesPage");
  const locale = useLocale() as Locale;

  const getHref = (path: string) => {
    const prefix = locale !== "sq" ? `/${locale}` : "";
    return `${prefix}${path}`;
  };

  return (
    <>
      <EmergencyBanner />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden noise-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2d1f] via-[#1a4332] to-[#2D6A4F]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-32">
            <div>
              <span className="text-green-mint text-sm font-semibold uppercase tracking-widest">
                — Green Up —
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-bold text-white mt-3">
                {page("hero.title")}
              </h1>
              <p className="text-white/70 text-xl mt-4 max-w-xl">
                {page("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Services detail */}
        <section className="section-padding bg-cream">
          <div className="container-wide space-y-20">
            {serviceKeys.map((key, i) => (
              <div
                key={key}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image placeholder */}
                {/* TODO: Replace gradient div with real service photo */}
                <div
                  className={`${i % 2 === 1 ? "lg:order-2" : ""} w-full h-72 md:h-96 rounded-sm bg-gradient-to-br ${serviceGradients[i]} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
                      {t(`items.${key}.title`)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-green-primary text-sm font-semibold uppercase tracking-widest">
                    0{i + 1} —
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mt-2 mb-4">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="text-dark/70 text-lg leading-relaxed mb-6">
                    {t(`items.${key}.description`)}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {(page.raw(`features.${key}`) as string[]).map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-dark/80 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getHref("/contact")}
                    className="inline-flex items-center gap-2 bg-green-primary text-white font-semibold px-6 py-3 rounded-sm hover:bg-green-medium transition-colors text-sm"
                  >
                    {page("cta.button")} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white text-center">
          <div className="container-wide max-w-2xl mx-auto">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
                {page("cta.title")}
              </h2>
              <p className="text-dark/60 text-lg mb-8">{page("cta.subtitle")}</p>
              <Link
                href={getHref("/contact")}
                className="inline-flex items-center gap-2 bg-green-primary text-white font-semibold px-8 py-4 rounded-sm hover:bg-green-medium transition-colors"
              >
                {page("cta.button")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
