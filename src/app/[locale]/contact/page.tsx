"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error" | "ratelimit" | "validation";

const ALLOWED_TYPES = ["quote", "maintenance", "info", "other"] as const;
type RequestType = (typeof ALLOWED_TYPES)[number] | "";

export default function ContactPage() {
  const t = useTranslations("contact");
  const emergency = useTranslations("emergency");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "" as RequestType,
    message: "",
    honeypot: "", // must remain empty — hidden from real users
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    // Client-side guard: discard if honeypot is filled (redundant with server, adds latency savings)
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 429) {
        setStatus("ratelimit");
        return;
      }

      if (res.status === 422) {
        const body = await res.json() as { fields?: Record<string, string[]> };
        setFieldErrors(body.fields ?? {});
        setStatus("validation");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", type: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-green-mint/40 rounded-sm text-dark focus:outline-none focus:border-green-primary transition-colors";
  const errorClass = "mt-1 text-red-600 text-xs";

  return (
    <>
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

        <section className="section-padding bg-cream">
          <div className="container-wide grid lg:grid-cols-2 gap-12">
            {/* Left: info */}
            <div>
              {/* Emergency box */}
              <div className="bg-red-50 border-2 border-red-200 rounded-sm p-6 mb-8 flex items-start gap-4">
                <div className="relative flex h-4 w-4 mt-0.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-red-700 text-lg">{t("emergency.title")}</h3>
                  <p className="text-red-600 text-sm mb-2">{t("emergency.subtitle")}</p>
                  <a href={`tel:${emergency("phone")}`} className="font-mono font-bold text-red-700 text-xl hover:underline">
                    {emergency("phone")}
                  </a>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: MapPin, label: t("info.address"), value: t("info.addressValue"), href: undefined },
                  { icon: Phone, label: t("info.phone"), value: t("info.phoneValue"), href: `tel:${t("info.phoneValue").replace(/\s/g, '')}` },
                  { icon: Mail,  label: t("info.email"),    value: "info@greenup-ks.com", href: "mailto:info@greenup-ks.com" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-white border border-green-mint/30 rounded-sm">
                    <div className="w-10 h-10 bg-green-primary rounded-sm flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark text-sm">{label}</p>
                      {href ? (
                        <a href={href} className="text-green-primary font-mono text-sm mt-0.5 hover:underline block">{value}</a>
                      ) : (
                        <p className="text-dark/60 text-sm mt-0.5">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps embed for Prishtina, Kosovo */}
              <div className="w-full h-56 rounded-sm overflow-hidden border border-green-mint/50">
                <iframe
                  title="Green Up Location - Prishtina, Kosovo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47189.94756526498!2d21.13073!3d42.6629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9571e3edaf3b28b8!2sPrishtina!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white border border-green-mint/30 rounded-sm p-8 space-y-5" noValidate>

                {/*
                  SECURITY: Honeypot field — visually hidden, not focusable.
                  Bots that autofill every field will fill this; real users won't see it.
                  The server also validates this field is empty.
                */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">{t("form.name")} *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                    {fieldErrors.name && <p className={errorClass}>{fieldErrors.name[0]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">{t("form.email")} *</label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                    {fieldErrors.email && <p className={errorClass}>{fieldErrors.email[0]}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">{t("form.phone")}</label>
                  <input
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                  {fieldErrors.phone && <p className={errorClass}>{fieldErrors.phone[0]}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">{t("form.type")} *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as RequestType })}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">—</option>
                    {ALLOWED_TYPES.map((opt) => (
                      <option key={opt} value={opt}>{t(`form.types.${opt}`)}</option>
                    ))}
                  </select>
                  {fieldErrors.type && <p className={errorClass}>{fieldErrors.type[0]}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">{t("form.message")} *</label>
                  <textarea
                    required
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex justify-between mt-0.5">
                    {fieldErrors.message
                      ? <p className={errorClass}>{fieldErrors.message[0]}</p>
                      : <span />}
                    <span className="text-dark/30 text-xs">{formData.message.length}/5000</span>
                  </div>
                </div>

                <p className="text-dark/40 text-xs">{t("form.required")}</p>

                {status === "success" && (
                  <div className="bg-green-pale border border-green-mint rounded-sm p-4 text-green-primary text-sm font-semibold">
                    ✓ {t("form.success")}
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-600 text-sm">
                    {t("form.error")}
                  </div>
                )}
                {status === "ratelimit" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4 text-yellow-800 text-sm">
                    {t("form.ratelimit")}
                  </div>
                )}
                {status === "validation" && Object.keys(fieldErrors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-600 text-sm">
                    {t("form.validationError")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-green-primary text-white font-semibold py-4 rounded-sm hover:bg-green-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "..." : t("form.submit")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
