"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import Elevator3D from "@/components/ui/Elevator3D";

function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function Stat({
  value, suffix, label, active,
}: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 1800, active);
  return (
    <div className="flex flex-col">
      <div className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight">
        <span className="font-mono">{count}</span>
        <span className="text-gradient-gold">{suffix}</span>
      </div>
      <div className="text-white/55 text-[11px] mt-1 uppercase tracking-[0.22em]">{label}</div>
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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefix = locale !== "sq" ? `/${locale}` : "";

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden noise-overlay bg-forest">
      {/* Aurora glows */}
      <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-6s" }} />
      <div className="absolute top-1/3 left-1/3 w-[320px] h-[320px] rounded-full bg-green-light/10 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-12s" }} />

      <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36 pb-24 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <div className="anim-fade-up inline-flex items-center gap-3 rounded-full px-3.5 py-1.5 mb-8 glass-dark">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold/80 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
              </span>
              <span className="text-white/85 text-[11px] tracking-[0.28em] uppercase font-semibold">
                Kosovo · Est. 2010
              </span>
            </div>

            {/* Headline */}
            <h1 className="anim-fade-up anim-delay-1 display-xl text-white text-[58px] sm:text-[76px] md:text-[96px] lg:text-[116px] mb-7">
              <span className="block">{t("headline")}</span>
            </h1>

            {/* Subheadline */}
            <p className="anim-fade-up anim-delay-2 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              {t("subheadline")}
            </p>

            {/* CTAs */}
            <div className="anim-fade-up anim-delay-3 flex flex-wrap gap-3 mb-16">
              <Link href={`${prefix}/contact`} className="btn-base btn-gold cursor-pointer">
                {t("cta_secondary")}
                <ArrowUpRight size={15} />
              </Link>
              <Link href={`${prefix}/services`} className="btn-base btn-ghost-light cursor-pointer">
                {t("cta_primary")}
              </Link>
            </div>
          </div>

          {/* 3D Elevator — hidden on mobile */}
          <div className="hidden lg:block lg:col-span-4 anim-fade-up anim-delay-4">
            <div className="anim-floaty">
              <Elevator3D />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="anim-fade-up anim-delay-5 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10"
        >
          <Stat value={500} suffix="+" label={stats("projects")} active={statsActive} />
          <Stat value={15}  suffix="+" label={stats("experience")} active={statsActive} />
          <Stat value={100} suffix="%" label={stats("satisfaction")} active={statsActive} />
          <div className="flex flex-col">
            <div className="font-display text-4xl md:text-5xl font-medium text-white font-mono tracking-tight">
              24<span className="text-gradient-gold">/7</span>
            </div>
            <div className="text-white/55 text-[11px] mt-1 uppercase tracking-[0.22em]">
              {stats("support")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 anim-fade-in anim-delay-8">
        <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
