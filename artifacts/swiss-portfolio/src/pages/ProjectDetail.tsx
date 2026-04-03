import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Layers, RefreshCw, Users } from "lucide-react";
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
  card: "#E8E2D9",
};
const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS  = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const SLIDES = [
  { bg: "#F9F6F1", text: "#2E2E2E" },
  { bg: "#EDE8E0", text: "#2E2E2E" },
  { bg: "#E4DDD5", text: "#2E2E2E" },
  { bg: "#D8D0C7", text: "#2E2E2E" },
  { bg: "#2E2E2E", text: "#F9F6F1" },
];

const DURATION = 900;

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

const BASE = import.meta.env.BASE_URL;
const ANNOT_IMG    = `${BASE}details/annotation-platform/cover.png`;
const USER_IMGS    = [
  `${BASE}details/annotation-platform/user01.png`,
  `${BASE}details/annotation-platform/user02.png`,
  `${BASE}details/annotation-platform/user03.png`,
];

// ── Slide 0 content for project 01 ─────────────────────────────────────────
function Project01Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  const NAVBAR_H = 57;

  const users = [
    { img: USER_IMGS[0], name: "管理人员",      role: "配置任务、规则与人员体系" },
    { img: USER_IMGS[1], name: "标注人员",      role: "完成具体数据标注任务" },
    { img: USER_IMGS[2], name: "质检/审核人员", role: "对标注结果进行多级质量把控" },
  ];

  const caps = [
    { icon: <Layers size={16} strokeWidth={1.7} />, name: "多模态标注能力", note: "覆盖文本、多模态、智能体等复杂题型" },
    { icon: <RefreshCw size={16} strokeWidth={1.7} />, name: "完整质量闭环",  note: "标注-质检-审核-返修-数据入库" },
    { icon: <Users size={16} strokeWidth={1.7} />,  name: "规模化人力调度", note: "支持场内+垂类兼职+专家人员协同作业" },
  ];

  return (
    <div style={{
      width: "100%", height: "100vh",
      display: "flex", alignItems: "center",
      paddingTop: NAVBAR_H + 28,
      paddingBottom: 28,
      paddingLeft: 60,
      paddingRight: 60,
      gap: "4%",
      boxSizing: "border-box",
    }}>

      {/* ── LEFT COLUMN ─────────────────── */}
      <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", alignSelf: "stretch" }}>
        <h1 style={{
          fontFamily: SERIF,
          fontSize: "clamp(30px, 3.6vw, 56px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          {title}
        </h1>

        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
          {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
        </div>

        <p style={{
          fontFamily: SANS,
          fontSize: 14,
          color: C.desc,
          lineHeight: 1.9,
          marginBottom: 20,
          maxWidth: 540,
        }}>
          {desc}
        </p>

        {/* Screenshot image — fills remaining space */}
        <div style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 24,
          border: `1px solid #F0EAE4`,
          overflow: "hidden",
          background: "#FAFAFA",
        }}>
          <img
            src={ANNOT_IMG}
            alt="AI数据标注平台截图"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        </div>
      </div>

      {/* ── RIGHT COLUMN ─── natural-height card, centered vertically ── */}
      <div style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        background: "#EFEBE5",
        borderRadius: 20,
        padding: "26px 24px",
        overflow: "hidden",
      }}>

        {/* ── Users section ── */}
        <p style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 700,
          color: C.desc, letterSpacing: "0.1em", textTransform: "uppercase" as const,
          marginBottom: 14,
        }}>
          用户
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {users.map(u => (
            <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <img
                src={u.img}
                alt={u.name}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  objectFit: "cover", flexShrink: 0,
                  border: `1.5px solid ${C.border}`,
                }}
              />
              <div>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{u.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: C.desc, lineHeight: 1.5, marginTop: 2 }}>{u.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, margin: "22px 0" }} />

        {/* ── Core capabilities ── */}
        <p style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 700,
          color: C.desc, letterSpacing: "0.1em", textTransform: "uppercase" as const,
          marginBottom: 12,
        }}>
          核心能力
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {caps.map(cap => (
            <div key={cap.name} style={{
              display: "flex", alignItems: "center", gap: 13,
              background: "rgba(255,255,255,0.55)",
              borderRadius: 12,
              padding: "11px 14px",
              border: `1px solid rgba(255,255,255,0.8)`,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "rgba(178,149,126,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.accent, flexShrink: 0,
              }}>
                {cap.icon}
              </div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{cap.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: C.desc, lineHeight: 1.5, marginTop: 2 }}>{cap.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Default Slide 0 (generic, used by all other projects) ──────────────────
function DefaultSlide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return (
    <div style={{ maxWidth: 960, width: "100%", padding: "80px 60px 0" }}>
      <h1 style={{
        fontFamily: SERIF,
        fontSize: "clamp(38px, 5vw, 72px)",
        fontWeight: 700, color: C.text,
        lineHeight: 1.15, marginBottom: 32,
      }}>
        {title}
      </h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
      </div>
      <p style={{ fontSize: "clamp(16px, 1.4vw, 22px)", color: C.desc, lineHeight: 1.85, maxWidth: 680 }}>
        {desc}
      </p>
    </div>
  );
}

// ── Page-indicator with hover-reveal menu ──────────────────────────────────
function PageIndicator({
  total, current, textColor, labels, onGoTo,
}: {
  total: number;
  current: number;
  textColor: string;
  labels?: string[];
  onGoTo: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const menuBg   = "rgba(249,246,241,0.97)";
  const menuText = C.text;
  const accent   = C.accent;

  return (
    <div
      style={{ position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 400 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* dots column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: current === i ? textColor : "transparent",
            border: `1.5px solid ${current === i ? textColor : `${textColor}55`}`,
            transform: current === i ? "scale(1.4)" : "scale(1)",
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>

      {/* slide-in menu panel — absolute, right-aligned (covers dots) */}
      <div style={{
        position: "absolute", right: 0, top: "50%",
        transform: `translateY(-50%) translateX(${open ? 0 : 14}px)`,
        opacity: open ? 1 : 0,
        transition: "opacity 0.28s ease, transform 0.28s ease",
        pointerEvents: open ? "auto" : "none",
        background: menuBg,
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16, padding: "22px 28px",
        display: "flex", flexDirection: "column", gap: 18,
        boxShadow: "0 24px 60px rgba(46,46,46,0.18), 0 8px 20px rgba(46,46,46,0.10)",
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial="initial"
            whileHover="hover"
            onClick={() => onGoTo(i)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", fontFamily: SANS, fontSize: 15,
              fontWeight: current === i ? 700 : 400,
              color: current === i ? accent : menuText,
              lineHeight: 1.5, minWidth: 140, whiteSpace: "nowrap",
            }}
          >
            {/* arrow — clips from left */}
            <div style={{ width: 14, height: 14, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <motion.div
                variants={{ initial: { x: "-100%", opacity: 0 }, hover: { x: 0, opacity: 1 } }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", color: accent }}
              >
                <ArrowRight size={11} strokeWidth={2.5} />
              </motion.div>
            </div>
            {/* number + label */}
            <motion.span
              variants={{ initial: { x: -10 }, hover: { x: 0, color: accent } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {String(i + 1).padStart(2, "0")}
              {labels?.[i] ? `  ${labels[i]}` : ""}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Page exports ───────────────────────────────────────────────────────────

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

  // Project-specific slide labels (tooltip menu only)
  const slideLabels = params.num === "01"
    ? ["背景介绍", "", "", "", ""]
    : undefined;

  // Project-specific slide 0 content
  const slide0 = params.num === "01"
    ? <Project01Slide0 title={item.title} tags={item.tags} desc={item.desc} />
    : <DefaultSlide0   title={item.title} tags={item.tags} desc={item.desc} />;

  return (
    <DetailLayout
      isZh={isZh}
      navigate={navigate}
      sectionLabel={isZh ? "项目案例" : "Projects"}
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slideLabels={slideLabels}
      slide0={slide0}
      titleForReset={item.title}
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
      sectionLabel="Vibe Coding & AI"
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slide0={<DefaultSlide0 title={item.title} tags={item.tags} desc={item.desc} />}
      titleForReset={item.title}
    />
  );
}

// ── Core layout engine ─────────────────────────────────────────────────────

function DetailLayout({
  isZh, navigate, sectionLabel, prevPath, nextPath,
  slideLabels, slide0, titleForReset,
}: {
  isZh: boolean;
  navigate: (to: string) => void;
  sectionLabel: string;
  prevPath: string | null;
  nextPath: string | null;
  slideLabels?: string[];
  slide0: React.ReactNode;
  titleForReset: string;
}) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const busyRef    = useRef(false);

  const goTo = (index: number) => {
    if (busyRef.current) return;
    if (index < 0 || index >= SLIDES.length) return;
    busyRef.current = true;
    currentRef.current = index;
    setCurrent(index);
    setTimeout(() => { busyRef.current = false; }, DURATION + 50);
  };

  useEffect(() => {
    currentRef.current = 0;
    setCurrent(0);
    busyRef.current = false;
  }, [titleForReset]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accum += e.deltaY;
      if (accum > 60)  { accum = 0; goTo(currentRef.current + 1); }
      else if (accum < -60) { accum = 0; goTo(currentRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (diff > 50)  goTo(currentRef.current + 1);
      else if (diff < -50) goTo(currentRef.current - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goTo(currentRef.current + 1);
      if (e.key === "ArrowUp"   || e.key === "PageUp")   goTo(currentRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textColor = SLIDES[current].text;
  const navBg     = current === 4 ? "rgba(46,46,46,0.96)"   : "rgba(252,251,248,0.96)";
  const navBorder = current === 4 ? "rgba(249,246,241,0.10)" : C.border;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; font-family: ${SANS};
          font-size: 14px; font-weight: 500; cursor: pointer; padding: 0;
          transition: opacity 0.2s; white-space: nowrap;
        }
        .back-btn:hover { opacity: 0.55; }
        .nav-btn {
          display: inline-flex; align-items: center; gap: 4px;
          border-radius: 100px; font-family: ${SANS}; font-size: 13px;
          font-weight: 500; padding: 0 14px; height: 34px; cursor: pointer;
          transition: opacity 0.2s; white-space: nowrap; background: transparent;
        }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .nav-btn:not(:disabled):hover { opacity: 0.65; }
      `}</style>

      {/* ── NAVBAR ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center",
        paddingLeft: 60, paddingRight: 60,
        paddingTop: 14, paddingBottom: 14,
        background: navBg,
        backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${navBorder}`,
        transition: `background ${DURATION}ms ease, border-color ${DURATION}ms ease`,
      }}>
        <button className="back-btn" style={{ color: textColor }} onClick={() => navigate("/")}>
          <ArrowLeft size={15} />
          {isZh ? "返回主页" : "Back to Home"}
        </button>

        <div style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          zIndex: 1, pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: SERIF, fontSize: 17, fontWeight: 700,
            color: textColor, letterSpacing: "0.02em",
            transition: `color ${DURATION}ms ease`,
          }}>
            {sectionLabel}
          </span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            className="nav-btn"
            disabled={!prevPath}
            style={{ color: textColor, border: `1px solid ${textColor}40` }}
            onClick={() => prevPath && navigate(prevPath)}
          >
            <ChevronLeft size={14} />
            {isZh ? "上一个" : "Prev"}
          </button>
          <button
            className="nav-btn"
            disabled={!nextPath}
            style={{ color: textColor, border: `1px solid ${textColor}40` }}
            onClick={() => nextPath && navigate(nextPath)}
          >
            {isZh ? "下一个" : "Next"}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── INDICATOR ── */}
      <PageIndicator
        total={SLIDES.length}
        current={current}
        textColor={textColor}
        labels={slideLabels}
        onGoTo={goTo}
      />

      {/* ── SLIDES ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: slide.bg,
            transform: `translateY(${i <= current ? 0 : 100}vh)`,
            transition: `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
            zIndex: i + 1,
            display: "flex", alignItems: "center", justifyContent: "flex-start",
          }}
        >
          {i === 0 && slide0}
        </div>
      ))}
    </>
  );
}
