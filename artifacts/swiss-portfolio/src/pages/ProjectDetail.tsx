import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  PROJECTS_ZH, PROJECTS_EN, VIBE_ZH, VIBE_EN,
  DETAIL_SEQUENCE, seqPath,
} from "@/data/portfolio";

const C = {
  bg: "#F9F6F1",
  text: "#2E2E2E",
  desc: "#666666",
  accent: "#B2957E",
  border: "#E1DAD1",
  navBg: "rgba(252,251,248,0.97)",
};
const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// Full-screen section definitions — colors for the 5 sticky slides
const SECTIONS = [
  { bg: "#F9F6F1", text: "#2E2E2E" },  // 1 — content slide
  { bg: "#EDE8E0", text: "#2E2E2E" },  // 2 — placeholder
  { bg: "#E4DDD5", text: "#2E2E2E" },  // 3 — placeholder
  { bg: "#D8D0C7", text: "#2E2E2E" },  // 4 — placeholder
  { bg: "#2E2E2E", text: "#F9F6F1" },  // 5 — placeholder (dark)
];

function ProjTag({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
      padding: "4px 10px", borderRadius: 100,
      background: light ? "rgba(249,246,241,0.15)" : "rgba(178,149,126,0.12)",
      color: light ? "rgba(249,246,241,0.8)" : "#96614A",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function NotFound({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, color: C.text }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 18, color: C.desc }}>项目不存在</p>
        <button onClick={() => navigate("/")} style={{ marginTop: 24, cursor: "pointer", background: "none", border: "none", color: C.accent, fontSize: 15, fontFamily: SANS }}>← 返回主页</button>
      </div>
    </div>
  );
}

// Right-side vertical dot indicator
function PageIndicator({ total, current, textColor }: { total: number; current: number; textColor: string }) {
  return (
    <div style={{
      position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 200,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: current === i ? textColor : "transparent",
          border: `1.5px solid ${current === i ? textColor : `${textColor}55`}`,
          transform: current === i ? "scale(1.35)" : "scale(1)",
          transition: "all 0.35s ease",
        }} />
      ))}
    </div>
  );
}

export function ProjectDetailPage() {
  const params = useParams<{ num: string }>();
  const [, navigate] = useLocation();
  const lang = (localStorage.getItem("sp-lang") as "zh" | "en") || "zh";
  const isZh = lang === "zh";
  const data = isZh ? PROJECTS_ZH : PROJECTS_EN;
  const item = data.find(p => p.num === params.num);

  const seqIndex = DETAIL_SEQUENCE.findIndex(s => s.kind === "project" && s.id === params.num);
  const prevItem = seqIndex > 0 ? DETAIL_SEQUENCE[seqIndex - 1] : null;
  const nextItem = seqIndex < DETAIL_SEQUENCE.length - 1 ? DETAIL_SEQUENCE[seqIndex + 1] : null;

  if (!item) return <NotFound navigate={navigate} />;

  return (
    <DetailLayout
      isZh={isZh}
      navigate={navigate}
      title={item.title}
      tags={item.tags}
      desc={item.desc}
      sectionLabel={isZh ? "项目案例" : "Projects"}
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
    />
  );
}

export function VibeDetailPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const lang = (localStorage.getItem("sp-lang") as "zh" | "en") || "zh";
  const isZh = lang === "zh";
  const data = isZh ? VIBE_ZH : VIBE_EN;
  const item = data.find(v => v.id === params.id);

  const seqIndex = DETAIL_SEQUENCE.findIndex(s => s.kind === "vibe" && s.id === params.id);
  const prevItem = seqIndex > 0 ? DETAIL_SEQUENCE[seqIndex - 1] : null;
  const nextItem = seqIndex < DETAIL_SEQUENCE.length - 1 ? DETAIL_SEQUENCE[seqIndex + 1] : null;

  if (!item) return <NotFound navigate={navigate} />;

  return (
    <DetailLayout
      isZh={isZh}
      navigate={navigate}
      title={item.title}
      tags={item.tags}
      desc={item.desc}
      sectionLabel="Vibe Coding & AI"
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
    />
  );
}

function DetailLayout({
  isZh, navigate, title, tags, desc, sectionLabel, prevPath, nextPath,
}: {
  isZh: boolean;
  navigate: (to: string) => void;
  title: string;
  tags: string[];
  desc: string;
  sectionLabel: string;
  prevPath: string | null;
  nextPath: string | null;
}) {
  const [currentSection, setCurrentSection] = useState(0);

  // Enable full-screen block scrolling while on detail page; remove on exit
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y mandatory";
    return () => {
      html.style.scrollSnapType = "";
    };
  }, []);

  // Reset to top on mount AND whenever navigating to a different item (prev/next)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setCurrentSection(0);
  }, [title]);

  // Track which full-screen section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const section = Math.round(window.scrollY / window.innerHeight);
      setCurrentSection(Math.min(section, SECTIONS.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTextColor = SECTIONS[currentSection].text;
  // Navbar blends with the current section's background
  const navBg = currentSection === 0 ? C.navBg : `${SECTIONS[currentSection].bg}f5`;
  const navBorder = currentSection === 4 ? "rgba(249,246,241,0.12)" : C.border;
  const navTextColor = SECTIONS[currentSection].text;

  return (
    <div style={{ fontFamily: SANS, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; font-family: ${SANS};
          font-size: 14px; font-weight: 500;
          cursor: pointer; padding: 0; transition: opacity 0.2s;
          white-space: nowrap;
        }
        .back-btn:hover { opacity: 0.6; }
        .nav-btn {
          display: inline-flex; align-items: center; gap: 4px;
          border-radius: 100px;
          font-family: ${SANS}; font-size: 13px; font-weight: 500;
          padding: 0 14px; height: 34px; cursor: pointer;
          transition: background 0.25s, opacity 0.25s, border-color 0.25s, color 0.25s;
          white-space: nowrap;
        }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
      `}</style>

      {/* ── FIXED NAVBAR — adapts to current section color ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        display: "flex", justifyContent: "center",
        paddingTop: 14, paddingBottom: 14,
        background: navBg,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${navBorder}`,
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}>
        <nav style={{
          width: "min(1152px, calc(100vw - 48px))",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
        }}>

          {/* LEFT — back */}
          <div>
            <button className="back-btn" style={{ color: navTextColor }} onClick={() => navigate("/")}>
              <ArrowLeft size={15} />
              {isZh ? "返回主页" : "Back to Home"}
            </button>
          </div>

          {/* CENTER — section label */}
          <span style={{
            fontFamily: SERIF, fontSize: 14, fontWeight: 600,
            color: navTextColor, letterSpacing: "0.02em", textAlign: "center",
            transition: "color 0.5s ease",
          }}>
            {sectionLabel}
          </span>

          {/* RIGHT — prev / next */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              className="nav-btn"
              disabled={!prevPath}
              style={{
                background: "transparent",
                color: navTextColor,
                border: `1px solid ${navTextColor}40`,
              }}
              onClick={() => prevPath && navigate(prevPath)}
            >
              <ChevronLeft size={14} />
              {isZh ? "上一个" : "Prev"}
            </button>
            <button
              className="nav-btn"
              disabled={!nextPath}
              style={{
                background: "transparent",
                color: navTextColor,
                border: `1px solid ${navTextColor}40`,
              }}
              onClick={() => nextPath && navigate(nextPath)}
            >
              {isZh ? "下一个" : "Next"}
              <ChevronRight size={14} />
            </button>
          </div>

        </nav>
      </div>

      {/* ── RIGHT-SIDE DOT INDICATOR ── */}
      <PageIndicator total={SECTIONS.length} current={currentSection} textColor={currentTextColor} />

      {/* ── FULL-SCREEN STICKY SECTIONS ── */}

      {/* Section 1 — Title · Tags · Description */}
      <div style={{
        position: "sticky", top: 0,
        height: "100vh", width: "100%",
        background: SECTIONS[0].bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        scrollSnapAlign: "start",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: 960, width: "100%", padding: "0 60px", paddingTop: 80 }}>
          <h1 style={{
            fontFamily: SERIF, fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700,
            color: SECTIONS[0].text, lineHeight: 1.15, marginBottom: 36,
          }}>
            {title}
          </h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
          </div>
          <p style={{ fontSize: "clamp(18px, 1.5vw, 24px)", color: C.desc, lineHeight: 1.8, maxWidth: 720 }}>
            {desc}
          </p>
        </div>
      </div>

      {/* Sections 2–5 — placeholders, will hold project content */}
      {SECTIONS.slice(1).map((sec, i) => (
        <div key={i + 1} style={{
          position: "sticky", top: 0,
          height: "100vh", width: "100%",
          background: sec.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          scrollSnapAlign: "start",
          zIndex: i + 2,
        }}>
          {/* Content to be added later */}
        </div>
      ))}

    </div>
  );
}
