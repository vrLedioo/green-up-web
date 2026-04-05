"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const items = t.raw("items") as Array<{ text: string; name: string; company: string }>;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-green-primary text-sm font-semibold uppercase tracking-widest">— {t("title")} —</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mt-3 mb-3">{t("title")}</h2>
          <p className="text-dark/60 text-lg">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-cream border border-green-mint/30 rounded-sm p-10 relative min-h-[200px]">
            <Quote size={48} className="text-green-primary/20 absolute top-6 left-6" fill="currentColor" />
            <p className="text-dark/80 text-lg md:text-xl leading-relaxed font-display italic mb-8 pt-4">
              "{items[current].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-primary to-green-medium flex items-center justify-center text-white font-bold text-lg">
                {items[current].name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-dark">{items[current].name}</p>
                <p className="text-dark/50 text-sm">{items[current].company}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-green-primary" : "w-2 h-2 bg-green-primary/30"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
