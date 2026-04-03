import { useState, useEffect, useRef, useCallback, CSSProperties, ReactNode } from "react";
import { Mail, Phone, Copy, Check, FileText, ChevronsDown, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_ZH, PROJECTS_EN, VIBE_ZH, VIBE_EN } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

// Project hover images — actual files in public/images/home/
const PROJECT_IMGS: Record<string, string> = {
  "01": "AI Annotation Platform.png",
  "02": "Global Device Management.png",
  "03": "Automotive Finance Platform.png",
  "04": "User Research Project.png",
  "05": "Visual Design Projects.png",
};

const TOOLS = [
  { name: "Figma / Sketch", pct: 90 },
  { name: "Gemini / Claude / Replit", pct: 70 },
  { name: "Principal", pct: 70 },
  { name: "Adobe PS / AI", pct: 70 },
];

// Removed "设计工具" from nav tabs (section still shows on page)
const NAV_ZH = [
  { label: "关于我", href: "#about" },
  { label: "项目案例", href: "#projects" },
  { label: "Vibe & AI", href: "#vibe" },
];
const NAV_EN = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Vibe & AI", href: "#vibe" },
];

const MARQUEE = " 交互设计  ✦  视觉设计  ✦  竞品分析  ✦  用户研究  ✦  可用性测试  ✦  Vibe Coding  ✦  需求分析  ✦  ";

const SECTION_DESC = {
  projects: {
    zh: "呈现 ToB 复杂系统等真实项目，从需求拆解到产品落地的全流程 UI/UX 设计实践与落地成果",
    en: "Real-world UI/UX projects spanning complex ToB systems — from requirement breakdown to final delivery.",
  },
  vibe: {
    zh: "基于多类 AI 工具，探索 AI 辅助设计、快速原型制作与设计效率提升的前沿实践",
    en: "Exploring AI-assisted design, rapid prototyping, and design efficiency gains across multiple AI tools.",
  },
};

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  bg: "#F9F6F1",
  card: "#E8E2D9",
  text: "#2E2E2E",
  desc: "#666666",
  accent: "#B2957E",
  border: "#E1DAD1",
  navBg: "rgba(252,251,248,0.97)",
  navBorder: "#EFEBE4",
  toolsBg: "#EDE8E0",
};

const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15, rootMargin = "-40px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return { ref, visible };
}

// ─── GRADIENT TEXT (animated, no external lib) ────────────────────────────────

function GradientAccentText({
  text,
  delay,
  animate,
}: {
  text: string;
  delay: number;
  animate: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const colors = ["#E8E2D9", "#B2957E", "#402B0D", "#E8E2D9"];

  useEffect(() => {
    let elapsed = 0;
    let lastTime: number | null = null;
    let dir = 1;
    const duration = 8000;
    let raf = 0;

    const frame = (time: number) => {
      if (lastTime === null) { lastTime = time; }
      const delta = time - lastTime;
      lastTime = time;
      elapsed += delta * dir;
      if (elapsed >= duration) { elapsed = duration; dir = -1; }
      if (elapsed <= 0) { elapsed = 0; dir = 1; }
      const p = (elapsed / duration) * 100;
      if (ref.current) { ref.current.style.backgroundPosition = `${p}% 50%`; }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "300% 100%",
        backgroundPosition: "0% 50%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(40px)",
        // No transition when resetting (instant hide), transition only when animating in
        transition: animate
          ? `opacity 1.25s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.25s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          : "none",
        willChange: "transform, opacity",
      }}
    >
      {text}
    </span>
  );
}

// ─── PURE-REACT CHAR ANIMATION ─────────────────────────────────────────────

interface TitleSegment { text: string; accent?: boolean }

function AnimatedTitleLine({
  segments,
  style,
  startIndex = 0,
  animKey,
}: {
  segments: TitleSegment[];
  style?: CSSProperties;
  startIndex?: number;
  animKey: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    // setTimeout ensures one render with animate=false (instant hide) before animating in
    const id = setTimeout(() => setAnimate(true), 40);
    return () => clearTimeout(id);
  }, [animKey]);

  let charIdx = startIndex;
  const items: ReactNode[] = [];

  for (const seg of segments) {
    if (seg.accent) {
      const idx = charIdx;
      charIdx += [...seg.text].length;
      items.push(
        <GradientAccentText key={`accent-${idx}`} text={seg.text} delay={idx * 35} animate={animate} />
      );
    } else {
      for (const char of [...seg.text]) {
        const idx = charIdx++;
        items.push(
          <span
            key={`c-${idx}`}
            style={{
              display: "inline-block",
              color: C.text,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(40px)",
              // No transition when resetting — instant hide, then animate in with stagger
              transition: animate
                ? `opacity 1.25s cubic-bezier(0.16,1,0.3,1) ${idx * 35}ms, transform 1.25s cubic-bezier(0.16,1,0.3,1) ${idx * 35}ms`
                : "none",
              willChange: "transform, opacity",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      }
    }
  }

  return (
    <span style={{ display: "block", overflow: "visible", ...style }}>
      {items}
    </span>
  );
}

function HeroTitles({ isZh }: { isZh: boolean }) {
  const [animKey, setAnimKey] = useState(0);
  const triggerAnim = useCallback(() => setAnimKey(k => k + 1), []);

  // Trigger on mount and lang change
  useEffect(() => { triggerAnim(); }, [isZh]);

  const titleStyle: CSSProperties = {
    fontFamily: SERIF,
    fontSize: "clamp(40px, 4.8vw, 72px)",
    fontWeight: 700,
    lineHeight: 1.18,
    margin: 0,
  };

  const line1ZH: TitleSegment[] = [{ text: "你好, 我是" }, { text: "怡君", accent: true }];
  const line2ZH: TitleSegment[] = [{ text: "UI/UX 全链路设计师" }];
  const line1EN: TitleSegment[] = [{ text: "Hi, I'm " }, { text: "Yijun", accent: true }];
  const line2EN: TitleSegment[] = [{ text: "UI/UX DESIGNER" }];

  const l1 = isZh ? line1ZH : line1EN;
  const l2 = isZh ? line2ZH : line2EN;
  const l1Len = l1.reduce((s, seg) => s + [...seg.text].length, 0);

  return (
    // hover triggers re-animation
    <div onMouseEnter={triggerAnim} style={{ cursor: "default", userSelect: "none" }}>
      <AnimatedTitleLine segments={l1} style={{ ...titleStyle, marginBottom: 2 }} startIndex={0} animKey={animKey} />
      <AnimatedTitleLine segments={l2} style={titleStyle} startIndex={l1Len} animKey={animKey} />
    </div>
  );
}

// ─── SCROLL FLOAT (GSAP, per-char scroll-scrub animation) ────────────────────

function ScrollFloat({ text, triggerId, style }: { text: string; triggerId?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll(".sf-char");
    const triggerEl = (triggerId ? document.getElementById(triggerId) : null) ?? el;

    // Use direct fromTo (not gsap.context) so external trigger element is handled correctly.
    // No opacity in start state — overflow:hidden on inner span already clips chars at yPercent:120.
    // end:"top 40%" completes the animation well before the section center, so heading appears
    // promptly and never lags behind the description FadeUp.
    const anim = gsap.fromTo(
      chars,
      { willChange: "transform", yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
      {
        yPercent: 0, scaleY: 1, scaleX: 1,
        stagger: 0.03, duration: 1, ease: "back.inOut(2)",
        scrollTrigger: { trigger: triggerEl, start: "top bottom", end: "top 40%", scrub: true },
      }
    );

    // Refresh after layout settles to fix "sometimes invisible" race condition
    const tid = setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      clearTimeout(tid);
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [text, triggerId]);

  // overflow:hidden on the INNER span so it clips chars in y without restricting h2 width
  return (
    <h2
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        fontFamily: SERIF,
        fontSize: 36,
        fontWeight: 600,
        color: C.text,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em" }}>
        {[...text].map((char, i) => (
          <span key={i} className="sf-char" style={{ display: "inline-block", willChange: "opacity, transform" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </h2>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function StraightMarquee({
  text,
  speed = 1.3,
  fontSize = 16,
  contained = false,
  color = C.text,
}: {
  text: string;
  speed?: number;
  fontSize?: number;
  contained?: boolean;
  color?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLSpanElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      const w = singleRef.current?.offsetWidth ?? 0;
      if (w > 0) { setTextWidth(w); } else { setTimeout(measure, 80); }
    };
    setTimeout(measure, 80);
  }, [text, fontSize]);

  useEffect(() => {
    if (!trackRef.current || !textWidth) return;
    offsetRef.current = 0;
    const step = () => {
      offsetRef.current -= speed;
      if (offsetRef.current <= -textWidth) offsetRef.current += textWidth;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [textWidth, speed]);

  const copies = textWidth > 0 ? Math.ceil((typeof window !== "undefined" ? window.innerWidth * 2 : 2880) / textWidth) + 3 : 8;

  return (
    <div style={{
      overflow: "hidden",
      ...(contained ? {} : { width: "100vw", marginLeft: "calc(50% - 50vw)" }),
      height: 48,
      display: "flex",
      alignItems: "center",
    }}>
      <div ref={trackRef} style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform", alignItems: "center" }}>
        {Array.from({ length: copies }, (_, i) => (
          <span
            key={i}
            ref={i === 0 ? singleRef : undefined}
            style={{ fontSize, fontFamily: SANS, color, letterSpacing: "0.06em", lineHeight: "normal", flexShrink: 0 }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PROGRESS BAR ───────────────────────────────────────────────────────────

function ProgressBar({ pct, visible }: { pct: number; visible: boolean }) {
  return (
    <div style={{ height: 2, background: C.border, width: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: "0 auto 0 0", background: C.text,
        height: "100%",
        width: visible ? `${pct}%` : "0%",
        transition: visible ? "width 1.1s ease-out" : "width 0.3s ease-out",
      }} />
    </div>
  );
}

// ─── FADE UP ─────────────────────────────────────────────────────────────────

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
    overlayRef.current.style.background = `radial-gradient(300px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.22), transparent 65%)`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (overlayRef.current) overlayRef.current.style.opacity = "1"; }}
      onMouseLeave={() => { if (overlayRef.current) overlayRef.current.style.opacity = "0"; }}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {children}
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "transparent", opacity: 0, transition: "opacity 0.3s ease" }} />
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
    <button onClick={copy} title="点击复制" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: C.desc, display: "flex", alignItems: "center" }}>
      {copied ? <Check size={14} color={C.accent} /> : <Copy size={14} />}
    </button>
  );
}

function scrollTo(href: string) {
  const id = href.replace("#", "");
  // "about" always scrolls to absolute top — scrollIntoView can be a no-op if already partially visible
  if (id === "about") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ─── PROJECT TAG ─────────────────────────────────────────────────────────────

function ProjTag({ children }: { children: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 100,
      background: "rgba(178,149,126,0.12)", color: "#96614A",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

// ─── PROJECT IMAGE WITH SKELETON ────────────────────────────────────────────

function ProjectImg({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: "relative", width: 360, aspectRatio: "16/9", borderRadius: 20, overflow: "hidden", background: "#E8E2D9" }}>
      {!loaded && <div className="img-skeleton" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
    </div>
  );
}

// ─── HOME ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">(() => (localStorage.getItem("sp-lang") as "zh" | "en") || "zh");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredProj, setHoveredProj] = useState<string | null>(null);
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
    // Restore scroll position when returning from a detail page
    const saved = sessionStorage.getItem("sp-scroll");
    if (saved) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem("sp-scroll");
      if (!isNaN(y)) window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  useEffect(() => {
    // Scroll-position–based active section: more reliable than IntersectionObserver
    // for sections with very different heights (e.g. short hero vs long projects list).
    const ids = ["about", "projects", "vibe", "tools"];
    const update = () => {
      const y = window.scrollY + 120; // 120px offset accounts for fixed navbar
      let active = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", update, { passive: true });
    update(); // run once on mount to set initial state
    return () => window.removeEventListener("scroll", update);
  }, []);

  const CARD_WIDTH = "min(1152px, calc(100vw - 48px))";

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }

        .sp-nav-link { position: relative; padding-bottom: 2px; background: none; border: none; font-family: ${SERIF}; font-size: 14px; font-weight: 500; letter-spacing: 0.03em; color: #999; transition: color 0.25s; cursor: pointer; }
        .sp-nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; border-radius: 2px; background: #B2957E; transition: width 0.3s ease; }
        .sp-nav-link:hover::after, .sp-nav-link.active::after { width: 100%; }
        .sp-nav-link.active { color: ${C.text} !important; }
        .sp-nav-link:hover { color: ${C.text}; }

        .project-row { border-bottom: 1px solid ${C.border}; position: relative; cursor: default; }
        .project-row:first-child { border-top: 1px solid ${C.border}; }
        .project-row::before { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background: #B2957E; transform: scaleX(0); transform-origin: left; transition: transform 0.38s cubic-bezier(.16,1,.3,1); z-index: 1; }
        .project-row:hover::before { transform: scaleX(1); }
        .project-row .proj-num { transition: color 0.2s; }
        .project-row:hover .proj-num { color: ${C.accent}; }
        .project-row .proj-desc { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.3s ease; }
        .project-row:hover .proj-desc { max-height: 150px; opacity: 1; margin-top: 24px; }
        .vibe-card { border: 1px solid ${C.border}; border-radius: 32px; transition: border-color 0.25s, transform 0.3s ease, box-shadow 0.3s ease; cursor: default; }
        .vibe-card:hover { border-color: ${C.accent}; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }

        .btn-primary { background: ${C.text}; color: ${C.bg}; border: none; border-radius: 100px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; padding: 13px 28px; cursor: pointer; transition: transform 0.2s ease, opacity 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 7px; font-family: ${SANS}; }
        .btn-primary:hover { transform: scale(1.04); opacity: 0.88; }
        .btn-secondary { background: ${C.bg}; color: ${C.text}; border: 1px solid ${C.border}; border-radius: 100px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; padding: 13px 28px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s; font-family: ${SANS}; display: inline-flex; align-items: center; gap: 7px; }
        .btn-secondary:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

        .photo-img { transition: transform 0.7s cubic-bezier(.16,1,.3,1); display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .photo-wrap:hover .photo-img { transform: scale(1.03); }

        .sf-char { display: inline-block; will-change: opacity, transform; }

        @keyframes sp-imgReveal {
          from { clip-path: inset(0 0 100% 0 round 20px); }
          to   { clip-path: inset(0 0 0%   0 round 20px); }
        }
        .proj-img-reveal { animation: sp-imgReveal 0.38s cubic-bezier(.16,1,.3,1) forwards; align-self: flex-end; }
        .proj-detail-btn { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.3s ease; }
        .project-row:hover .proj-detail-btn { max-height: 50px; opacity: 1; margin-top: 16px; }
        .detail-btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 14px; border-radius: 100px; background: #F9F6F1; border: 1px solid #E1DAD1; color: #2E2E2E; font-size: 14px; font-family: ${SANS}; cursor: default; pointer-events: none; }

        @keyframes skeleton-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .img-skeleton {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #E8E2D9 25%, #F0EBE4 50%, #E8E2D9 75%);
          background-size: 1200px 100%;
          animation: skeleton-shimmer 1.4s infinite linear;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", paddingTop: 18, pointerEvents: "none" }}>
        <nav style={{
          pointerEvents: "all",
          width: CARD_WIDTH,
          height: 60,
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
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none", flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 16, color: C.bg, lineHeight: 1 }}>Y</span>
            </div>
            {/* Bold 18px */}
            <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: C.text }}>Yijun Dong</span>
          </div>

          {/* Nav tabs (no 设计工具) */}
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV.map(l => (
              <button
                key={l.label}
                className={`sp-nav-link ${activeSection === l.href.slice(1) ? "active" : ""}`}
                onClick={() => scrollTo(l.href)}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Lang toggle */}
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
      <section id="about" style={{ paddingTop: 160 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: C.card, borderRadius: 32, padding: "52px 52px 52px 56px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28, minWidth: 0 }}>
              <HeroTitles isZh={isZh} />

              <FadeUp delay={0}>
                <p style={{ fontSize: 18, color: C.desc, lineHeight: 1.75, fontWeight: 400, maxWidth: 520, margin: 0 }}>
                  {isZh
                    ? "深耕交互设计与用户体验，擅长复杂 ToB 系统搭建，拥有百度、华为、奔驰等大型客户实战经验"
                    : "Specialized in interaction design and UX. Expert in complex ToB systems. Hands-on experience with Baidu, Huawei, and Mercedes-Benz."}
                </p>
              </FadeUp>

              <FadeUp delay={80}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: C.desc }}>
                    <Mail size={15} style={{ color: C.accent, flexShrink: 0 }} />
                    <span>yijdong@163.com</span>
                    <CopyBtn value="yijdong@163.com" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: C.desc }}>
                    <Phone size={15} style={{ color: C.accent, flexShrink: 0 }} />
                    <span>18092240354</span>
                    <CopyBtn value="18092240354" />
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={160} style={{ marginTop: 30 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {/* resume-detail icon = FileText, circle-double-down = ChevronsDown */}
                  <button className="btn-primary" onClick={() => navigate("/resume")}>
                    <FileText size={16} />
                    {isZh ? "查看简历" : "View Resume"}
                  </button>
                  <button className="btn-secondary" onClick={() => scrollTo("#projects")}>
                    {isZh ? "查看作品" : "View Work"}
                    <ChevronsDown size={16} />
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Right — photo (3:4, bottom corners 0) + dark marquee strip */}
            <div style={{ flexShrink: 0, width: 286, display: "flex", flexDirection: "column" }}>
              {/* Photo with flat bottom corners */}
              <SpotlightCard style={{ borderRadius: "32px 32px 0 0", overflow: "hidden", aspectRatio: "3/4", background: "#CFC9C2" }}>
                <div className="photo-wrap" style={{ width: "100%", height: "100%" }}>
                  <img
                    src={`${BASE}images/home/photo_me.png`}
                    alt="怡君"
                    className="photo-img"
                  />
                </div>
              </SpotlightCard>

              {/* Dark strip below photo with scrolling white text */}
              <div style={{
                borderRadius: "0 0 32px 32px",
                background: "rgba(36,24,16,0.88)",
                overflow: "hidden",
                padding: "4px 0",
                backdropFilter: "blur(2px)",
              }}>
                <StraightMarquee text={MARQUEE} speed={1.2} fontSize={13} contained color="rgba(255,255,255,0.88)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <ScrollFloat text={isZh ? "项目案例" : "Projects"} triggerId="projects" style={{ fontSize: 60, display: "block" }} />
          <FadeUp delay={100} style={{ marginTop: 28 }}>
            <p style={{ fontSize: 24, color: C.desc, lineHeight: 1.7, margin: "0 auto", maxWidth: 540 }}>
              {isZh ? SECTION_DESC.projects.zh : SECTION_DESC.projects.en}
            </p>
          </FadeUp>
        </div>

        <div ref={projSection.ref}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-row"
              onMouseEnter={() => setHoveredProj(p.num)}
              onMouseLeave={() => setHoveredProj(null)}
              onClick={p.href ? () => { sessionStorage.setItem("sp-scroll", String(window.scrollY)); navigate(`/project/${p.num}`); } : undefined}
              style={{
                padding: "24px 0",
                display: "flex", alignItems: "flex-start", gap: 20,
                cursor: p.href ? "pointer" : "default",
                opacity: projSection.visible ? 1 : 0,
                transform: projSection.visible ? "none" : "translateY(24px)",
                transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms`,
              }}
            >
              <span className="proj-num" style={{ fontSize: 13, fontWeight: 700, color: "#ccc", width: 32, flexShrink: 0, paddingTop: 8, fontVariantNumeric: "tabular-nums" }}>{p.num}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{p.title}</span>
                  <span style={{ fontSize: 13, color: "#aaa", fontWeight: 300 }}>{p.en}</span>
                </div>
                {/* Tags — marginTop 16 (title→tags gap) */}
                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  {p.tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
                </div>
                {/* Description — tags→desc gap is 24px (set via CSS hover) */}
                <div className="proj-desc" style={{ fontSize: 15, color: C.desc, lineHeight: 1.75 }}>{p.desc}</div>
                {/* Detail button — only for projects with href, revealed on hover */}
                {p.href && (
                  <div className="proj-detail-btn">
                    <button className="detail-btn" onClick={() => navigate(`/project/${p.num}`)}>
                      {isZh ? "查看详情" : "View Details"}
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
              {/* Hover image — 360px wide, 16:9, top-to-bottom reveal + skeleton loading; align-self:flex-end so bottom aligns with content */}
              {hoveredProj === p.num && (
                <div className="proj-img-reveal" style={{ flexShrink: 0, paddingLeft: 20 }}>
                  <ProjectImg src={`${BASE}images/home/${PROJECT_IMGS[p.num]}`} alt={p.en} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── VIBE CODING ── */}
      <section id="vibe" ref={vibeSection.ref} style={{ padding: "100px 24px", borderTop: `1px solid ${C.border}`, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <ScrollFloat text="Vibe Coding & AI" triggerId="vibe" style={{ fontSize: 60, display: "block" }} />
          <FadeUp delay={100} style={{ marginTop: 28 }}>
            <p style={{ fontSize: 24, color: C.desc, lineHeight: 1.7, margin: "0 auto", maxWidth: 540 }}>
              {isZh ? SECTION_DESC.vibe.zh : SECTION_DESC.vibe.en}
            </p>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {VIBE.map((v, i) => (
            <div key={v.title} className="vibe-card" onClick={() => { sessionStorage.setItem("sp-scroll", String(window.scrollY)); navigate(`/vibe/${v.id}`); }} style={{ padding: 36, cursor: "pointer", opacity: vibeSection.visible ? 1 : 0, transform: vibeSection.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms` }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {v.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100, background: "rgba(178,149,126,0.12)", color: "#96614A" }}>{t}</span>)}
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1.25, margin: "0 0 14px" }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: C.desc, lineHeight: 1.75, margin: "0 0 20px" }}>{v.desc}</p>
              <button className="detail-btn">
                {isZh ? "查看详情" : "View Details"}
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section id="tools" ref={toolsSection.ref} style={{ borderTop: `1px solid ${C.border}`, background: C.toolsBg, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <ScrollFloat text={isZh ? "设计工具" : "Design Tools"} triggerId="tools" style={{ fontSize: 60, display: "block" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 64px" }}>
            {TOOLS.map((t, i) => (
              <div key={t.name} style={{ opacity: toolsSection.visible ? 1 : 0, transform: toolsSection.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${i * 80}ms, transform 0.6s ease-out ${i * 80}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{t.name}</span>
                  <span style={{ fontSize: 13, color: "#aaa", fontVariantNumeric: "tabular-nums" }}>{t.pct}%</span>
                </div>
                <ProgressBar pct={t.pct} visible={toolsSection.visible} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "36px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: SERIF, fontSize: 18, color: C.text, fontWeight: 600 }}>Yijun Dong</span>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13, color: "#999" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={13} />yijdong@163.com</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={13} />18092240354</span>
          </div>
          <span style={{ fontSize: 12, color: "#bbb" }}>© 2026 · UX Designer</span>
        </div>
      </footer>
    </div>
  );
}
