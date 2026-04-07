import React, { useState, useEffect, useRef } from "react";
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
const SLIDES = Array(11).fill(SLIDE_BG);

const BASE = import.meta.env.BASE_URL;

// ── Helpers ───────────────────────────────────────────────────────────────
function ProjTag({ children }: { children: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
      padding: "4px 10px", borderRadius: 100,
      background: "rgba(178,149,126,0.12)", color: "#96614A", display: "inline-block",
    }}>{children}</span>
  );
}

function SectionLabel({ children, color = C.accent }: { children: string; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
      <div style={{ width: 3, height: 11, background: color, borderRadius: 2, flexShrink: 0 }} />
      <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase" as const, color, margin: 0, fontWeight: 700 }}>{children}</p>
    </div>
  );
}

function PageTitle({ title, motionProps }: { title: string; motionProps: object }) {
  return (
    <motion.div style={{ flexShrink: 0, display: "flex", flexDirection: "column", width: "100%" }} {...motionProps}>
      <h2 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 16 }}>{title}</h2>
      <div style={{ width: "100%", height: 1, background: C.accent, marginBottom: 32 }} />
    </motion.div>
  );
}

function CompactStepBar({ activeStep = 1 }: { activeStep?: number }) {
  const steps = [
    { num: "01", label: "需求分析" }, { num: "02", label: "竞品分析" },
    { num: "03", label: "多方案对比" }, { num: "04", label: "交互文档" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {steps.map((step, i) => {
        const active = i + 1 === activeStep;
        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? C.accent : "transparent", border: `1.5px solid ${active ? C.accent : "#C8C2BB"}`, boxShadow: active ? `0 0 0 3px ${C.accent}22` : "none" }} />
              <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.09em", color: active ? C.accent : "#B0A89F" }}>Step {step.num}</span>
              <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? C.text : "#B0A89F" }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 36, height: 1, flexShrink: 0, background: "linear-gradient(90deg, #E1DAD1, #D0C9C0)", margin: "0 10px" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Shared image box — supports optional skeleton-loading state
function ImgBox({ src, alt, ratio = "2094/1309", style, loaded = true, onLoad }: {
  src: string; alt: string; ratio?: string; style?: React.CSSProperties;
  loaded?: boolean; onLoad?: () => void;
}) {
  return (
    <div style={{ width: "100%", aspectRatio: ratio, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", backgroundColor: "#F5F2ED", position: "relative", ...style }}>
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg,#EAE4DC 25%,#F2EDE7 50%,#EAE4DC 75%)", backgroundSize: "800px 100%", animation: "skeleton-shimmer 1.5s infinite linear", borderRadius: 0 }} />
      )}
      <img src={src} alt={alt} onLoad={onLoad} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.45s ease" }} />
    </div>
  );
}

// Capsule tab bar (matching lang toggle style)
function CapsuleTabs({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", background: "#EDE8E0", borderRadius: 100, padding: 3, gap: 2 }}>
      {tabs.map((label, i) => (
        <div key={i} onClick={() => onChange(i)} style={{
          padding: "6px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600, fontFamily: SANS,
          letterSpacing: "0.03em", cursor: "pointer",
          transition: "background 0.22s, color 0.22s, box-shadow 0.22s",
          background: active === i ? "#FFFFFF" : "transparent",
          color: active === i ? C.text : "#999",
          boxShadow: active === i ? "0 1px 6px rgba(46,46,46,0.12)" : "none",
          userSelect: "none" as const, whiteSpace: "nowrap" as const,
        }}>{label}</div>
      ))}
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

const USER_IMGS   = [1,2,3].map(n => `${BASE}details/annotation-platform/user0${n}.png`);
const PHASE_IMGS  = [1,2,3,4,5].map(n => `${BASE}details/annotation-platform/phase_${n}.png`);
const COMP_IMGS   = [1,2].map(n => `${BASE}details/annotation-platform/competitive%20analysis_${n}.png`);
const SOL_IMGS    = [1,2,3,4].map(n => `${BASE}details/annotation-platform/solution_${n}.png`);

// ── Cover slide ───────────────────────────────────────────────────────────
function BaseSlide0({ num, context, title, tags, desc }: { num: string; context: string; title: string; tags: string[]; desc: string }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "35%", left: 66, fontFamily: SERIF, fontSize: "clamp(120px,18vw,220px)", fontWeight: 700, color: C.text, opacity: 0.030, lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 0 }}>{num}</div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1, maxWidth: 780 }}>
        <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.16em", textTransform: "uppercase" as const, marginBottom: 22 }}>{context}</p>
        <div style={{ width: 32, height: 1.5, background: C.accent, marginBottom: 32 }} />
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(40px,5.4vw,72px)", fontWeight: 700, color: C.text, lineHeight: 1.08, marginBottom: 32 }}>{title}</h1>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 40 }}>{tags.map(t => <ProjTag key={t}>{t}</ProjTag>)}</div>
        <p style={{ fontFamily: SANS, fontSize: 16, color: C.desc, lineHeight: 2.0, maxWidth: 600 }}>{desc}</p>
      </div>
    </div>
  );
}
function Project01Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="01" context="项目案例" title={title} tags={tags} desc={desc} />; }
function Project03Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="03" context="Mercedes-Benz Financial Services" title={title} tags={tags} desc={desc} />; }
function Vibe0Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="V1" context="Luxshare Precision · North America" title={title} tags={tags} desc={desc} />; }
function Vibe1Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="V2" context="Personal Project · This Site" title={title} tags={tags} desc={desc} />; }
function Vibe2Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="V3" context="Google AI Studio · Gemini" title={title} tags={tags} desc={desc} />; }
function DefaultSlide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) { return <BaseSlide0 num="—" context="" title={title} tags={tags} desc={desc} />; }

// ── Slide 1: Users ────────────────────────────────────────────────────────
function Project01SlideUsers({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }, transition: { duration: 0.40, delay: isActive ? d : 0, ease: E } });
  const users = [
    { img: USER_IMGS[0], name: "管理人员", role: "配置任务、规则与人员体系" },
    { img: USER_IMGS[1], name: "标注人员", role: "完成具体数据标注任务" },
    { img: USER_IMGS[2], name: "质检/审核人员", role: "对标注结果进行多级质量把控" },
  ];
  const caps = [
    { name: "多模态标注能力", note: "覆盖文本、多模态、智能体等复杂题型" },
    { name: "完整质量闭环",   note: "标注-质检-审核-返修-数据入库" },
    { name: "规模化人力调度", note: "支持场内+垂类兼职+专家人员协同作业" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 88% 88%, rgba(178,149,126,0.11) 0%, transparent 55%)" }} />
      <div style={{ position: "absolute", left: 0, top: "22%", bottom: "22%", width: 3, background: C.accent, borderRadius: "0 2px 2px 0" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        <div style={{ paddingTop: PAD_Y }}><PageTitle title="标注平台背景介绍" motionProps={rv(BD)} /></div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: PAD_Y }}>
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <motion.div {...rv(BD + 0.06)} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <div style={{ width: 3, height: 13, background: C.accent, borderRadius: 2 }} />
              <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>用户群体</p>
            </motion.div>
            <div style={{ height: 1, background: C.border }} />
            {users.map((u, i) => (
              <motion.div key={u.name} {...rv(BD + 0.12 + i * 0.06)} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 0", borderBottom: i < users.length - 1 ? `1px solid ${C.border}` : undefined }}>
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
              <div style={{ width: 3, height: 13, background: C.accent, borderRadius: 2 }} />
              <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>核心能力</p>
            </motion.div>
            <div style={{ height: 1, background: C.border }} />
            {caps.map((cap, i) => (
              <motion.div key={cap.name} {...rv(BD + 0.14 + i * 0.06)} style={{ padding: "20px 0", borderBottom: i < caps.length - 1 ? `1px solid ${C.border}` : undefined }}>
                <div style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{cap.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.7 }}>{cap.note}</div>
              </motion.div>
            ))}
          </div>
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
    { code: "01", label: "项目创建与规则准备" }, { code: "02", label: "人员匹配与入场" },
    { code: "03", label: "标注执行" }, { code: "04", label: "质检与审核" },
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
  const ROW_ACCENTS = [C.accent, "#9BA8B0", "#B8A898"];
  const ROW_LABEL_BG = ["rgba(178,149,126,0.10)", "rgba(155,168,176,0.08)", "rgba(184,168,152,0.07)"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, paddingBottom: PAD_Y, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 95%, rgba(178,149,126,0.09) 0%, transparent 50%)" }} />
      <div style={{ paddingTop: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="业务全流程概览" motionProps={{ initial: { opacity: 0, y: 18 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }, transition: { duration: 0.40, delay: isActive ? BD : 0, ease: E } }} />
      </div>
      <motion.div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: `84px repeat(5, 1fr)`, gridTemplateRows: "auto 1fr 1fr 1fr", border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.30)", position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.40, delay: isActive ? BD + 0.08 : 0, ease: E }}>
        <div style={{ borderRight: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.desc, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>阶段</span>
        </div>
        {phases.map((p, pi) => (
          <div key={pi} style={{ padding: "10px 14px", borderLeft: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, borderTop: `2.5px solid ${C.accent}`, background: "rgba(255,255,255,0.50)" }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 5 }}>PHASE {p.code}</p>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: C.text, lineHeight: 1.35 }}>{p.label}</p>
          </div>
        ))}
        {rows.map((row, ri) => (
          <React.Fragment key={ri}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: ROW_LABEL_BG[ri], borderRight: `1px solid ${LINE}`, borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined, borderLeft: `3px solid ${ROW_ACCENTS[ri]}`, padding: "10px 6px", gap: 4 }}>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.04em", textAlign: "center" }}>{row.role}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, letterSpacing: "0.06em", textAlign: "center" }}>{row.en}</p>
            </div>
            {row.cells.map((cell, ci) => (
              <div key={ci} style={{ padding: "14px 14px", borderLeft: `1px solid ${LINE}`, borderBottom: ri < rows.length - 1 ? `1px solid ${LINE}` : undefined, background: ri % 2 === 0 ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", justifyContent: cell.idle ? "center" : "flex-start" }}>
                {cell.idle && <p style={{ fontFamily: SANS, fontSize: 12.5, color: "#C4BAB0", fontStyle: "italic", textAlign: "center", lineHeight: 1.5 }}>{cell.idle}</p>}
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

// ── Slide 3: Journey ──────────────────────────────────────────────────────
function Project01Slide3({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activePhase, setActivePhase] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  useEffect(() => { if (isActive) setActivePhase(0); }, [isActive]);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }, transition: { duration: 0.40, delay: isActive ? d : 0, ease: E } });
  const phases = [
    { en: "PHASE 01", zh: "项目创建与规则准备" }, { en: "PHASE 02", zh: "人员匹配与入场" },
    { en: "PHASE 03", zh: "标注执行" }, { en: "PHASE 04", zh: "质检与审核" },
    { en: "PHASE 05", zh: "结算与闭环" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 85% 15%, rgba(178,149,126,0.08) 0%, transparent 50%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="核心用户旅程界面" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 64, alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {phases.map((phase, i) => {
              const active = activePhase === i;
              return (
                <motion.div key={i} {...rv(BD + 0.08 + i * 0.05)} onMouseEnter={() => setActivePhase(i)}
                  style={{ cursor: "pointer", padding: "18px 0", display: "flex", alignItems: "center", gap: 16, borderBottom: i < phases.length - 1 ? `1px solid ${C.border}` : undefined }}>
                  <div style={{ width: 3, height: active ? 38 : 0, background: C.accent, borderRadius: 2, flexShrink: 0, transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)" }} />
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: active ? C.accent : C.desc, letterSpacing: "0.13em", textTransform: "uppercase" as const, marginBottom: 4, transition: "color 0.25s" }}>{phase.en}</p>
                    <p style={{ fontFamily: SANS, fontSize: 20, fontWeight: active ? 600 : 400, color: active ? C.text : "#999", lineHeight: 1.3, transition: "color 0.25s" }}>{phase.zh}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...rv(BD + 0.40)} style={{ flex: 1, maxHeight: "100%", aspectRatio: "16/10", borderRadius: 28, overflow: "hidden", position: "relative", backgroundColor: PHASE_PATTERN_COLOR, backgroundImage: PHASE_PATTERN_IMAGE, backgroundSize: "600px 600px" }}>
            {PHASE_IMGS.map((src, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: activePhase === i ? 1 : 0, transition: "none" }}>
                {!loadedImgs.has(i) && <div className="phase-skeleton" />}
                <img src={src} alt={`Phase ${i + 1}`} onLoad={() => setLoadedImgs(prev => new Set([...prev, i]))}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loadedImgs.has(i) ? 1 : 0, transition: "opacity 0.3s" }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 4: Key Method ───────────────────────────────────────────────────
function Project01SlideKeyMethod({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }, transition: { duration: 0.50, delay: isActive ? d : 0, ease: E } });
  const steps = [{ num: "01", label: "需求分析" }, { num: "02", label: "竞品分析" }, { num: "03", label: "多方案对比" }, { num: "04", label: "交互文档" }];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 40%, rgba(178,149,126,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.35, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.25, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
        <motion.h1 {...rv(BD)} style={{ fontFamily: SERIF, fontSize: 60, fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.02em" }}>关键方案展示</motion.h1>
        <motion.p {...rv(BD + 0.08)} style={{ fontFamily: SANS, fontSize: 20, color: C.desc, lineHeight: 1.8, maxWidth: 540, margin: "0 auto 60px" }}>以「指令修改」功能交互设计为例，完整呈现从需求到落地的全流程设计过程。</motion.p>
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
              {i < steps.length - 1 && <div style={{ height: 1.5, flex: 1, minWidth: 20, background: `linear-gradient(90deg, ${C.accent}55, ${C.accent}25)`, marginTop: 24, flexShrink: 1 }} />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Slide 5: Interaction Design_1 ─────────────────────────────────────────
function Project01Slide5({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.40, delay: d, ease: E } });
  useEffect(() => { if (!isActive) setIframeLoaded(false); }, [isActive]);
  const iframeSrc = `${import.meta.env.BASE_URL}details/annotation-platform/slide-interaction.html`;
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 70% 60% at 75% 40%, rgba(220,210,195,0.45) 0%, transparent 70%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />
        <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 20 }}><CompactStepBar activeStep={1} /></motion.div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 56, alignItems: "stretch" }}>
          <motion.div {...rv(BD + 0.12)} style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div>
              <SectionLabel>需求背景</SectionLabel>
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: C.desc, margin: 0 }}>标注人员在标注过程中需要频繁重新请求模型并人工调整结果，筛选可用内容用于后续模型训练。</p>
            </div>
            <div style={{ height: 1, backgroundColor: C.border }} />
            <div>
              <SectionLabel>核心痛点</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[{ t: "结果不可控", b: "每次全量重生成随机性高，标注人员需要反复试错才能获得可用结果。" }, { t: "优质内容丢失", b: "重新生成会覆盖已有优质内容，缺乏对局部修改与结果保留的支持。" }].map(item => (
                  <div key={item.t}><p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 5px" }}>{item.t}</p><p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.desc, margin: 0 }}>{item.b}</p></div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, backgroundColor: C.border }} />
            <div>
              <SectionLabel>设计策略</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[{ t: "指令修改", b: "通过明确修改指令意图，收敛生成范围。" }, { t: "断点后重写", b: "仅重构不满意部分，降低试错与返工。" }].map(item => (
                  <div key={item.t}><p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 5px" }}>{item.t}</p><p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.75, color: C.desc, margin: 0 }}>{item.b}</p></div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div {...rv(BD + 0.22)} style={{ flex: 1, height: "100%", borderRadius: 32, overflow: "hidden", position: "relative", backgroundColor: "#f0ece6", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            {!iframeLoaded && (
              <div style={{ position: "absolute", inset: 0, zIndex: 2, borderRadius: 32, overflow: "hidden" }}>
                <div className="iframe-skeleton-bg" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #EAE4DC 25%, #F2EDE7 50%, #EAE4DC 75%)", backgroundSize: "800px 100%" }}>
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
                    <div style={{ height: 24 }} />
                    <div style={{ display: "flex", gap: 12 }}>
                      <div className="skel-bar" style={{ height: 36, width: 120, borderRadius: 100, background: "rgba(178,149,126,0.14)" }} />
                      <div className="skel-bar" style={{ height: 36, width: 100, borderRadius: 100, background: "rgba(178,149,126,0.09)" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isActive && <iframe src={iframeSrc} title="指令修改体验演示" onLoad={() => setIframeLoaded(true)} style={{ width: "100%", height: "100%", border: "none", display: "block", position: "relative", zIndex: 1 }} sandbox="allow-scripts allow-same-origin" />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: Interaction Design_2 ─────────────────────────────────────────
function Project01Slide6({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.40, delay: d, ease: E } });
  const problems = [
    { title: "强打断感，上下文易丢失", body: "弹窗会完全遮挡主界面，打断用户对原文上下文的参考。即便弹窗内显示原文，也因区域有限、失去原有排版，需要用户重新构建语境，加重认知负担。" },
    { title: "操作路径长，任务流失率高", body: "原本可在页面内直接完成的轻量操作，变成多步弹窗流程。对需要快速反馈、反复修改的 AI 场景，层级过多会降低操作意愿，不符合「直接操作」原则，体验笨重不流畅。" },
    { title: "视觉冗余，空间利用率低", body: "弹窗重复展示原文占用大量空间，长文本还易出现双层滚动条，操作时看不到主界面实时变化，像「盲改」，降低用户对结果的可控感。" },
  ];
  const pmProto = `${import.meta.env.BASE_URL}details/annotation-platform/pm_proto.png`;
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 80% 55% at 60% 20%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 24 }}><CompactStepBar activeStep={1} /></motion.div>
          <motion.div {...rv(BD + 0.12)} style={{ display: "flex", gap: 48, alignItems: "center" }}>
            <div style={{ width: "44%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}>
                <img src={pmProto} alt="产品原型" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, textAlign: "center" as const, margin: 0, letterSpacing: "0.04em", fontStyle: "italic" }}>产品原型</p>
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: SANS, fontSize: 15, color: C.desc, lineHeight: 1.8, margin: "0 0 24px", borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, paddingTop: 8, paddingBottom: 8, backgroundColor: `${C.accent}08`, borderRadius: "0 6px 6px 0" }}>
                针对 PM 提供的「弹窗式指令修改」方案，从认知负荷、操作流失率及空间效率三个维度进行分析，存在以下主要问题：
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {problems.map((problem, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < 2 ? 22 : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
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

// ── Slide 7: Interaction Design_3 Competitive Analysis ────────────────────
function Project01Slide7({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activeTab, setActiveTab] = useState(0);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.40, delay: d, ease: E } });
  useEffect(() => { if (isActive) setActiveTab(0); }, [isActive]);
  const tabs = ["豆包文档AI改写方案", "ChatGPT AI改写方案"];
  type ProCon = { title: string; body: string };
  const content: Array<{ pros: ProCon[]; cons: ProCon[] }> = [
    { pros: [{ title: "交互极简，认知负担低", body: "原位编辑遵循所见即所得，输入与预览都在原文位置，无需在弹窗与文档间切换，思路更连贯。" }, { title: "差异对比清晰，决策更高效", body: "以高亮、删除线或分栏展示改写差异，直观透明，提升对 AI 内容的信任，缩短审核时间。" }], cons: [{ title: "信息密集，易视觉混乱", body: "多处 AI 建议同时出现时，卡片与色块过多，破坏文档排版，干扰长文创作与整体结构把控。" }, { title: "侧边栏挤占空间，体验不稳定", body: "侧边栏会压缩正文区域，小屏或多窗口场景下正文易跳动，还可能与评论、目录等侧边功能冲突。" }] },
    { pros: [{ title: "交互高效，保护创作心流", body: "指令框直接集成在重新生成浮层，操作路径极短，无需切换菜单，步骤少、体验流畅。" }, { title: "界面低侵入，更清爽", body: "采用轻量下拉浮层，仅占用少量空间，对原文布局影响小，契合极简设计风格。" }], cons: [{ title: "无直观差异对比", body: "直接覆盖替换，无高亮对比，难以快速看清修改细节，专业写作核对效率低。" }, { title: "复杂指令承载能力弱", body: "下拉输入框空间小，仅适合简短指令，无法满足复杂格式、多规则的重度编辑需求。" }] },
  ];
  const cur = content[activeTab];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 75% 60% at 55% 30%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 24 }}><CompactStepBar activeStep={2} /></motion.div>
          <motion.div {...rv(BD + 0.10)} style={{ display: "flex", gap: 40, alignItems: "center" }}>
            <div style={{ width: "54%", flexShrink: 0 }}>
              <div style={{ width: "100%", aspectRatio: "2094/1309", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.07)", backgroundColor: "#F5F2ED", position: "relative" }}>
                <div style={{ position: "absolute", top: 24, left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 100, padding: 3, gap: 2, boxShadow: "0 2px 14px rgba(46,46,46,0.12)", pointerEvents: "auto" }}>
                    {tabs.map((label, i) => (
                      <div key={i} onClick={() => setActiveTab(i)} style={{ padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600, fontFamily: SANS, letterSpacing: "0.03em", cursor: "pointer", transition: "background 0.22s, color 0.22s, box-shadow 0.22s", background: activeTab === i ? "#FFFFFF" : "transparent", color: activeTab === i ? C.text : "#999", boxShadow: activeTab === i ? "0 1px 6px rgba(46,46,46,0.12)" : "none", userSelect: "none" as const, whiteSpace: "nowrap" as const }}>{label}</div>
                    ))}
                  </div>
                </div>
                {COMP_IMGS.map((src, i) => (
                  <img key={i} src={src} alt={tabs[i]} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: activeTab === i ? 1 : 0, transition: "opacity 0.28s" }} />
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 13, background: "#7BAA8B", borderRadius: 2 }} />
                  <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#7BAA8B", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>优点</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {cur.pros.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7BAA8B", marginTop: 7, flexShrink: 0 }} />
                      <div><p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 4px", lineHeight: 1.3 }}>{item.title}</p><p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.85, margin: 0 }}>{item.body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: C.border }} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 13, background: "#BF7E7E", borderRadius: 2 }} />
                  <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#BF7E7E", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>缺点</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {cur.cons.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#BF7E7E", marginTop: 7, flexShrink: 0 }} />
                      <div><p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 4px", lineHeight: 1.3 }}>{item.title}</p><p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.85, margin: 0 }}>{item.body}</p></div>
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

// ── Slide 8: Interaction Design_4 Multi-solution ──────────────────────────
function Project01Slide8({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activeTab, setActiveTab] = useState(0);
  // Track which solution images have loaded (index 0–3 matching SOL_IMGS)
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  const rv = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.40, delay: d, ease: E } });
  useEffect(() => { if (isActive) { setActiveTab(0); setLoadedImgs(new Set()); } }, [isActive]);
  const tabs = ["理想方案", "废弃方案", "最终方案"];
  const markLoaded = (i: number) => setLoadedImgs(prev => new Set([...prev, i]));

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 70% 55% at 45% 35%, rgba(178,149,126,0.06) 0%, transparent 65%)" }} />

      {/* Inner layout: relative for absolute-positioned tab bar */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />

        {/* Vertically-centered group: step bar + content */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 128 }}>
          <motion.div {...rv(BD + 0.06)} style={{ flexShrink: 0, marginBottom: 24 }}><CompactStepBar activeStep={3} /></motion.div>

          <motion.div {...rv(BD + 0.10)} style={{ overflow: "hidden" }}>

            {/* ── Tab 1: 理想方案 ── */}
            {activeTab === 0 && (
              <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
                <div style={{ width: "46%", flexShrink: 0 }}>
                  <ImgBox src={SOL_IMGS[0]} alt="理想方案" loaded={loadedImgs.has(0)} onLoad={() => markLoaded(0)} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* 设计思路 — card style */}
                  <div style={{ borderRadius: 12, padding: "16px 20px", background: "rgba(178,149,126,0.07)", border: `1px solid ${C.border}` }}>
                    <SectionLabel>设计思路</SectionLabel>
                    <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.8, color: C.desc, margin: "0 0 10px" }}>基于上下文的轻量化编辑交互，同时遵循操作原位化与视觉反馈即时化策略：</p>
                    {[{ t: "指令修改", b: "参考文档纠错/批注逻辑，触发入口锚定在目标文本末尾，关联清晰。" }, { t: "断点重写", b: "借鉴代码编辑器插入点概念，划词激活，满足续写需求。" }].map(item => (
                      <div key={item.t} style={{ display: "flex", gap: 9, marginBottom: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.75, margin: 0 }}><b style={{ color: C.text, fontWeight: 600 }}>{item.t}：</b>{item.b}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <SectionLabel color="#7BAA8B">优点</SectionLabel>
                    {[{ t: "原位触发", b: "Hover、划词触发操作，无需切换视线，维持创作心流。" }, { t: "状态可视化", b: "Hover高亮界定指令作用域，解决修改边界模糊的焦虑。" }, { t: "轻量化浮窗", b: "替代重度弹窗，集成输入与一键填充，压缩操作闭环。" }].map(item => (
                      <div key={item.t} style={{ display: "flex", gap: 9, marginBottom: 7 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7BAA8B", marginTop: 7, flexShrink: 0 }} />
                        <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.75, margin: 0 }}><b style={{ color: C.text, fontWeight: 600 }}>{item.t}：</b>{item.b}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 1, background: C.border }} />
                  <div>
                    <SectionLabel color="#BF7E7E">缺点</SectionLabel>
                    {[
                      { t: "技术实现成本高", b: "动态排版下 Hover 定位对性能要求高，需解决与现有划词菜单的事件冲突。" },
                      { t: "用户学习成本高", b: "隐式交互难发现，文本 / 代码密集场景中易造成视觉干扰。" },
                    ].map(item => (
                      <div key={item.t} style={{ display: "flex", gap: 9, marginBottom: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#BF7E7E", marginTop: 7, flexShrink: 0 }} />
                        <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.75, margin: 0 }}><b style={{ color: C.text, fontWeight: 600 }}>{item.t}：</b>{item.b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 2: 废弃方案 ── */}
            {activeTab === 1 && (
              <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                {[
                  { src: SOL_IMGS[1], title: "全屏操作方案", idx: 1 },
                  { src: SOL_IMGS[2], title: "侧边栏操作方案", idx: 2 },
                ].map(item => (
                  <div key={item.title} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                    <ImgBox src={item.src} alt={item.title} loaded={loadedImgs.has(item.idx)} onLoad={() => markLoaded(item.idx)} />
                    <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.text, textAlign: "center" as const, margin: 0, letterSpacing: "0.02em" }}>{item.title}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── Tab 3: 最终方案 ── */}
            {activeTab === 2 && (
              <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
                <div style={{ width: "46%", flexShrink: 0 }}>
                  <ImgBox src={SOL_IMGS[3]} alt="最终方案" loaded={loadedImgs.has(3)} onLoad={() => markLoaded(3)} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <SectionLabel>设计思路：基于动作触发的「渐进式交互」</SectionLabel>
                    <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.8, color: C.desc, margin: "0 0 10px" }}>核心是将修改任务拆解为"触发→声明意图→局部操作"三阶段：</p>
                    {[
                      { t: "原位体验佳", b: "用户始终处于文档视觉范围内，无上下文丢失；输入框和结果紧贴操作点，操作轻盈。" },
                      { t: "符合用户习惯", b: "修改Icon紧邻重生成按钮，贴合用户操作逻辑；下拉菜单、浮窗为通用交互，认知门槛低、发现性高。" },
                      { t: "技术实现友好", b: "固定入口触发，无需计算文本偏移，降低前端损耗。" },
                      { t: "控制感精准", b: "高亮选区明确指令范围，浮窗提示降低理解成本，\u201c所见即所得\u201d增强操作安全感。" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 9, marginBottom: 7 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.75, margin: 0 }}>
                          <b style={{ color: C.text, fontWeight: 700 }}>{item.t}：</b>{item.b}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Conclusion card — elevated hierarchy */}
                  <div style={{ borderRadius: 14, padding: "20px 24px", background: `linear-gradient(135deg, ${C.accent}16 0%, ${C.accent}08 100%)`, border: `1px solid ${C.accent}40`, borderLeft: `4px solid ${C.accent}`, boxShadow: `0 4px 20px ${C.accent}18` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ background: C.accent, borderRadius: 6, padding: "4px 12px" }}>
                        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#FFF", letterSpacing: "0.10em", textTransform: "uppercase" as const, margin: 0 }}>✓ 最终方案</p>
                      </div>
                      <div style={{ height: 1, flex: 1, background: `${C.accent}30` }} />
                    </div>
                    <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: C.text, lineHeight: 1.85, margin: 0 }}>结合竞品分析与多方案对比，方案二通过原位触发下拉菜单，平衡功能发现性与操作连贯性，以低成本实现"所见即所得"，精准解决场景切换诉求。</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom tabs — absolute, 60px from viewport bottom */}
        <motion.div {...rv(BD + 0.14)} style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <CapsuleTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </motion.div>
      </div>
    </div>
  );
}

// ── Pan/Zoom Viewer ───────────────────────────────────────────────────────
const INTER_IMGS = [1, 2].map(n => `${BASE}details/annotation-platform/interaction_doc_${n}.png`);
const IMG2_W = 9504, IMG2_H = 2672;

function PanZoomViewer({ loaded, onLoad, resetKey }: { loaded: boolean; onLoad: () => void; resetKey: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef({ x: 0, y: 0, scale: 1 });
  const [transform, _setT] = useState({ x: 0, y: 0, scale: 1 });
  const [dragging, setDragging] = useState(false);
  const initialScale = useRef(1);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastDist = useRef<number | null>(null);
  const lastTouchPos = useRef<{ x: number; y: number } | null>(null);

  const applyT = (t: { x: number; y: number; scale: number }) => {
    transformRef.current = t; _setT({ ...t });
  };
  const resetView = () => {
    if (!containerRef.current) return;
    const h = containerRef.current.getBoundingClientRect().height;
    const sc = Math.max(h / IMG2_H, 0.01);
    initialScale.current = sc;
    applyT({ x: 0, y: 0, scale: sc * 3 }); // default 300%
  };

  useEffect(() => {
    const raf = requestAnimationFrame(resetView);
    return () => cancelAnimationFrame(raf);
  }, [resetKey]); // eslint-disable-line

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); e.stopPropagation();
      const t = transformRef.current;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      const minSc = initialScale.current * 0.5, maxSc = initialScale.current * 10;
      const newSc = Math.max(minSc, Math.min(maxSc, t.scale * factor));
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const imgX = (cx - t.x) / t.scale, imgY = (cy - t.y) / t.scale;
      applyT({ x: cx - imgX * newSc, y: cy - imgY * newSc, scale: newSc });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []); // eslint-disable-line

  const onMD = (e: React.MouseEvent) => { isDragging.current = true; setDragging(true); lastPos.current = { x: e.clientX, y: e.clientY }; e.preventDefault(); };
  const onMM = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x, dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    const t = transformRef.current; applyT({ ...t, x: t.x + dx, y: t.y + dy });
  };
  const onMU = () => { isDragging.current = false; setDragging(false); };
  const onTS = (e: React.TouchEvent) => {
    if (e.touches.length === 1) { lastTouchPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; lastDist.current = null; }
    else if (e.touches.length === 2) lastDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
  };
  const onTM = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouchPos.current) {
      const dx = e.touches[0].clientX - lastTouchPos.current.x, dy = e.touches[0].clientY - lastTouchPos.current.y;
      lastTouchPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const t = transformRef.current; applyT({ ...t, x: t.x + dx, y: t.y + dy });
    } else if (e.touches.length === 2 && lastDist.current !== null) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const factor = dist / lastDist.current; lastDist.current = dist;
      const t = transformRef.current;
      applyT({ ...t, scale: Math.max(initialScale.current * 0.5, Math.min(initialScale.current * 10, t.scale * factor)) });
    }
  };
  const onTE = () => { lastTouchPos.current = null; lastDist.current = null; };
  const pct = initialScale.current > 0 ? Math.round((transform.scale / initialScale.current) * 100) : 100;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.09)", backgroundColor: "#EEEAE4", position: "relative", cursor: dragging ? "grabbing" : "grab", userSelect: "none", touchAction: "none" }}
        onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
      >
        {!loaded && (
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(90deg,#EAE4DC 25%,#F2EDE7 50%,#EAE4DC 75%)", backgroundSize: "800px 100%", animation: "skeleton-shimmer 1.5s infinite linear" }} />
        )}
        <img
          src={INTER_IMGS[1]} alt="交互文档节选" draggable={false} onLoad={onLoad}
          style={{ position: "absolute", left: 0, top: 0, width: IMG2_W, height: IMG2_H, transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`, transformOrigin: "0 0", display: "block", pointerEvents: "none", opacity: loaded ? 1 : 0, transition: dragging ? "none" : "opacity 0.45s ease" }}
        />
        {/* Hint removed — container is compact; controls overlay provides reset */}
      </div>
      <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 8, zIndex: 4 }}>
        <div style={{ background: "rgba(252,251,248,0.92)", backdropFilter: "blur(10px)", borderRadius: 100, padding: "4px 12px", border: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: C.text, margin: 0 }}>{pct}%</p>
        </div>
        <button onClick={resetView} style={{ background: "rgba(252,251,248,0.92)", backdropFilter: "blur(10px)", border: `1px solid ${C.border}`, borderRadius: 100, padding: "4px 12px", cursor: "pointer", fontFamily: SANS, fontSize: 11, fontWeight: 600, color: C.text }}>重置</button>
      </div>
    </div>
  );
}

// ── Slide 9: Interaction Design_5 ─────────────────────────────────────────
function Project01Slide9({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.30;
  const [activeTab, setActiveTab] = useState(0);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [pzResetKey, setPzResetKey] = useState(0);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.38, delay: d, ease: E } });

  useEffect(() => {
    INTER_IMGS.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  useEffect(() => {
    if (isActive) { setActiveTab(0); setLoaded1(false); setLoaded2(false); setPzResetKey(k => k + 1); }
  }, [isActive]);

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    if (i === 1) setPzResetKey(k => k + 1);
  };

  const tabs = ["全链路交互规范", "交互文档节选"];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 70% 55% at 55% 30%, rgba(178,149,126,0.06) 0%, transparent 65%)" }} />

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, paddingLeft: PAD_X, paddingRight: PAD_X }}>
        {/* Title */}
        <div style={{ paddingTop: PAD_Y }}>
          <PageTitle title="「指令修改」功能交互设计" motionProps={rv(BD)} />
        </div>

        {/* Step bar + image — vertically centered in remaining space */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: PAD_Y }}>
          <motion.div {...rv(BD + 0.05)} style={{ flexShrink: 0, marginBottom: 24 }}>
            <CompactStepBar activeStep={4} />
          </motion.div>

          {/* Image area — aspect-ratio sized, full available width */}
          <motion.div {...rv(BD + 0.09)} style={{ position: "relative" }}>
            {/* Tab 1: ratio 2.09:1 */}
            {activeTab === 0 && (
              <div style={{ width: "100%", aspectRatio: "209/100", position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.09)", backgroundColor: "#EEEAE4" }}>
                {!loaded1 && (
                  <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg,#EAE4DC 25%,#F2EDE7 50%,#EAE4DC 75%)", backgroundSize: "800px 100%", animation: "skeleton-shimmer 1.5s infinite linear" }} />
                )}
                <img
                  src={INTER_IMGS[0]} alt="全链路交互规范" onLoad={() => setLoaded1(true)}
                  style={{ width: "100%", height: "100%", objectFit: "fill", display: "block", opacity: loaded1 ? 1 : 0, transition: "opacity 0.45s ease" }}
                />
              </div>
            )}

            {/* Tab 2: ratio 3.56:1 */}
            {activeTab === 1 && (
              <div style={{ width: "100%", aspectRatio: "356/100", position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.09)", backgroundColor: "#EEEAE4" }}>
                <PanZoomViewer loaded={loaded2} onLoad={() => setLoaded2(true)} resetKey={pzResetKey} />
              </div>
            )}

            {/* Capsule tabs overlaid at bottom-center of whichever tab is active */}
            <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
              <div style={{ pointerEvents: "auto" }}>
                <CapsuleTabs tabs={tabs} active={activeTab} onChange={handleTabChange} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 10: Project Summary ──────────────────────────────────────────────
const SUMMARY_DATA = {
  top: {
    num: "20+", numDesc: "项需求功能与日常迭代",
    content: "围绕标注平台管理端、标注端及垂类兼职业务，累计参与 20+ 项功能与机制迭代，覆盖平台核心业务流程与高频使用场景，所有项目均按期交付并上线，稳定支撑业务日常运转。",
    tags: ["管理端", "标注端", "如期交付率：100%"],
  },
  cards: [
    {
      title: "10+ 核心业务流程的全链路交互覆盖",
      content: "围绕人员招募 → 考试授权 → 标注执行 → 质检审核 → 结算的完整链路，持续参与交互设计，保障复杂规则调整下流程可用性与体验一致性。",
      tags: ["全链路", "一致性", "流程完整"],
    },
    {
      title: "高频需求下的高效交付能力",
      content: "面对需求量大、并行项目多、节奏快的特点，持续承接常规优化与体验补强，单人支持多模块并行迭代，快速输出方案并配合研发落地，确保稳定按期交付。",
      tags: ["持续迭代", "高效", "稳定按期"],
    },
    {
      title: "多角色场景下的体验稳定性支撑",
      content: "在管理、标注、质检 / 审核等多角色协作场景中，通过统一交互逻辑与操作路径设计，减少理解成本与沟通成本，支撑平台在业务高频变更下的稳定运行。",
      tags: ["多角色", "流程提效", "体验提高"],
    },
  ],
};

function Project01Slide10({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.30;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.38, delay: d, ease: E } });
  const { top, cards } = SUMMARY_DATA;

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="AI数据标注平台项目总结" motionProps={rv(BD)} />

        {/* Main layout: vertically centered, 400px from viewport edge (340px extra within PAD_X=60), shifted up 60px */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, paddingBottom: 128, marginLeft: 340, marginRight: 340 }}>
          {/* Top overview card */}
          <motion.div {...rv(BD + 0.06)} style={{ border: `1px solid ${C.border}`, borderRadius: 16, background: "rgba(255,253,249,0.72)", backdropFilter: "blur(8px)", padding: "26px 32px", display: "flex", gap: 36, alignItems: "center" }}>
            {/* Number side */}
            <div style={{ flexShrink: 0, borderRight: `1px solid ${C.border}`, paddingRight: 36, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", minWidth: 160 }}>
              <p style={{ fontFamily: SERIF, fontSize: 72, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1 }}>{top.num}</p>
              <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, margin: "10px 0 0", lineHeight: 1.4 }}>{top.numDesc}</p>
            </div>
            {/* Content side */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontFamily: SANS, fontSize: 15, color: C.desc, lineHeight: 1.8, margin: 0 }}>{top.content}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                {top.tags.map((t, i) => t === "如期交付率：100%" ? (
                  <span key={i} style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: "#FFF", background: C.accent, border: "none", borderRadius: 100, padding: "5px 14px", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M2 6.5L4.8 9.5L10 3" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t}
                  </span>
                ) : (
                  <span key={i} style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: C.accent, background: `${C.accent}12`, border: `1px solid ${C.accent}30`, borderRadius: 100, padding: "4px 12px", letterSpacing: "0.04em" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom cards row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {cards.map((card, ci) => (
              <motion.div key={ci} {...rv(BD + 0.10 + ci * 0.05)} style={{ border: `1px solid ${C.border}`, borderRadius: 16, background: "rgba(255,253,249,0.72)", backdropFilter: "blur(8px)", padding: "22px 24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontFamily: SANS, fontSize: 17, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.4 }}>{card.title}</p>
                <p style={{ fontFamily: SANS, fontSize: 14, color: C.desc, lineHeight: 1.75, margin: 0, flex: 1 }}>{card.content}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginTop: 2 }}>
                  {card.tags.map((t, i) => (
                    <span key={i} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: C.accent, background: `${C.accent}12`, border: `1px solid ${C.accent}30`, borderRadius: 100, padding: "3px 10px", letterSpacing: "0.04em" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page indicator ────────────────────────────────────────────────────────
function PageIndicator({ total, current, textColor, labels, onGoTo }: {
  total: number; current: number; textColor: string; labels?: string[]; onGoTo: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuBg = "rgba(250,248,245,0.96)";
  return (
    // padding: 24 expands hover hit area; right: 4 keeps dots visually at 28px from viewport
    <div style={{ position: "fixed", right: 4, top: "50%", transform: "translateY(-50%)", zIndex: 400, padding: 24 }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: current === i ? textColor : "transparent", border: `1.5px solid ${current === i ? textColor : `${textColor}55`}`, transform: current === i ? "scale(1.4)" : "scale(1)", transition: "all 0.4s ease" }} />
        ))}
      </div>
      {/* Popup — right: 0 puts its right edge at viewport +4px, covering the dots */}
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
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: SANS, fontSize: 15, fontWeight: current === i ? 700 : 400, color: current === i ? C.accent : C.text, lineHeight: 1.5, minWidth: 148, whiteSpace: "nowrap" }}>
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

// ── Project02: 全球化企业设备管理平台 ─────────────────────────────────────
const P02_BASE = `${BASE}details/huawei-emm/`;
const PLATFORM_IMGS = [1,2,3,4,5].map(i => `${P02_BASE}platform_${i}.png`);
const SCENARIO_IMGS = [1,2,3].map(i => `${P02_BASE}scenarios_${i}.png`);

const P02_PERSONAS = [
  { name: "渠道商管理员",  avatar: 1, needs: ["掌握所服务的所有企业的情况", "便捷管理我的用户"] },
  { name: "企业管理员",    avatar: 2, needs: ["方便部署和管理企业设备", "方便管理企业用户", "遇到问题希望得到帮助"] },
  { name: "华为运营管理员", avatar: 3, needs: ["查看服务的渠道商情况", "查看企业、设备和用户情况", "减少工单数量"] },
  { name: "渠道商员工",    avatar: 4, needs: ["快速将设备录入系统", "掌握所服务的企业情况"] },
  { name: "企业员工",      avatar: 5, needs: ["正常使用企业设备", "遇到问题可以得到帮助"] },
  { name: "第三方 EMM 厂商", avatar: 6, needs: ["标准化的 API 接口"] },
];

const SIMPLE_FORMULA_COLS = ["WHO", "当用户在（什么情况下）", "他想要（什么行为）", "以便于他可以达成（什么目标）"];

function Project02Slide0({ title, tags, desc }: { title: string; tags: string[]; desc: string }) {
  return <BaseSlide0 num="02" context="项目案例" title={title} tags={tags} desc={desc} />;
}

// P02 Slide1 — Platform UI Showcase (mirrors Project01Slide3 hover pattern)
function Project02Slide1({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.35;
  const [activeItem, setActiveItem] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  useEffect(() => { if (isActive) setActiveItem(0); }, [isActive]);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }, transition: { duration: 0.40, delay: isActive ? d : 0, ease: E } });
  const platforms = ["行业解决方案官网", "渠道商控制台", "企业控制台", "EMM控制台", "设备扫码移动端"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 85% 15%, rgba(178,149,126,0.08) 0%, transparent 50%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="各平台核心界面展示" motionProps={rv(BD)} />
        <motion.div {...rv(BD + 0.06)} style={{ marginBottom: 22, padding: "11px 16px", background: `${C.accent}08`, border: `1px solid ${C.border}`, borderRadius: 10, flexShrink: 0 }}>
          <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.desc, lineHeight: 1.75, margin: 0 }}>
            作为项目中的 UX 设计师，参与完整平台设计工作；涉及的平台包括：行业解决方案官网、行业解决方案控制台、运营管理台、开发者联盟、设备扫码移动端
          </p>
        </motion.div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ width: 270, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {platforms.map((name, i) => {
              const active = activeItem === i;
              return (
                <motion.div key={i} {...rv(BD + 0.08 + i * 0.05)} onMouseEnter={() => setActiveItem(i)}
                  style={{ cursor: "pointer", padding: "15px 0", display: "flex", alignItems: "center", gap: 16, borderBottom: i < platforms.length - 1 ? `1px solid ${C.border}` : undefined }}>
                  <div style={{ width: 3, height: active ? 34 : 0, background: C.accent, borderRadius: 2, flexShrink: 0, transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)" }} />
                  <div>
                    <p style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: active ? C.accent : C.desc, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 3, transition: "color 0.25s" }}>PLATFORM {String(i + 1).padStart(2, "0")}</p>
                    <p style={{ fontFamily: SANS, fontSize: 18, fontWeight: active ? 600 : 400, color: active ? C.text : "#999", lineHeight: 1.3, transition: "color 0.25s" }}>{name}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...rv(BD + 0.40)} style={{ flex: 1, maxHeight: "100%", aspectRatio: "16/10", borderRadius: 24, overflow: "hidden", position: "relative", backgroundColor: PHASE_PATTERN_COLOR, backgroundImage: PHASE_PATTERN_IMAGE, backgroundSize: "600px 600px" }}>
            {PLATFORM_IMGS.map((src, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: activeItem === i ? 1 : 0, transition: "opacity 0.4s ease" }}>
                {!loadedImgs.has(i) && <div className="phase-skeleton" />}
                <img src={src} alt={platforms[i]} onLoad={() => setLoadedImgs(prev => new Set([...prev, i]))}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loadedImgs.has(i) ? 1 : 0, transition: "opacity 0.35s" }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// P02 Slide2 — User Personas
function Project02Slide2({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.30;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.38, delay: isActive ? d : 0, ease: E } });
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 70% 80%, rgba(178,149,126,0.08) 0%, transparent 55%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="用户画像" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 14 }}>
          {P02_PERSONAS.map((p, i) => (
            <motion.div key={i} {...rv(BD + 0.06 + i * 0.04)} style={{ display: "flex", gap: 14, alignItems: "flex-start", border: `1px solid ${C.border}`, borderRadius: 16, background: "rgba(255,253,249,0.80)", backdropFilter: "blur(8px)", padding: "16px 18px", overflow: "hidden" }}>
              <div style={{ width: 66, height: 88, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.border}`, backgroundColor: "#EAE4DB" }}>
                <img src={`${P02_BASE}avatar_${p.avatar}.png`} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: C.text, marginBottom: 9, lineHeight: 1.3 }}>{p.name}</p>
                {p.needs.map((need, ni) => (
                  <div key={ni} style={{ display: "flex", gap: 7, marginBottom: ni < p.needs.length - 1 ? 5 : 0, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, marginTop: 7, flexShrink: 0 }} />
                    <p style={{ fontFamily: SANS, fontSize: 12, color: C.desc, lineHeight: 1.65, margin: 0 }}>{need}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// P02 Slide3 — Design Method (场景化设计)
function SceneModelSVG() {
  const cx = 150, cy = 150, R = 88, NR = 27;
  const ac = C.accent, blue = "#5580B0";
  const nodeData = [
    { label: "WHO", sub: "用户", a: -90 }, { label: "When", sub: "时间", a: -30 },
    { label: "Where", sub: "地点", a: 30 },  { label: "What", sub: "事物", a: 90 },
    { label: "Needs", sub: "需求", a: 150 }, { label: "Act", sub: "行为", a: 210 },
  ];
  const nodes = nodeData.map(n => {
    const rad = n.a * Math.PI / 180;
    return { ...n, x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  });
  const arrows = nodes.map((from, i) => {
    const to = nodes[(i + 1) % 6];
    const dx = to.x - from.x, dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const gap = NR + 5;
    return { x1: from.x + (dx/len)*gap, y1: from.y + (dy/len)*gap, x2: to.x - (dx/len)*gap, y2: to.y - (dy/len)*gap };
  });
  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      <defs>
        <marker id="arrowHead02" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0,0.5 L0,6.5 L6,3.5 z" fill={ac} opacity="0.70" />
        </marker>
      </defs>
      {arrows.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={ac} strokeWidth="1.4" markerEnd="url(#arrowHead02)" opacity="0.55" />
      ))}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r={NR} fill={i === 0 ? blue : `${ac}14`} stroke={i === 0 ? blue : ac} strokeWidth="1.5" />
          <text x={node.x} y={node.y - 5} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontFamily="sans-serif" fontWeight="700" fill={i === 0 ? "white" : ac}>{node.label}</text>
          <text x={node.x} y={node.y + 9} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontFamily="sans-serif" fill={i === 0 ? "rgba(255,255,255,0.80)" : C.desc}>{node.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function Project02Slide3({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.32;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.40, delay: isActive ? d : 0, ease: E } });
  const formula6 = ["WHO", "在什么时间 (When)", "什么地点 (Where)", "察觉到什么事物 (What)", "产生什么需求 (Needs)", "通过什么行为 (Act) 满足需求"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 75% 55% at 30% 70%, rgba(178,149,126,0.07) 0%, transparent 60%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title="设计方法" motionProps={rv(BD)} />
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 60, alignItems: "center" }}>
          {/* Left: definition + formula */}
          <div style={{ flex: "0 0 56%", display: "flex", flexDirection: "column", gap: 24 }}>
            <motion.div {...rv(BD + 0.06)}>
              <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.16em", textTransform: "uppercase" as const, marginBottom: 6 }}>USER SCENARIO DESIGN</p>
              <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 14, lineHeight: 1.3 }}>场景化设计</p>
              <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.desc, lineHeight: 1.9 }}>
                场景化设计，就是把用户使用产品的典型场景进行提炼，并以<b style={{ color: C.text, fontWeight: 600 }}>场景公式</b>的形式清晰的描述出来，然后在产品设计中把<b style={{ color: C.text, fontWeight: 600 }}>用户场景具象化</b>，在特定的时机为用户提供所需的信息和自然交互，帮助用户自然而然达成目标的一种设计方式。
              </p>
            </motion.div>
            <motion.div {...rv(BD + 0.12)}>
              <SectionLabel>场景公式</SectionLabel>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", background: `${C.accent}0c` }}>
                  {formula6.map((col, i) => (
                    <div key={i} style={{ padding: "9px 10px", borderRight: i < 5 ? `1px solid ${C.border}` : undefined }}>
                      <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: C.accent, margin: 0, lineHeight: 1.5 }}>{col}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", borderTop: `1px solid ${C.border}`, minHeight: 32 }}>
                  {formula6.map((_, i) => <div key={i} style={{ borderRight: i < 5 ? `1px solid ${C.border}` : undefined }} />)}
                </div>
              </div>
            </motion.div>
          </div>
          {/* Right: circular model */}
          <motion.div {...rv(BD + 0.18)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <SceneModelSVG />
            <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, letterSpacing: "0.08em", textTransform: "uppercase" as const, textAlign: "center" as const }}>场景模型</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// P02 Slide4 — Key Solutions (special centered layout, no title bar)
function Project02Slide4({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.30;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }, transition: { duration: 0.50, delay: isActive ? d : 0, ease: E } });
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.30, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${C.border}`, opacity: 0.20, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 860 }}>
        <motion.h1 {...rv(BD)} style={{ fontFamily: SERIF, fontSize: 60, fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>关键方案展示</motion.h1>
        <motion.p {...rv(BD + 0.08)} style={{ fontFamily: SANS, fontSize: 22, color: C.desc, lineHeight: 1.8, maxWidth: 700, margin: "0 auto 48px" }}>
          以「行业解决方案控制台」三大场景为例，呈现场景化设计方法在实际项目中的完整应用流程。
        </motion.p>
        <motion.div {...rv(BD + 0.16)} style={{ textAlign: "left" as const }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", background: `${C.accent}0c` }}>
              {SIMPLE_FORMULA_COLS.map((col, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRight: i < 3 ? `1px solid ${C.border}` : undefined }}>
                  <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: C.accent, margin: 0 }}>{col}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", borderTop: `1px solid ${C.border}`, minHeight: 36 }}>
              {SIMPLE_FORMULA_COLS.map((_, i) => <div key={i} style={{ borderRight: i < 3 ? `1px solid ${C.border}` : undefined }} />)}
            </div>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 11, color: C.desc, textAlign: "center" as const, marginTop: 8, letterSpacing: "0.1em" }}>简略版场景公式</p>
        </motion.div>
      </div>
    </div>
  );
}

// P02 Slides 5–7: Scenario slides (shared layout)
interface ScenarioRow { who: string; when: string; what: string; goal: string; }
function ScenarioTable({ rows }: { rows: ScenarioRow[] }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr 1fr", background: `${C.accent}0c` }}>
        {SIMPLE_FORMULA_COLS.map((col, i) => (
          <div key={i} style={{ padding: "10px 14px", borderRight: i < 3 ? `1px solid ${C.border}` : undefined }}>
            <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: C.accent, margin: 0 }}>{col}</p>
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr 1fr", borderTop: `1px solid ${C.border}`, background: ri % 2 === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.30)" }}>
          <div style={{ padding: "12px 14px", borderRight: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: C.text, margin: 0, lineHeight: 1.75, whiteSpace: "pre-line" as const }}>{row.who}</p>
          </div>
          <div style={{ padding: "12px 14px", borderRight: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: SANS, fontSize: 13, color: C.desc, margin: 0, lineHeight: 1.75, whiteSpace: "pre-line" as const }}>{row.when}</p>
          </div>
          <div style={{ padding: "12px 14px", borderRight: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: SANS, fontSize: 13, color: C.desc, margin: 0, lineHeight: 1.75, whiteSpace: "pre-line" as const }}>{row.what}</p>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <p style={{ fontFamily: SANS, fontSize: 13, color: C.desc, margin: 0, lineHeight: 1.75, whiteSpace: "pre-line" as const }}>{row.goal}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScenarioSlide({ isActive, title, rows, imgSrc, imgAlt }: {
  isActive?: boolean; title: string; rows: ScenarioRow[]; imgSrc: string; imgAlt: string;
}) {
  const BD = 0.30;
  const [imgLoaded, setImgLoaded] = useState(false);
  const rv = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.38, delay: isActive ? d : 0, ease: E } });
  useEffect(() => { if (isActive) setImgLoaded(false); }, [isActive]);
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 55% at 60% 20%, rgba(178,149,126,0.07) 0%, transparent 65%)" }} />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", paddingTop: PAD_Y, paddingBottom: PAD_Y, position: "relative", zIndex: 1 }}>
        <PageTitle title={title} motionProps={rv(BD)} />
        <motion.div {...rv(BD + 0.07)} style={{ marginBottom: 20 }}>
          <ScenarioTable rows={rows} />
        </motion.div>
        <motion.div {...rv(BD + 0.14)} style={{ flex: 1, minHeight: 0, position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 4px 28px rgba(0,0,0,0.07)", backgroundColor: "#EAE4DB" }}>
          {!imgLoaded && <div className="phase-skeleton" />}
          <img src={imgSrc} alt={imgAlt} onLoad={() => setImgLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s ease" }} />
        </motion.div>
      </div>
    </div>
  );
}

function Project02Slide5({ isActive = false }: { isActive?: boolean }) {
  return <ScenarioSlide isActive={isActive} title="场景 1：渠道商绑定客户并上传设备" imgSrc={SCENARIO_IMGS[0]} imgAlt="场景1配图" rows={[{
    who: "渠道商管理员\n\n渠道商员工",
    when: "获得新的企业采购订单时",
    what: "绑定企业客户\n\n为企业上传已采购的设备信息",
    goal: "方便企业利用该平台进行设备管理",
  }]} />;
}
function Project02Slide6({ isActive = false }: { isActive?: boolean }) {
  return <ScenarioSlide isActive={isActive} title="场景 2：企业员工初始配置" imgSrc={SCENARIO_IMGS[1]} imgAlt="场景2配图" rows={[{
    who: "企业管理员",
    when: "首次登陆 HEM 管理台时",
    what: "将企业员工（设备使用者）录入平台",
    goal: "完成对企业使用者及设备的管理",
  }]} />;
}
function Project02Slide7({ isActive = false }: { isActive?: boolean }) {
  return <ScenarioSlide isActive={isActive} title="场景 3：三方管控" imgSrc={SCENARIO_IMGS[2]} imgAlt="场景3配图" rows={[{
    who: "企业管理员",
    when: "想要管控企业员工的设备时",
    what: "通过三方 EMM（企业移动管理）厂商\n来管控员工设备",
    goal: "有更多灵活的设备管控方式",
  }]} />;
}

// P02 Slide8 — Closing quote
function Project02Slide8({ isActive = false }: { isActive?: boolean }) {
  const BD = 0.30;
  const rv = (d: number) => ({ initial: { opacity: 0, y: 22 }, animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }, transition: { duration: 0.55, delay: isActive ? d : 0, ease: E } });
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: NAVBAR_H, paddingLeft: PAD_X, paddingRight: PAD_X, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(178,149,126,0.09) 0%, transparent 65%)" }} />
      <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, background: C.accent, borderRadius: "0 2px 2px 0", opacity: 0.45 }} />
      <motion.div {...rv(BD)} style={{ position: "relative", zIndex: 1, maxWidth: 780, textAlign: "center" as const }}>
        <div style={{ width: 28, height: 1.5, background: C.accent, margin: "0 auto 28px" }} />
        <p style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 600, color: C.text, lineHeight: 1.85, letterSpacing: "0.005em" }}>
          通过场景化的设计，可以促进用户理解（减少用户认知成本），提升效率（降低用户操作成本），引起用户共鸣（情感化设计），帮助用户和产品更快更好的达成目标。
        </p>
        <div style={{ width: 28, height: 1.5, background: C.accent, margin: "28px auto 0" }} />
      </motion.div>
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
       "「指令修改」设计_1", "「指令修改」设计_2", "「指令修改」设计_3", "「指令修改」设计_4",
       "「指令修改」设计_5", "项目总结"]
    : params.num === "02"
    ? ["项目背景", "各平台核心界面展示", "用户画像", "设计方法", "关键方案展示",
       "场景一", "场景二", "场景三", "设计总结"]
    : undefined;

  const commonProps = { title: item.title, tags: item.tags, desc: item.desc };
  const slide0 = params.num === "01" ? <Project01Slide0 {...commonProps} />
    : params.num === "02" ? <Project02Slide0 {...commonProps} />
    : params.num === "03" ? <Project03Slide0 {...commonProps} />
    : <DefaultSlide0 {...commonProps} />;

  return (
    <DetailLayout
      isZh={isZh} navigate={navigate}
      sectionLabel={isZh ? "项目案例" : "Projects"} navSubtitle={item.title}
      prevPath={prevItem ? seqPath(prevItem) : null} nextPath={nextItem ? seqPath(nextItem) : null}
      slideLabels={slideLabels} slide0={slide0}
      slide1={params.num === "01" ? <Project01SlideUsers /> : params.num === "02" ? <Project02Slide1 /> : undefined}
      slide2={params.num === "01" ? <Project01Slide2 /> : params.num === "02" ? <Project02Slide2 /> : undefined}
      slide3={params.num === "01" ? <Project01Slide3 /> : params.num === "02" ? <Project02Slide3 /> : undefined}
      slide4={params.num === "01" ? <Project01SlideKeyMethod /> : params.num === "02" ? <Project02Slide4 /> : undefined}
      slide5={params.num === "01" ? <Project01Slide5 /> : params.num === "02" ? <Project02Slide5 /> : undefined}
      slide6={params.num === "01" ? <Project01Slide6 /> : params.num === "02" ? <Project02Slide6 /> : undefined}
      slide7={params.num === "01" ? <Project01Slide7 /> : params.num === "02" ? <Project02Slide7 /> : undefined}
      slide8={params.num === "01" ? <Project01Slide8 /> : params.num === "02" ? <Project02Slide8 /> : undefined}
      slide9={params.num === "01" ? <Project01Slide9 /> : undefined}
      slide10={params.num === "01" ? <Project01Slide10 /> : undefined}
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
      sectionLabel={isZh ? "设计随想" : "Vibes"} navSubtitle={item.title}
      prevPath={prevItem ? seqPath(prevItem) : null} nextPath={nextItem ? seqPath(nextItem) : null}
      slide0={slide0} titleForReset={item.title}
    />
  );
}

// ── DetailLayout ──────────────────────────────────────────────────────────
function DetailLayout({
  isZh, navigate, sectionLabel, navSubtitle = "", prevPath, nextPath, slideLabels,
  slide0, slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, titleForReset,
}: {
  isZh: boolean; navigate: (to: string) => void;
  sectionLabel: string; navSubtitle?: string;
  prevPath: string | null; nextPath: string | null; slideLabels?: string[];
  slide0: React.ReactNode; slide1?: React.ReactNode; slide2?: React.ReactNode;
  slide3?: React.ReactNode; slide4?: React.ReactNode; slide5?: React.ReactNode;
  slide6?: React.ReactNode; slide7?: React.ReactNode; slide8?: React.ReactNode;
  slide9?: React.ReactNode; slide10?: React.ReactNode;
  titleForReset: string;
}) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const busyRef    = useRef(false);
  const slideNodes = [slide0, slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10];
  const totalSlides = slideNodes.filter(Boolean).length;

  const goTo = (index: number) => {
    if (busyRef.current) return;
    if (index < 0 || index >= totalSlides) return;
    busyRef.current = true; currentRef.current = index; setCurrent(index);
    setTimeout(() => { busyRef.current = false; }, DURATION + 80);
  };
  const lastNavTimeRef = useRef(0);
  const COOLDOWN_MS = DURATION + 700;

  useEffect(() => { currentRef.current = 0; setCurrent(0); busyRef.current = false; }, [titleForReset]);
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  // Wheel — timestamp cooldown
  useEffect(() => {
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNavTimeRef.current < COOLDOWN_MS) { accum = 0; return; }
      accum += e.deltaY;
      if (accum > 80)       { accum = 0; lastNavTimeRef.current = now; goTo(currentRef.current + 1); }
      else if (accum < -80) { accum = 0; lastNavTimeRef.current = now; goTo(currentRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // postMessage from iframe (e.g. slide-interaction.html scrolled to bottom → advance)
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type !== 'slideScrolledToBottom') return;
      const now = Date.now();
      if (now - lastNavTimeRef.current < COOLDOWN_MS) return;
      lastNavTimeRef.current = now;
      goTo(currentRef.current + 1);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSlides]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      if (busyRef.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (diff > 50) goTo(currentRef.current + 1);
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .back-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; font-family: ${SANS}; font-size: 14px; font-weight: 500; cursor: pointer; padding: 0; transition: opacity 0.2s; white-space: nowrap; }
        .back-btn:hover { opacity: 0.55; }
        .nav-btn { display: inline-flex; align-items: center; gap: 4px; border-radius: 100px; font-family: ${SANS}; font-size: 13px; font-weight: 500; padding: 0 14px; height: 34px; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; background: transparent; }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .nav-btn:not(:disabled):hover { opacity: 0.65; }
        @keyframes skeleton-shimmer { 0% { background-position: -800px 0; } 100% { background-position: 800px 0; } }
        .phase-skeleton { position: absolute; inset: 0; background: linear-gradient(90deg, #E8E2D9 25%, #F0EBE4 50%, #E8E2D9 75%); background-size: 1200px 100%; border-radius: 32px; animation: skeleton-shimmer 1.4s infinite linear; }
        .iframe-skeleton-bg { animation: skeleton-shimmer 1.6s infinite linear; }
        .skel-bar { animation: skeleton-shimmer 1.6s infinite linear; background-size: 800px 100% !important; }
      `}</style>

      {/* Navbar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, display: "flex", alignItems: "center", paddingLeft: PAD_X, paddingRight: PAD_X, paddingTop: 14, paddingBottom: 14, background: "rgba(252,251,248,0.96)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
        <button className="back-btn" style={{ color: textColor }} onClick={() => navigate("/")}>
          <ArrowLeft size={15} />{isZh ? "返回主页" : "Back to Home"}
        </button>

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
          <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: textColor, letterSpacing: "0.02em" }}>
            {sectionLabel}
            {current > 0 && navSubtitle && <span style={{ fontWeight: 400, opacity: 0.60 }}> / {navSubtitle}</span>}
          </span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Page counter */}
          <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 400, color: textColor, opacity: 0.40, letterSpacing: "0.06em", flexShrink: 0 }}>
            {String(current + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
          <div style={{ width: 1, height: 14, background: `${textColor}22`, flexShrink: 0 }} />
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
        <div key={i} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: slide.bg, transform: `translateY(${i <= current ? 0 : 100}vh)`, transition: `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`, zIndex: i + 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          {i === 0 && slide0}
          {i === 1 && slide1 && React.cloneElement(slide1 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 1 })}
          {i === 2 && slide2 && React.cloneElement(slide2 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 2 })}
          {i === 3 && slide3 && React.cloneElement(slide3 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 3 })}
          {i === 4 && slide4 && React.cloneElement(slide4 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 4 })}
          {i === 5 && slide5 && React.cloneElement(slide5 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 5 })}
          {i === 6 && slide6 && React.cloneElement(slide6 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 6 })}
          {i === 7 && slide7 && React.cloneElement(slide7 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 7 })}
          {i === 8 && slide8 && React.cloneElement(slide8 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 8 })}
          {i === 9 && slide9 && React.cloneElement(slide9 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 9 })}
          {i === 10 && slide10 && React.cloneElement(slide10 as React.ReactElement<{ isActive?: boolean }>, { isActive: current === 10 })}
        </div>
      ))}
    </>
  );
}
