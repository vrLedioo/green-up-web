"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Phone } from "lucide-react";

export default function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const t = useTranslations("emergency");

  if (dismissed) return null;

  return (
    <div className="bg-green-primary text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative z-50">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="font-semibold">{t("text")}</span>
        <span className="hidden sm:inline">—</span>
        <a
          href={`tel:${t("phone")}`}
          className="hidden sm:flex items-center gap-1 hover:text-gold transition-colors"
        >
          <Phone size={13} />
          <span className="font-mono">{t("phone")}</span>
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gold transition-colors"
        aria-label={t("dismiss")}
      >
        <X size={15} />
      </button>
    </div>
  );
}
