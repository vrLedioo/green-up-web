import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import PageTransition from "@/components/layout/PageTransition";
import ElevatorPanel from "@/components/layout/ElevatorPanel";
import Chatbot from "@/components/layout/Chatbot";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: {
      default: "Green Up — Premium Elevator Solutions",
      template: "%s | Green Up",
    },
    description: t("subheadline"),
    keywords: ["elevator", "ashensor", "Kosovo", "Green Up", "lift installation"],
    openGraph: {
      siteName: "Green Up",
      locale: locale,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} bg-[#F8FAF9] text-[#1B1B1B] antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-green-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>
          <EmergencyBanner />
          <ElevatorPanel />
          <Chatbot />
          <div id="main-content">
            <PageTransition>{children}</PageTransition>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
