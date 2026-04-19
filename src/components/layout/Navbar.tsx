"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

const navKeys = [
  "home",
  "about",
  "services",
  "projects",
  "gallery",
  "faq",
  "contact",
  "partners",
] as const;

const navPaths: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  gallery: "/gallery",
  faq: "/faq",
  contact: "/contact",
  partners: "/partners",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (key: string) => {
    const path = navPaths[key];
    const prefix = locale !== "sq" ? `/${locale}` : "";
    return path === "/" ? prefix || "/" : `${prefix}${path}`;
  };

  return (
    <>
      <div
        className="fixed left-1/2 -translate-x-1/2 top-3 md:top-5 z-40 w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] max-w-[82rem] transition-[padding] duration-300"
        style={{ paddingInline: scrolled ? "0.25rem" : "0rem" }}
      >
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(15, 45, 31, 0.78)" : "rgba(15, 45, 31, 0.35)",
            borderColor: scrolled ? "rgba(183, 228, 199, 0.25)" : "rgba(255,255,255,0.18)",
            boxShadow: scrolled
              ? "0 24px 60px -24px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08) inset"
              : "0 10px 30px -20px rgba(0,0,0,0.35)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-full border backdrop-blur-xl backdrop-saturate-150 px-4 md:px-6 py-2.5 flex items-center justify-between gap-4"
        >
          {/* Logo */}
          <Link href={getHref("home")} className="flex items-center gap-2 shrink-0 cursor-pointer group">
            <Image
              src="/logo-white.svg"
              alt="Green Up"
              width={118}
              height={30}
              priority
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={getHref(key)}
                className="px-3 py-1.5 rounded-full text-[13px] text-white/75 hover:text-white hover:bg-white/10 tracking-wide transition-colors duration-200 cursor-pointer"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Link
              href={getHref("contact")}
              className="btn-base btn-gold !py-2 !px-5 text-[12.5px] cursor-pointer"
            >
              {t("getQuote")}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-green-abyss/95 backdrop-blur-xl flex flex-col"
          >
            <div className="absolute inset-0 aurora-bg pointer-events-none" />

            <div className="relative flex items-center justify-between p-6 border-b border-white/10">
              <Image
                src="/logo-white.svg"
                alt="Green Up"
                width={120}
                height={32}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col gap-1">
                {navKeys.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={getHref(key)}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl font-display text-3xl font-medium transition-colors cursor-pointer"
                    >
                      <span>{t(key)}</span>
                      <ArrowUpRight size={18} className="text-gold opacity-60" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="relative p-6 border-t border-white/10 flex items-center justify-between gap-4">
              <LanguageSwitcher />
              <Link
                href={getHref("contact")}
                onClick={() => setMobileOpen(false)}
                className="btn-base btn-gold cursor-pointer"
              >
                {t("getQuote")}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
