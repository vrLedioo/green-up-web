"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const flags: Record<Locale, { flag: string; label: string }> = {
  sq: { flag: "🇦🇱", label: "SQ" },
  en: { flag: "🇬🇧", label: "EN" },
  de: { flag: "🇩🇪", label: "DE" },
};

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    const isLocaleSegment = locales.includes(segments[0] as Locale);
    const rest = isLocaleSegment ? segments.slice(1) : segments;
    const pathWithoutLocale = rest.length > 0 ? "/" + rest.join("/") : "";

    if (newLocale === "sq") {
      router.push(pathWithoutLocale || "/");
    } else {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-all duration-200 ${
            locale === loc
              ? dark
                ? "bg-green-primary text-white"
                : "bg-white/20 text-white"
              : dark
              ? "text-dark/60 hover:text-green-primary"
              : "text-white/60 hover:text-white"
          }`}
          title={flags[loc].label}
        >
          <span>{flags[loc].flag}</span>
          <span className="hidden sm:inline">{flags[loc].label}</span>
        </button>
      ))}
    </div>
  );
}
