"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { MapPin, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const projects = [
  { title: "Rezidenca Dardania", location: "Prishtinë", year: "2023", type: "passenger", desc: "Instalim i 4 ashensorëve pasagjerë në kompleksin rezidencial 12-katësh.", gradient: "from-green-primary via-green-medium to-green-light" },
  { title: "Hotel Grand",        location: "Prizren",   year: "2022", type: "passenger", desc: "Ashensor panoramik me kabinë xham për hotelin 5 yjesh.",                gradient: "from-green-deep via-green-primary to-green-medium" },
  { title: "Qendra Tregtare",    location: "Ferizaj",   year: "2023", type: "escalator", desc: "Instalim i 6 eskalatorëve dhe 2 ashensorëve mallrash.",                gradient: "from-ink via-green-primary to-green-medium" },
  { title: "Vila Moderne",       location: "Gjakovë",   year: "2024", type: "home",      desc: "Home lift elegant me veshje dru e çelikut inox.",                       gradient: "from-green-medium via-green-light to-green-mint" },
  { title: "Spitali Publik",     location: "Prishtinë", year: "2022", type: "passenger", desc: "Platforma ngritëse dhe ashensorë mjekësorë sipas standardeve BE.",     gradient: "from-green-abyss via-green-primary to-green-medium" },
  { title: "Ndërtesa Zyrave",    location: "Mitrovicë", year: "2021", type: "passenger", desc: "Modernizim dhe instalim i ashensorëve të rinj në ndërtesën e zyrave.", gradient: "from-green-primary via-ink to-green-medium" },
];

const typeBadge: Record<string, string> = {
  passenger:  "bg-white/10 text-green-mint border-green-mint/30",
  escalator:  "bg-gold/15 text-gold border-gold/40",
  home:       "bg-green-mint/15 text-green-mint border-green-mint/30",
  cargo:      "bg-white/10 text-white/80 border-white/20",
  security:   "bg-white/10 text-white border-white/20",
  accessibility: "bg-green-pale/15 text-green-mint border-green-mint/30",
};

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefix = locale !== "sq" ? `/${locale}` : "";

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
          {projects.map((project, i) => (
            <article
              key={i}
              className="shrink-0 w-[280px] md:w-[340px] group snap-start"
            >
              {/* TODO: Replace gradient div with real project photo */}
              <div
                className={`relative w-full h-[360px] rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden mb-4`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
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
