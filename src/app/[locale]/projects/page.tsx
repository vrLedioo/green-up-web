"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import {
  MapPin, Calendar, X, ArrowUpRight, ChevronLeft,
  ChevronRight, Plus, Check, Wrench, BarChart2,
} from "lucide-react";

type ProjectCategory = "all" | "passenger" | "cargo" | "home" | "escalator" | "security";
type GalleryCategory = "all" | "elevators" | "installations" | "team" | "beforeAfter";
type Tab = "projects" | "gallery";

interface Spec  { label: string; value: string }
interface Project {
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  gradient: string;
  desc: string;
  fullDesc: string;
  client: string;
  duration: string;
  services: string[];
  specs: Spec[];
  photos: string[];
}

const allProjects: Project[] = [
  {
    title: "Rezidenca Dardania",
    location: "Prishtinë", year: "2023", category: "passenger",
    gradient: "from-green-primary via-green-medium to-green-light",
    desc: "4 ashensorë pasagjerësh, 12 kate",
    fullDesc: "Green Up instaloi 4 ashensorë modernë pasagjerësh në kompleksin rezidencial Dardania, njëri nga projektet më ambicioze rezidenciale të vitit 2023 në Prishtinë. Çdo ashensor është i pajisur me sistem kontrolli inteligjent, ndriçim LED dhe sistem sigurie ARD për operim të sigurt edhe gjatë ndërprerjeve të rrymës.",
    client: "Dardania Properties sh.p.k.", duration: "3 javë",
    services: ["Instalim i 4 ashensorëve pasagjerësh", "Sistem kontrolli inteligjent", "Ndriçim LED brenda kabinës", "Sisteme sigurie ARD", "Trajnim i personelit teknik"],
    specs: [{ label: "Ashensorë", value: "4 njësi" }, { label: "Kate", value: "12 kate" }, { label: "Kapaciteti", value: "630 kg / 8 persona" }, { label: "Shpejtësia", value: "1.6 m/s" }, { label: "Standardi", value: "EN 81-20/50" }],
    photos: ["from-green-primary via-green-medium to-green-light", "from-green-deep via-green-primary to-green-medium", "from-green-medium via-green-light to-green-mint", "from-ink via-green-primary to-green-medium", "from-green-abyss via-green-medium to-green-light", "from-green-light via-green-primary to-green-deep"],
  },
  {
    title: "Hotel Grand",
    location: "Prizren", year: "2022", category: "passenger",
    gradient: "from-green-deep via-green-primary to-green-medium",
    desc: "Ashensor panoramik me xham",
    fullDesc: "Instalim i një ashensori panoramik me xham të plotë në Hotel Grand të Prizrenit. Projekti kërkoi zgjidhje inxhinierike të veçanta për integrimin e ashensorit në arkitekturën historike të hotelit duke ruajtur estetikën origjinale. Kabinat me xham ofrojnë pamje panoramike të oborrit të brendshëm.",
    client: "Hotel Grand Prizren", duration: "2 javë",
    services: ["Instalim ashensori panoramik me xham", "Dizajn i personalizuar i kabinës", "Integrimi arkitektonik", "Ndriçim ambiental LED", "Garanci 5 vjeçare"],
    specs: [{ label: "Ashensorë", value: "1 njësi panoramike" }, { label: "Kate", value: "6 kate" }, { label: "Kapaciteti", value: "480 kg / 6 persona" }, { label: "Xhami", value: "Triplex 10mm" }, { label: "Standardi", value: "EN 81-40" }],
    photos: ["from-green-deep via-green-primary to-green-medium", "from-green-primary via-green-light to-green-mint", "from-ink via-green-medium to-green-light", "from-green-medium via-ink to-green-primary", "from-green-abyss via-green-primary to-green-light"],
  },
  {
    title: "Qendra Tregtare",
    location: "Ferizaj", year: "2023", category: "escalator",
    gradient: "from-ink via-green-primary to-green-medium",
    desc: "6 eskalatorë + 2 ashensorë mallrash",
    fullDesc: "Projekt madhësor i instalimit të 6 eskalatorëve komercialë dhe 2 ashensorëve mallrash industrialë për qendrën e re tregtare në Ferizaj. Projekti u krye në 3 faza gjatë orëve jashtë orarit të punës për të minimizuar ndikimin tek operacionet e qendrës.",
    client: "QT Ferizaj Invest", duration: "8 javë",
    services: ["Instalim 6 eskalatorësh komercialë", "Instalim 2 ashensorësh mallrash", "Sistem monitorimi të centralizuar", "Ndriçim LED integrues", "Kontrata mirëmbajtjeje 3 vjeçare"],
    specs: [{ label: "Eskalatorë", value: "6 njësi" }, { label: "Ashensorë mallrash", value: "2 njësi" }, { label: "Kapaciteti eskalator", value: "9000 persona/orë" }, { label: "Kapaciteti mallra", value: "2000 kg" }, { label: "Gjerësia", value: "1000 mm" }],
    photos: ["from-ink via-green-primary to-green-medium", "from-green-deep via-ink to-green-primary", "from-green-primary via-green-medium to-green-light", "from-green-medium via-green-primary to-green-deep", "from-ink via-green-medium to-green-light", "from-green-abyss via-green-primary to-green-medium"],
  },
  {
    title: "Vila Moderna",
    location: "Gjakovë", year: "2024", category: "home",
    gradient: "from-green-medium via-green-light to-green-mint",
    desc: "Home lift dru e inox",
    fullDesc: "Instalim i një home lift luksoz me kombinim druri dhe inoksi për një vilë private në Gjakovë. Dizajni u personalizua plotësisht sipas kërkesave estetike të pronarit duke u harmonizuar me interiorin ekzistues të vilës. Instalimi u krye pa gropë (pitless) duke mos dëmtuar strukturën e ndërtesës.",
    client: "Privat", duration: "4 ditë",
    services: ["Instalim home lift pa gropë (pitless)", "Kabinat me dru dhe inoks të personalizuar", "Sistem operimi me energji të ulët", "Integrimi me sistemin e inteligjencës shtëpiake", "Garanci 5 vjeçare"],
    specs: [{ label: "Kapaciteti", value: "250 kg / 3 persona" }, { label: "Kate", value: "3 kate" }, { label: "Shpejtësia", value: "0.15 m/s" }, { label: "Materiali", value: "Dru + Inoks" }, { label: "Tipi", value: "Pitless / Hidraulik" }],
    photos: ["from-green-medium via-green-light to-green-mint", "from-green-primary via-green-light to-green-deep", "from-green-light via-green-medium to-green-primary", "from-green-mint via-green-light to-green-medium", "from-green-deep via-green-medium to-green-light"],
  },
  {
    title: "QKUK",
    location: "Prishtinë", year: "2022", category: "passenger",
    gradient: "from-green-abyss via-green-primary to-green-medium",
    desc: "Ashensorë mjekësorë",
    fullDesc: "Green Up realizoi instalimin e 3 ashensorëve mjekësorë në Qendrën Klinike Universitare të Kosovës. Ashensorët janë të dimensionimit special për transport shtretërish dhe pajisje mjekësore, me sistem të veçantë higjienik dhe hapje me prioritet për emergjencat.",
    client: "QKUK — Ministria e Shëndetësisë", duration: "5 javë",
    services: ["Instalim 3 ashensorësh mjekësorë", "Sistem prioriteti për emergjenca", "Kabinat me sipërfaqe anti-bakteriale", "Integrimi me sistemin e bllokimit zjarrfiks", "Certifikim i posaçëm mjekësor"],
    specs: [{ label: "Ashensorë", value: "3 njësi mjekësore" }, { label: "Dimensioni", value: "1400×2100 mm" }, { label: "Kapaciteti", value: "1600 kg / shtrat+staf" }, { label: "Tipi", value: "MRL Trakcion" }, { label: "Certifikimi", value: "Medical Grade EN 81-76" }],
    photos: ["from-green-abyss via-green-primary to-green-medium", "from-green-deep via-green-primary to-green-light", "from-ink via-green-abyss to-green-primary", "from-green-primary via-green-abyss to-green-deep", "from-green-medium via-green-abyss to-green-primary"],
  },
  {
    title: "Ndërtesa Businessit",
    location: "Mitrovicë", year: "2021", category: "passenger",
    gradient: "from-green-primary via-ink to-green-medium",
    desc: "Modernizim 4 ashensorësh",
    fullDesc: "Modernizim i plotë i 4 ashensorëve ekzistues në ndërtesën e biznesit në Mitrovicë. Projekti përfshiu zëvendësimin e sistemeve të vjetra elektromagnete me kontrollues modernë inverter, duke reduktuar konsumin e energjisë me 40% dhe duke rritur komfortin dhe shpejtësinë e udhëtimit.",
    client: "Ndërtesa Business Center sh.p.k.", duration: "6 javë",
    services: ["Modernizim i 4 ashensorëve", "Instalim kontrolluesish inverter", "Sistem i ri portave automatike", "Ndriçim LED dhe kabina të reja", "Kursim 40% energji elektrike"],
    specs: [{ label: "Ashensorë modernizuar", value: "4 njësi" }, { label: "Kontrollues", value: "VVVF Inverter" }, { label: "Kursim energjie", value: "40%" }, { label: "Kate", value: "8 kate" }, { label: "Shpejtësia e re", value: "1.0 m/s" }],
    photos: ["from-green-primary via-ink to-green-medium", "from-ink via-green-primary to-green-light", "from-green-deep via-ink to-green-medium", "from-green-medium via-ink to-green-primary", "from-ink via-green-medium to-green-primary"],
  },
  {
    title: "Warehouse Logistics",
    location: "Prishtinë", year: "2023", category: "cargo",
    gradient: "from-ink via-green-primary to-green-light",
    desc: "Ashensor mallrash 2000kg",
    fullDesc: "Instalim i një ashensori industrial mallrash me kapacitet 2000 kg për një qendër logjistike në Prishtinë. Ashensori është dizajnuar për ngarkesa të rënda industriale me porta me hapje të plotë dhe dysheme të forcoura çeliku. Sistemi i kontrollit lejon operim automatik dhe manual.",
    client: "Kosovo Logistics Group", duration: "3 javë",
    services: ["Instalim ashensori industrial 2000kg", "Porta me hapje të plotë dysh", "Dysheme çeliku e forcuara", "Sistem kontrolli automatik+manual", "Certifikim industrial"],
    specs: [{ label: "Kapaciteti", value: "2000 kg" }, { label: "Hapja e portës", value: "2000×2200 mm" }, { label: "Kate", value: "4 kate" }, { label: "Shpejtësia", value: "0.5 m/s" }, { label: "Tipi", value: "Hidraulik Industrial" }],
    photos: ["from-ink via-green-primary to-green-light", "from-green-deep via-ink to-green-primary", "from-ink via-green-medium to-green-light", "from-green-primary via-ink to-green-medium", "from-green-medium via-green-deep to-ink"],
  },
  {
    title: "Rezidenca Sfera",
    location: "Prishtinë", year: "2024", category: "passenger",
    gradient: "from-green-light via-green-medium to-green-primary",
    desc: "Instalim 6 ashensorësh",
    fullDesc: "Instalim i 6 ashensorëve luksoz pasagjerësh për kompleksin rezidencial premium Sfera në Prishtinë. Projekti u realizua në koordinim të ngushtë me arkitektin e projektit për të siguruar integrim të plotë estetik. Kabinët kanë finishe të personalizuara me pasqyra, druri dhe ndriçim ambient.",
    client: "Sfera Development Group", duration: "4 javë",
    services: ["Instalim 6 ashensorësh pasagjerësh", "Kabina me finishe premium", "Pasqyra dhe dru i personalizuar", "Ndriçim ambient LED", "Sistem destinacioni me ekran"],
    specs: [{ label: "Ashensorë", value: "6 njësi" }, { label: "Kate", value: "14 kate" }, { label: "Kapaciteti", value: "800 kg / 10 persona" }, { label: "Shpejtësia", value: "2.0 m/s" }, { label: "Finishi", value: "Premium me pasqyrë" }],
    photos: ["from-green-light via-green-medium to-green-primary", "from-green-mint via-green-light to-green-medium", "from-green-primary via-green-light to-green-mint", "from-green-medium via-green-primary to-green-deep", "from-green-light via-green-primary to-green-deep", "from-green-mint via-green-medium to-green-primary"],
  },
  {
    title: "Shkolla Speciale",
    location: "Gjilan", year: "2022", category: "security",
    gradient: "from-green-medium via-green-primary to-green-deep",
    desc: "Platforma aksesueshmërie",
    fullDesc: "Green Up instaloi platforma ngritëse vertikale dhe shkallë lëvizëse (stairlift) për të siguruar aksesueshmëri të plotë për nxënësit me aftësi të kufizuara në shkollën speciale në Gjilan. Projekti u financua nga fondet BE dhe plotëson të gjitha standardet e direktivës europiane të aksesueshmërisë.",
    client: "MASHT — Ministria e Arsimit", duration: "2 javë",
    services: ["Instalim 2 platformash vertikale", "Instalim stairlift për shkallë", "Certifikim sipas direktivës BE", "Trajnim i stafit shkollor", "Mirëmbajtje vjetore falas (3 vjet)"],
    specs: [{ label: "Platforma", value: "2 njësi vertikale" }, { label: "Stairlift", value: "1 njësi" }, { label: "Kapaciteti", value: "300 kg" }, { label: "Certifikimi", value: "EN 81-41 / BE" }, { label: "Financimi", value: "Fondet BE" }],
    photos: ["from-green-medium via-green-primary to-green-deep", "from-green-primary via-green-medium to-green-abyss", "from-green-deep via-green-medium to-green-primary", "from-green-abyss via-green-deep to-green-medium", "from-green-medium via-green-abyss to-green-deep"],
  },
  {
    title: "Airport Hotel",
    location: "Prishtinë", year: "2023", category: "escalator",
    gradient: "from-green-deep via-ink to-green-primary",
    desc: "Eskalatorë hoteli",
    fullDesc: "Instalim i 2 eskalatorëve reprezentativë dhe 2 ashensorëve pasagjerësh premium për hotelin e ri afër Aeroportit të Prishtinës. Eskalatorët janë me iluminim të integruar dhe sistem automatik ndezjeje/fikjeje bazuar në ndjeshmëri infrared, duke kursyer energji kur nuk ka lëvizje.",
    client: "Airport Hotel Prishtina", duration: "4 javë",
    services: ["Instalim 2 eskalatorësh reprezentativë", "Instalim 2 ashensorësh premium", "Iluminim integrues eskalator", "Sistem auto ndezje/fikje", "Kontrata mirëmbajtjeje 5 vjeçare"],
    specs: [{ label: "Eskalatorë", value: "2 njësi" }, { label: "Ashensorë", value: "2 njësi premium" }, { label: "Gjerësia eskalator", value: "800 mm" }, { label: "Shpejtësia", value: "0.5 m/s" }, { label: "Kursim energjie", value: "35% auto" }],
    photos: ["from-green-deep via-ink to-green-primary", "from-ink via-green-deep to-green-medium", "from-green-primary via-green-deep to-ink", "from-green-medium via-ink to-green-deep", "from-ink via-green-primary to-green-deep"],
  },
  {
    title: "Vila Brezovica",
    location: "Brezovicë", year: "2024", category: "home",
    gradient: "from-green-primary via-green-light to-green-mint",
    desc: "Residential home lift",
    fullDesc: "Instalim i një home lift elegant dhe kompakt për një vilë private në resortin e Brezovicës. Ashensori u instalua gjatë fazës së ndërtimit duke lejuar planifikim optimal të hapësirës. Kabina ka finishe luksoze me dru, dritare panoramike dhe sistem ndriçimi ambient.",
    client: "Privat — Vila Resort", duration: "3 ditë",
    services: ["Instalim home lift gjatë ndërtimit", "Kabina me dru luksoz dhe dritare", "Sistem ndriçimi ambient", "Integrim me sistemin e smart home", "Garanci 5 vjeçare + mirëmbajtje vjetore"],
    specs: [{ label: "Kapaciteti", value: "320 kg / 4 persona" }, { label: "Kate", value: "4 kate" }, { label: "Shpejtësia", value: "0.15 m/s" }, { label: "Materiali", value: "Dru Ahu + Xham" }, { label: "Tipi", value: "MRL Trakcion Pitless" }],
    photos: ["from-green-primary via-green-light to-green-mint", "from-green-mint via-green-primary to-green-light", "from-green-light via-green-mint to-green-medium", "from-green-medium via-green-light to-green-mint", "from-green-mint via-green-medium to-green-primary"],
  },
  {
    title: "Fabrika Ramiq",
    location: "Suharekë", year: "2021", category: "cargo",
    gradient: "from-ink via-green-primary to-green-light",
    desc: "Ashensor industrial 5000kg",
    fullDesc: "Instalim i një ashensori industrial shumë-kapacitesh 5000 kg për fabrikën prodhuese Ramiq në Suharekë. Ky është ndër projektet më të mëdha industriale të Green Up, me një platformë ngritëse të dizajnuar posaçërisht për linjen e prodhimit. Sistemi lejon ngarkimin me fork-lift dhe vagonë industrial.",
    client: "Ramiq Industrial sh.p.k.", duration: "4 javë",
    services: ["Instalim ashensori 5000 kg", "Platformë për fork-lift", "Porta industriale 3×3m", "Sistem kontrolli PLC", "Certifikim i Inspection Body akredituar"],
    specs: [{ label: "Kapaciteti", value: "5000 kg" }, { label: "Hapja e portës", value: "3000×3000 mm" }, { label: "Kate", value: "3 kate" }, { label: "Shpejtësia", value: "0.25 m/s" }, { label: "Kontrolluesi", value: "PLC Siemens" }],
    photos: ["from-ink via-green-primary to-green-light", "from-green-deep via-ink to-green-medium", "from-ink via-green-medium to-green-primary", "from-green-primary via-green-deep to-ink", "from-green-medium via-green-primary to-ink", "from-ink via-green-deep to-green-primary"],
  },
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
  const t       = useTranslations("projects");
  const page    = useTranslations("projectsPage");
  const gal     = useTranslations("gallery");
  const modal   = useTranslations("projectsPage.modal");

  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Projects state
  const [activeFilter, setActiveFilter]       = useState<ProjectCategory>("all");
  const [openProject, setOpenProject]         = useState<Project | null>(null);
  const [openProjectIdx, setOpenProjectIdx]   = useState<number | null>(null);
  const [activePhoto, setActivePhoto]         = useState(0);

  // Gallery state
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<GalleryCategory>("all");
  const [lightboxIdx, setLightboxIdx]                 = useState<number | null>(null);

  const projectFilters: ProjectCategory[] = ["all", "passenger", "cargo", "home", "escalator", "security"];
  const galleryCategories: GalleryCategory[] = ["all", "elevators", "installations", "team", "beforeAfter"];

  const filteredProjects  = activeFilter === "all" ? allProjects : allProjects.filter((p) => p.category === activeFilter);
  const filteredGallery   = activeGalleryFilter === "all" ? galleryItems : galleryItems.filter((i) => i.cat === activeGalleryFilter);
  const galleryTotal      = filteredGallery.length;

  const openModal = (project: Project, idxInAll: number) => {
    setOpenProject(project);
    setOpenProjectIdx(idxInAll);
    setActivePhoto(0);
  };

  const closeModal = () => {
    setOpenProject(null);
    setOpenProjectIdx(null);
    setActivePhoto(0);
  };

  const goProjectPrev = () => {
    if (openProjectIdx === null) return;
    const next = (openProjectIdx - 1 + allProjects.length) % allProjects.length;
    openModal(allProjects[next], next);
  };

  const goProjectNext = () => {
    if (openProjectIdx === null) return;
    const next = (openProjectIdx + 1) % allProjects.length;
    openModal(allProjects[next], next);
  };

  // Keyboard handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (openProject) {
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
  }, [openProject, openProjectIdx, lightboxIdx, galleryTotal]); // eslint-disable-line

  useEffect(() => {
    const anyOpen = openProject !== null || lightboxIdx !== null;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (!anyOpen) document.body.style.overflow = "";
    };
  }, [handleKeyDown, openProject, lightboxIdx]);

  const switchTab = (tab: Tab) => {
    closeModal();
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

                {/* TODO: Replace gradient divs with real project photos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProjects.map((project) => {
                    const idxInAll = allProjects.indexOf(project);
                    return (
                      <article key={project.title} className="group cursor-pointer"
                        onClick={() => openModal(project, idxInAll)}
                      >
                        <div className={`relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden mb-4`}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          <span className="absolute top-3 left-3 rounded-full px-2.5 py-1 glass-dark text-white text-[10px] font-semibold uppercase tracking-[0.2em]">
                            {t(`filters.${project.category}`)}
                          </span>
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
                {/* TODO: Replace gradient divs with real gallery photos */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                  {filteredGallery.map((item, i) => (
                    <div key={`${item.cat}-${i}`}
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

                {/* LEFT — Photo section */}
                <div className="lg:w-[55%] shrink-0 bg-[#0f2d1f]">
                  {/* Hero photo */}
                  {/* TODO: Replace with real project <Image> when client provides photos */}
                  <div className={`w-full aspect-video bg-gradient-to-br ${openProject.photos[activePhoto]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full px-3 py-1 glass-dark text-white text-[10px] font-semibold uppercase tracking-[0.2em]">
                      {t(`filters.${openProject.category}`)}
                    </span>
                    {/* Photo counter */}
                    <span className="absolute bottom-3 right-4 font-mono text-[10px] text-white/50 tracking-widest">
                      {String(activePhoto + 1).padStart(2,"0")} / {String(openProject.photos.length).padStart(2,"0")}
                    </span>
                    {/* Prev/Next on hero */}
                    <button
                      onClick={() => setActivePhoto((p) => (p - 1 + openProject.photos.length) % openProject.photos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setActivePhoto((p) => (p + 1) % openProject.photos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                    {openProject.photos.map((photo, i) => (
                      <button key={i} onClick={() => setActivePhoto(i)}
                        className={`shrink-0 w-20 h-14 rounded-lg bg-gradient-to-br ${photo} cursor-pointer transition-all duration-200 ${
                          activePhoto === i
                            ? "ring-2 ring-gold ring-offset-1 ring-offset-[#0f2d1f] opacity-100"
                            : "opacity-50 hover:opacity-80"
                        }`}
                        aria-label={`Photo ${i + 1}`}
                      />
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
                      <span className="flex items-center gap-1.5">
                        <Wrench size={13} className="text-green-primary" />
                        {openProject.duration}
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
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p - 1 + galleryTotal) % galleryTotal : 0); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <div className={`w-full max-w-3xl aspect-[4/3] bg-gradient-to-br ${filteredGallery[lightboxIdx]?.gradient} rounded-3xl mx-16 shadow-2xl shadow-black/50`}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-dark text-white flex items-center justify-center hover:bg-white/15 transition-colors z-10 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p !== null ? (p + 1) % galleryTotal : 0); }}
            aria-label="Next image"
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
