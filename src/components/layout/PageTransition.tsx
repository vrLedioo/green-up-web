"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type FloorMap = Record<string, { label: string; name: string }>;

const PAGE_FLOORS: FloorMap = {
  "/":          { label: "G",  name: "Lobby" },
  "/about":     { label: "01", name: "About" },
  "/services":  { label: "02", name: "Services" },
  "/projects":  { label: "03", name: "Projects" },
  "/gallery":   { label: "03", name: "Gallery" },
  "/faq":       { label: "04", name: "FAQ" },
  "/contact":   { label: "05", name: "Contact" },
  "/partners":  { label: "06", name: "Partners" },
};

function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLocale = parts[0];
  if (["sq", "en", "de"].includes(maybeLocale)) parts.shift();
  return "/" + parts.join("");
}

function useFloor(pathname: string) {
  const clean = stripLocale(pathname);
  return PAGE_FLOORS[clean] ?? PAGE_FLOORS["/"];
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const floor = useFloor(pathname);
  const prevFloor = useRef(floor.label);
  const [dir, setDir] = useState<"up" | "down">("up");
  const [showDoors, setShowDoors] = useState(true);

  useEffect(() => {
    // Infer direction from numeric floor ordering
    const order = ["G", "01", "02", "03", "04", "05", "06"];
    const a = order.indexOf(prevFloor.current);
    const b = order.indexOf(floor.label);
    if (a !== -1 && b !== -1 && a !== b) setDir(b > a ? "up" : "down");
    prevFloor.current = floor.label;

    // Trigger door sequence on path change
    setShowDoors(true);
    const t = setTimeout(() => setShowDoors(false), 1100);
    return () => clearTimeout(t);
  }, [pathname, floor.label]);

  return (
    <div className="relative">
      {children}

      {/* Persistent floor HUD — shown on every page */}
      <div
        aria-hidden
        className="fixed top-24 right-5 z-40 hidden md:block pointer-events-none"
      >
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-ink/75 backdrop-blur-md px-4 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]">
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/55">
            Floor
          </span>
          <motion.span
            key={`label-${floor.label}`}
            initial={{ y: dir === "up" ? 10 : -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm font-semibold text-gradient-gold tabular-nums"
          >
            {floor.label}
          </motion.span>
          <span className="h-3 w-px bg-white/20" />
          <motion.span
            key={`name-${floor.name}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs text-white/85"
          >
            {floor.name}
          </motion.span>
          <motion.span
            key={`dir-${dir}-${floor.label}`}
            initial={{ y: dir === "up" ? 8 : -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={dir === "up" ? "text-green-light" : "text-gold"}
          >
            {dir === "up" ? "▲" : "▼"}
          </motion.span>
        </div>
      </div>

      {/* Elevator doors overlay */}
      <AnimatePresence>
        {showDoors && (
          <motion.div
            key={`doors-${pathname}`}
            className="fixed inset-0 z-[80] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left door */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 origin-left"
              initial={{ x: "0%" }}
              animate={{ x: "-102%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <DoorPanel side="left" />
            </motion.div>

            {/* Right door */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 origin-right"
              initial={{ x: "0%" }}
              animate={{ x: "102%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <DoorPanel side="right" />
            </motion.div>

            {/* Floor arrival card — brief flash between doors */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 1.02] }}
              transition={{ duration: 1, times: [0, 0.15, 0.65, 1] }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-[10px] uppercase tracking-[0.42em] text-white/55">
                  Green Up · {dir === "up" ? "Ascending" : "Descending"}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-white/60 font-mono">
                    Floor
                  </span>
                  <span className="font-display text-[84px] md:text-[120px] leading-none text-gradient-gold">
                    {floor.label}
                  </span>
                </div>
                <span className="font-display text-white/90 text-2xl md:text-3xl tracking-wide">
                  {floor.name}
                </span>
                <span className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </div>
            </motion.div>

            {/* Ding light at top */}
            <motion.div
              className="absolute top-0 inset-x-0 h-[3px] origin-center"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 1] }}
              transition={{ duration: 1.1, times: [0, 0.2, 0.8, 1] }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(201,168,76,0.95), transparent)",
                boxShadow: "0 0 20px rgba(201,168,76,0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DoorPanel({ side }: { side: "left" | "right" }) {
  const edge = side === "left" ? "right" : "left";
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0a2015] via-[#0f2d1f] to-[#081a11] border-white/10">
      {/* Inner ribbing */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 60px)",
        }}
      />
      {/* Vertical shine */}
      <div
        className="absolute inset-y-0 w-[12%] opacity-60"
        style={{
          [edge]: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)",
        }}
      />
      {/* Gold handle strip on inner edge */}
      <div
        className="absolute inset-y-[20%] w-[3px] bg-gradient-to-b from-gold/40 via-gold to-gold/40 shadow-[0_0_10px_rgba(201,168,76,0.6)]"
        style={{ [edge]: "2px" } as React.CSSProperties}
      />
      {/* Grain */}
      <div className="absolute inset-0 noise-overlay opacity-50" />
    </div>
  );
}
