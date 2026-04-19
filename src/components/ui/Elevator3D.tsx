"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FLOOR_LABELS = ["G", "02", "03", "04", "05", "PH"] as const;
const STOP_Y = [448, 368, 288, 208, 128, 48];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Elevator3D() {
  const [floor, setFloor] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      let i = 0;
      let dir: 1 | -1 = 1;
      while (!cancelled) {
        setFloor(i);
        setDirection(dir === 1 ? "up" : "down");

        const isTerminal = i === FLOOR_LABELS.length - 1 || i === 0;
        if (isTerminal) {
          await wait(1500);
          if (cancelled) return;
          setDoorsOpen(true);
          await wait(1600);
          if (cancelled) return;
          setDoorsOpen(false);
          await wait(500);
        } else {
          await wait(650);
        }
        if (cancelled) return;

        if (i === FLOOR_LABELS.length - 1) dir = -1;
        else if (i === 0) dir = 1;
        i += dir;

        // Travel time handled by framer-motion (1.6s) — wait it out
        await wait(1650);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[340px] select-none [perspective:1600px]">
      {/* Ambient glow halo behind */}
      <div className="pointer-events-none absolute -inset-10 rounded-[36px] bg-gradient-to-br from-green-medium/30 via-transparent to-gold/25 blur-3xl" />

      {/* Stage */}
      <div
        className="relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-[#0a2015]/85 to-[#0f2d1f]/95 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-15deg) rotateX(4deg)",
        }}
      >
        {/* Top indicator bar */}
        <div className="relative z-20 flex items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-light opacity-80 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-light" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">Live Shaft</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-white/90">
            <motion.span
              key={direction}
              initial={{ opacity: 0, y: direction === "up" ? 6 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold"
            >
              {direction === "up" ? "▲" : "▼"}
            </motion.span>
            <span className="text-white/40">FLOOR</span>
            <motion.span
              key={floor}
              initial={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gradient-gold font-medium tabular-nums"
            >
              {FLOOR_LABELS[floor]}
            </motion.span>
          </div>
        </div>

        {/* Shaft */}
        <div className="relative h-[560px] px-5 pb-5">
          {/* Back wall grid / rails */}
          <div className="absolute inset-x-5 top-3 bottom-5 rounded-xl overflow-hidden border border-white/5 bg-[radial-gradient(ellipse_at_top,_rgba(183,228,199,0.08),_transparent_60%),linear-gradient(180deg,_#0b2217_0%,_#081a11_100%)]">
            {/* Rails */}
            <div className="absolute inset-y-0 left-[18%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-y-0 right-[18%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            {/* Cross beams */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 80px)",
              }}
            />
            {/* Floor markers (right side) */}
            <div className="absolute inset-y-4 right-2 flex flex-col-reverse justify-between">
              {FLOOR_LABELS.map((label, idx) => {
                const active = idx === floor;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                        active ? "text-gold" : "text-white/30"
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`h-px w-4 transition-all duration-300 ${
                        active ? "bg-gold w-6" : "bg-white/20"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Elevator cabin */}
          <motion.div
            className="absolute left-8 right-14 h-[70px] will-change-transform"
            animate={{ y: STOP_Y[floor] }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cabin body (background / interior) */}
            <div className="absolute inset-0 rounded-md overflow-hidden border border-white/15 bg-gradient-to-b from-[#1a4332] via-[#0f2d1f] to-[#081a11] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
              {/* Ceiling light */}
              <motion.div
                className="absolute top-0 inset-x-2 h-[3px] rounded-b-full bg-gold"
                animate={{
                  opacity: doorsOpen ? 1 : 0.45,
                  boxShadow: doorsOpen
                    ? "0 0 24px 4px rgba(201,168,76,0.7), 0 14px 30px -4px rgba(201,168,76,0.5)"
                    : "0 0 8px 1px rgba(201,168,76,0.25)",
                }}
                transition={{ duration: 0.4 }}
              />
              {/* Interior floor */}
              <div className="absolute bottom-0 inset-x-1 h-1 rounded-t bg-gradient-to-t from-gold/20 to-transparent" />
              {/* Back wall ribbing */}
              <div
                className="absolute inset-2 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 12px)",
                }}
              />
            </div>

            {/* Left door */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-1/2 rounded-l-md border-r border-white/20 bg-gradient-to-b from-[#2D6A4F] via-[#1a4332] to-[#0f2d1f] shadow-[inset_-8px_0_16px_-8px_rgba(0,0,0,0.8)]"
              animate={{ x: doorsOpen ? "-78%" : "0%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-y-[14%] right-[4px] w-[2px] rounded bg-gold/70" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            </motion.div>

            {/* Right door */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-1/2 rounded-r-md border-l border-white/20 bg-gradient-to-b from-[#2D6A4F] via-[#1a4332] to-[#0f2d1f] shadow-[inset_8px_0_16px_-8px_rgba(0,0,0,0.8)]"
              animate={{ x: doorsOpen ? "78%" : "0%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-y-[14%] left-[4px] w-[2px] rounded bg-gold/70" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            </motion.div>

            {/* Cable / counterweight hint */}
            <div className="absolute left-1/2 -top-[560px] bottom-full w-px bg-gradient-to-b from-transparent via-white/15 to-white/30" />
          </motion.div>

          {/* Ground shadow under cabin */}
          <motion.div
            className="absolute left-10 right-16 h-3 rounded-full bg-black/50 blur-md"
            animate={{
              y: STOP_Y[floor] + 72,
              opacity: 0.35 + (floor / FLOOR_LABELS.length) * 0.3,
              scaleX: 1 - floor * 0.06,
            }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>

        {/* Spec strip */}
        <div className="relative z-10 grid grid-cols-3 divide-x divide-white/5 border-t border-white/8 px-2">
          <SpecCell label="Cert" value="EN 81" />
          <SpecCell label="Response" value="24 / 7" />
          <SpecCell label="Coverage" value="KS · EU" />
        </div>

        {/* Subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </div>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 px-3 text-center">
      <div className="text-[9px] uppercase tracking-[0.28em] text-white/40">{label}</div>
      <div className="mt-1 font-mono text-sm text-gold">{value}</div>
    </div>
  );
}
