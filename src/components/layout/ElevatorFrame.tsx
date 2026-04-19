"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const FLOORS = [
  { label: "G",  name: "Welcome" },
  { label: "02", name: "Services" },
  { label: "03", name: "Projects" },
  { label: "04", name: "Why Us" },
  { label: "05", name: "Testimonials" },
  { label: "PH", name: "Contact" },
] as const;

export default function ElevatorFrame({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.3 });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-floor]")
    ).sort(
      (a, b) => Number(a.dataset.floor) - Number(b.dataset.floor)
    );
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.floor);
          setCurrent(idx);
        }
      },
      { threshold: [0.25, 0.45, 0.65] }
    );
    sections.forEach((s) => obs.observe(s));

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 2) {
        setDir(y > lastY.current ? "up" : "down"); // scroll-down = elevator ascending (▲)
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const arrivalKey = `${current}-${dir}`;

  return (
    <div className="relative">
      {children}

      {/* Right-side vertical rail */}
      <div
        aria-hidden
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none"
      >
        <div className="relative h-[360px] w-[2px] rounded-full bg-black/15 dark:bg-white/10 overflow-hidden mr-[5px]">
          {/* progress fills bottom→top to mirror an ascending cabin */}
          <motion.div
            className="absolute inset-x-0 bottom-0 origin-bottom rounded-full bg-gradient-to-t from-green-medium via-green-light to-gold"
            style={{ scaleY: progress, height: "100%" }}
          />
        </div>

        {/* Floor ticks — top of rail is PH, bottom is G */}
        <ul className="absolute inset-y-0 right-0 flex flex-col-reverse justify-between font-mono text-[10px] tracking-widest">
          {FLOORS.map((f, idx) => {
            const isActive = idx === current;
            return (
              <li key={f.label} className="flex items-center gap-2">
                <span
                  className={`transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-black/30 dark:text-white/35"
                  }`}
                >
                  {f.label}
                </span>
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-4 bg-gold shadow-[0_0_12px_rgba(201,168,76,0.75)]"
                      : "w-1.5 bg-black/25 dark:bg-white/25"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Arrival sweep — thin gold beam on floor change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={arrivalKey}
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 top-[68px] z-30 h-[2px] origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.95), transparent)",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
