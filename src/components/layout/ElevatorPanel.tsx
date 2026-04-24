"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { ChevronUp, ChevronDown, X, ArrowUpRight } from "lucide-react";

const PANEL_BG =
  "linear-gradient(160deg, #1c2219 0%, #10130e 35%, #1a2017 65%, #0b0e0a 100%)";
const BTN_INACTIVE =
  "radial-gradient(circle at 35% 28%, #283025, #161a14)";
const BTN_ACTIVE =
  "radial-gradient(circle at 35% 28%, #e8c060, #b8882a)";
const BTN_SHADOW_INACTIVE =
  "0 3px 8px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)";
const BTN_SHADOW_ACTIVE =
  "0 0 18px rgba(201,168,76,0.55), 0 0 6px rgba(201,168,76,0.35), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.25)";
const BTN_SHADOW_PRESSED =
  "inset 0 3px 6px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.04)";

function LedDisplay({ floor }: { floor: string }) {
  return (
    <div
      style={{
        background: "#09110a",
        boxShadow:
          "inset 0 2px 8px rgba(0,0,0,0.85), 0 0 1px rgba(201,168,76,0.15)",
        border: "1px solid rgba(45,106,79,0.28)",
        borderRadius: "6px",
        padding: "6px 8px",
        textAlign: "center" as const,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#a8f59a",
          textShadow: "0 0 5px #7fff7f, 0 0 10px #4ade8066",
          fontSize: "8px",
          letterSpacing: "0.35em",
          lineHeight: 1,
          marginBottom: "3px",
        }}
      >
        FLOOR
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#b8ffa8",
          textShadow: "0 0 8px #7fff7f, 0 0 18px #4ade8066",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        {floor}
      </div>
    </div>
  );
}

function Hairline() {
  return (
    <div
      style={{
        height: "1px",
        width: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
      }}
    />
  );
}

function FloorButton({
  floor,
  isActive,
  isPressed,
  onClick,
  size = 42,
}: {
  floor: string;
  isActive: boolean;
  isPressed: boolean;
  onClick: () => void;
  size?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: isActive ? BTN_ACTIVE : BTN_INACTIVE,
        boxShadow: isPressed
          ? BTN_SHADOW_PRESSED
          : isActive
          ? BTN_SHADOW_ACTIVE
          : BTN_SHADOW_INACTIVE,
        border: isActive
          ? "1px solid rgba(255,200,80,0.38)"
          : "1px solid rgba(255,255,255,0.055)",
        transform: isPressed ? "scale(0.91)" : "scale(1)",
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: size >= 52 ? "13px" : "11px",
          fontWeight: 700,
          color: isActive ? "#1a1200" : "#7a9674",
          textShadow: isActive ? "none" : "0 1px 2px rgba(0,0,0,0.5)",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}
      >
        {floor}
      </span>
      {isActive && (
        <span
          style={{
            position: "absolute",
            bottom: -5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#c9a84c",
            boxShadow: "0 0 5px #c9a84c",
          }}
        />
      )}
    </button>
  );
}

export default function ElevatorPanel() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const floors = [
    { key: "home",     path: "/",         floor: "B",  label: t("home") },
    { key: "about",    path: "/about",    floor: "01", label: t("about") },
    { key: "services", path: "/services", floor: "02", label: t("services") },
    { key: "projects", path: "/projects", floor: "03", label: t("projects") },
    { key: "faq",      path: "/faq",      floor: "04", label: t("faq") },
    { key: "contact",  path: "/contact",  floor: "05", label: t("contact") },
    { key: "partners", path: "/partners", floor: "06", label: t("partners") },
  ];

  const currentFloor =
    floors.find((f) => {
      if (f.path === "/") return pathname === "/" || pathname === "";
      return pathname.startsWith(f.path);
    }) ?? floors[0];

  const currentIndex = floors.indexOf(currentFloor);

  const press = (key: string, path: string) => {
    setPressedKey(key);
    setTimeout(() => {
      setPressedKey(null);
      router.push(path as "/");
    }, 220);
    setMobileOpen(false);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const f = floors[currentIndex - 1];
      press(f.key, f.path);
    }
  };

  const goNext = () => {
    if (currentIndex < floors.length - 1) {
      const f = floors[currentIndex + 1];
      press(f.key, f.path);
    }
  };

  const switchLocale = (l: Locale) => {
    router.replace(pathname as "/", { locale: l });
    setMobileOpen(false);
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile panel is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const arrowBtnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 26,
    height: 26,
    borderRadius: 5,
    background: "radial-gradient(circle at 35% 28%, #263023, #161a14)",
    border: "1px solid rgba(255,255,255,0.055)",
    boxShadow:
      "0 2px 5px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: disabled ? "#2a3527" : "#7a9674",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    transition: "opacity 0.2s",
  });

  return (
    <>
      {/* ── DESKTOP PANEL ── */}
      <aside
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50"
        aria-label="Elevator navigation panel"
      >
        <div
          style={{
            width: 72,
            background: PANEL_BG,
            borderRadius: "14px 0 0 14px",
            border: "1px solid rgba(201,168,76,0.12)",
            borderRight: "none",
            boxShadow:
              "-6px 0 40px rgba(0,0,0,0.6), -1px 0 0 rgba(201,168,76,0.08), inset 1px 0 0 rgba(255,255,255,0.02)",
            padding: "14px 10px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* LED display */}
          <LedDisplay floor={currentFloor.floor} />

          <Hairline />

          {/* Floor buttons with hover tooltips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              width: "100%",
            }}
          >
            {floors.map((floor) => (
              <div
                key={floor.key}
                className="relative group flex items-center justify-center w-full"
              >
                <FloorButton
                  floor={floor.floor}
                  isActive={floor.key === currentFloor.key}
                  isPressed={pressedKey === floor.key}
                  onClick={() => press(floor.key, floor.path)}
                />
                {/* Tooltip */}
                <div
                  className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(135deg, #1b221a, #0e1210)",
                    border: "1px solid rgba(201,168,76,0.22)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.55)",
                    borderRadius: 8,
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "#c9a84c",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {floor.floor}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "#ddecd8", fontWeight: 500 }}
                  >
                    {floor.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Hairline />

          {/* Up / Down arrows */}
          <div style={{ display: "flex", gap: 5 }}>
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous page"
              style={arrowBtnStyle(currentIndex === 0)}
            >
              <ChevronUp size={13} />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === floors.length - 1}
              aria-label="Next page"
              style={arrowBtnStyle(currentIndex === floors.length - 1)}
            >
              <ChevronDown size={13} />
            </button>
          </div>

          <Hairline />

          {/* Language switcher */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: loc === locale ? "#c9a84c" : "#3a4e35",
                  textShadow:
                    loc === locale
                      ? "0 0 6px rgba(201,168,76,0.5)"
                      : "none",
                  background: "transparent",
                  border: "none",
                  padding: "2px 3px",
                }}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA: quote button */}
          <button
            onClick={() => press("contact", "/contact")}
            aria-label={t("getQuote")}
            title={t("getQuote")}
            className="cursor-pointer mt-1"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 28%, #d4a843, #9f7828)",
              boxShadow:
                "0 0 12px rgba(201,168,76,0.28), 0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,200,80,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a1200",
              transition: "box-shadow 0.2s",
            }}
          >
            <ArrowUpRight size={17} />
          </button>
        </div>
      </aside>

      {/* ── MOBILE: floating floor indicator button ── */}
      <button
        className="lg:hidden fixed bottom-5 right-4 z-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation panel"
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 28%, #1f2a1d, #0e110c)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.18)",
          border: "1px solid rgba(201,168,76,0.14)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            color: "#a8f59a",
            textShadow: "0 0 5px #7fff7f",
            letterSpacing: "0.2em",
            lineHeight: 1,
          }}
        >
          FL
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 700,
            color: "#c9a84c",
            textShadow: "0 0 7px rgba(201,168,76,0.7)",
            lineHeight: 1,
          }}
        >
          {currentFloor.floor}
        </span>
      </button>

      {/* ── MOBILE: bottom-sheet panel ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: PANEL_BG,
              borderRadius: "20px 20px 0 0",
              border: "1px solid rgba(201,168,76,0.14)",
              borderBottom: "none",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.65)",
              padding: "22px 20px 36px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 cursor-pointer"
              style={{ color: "#3a4e35" }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            {/* LED header row */}
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  background: "#09110a",
                  border: "1px solid rgba(45,106,79,0.28)",
                  borderRadius: 5,
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    color: "#a8f59a",
                    textShadow: "0 0 5px #7fff7f",
                    letterSpacing: "0.3em",
                  }}
                >
                  FLOOR
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#b8ffa8",
                    textShadow: "0 0 8px #7fff7f",
                    lineHeight: 1,
                  }}
                >
                  {currentFloor.floor}
                </span>
              </div>
              <span style={{ fontSize: 13, color: "#4a6b44", letterSpacing: "0.05em" }}>
                — {currentFloor.label}
              </span>
            </div>

            {/* Floor grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {floors.map((floor) => (
                <button
                  key={floor.key}
                  onClick={() => press(floor.key, floor.path)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  <FloorButton
                    floor={floor.floor}
                    isActive={floor.key === currentFloor.key}
                    isPressed={pressedKey === floor.key}
                    onClick={() => {}}
                    size={54}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color:
                        floor.key === currentFloor.key ? "#c9a84c" : "#3d5839",
                      letterSpacing: "0.04em",
                      textAlign: "center",
                      lineHeight: 1.25,
                      fontWeight: floor.key === currentFloor.key ? 600 : 400,
                    }}
                  >
                    {floor.label}
                  </span>
                </button>
              ))}
            </div>

            <Hairline />

            {/* Language + CTA */}
            <div className="flex items-center justify-between mt-4">
              <div style={{ display: "flex", gap: 6 }}>
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className="cursor-pointer"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: loc === locale ? "#c9a84c" : "#3a4e35",
                      textShadow:
                        loc === locale
                          ? "0 0 6px rgba(201,168,76,0.5)"
                          : "none",
                      background: "transparent",
                      border: "none",
                      padding: "4px 8px",
                    }}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => press("contact", "/contact")}
                className="cursor-pointer flex items-center gap-1.5"
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "radial-gradient(circle at 35% 28%, #d4a843, #9f7828)",
                  boxShadow:
                    "0 0 12px rgba(201,168,76,0.28), 0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,200,80,0.28)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "#1a1200",
                }}
              >
                {t("getQuote")}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
