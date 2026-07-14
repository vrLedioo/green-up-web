"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { MapPin, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

import Image from "next/image";

// Cover photo per project id — the written content comes from projects.featured in the locale files
const projectImages: Record<string, string> = {
  edukimi:     "/images/projects/edukimi-2.webp",
  banimi:      "/images/projects/banimi-1.webp",
  arkitektura: "/images/projects/arkitektura-1.webp",
  trashegimia: "/images/projects/trashegimia-1.webp",
  juridiku:    "/images/projects/juridiku-1.webp",
  dumbwaiter:  "/images/projects/dumbwaiter-poster.webp",
};

interface FeaturedProject {
  id: string;
  title: string;
  location: string;
  year: string;
  type: string;
  desc: string;
}

const typeBadge: Record<string, string> = {
  passenger:     "bg-white/10 text-green-mint border-green-mint/30",
  cargo:         "bg-gold/15 text-gold border-gold/40",
  accessibility: "bg-green-pale/15 text-green-mint border-green-mint/30",
};

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefix = locale !== "sq" ? `/${locale}` : "";
  const projects = t.raw("featured") as FeaturedProject[];

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const startX = e.pageX - el.offsetLeft;
    const startScroll = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section className="relative section-padding bg-forest overflow-hidden noise-overlay" id="projects">
      <div aria-hidden className="absolute top-0 left-1/4 w-[600px] h-[300px] rounded-full bg-green-medium/20 blur-3xl anim-aurora pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="eyebrow text-green-mint">{t("title")}</span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white mt-4 leading-[0.95] tracking-tight">
              {t("subtitle")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy("left")}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
            <Link
              href={`${prefix}/projects`}
              className="btn-base btn-ghost-light !py-2.5 !px-5 text-[12.5px] cursor-pointer ml-2"
            >
              {t("viewAll")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="scroll-container flex gap-5 pb-6 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="shrink-0 w-[280px] md:w-[340px] group snap-start"
            >
              <div
                className="relative w-full h-[360px] rounded-2xl bg-green-deep overflow-hidden mb-4"
              >
                {projectImages[project.id] && (
                  <Image
                    src={projectImages[project.id]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 280px, 340px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)" }}
                />

                <div className={`absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border backdrop-blur-md ${typeBadge[project.type] ?? "bg-white/10 text-white border-white/20"}`}>
                  {t(`filters.${project.type}`)}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-white/60 text-[11px] mb-2">
                    <MapPin size={11} />
                    <span>{project.location}</span>
                    <span className="opacity-50">·</span>
                    <span className="font-mono">{project.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-medium leading-tight">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <Link
                    href={`${prefix}/projects`}
                    className="btn-base btn-gold !py-2.5 !px-5 text-[12px] cursor-pointer"
                  >
                    {t("viewDetails")}
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed line-clamp-2">
                {project.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
