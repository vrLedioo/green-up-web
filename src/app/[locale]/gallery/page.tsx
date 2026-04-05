"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "all" | "elevators" | "installations" | "team" | "beforeAfter";

const galleryItems = [
  { cat: "elevators" as Category,      gradient: "from-green-primary to-green-medium",   h: "h-64" },
  { cat: "installations" as Category,  gradient: "from-[#1a4332] to-green-primary",       h: "h-48" },
  { cat: "team" as Category,           gradient: "from-dark to-green-medium",             h: "h-56" },
  { cat: "elevators" as Category,      gradient: "from-green-medium to-green-light",      h: "h-40" },
  { cat: "beforeAfter" as Category,    gradient: "from-[#0f2d1f] to-green-primary",       h: "h-64" },
  { cat: "installations" as Category,  gradient: "from-green-primary to-dark",            h: "h-48" },
  { cat: "elevators" as Category,      gradient: "from-green-light to-green-primary",     h: "h-56" },
  { cat: "team" as Category,           gradient: "from-dark to-green-light",              h: "h-40" },
  { cat: "beforeAfter" as Category,    gradient: "from-green-medium to-dark",             h: "h-64" },
  { cat: "installations" as Category,  gradient: "from-green-primary to-green-light",     h: "h-48" },
  { cat: "elevators" as Category,      gradient: "from-[#1a4332] to-dark",               h: "h-40" },
  { cat: "team" as Category,           gradient: "from-green-medium to-green-primary",    h: "h-56" },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const categories: Category[] = ["all", "elevators", "installations", "team", "beforeAfter"];
  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((i) => i.cat === activeFilter);
  const total = filtered.length;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") setLightboxIdx((p) => (p !== null ? (p - 1 + total) % total : 0));
      if (e.key === "ArrowRight") setLightboxIdx((p) => (p !== null ? (p + 1) % total : 0));
    },
    [lightboxIdx, total]
  );

  useEffect(() => {
    if (lightboxIdx !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [lightboxIdx, handleKeyDown]);

  return (
    <>
      <EmergencyBanner />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden noise-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2d1f] via-[#1a4332] to-[#2D6A4F]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-32">
            <span className="text-green-mint text-sm font-semibold uppercase tracking-widest anim-fade-up">— Green Up —</span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mt-3 anim-fade-up anim-delay-1">{t("hero.title")}</h1>
            <p className="text-white/70 text-xl mt-4 anim-fade-up anim-delay-2">{t("hero.subtitle")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide">
            {/* Filter */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
                    activeFilter === cat ? "bg-green-primary text-white" : "bg-white border border-green-mint/40 text-dark/60 hover:border-green-primary"
                  }`}>
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>

            {/* Masonry grid */}
            {/* TODO: Replace gradient divs with real gallery photos */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {filtered.map((item, i) => (
                <div
                  key={`${item.cat}-${i}`}
                  className={`${item.h} w-full break-inside-avoid mb-4 rounded-sm bg-gradient-to-br ${item.gradient} relative overflow-hidden group cursor-pointer`}
                  onClick={() => setLightboxIdx(i)}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-lg">+</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p - 1 + total) % total : 0); }}>
            <ChevronLeft size={36} />
          </button>
          <div
            className={`w-full max-w-2xl h-96 bg-gradient-to-br ${filtered[lightboxIdx]?.gradient} rounded-sm mx-16`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p + 1) % total : 0); }}>
            <ChevronRight size={36} />
          </button>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setLightboxIdx(null)}>
            <X size={28} />
          </button>
          <div className="absolute bottom-6 text-white/50 text-sm">{lightboxIdx + 1} / {total}</div>
        </div>
      )}

      <Footer />
    </>
  );
}
