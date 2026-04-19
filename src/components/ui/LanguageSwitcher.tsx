"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  sq: "SQ",
  en: "EN",
  de: "DE",
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

  const inactiveCls = dark
    ? "text-ink/55 hover:text-green-primary"
    : "text-white/55 hover:text-white";
  const activeCls = dark
    ? "bg-green-primary text-white"
    : "bg-white/15 text-white";

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${
        dark ? "bg-green-primary/5 border border-green-primary/15" : "bg-white/5 border border-white/10"
      }`}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-widest transition-all duration-200 cursor-pointer ${
            locale === loc ? activeCls : inactiveCls
          }`}
          aria-current={locale === loc ? "true" : undefined}
          aria-label={labels[loc]}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
