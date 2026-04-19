"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, Phone } from "lucide-react";

export default function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("emergency");

  useEffect(() => {
    setMounted(true);
    const isDismissed = localStorage.getItem("emergency-banner-dismissed") === "true";
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("emergency-banner-dismissed", "true");
  };

  if (!mounted || dismissed) return null;

  return (
    <div className="relative z-50 bg-[#0f2d1f] text-white/90 text-[12.5px] tracking-wide py-2.5 px-4 flex items-center justify-center gap-3 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.18) 50%, transparent 100%)",
        }}
      />
      <span className="relative flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="font-semibold uppercase tracking-[0.2em] text-[11px]">
          {t("text")}
        </span>
        <span className="hidden sm:inline text-white/30">·</span>
        <a
          href={`tel:${t("phone")}`}
          className="hidden sm:inline-flex items-center gap-1.5 hover:text-gold transition-colors cursor-pointer"
        >
          <Phone size={12} className="opacity-80" />
          <span className="font-mono">{t("phone")}</span>
        </a>
      </span>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold transition-colors cursor-pointer"
        aria-label={t("dismiss")}
      >
        <X size={14} />
      </button>
    </div>
  );
}
