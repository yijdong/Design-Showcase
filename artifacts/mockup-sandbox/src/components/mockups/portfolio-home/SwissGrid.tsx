import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { num: "01", title: "AI数据标注平台", en: "AI Annotation Platform", tags: ["交互设计", "AI后台产品", "交互文档"], href: true },
  { num: "02", title: "全球化企业设备管理平台", en: "Global Device Management", tags: ["ToB复杂系统", "0-1产品设计", "场景化设计"], href: true },
  { num: "03", title: "汽车金融服务平台", en: "Automotive Finance Platform", tags: ["体验重塑", "用户旅程地图"], href: true },
  { num: "04", title: "用户研究项目", en: "User Research Project", tags: ["用户访谈", "可用性测试"], href: false },
  { num: "05", title: "视觉设计项目", en: "Visual Design Projects", tags: ["插画", "大屏", "数据可视化"], href: false },
];

const SKILLS = ["交互设计", "视觉设计", "用户研究", "可用性测试", "AI产品设计", "ToB复杂系统设计"];

const TOOLS = [
  { name: "Figma / Sketch", pct: 90 },
  { name: "Gemini / Claude / Replit", pct: 70 },
  { name: "Principal", pct: 70 },
  { name: "Adobe PS / AI", pct: 70 },
];

const VIBE = [
  { title: "AI手机系统设计", en: "AI Mobile System Design", tags: ["AI终端产品设计"] },
  { title: "个人主页", en: "Personal Portfolio Website", tags: ["Vibe Coding", "Replit"] },
  { title: "骑马钉拼版检查工具", en: "Saddle Stitch Layout Checker", tags: ["AI Studio", "Gemini"] },
];

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ProgressBar({ pct, visible }: { pct: number; visible: boolean }) {
  return (
    <div className="h-px bg-[#e0dcd6] w-full relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[#1a1a1a] transition-[width] duration-1000 ease-out"
        style={{ width: visible ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export default function SwissGrid() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const toolsSection = useVisible();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a1a] font-['Inter'] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        .slide-in {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .slide-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .rule-grow {
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .rule-grow.visible {
          transform: scaleX(1);
        }
        .counter-num {
          font-feature-settings: 'tnum';
        }
        .project-row {
          border-bottom: 1px solid #e0dcd6;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .project-row::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #1a1a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
        }
        .project-row:hover::after {
          transform: scaleX(1);
        }
        .project-row .proj-num {
          transition: color 0.2s;
        }
        .project-row:hover .proj-num {
          color: #F5A623;
        }
        .project-row .proj-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .project-row:hover .proj-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .skill-pill {
          display: inline-block;
          border: 1px solid #c8c2bb;
          border-radius: 2px;
          padding: 3px 10px;
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 500;
          color: #5a5550;
          transition: all 0.2s;
        }
        .skill-pill:hover {
          background: #1a1a1a;
          color: #FAFAF8;
          border-color: #1a1a1a;
        }
        .nav-link {
          position: relative;
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #1a1a1a;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link:hover::after { width: 100%; }
        .vibe-card {
          border: 1px solid #e0dcd6;
          transition: border-color 0.25s, transform 0.25s;
        }
        .vibe-card:hover {
          border-color: #1a1a1a;
          transform: translateY(-2px);
        }
        .photo-wrap {
          overflow: hidden;
        }
        .photo-wrap img {
          transition: transform 0.6s cubic-bezier(.16,1,.3,1), filter 0.4s;
          filter: grayscale(20%);
        }
        .photo-wrap:hover img {
          transform: scale(1.04);
          filter: grayscale(0%);
        }
      `}</style>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#e0dcd6] px-8 h-14 flex items-center justify-between"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
      >
        <span className="font-['DM_Serif_Display'] text-lg tracking-tight">Yijun Dong</span>
        <div className="hidden md:flex items-center gap-8">
          {["关于我", "项目案例", "Vibe & AI"].map((l) => (
            <span key={l} className="nav-link cursor-pointer">{l}</span>
          ))}
          <span className="text-[11px] font-semibold tracking-widest border border-[#c8c2bb] rounded px-2 py-0.5 cursor-pointer hover:bg-[#1a1a1a] hover:text-[#FAFAF8] transition-colors">CN/EN</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-12 border-b border-[#e0dcd6] grid grid-cols-12 gap-6">
        {/* Left: text */}
        <div className="col-span-7 flex flex-col gap-6">
          <div
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(24px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase mb-4">UX DESIGNER · 产品体验设计师</p>
            <h1 className="font-['DM_Serif_Display'] text-6xl leading-[1.05] text-[#1a1a1a] mb-6">
              你好，<br />我是<span className="text-[#F5A623]">怡君</span>。
            </h1>
          </div>

          <div
            className="space-y-3 text-[13px] text-[#5a5550] leading-relaxed max-w-md"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(24px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}
          >
            <p>UI/UX全流程设计，深耕交互逻辑与用户体验，可主导需求分析、用户研究、交互设计、视觉设计、可用性测试全链路设计工作。</p>
            <p>擅长复杂系统的信息架构搭建与任务流程设计，具备华为、奔驰等大型客户ToB系统设计实战经验。</p>
          </div>

          <div
            className="flex flex-wrap gap-2 mt-2"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}
          >
            {SKILLS.map((s) => <span key={s} className="skill-pill">{s}</span>)}
          </div>

          <div
            className="flex items-center gap-6 mt-4 text-[12px] text-[#5a5550]"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}
          >
            <span>✉ yijdong@163.com</span>
            <span>☎ 18092240354</span>
          </div>

          <div
            className="flex gap-3 mt-2"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}
          >
            <button className="px-5 py-2.5 bg-[#1a1a1a] text-[#FAFAF8] text-[12px] font-semibold tracking-wider uppercase rounded-none hover:bg-[#333] transition-colors">查看简历</button>
            <button className="px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[12px] font-semibold tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-[#FAFAF8] transition-colors">查看作品 →</button>
          </div>
        </div>

        {/* Right: photo */}
        <div
          className="col-span-5 flex items-start justify-center"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(32px)", transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s" }}
        >
          <div className="w-full max-w-[260px]">
            <div className="photo-wrap aspect-[3/4] overflow-hidden bg-[#e8e4de]">
              <img src="/__mockup/images/photo_me.png" alt="怡君" className="w-full h-full object-cover" />
            </div>
            {/* Counter strip */}
            <div className="flex justify-between mt-4 border-t border-[#e0dcd6] pt-3">
              {[["5+", "年经验"], ["3", "大型客户"], ["20+", "项目交付"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="counter-num text-lg font-bold text-[#1a1a1a]">{n}</div>
                  <div className="text-[10px] text-[#888] tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-8 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">项目案例</h2>
          <div className="h-px flex-1 mx-6 bg-[#e0dcd6]" />
          <span className="text-[11px] text-[#888]">{PROJECTS.length} projects</span>
        </div>

        <div className="space-y-0">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-row py-5 flex items-center gap-4 group"
              onMouseEnter={() => setHoveredProject(p.num)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <span className="proj-num counter-num text-[13px] font-bold text-[#ccc] w-8 shrink-0">{p.num}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-semibold text-[15px] text-[#1a1a1a] leading-snug">{p.title}</span>
                  <span className="text-[11px] text-[#888] font-light hidden md:block">{p.en}</span>
                </div>
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] text-[#888] tracking-wider uppercase">{t}</span>
                  ))}
                </div>
              </div>
              {p.href && (
                <span className="proj-arrow text-[#888] text-sm shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tools / Skills */}
      <section className="px-8 py-12 bg-[#F0EDE8] border-t border-[#e0dcd6]" ref={toolsSection.ref}>
        <div className="flex items-baseline gap-6 mb-8">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">设计工具</h2>
          <div className="h-px flex-1 bg-[#ccc]" />
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {TOOLS.map((t) => (
            <div key={t.name}>
              <div className="flex justify-between mb-2 text-[12px]">
                <span className="font-medium text-[#1a1a1a]">{t.name}</span>
                <span className="text-[#888]">{t.pct}%</span>
              </div>
              <ProgressBar pct={t.pct} visible={toolsSection.visible} />
            </div>
          ))}
        </div>
      </section>

      {/* Vibe Coding */}
      <section className="px-8 py-12 border-t border-[#e0dcd6]">
        <div className="flex items-baseline gap-6 mb-8">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">Vibe Coding & AI</h2>
          <div className="h-px flex-1 bg-[#e0dcd6]" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {VIBE.map((v, i) => (
            <div
              key={v.title}
              className="vibe-card p-5 cursor-default"
              style={{
                opacity: loaded ? 1 : 0,
                transition: `opacity 0.6s ease ${0.3 + i * 0.1}s`,
              }}
            >
              <div className="flex gap-1 flex-wrap mb-3">
                {v.tags.map((t) => (
                  <span key={t} className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-[#F5A623]/15 text-[#b37d00]">{t}</span>
                ))}
              </div>
              <h3 className="font-semibold text-[14px] mb-1 leading-snug">{v.title}</h3>
              <p className="text-[11px] text-[#888]">{v.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-[#e0dcd6] flex justify-between items-center text-[11px] text-[#888]">
        <span className="font-['DM_Serif_Display'] text-base text-[#1a1a1a]">Yijun Dong</span>
        <span>yijdong@163.com · 18092240354</span>
        <span>© 2024</span>
      </footer>
    </div>
  );
}
