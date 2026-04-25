"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, ArrowUpRight, Loader2 } from "lucide-react";

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
    honeypot: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const updateField = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

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
    "w-full px-4 py-3 bg-white border border-green-mint/40 rounded-xl text-ink placeholder:text-ink/40 focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/15 transition-all";
  const errorClass = "mt-1.5 text-red-600 text-xs";

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
            <p className="text-white/70 text-xl mt-5 max-w-2xl anim-fade-up anim-delay-2">{t("hero.subtitle")}</p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-wide grid lg:grid-cols-2 gap-12">
            {/* Left: info */}
            <div>
              {/* Emergency box */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <div className="relative flex h-4 w-4 mt-0.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-red-700 tracking-tight">{t("emergency.title")}</h3>
                  <p className="text-red-600 text-sm mb-2">{t("emergency.subtitle")}</p>
                  <a href={`tel:${emergency("phone")}`} className="font-mono font-bold text-red-700 text-xl hover:underline cursor-pointer">
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
                  <div key={label} className="flex items-start gap-4 p-4 bg-white border border-green-mint/30 rounded-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-primary to-green-medium rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-primary/15">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-sm">{label}</p>
                      {href ? (
                        <a href={href} className="text-green-primary font-mono text-sm mt-0.5 hover:underline block cursor-pointer">{value}</a>
                      ) : (
                        <p className="text-ink/60 text-sm mt-0.5">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps embed for Prishtina, Kosovo */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-green-mint/50">
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
              <form onSubmit={handleSubmit} className="bg-white border border-green-mint/30 rounded-[24px] p-8 md:p-10 space-y-5 shadow-[0_30px_60px_-30px_rgba(15,45,31,0.18)]" noValidate>

                {/*
                  Honeypot: visually hidden, not focusable. Server also validates empty.
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
                    onChange={(e) => updateField("honeypot", e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-ink mb-1.5">{t("form.name")} *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                    />
                    {fieldErrors.name && <p id="contact-name-error" className={errorClass}>{fieldErrors.name[0]}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-ink mb-1.5">{t("form.email")} *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      className={inputClass}
                    />
                    {fieldErrors.email && <p id="contact-email-error" className={errorClass}>{fieldErrors.email[0]}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-ink mb-1.5">{t("form.phone")}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
                    className={inputClass}
                  />
                  {fieldErrors.phone && <p id="contact-phone-error" className={errorClass}>{fieldErrors.phone[0]}</p>}
                </div>

                <div>
                  <label htmlFor="contact-type" className="block text-sm font-semibold text-ink mb-1.5">{t("form.type")} *</label>
                  <select
                    id="contact-type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={(e) => updateField("type", e.target.value as RequestType)}
                    aria-invalid={Boolean(fieldErrors.type)}
                    aria-describedby={fieldErrors.type ? "contact-type-error" : undefined}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">—</option>
                    {ALLOWED_TYPES.map((opt) => (
                      <option key={opt} value={opt}>{t(`form.types.${opt}`)}</option>
                    ))}
                  </select>
                  {fieldErrors.type && <p id="contact-type-error" className={errorClass}>{fieldErrors.type[0]}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-ink mb-1.5">{t("form.message")} *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex justify-between mt-0.5">
                    {fieldErrors.message
                      ? <p id="contact-message-error" className={errorClass}>{fieldErrors.message[0]}</p>
                      : <span />}
                    <span className="text-ink/30 text-xs font-mono">{formData.message.length}/5000</span>
                  </div>
                </div>

                <p className="text-ink/40 text-xs">{t("form.required")}</p>

                <div role="status" aria-live="polite">
                  {status === "success" && (
                    <div className="bg-green-pale border border-green-mint rounded-2xl p-4 text-green-primary text-sm font-semibold">
                      {t("form.success")}
                    </div>
                  )}
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm">
                      {t("form.error")}
                    </div>
                  )}
                  {status === "ratelimit" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-yellow-800 text-sm">
                      {t("form.ratelimit")}
                    </div>
                  )}
                  {status === "validation" && Object.keys(fieldErrors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm">
                      {t("form.validationError")}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="btn-base btn-solid-green w-full justify-center !py-3.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <ArrowUpRight size={15} />
                    </>
                  )}
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
