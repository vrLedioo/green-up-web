"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/lib/i18n";

/**
 * Floating brand pill, top-left on every page — mobile & tablet only.
 * On desktop (lg+) the logo lives inside the hero's 3D elevator cabin instead.
 */
export default function HeaderLogo() {
  const locale = useLocale() as Locale;
  const home = locale === "sq" ? "/" : `/${locale}`;

  return (
    <div className="lg:hidden sticky top-0 z-40 h-0 pointer-events-none">
      <Link
        href={home}
        className="pointer-events-auto inline-flex items-center mt-3 ml-3 rounded-full px-4 py-2 cursor-pointer border border-white/15 bg-[rgba(15,45,31,0.72)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_14px_34px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(201,168,76,0.08)_inset] transition-transform duration-300 active:scale-95"
      >
        <Image
          src="/logo-white.png"
          alt="Green Up — Lift System"
          width={1000}
          height={423}
          priority
          className="h-6 w-auto"
        />
      </Link>
    </div>
  );
}
