"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(27, 27, 27, 0.97)"
            : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={getHref("home")} className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt="Green Up"
              width={130}
              height={34}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={getHref(key)}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={getHref("contact")}
              className="bg-gold text-dark text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-yellow-500 transition-colors duration-200"
            >
              {t("getQuote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-dark flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Image
                src="/logo-white.svg"
                alt="Green Up"
                width={120}
                height={32}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <nav className="flex flex-col gap-2">
                {navKeys.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={getHref(key)}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded text-lg font-medium transition-colors"
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <LanguageSwitcher />
              <Link
                href={getHref("contact")}
                onClick={() => setMobileOpen(false)}
                className="bg-gold text-dark text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-yellow-500 transition-colors"
              >
                {t("getQuote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
