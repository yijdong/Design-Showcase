import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Layers, RefreshCw, Users } from "lucide-react";
import { PHASE_PATTERN_COLOR, PHASE_PATTERN_IMAGE } from "@/data/phasePattern";
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
  { bg: "#F9F6F1", text: "#2E2E2E" },
  { bg: "#F9F6F1", text: "#2E2E2E" },
  { bg: "#F9F6F1", text: "#2E2E2E" },
  { bg: "#F9F6F1", text: "#2E2E2E" },
  { bg: "#F9F6F1", text: "#2E2E2E" },
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
const PHASE_IMGS   = [1,2,3,4,5].map(n => `${BASE}details/annotation-platform/phase_${n}.png`);

// ── Shared minimalist Slide 0 layout ──────────────────────────────────────
function BaseSlide0({
  num, context, title, tags, desc,
}: {
  num: string; context: string; title: string;
  tags: string[]; desc: string;
}) {
  const NAVBAR_H = 57;
  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      paddingTop: NAVBAR_H + 60, paddingBottom: 80,
      paddingLeft: 80, paddingRight: 80,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      {/* editorial background number */}
      <div style={{
        position: "absolute", top: NAVBAR_H + 0, left: 66,
        fontFamily: SERIF, fontSize: "clamp(120px, 18vw, 220px)",
        fontWeight: 700, color: C.text, opacity: 0.030,
        lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>
        {num}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
        <p style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 700,
          color: C.accent, letterSpacing: "0.16em", textTransform: "uppercase" as const,
          marginBottom: 22,
        }}>
          {context}
        </p>
        <div style={{ width: 32, height: 1.5, background: C.accent, marginBottom: 32 }} />
        <h1 style={{
          fontFamily: SERIF,
          fontSize: "clamp(40px, 5.4vw, 72px)",
          fontWeight: 700, color: C.text,
          lineHeight: 1.08, marginBottom: 32,
        }}>
          {title}
        </h1>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 40 }}>
          {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
        </div>
        <p style={{
          fontFamily: SANS, fontSize: 16, color: C.desc,
          lineHeight: 2.0, maxWidth: 600,
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── Slide 0: Project 01 — title / tags / desc ──────────────────────────────
function Project01Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return (
    <BaseSlide0 num="01" context="ERNIE Bot · Wicresoft" title={title} tags={tags} desc={desc} />
  );
}

// ── Slide 1: Project 01 — users & capabilities ─────────────────────────────
function Project01SlideUsers({ isActive = false }: { isActive?: boolean }) {
  const NAVBAR_H = 57;
  const BD = 0.85; // base delay — after 900ms slide transition
  const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const users = [
    { img: USER_IMGS[0], name: "管理人员",      role: "配置任务、规则与人员体系" },
    { img: USER_IMGS[1], name: "标注人员",      role: "完成具体数据标注任务" },
    { img: USER_IMGS[2], name: "质检/审核人员", role: "对标注结果进行多级质量把控" },
  ];

  const caps = [
    { name: "多模态标注能力", note: "覆盖文本、多模态、智能体等复杂题型" },
    { name: "完整质量闭环",   note: "标注-质检-审核-返修-数据入库" },
    { name: "规模化人力调度", note: "支持场内+垂类兼职+专家人员协同作业" },
  ];

  const rv = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay: isActive ? delay : 0, ease: E },
  });

  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      paddingTop: NAVBAR_H + 60, paddingBottom: 80,
      paddingLeft: 88, paddingRight: 80,
      boxSizing: "border-box", overflow: "hidden",
    }}>

      {/* ── Atmospheric depth gradient ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 88% 88%, rgba(178,149,126,0.11) 0%, transparent 55%)",
      }} />

      {/* ── Left accent bar (Vintage Editorial structural element) ── */}
      <div style={{
        position: "absolute", left: 0, top: "22%", bottom: "22%",
        width: 3, background: C.accent, borderRadius: "0 2px 2px 0",
      }} />

      {/* ── Large faint circle — depth / atmosphere ── */}
      <div style={{
        position: "absolute", right: -110, bottom: -110,
        width: 360, height: 360, borderRadius: "50%",
        border: `1px solid ${C.border}`, opacity: 0.6,
        pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 44 }}>

        {/* Sub-page header */}
        <motion.div {...rv(BD)}>
          <p style={{
            fontFamily: SANS, fontSize: 10, fontWeight: 700,
            color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase" as const,
            marginBottom: 8,
          }}>
            AI数据标注平台
          </p>
          <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: C.text, lineHeight: 1.15 }}>
            用户与能力
          </h2>
        </motion.div>

        {/* Two columns */}
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>

          {/* Users */}
          <div style={{ flex: 1 }}>
            <motion.p
              {...rv(BD + 0.1)}
              style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.13em", textTransform: "uppercase" as const }}
            >
              用户群体
            </motion.p>
            <div style={{ height: 1, background: C.border, marginTop: 16 }} />
            {users.map((u, i) => (
              <motion.div key={u.name} {...rv(BD + 0.2 + i * 0.12)} style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "22px 0",
                borderBottom: i < users.length - 1 ? `1px solid ${C.border}` : undefined,
              }}>
                <img src={u.img} alt={u.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{u.name}</div>
                  <div style={{ fontFamily: SANS, fontSize: 13, color: C.desc, lineHeight: 1.6, marginTop: 4 }}>{u.role}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capabilities */}
          <div style={{ flex: 1 }}>
            <motion.p
              {...rv(BD + 0.13)}
              style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.13em", textTransform: "uppercase" as const }}
            >
              核心能力
            </motion.p>
            <div style={{ height: 1, background: C.border, marginTop: 16 }} />
            {caps.map((cap, i) => (
              <motion.div key={cap.name} {...rv(BD + 0.23 + i * 0.12)} style={{
                padding: "22px 0",
                borderBottom: i < caps.length - 1 ? `1px solid ${C.border}` : undefined,
              }}>
                <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{cap.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: C.desc, lineHeight: 1.7 }}>{cap.note}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Slide 2: Journey Map for project 01 ────────────────────────────────────
function Project01Slide2({ isActive = false }: { isActive?: boolean }) {
  const NAVBAR_H = 57;
  const BD = 0.85;
  const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const phases = [
    { code: "01", label: "项目创建与规则准备" },
    { code: "02", label: "人员匹配与入场" },
    { code: "03", label: "标注执行" },
    { code: "04", label: "质检与审核" },
    { code: "05", label: "结算与闭环" },
  ];

  type Cell = { items?: string[]; highlight?: string; idle?: string };

  const rows: Array<{ role: string; en: string; cells: Cell[] }> = [
    {
      role: "管理者", en: "Manager",
      cells: [
        { items: ["创建项目与任务目标", "配置标注题型", "定义质量标准"] },
        { items: ["筛选合适标注人员", "发布或定向分发任务"] },
        { items: ["查看整体进度", "关注异常与产能"] },
        { items: ["抽检或终审结果", "控制整体质量水平"] },
        { items: ["确认完成情况", "放行结算流程"] },
      ],
    },
    {
      role: "标注员", en: "Annotator",
      cells: [
        { idle: "未入场，等待项目匹配" },
        { items: ["浏览任务信息", "报名并完成认证", "获得角色与权限"] },
        { items: ["领取标注任务", "进行标注任务"] },
        { items: ["提交前自查结果", "根据提示修正问题"] },
        { items: ["查看收益明细", "完成任务闭环"] },
      ],
    },
    {
      role: "系统支持", en: "System",
      cells: [
        { items: ["题型配置"], highlight: "AI 预检规则配置" },
        { items: ["储备人才库", "人才能力校验，资质审核", "角色权限分配"] },
        { items: ["图片标注 / 划词"], highlight: "多轮对话智能体标注" },
        { highlight: "AI 预检浮窗" },
        { items: ["任务与费用汇总", "结算与账单展示"] },
      ],
    },
  ];

  const LINE = "rgba(46,46,46,0.08)";
  const CELL_BG = "rgba(255,255,255,0.30)";
  const DIM_W = 84;
  const ROW_ACCENTS = [C.accent, "#9BA8B0", "#B8A898"];
  const ROW_LABEL_BG = ["rgba(178,149,126,0.10)", "rgba(155,168,176,0.08)", "rgba(184,168,152,0.07)"];

  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H + 18,
      paddingBottom: 14,
      paddingLeft: 60, paddingRight: 60,
      boxSizing: "border-box",
      gap: 14,
      overflow: "hidden",
    }}>

      {/* ── Atmospheric depth gradient ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 15% 95%, rgba(178,149,126,0.09) 0%, transparent 50%)",
      }} />

      {/* ── Sub-page header ── */}
      <motion.div
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 18 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.65, delay: isActive ? BD : 0, ease: E }}
      >
        <p style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 700,
          color: C.accent, letterSpacing: "0.14em", textTransform: "uppercase" as const,
          marginBottom: 8,
        }}>
          AI数据标注平台
        </p>
        <h2 style={{
          fontFamily: SERIF, fontSize: 26, fontWeight: 700,
          color: C.text, lineHeight: 1.2,
        }}>
          业务全流程概览
        </h2>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: `${DIM_W}px repeat(5, 1fr)`,
          gridTemplateRows: "auto 1fr 1fr 1fr",
          border: `1px solid ${LINE}`,
          borderRadius: 14,
          overflow: "hidden",
          background: CELL_BG,
          position: "relative", zIndex: 1,
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, delay: isActive ? BD + 0.15 : 0, ease: E }}
      >

        {/* corner */}
        <div style={{
          borderRight: `1px solid ${LINE}`,
          borderBottom: `1px solid ${LINE}`,
          background: "rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: C.desc, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            阶段
          </span>
        </div>

        {/* phase headers */}
        {phases.map((p, pi) => (
          <div key={pi} style={{
            padding: "10px 14px",
            borderLeft: `1px solid ${LINE}`,
            borderBottom: `1px solid ${LINE}`,
            borderTop: `2.5px solid ${C.accent}`,
            background: "rgba(255,255,255,0.50)",
          }}>
            <p style={{
              fontSize: 9, fontWeight: 800, color: C.accent,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              marginBottom: 5,
            }}>
              PHASE {p.code}
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.35 }}>
              {p.label}
            </p>
          </div>
        ))}

        {/* content rows */}
        {rows.map((row, ri) => (
          <React.Fragment key={ri}>

            {/* dimension label */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: ROW_LABEL_BG[ri],
              borderRight: `1px solid ${LINE}`,
              borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined,
              borderLeft: `3px solid ${ROW_ACCENTS[ri]}`,
              padding: "10px 6px",
              gap: 4,
            }}>
              <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.04em", textAlign: "center" }}>
                {row.role}
              </p>
              <p style={{ fontFamily: SANS, fontSize: 10, color: C.desc, letterSpacing: "0.06em", textAlign: "center" }}>
                {row.en}
              </p>
            </div>

            {/* 5 content cells */}
            {row.cells.map((cell, ci) => (
              <div key={ci} style={{
                padding: "14px 14px",
                borderLeft: `1px solid ${LINE}`,
                borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined,
                background: ri % 2 === 0 ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.16)",
                display: "flex", flexDirection: "column",
                justifyContent: cell.idle ? "center" : "flex-start",
              }}>

                {/* idle state */}
                {cell.idle && (
                  <p style={{
                    fontFamily: SANS, fontSize: 12,
                    color: "#C4BAB0", fontStyle: "italic",
                    textAlign: "center", lineHeight: 1.5,
                  }}>
                    {cell.idle}
                  </p>
                )}

                {/* action items */}
                {cell.items?.map((item, ii) => (
                  <div key={ii} style={{
                    display: "flex", alignItems: "flex-start", gap: 7,
                    marginBottom: ii < (cell.items!.length - 1) || cell.highlight ? 9 : 0,
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "rgba(178,149,126,0.5)",
                      marginTop: 6, flexShrink: 0,
                    }} />
                    <p style={{ fontFamily: SANS, fontSize: 12, color: C.desc, lineHeight: 1.55 }}>
                      {item}
                    </p>
                  </div>
                ))}

                {/* highlight — same style as regular items */}
                {cell.highlight && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "rgba(178,149,126,0.5)",
                      marginTop: 6, flexShrink: 0,
                    }} />
                    <p style={{ fontFamily: SANS, fontSize: 12, color: C.desc, lineHeight: 1.55 }}>
                      {cell.highlight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

// ── Slide 3: Project 01 — core user journey UI ─────────────────────────────
function Project01Slide3({ isActive = false }: { isActive?: boolean }) {
  const NAVBAR_H = 57;
  const BD = 0.85;
  const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const [activePhase, setActivePhase] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());

  // Reset to Phase 01 every time this slide becomes active
  useEffect(() => {
    if (isActive) setActivePhase(0);
  }, [isActive]);

  const rv = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay: isActive ? delay : 0, ease: E },
  });

  const phases = [
    { en: "PHASE 01", zh: "项目创建与规则准备" },
    { en: "PHASE 02", zh: "人员匹配与入场" },
    { en: "PHASE 03", zh: "标注执行" },
    { en: "PHASE 04", zh: "质检与审核" },
    { en: "PHASE 05", zh: "结算与闭环" },
  ];

  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H + 28,
      paddingBottom: 60,
      paddingLeft: 88, paddingRight: 80,
      boxSizing: "border-box", overflow: "hidden",
      gap: 60,
    }}>

      {/* ── Atmospheric depth gradient ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 85% 15%, rgba(178,149,126,0.08) 0%, transparent 50%)",
      }} />

      {/* ── Sub-page header ── */}
      <motion.div style={{ position: "relative", zIndex: 1 }} {...rv(BD)}>
        <p style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 700,
          color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase" as const,
          marginBottom: 8,
        }}>
          AI数据标注平台
        </p>
        <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
          核心用户旅程界面
        </h2>
      </motion.div>

      {/* ── Body: left phase list + right image area ── */}
      <div style={{
        flex: 1, minHeight: 0,
        display: "flex", gap: 64,
        position: "relative", zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Left: phase list */}
        <div style={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
          {phases.map((phase, i) => {
            const active = activePhase === i;
            return (
              <motion.div
                key={i}
                {...rv(BD + 0.12 + i * 0.08)}
                onMouseEnter={() => setActivePhase(i)}
                style={{
                  cursor: "pointer",
                  padding: "20px 0",
                  display: "flex", alignItems: "center", gap: 16,
                }}
              >
                {/* Active indicator */}
                <div style={{
                  width: 3, height: active ? 38 : 0,
                  background: C.accent,
                  borderRadius: 2,
                  flexShrink: 0,
                  transition: "height 0.35s cubic-bezier(0.16,1,0.3,1)",
                }} />
                <div>
                  <p style={{
                    fontFamily: SANS, fontSize: 11, fontWeight: 700,
                    color: active ? C.accent : C.desc,
                    letterSpacing: "0.13em", textTransform: "uppercase" as const,
                    marginBottom: 5,
                    transition: "color 0.3s ease",
                  }}>
                    {phase.en}
                  </p>
                  <p style={{
                    fontFamily: SANS,
                    fontSize: 18,
                    fontWeight: active ? 600 : 400,
                    color: active ? C.text : "#999",
                    lineHeight: 1.35,
                    transition: "color 0.3s ease, font-weight 0.2s ease",
                  }}>
                    {phase.zh}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: image display area — 16:10, fills body height */}
        <motion.div
          {...rv(BD + 0.55)}
          style={{
            height: "100%",
            aspectRatio: "16/10",
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            backgroundColor: PHASE_PATTERN_COLOR,
            backgroundImage: PHASE_PATTERN_IMAGE,
            backgroundSize: "600px 600px",
            flexShrink: 0,
          }}
        >
          {PHASE_IMGS.map((src, i) => (
            <motion.div
              key={i}
              style={{ position: "absolute", inset: 0 }}
              initial={{ clipPath: i === 0 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
              animate={{
                clipPath: activePhase === i
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              }}
              transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.75 }}
            >
              {!loadedImgs.has(i) && <div className="phase-skeleton" />}
              <img
                src={src}
                alt={`Phase ${i + 1}`}
                onLoad={() => setLoadedImgs(prev => new Set([...prev, i]))}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  opacity: loadedImgs.has(i) ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

// ── Project 01 / Slide 4: 指令修改体验优化 ──────────────────────────────────
function Project01Slide4({ isActive = false }: { isActive?: boolean }) {
  const NAVBAR_H = 57;
  const BD = 0.85;
  const E: [number,number,number,number] = [0.16,1,0.3,1];
  const slideBg = SLIDES[4].bg;

  const rv = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.72, delay, ease: E },
  });

  const iframeSrc = `${import.meta.env.BASE_URL}details/annotation-platform/slide-interaction.html`;

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H + 28, paddingBottom: 60,
      paddingLeft: 88, paddingRight: 80,
      boxSizing: "border-box", overflow: "hidden",
      gap: 60,
    }}>
      {/* Atmospheric gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 70% 60% at 75% 40%, rgba(220,210,195,0.45) 0%, transparent 70%)`,
      }} />

      {/* ── Header ── */}
      <motion.div {...rv(BD)} style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <p style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase", color: C.desc, margin: 0,
          }}>
            AI数据标注平台
          </p>
          <span style={{
            fontFamily: SANS, fontSize: 10, letterSpacing: "0.08em",
            color: C.accent, backgroundColor: `${C.accent}1A`, border: `1px solid ${C.accent}40`,
            padding: "2px 8px", borderRadius: 100, lineHeight: 1.5,
          }}>
            标注执行阶段
          </span>
        </div>
        <h2 style={{
          fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: C.text,
          margin: 0, letterSpacing: "-0.01em", lineHeight: 1.25,
        }}>
          关键方案 — 指令修改体验优化
        </h2>
      </motion.div>

      {/* ── Body: left text + right iframe ── */}
      <div style={{
        flex: 1, minHeight: 0,
        display: "flex", gap: 56,
        position: "relative", zIndex: 1,
        alignItems: "stretch",
        justifyContent: "center",
      }}>

        {/* Left: structured text */}
        <motion.div {...rv(BD + 0.12)} style={{
          width: 300, flexShrink: 0,
          display: "flex", flexDirection: "column", gap: 28,
          justifyContent: "center",
        }}>
          {/* 需求背景 */}
          <div>
            <p style={{
              fontFamily: SANS, fontSize: 10, letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.accent, margin: "0 0 10px",
              fontWeight: 600,
            }}>需求背景</p>
            <p style={{
              fontFamily: SANS, fontSize: 13.5, lineHeight: 1.85,
              color: C.desc, margin: 0,
            }}>
              智能体组件通过多轮对话生成推荐思考内容，标注人员需要频繁重新请求模型并人工调整结果，筛选可用内容用于后续模型训练。
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: C.border }} />

          {/* 核心痛点 */}
          <div>
            <p style={{
              fontFamily: SANS, fontSize: 10, letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.accent, margin: "0 0 14px",
              fontWeight: 600,
            }}>核心痛点</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{
                  fontFamily: SANS, fontSize: 13, fontWeight: 600,
                  color: C.text, margin: "0 0 4px",
                }}>结果不可控</p>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, lineHeight: 1.75,
                  color: C.desc, margin: 0,
                }}>每次全量重生成随机性高，标注人员需要反复试错才能获得可用结果。</p>
              </div>
              <div>
                <p style={{
                  fontFamily: SANS, fontSize: 13, fontWeight: 600,
                  color: C.text, margin: "0 0 4px",
                }}>优质内容丢失</p>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, lineHeight: 1.75,
                  color: C.desc, margin: 0,
                }}>重新生成会覆盖已有优质内容，缺乏对局部修改与结果保留的支持。</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: C.border }} />

          {/* 设计策略 */}
          <div>
            <p style={{
              fontFamily: SANS, fontSize: 10, letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.accent, margin: "0 0 14px",
              fontWeight: 600,
            }}>设计策略</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{
                  fontFamily: SANS, fontSize: 13, fontWeight: 600,
                  color: C.text, margin: "0 0 4px",
                }}>指令修改</p>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, lineHeight: 1.75,
                  color: C.desc, margin: 0,
                }}>通过明确修改指令意图，收敛生成范围。</p>
              </div>
              <div>
                <p style={{
                  fontFamily: SANS, fontSize: 13, fontWeight: 600,
                  color: C.text, margin: "0 0 4px",
                }}>断点后重写</p>
                <p style={{
                  fontFamily: SANS, fontSize: 12.5, lineHeight: 1.75,
                  color: C.desc, margin: 0,
                }}>仅重构不满意部分，降低试错与返工。</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: iframe demo */}
        <motion.div
          {...rv(BD + 0.35)}
          style={{
            flex: 1,
            height: "100%",
            borderRadius: 32,
            overflow: "hidden",
            position: "relative",
            backgroundColor: "#f8fafc",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          {isActive && (
            <iframe
              src={iframeSrc}
              title="指令修改体验演示"
              style={{
                width: "100%", height: "100%",
                border: "none", display: "block",
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </motion.div>

      </div>
    </div>
  );
}

// ── Project 01 / Slide 5: 指令修改需求分析 ──────────────────────────────────
function Project01Slide5({ isActive = false }: { isActive?: boolean }) {
  const NAVBAR_H = 57;
  const BD = 0.85;
  const E: [number,number,number,number] = [0.16,1,0.3,1];

  const rv = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.65, delay, ease: E },
  });

  const steps = [
    { num: "01", label: "需求分析", active: true },
    { num: "02", label: "竞品分析", active: false },
    { num: "03", label: "多方案对比", active: false },
    { num: "04", label: "交互文档", active: false },
  ];

  const problems = [
    {
      title: "强打断感，上下文易丢失",
      body: "弹窗会完全遮挡主界面，打断用户对原文上下文的参考。即便弹窗内显示原文，也因区域有限、失去原有排版，需要用户重新构建语境，加重认知负担。",
    },
    {
      title: "操作路径长，任务流失率高",
      body: "原本可在页面内直接完成的轻量操作，变成多步弹窗流程。对需要快速反馈、反复修改的 AI 场景，层级过多会降低操作意愿，不符合「直接操作」原则，体验笨重不流畅。",
    },
    {
      title: "视觉冗余，空间利用率低",
      body: "弹窗重复展示原文占用大量空间，长文本还易出现双层滚动条，操作时看不到主界面实时变化，像「盲改」，降低用户对结果的可控感。",
    },
  ];

  const pmProto = `${import.meta.env.BASE_URL}details/annotation-platform/pm_proto.png`;

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H + 28, paddingBottom: 60,
      paddingLeft: 88, paddingRight: 80,
      boxSizing: "border-box", overflow: "hidden",
      gap: 60,
    }}>

      {/* ── Atmospheric gradient ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 60% 20%, rgba(178,149,126,0.07) 0%, transparent 65%)",
      }} />

      {/* ── Header ── */}
      <motion.div {...rv(BD)} style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.desc, margin: 0 }}>
            AI数据标注平台
          </p>
          <span style={{
            fontFamily: SANS, fontSize: 10, letterSpacing: "0.08em",
            color: C.accent, backgroundColor: `${C.accent}1A`, border: `1px solid ${C.accent}40`,
            padding: "2px 8px", borderRadius: 100, lineHeight: 1.5,
          }}>标注执行阶段</span>
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
          关键方案 — 指令修改需求分析
        </h2>
      </motion.div>

      {/* ── Content section: step nav + body ── */}
      <motion.div
        {...rv(BD + 0.1)}
        style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 28, position: "relative", zIndex: 1 }}
      >

        {/* ── Step progress nav (display only) ── */}
        <div style={{ flexShrink: 0 }}>
          {/* Dots + lines row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{
                  width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
                  background: step.active ? C.accent : "transparent",
                  border: `1.5px solid ${step.active ? C.accent : "#C8C2BB"}`,
                  boxShadow: step.active ? `0 0 0 3px ${C.accent}22` : "none",
                  transition: "all 0.3s ease",
                }} />
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #E1DAD1, #D0C9C0)" }} />
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Labels row */}
          <div style={{ display: "flex", marginTop: 10 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ flex: i < steps.length - 1 ? 1 : "none" }}>
                <p style={{
                  fontFamily: SANS, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.10em",
                  textTransform: "uppercase" as const, color: step.active ? C.accent : "#B0A89F",
                  margin: "0 0 3px",
                }}>Step {step.num}</p>
                <p style={{
                  fontFamily: SANS, fontSize: 12, fontWeight: step.active ? 600 : 400,
                  color: step.active ? C.text : "#B0A89F", margin: 0, lineHeight: 1.3,
                }}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body: left image + right analysis ── */}
        <div style={{
          flex: 1, minHeight: 0,
          display: "flex", gap: 52, alignItems: "stretch",
        }}>

          {/* Left: PM prototype image */}
          <motion.div {...rv(BD + 0.25)} style={{
            width: "36%", flexShrink: 0,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{
              flex: 1,
              borderRadius: 20,
              overflow: "hidden",
              border: `1px solid ${C.border}`,
              boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              position: "relative",
            }}>
              <img
                src={pmProto}
                alt="产品原型"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
            <p style={{
              fontFamily: SANS, fontSize: 11, color: C.desc,
              textAlign: "center" as const, margin: 0, letterSpacing: "0.04em",
              fontStyle: "italic",
            }}>产品原型</p>
          </motion.div>

          {/* Right: problem analysis */}
          <motion.div {...rv(BD + 0.38)} style={{
            flex: 1, minWidth: 0,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            {/* Intro */}
            <p style={{
              fontFamily: SANS, fontSize: 12.5, color: C.desc, lineHeight: 1.8,
              margin: "0 0 20px", borderLeft: `3px solid ${C.border}`, paddingLeft: 14,
            }}>
              针对 PM 提供的「弹窗式指令修改」方案，从认知负荷、操作流失率及空间效率三个维度进行分析，存在以下主要问题：
            </p>

            {/* Problem blocks */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {problems.map((problem, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", gap: 18, alignItems: "flex-start",
                    paddingBottom: i < 2 ? 20 : 0,
                    borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                    marginBottom: i < 2 ? 20 : 0,
                  }}
                >
                  {/* Numbered circle */}
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: "#F0EBE5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: SERIF, fontSize: 13, fontWeight: 700,
                    color: C.accent, marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: SANS, fontSize: 13.5, fontWeight: 600,
                      color: C.text, margin: "0 0 6px", lineHeight: 1.3,
                    }}>{problem.title}</p>
                    <p style={{
                      fontFamily: SANS, fontSize: 12, color: C.desc,
                      lineHeight: 1.8, margin: 0,
                    }}>{problem.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ── Slide 0: Project 02 ────────────────────────────────────────────────────
function Project02Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="02" context="Huawei · Enterprise IT" title={title} tags={tags} desc={desc} />;
}

// ── Slide 0: Project 03 ────────────────────────────────────────────────────
function Project03Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="03" context="Mercedes-Benz Financial Services" title={title} tags={tags} desc={desc} />;
}

// ── Slide 0: Vibe 0 ────────────────────────────────────────────────────────
function Vibe0Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V1" context="Luxshare Precision · North America" title={title} tags={tags} desc={desc} />;
}

// ── Slide 0: Vibe 1 ────────────────────────────────────────────────────────
function Vibe1Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V2" context="Personal Project · This Site" title={title} tags={tags} desc={desc} />;
}

// ── Slide 0: Vibe 2 ────────────────────────────────────────────────────────
function Vibe2Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V3" context="Google AI Studio · Gemini" title={title} tags={tags} desc={desc} />;
}

// ── Default Slide 0 (fallback) ──────────────────────────────────────────────
function DefaultSlide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return (
    <BaseSlide0 num="—" context="" title={title} tags={tags} desc={desc} />
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
            <div style={{ width: 14, height: 14, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <motion.div
                variants={{ initial: { x: "-100%", opacity: 0 }, hover: { x: 0, opacity: 1 } }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", color: accent }}
              >
                <ArrowRight size={11} strokeWidth={2.5} />
              </motion.div>
            </div>
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

  const slideLabels = params.num === "01"
    ? ["项目背景", "用户与能力", "业务全流程概览", "核心用户旅程界面", "指令修改体验优化", "指令修改需求分析"]
    : undefined;

  const commonProps = { title: item.title, tags: item.tags, desc: item.desc };
  const slide0 = params.num === "01" ? <Project01Slide0 {...commonProps} />
    : params.num === "02" ? <Project02Slide0 {...commonProps} />
    : params.num === "03" ? <Project03Slide0 {...commonProps} />
    : <DefaultSlide0 {...commonProps} />;
  const slide1 = params.num === "01" ? <Project01SlideUsers /> : undefined;
  const slide2 = params.num === "01" ? <Project01Slide2 /> : undefined;
  const slide3 = params.num === "01" ? <Project01Slide3 /> : undefined;
  const slide4 = params.num === "01" ? <Project01Slide4 /> : undefined;
  const slide5 = params.num === "01" ? <Project01Slide5 /> : undefined;

  return (
    <DetailLayout
      isZh={isZh}
      navigate={navigate}
      sectionLabel={isZh ? "项目案例" : "Projects"}
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slideLabels={slideLabels}
      slide0={slide0}
      slide1={slide1}
      slide2={slide2}
      slide3={slide3}
      slide4={slide4}
      slide5={slide5}
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

  const vibeProps = { title: item.title, tags: item.tags, desc: item.desc };
  const vibeSlide0 = params.id === "0" ? <Vibe0Slide0 {...vibeProps} />
    : params.id === "1" ? <Vibe1Slide0 {...vibeProps} />
    : params.id === "2" ? <Vibe2Slide0 {...vibeProps} />
    : <DefaultSlide0 {...vibeProps} />;

  return (
    <DetailLayout
      isZh={isZh}
      navigate={navigate}
      sectionLabel="Vibe Coding & AI"
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slide0={vibeSlide0}
      titleForReset={item.title}
    />
  );
}

// ── Core layout engine ─────────────────────────────────────────────────────

function DetailLayout({
  isZh, navigate, sectionLabel, prevPath, nextPath,
  slideLabels, slide0, slide1, slide2, slide3, slide4, slide5, titleForReset,
}: {
  isZh: boolean;
  navigate: (to: string) => void;
  sectionLabel: string;
  prevPath: string | null;
  nextPath: string | null;
  slideLabels?: string[];
  slide0: React.ReactNode;
  slide1?: React.ReactNode;
  slide2?: React.ReactNode;
  slide3?: React.ReactNode;
  slide4?: React.ReactNode;
  slide5?: React.ReactNode;
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
  const navBg     = "rgba(252,251,248,0.96)";
  const navBorder = C.border;

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
        @keyframes skeleton-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .phase-skeleton {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #E8E2D9 25%, #F0EBE4 50%, #E8E2D9 75%);
          background-size: 1200px 100%;
          animation: skeleton-shimmer 1.4s infinite linear;
          border-radius: 32px;
        }
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
          {i === 1 && slide1 && React.cloneElement(slide1 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 1 })}
          {i === 2 && slide2 && React.cloneElement(slide2 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 2 })}
          {i === 3 && slide3 && React.cloneElement(slide3 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 3 })}
          {i === 4 && slide4 && React.cloneElement(slide4 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 4 })}
          {i === 5 && slide5 && React.cloneElement(slide5 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 5 })}
        </div>
      ))}
    </>
  );
}
