import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["sq", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sq";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) notFound();
  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});
