import { useState, useEffect, useRef, CSSProperties, ReactNode } from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(GSAPSplitText, ScrollTrigger, useGSAP);

const BASE = import.meta.env.BASE_URL;

// ─── DATA ──────────────────────────────────────────────────────────────────

const PROJECTS_ZH = [
  { num: "01", title: "AI数据标注平台", en: "AI Annotation Platform", tags: ["交互设计", "AI后台产品", "交互文档"], href: true, desc: "面向AI训练数据生产的全流程标注工作台，覆盖图像、文本、音频等多模态数据类型。主导0-1产品设计，搭建信息架构与核心任务流程，完成用户研究、原型设计及可用性测试。" },
  { num: "02", title: "全球化企业设备管理平台", en: "Global Device Management", tags: ["ToB复杂系统", "0-1产品设计", "场景化设计"], href: true, desc: "为华为大型企业客户设计的全球化IT设备全生命周期管理系统。深度参与需求挖掘与信息架构设计，打造适配多角色、多场景的复杂B端系统体验。" },
  { num: "03", title: "汽车金融服务平台", en: "Automotive Finance Platform", tags: ["体验重塑", "用户旅程地图"], href: true, desc: "梅赛德斯-奔驰金融服务数字化平台体验重塑项目。通过用户旅程地图与深度访谈，识别核心痛点，重新定义申请流程与核心交互模型。" },
  { num: "04", title: "用户研究项目", en: "User Research Project", tags: ["用户访谈", "可用性测试"], href: false, desc: "系统性用户研究项目，包含定性访谈、可用性测试及问卷调研。输出用户画像、旅程地图与设计洞察报告，为产品决策提供数据支撑。" },
  { num: "05", title: "视觉设计项目", en: "Visual Design Projects", tags: ["插画", "大屏", "数据可视化"], href: false, desc: "涵盖品牌插画、数据可视化大屏、UI视觉规范等多类型视觉设计项目，体现全链路视觉表达与设计执行能力。" },
];

const PROJECTS_EN = [
  { num: "01", title: "AI Annotation Platform", en: "ERNIE Bot · Wicresoft", tags: ["Interaction Design", "AI Backend", "Documentation"], href: true, desc: "Full-pipeline annotation workbench for AI training data covering image, text, and audio modalities. Led 0-1 product design — information architecture, core task flows, user research, prototyping, and usability testing." },
  { num: "02", title: "Global Device Management", en: "Huawei Enterprise", tags: ["Complex ToB System", "0-1 Design", "Multi-scenario"], href: true, desc: "Global IT device lifecycle management system for Huawei enterprise clients. Deeply involved in requirements, information architecture, and designing a system that works across multiple roles and scenarios." },
  { num: "03", title: "Automotive Finance Platform", en: "Mercedes-Benz Financial", tags: ["Experience Redesign", "User Journey"], href: true, desc: "Digital experience overhaul of Mercedes-Benz financial services. Identified core pain points via user journey maps and in-depth interviews, then redefined application flows and core interaction models." },
  { num: "04", title: "User Research Projects", en: "EV & Enterprise", tags: ["User Interviews", "Usability Testing"], href: false, desc: "Systematic user research including qualitative interviews, usability testing, and surveys. Outputs: user personas, journey maps, and design insight reports to support product decisions." },
  { num: "05", title: "Visual Design Projects", en: "Illustration & Data Viz", tags: ["Illustration", "Big Screen", "Data Visualization"], href: false, desc: "Brand illustration, data visualization big screens, and UI visual specifications — demonstrating full visual design and execution capability across diverse project types." },
];

const TOOLS = [
  { name: "Figma / Sketch", pct: 90 },
  { name: "Gemini / Claude / Replit", pct: 70 },
  { name: "Principal", pct: 70 },
  { name: "Adobe PS / AI", pct: 70 },
];

const VIBE_ZH = [
  { title: "AI手机系统设计", en: "AI Mobile System Design", tags: ["AI终端产品设计"], desc: "主导北美市场AI手机桌面系统需求定义，完成竞品分析、原型设计，探索AI在移动端的交互范式。" },
  { title: "个人主页", en: "Personal Portfolio Website", tags: ["Vibe Coding", "Replit"], desc: "使用Replit Vibe coding完成个人主页的设计与上线部署全流程，从设计稿到可交互产品一气呵成。" },
  { title: "骑马钉拼版检查工具", en: "Saddle Stitch Layout Checker", tags: ["AI Studio", "Gemini"], desc: "使用Google AI Studio中的build功能开发印刷品拼版检查工具，实现本地运行与智能校验。" },
];

const VIBE_EN = [
  { title: "AI Mobile System Design", en: "Luxshare Precision", tags: ["AI Terminal Design"], desc: "Led product definition for an AI mobile OS for the North American market — competitor analysis, prototyping, and exploring new interaction paradigms for AI on mobile." },
  { title: "Personal Portfolio Website", en: "This site", tags: ["Vibe Coding", "Replit"], desc: "Designed and shipped this portfolio entirely with Replit Vibe coding — from design concept to live interactive product in one continuous flow." },
  { title: "Saddle Stitch Layout Checker", en: "AI Studio Tool", tags: ["AI Studio", "Gemini"], desc: "Built a print layout verification tool using Google AI Studio's build feature, enabling local execution and intelligent print checking." },
];

const NAV_ZH = [
  { label: "关于我", href: "#about" },
  { label: "项目案例", href: "#projects" },
  { label: "Vibe & AI", href: "#vibe" },
  { label: "设计工具", href: "#tools" },
];
const NAV_EN = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Vibe & AI", href: "#vibe" },
  { label: "Tools", href: "#tools" },
];

const MARQUEE = "交互设计  ✦  视觉设计  ✦  竞品分析  ✦  用户研究  ✦  可用性测试  ✦  Vibe Coding  ✦  需求分析  ✦  ";

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  bg: "#F9F6F1",
  card: "#E8E2D9",
  text: "#2E2E2E",
  desc: "#666666",
  accent: "#B7947A",
  border: "#E1DAD1",
  navBg: "rgba(252,251,248,0.97)",
  navBorder: "#EFEBE4",
  toolsBg: "#EDE8E0",
};

const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return { ref, visible };
}

// ─── GSAP SPLIT TEXT HERO ──────────────────────────────────────────────────

function HeroTitles({ isZh }: { isZh: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") { setFontsLoaded(true); }
    else { document.fonts.ready.then(() => setFontsLoaded(true)); }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !fontsLoaded) return;
    const lines = containerRef.current.querySelectorAll(".title-line");
    if (!lines.length) return;

    const splits: InstanceType<typeof GSAPSplitText>[] = [];
    const allChars: Element[] = [];

    lines.forEach(line => {
      const split = new GSAPSplitText(line, { type: "chars", charsClass: "split-char" });
      splits.push(split);
      allChars.push(...split.chars);
    });

    gsap.set(allChars, { opacity: 0, y: 40, force3D: true });

    gsap.to(allChars, {
      opacity: 1,
      y: 0,
      duration: 1.25,
      ease: "power3.out",
      stagger: 0.035,
      delay: 0.1,
      willChange: "transform, opacity",
      onComplete: () => splits.forEach(s => s.revert()),
    });

    return () => {
      splits.forEach(s => { try { s.revert(); } catch {} });
    };
  }, { dependencies: [fontsLoaded, isZh], scope: containerRef });

  const titleStyle: CSSProperties = {
    fontFamily: SERIF,
    fontSize: "clamp(42px, 5vw, 76px)",
    fontWeight: 700,
    lineHeight: 1.12,
    color: C.text,
    margin: 0,
    display: "block",
    overflow: "hidden",
  };

  return (
    <div ref={containerRef} style={{ lineHeight: 1.12 }}>
      {isZh ? (
        <>
          <span className="title-line" style={{ ...titleStyle, marginBottom: 4 }}>
            <span style={{ color: C.text }}>你好, 我是</span>
            <span style={{ color: C.accent }}>怡君</span>
          </span>
          <span className="title-line" style={titleStyle}>UI/UX 全链路设计师</span>
        </>
      ) : (
        <>
          <span className="title-line" style={{ ...titleStyle, marginBottom: 4 }}>
            <span style={{ color: C.text }}>{"Hi, I'm Yijun"}</span>
          </span>
          <span className="title-line" style={titleStyle}>
            <span style={{ color: C.text }}>UI/UX DESIGNER</span>
          </span>
        </>
      )}
    </div>
  );
}

// ─── STRAIGHT MARQUEE ────────────────────────────────────────────────────────

function StraightMarquee({ text, speed = 1.5, fontSize = 16 }: { text: string; speed?: number; fontSize?: number }) {
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useRef(`m-${Math.random().toString(36).slice(2, 8)}`).current;
  const pathD = "M-200,40 L1640,40";

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const check = () => {
      const len = el.getComputedTextLength();
      if (len > 0) { setSpacing(len); } else { setTimeout(check, 60); }
    };
    setTimeout(check, 100);
  }, [text, fontSize]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    offsetRef.current = -spacing;
    textPathRef.current.setAttribute("startOffset", `${-spacing}px`);
    const step = () => {
      offsetRef.current -= speed;
      if (offsetRef.current <= -spacing) offsetRef.current += spacing;
      if (textPathRef.current) textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spacing, speed]);

  const repeats = spacing > 0 ? Math.ceil(1840 / spacing) + 3 : 6;
  const totalText = Array(repeats).fill(text).join("");

  return (
    <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", overflow: "hidden", height: 64 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <text ref={measureRef} style={{ visibility: "hidden", fontSize: `${fontSize}px` }} xmlSpace="preserve" fontFamily={SANS}>{text}</text>
        <defs><path id={uid} d={pathD} fill="none" /></defs>
        <text fontSize={fontSize} fill={C.text} xmlSpace="preserve" fontFamily={SANS} letterSpacing="0.06em">
          <textPath ref={textPathRef} href={`#${uid}`} startOffset="0px" xmlSpace="preserve">{totalText}</textPath>
        </text>
      </svg>
    </div>
  );
}

// ─── PROGRESS BAR ───────────────────────────────────────────────────────────

function ProgressBar({ pct, visible }: { pct: number; visible: boolean }) {
  return (
    <div style={{ height: 1, background: C.border, width: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "0 auto 0 0", background: C.text, width: visible ? `${pct}%` : "0%", transition: visible ? "width 1.1s ease-out" : "none" }} />
    </div>
  );
}

// ─── FADE UP (INTERSECTION OBSERVER) ─────────────────────────────────────────

function FadeUp({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const { ref, visible } = useInView(0.15, "-40px");
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      willChange: "opacity, transform",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SPOTLIGHT CARD ─────────────────────────────────────────────────────────

function SpotlightCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !overlayRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlayRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.22), transparent 65%)`;
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
      <div
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "transparent", opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

// ─── COPY BUTTON ─────────────────────────────────────────────────────────────

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button
      onClick={copy}
      title="点击复制"
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: C.desc, display: "flex", alignItems: "center" }}
    >
      {copied ? <Check size={14} color={C.accent} /> : <Copy size={14} />}
    </button>
  );
}

// ─── SCROLL HELPER ───────────────────────────────────────────────────────────

function scrollTo(href: string) {
  const el = document.getElementById(href.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── HOME ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">(() => (localStorage.getItem("sp-lang") as "zh" | "en") || "zh");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const toolsSection = useInView(0.15);
  const vibeSection = useInView(0.15);
  const projSection = useInView(0.08);
  const [, navigate] = useLocation();

  const isZh = lang === "zh";
  const NAV = isZh ? NAV_ZH : NAV_EN;
  const PROJECTS = isZh ? PROJECTS_ZH : PROJECTS_EN;
  const VIBE = isZh ? VIBE_ZH : VIBE_EN;

  const setLangPersist = (l: "zh" | "en") => { setLang(l); localStorage.setItem("sp-lang", l); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "projects", "vibe", "tools"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.35 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        button, a, [role=button] { cursor: pointer; }

        .sp-nav-link { position: relative; padding-bottom: 2px; background: none; border: none; }
        .sp-nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: ${C.text}; transition: width 0.3s ease; }
        .sp-nav-link:hover::after, .sp-nav-link.active::after { width: 100%; }
        .sp-nav-link.active { color: ${C.text} !important; }

        .project-row { border-bottom: 1px solid ${C.border}; position: relative; cursor: default; }
        .project-row:first-child { border-top: 1px solid ${C.border}; }
        .project-row::before { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 1px; background: ${C.text}; transform: scaleX(0); transform-origin: left; transition: transform 0.38s cubic-bezier(.16,1,.3,1); z-index: 1; }
        .project-row:hover::before { transform: scaleX(1); }
        .project-row .proj-num { transition: color 0.2s; }
        .project-row:hover .proj-num { color: ${C.accent}; }
        .project-row .proj-arrow { opacity: 0; transform: translateX(-8px); transition: opacity 0.25s, transform 0.25s; }
        .project-row:hover .proj-arrow { opacity: 1; transform: translateX(0); }
        .project-row .proj-desc { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.3s ease; }
        .project-row:hover .proj-desc { max-height: 150px; opacity: 1; margin-top: 10px; }

        .vibe-card { border: 1px solid ${C.border}; border-radius: 32px; transition: border-color 0.25s, transform 0.3s ease, box-shadow 0.3s ease; cursor: default; }
        .vibe-card:hover { border-color: ${C.accent}; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }

        .btn-primary { background: ${C.text}; color: ${C.bg}; border: none; border-radius: 100px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; padding: 12px 28px; cursor: pointer; transition: transform 0.2s ease, opacity 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-family: ${SANS}; }
        .btn-primary:hover { transform: scale(1.04); opacity: 0.88; }
        .btn-secondary { background: ${C.bg}; color: ${C.text}; border: 1px solid ${C.border}; border-radius: 100px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; padding: 12px 28px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s; font-family: ${SANS}; }
        .btn-secondary:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

        .photo-img { transition: transform 0.7s cubic-bezier(.16,1,.3,1); display: block; }
        .photo-wrap:hover .photo-img { transform: scale(1.04); }

        .split-char { display: inline-block; will-change: transform, opacity; }
        .title-line { display: block; }
      `}</style>

      {/* ── FLOATING NAVBAR ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", paddingTop: 18, pointerEvents: "none" }}>
        <nav style={{
          pointerEvents: "all",
          width: "min(1200px, calc(100vw - 48px))",
          height: 54,
          background: C.navBg,
          border: `1px solid ${C.navBorder}`,
          borderRadius: 100,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled ? "0 6px 28px rgba(0,0,0,0.09)" : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.3s",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px 0 16px", gap: 16,
        }}>
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none", flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 15, color: C.bg, lineHeight: 1 }}>Y</span>
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 600, color: C.text }}>Yijun Dong</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map(l => (
              <button
                key={l.label}
                className={`sp-nav-link ${activeSection === l.href.slice(1) ? "active" : ""}`}
                onClick={() => scrollTo(l.href)}
                style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 500, letterSpacing: "0.03em", color: activeSection === l.href.slice(1) ? C.text : "#999", transition: "color 0.25s", padding: "0 0 2px 0" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", background: "#EDE8E0", borderRadius: 100, padding: 3, gap: 2, flexShrink: 0 }}>
            {(["zh", "en"] as const).map(l => (
              <div key={l} onClick={() => setLangPersist(l)} style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer", transition: "background 0.2s, color 0.2s", background: lang === l ? C.text : "transparent", color: lang === l ? C.bg : "#999", userSelect: "none" }}>
                {l === "zh" ? "中" : "EN"}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* ── HERO ── */}
      <section id="about" style={{ paddingTop: 92 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: C.card, borderRadius: 32, padding: "56px 64px", display: "grid", gridTemplateColumns: "1fr auto", gap: 56, alignItems: "center" }}>
            {/* Left content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <HeroTitles isZh={isZh} />

              <FadeUp delay={0}>
                <p style={{ fontSize: 20, color: C.desc, lineHeight: 1.75, fontWeight: 400, maxWidth: 540, margin: 0 }}>
                  {isZh
                    ? "深耕交互设计与用户体验，擅长复杂 ToB 系统搭建，拥有百度、华为、奔驰等大型客户实战经验"
                    : "Specialized in interaction design and UX. Expert in complex ToB systems. Hands-on experience with Baidu, Huawei, and Mercedes-Benz."}
                </p>
              </FadeUp>

              <FadeUp delay={80}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: C.desc }}>
                    <Mail size={16} style={{ color: C.accent, flexShrink: 0 }} />
                    <span>yijdong@163.com</span>
                    <CopyBtn value="yijdong@163.com" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: C.desc }}>
                    <Phone size={16} style={{ color: C.accent, flexShrink: 0 }} />
                    <span>18092240354</span>
                    <CopyBtn value="18092240354" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={160}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={() => navigate("/resume")}>
                    {isZh ? "查看简历" : "View Resume"}
                  </button>
                  <button className="btn-secondary" onClick={() => scrollTo("#projects")}>
                    {isZh ? "查看作品 →" : "View Work →"}
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Photo — 9:16 */}
            <div style={{ flexShrink: 0, width: "clamp(160px, 18vw, 240px)" }}>
              <SpotlightCard style={{ borderRadius: 32, overflow: "hidden", aspectRatio: "9/16", background: "#CFC9C2" }}>
                <div className="photo-wrap" style={{ width: "100%", height: "100%" }}>
                  <img
                    src={`${BASE}images/photo_me.png`}
                    alt="怡君"
                    className="photo-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Straight marquee */}
        <StraightMarquee text={MARQUEE} speed={1.5} fontSize={16} />
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>
              {isZh ? "项目案例" : "Projects"}
            </span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontSize: 13, color: "#aaa", fontVariantNumeric: "tabular-nums" }}>{PROJECTS.length} projects</span>
          </div>
        </FadeUp>

        <div ref={projSection.ref}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-row"
              style={{
                padding: "24px 0",
                display: "flex", alignItems: "flex-start", gap: 20,
                opacity: projSection.visible ? 1 : 0,
                transform: projSection.visible ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms`,
              }}
            >
              <span className="proj-num" style={{ fontSize: 14, fontWeight: 700, color: "#ccc", width: 32, flexShrink: 0, paddingTop: 5, fontVariantNumeric: "tabular-nums" }}>{p.num}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{p.title}</span>
                  <span style={{ fontSize: 14, color: "#aaa", fontWeight: 300 }}>{p.en}</span>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t}</span>)}
                </div>
                <div className="proj-desc" style={{ fontSize: 16, color: C.desc, lineHeight: 1.75 }}>{p.desc}</div>
              </div>
              {p.href && <span className="proj-arrow" style={{ color: "#aaa", fontSize: 18, flexShrink: 0, paddingTop: 8 }}>→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ── VIBE CODING ── */}
      <section id="vibe" ref={vibeSection.ref} style={{ padding: "80px 24px", borderTop: `1px solid ${C.border}`, maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>Vibe Coding &amp; AI</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {VIBE.map((v, i) => (
            <div key={v.title} className="vibe-card" style={{ padding: 36, opacity: vibeSection.visible ? 1 : 0, transform: vibeSection.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms` }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {v.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100, background: "rgba(183,148,122,0.12)", color: "#96614A" }}>{t}</span>)}
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1.25, margin: "0 0 14px" }}>{v.title}</h3>
              <p style={{ fontSize: 16, color: C.desc, lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section id="tools" ref={toolsSection.ref} style={{ borderTop: `1px solid ${C.border}`, background: C.toolsBg, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 600, color: C.text, whiteSpace: "nowrap" }}>{isZh ? "设计工具" : "Design Tools"}</span>
              <div style={{ flex: 1, height: 1, background: "#D5CDBF" }} />
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 64px" }}>
            {TOOLS.map((t, i) => (
              <div key={t.name} style={{ opacity: toolsSection.visible ? 1 : 0, transform: toolsSection.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: C.text }}>{t.name}</span>
                  <span style={{ fontSize: 14, color: "#aaa", fontVariantNumeric: "tabular-nums" }}>{t.pct}%</span>
                </div>
                <ProgressBar pct={t.pct} visible={toolsSection.visible} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: SERIF, fontSize: 18, color: C.text, fontWeight: 600 }}>Yijun Dong</span>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13, color: "#999" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={13} />yijdong@163.com</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={13} />18092240354</span>
          </div>
          <span style={{ fontSize: 12, color: "#bbb" }}>© 2024 · UX Designer</span>
        </div>
      </footer>
    </div>
  );
}
