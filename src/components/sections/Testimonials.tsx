"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const items = t.raw("items") as Array<{ text: string; name: string; company: string }>;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % items.length), 6500);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const item = items[current];

  return (
    <section className="relative section-padding bg-cream overflow-hidden" id="testimonials">
      <div aria-hidden className="absolute -top-20 left-0 w-[440px] h-[440px] rounded-full bg-green-mint/30 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-20 right-0 w-[360px] h-[360px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="eyebrow text-green-primary">{t("title")}</span>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-ink mt-4 leading-[0.95] tracking-tight">
              {t("subtitle")}
            </h2>
            <p className="text-ink/60 mt-6 text-[15px] leading-relaxed">
              Klientët tanë nga rezidenca, hotele, spitale dhe qendra tregtare — çdo projekt dëshmon cilësinë tonë.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-green-primary/25 text-green-primary hover:bg-green-primary hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-green-primary/25 text-green-primary hover:bg-green-primary hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
              <span className="text-ink/40 font-mono text-sm ml-2">
                {String(current + 1).padStart(2, "0")}
                <span className="text-ink/20"> / </span>
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative rounded-[28px] glass-light p-10 md:p-14 min-h-[320px] iridescent-border">
              <Quote size={72} className="text-green-primary/10 absolute top-8 right-8" fill="currentColor" />
              <blockquote
                key={current}
                className="anim-fade-up font-display text-[28px] md:text-[36px] leading-[1.2] text-ink tracking-tight"
              >
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-primary to-green-medium flex items-center justify-center text-white font-display text-xl font-semibold shadow-md shadow-green-primary/20">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-ink/50 text-sm">{item.company}</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                      i === current
                        ? "w-10 bg-green-primary"
                        : "w-4 bg-green-primary/20 hover:bg-green-primary/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
