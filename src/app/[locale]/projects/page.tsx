"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import {
  MapPin, Calendar, X, ArrowUpRight, ChevronLeft,
  ChevronRight, Plus, Check, Play,
} from "lucide-react";

type ProjectCategory = "all" | "passenger" | "accessibility" | "cargo";
type GalleryCategory = "all" | "elevators" | "platforms" | "installations" | "videos";
type Tab = "projects" | "gallery";

interface Spec { label: string; value: string }
interface Media {
  type: "image" | "video";
  src: string;
  /** Poster image for videos — also used as thumbnail */
  poster?: string;
}
/** Locale-independent project facts; the written content lives in projectsPage.items.<id> */
interface ProjectMeta {
  id: string;
  category: Exclude<ProjectCategory, "all">;
  year: string;
  media: Media[];
}
interface ProjectContent {
  title: string;
  location: string;
  desc: string;
  fullDesc: string;
  client: string;
  services: string[];
  specs: Spec[];
}
type Project = ProjectMeta & ProjectContent;

const IMG = "/images/projects";

const PROJECTS_META: ProjectMeta[] = [
  {
    id: "edukimi", category: "passenger", year: "2025",
    media: [
      { type: "image", src: `${IMG}/edukimi-1.webp` },
      { type: "image", src: `${IMG}/edukimi-2.webp` },
      { type: "image", src: `${IMG}/edukimi-3.webp` },
      { type: "image", src: `${IMG}/edukimi-4.webp` },
      { type: "image", src: `${IMG}/edukimi-5.webp` },
      { type: "image", src: `${IMG}/edukimi-6.webp` },
    ],
  },
  {
    id: "banimi", category: "passenger", year: "2025",
    media: [
      { type: "image", src: `${IMG}/banimi-3.webp` },
      { type: "image", src: `${IMG}/banimi-4.webp` },
      { type: "image", src: `${IMG}/banimi-1.webp` },
      { type: "image", src: `${IMG}/banimi-2.webp` },
    ],
  },
  {
    id: "arkitektura", category: "accessibility", year: "2025",
    media: [
      { type: "image", src: `${IMG}/arkitektura-1.webp` },
      { type: "image", src: `${IMG}/arkitektura-2.webp` },
      { type: "image", src: `${IMG}/arkitektura-3.webp` },
    ],
  },
  {
    id: "juridiku", category: "accessibility", year: "2025",
    media: [
      { type: "image", src: `${IMG}/juridiku-1.webp` },
      { type: "image", src: `${IMG}/juridiku-2.webp` },
      { type: "image", src: `${IMG}/juridiku-3.webp` },
      { type: "video", src: "/videos/juridiku-1.mp4", poster: `${IMG}/juridiku-video1-poster.webp` },
      { type: "video", src: "/videos/juridiku-2.mp4", poster: `${IMG}/juridiku-video2-poster.webp` },
    ],
  },
  {
    id: "trashegimia", category: "accessibility", year: "2025",
    media: [
      { type: "image", src: `${IMG}/trashegimia-1.webp` },
      { type: "image", src: `${IMG}/trashegimia-2.webp` },
      { type: "image", src: `${IMG}/trashegimia-3.webp` },
      { type: "image", src: `${IMG}/trashegimia-4.webp` },
    ],
  },
  {
    id: "filologjiku", category: "passenger", year: "2024",
    media: [
      { type: "image", src: `${IMG}/filologjiku-1.webp` },
      { type: "image", src: `${IMG}/filologjiku-2.webp` },
    ],
  },
  {
    id: "dumbwaiter", category: "cargo", year: "2025",
    media: [
      { type: "video", src: "/videos/dumbwaiter.mp4", poster: `${IMG}/dumbwaiter-poster.webp` },
    ],
  },
];

const GALLERY_ITEMS: { cat: GalleryCategory; media: Media; h: string }[] = [
  { cat: "elevators",     media: { type: "image", src: `${IMG}/edukimi-2.webp` },      h: "h-80" },
  { cat: "installations", media: { type: "image", src: `${IMG}/banimi-1.webp` },       h: "h-96" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/arkitektura-1.webp` },  h: "h-72" },
  { cat: "videos",        media: { type: "video", src: "/videos/dumbwaiter.mp4", poster: `${IMG}/dumbwaiter-poster.webp` }, h: "h-80" },
  { cat: "elevators",     media: { type: "image", src: `${IMG}/banimi-3.webp` },       h: "h-72" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/trashegimia-1.webp` },  h: "h-80" },
  { cat: "installations", media: { type: "image", src: `${IMG}/edukimi-3.webp` },      h: "h-72" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/juridiku-1.webp` },     h: "h-80" },
  { cat: "elevators",     media: { type: "image", src: `${IMG}/edukimi-1.webp` },      h: "h-72" },
  { cat: "videos",        media: { type: "video", src: "/videos/juridiku-1.mp4", poster: `${IMG}/juridiku-video1-poster.webp` }, h: "h-80" },
  { cat: "installations", media: { type: "image", src: `${IMG}/banimi-2.webp` },       h: "h-80" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/arkitektura-2.webp` },  h: "h-72" },
  { cat: "elevators",     media: { type: "image", src: `${IMG}/banimi-4.webp` },       h: "h-72" },
  { cat: "installations", media: { type: "image", src: `${IMG}/edukimi-4.webp` },      h: "h-72" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/trashegimia-2.webp` },  h: "h-80" },
  { cat: "installations", media: { type: "image", src: `${IMG}/filologjiku-1.webp` },  h: "h-80" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/juridiku-2.webp` },     h: "h-72" },
  { cat: "installations", media: { type: "image", src: `${IMG}/edukimi-5.webp` },      h: "h-72" },
  { cat: "videos",        media: { type: "video", src: "/videos/juridiku-2.mp4", poster: `${IMG}/juridiku-video2-poster.webp` }, h: "h-80" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/trashegimia-3.webp` },  h: "h-72" },
  { cat: "installations", media: { type: "image", src: `${IMG}/filologjiku-2.webp` },  h: "h-80" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/trashegimia-4.webp` },  h: "h-72" },
  { cat: "installations", media: { type: "image", src: `${IMG}/edukimi-6.webp` },      h: "h-72" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/juridiku-3.webp` },     h: "h-80" },
  { cat: "platforms",     media: { type: "image", src: `${IMG}/arkitektura-3.webp` },  h: "h-72" },
];

export default function ProjectsPage() {
  const t       = useTranslations("projects");
  const page    = useTranslations("projectsPage");
  const gal     = useTranslations("gallery");
  const modal   = useTranslations("projectsPage.modal");

  // Merge locale-independent meta with translated content
  const allProjects: Project[] = PROJECTS_META.map((meta) => ({
    ...meta,
    ...(page.raw(`items.${meta.id}`) as ProjectContent),
  }));

  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Projects state
  const [activeFilter, setActiveFilter]       = useState<ProjectCategory>("all");
  const [openProjectIdx, setOpenProjectIdx]   = useState<number | null>(null);
  const [activeMedia, setActiveMedia]         = useState(0);

  // Gallery state
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<GalleryCategory>("all");
  const [lightboxIdx, setLightboxIdx]                 = useState<number | null>(null);

  const projectFilters: ProjectCategory[] = ["all", "passenger", "accessibility", "cargo"];
  const galleryCategories: GalleryCategory[] = ["all", "elevators", "platforms", "installations", "videos"];

  const openProject = openProjectIdx !== null ? allProjects[openProjectIdx] : null;

  const filteredProjects  = activeFilter === "all" ? allProjects : allProjects.filter((p) => p.category === activeFilter);
  const filteredGallery   = activeGalleryFilter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.cat === activeGalleryFilter);
  const galleryTotal      = filteredGallery.length;

  const openModal = (idxInAll: number) => {
    setOpenProjectIdx(idxInAll);
    setActiveMedia(0);
  };

  const closeModal = () => {
    setOpenProjectIdx(null);
    setActiveMedia(0);
  };

  const goProjectPrev = () => {
    if (openProjectIdx === null) return;
    openModal((openProjectIdx - 1 + allProjects.length) % allProjects.length);
  };

  const goProjectNext = () => {
    if (openProjectIdx === null) return;
    openModal((openProjectIdx + 1) % allProjects.length);
  };

  // Keyboard handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (openProjectIdx !== null) {
      if (e.key === "Escape")      closeModal();
      if (e.key === "ArrowLeft")   goProjectPrev();
      if (e.key === "ArrowRight")  goProjectNext();
      return;
    }
    if (lightboxIdx !== null) {
      if (e.key === "Escape")      setLightboxIdx(null);
      if (e.key === "ArrowLeft")   setLightboxIdx((p) => p !== null ? (p - 1 + galleryTotal) % galleryTotal : 0);
      if (e.key === "ArrowRight")  setLightboxIdx((p) => p !== null ? (p + 1) % galleryTotal : 0);
    }
  }, [openProjectIdx, lightboxIdx, galleryTotal]); // eslint-disable-line

  useEffect(() => {
    const anyOpen = openProjectIdx !== null || lightboxIdx !== null;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (!anyOpen) document.body.style.overflow = "";
    };
  }, [handleKeyDown, openProjectIdx, lightboxIdx]);

  const switchTab = (tab: Tab) => {
    closeModal();
    setLightboxIdx(null);
    setActiveTab(tab);
  };

  const lightboxItem = lightboxIdx !== null ? filteredGallery[lightboxIdx] : null;

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden noise-overlay bg-forest">
          <div aria-hidden className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-medium/25 blur-3xl anim-aurora pointer-events-none" />
          <div aria-hidden className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-gold/15 blur-3xl anim-aurora pointer-events-none" style={{ animationDelay: "-8s" }} />
          <div className="relative z-10 max-w-[82rem] w-full mx-auto px-4 md:px-8 lg:px-16 pt-36">
            <span className="eyebrow text-green-mint anim-fade-up">Green Up — Kosovo</span>
            <h1 className="display-xl text-white text-[56px] md:text-[96px] lg:text-[120px] mt-4 anim-fade-up anim-delay-1">
              {page("hero.title")}
            </h1>
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">
              {page("hero.subtitle")}
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide">
            {/* Tab switcher */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-green-mint/30 shadow-sm">
                {(["projects", "gallery"] as Tab[]).map((tab) => (
                  <button key={tab} onClick={() => switchTab(tab)}
                    className={`px-7 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      activeTab === tab ? "bg-green-primary text-white shadow-md shadow-green-primary/25" : "text-ink/55 hover:text-green-primary"
                    }`}
                  >
                    {page(`tabs.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* ── PROJECTS TAB ── */}
            {activeTab === "projects" && (
              <>
                <div className="flex flex-wrap gap-2 mb-14 justify-center">
                  {projectFilters.map((f) => (
                    <button key={f} onClick={() => setActiveFilter(f)}
                      className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                        activeFilter === f
                          ? "bg-green-primary text-white shadow-lg shadow-green-primary/20"
                          : "bg-white border border-green-mint/40 text-ink/60 hover:border-green-primary hover:text-green-primary"
                      }`}
                    >
                      {t(`filters.${f}`)}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProjects.map((project) => {
                    const idxInAll = allProjects.findIndex((p) => p.id === project.id);
                    const cover = project.media[0];
                    return (
                      <article key={project.id} className="group cursor-pointer"
                        onClick={() => openModal(idxInAll)}
                      >
                        <div className="relative w-full aspect-[3/4] rounded-2xl bg-green-deep overflow-hidden mb-4">
                          <Image
                            src={cover.type === "video" ? cover.poster! : cover.src}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          <span className="absolute top-3 left-3 rounded-full px-2.5 py-1 glass-dark text-white text-[10px] font-semibold uppercase tracking-[0.2em]">
                            {t(`filters.${project.category}`)}
                          </span>
                          {cover.type === "video" && (
                            <span className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark text-white flex items-center justify-center">
                              <Play size={13} className="translate-x-[1px]" />
                            </span>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                            <span className="btn-base btn-gold !py-2 !px-4 text-[11px]">
                              {t("viewDetails")} <ArrowUpRight size={13} />
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="font-display text-xl font-medium tracking-tight leading-tight">{project.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-ink/50 text-[12px]">
                          <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
                          <span className="w-1 h-1 rounded-full bg-ink/20" />
                          <span className="flex items-center gap-1 font-mono"><Calendar size={11} />{project.year}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── GALLERY TAB ── */}
            {activeTab === "gallery" && (
              <>
                <div className="flex flex-wrap gap-2 mb-14 justify-center">
                  {galleryCategories.map((cat) => (
                    <button key={cat} onClick={() => setActiveGalleryFilter(cat)}
                      className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                        activeGalleryFilter === cat
                          ? "bg-green-primary text-white shadow-lg shadow-green-primary/20"
                          : "bg-white border border-green-mint/40 text-ink/60 hover:border-green-primary hover:text-green-primary"
                      }`}
                    >
                      {gal(`categories.${cat}`)}
                    </button>
                  ))}
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                  {filteredGallery.map((item, i) => (
                    <div key={`${item.cat}-${item.media.src}`}
                      className={`${item.h} w-full break-inside-avoid mb-4 rounded-2xl bg-green-deep relative overflow-hidden group cursor-pointer lift`}
                      onClick={() => setLightboxIdx(i)}
                    >
                      <Image
                        src={item.media.type === "video" ? item.media.poster! : item.media.src}
                        alt={`${gal(`categories.${item.cat}`)} ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white">
                          {item.media.type === "video" ? <Play size={18} className="translate-x-[1px]" /> : <Plus size={18} />}
                        </div>
                      </div>
                      {item.media.type === "video" && (
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dark text-white flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                          <Play size={13} className="translate-x-[1px]" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════
          PROJECT DETAIL MODAL
      ════════════════════════════════════════════ */}
      {openProject && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-6xl max-h-[95dvh] md:max-h-[90dvh] md:rounded-[28px] overflow-hidden flex flex-col bg-[#f8faf9]"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.55)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── TOP BAR ── */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0f2d1f] shrink-0">
              <button onClick={goProjectPrev}
                className="flex items-center gap-1.5 text-white/55 hover:text-white text-[12px] transition-colors cursor-pointer"
                aria-label={modal("prev")}
              >
                <ChevronLeft size={15} />
                <span className="hidden sm:inline">{modal("prev")}</span>
              </button>

              {/* Counter */}
              <span className="font-mono text-[11px] text-white/40 tracking-widest">
                {String((openProjectIdx ?? 0) + 1).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-4">
                <button onClick={goProjectNext}
                  className="flex items-center gap-1.5 text-white/55 hover:text-white text-[12px] transition-colors cursor-pointer"
                  aria-label={modal("next")}
                >
                  <span className="hidden sm:inline">{modal("next")}</span>
                  <ChevronRight size={15} />
                </button>
                <button onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer ml-2"
                  aria-label={modal("close")}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── BODY (scrollable) ── */}
            <div className="overflow-y-auto flex-1">
              <div className="flex flex-col lg:flex-row">

                {/* LEFT — Media section */}
                <div className="lg:w-[55%] shrink-0 bg-[#0f2d1f]">
                  {/* Hero media */}
                  <div className="w-full aspect-video bg-green-deep relative overflow-hidden">
                    {openProject.media[activeMedia].type === "video" ? (
                      <video
                        key={openProject.media[activeMedia].src}
                        src={openProject.media[activeMedia].src}
                        poster={openProject.media[activeMedia].poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={openProject.media[activeMedia].src}
                        alt={`${openProject.title} — ${activeMedia + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                    )}
                    <span className="absolute top-4 left-4 rounded-full px-3 py-1 glass-dark text-white text-[10px] font-semibold uppercase tracking-[0.2em] pointer-events-none">
                      {openProject.media[activeMedia].type === "video"
                        ? modal("video")
                        : t(`filters.${openProject.category}`)}
                    </span>
                    {/* Media counter */}
                    <span className="absolute bottom-3 right-4 font-mono text-[10px] text-white/50 tracking-widest pointer-events-none">
                      {String(activeMedia + 1).padStart(2,"0")} / {String(openProject.media.length).padStart(2,"0")}
                    </span>
                    {/* Prev/Next on hero */}
                    {openProject.media.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveMedia((p) => (p - 1 + openProject.media.length) % openProject.media.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label={modal("prev")}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setActiveMedia((p) => (p + 1) % openProject.media.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label={modal("next")}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                    {openProject.media.map((m, i) => (
                      <button key={i} onClick={() => setActiveMedia(i)}
                        className={`shrink-0 w-20 h-14 rounded-lg bg-green-deep cursor-pointer transition-all duration-200 relative overflow-hidden ${
                          activeMedia === i
                            ? "ring-2 ring-gold ring-offset-1 ring-offset-[#0f2d1f] opacity-100"
                            : "opacity-50 hover:opacity-80"
                        }`}
                        aria-label={`Media ${i + 1}`}
                      >
                        <Image
                          src={m.type === "video" ? m.poster! : m.src}
                          alt={`Thumbnail ${i + 1}`}
                          fill className="object-cover" sizes="80px"
                        />
                        {m.type === "video" && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                            <Play size={14} className="translate-x-[1px]" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Info */}
                <div className="lg:w-[45%] p-6 md:p-8 overflow-y-auto space-y-7 bg-[#f8faf9]">
                  {/* Title & meta */}
                  <div>
                    <h2 className="font-display text-[32px] md:text-[40px] font-medium text-ink tracking-tight leading-tight mb-3">
                      {openProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-[13px] text-ink/55">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-green-primary" />
                        {openProject.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-green-primary" />
                        {openProject.year}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink/40 font-mono mt-2 tracking-wide">
                      {openProject.client}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold text-green-primary uppercase tracking-[0.18em] mb-3">
                      <span className="w-4 h-px bg-green-primary" />
                      {modal("overview")}
                    </h3>
                    <p className="text-ink/70 text-[15px] leading-relaxed">
                      {openProject.fullDesc}
                    </p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold text-green-primary uppercase tracking-[0.18em] mb-3">
                      <span className="w-4 h-px bg-green-primary" />
                      {modal("services")}
                    </h3>
                    <ul className="space-y-2">
                      {openProject.services.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink/70">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-green-primary/10 flex items-center justify-center shrink-0">
                            <Check size={11} className="text-green-primary" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs */}
                  <div>
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold text-green-primary uppercase tracking-[0.18em] mb-3">
                      <span className="w-4 h-px bg-green-primary" />
                      {modal("specs")}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {openProject.specs.map((spec, i) => (
                        <div key={i} className="bg-white rounded-xl px-4 py-3 border border-green-mint/30">
                          <div className="text-[10px] text-ink/40 uppercase tracking-[0.15em] mb-0.5">{spec.label}</div>
                          <div className="text-[14px] font-semibold text-ink">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a href="/contact"
                    className="btn-base btn-gold w-full justify-center cursor-pointer"
                    onClick={closeModal}
                  >
                    {t("viewDetails")} <ArrowUpRight size={14} />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {lightboxIdx !== null && lightboxItem && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p - 1 + galleryTotal) % galleryTotal : 0); }}
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="w-full max-w-3xl h-[70dvh] rounded-3xl mx-16 shadow-2xl shadow-black/50 relative overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.media.type === "video" ? (
              <video
                key={lightboxItem.media.src}
                src={lightboxItem.media.src}
                poster={lightboxItem.media.poster}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <Image
                src={lightboxItem.media.src}
                alt={`Gallery ${lightboxIdx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 896px"
                priority
              />
            )}
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p + 1) % galleryTotal : 0); }}
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono tracking-widest">
            {String(lightboxIdx + 1).padStart(2, "0")} / {String(galleryTotal).padStart(2, "0")}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
