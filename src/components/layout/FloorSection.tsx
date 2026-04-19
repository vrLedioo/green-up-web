"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  index: number;
  label: string;
  name: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  tiltIntensity?: number;
};

export default function FloorSection({
  index,
  label,
  name,
  children,
  tone = "light",
  tiltIntensity = 1,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const active = tiltIntensity > 0;
  // 3D depth: section enters with a slight upward tilt, flattens mid-view, tilts outward when leaving
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    active ? [6 * tiltIntensity, 0, -6 * tiltIntensity] : [0, 0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    active ? [36, 0, -36] : [0, 0, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    active ? [0.55, 1, 1, 0.65] : [1, 1, 1, 1]
  );

  const labelTone =
    tone === "dark"
      ? "text-white/55 border-white/15 bg-white/5"
      : "text-ink/60 border-ink/10 bg-ink/5";

  return (
    <section
      ref={ref}
      data-floor={index}
      data-floor-label={label}
      data-floor-name={name}
      className="relative [perspective:1600px]"
    >
      {/* Floor sticker */}
      <div className="pointer-events-none absolute left-4 md:left-8 top-6 z-20 hidden sm:flex items-center gap-2">
        <span
          className={`font-mono text-[10px] tracking-[0.28em] uppercase rounded-full border px-2.5 py-1 backdrop-blur-md ${labelTone}`}
        >
          FL · {label}
        </span>
        <span
          className={`h-px w-8 ${
            tone === "dark" ? "bg-white/25" : "bg-ink/15"
          }`}
        />
        <span
          className={`text-[10px] tracking-[0.2em] uppercase ${
            tone === "dark" ? "text-white/45" : "text-ink/45"
          }`}
        >
          {name}
        </span>
      </div>

      <motion.div
        style={{
          rotateX,
          y,
          opacity,
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}
