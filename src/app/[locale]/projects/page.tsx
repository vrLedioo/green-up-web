"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import { MapPin, Calendar, X, ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";

type ProjectCategory = "all" | "passenger" | "cargo" | "home" | "escalator" | "security";
type GalleryCategory = "all" | "elevators" | "installations" | "team" | "beforeAfter";
type Tab = "projects" | "gallery";

const allProjects = [
  { title: "Rezidenca Dardania",  location: "Prishtinë", year: "2023", category: "passenger" as ProjectCategory, gradient: "from-green-primary via-green-medium to-green-light", desc: "4 ashensorë pasagjerësh, 12 kate" },
  { title: "Hotel Grand",         location: "Prizren",   year: "2022", category: "passenger" as ProjectCategory, gradient: "from-green-deep via-green-primary to-green-medium", desc: "Ashensor panoramik me xham" },
  { title: "Qendra Tregtare",     location: "Ferizaj",   year: "2023", category: "escalator" as ProjectCategory, gradient: "from-ink via-green-primary to-green-medium",        desc: "6 eskalatorë + 2 ashensorë mallrash" },
  { title: "Vila Moderna",        location: "Gjakovë",   year: "2024", category: "home" as ProjectCategory,      gradient: "from-green-medium via-green-light to-green-mint",   desc: "Home lift dru e inox" },
  { title: "QKUK",                location: "Prishtinë", year: "2022", category: "passenger" as ProjectCategory, gradient: "from-green-abyss via-green-primary to-green-medium", desc: "Ashensorë mjekësorë" },
  { title: "Ndërtesa Businessit", location: "Mitrovicë", year: "2021", category: "passenger" as ProjectCategory, gradient: "from-green-primary via-ink to-green-medium",        desc: "Modernizim 4 ashensorësh" },
  { title: "Warehouse Logistics", location: "Prishtinë", year: "2023", category: "cargo" as ProjectCategory,     gradient: "from-ink via-green-primary to-green-light",         desc: "Ashensor mallrash 2000kg" },
  { title: "Rezidenca Sfera",     location: "Prishtinë", year: "2024", category: "passenger" as ProjectCategory, gradient: "from-green-light via-green-medium to-green-primary", desc: "Instalim 6 ashensorësh" },
  { title: "Shkolla Speciale",    location: "Gjilan",    year: "2022", category: "security" as ProjectCategory,  gradient: "from-green-medium via-green-primary to-green-deep",  desc: "Platforma aksesueshmërie" },
  { title: "Airport Hotel",       location: "Prishtinë", year: "2023", category: "escalator" as ProjectCategory, gradient: "from-green-deep via-ink to-green-primary",           desc: "Eskalatorë hoteli" },
  { title: "Vila Brezovica",      location: "Brezovicë", year: "2024", category: "home" as ProjectCategory,      gradient: "from-green-primary via-green-light to-green-mint",   desc: "Residential home lift" },
  { title: "Fabrika Ramiq",       location: "Suharekë",  year: "2021", category: "cargo" as ProjectCategory,     gradient: "from-ink via-green-primary to-green-light",          desc: "Ashensor industrial 5000kg" },
];

const galleryItems = [
  { cat: "elevators" as GalleryCategory,     gradient: "from-green-primary via-green-medium to-green-light",  h: "h-80" },
  { cat: "installations" as GalleryCategory, gradient: "from-green-deep via-green-primary to-green-medium",   h: "h-56" },
  { cat: "team" as GalleryCategory,          gradient: "from-ink via-green-primary to-green-medium",          h: "h-64" },
  { cat: "elevators" as GalleryCategory,     gradient: "from-green-medium via-green-light to-green-mint",     h: "h-48" },
  { cat: "beforeAfter" as GalleryCategory,   gradient: "from-green-abyss via-green-primary to-green-medium",  h: "h-80" },
  { cat: "installations" as GalleryCategory, gradient: "from-green-primary via-ink to-green-medium",          h: "h-56" },
  { cat: "elevators" as GalleryCategory,     gradient: "from-green-light via-green-primary to-green-deep",    h: "h-64" },
  { cat: "team" as GalleryCategory,          gradient: "from-ink via-green-medium to-green-light",            h: "h-48" },
  { cat: "beforeAfter" as GalleryCategory,   gradient: "from-green-medium via-ink to-green-primary",          h: "h-80" },
  { cat: "installations" as GalleryCategory, gradient: "from-green-primary via-green-medium to-green-light",  h: "h-56" },
  { cat: "elevators" as GalleryCategory,     gradient: "from-green-deep via-ink to-green-primary",            h: "h-48" },
  { cat: "team" as GalleryCategory,          gradient: "from-green-medium via-green-primary to-green-deep",   h: "h-64" },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const page = useTranslations("projectsPage");
  const gal = useTranslations("gallery");

  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Projects state
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [lightboxProject, setLightboxProject] = useState<(typeof allProjects)[0] | null>(null);

  // Gallery state
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<GalleryCategory>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const projectFilters: ProjectCategory[] = ["all", "passenger", "cargo", "home", "escalator", "security"];
  const galleryCategories: GalleryCategory[] = ["all", "elevators", "installations", "team", "beforeAfter"];

  const filteredProjects = activeFilter === "all" ? allProjects : allProjects.filter((p) => p.category === activeFilter);
  const filteredGallery = activeGalleryFilter === "all" ? galleryItems : galleryItems.filter((i) => i.cat === activeGalleryFilter);
  const galleryTotal = filteredGallery.length;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") setLightboxIdx((p) => (p !== null ? (p - 1 + galleryTotal) % galleryTotal : 0));
      if (e.key === "ArrowRight") setLightboxIdx((p) => (p !== null ? (p + 1) % galleryTotal : 0));
    },
    [lightboxIdx, galleryTotal]
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

  // Reset lightboxes when switching tabs
  const switchTab = (tab: Tab) => {
    setLightboxProject(null);
    setLightboxIdx(null);
    setActiveTab(tab);
  };

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
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    className={`px-7 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      activeTab === tab
                        ? "bg-green-primary text-white shadow-md shadow-green-primary/25"
                        : "text-ink/55 hover:text-green-primary"
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
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
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

                {/* TODO: Replace gradient divs with real project photos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProjects.map((project, i) => (
                    <article
                      key={i}
                      className="group cursor-pointer"
                      onClick={() => setLightboxProject(project)}
                    >
                      <div className={`relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden mb-4`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <span className="absolute top-3 left-3 rounded-full px-2.5 py-1 glass-dark text-white text-[10px] font-semibold uppercase tracking-[0.2em]">
                          {t(`filters.${project.category}`)}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                          <span className="btn-base btn-gold !py-2 !px-4 text-[11px]">
                            {t("viewDetails")}
                            <ArrowUpRight size={13} />
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
                  ))}
                </div>
              </>
            )}

            {/* ── GALLERY TAB ── */}
            {activeTab === "gallery" && (
              <>
                <div className="flex flex-wrap gap-2 mb-14 justify-center">
                  {galleryCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveGalleryFilter(cat)}
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

                {/* TODO: Replace gradient divs with real gallery photos */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                  {filteredGallery.map((item, i) => (
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
              </>
            )}
          </div>
        </section>
      </main>

      {/* Projects Lightbox */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="bg-white rounded-[24px] max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative w-full aspect-[4/3] bg-gradient-to-br ${lightboxProject.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-7">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <h2 className="font-display text-3xl font-medium text-ink tracking-tight leading-tight">{lightboxProject.title}</h2>
                  <div className="flex gap-3 text-ink/50 text-sm mt-2">
                    <span className="flex items-center gap-1"><MapPin size={12} />{lightboxProject.location}</span>
                    <span className="flex items-center gap-1 font-mono"><Calendar size={12} />{lightboxProject.year}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLightboxProject(null)}
                  className="text-ink/40 hover:text-ink p-1 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-ink/70 leading-relaxed">{lightboxProject.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p - 1 + galleryTotal) % galleryTotal : 0); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            className={`w-full max-w-3xl aspect-[4/3] bg-gradient-to-br ${filteredGallery[lightboxIdx]?.gradient} rounded-3xl mx-16 shadow-2xl shadow-black/50`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p + 1) % galleryTotal : 0); }}
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
            {String(lightboxIdx + 1).padStart(2, "0")} / {String(galleryTotal).padStart(2, "0")}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
