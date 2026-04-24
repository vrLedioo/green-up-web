"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import { Target, Eye, MapPin } from "lucide-react";

const teamMembers = [
  { name: "Agron Berisha",    role: "Drejtor Ekzekutiv",    initial: "AB" },
  { name: "Valbona Krasniqi", role: "Menaxhere Projektesh", initial: "VK" },
  { name: "Driton Hoxha",     role: "Inxhinier Kryesor",    initial: "DH" },
  { name: "Fjolla Gashi",     role: "Menaxhere Shitjesh",   initial: "FG" },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const timeline = t.raw("timeline.items") as Array<{ year: string; text: string }>;

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
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-cream">
          <div className="container-wide">
            <div className="text-center mb-14">
              <span className="eyebrow text-green-primary">{t("mission.title")}</span>
              <h2 className="font-display text-5xl md:text-6xl font-medium text-ink mt-4 tracking-tight leading-[0.95]">
                {t("mission.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-[24px] bg-white border border-green-mint/40 p-10 lift overflow-hidden">
                <div aria-hidden className="absolute -top-20 -right-10 w-60 h-60 rounded-full bg-green-pale/60 blur-3xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-primary to-green-medium flex items-center justify-center text-white shadow-lg shadow-green-primary/20 mb-6">
                    <Target size={20} />
                  </div>
                  <h3 className="font-display text-3xl font-medium text-ink mb-4 tracking-tight">{t("mission.missionTitle")}</h3>
                  <p className="text-ink/65 leading-relaxed text-[15.5px]">{t("mission.missionText")}</p>
                </div>
              </div>
              <div className="relative rounded-[24px] bg-forest p-10 text-white overflow-hidden noise-overlay">
                <div aria-hidden className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl glass-dark flex items-center justify-center mb-6">
                    <Eye size={20} />
                  </div>
                  <h3 className="font-display text-3xl font-medium mb-4 tracking-tight">{t("mission.visionTitle")}</h3>
                  <p className="text-white/75 leading-relaxed text-[15.5px]">{t("mission.visionText")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative section-padding bg-forest overflow-hidden noise-overlay">
          <div aria-hidden className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full bg-green-medium/25 blur-3xl pointer-events-none" />

          <div className="relative container-wide">
            <div className="text-center mb-16">
              <span className="eyebrow text-green-mint">{t("timeline.title")}</span>
              <h2 className="font-display text-5xl md:text-6xl font-medium text-white mt-4 tracking-tight leading-[0.95]">
                {t("timeline.title")}
              </h2>
            </div>
            <div className="relative">
              <div aria-hidden className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />
              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
                      i % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="rounded-2xl glass-dark p-6 inline-block max-w-md">
                        <p className="text-white/80 text-[15px] leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#B08D34] border-4 border-green-abyss items-center justify-center shrink-0 z-10 shadow-lg shadow-gold/30">
                      <span className="text-ink text-[11px] font-bold font-mono">{item.year.slice(2)}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-display text-5xl md:text-6xl font-medium text-gradient-gold tracking-tight">
                        {item.year}
                      </span>
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
              <span className="eyebrow text-green-primary">{t("team.title")}</span>
              <h2 className="font-display text-5xl md:text-6xl font-medium text-ink mt-4 tracking-tight leading-[0.95]">
                {t("team.title")}
              </h2>
              <p className="text-ink/60 text-lg mt-4">{t("team.subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {teamMembers.map((member, i) => (
                <div key={i} className="group">
                  {/* TODO: Replace with real team photos */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-green-primary via-green-medium to-green-light lift">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-[88px] text-white/80 font-medium transition-transform duration-700 group-hover:scale-105">
                      {member.initial}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <h3 className="font-display text-xl font-medium tracking-tight">{member.name}</h3>
                      <p className="text-white/70 text-[12px] mt-1 uppercase tracking-[0.2em]">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="section-padding bg-white">
          <div className="container-wide text-center">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-green-primary to-green-medium text-white items-center justify-center mb-6 shadow-lg shadow-green-primary/20">
              <MapPin size={22} />
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-ink tracking-tight leading-[0.95]">
              {t("coverage.title")}
            </h2>
            <p className="text-ink/60 text-xl max-w-2xl mx-auto mt-5 mb-10">{t("coverage.subtitle")}</p>
            {/* TODO: Replace with real Kosovo map or Google Maps embed */}
            <div className="relative w-full max-w-3xl mx-auto h-72 rounded-[24px] overflow-hidden bg-gradient-to-br from-green-pale via-green-mint to-green-light/70 border border-green-mint/50">
              <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(45,106,79,0.25), transparent 50%), radial-gradient(circle at 70% 60%, rgba(201,168,76,0.2), transparent 50%)" }} />
              <div className="relative flex flex-col items-center justify-center h-full text-green-primary">
                <MapPin size={42} className="opacity-60 mb-3" />
                <p className="font-display text-2xl font-medium">Harta e Mbulimit — Kosovë</p>
                <p className="text-sm opacity-70 mt-2 font-mono">Prishtinë · Prizren · Pejë · Gjakovë · Ferizaj · Gjilan · Mitrovicë</p>
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
