import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const PAGES = ["", "/about", "/services", "/projects", "/faq", "/contact", "/partners", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const localePrefix = (locale: string) => (locale === defaultLocale ? "" : `/${locale}`);

  return PAGES.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePrefix(locale)}${page}` || SITE_URL,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}${localePrefix(l)}${page}` || SITE_URL])
        ),
      },
    }))
  );
}
