import { useParams, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PROJECTS_ZH, PROJECTS_EN, VIBE_ZH, VIBE_EN } from "@/data/portfolio";

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

function ProjTag({ children }: { children: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
      padding: "4px 10px", borderRadius: 100,
      background: "rgba(178,149,126,0.12)", color: "#96614A",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

export function ProjectDetailPage() {
  const params = useParams<{ num: string }>();
  const [, navigate] = useLocation();
  const lang = (localStorage.getItem("sp-lang") as "zh" | "en") || "zh";
  const isZh = lang === "zh";
  const data = isZh ? PROJECTS_ZH : PROJECTS_EN;
  const item = data.find(p => p.num === params.num);

  if (!item) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, color: C.text }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 18, color: C.desc }}>项目不存在</p>
        <button onClick={() => navigate("/")} style={{ marginTop: 24, cursor: "pointer", background: "none", border: "none", color: C.accent, fontSize: 15, fontFamily: SANS }}>← 返回主页</button>
      </div>
    </div>
  );

  return <DetailLayout isZh={isZh} navigate={navigate} title={item.title} tags={item.tags} desc={item.desc} />;
}

export function VibeDetailPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const lang = (localStorage.getItem("sp-lang") as "zh" | "en") || "zh";
  const isZh = lang === "zh";
  const data = isZh ? VIBE_ZH : VIBE_EN;
  const item = data.find(v => v.id === params.id);

  if (!item) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, color: C.text }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 18, color: C.desc }}>项目不存在</p>
        <button onClick={() => navigate("/")} style={{ marginTop: 24, cursor: "pointer", background: "none", border: "none", color: C.accent, fontSize: 15, fontFamily: SANS }}>← 返回主页</button>
      </div>
    </div>
  );

  return <DetailLayout isZh={isZh} navigate={navigate} title={item.title} tags={item.tags} desc={item.desc} />;
}

function DetailLayout({
  isZh, navigate, title, tags, desc,
}: {
  isZh: boolean;
  navigate: (to: string) => void;
  title: string;
  tags: string[];
  desc: string;
}) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap');
        * { box-sizing: border-box; }
        .back-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; font-family: ${SANS}; font-size: 14px; font-weight: 500; color: #999; cursor: pointer; padding: 0; transition: color 0.2s; }
        .back-btn:hover { color: ${C.text}; }
      `}</style>

      {/* ── FIXED NAVBAR ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "center",
        paddingTop: 18, paddingBottom: 18,
        background: C.navBg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <nav style={{ width: "min(1152px, calc(100vw - 48px))", display: "flex", alignItems: "center" }}>
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={15} />
            {isZh ? "返回主页" : "Back to Home"}
          </button>
        </nav>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", paddingTop: 140 }}>

        {/* Title */}
        <h1 style={{
          fontFamily: SERIF, fontSize: 60, fontWeight: 700,
          color: C.text, lineHeight: 1.2, margin: "0 0 40px",
        }}>
          {title}
        </h1>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
        </div>

        {/* Description */}
        <p style={{ fontSize: 24, color: C.desc, lineHeight: 1.75, maxWidth: 800, margin: 0 }}>
          {desc}
        </p>

      </div>
    </div>
  );
}
