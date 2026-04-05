"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const projects = [
  { title: "Rezidenca Dardania", location: "Prishtinë", type: "passenger", desc: "Instalim i 4 ashensorëve pasagjerë në kompleksin rezidencial 12-katësh.", gradient: "from-green-primary via-green-medium to-green-light" },
  { title: "Hotel Grand",        location: "Prizren",   type: "passenger", desc: "Ashensor panoramik me kabinë xham për hotelin 5 yjesh.", gradient: "from-[#1a4332] via-green-primary to-green-medium" },
  { title: "Qendra Tregtare",    location: "Ferizaj",   type: "escalator", desc: "Instalim i 6 eskalatorëve dhe 2 ashensorëve mallrash.", gradient: "from-dark via-green-primary to-green-medium" },
  { title: "Vila Moderne",       location: "Gjakovë",   type: "home",      desc: "Home lift elegant me veshje dru e çelikut inox.", gradient: "from-green-medium via-green-light to-green-mint" },
  { title: "Spitali Publik",     location: "Prishtinë", type: "passenger", desc: "Platforma ngritëse dhe ashensorë mjekësorë sipas standardeve ndërkombëtare.", gradient: "from-[#0f2d1f] via-green-primary to-green-medium" },
  { title: "Ndërtesa Zyrave",    location: "Mitrovicë", type: "passenger", desc: "Modernizim dhe instalim i ashensorëve të rinj në ndërtesën e zyrave.", gradient: "from-green-primary via-dark to-green-medium" },
];

const typeBadge: Record<string, string> = {
  passenger:  "bg-green-primary/20 text-green-primary",
  escalator:  "bg-gold/20 text-yellow-700",
  home:       "bg-green-mint/50 text-green-primary",
  cargo:      "bg-gray-100 text-gray-700",
  security:   "bg-white/20 text-white",
  accessibility: "bg-green-pale text-green-primary",
};

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefix = locale !== "sq" ? `/${locale}` : "";

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
    <section className="section-padding bg-dark overflow-hidden" id="projects">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-green-mint text-sm font-semibold uppercase tracking-widest">— {t("title")} —</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mt-3">{t("title")}</h2>
            <p className="text-white/50 text-lg mt-2">{t("subtitle")}</p>
          </div>
          <Link href={`${prefix}/projects`} className="inline-flex items-center gap-2 text-gold hover:text-yellow-400 font-semibold text-sm transition-colors shrink-0">
            {t("viewAll")} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="scroll-container flex gap-6 pb-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          {projects.map((project, i) => (
            <div key={i} className="shrink-0 w-72 md:w-80 group">
              {/* TODO: Replace gradient div with real project photo */}
              <div className={`w-full h-48 rounded-sm bg-gradient-to-br ${project.gradient} relative overflow-hidden mb-4`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${typeBadge[project.type] ?? "bg-white/20 text-white"}`}>
                  {t(`filters.${project.type}` as any)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <Link href={`${prefix}/projects`} className="bg-white text-dark text-xs font-semibold px-4 py-2 rounded-sm">
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                  <MapPin size={11} /><span>{project.location}</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-1.5">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
