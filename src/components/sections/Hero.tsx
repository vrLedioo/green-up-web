"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 1800, active);
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-white">
        <span className="font-mono">{count}</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="text-white/60 text-xs md:text-sm mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function ElevatorShaft() {
  return (
    <div className="absolute right-8 top-0 bottom-0 hidden xl:flex items-center pointer-events-none opacity-[0.08]">
      <svg width="60" height="400" viewBox="0 0 60 400" fill="none">
        <rect x="5" y="0" width="50" height="400" rx="4" stroke="white" strokeWidth="1.5" strokeDasharray="6 3" fill="none"/>
        <line x1="18" y1="0" x2="18" y2="400" stroke="white" strokeWidth="0.5" opacity="0.5"/>
        <line x1="42" y1="0" x2="42" y2="400" stroke="white" strokeWidth="0.5" opacity="0.5"/>
        <motion.g animate={{ y: [-10, -280, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}>
          <rect x="12" y="320" width="36" height="50" rx="2" fill="white" opacity="0.2"/>
          <line x1="30" y1="320" x2="30" y2="370" stroke="white" strokeWidth="0.5" opacity="0.5"/>
        </motion.g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const stats = useTranslations("stats");
  const locale = useLocale() as Locale;
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2d1f] via-[#1a4332] to-[#2D6A4F]" />
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-green-medium/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-green-light/5 blur-3xl pointer-events-none" />

      <ElevatorShaft />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge — CSS fade in */}
          <div className="anim-fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-white/80 text-xs tracking-widest uppercase font-semibold">Green Up — Kosovo</span>
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up anim-delay-1 font-display text-[68px] md:text-[88px] lg:text-[108px] leading-[0.9] font-bold text-white mb-6">
            {t("headline")}
          </h1>

          {/* Subheadline */}
          <p className="anim-fade-up anim-delay-2 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div className="anim-fade-up anim-delay-3 flex flex-wrap gap-4 mb-20">
            <Link
              href={`${prefix}/services`}
              className="inline-flex items-center gap-2 border border-white text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-white hover:text-green-primary transition-all duration-300 text-sm tracking-wide"
            >
              {t("cta_primary")} <ArrowRight size={16} />
            </Link>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold text-dark font-semibold px-7 py-3.5 rounded-sm hover:bg-yellow-500 transition-all duration-300 shadow-lg shadow-gold/30 text-sm tracking-wide"
            >
              {t("cta_secondary")}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="anim-fade-up anim-delay-4 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          <Stat value={500} suffix="+" label={stats("projects")} active={statsActive} />
          <Stat value={15}  suffix="+" label={stats("experience")} active={statsActive} />
          <Stat value={100} suffix="%" label={stats("satisfaction")} active={statsActive} />
          <div className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-white font-mono">
              24<span className="text-gold">/7</span>
            </div>
            <div className="text-white/60 text-xs md:text-sm mt-1 uppercase tracking-widest">{stats("support")}</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 anim-fade-in anim-delay-8">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
