"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

const CONSENT_KEY = "greenup-maps-consent";

/**
 * GDPR-friendly Google Maps embed: no request reaches Google until the
 * visitor explicitly opts in. The choice is remembered in localStorage.
 */
export default function ConsentMap({
  src,
  title,
  compact = false,
}: {
  src: string;
  title: string;
  /** Tighter layout for small containers (e.g. the footer card) */
  compact?: boolean;
}) {
  const t = useTranslations("mapConsent");
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "yes") setConsented(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "yes");
    setConsented(true);
  };

  if (consented) {
    return (
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center bg-green-deep/95 noise-overlay ${compact ? "gap-2 p-3" : "gap-3 p-6"}`}>
      <MapPin size={compact ? 16 : 22} className="text-green-mint" />
      {!compact && (
        <p className="text-white/60 text-[12px] leading-relaxed max-w-sm">{t("text")}</p>
      )}
      <button
        onClick={accept}
        className={`rounded-full bg-white/10 border border-green-mint/40 text-green-mint hover:bg-green-mint hover:text-green-deep transition-colors cursor-pointer font-semibold ${compact ? "px-3 py-1 text-[11px]" : "px-5 py-2 text-[12.5px]"}`}
      >
        {t("button")}
      </button>
      {!compact && <p className="text-white/35 text-[10.5px]">{t("hint")}</p>}
    </div>
  );
}
