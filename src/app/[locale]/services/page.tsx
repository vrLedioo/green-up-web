"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight, Check } from "lucide-react";
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
  "from-green-primary via-green-medium to-green-light",
  "from-green-medium via-green-light to-green-mint",
  "from-green-deep via-green-primary to-green-medium",
  "from-green-primary via-green-light to-green-mint",
  "from-ink via-green-primary to-green-medium",
  "from-green-medium via-ink to-green-primary",
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
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden noise-overlay bg-forest">
          <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
          <div aria-hidden className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-8s" }} />

          <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36">
            <span className="eyebrow text-green-mint anim-fade-up">Green Up — Kosovo</span>
            <h1 className="display-xl text-white text-[56px] md:text-[96px] lg:text-[120px] mt-4 anim-fade-up anim-delay-1">
              {page("hero.title")}
            </h1>
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">
              {page("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Services detail */}
        <section className="section-padding bg-cream">
          <div className="container-wide space-y-24">
            {serviceKeys.map((key, i) => (
              <div
                key={key}
                className="grid lg:grid-cols-12 gap-10 items-center"
              >
                {/* Image placeholder */}
                {/* TODO: Replace gradient div with real service photo */}
                <div
                  className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div
                    className={`relative w-full aspect-[5/4] rounded-[28px] bg-gradient-to-br ${serviceGradients[i]} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div aria-hidden className="absolute inset-0 noise-overlay" />
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center rounded-full px-3 py-1 glass-dark text-white text-[10px] tracking-[0.28em] uppercase font-semibold">
                        {`0${i + 1} / 0${serviceKeys.length}`}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="font-mono text-[11px] tracking-widest uppercase opacity-70 block mb-2">
                        {t(`items.${key}.title`)}
                      </span>
                      <div className="h-px bg-white/30 w-12" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="eyebrow text-green-primary">{`0${i + 1}`}</span>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink mt-4 mb-5 leading-[0.98] tracking-tight">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="text-ink/65 text-[15.5px] leading-relaxed mb-8 max-w-xl">
                    {t(`items.${key}.description`)}
                  </p>
                  <ul className="space-y-3 mb-10 max-w-md">
                    {(page.raw(`features.${key}`) as string[]).map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-ink/75 text-[14px]">
                        <span className="w-5 h-5 rounded-full bg-green-primary/10 flex items-center justify-center text-green-primary shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getHref("/contact")}
                    className="btn-base btn-solid-green cursor-pointer"
                  >
                    {page("cta.button")}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white text-center">
          <div className="container-wide max-w-2xl mx-auto">
            <span className="eyebrow text-green-primary">Green Up</span>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-ink mt-4 tracking-tight leading-[0.95]">
              {page("cta.title")}
            </h2>
            <p className="text-ink/60 text-lg mt-5 mb-10">{page("cta.subtitle")}</p>
            <Link
              href={getHref("/contact")}
              className="btn-base btn-gold cursor-pointer"
            >
              {page("cta.button")}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
