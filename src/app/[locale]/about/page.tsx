"use client";

import { useTranslations } from "next-intl";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import { Target, Eye, MapPin } from "lucide-react";

const teamMembers = [
  { name: "Agron Berisha",  role: "Drejtor Ekzekutiv",   initial: "AB" },
  { name: "Valbona Krasniqi", role: "Menaxhere Projektesh", initial: "VK" },
  { name: "Driton Hoxha",   role: "Inxhinier Kryesor",    initial: "DH" },
  { name: "Fjolla Gashi",   role: "Menaxhere Shitjesh",   initial: "FG" },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const timeline = t.raw("timeline.items") as Array<{ year: string; text: string }>;

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
            <p className="text-white/70 text-xl mt-4 max-w-xl anim-fade-up anim-delay-2">{t("hero.subtitle")}</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-dark">{t("mission.title")}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-green-mint/30 rounded-sm p-10">
                <div className="w-12 h-12 bg-green-primary rounded-sm flex items-center justify-center mb-5">
                  <Target size={22} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold text-dark mb-4">{t("mission.missionTitle")}</h3>
                <p className="text-dark/70 leading-relaxed text-lg">{t("mission.missionText")}</p>
              </div>
              <div className="bg-green-primary rounded-sm p-10 text-white">
                <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center mb-5">
                  <Eye size={22} className="text-white" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">{t("mission.visionTitle")}</h3>
                <p className="text-white/80 leading-relaxed text-lg">{t("mission.visionText")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-dark">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white">{t("timeline.title")}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-primary/30 hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white/5 border border-white/10 rounded-sm p-6 inline-block">
                        <p className="text-white/80 text-base">{item.text}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-green-primary border-4 border-dark items-center justify-center shrink-0 z-10">
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-gold text-3xl font-bold">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-dark">{t("team.title")}</h2>
              <p className="text-dark/60 text-lg mt-3">{t("team.subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <div key={i} className="text-center">
                  {/* TODO: Replace with real team photos */}
                  <div className="w-full aspect-square bg-gradient-to-br from-green-primary to-green-medium rounded-sm flex items-center justify-center mb-4 text-white font-display text-4xl font-bold">
                    {member.initial}
                  </div>
                  <h3 className="font-semibold text-dark">{member.name}</h3>
                  <p className="text-dark/50 text-sm mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="section-padding bg-white">
          <div className="container-wide text-center">
            <MapPin size={40} className="text-green-primary mx-auto mb-4" />
            <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mb-4">{t("coverage.title")}</h2>
            <p className="text-dark/60 text-xl max-w-2xl mx-auto mb-6">{t("coverage.subtitle")}</p>
            {/* TODO: Replace with real Kosovo map or Google Maps embed */}
            <div className="w-full max-w-2xl mx-auto h-64 bg-gradient-to-br from-green-pale to-green-mint border border-green-mint/50 rounded-sm flex items-center justify-center">
              <div className="text-center text-green-primary">
                <MapPin size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-semibold text-lg">Harta e Mbulimit — Kosovë</p>
                <p className="text-sm opacity-60 mt-1">Prishtinë · Prizren · Pejë · Gjakovë · Ferizaj · Gjilan · Mitrovicë</p>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
