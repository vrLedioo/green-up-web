"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

type Category = "all" | "elevators" | "installations" | "team" | "beforeAfter";

const galleryItems = [
  { cat: "elevators" as Category,     gradient: "from-green-primary via-green-medium to-green-light",  h: "h-80" },
  { cat: "installations" as Category, gradient: "from-green-deep via-green-primary to-green-medium",   h: "h-56" },
  { cat: "team" as Category,          gradient: "from-ink via-green-primary to-green-medium",          h: "h-64" },
  { cat: "elevators" as Category,     gradient: "from-green-medium via-green-light to-green-mint",     h: "h-48" },
  { cat: "beforeAfter" as Category,   gradient: "from-green-abyss via-green-primary to-green-medium",  h: "h-80" },
  { cat: "installations" as Category, gradient: "from-green-primary via-ink to-green-medium",          h: "h-56" },
  { cat: "elevators" as Category,     gradient: "from-green-light via-green-primary to-green-deep",    h: "h-64" },
  { cat: "team" as Category,          gradient: "from-ink via-green-medium to-green-light",            h: "h-48" },
  { cat: "beforeAfter" as Category,   gradient: "from-green-medium via-ink to-green-primary",          h: "h-80" },
  { cat: "installations" as Category, gradient: "from-green-primary via-green-medium to-green-light",  h: "h-56" },
  { cat: "elevators" as Category,     gradient: "from-green-deep via-ink to-green-primary",            h: "h-48" },
  { cat: "team" as Category,          gradient: "from-green-medium via-green-primary to-green-deep",   h: "h-64" },
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
        <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden noise-overlay bg-forest">
          <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
          <div aria-hidden className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-8s" }} />

          <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36">
            <span className="eyebrow text-green-mint anim-fade-up">Green Up — Kosovo</span>
            <h1 className="display-xl text-white text-[56px] md:text-[96px] lg:text-[120px] mt-4 anim-fade-up anim-delay-1">
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide">
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-14 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? "bg-green-primary text-white shadow-lg shadow-green-primary/20"
                      : "bg-white border border-green-mint/40 text-ink/60 hover:border-green-primary hover:text-green-primary"
                  }`}
                >
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
                  className={`${item.h} w-full break-inside-avoid mb-4 rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden group cursor-pointer lift`}
                  onClick={() => setLightboxIdx(i)}
                >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p - 1 + total) % total : 0); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            className={`w-full max-w-3xl aspect-[4/3] bg-gradient-to-br ${filtered[lightboxIdx]?.gradient} rounded-3xl mx-16 shadow-2xl shadow-black/50`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p + 1) % total : 0); }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono tracking-widest">
            {String(lightboxIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
