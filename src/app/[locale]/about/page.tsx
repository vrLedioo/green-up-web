"use client";

import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import { Target, Eye, MapPin } from "lucide-react";

const teamKeys = ["ceo", "projectManager", "chiefEngineer", "salesManager"] as const;

export default function AboutPage() {
  const t = useTranslations("about");

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
              {teamKeys.map((key, i) => {
                const name = t(`team.members.${key}.name`);
                const role = t(`team.members.${key}.role`);
                const initial = name.split(' ').map((w: string) => w[0]).join('');
                return (
                <div key={key} className="group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-green-primary via-green-medium to-green-light lift">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-[88px] text-white/80 font-medium transition-transform duration-700 group-hover:scale-105">
                      {initial}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <h3 className="font-display text-xl font-medium tracking-tight">{name}</h3>
                      <p className="text-white/70 text-[12px] mt-1 uppercase tracking-[0.2em]">{role}</p>
                    </div>
                  </div>
                </div>
                );
              })}
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
            {/* Google Maps embed for Kosovo coverage */}
            <div className="relative w-full max-w-3xl mx-auto h-72 rounded-[24px] overflow-hidden border border-green-mint/50">
              <iframe
                title={t("coverage.title")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380000!2d20.9!3d42.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353fcee8db6b459%3A0x2a4164bf4505be10!2sKosovo!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
