import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PHASE_PATTERN_COLOR, PHASE_PATTERN_IMAGE } from "@/data/phasePattern";
import {
  PROJECTS_ZH, PROJECTS_EN, VIBE_ZH, VIBE_EN,
  DETAIL_SEQUENCE, seqPath,
} from "@/data/portfolio";

const C = {
  bg: "#F9F6F1", text: "#2E2E2E", desc: "#666666",
  accent: "#B2957E", border: "#E1DAD1", card: "#E8E2D9",
};
const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS  = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const NAVBAR_H = 57;
const PAD_X = 60;
const PAD_Y = 32;
const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 500;

const SLIDE_BG = { bg: "#F9F6F1", text: "#2E2E2E" };
const SLIDES = [
  SLIDE_BG, SLIDE_BG, SLIDE_BG, SLIDE_BG,
  SLIDE_BG, SLIDE_BG, SLIDE_BG, SLIDE_BG,
];

const BASE = import.meta.env.BASE_URL;

// ── Tiny helpers ──────────────────────────────────────────────────────────
function ProjTag({ children }: { children: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
      padding: "4px 10px", borderRadius: 100,
      background: "rgba(178,149,126,0.12)", color: "#96614A", display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
      <div style={{ width: 3, height: 13, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
      <p style={{
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.13em",
        textTransform: "uppercase" as const, color: C.accent, margin: 0, fontWeight: 700,
      }}>{children}</p>
    </div>
  );
}

// ── Page title + full-width accent line ──────────────────────────────────
// Line extends to the right edge of the content area (60px gap to viewport edge via container padding).
function PageTitle({ title, motionProps }: { title: string; motionProps: object }) {
  return (
    <motion.div style={{ flexShrink: 0, display: "flex", flexDirection: "column", width: "100%" }} {...motionProps}>
      <h2 style={{
        fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.text,
        lineHeight: 1.3, marginBottom: 16,
      }}>{title}</h2>
      <div style={{ width: "100%", height: 1, background: C.accent, marginBottom: 32 }} />
    </motion.div>
  );
}

// ── Compact step bar ──────────────────────────────────────────────────────
function CompactStepBar({ activeStep = 1 }: { activeStep?: number }) {
  const steps = [
    { num: "01", label: "需求分析" },
    { num: "02", label: "竞品分析" },
    { num: "03", label: "多方案对比" },
    { num: "04", label: "交互文档" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {steps.map((step, i) => {
        const active = i + 1 === activeStep;
        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: active ? C.accent : "transparent",
                border: `1.5px solid ${active ? C.accent : "#C8C2BB"}`,
                boxShadow: active ? `0 0 0 3px ${C.accent}22` : "none",
              }} />
              <span style={{
                fontFamily: SANS, fontSize: 10, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.09em",
                color: active ? C.accent : "#B0A89F",
              }}>Step {step.num}</span>
              <span style={{
                fontFamily: SANS, fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? C.text : "#B0A89F",
              }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 36, height: 1, flexShrink: 0,
                background: "linear-gradient(90deg, #E1DAD1, #D0C9C0)",
                margin: "0 10px",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
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

const USER_IMGS = [1,2,3].map(n => `${BASE}details/annotation-platform/user0${n}.png`);
const PHASE_IMGS = [1,2,3,4,5].map(n => `${BASE}details/annotation-platform/phase_${n}.png`);
const COMP_IMGS = [1,2].map(n => `${BASE}details/annotation-platform/competitive%20analysis_${n}.png`);

// ── Shared cover slide ────────────────────────────────────────────────────
function BaseSlide0({ num, context, title, tags, desc }: {
  num: string; context: string; title: string; tags: string[]; desc: string;
}) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: NAVBAR_H, left: 66,
        fontFamily: SERIF, fontSize: "clamp(120px, 18vw, 220px)",
        fontWeight: 700, color: C.text, opacity: 0.030,
        lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>{num}</div>
      <div style={{
        flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", paddingTop: PAD_Y, paddingBottom: PAD_Y,
        position: "relative", zIndex: 1, maxWidth: 780,
      }}>
        <p style={{
          fontFamily: SANS, fontSize: 10, fontWeight: 700,
          color: C.accent, letterSpacing: "0.16em", textTransform: "uppercase" as const,
          marginBottom: 22,
        }}>{context}</p>
        <div style={{ width: 32, height: 1.5, background: C.accent, marginBottom: 32 }} />
        <h1 style={{
          fontFamily: SERIF, fontSize: "clamp(40px, 5.4vw, 72px)",
          fontWeight: 700, color: C.text, lineHeight: 1.08, marginBottom: 32,
        }}>{title}</h1>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 40 }}>
          {tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}
        </div>
        <p style={{ fontFamily: SANS, fontSize: 16, color: C.desc, lineHeight: 2.0, maxWidth: 600 }}>{desc}</p>
      </div>
    </div>
  );
}

function Project01Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="01" context="ERNIE Bot · Wicresoft" title={title} tags={tags} desc={desc} />;
}

// ── Slide 1: Users & Capabilities ────────────────────────────────────────
function Project01SlideUsers({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.40, delay: isActive ? d : 0, ease: E },
  });
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
  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 88% 88%, rgba(178,149,126,0.11) 0%, transparent 55%)" }} />
      <div style={{ position: "absolute", left: 0, top: "22%", bottom: "22%",
        width: 3, background: C.accent, borderRadius: "0 2px 2px 0" }} />
      <div style={{ position: "absolute", right: -110, bottom: -110,
        width: 360, height: 360, borderRadius: "50%",
        border: `1px solid ${C.border}`, opacity: 0.6, pointerEvents: "none" }} />
      <div style={{
        flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", paddingTop: PAD_Y, paddingBottom: PAD_Y,
        position: "relative", zIndex: 1,
      }}>
        <PageTitle title="用户与能力" motionProps={rv(BD)} />
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <motion.div {...rv(BD + 0.06)} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <div style={{ width: 3, height: 13, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
              <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>用户群体</p>
            </motion.div>
            <div style={{ height: 1, background: C.border }} />
            {users.map((u, i) => (
              <motion.div key={u.name} {...rv(BD + 0.12 + i * 0.06)} style={{
                display: "flex", alignItems: "center", gap: 20, padding: "20px 0",
                borderBottom: i < users.length - 1 ? `1px solid ${C.border}` : undefined,
              }}>
                <img src={u.img} alt={u.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{u.name}</div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.6, marginTop: 4 }}>{u.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <motion.div {...rv(BD + 0.08)} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <div style={{ width: 3, height: 13, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
              <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>核心能力</p>
            </motion.div>
            <div style={{ height: 1, background: C.border }} />
            {caps.map((cap, i) => (
              <motion.div key={cap.name} {...rv(BD + 0.14 + i * 0.06)} style={{
                padding: "20px 0",
                borderBottom: i < caps.length - 1 ? `1px solid ${C.border}` : undefined,
              }}>
                <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{cap.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.7 }}>{cap.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: Business Flow ────────────────────────────────────────────────
function Project01Slide2({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const phases = [
    { code: "01", label: "项目创建与规则准备" },
    { code: "02", label: "人员匹配与入场" },
    { code: "03", label: "标注执行" },
    { code: "04", label: "质检与审核" },
    { code: "05", label: "结算与闭环" },
  ];
  type Cell = { items?: string[]; highlight?: string; idle?: string };
  const rows: Array<{ role: string; en: string; cells: Cell[] }> = [
    { role: "管理者", en: "Manager", cells: [
      { items: ["创建项目与任务目标", "配置标注题型", "定义质量标准"] },
      { items: ["筛选合适标注人员", "发布或定向分发任务"] },
      { items: ["查看整体进度", "关注异常与产能"] },
      { items: ["抽检或终审结果", "控制整体质量水平"] },
      { items: ["确认完成情况", "放行结算流程"] },
    ]},
    { role: "标注员", en: "Annotator", cells: [
      { idle: "未入场，等待项目匹配" },
      { items: ["浏览任务信息", "报名并完成认证", "获得角色与权限"] },
      { items: ["领取标注任务", "进行标注任务"] },
      { items: ["提交前自查结果", "根据提示修正问题"] },
      { items: ["查看收益明细", "完成任务闭环"] },
    ]},
    { role: "系统支持", en: "System", cells: [
      { items: ["题型配置"], highlight: "AI 预检规则配置" },
      { items: ["储备人才库", "人才能力校验，资质审核", "角色权限分配"] },
      { items: ["图片标注 / 划词"], highlight: "多轮对话智能体标注" },
      { highlight: "AI 预检浮窗" },
      { items: ["任务与费用汇总", "结算与账单展示"] },
    ]},
  ];
  const LINE = "rgba(46,46,46,0.08)";
  const CELL_BG = "rgba(255,255,255,0.30)";
  const DIM_W = 84;
  const ROW_ACCENTS = [C.accent, "#9BA8B0", "#B8A898"];
  const ROW_LABEL_BG = ["rgba(178,149,126,0.10)", "rgba(155,168,176,0.08)", "rgba(184,168,152,0.07)"];

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, paddingBottom: PAD_Y,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 15% 95%, rgba(178,149,126,0.09) 0%, transparent 50%)" }} />
      <div style={{ paddingTop: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="业务全流程概览" motionProps={{
          initial: { opacity: 0, y: 18 },
          animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
          transition: { duration: 0.40, delay: isActive ? BD : 0, ease: E },
        }} />
      </div>
      <motion.div
        style={{
          flex: 1, minHeight: 0,
          display: "grid",
          gridTemplateColumns: `${DIM_W}px repeat(5, 1fr)`,
          gridTemplateRows: "auto 1fr 1fr 1fr",
          border: `1px solid ${LINE}`, borderRadius: 14,
          overflow: "hidden", background: CELL_BG, position: "relative", zIndex: 1,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.40, delay: isActive ? BD + 0.08 : 0, ease: E }}
      >
        <div style={{
          borderRight: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`,
          background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.desc, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>阶段</span>
        </div>
        {phases.map((p, pi) => (
          <div key={pi} style={{
            padding: "10px 14px", borderLeft: `1px solid ${LINE}`,
            borderBottom: `1px solid ${LINE}`, borderTop: `2.5px solid ${C.accent}`,
            background: "rgba(255,255,255,0.50)",
          }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 5 }}>PHASE {p.code}</p>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.35 }}>{p.label}</p>
          </div>
        ))}
        {rows.map((row, ri) => (
          <React.Fragment key={ri}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              background: ROW_LABEL_BG[ri], borderRight: `1px solid ${LINE}`,
              borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined,
              borderLeft: `3px solid ${ROW_ACCENTS[ri]}`, padding: "10px 6px", gap: 4,
            }}>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.04em", textAlign: "center" }}>{row.role}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, letterSpacing: "0.06em", textAlign: "center" }}>{row.en}</p>
            </div>
            {row.cells.map((cell, ci) => (
              <div key={ci} style={{
                padding: "14px 14px", borderLeft: `1px solid ${LINE}`,
                borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined,
                background: ri % 2 === 0 ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.16)",
                display: "flex", flexDirection: "column",
                justifyContent: cell.idle ? "center" : "flex-start",
              }}>
                {cell.idle && (
                  <p style={{ fontFamily: SANS, fontSize: 12.5, color: "#C4BAB0", fontStyle: "italic", textAlign: "center", lineHeight: 1.5 }}>{cell.idle}</p>
                )}
                {cell.items?.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: ii < (cell.items!.length - 1) || cell.highlight ? 9 : 0 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(178,149,126,0.5)", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.desc, lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
                {cell.highlight && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(178,149,126,0.5)", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.desc, lineHeight: 1.55 }}>{cell.highlight}</p>
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

// ── Slide 3: Core User Journey ────────────────────────────────────────────
function Project01Slide3({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activePhase, setActivePhase] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  useEffect(() => { if (isActive) setActivePhase(0); }, [isActive]);
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 18 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.40, delay: isActive ? d : 0, ease: E },
  });
  const phases = [
    { en: "PHASE 01", zh: "项目创建与规则准备" }, { en: "PHASE 02", zh: "人员匹配与入场" },
    { en: "PHASE 03", zh: "标注执行" }, { en: "PHASE 04", zh: "质检与审核" },
    { en: "PHASE 05", zh: "结算与闭环" },
  ];
  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 85% 15%, rgba(178,149,126,0.08) 0%, transparent 50%)" }} />
      <div style={{
        flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", paddingTop: PAD_Y, paddingBottom: PAD_Y,
        position: "relative", zIndex: 1,
      }}>
        <PageTitle title="核心用户旅程界面" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 64, alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {phases.map((phase, i) => {
              const active = activePhase === i;
              return (
                <motion.div key={i} {...rv(BD + 0.08 + i * 0.05)}
                  onMouseEnter={() => setActivePhase(i)}
                  style={{ cursor: "pointer", padding: "18px 0", display: "flex", alignItems: "center", gap: 16,
                    borderBottom: i < phases.length - 1 ? `1px solid ${C.border}` : undefined }}>
                  <div style={{ width: 3, height: active ? 38 : 0, background: C.accent, borderRadius: 2, flexShrink: 0, transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)" }} />
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: active ? C.accent : C.desc, letterSpacing: "0.13em", textTransform: "uppercase" as const, marginBottom: 4, transition: "color 0.25s ease" }}>{phase.en}</p>
                    <p style={{ fontFamily: SANS, fontSize: 20, fontWeight: active ? 600 : 400, color: active ? C.text : "#999", lineHeight: 1.3, transition: "color 0.25s ease" }}>{phase.zh}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...rv(BD + 0.40)} style={{
            flex: 1, maxHeight: "100%", aspectRatio: "16/10",
            borderRadius: 28, overflow: "hidden", position: "relative",
            backgroundColor: PHASE_PATTERN_COLOR, backgroundImage: PHASE_PATTERN_IMAGE, backgroundSize: "600px 600px",
          }}>
            {PHASE_IMGS.map((src, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: activePhase === i ? 1 : 0, transition: "none" }}>
                {!loadedImgs.has(i) && <div className="phase-skeleton" />}
                <img src={src} alt={`Phase ${i + 1}`}
                  onLoad={() => setLoadedImgs(prev => new Set([...prev, i]))}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block",
                    opacity: loadedImgs.has(i) ? 1 : 0, transition: "opacity 0.3s ease" }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 4: 关键方案展示 ─────────────────────────────────────────────────
function Project01SlideKeyMethod({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 24 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.50, delay: isActive ? d : 0, ease: E },
  });
  const steps = [
    { num: "01", label: "需求分析" }, { num: "02", label: "竞品分析" },
    { num: "03", label: "多方案对比" }, { num: "04", label: "交互文档" },
  ];
  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 70% at 50% 40%, rgba(178,149,126,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.35, pointerEvents: "none", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.25, pointerEvents: "none", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
        <motion.h1 {...rv(BD)} style={{
          fontFamily: SERIF, fontSize: 60, fontWeight: 700, color: C.text,
          lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.02em",
        }}>关键方案展示</motion.h1>
        <motion.p {...rv(BD + 0.08)} style={{
          fontFamily: SANS, fontSize: 20, color: C.desc, lineHeight: 1.8,
          maxWidth: 680, margin: "0 auto 60px",
        }}>以「指令修改」功能交互设计为例，完整呈现从需求到落地的全流程设计过程。</motion.p>
        <motion.div {...rv(BD + 0.16)} style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: 148, flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${C.accent}`, backgroundColor: `${C.accent}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: C.accent }}>{step.num}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.10em", textTransform: "uppercase" as const, margin: 0 }}>Step {step.num}</p>
                  <p style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.text, lineHeight: 1.3, margin: 0 }}>{step.label}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: 1.5, flex: 1, minWidth: 20, background: `linear-gradient(90deg, ${C.accent}55, ${C.accent}25)`, marginTop: 24, flexShrink: 1 }} />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Slide 5: 「指令修改」功能交互设计_1 ─────────────────────────────────
function Project01Slide5({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.40, delay: d, ease: E },
  });
  useEffect(() => { if (!isActive) setIframeLoaded(false); }, [isActive]);
  const iframeSrc = `${import.meta.env.BASE_URL}details/annotation-platform/slide-interaction.html`;

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 70% 60% at 75% 40%, rgba(220,210,195,0.45) 0%, transparent 70%)` }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />
        <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 20 }}>
          <CompactStepBar activeStep={1} />
        </motion.div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 56, alignItems: "stretch" }}>
          <motion.div {...rv(BD + 0.12)} style={{
            width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 22, justifyContent: "center",
          }}>
            <div>
              <SectionLabel>需求背景</SectionLabel>
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: C.desc, margin: 0 }}>
                智能体组件通过多轮对话生成推荐思考内容，标注人员需要频繁重新请求模型并人工调整结果，筛选可用内容用于后续模型训练。
              </p>
            </div>
            <div style={{ height: 1, backgroundColor: C.border }} />
            <div>
              <SectionLabel>核心痛点</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "结果不可控", b: "每次全量重生成随机性高，标注人员需要反复试错才能获得可用结果。" },
                  { t: "优质内容丢失", b: "重新生成会覆盖已有优质内容，缺乏对局部修改与结果保留的支持。" },
                ].map(item => (
                  <div key={item.t}>
                    <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 5px" }}>{item.t}</p>
                    <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.desc, margin: 0 }}>{item.b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, backgroundColor: C.border }} />
            <div>
              <SectionLabel>设计策略</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "指令修改", b: "通过明确修改指令意图，收敛生成范围。" },
                  { t: "断点后重写", b: "仅重构不满意部分，降低试错与返工。" },
                ].map(item => (
                  <div key={item.t}>
                    <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 5px" }}>{item.t}</p>
                    <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.desc, margin: 0 }}>{item.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: iframe with skeleton */}
          <motion.div {...rv(BD + 0.22)} style={{
            flex: 1, height: "100%", borderRadius: 32, overflow: "hidden",
            position: "relative", backgroundColor: "#f0ece6",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}>
            {/* Skeleton overlay */}
            {!iframeLoaded && (
              <div style={{ position: "absolute", inset: 0, zIndex: 2, borderRadius: 32, overflow: "hidden" }}>
                <div className="iframe-skeleton-bg" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, #EAE4DC 25%, #F2EDE7 50%, #EAE4DC 75%)",
                  backgroundSize: "800px 100%",
                }}>
                  <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", gap: 18 }}>
                    <div className="skel-bar" style={{ height: 20, width: "55%", borderRadius: 8, background: "rgba(178,149,126,0.18)" }} />
                    <div className="skel-bar" style={{ height: 14, width: "80%", borderRadius: 6, background: "rgba(178,149,126,0.10)" }} />
                    <div className="skel-bar" style={{ height: 14, width: "65%", borderRadius: 6, background: "rgba(178,149,126,0.10)" }} />
                    <div style={{ height: 32 }} />
                    <div style={{ display: "flex", gap: 20 }}>
                      <div className="skel-bar" style={{ height: 80, flex: 1, borderRadius: 12, background: "rgba(178,149,126,0.12)" }} />
                      <div className="skel-bar" style={{ height: 80, flex: 1, borderRadius: 12, background: "rgba(178,149,126,0.08)" }} />
                    </div>
                    <div style={{ height: 16 }} />
                    <div className="skel-bar" style={{ height: 14, width: "90%", borderRadius: 6, background: "rgba(178,149,126,0.10)" }} />
                    <div className="skel-bar" style={{ height: 14, width: "70%", borderRadius: 6, background: "rgba(178,149,126,0.07)" }} />
                    <div className="skel-bar" style={{ height: 14, width: "85%", borderRadius: 6, background: "rgba(178,149,126,0.07)" }} />
                    <div style={{ height: 24 }} />
                    <div style={{ display: "flex", gap: 12 }}>
                      <div className="skel-bar" style={{ height: 36, width: 120, borderRadius: 100, background: "rgba(178,149,126,0.14)" }} />
                      <div className="skel-bar" style={{ height: 36, width: 100, borderRadius: 100, background: "rgba(178,149,126,0.09)" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isActive && (
              <iframe
                src={iframeSrc}
                title="指令修改体验演示"
                onLoad={() => setIframeLoaded(true)}
                style={{ width: "100%", height: "100%", border: "none", display: "block", position: "relative", zIndex: 1 }}
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: 「指令修改」功能交互设计_2 ─────────────────────────────────
function Project01Slide6({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.40, delay: d, ease: E },
  });
  const problems = [
    { title: "强打断感，上下文易丢失", body: "弹窗会完全遮挡主界面，打断用户对原文上下文的参考。即便弹窗内显示原文，也因区域有限、失去原有排版，需要用户重新构建语境，加重认知负担。" },
    { title: "操作路径长，任务流失率高", body: "原本可在页面内直接完成的轻量操作，变成多步弹窗流程。对需要快速反馈、反复修改的 AI 场景，层级过多会降低操作意愿，不符合「直接操作」原则，体验笨重不流畅。" },
    { title: "视觉冗余，空间利用率低", body: "弹窗重复展示原文占用大量空间，长文本还易出现双层滚动条，操作时看不到主界面实时变化，像「盲改」，降低用户对结果的可控感。" },
  ];
  const pmProto = `${import.meta.env.BASE_URL}details/annotation-platform/pm_proto.png`;

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 60% 20%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />

      {/* space-between: title floats to top, step bar + body group at bottom */}
      <div style={{
        flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        paddingTop: PAD_Y, paddingBottom: PAD_Y,
        justifyContent: "space-between", position: "relative", zIndex: 1,
      }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />

        {/* Lower group: step bar tight above body */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 12 }}>
            <CompactStepBar activeStep={2} />
          </motion.div>
          <motion.div {...rv(BD + 0.12)} style={{ display: "flex", gap: 48, alignItems: "center" }}>
            {/* Left: PM prototype */}
            <div style={{ width: "44%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}>
                <img src={pmProto} alt="产品原型" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, textAlign: "center" as const, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>产品原型</p>
            </div>
            {/* Right: analysis */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <p style={{
                fontFamily: SANS, fontSize: 15, color: C.desc, lineHeight: 1.8,
                margin: "0 0 24px", borderLeft: `3px solid ${C.accent}`, paddingLeft: 14,
                paddingTop: 8, paddingBottom: 8, backgroundColor: `${C.accent}08`, borderRadius: "0 6px 6px 0",
              }}>
                针对 PM 提供的「弹窗式指令修改」方案，从认知负荷、操作流失率及空间效率三个维度进行分析，存在以下主要问题：
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {problems.map((problem, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    paddingBottom: i < 2 ? 22 : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 6px", lineHeight: 1.3 }}>{problem.title}</p>
                      <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.9, margin: 0 }}>{problem.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: 「指令修改」功能交互设计_3 竞品分析 ─────────────────────────
function Project01Slide7({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activeTab, setActiveTab] = useState(0);
  const rv = (d: number) => ({
    initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.40, delay: d, ease: E },
  });
  useEffect(() => { if (isActive) setActiveTab(0); }, [isActive]);

  const tabs = [
    { label: "豆包文档AI改写方案" },
    { label: "ChatGPT AI改写方案" },
  ];

  type ProCon = { title: string; body: string };
  const content: Array<{ pros: ProCon[]; cons: ProCon[] }> = [
    {
      pros: [
        { title: "交互极简，认知负担低", body: "原位编辑遵循所见即所得，输入与预览都在原文位置，无需在弹窗与文档间切换，思路更连贯。" },
        { title: "差异对比清晰，决策更高效", body: "以高亮、删除线或分栏展示改写差异，直观透明，提升对 AI 内容的信任，缩短审核时间。" },
      ],
      cons: [
        { title: "信息密集，易视觉混乱", body: "多处 AI 建议同时出现时，卡片与色块过多，破坏文档排版，干扰长文创作与整体结构把控。" },
        { title: "侧边栏挤占空间，体验不稳定", body: "侧边栏会压缩正文区域，小屏或多窗口场景下正文易跳动，还可能与评论、目录等侧边功能冲突。" },
      ],
    },
    {
      pros: [
        { title: "交互高效，保护创作心流", body: "指令框直接集成在重新生成浮层，操作路径极短，无需切换菜单，步骤少、体验流畅。" },
        { title: "界面低侵入，更清爽", body: "采用轻量下拉浮层，仅占用少量空间，对原文布局影响小，契合极简设计风格。" },
      ],
      cons: [
        { title: "无直观差异对比", body: "直接覆盖替换，无高亮对比，难以快速看清修改细节，专业写作核对效率低。" },
        { title: "复杂指令承载能力弱", body: "下拉输入框空间小，仅适合简短指令，无法满足复杂格式、多规则的重度编辑需求。" },
      ],
    },
  ];

  const cur = content[activeTab];

  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X,
      boxSizing: "border-box", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 75% 60% at 55% 30%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />

      {/* same space-between layout as slide 6 */}
      <div style={{
        flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
        paddingTop: PAD_Y, paddingBottom: PAD_Y,
        justifyContent: "space-between", position: "relative", zIndex: 1,
      }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />

        {/* Lower group: step bar tight above body */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
          <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 16 }}>
            <CompactStepBar activeStep={2} />
          </motion.div>

          <motion.div {...rv(BD + 0.10)} style={{ flex: 1, minHeight: 0, display: "flex", gap: 56, alignItems: "stretch" }}>
            {/* Left: tabs + image */}
            <div style={{ width: "44%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Capsule tabs — same style as lang toggle */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", background: "#EDE8E0", borderRadius: 100, padding: 3, gap: 2 }}>
                  {tabs.map((tab, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveTab(i)}
                      style={{
                        padding: "6px 16px", borderRadius: 100,
                        fontSize: 13, fontWeight: 600, fontFamily: SANS,
                        letterSpacing: "0.03em", cursor: "pointer",
                        transition: "background 0.22s, color 0.22s, box-shadow 0.22s",
                        background: activeTab === i ? "#FFFFFF" : "transparent",
                        color: activeTab === i ? C.text : "#999",
                        boxShadow: activeTab === i ? "0 1px 6px rgba(46,46,46,0.10)" : "none",
                        userSelect: "none" as const,
                        whiteSpace: "nowrap" as const,
                      }}
                    >{tab.label}</div>
                  ))}
                </div>
              </div>

              {/* Image container */}
              <div style={{
                flex: 1, minHeight: 0,
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${C.border}`,
                boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
                backgroundColor: "#F5F2ED",
                position: "relative",
              }}>
                {COMP_IMGS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={tabs[i].label}
                    style={{
                      position: "absolute", inset: 0, width: "100%", height: "100%",
                      objectFit: "contain", display: "block",
                      opacity: activeTab === i ? 1 : 0,
                      transition: "opacity 0.28s ease",
                    }}
                  />
                ))}
                {/* Placeholder if images missing */}
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#C4BAB0", fontFamily: SANS, fontSize: 12, pointerEvents: "none",
                  opacity: 0.6,
                }}>
                  <span style={{ fontStyle: "italic" }}>competitive analysis_{activeTab + 1}.png</span>
                </div>
              </div>
            </div>

            {/* Right: pros / cons */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
              {/* Pros */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 13, background: "#7BAA8B", borderRadius: 2, flexShrink: 0 }} />
                  <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#7BAA8B", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>优点</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {cur.pros.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7BAA8B", marginTop: 7, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 4px", lineHeight: 1.3 }}>{item.title}</p>
                        <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.desc, lineHeight: 1.85, margin: 0 }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: C.border }} />

              {/* Cons */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 13, background: "#BF7E7E", borderRadius: 2, flexShrink: 0 }} />
                  <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#BF7E7E", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>缺点</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {cur.cons.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#BF7E7E", marginTop: 7, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 4px", lineHeight: 1.3 }}>{item.title}</p>
                        <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.desc, lineHeight: 1.85, margin: 0 }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Other project covers ───────────────────────────────────────────────────
function Project02Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="02" context="Huawei · Enterprise IT" title={title} tags={tags} desc={desc} />;
}
function Project03Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="03" context="Mercedes-Benz Financial Services" title={title} tags={tags} desc={desc} />;
}
function Vibe0Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V1" context="Luxshare Precision · North America" title={title} tags={tags} desc={desc} />;
}
function Vibe1Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V2" context="Personal Project · This Site" title={title} tags={tags} desc={desc} />;
}
function Vibe2Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="V3" context="Google AI Studio · Gemini" title={title} tags={tags} desc={desc} />;
}
function DefaultSlide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="—" context="" title={title} tags={tags} desc={desc} />;
}

// ── Page indicator ─────────────────────────────────────────────────────────
function PageIndicator({ total, current, textColor, labels, onGoTo }: {
  total: number; current: number; textColor: string; labels?: string[]; onGoTo: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuBg = "rgba(250,248,245,0.96)";
  return (
    <div style={{ position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 400 }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
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
        opacity: open ? 1 : 0, transition: "opacity 0.28s ease, transform 0.28s ease",
        pointerEvents: open ? "auto" : "none",
        background: menuBg, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16, padding: "22px 28px", display: "flex", flexDirection: "column", gap: 18,
        boxShadow: "0 24px 60px rgba(46,46,46,0.18), 0 8px 20px rgba(46,46,46,0.10)",
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div key={i} initial="initial" whileHover="hover" onClick={() => onGoTo(i)}
            style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              fontFamily: SANS, fontSize: 15, fontWeight: current === i ? 700 : 400,
              color: current === i ? C.accent : C.text, lineHeight: 1.5,
              minWidth: 148, whiteSpace: "nowrap",
            }}>
            <div style={{ width: 14, height: 14, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <motion.div variants={{ initial: { x: "-100%", opacity: 0 }, hover: { x: 0, opacity: 1 } }} transition={{ duration: 0.25, ease: "easeOut" }} style={{ display: "flex", alignItems: "center", color: C.accent }}>
                <ArrowRight size={11} strokeWidth={2.5} />
              </motion.div>
            </div>
            <motion.span variants={{ initial: { x: -10 }, hover: { x: 0, color: C.accent } }} transition={{ duration: 0.25, ease: "easeOut" }}>
              {String(i + 1).padStart(2, "0")}{labels?.[i] ? `  ${labels[i]}` : ""}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Page exports ──────────────────────────────────────────────────────────
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
    ? ["项目背景", "用户与能力", "业务全流程概览", "核心用户旅程界面", "关键方案展示",
       "「指令修改」功能交互设计_1", "「指令修改」功能交互设计_2", "「指令修改」功能交互设计_3"]
    : undefined;

  const commonProps = { title: item.title, tags: item.tags, desc: item.desc };
  const slide0 = params.num === "01" ? <Project01Slide0 {...commonProps} />
    : params.num === "02" ? <Project02Slide0 {...commonProps} />
    : params.num === "03" ? <Project03Slide0 {...commonProps} />
    : <DefaultSlide0 {...commonProps} />;

  return (
    <DetailLayout
      isZh={isZh} navigate={navigate}
      sectionLabel={isZh ? "项目案例" : "Projects"}
      navSubtitle={item.title}
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slideLabels={slideLabels}
      slide0={slide0}
      slide1={params.num === "01" ? <Project01SlideUsers /> : undefined}
      slide2={params.num === "01" ? <Project01Slide2 /> : undefined}
      slide3={params.num === "01" ? <Project01Slide3 /> : undefined}
      slide4={params.num === "01" ? <Project01SlideKeyMethod /> : undefined}
      slide5={params.num === "01" ? <Project01Slide5 /> : undefined}
      slide6={params.num === "01" ? <Project01Slide6 /> : undefined}
      slide7={params.num === "01" ? <Project01Slide7 /> : undefined}
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
  const item = data.find(p => p.id === params.id);
  const seqIndex = DETAIL_SEQUENCE.findIndex(s => s.kind === "vibe" && s.id === params.id);
  const prevItem = seqIndex > 0 ? DETAIL_SEQUENCE[seqIndex - 1] : null;
  const nextItem = seqIndex < DETAIL_SEQUENCE.length - 1 ? DETAIL_SEQUENCE[seqIndex + 1] : null;
  if (!item) return <NotFound navigate={navigate} />;

  const slide0 = params.id === "0" ? <Vibe0Slide0 title={item.title} tags={item.tags} desc={item.desc} />
    : params.id === "1" ? <Vibe1Slide0 title={item.title} tags={item.tags} desc={item.desc} />
    : params.id === "2" ? <Vibe2Slide0 title={item.title} tags={item.tags} desc={item.desc} />
    : <DefaultSlide0 title={item.title} tags={item.tags} desc={item.desc} />;

  return (
    <DetailLayout
      isZh={isZh} navigate={navigate}
      sectionLabel={isZh ? "设计随想" : "Vibes"}
      navSubtitle={item.title}
      prevPath={prevItem ? seqPath(prevItem) : null}
      nextPath={nextItem ? seqPath(nextItem) : null}
      slide0={slide0}
      titleForReset={item.title}
    />
  );
}

// ── DetailLayout ──────────────────────────────────────────────────────────
function DetailLayout({
  isZh, navigate, sectionLabel, navSubtitle = "", prevPath, nextPath, slideLabels,
  slide0, slide1, slide2, slide3, slide4, slide5, slide6, slide7, titleForReset,
}: {
  isZh: boolean; navigate: (to: string) => void;
  sectionLabel: string; navSubtitle?: string;
  prevPath: string | null; nextPath: string | null;
  slideLabels?: string[];
  slide0: React.ReactNode; slide1?: React.ReactNode; slide2?: React.ReactNode;
  slide3?: React.ReactNode; slide4?: React.ReactNode; slide5?: React.ReactNode;
  slide6?: React.ReactNode; slide7?: React.ReactNode; titleForReset: string;
}) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const busyRef    = useRef(false);

  const slideNodes = [slide0, slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const totalSlides = slideNodes.filter(Boolean).length;

  const goTo = (index: number) => {
    if (busyRef.current) return;
    if (index < 0 || index >= totalSlides) return;
    busyRef.current = true;
    currentRef.current = index;
    setCurrent(index);
    setTimeout(() => { busyRef.current = false; }, DURATION + 80);
  };

  useEffect(() => { currentRef.current = 0; setCurrent(0); busyRef.current = false; }, [titleForReset]);
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  // Wheel: discard events while busy
  useEffect(() => {
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (busyRef.current) { accum = 0; return; }
      accum += e.deltaY;
      if (accum > 60)       { accum = 0; goTo(currentRef.current + 1); }
      else if (accum < -60) { accum = 0; goTo(currentRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      if (busyRef.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (diff > 50)       goTo(currentRef.current + 1);
      else if (diff < -50) goTo(currentRef.current - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goTo(currentRef.current + 1);
      if (e.key === "ArrowUp"   || e.key === "PageUp")   goTo(currentRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  const textColor = SLIDES[Math.min(current, SLIDES.length - 1)].text;
  const navBg = "rgba(252,251,248,0.96)";

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
          0%   { background-position: -800px 0; }
          100% { background-position:  800px 0; }
        }
        .phase-skeleton {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #E8E2D9 25%, #F0EBE4 50%, #E8E2D9 75%);
          background-size: 1200px 100%; border-radius: 32px;
          animation: skeleton-shimmer 1.4s infinite linear;
        }
        .iframe-skeleton-bg {
          animation: skeleton-shimmer 1.6s infinite linear;
        }
        .skel-bar {
          animation: skeleton-shimmer 1.6s infinite linear;
          background-size: 800px 100% !important;
        }
      `}</style>

      {/* Navbar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center",
        paddingLeft: PAD_X, paddingRight: PAD_X, paddingTop: 14, paddingBottom: 14,
        background: navBg, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.border}`, transition: `background ${DURATION}ms ease`,
      }}>
        <button className="back-btn" style={{ color: textColor }} onClick={() => navigate("/")}>
          <ArrowLeft size={15} />{isZh ? "返回主页" : "Back to Home"}
        </button>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
          <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: textColor, letterSpacing: "0.02em", transition: `color ${DURATION}ms ease` }}>
            {sectionLabel}
            {current > 0 && navSubtitle && (
              <span style={{ fontWeight: 400, opacity: 0.60 }}> / {navSubtitle}</span>
            )}
          </span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="nav-btn" disabled={!prevPath} style={{ color: textColor, border: `1px solid ${textColor}40` }} onClick={() => prevPath && navigate(prevPath)}>
            <ChevronLeft size={14} />{isZh ? "上一个" : "Prev"}
          </button>
          <button className="nav-btn" disabled={!nextPath} style={{ color: textColor, border: `1px solid ${textColor}40` }} onClick={() => nextPath && navigate(nextPath)}>
            {isZh ? "下一个" : "Next"}<ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Indicator */}
      <PageIndicator total={totalSlides} current={current} textColor={textColor} labels={slideLabels} onGoTo={goTo} />

      {/* Slides */}
      {SLIDES.slice(0, totalSlides).map((slide, i) => (
        <div key={i} style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: slide.bg,
          transform: `translateY(${i <= current ? 0 : 100}vh)`,
          transition: `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          zIndex: i + 1,
          display: "flex", alignItems: "center", justifyContent: "flex-start",
        }}>
          {i === 0 && slide0}
          {i === 1 && slide1 && React.cloneElement(slide1 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 1 })}
          {i === 2 && slide2 && React.cloneElement(slide2 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 2 })}
          {i === 3 && slide3 && React.cloneElement(slide3 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 3 })}
          {i === 4 && slide4 && React.cloneElement(slide4 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 4 })}
          {i === 5 && slide5 && React.cloneElement(slide5 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 5 })}
          {i === 6 && slide6 && React.cloneElement(slide6 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 6 })}
          {i === 7 && slide7 && React.cloneElement(slide7 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 7 })}
        </div>
      ))}
    </>
  );
}
