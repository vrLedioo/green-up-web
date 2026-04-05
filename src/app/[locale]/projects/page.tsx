"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Calendar, X } from "lucide-react";

type Category = "all" | "passenger" | "cargo" | "home" | "escalator" | "security";

const allProjects = [
  { title: "Rezidenca Dardania", location: "Prishtinë", year: "2023", category: "passenger" as Category, gradient: "from-green-primary to-green-medium",   desc: "4 ashensorë pasagjerësh, 12 kate" },
  { title: "Hotel Grand",        location: "Prizren",   year: "2022", category: "passenger" as Category, gradient: "from-[#1a4332] to-green-primary",       desc: "Ashensor panoramik me xham" },
  { title: "Qendra Tregtare",    location: "Ferizaj",   year: "2023", category: "escalator" as Category, gradient: "from-dark to-green-medium",             desc: "6 eskalatorë + 2 ashensorë mallrash" },
  { title: "Vila Moderna",       location: "Gjakovë",   year: "2024", category: "home" as Category,      gradient: "from-green-medium to-green-light",      desc: "Home lift dru e inox" },
  { title: "QKUK",               location: "Prishtinë", year: "2022", category: "passenger" as Category, gradient: "from-[#0f2d1f] to-green-primary",       desc: "Ashensorë mjekësorë" },
  { title: "Ndërtesa Businessit",location: "Mitrovicë", year: "2021", category: "passenger" as Category, gradient: "from-green-primary to-dark",            desc: "Modernizim 4 ashensorësh" },
  { title: "Warehouse Logistics",location: "Prishtinë", year: "2023", category: "cargo" as Category,     gradient: "from-dark to-green-primary",            desc: "Ashensor mallrash 2000kg" },
  { title: "Rezidenca Sfera",    location: "Prishtinë", year: "2024", category: "passenger" as Category, gradient: "from-green-light to-green-primary",     desc: "Instalim 6 ashensorësh" },
  { title: "Shkolla Speciale",   location: "Gjilan",    year: "2022", category: "security" as Category,  gradient: "from-green-medium to-green-primary",    desc: "Platforma aksesueshmërie" },
  { title: "Airport Hotel",      location: "Prishtinë", year: "2023", category: "escalator" as Category, gradient: "from-[#1a4332] to-dark",               desc: "Eskalatorë hoteli" },
  { title: "Vila Brezovica",     location: "Brezovicë", year: "2024", category: "home" as Category,      gradient: "from-green-primary to-green-mint",      desc: "Residential home lift" },
  { title: "Fabrika Ramiq",      location: "Suharekë",  year: "2021", category: "cargo" as Category,     gradient: "from-dark to-green-light",              desc: "Ashensor industrial 5000kg" },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const page = useTranslations("projectsPage");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxProject, setLightboxProject] = useState<(typeof allProjects)[0] | null>(null);

  const filters: Category[] = ["all", "passenger", "cargo", "home", "escalator", "security"];
  const filtered = activeFilter === "all" ? allProjects : allProjects.filter((p) => p.category === activeFilter);

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
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mt-3 anim-fade-up anim-delay-1">{page("hero.title")}</h1>
            <p className="text-white/70 text-xl mt-4 max-w-xl anim-fade-up anim-delay-2">{page("hero.subtitle")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
                    activeFilter === f ? "bg-green-primary text-white" : "bg-white border border-green-mint/40 text-dark/60 hover:border-green-primary hover:text-green-primary"
                  }`}>
                  {t(`filters.${f}`)}
                </button>
              ))}
            </div>

            {/* Grid */}
            {/* TODO: Replace gradient divs with real project photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((project, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => setLightboxProject(project)}>
                  <div className={`w-full h-52 rounded-sm bg-gradient-to-br ${project.gradient} relative overflow-hidden mb-3`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute top-3 left-3 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {t(`filters.${project.category}`)}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <span className="bg-white text-dark text-xs font-semibold px-4 py-2 rounded-sm">{t("viewDetails")}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-dark text-sm">{project.title}</h3>
                  <div className="flex items-center gap-3 text-dark/40 text-xs mt-1">
                    <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxProject(null)}>
          <div className="bg-white rounded-sm max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className={`w-full h-56 bg-gradient-to-br ${lightboxProject.gradient}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-dark">{lightboxProject.title}</h2>
                  <div className="flex gap-4 text-dark/50 text-sm mt-1">
                    <span className="flex items-center gap-1"><MapPin size={12} />{lightboxProject.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{lightboxProject.year}</span>
                  </div>
                </div>
                <button onClick={() => setLightboxProject(null)} className="text-dark/40 hover:text-dark p-1"><X size={20} /></button>
              </div>
              <p className="text-dark/70">{lightboxProject.desc}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
