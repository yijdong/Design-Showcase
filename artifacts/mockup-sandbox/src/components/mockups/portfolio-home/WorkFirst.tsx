import { useState, useEffect } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "AI数据标注平台",
    en: "AI Annotation Platform",
    tags: ["交互设计", "AI后台"],
    year: "2023",
    desc: "面向AI训练数据生产的全流程标注工作台，覆盖图像、文本、音频等多模态数据类型，主导0-1产品设计。",
    color: "#6C63FF",
    size: "large",
  },
  {
    num: "02",
    title: "全球化企业设备管理平台",
    en: "Global Device Management",
    tags: ["ToB复杂系统", "0-1"],
    year: "2023",
    desc: "为华为大型企业客户设计的全球化IT设备全生命周期管理系统，适配多角色、多场景。",
    color: "#00C9A7",
    size: "medium",
  },
  {
    num: "03",
    title: "汽车金融服务平台",
    en: "Automotive Finance",
    tags: ["体验重塑"],
    year: "2022",
    desc: "梅赛德斯-奔驰金融服务数字化体验重塑，重新定义申请流程与核心交互模型。",
    color: "#F5A623",
    size: "medium",
  },
  {
    num: "04",
    title: "用户研究项目",
    en: "User Research",
    tags: ["用户访谈", "测试"],
    year: "2022",
    desc: "系统性用户研究，含定性访谈、可用性测试及问卷调研，输出用户画像与设计洞察。",
    color: "#FF6B8A",
    size: "small",
  },
  {
    num: "05",
    title: "视觉设计项目",
    en: "Visual Design",
    tags: ["插画", "大屏"],
    year: "2021",
    desc: "品牌插画、数据可视化大屏、UI视觉规范等多类型视觉设计，体现全链路视觉执行能力。",
    color: "#34D399",
    size: "small",
  },
];

const VIBE = [
  { title: "AI手机系统设计", tags: ["AI"], color: "#6C63FF" },
  { title: "个人主页", tags: ["Replit"], color: "#F5A623" },
  { title: "骑马钉工具", tags: ["Gemini"], color: "#34D399" },
];

export default function WorkFirst() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0F0F0F", fontFamily: "'Inter', sans-serif", color: "#f0ebe4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        .proj-card {
          border: 1px solid rgba(255,255,255,0.06);
          cursor: default;
          transition: border-color 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }
        .proj-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .proj-card:hover::before { transform: scaleX(1); }

        .about-panel {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .about-panel.open {
          opacity: 1;
          pointer-events: all;
        }
        .about-inner {
          transform: translateY(24px);
          transition: transform 0.4s ease;
        }
        .about-panel.open .about-inner {
          transform: translateY(0);
        }
      `}</style>

      {/* COMPACT TOP BAR — identity is minimal */}
      <header
        className="sticky top-0 z-40 px-8 h-12 flex items-center justify-between"
        style={{
          background: "rgba(15,15,15,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <span className="font-['DM_Serif_Display'] text-[15px] text-white/80">Yijun Dong</span>
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-white/25">UX Designer · 产品体验设计师</span>
          <button
            className="text-[11px] font-semibold tracking-wider text-[#F5A623] hover:text-white transition-colors"
            onClick={() => setShowAbout(true)}
          >
            关于我 →
          </button>
        </div>
      </header>

      {/* PROJECTS GRID — Work is the immediate first impression */}
      <main className="px-8 py-10 max-w-[900px] mx-auto">
        {/* Category label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20">项目案例</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[10px] text-white/15">{PROJECTS.length} works</span>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-12 gap-4 auto-rows-auto">
          {/* Large card — col 1-8 */}
          {PROJECTS.filter(p => p.size === "large").map((p, i) => (
            <div
              key={p.num}
              className="proj-card col-span-8 p-6"
              style={{
                "--accent": p.color,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s, border-color 0.25s, box-shadow 0.25s`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredProject(p.num)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-[10px] font-bold tracking-[0.2em] text-white/20 tabular-nums">{p.num}</div>
                <div className="text-[10px] text-white/20 tabular-nums">{p.year}</div>
              </div>
              {/* Color accent bar */}
              <div className="w-8 h-0.5 mb-4" style={{ background: p.color }} />
              <h2 className="font-semibold text-[20px] text-white mb-2 leading-snug">{p.title}</h2>
              <p className="text-[11px] text-white/40 mb-4 leading-relaxed">{p.en}</p>
              <p className="text-[12px] text-white/50 leading-relaxed mb-5">{p.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-sm" style={{ background: `${p.color}18`, color: p.color }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-white/20 hover:text-white/60 transition-colors cursor-default">查看案例 →</span>
              </div>
            </div>
          ))}

          {/* Medium + small cards — col 9-12 and row 2 */}
          <div className="col-span-4 flex flex-col gap-4">
            {PROJECTS.filter(p => p.size === "medium").slice(0, 2).map((p, i) => (
              <div
                key={p.num}
                className="proj-card p-5 flex-1"
                style={{
                  "--accent": p.color,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s, border-color 0.25s`,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredProject(p.num)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/20 tabular-nums">{p.num}</div>
                  <div className="text-[10px] text-white/20">{p.year}</div>
                </div>
                <div className="w-5 h-0.5 mb-3" style={{ background: p.color }} />
                <h3 className="font-semibold text-[14px] text-white mb-1.5 leading-snug">{p.title}</h3>
                <p className="text-[10px] text-white/30 mb-3 leading-relaxed">{p.desc.slice(0, 40)}…</p>
                <div className="flex gap-1.5 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[9px] font-medium px-1.5 py-0.5" style={{ background: `${p.color}18`, color: p.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row — smaller projects */}
          {PROJECTS.filter(p => p.size === "small").map((p, i) => (
            <div
              key={p.num}
              className="proj-card col-span-6 p-5"
              style={{
                "--accent": p.color,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ease ${0.35 + i * 0.08}s, transform 0.6s ease ${0.35 + i * 0.08}s, border-color 0.25s`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredProject(p.num)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/20">{p.num}</span>
                <span className="text-[10px] text-white/20">{p.year}</span>
              </div>
              <div className="w-5 h-px mb-3" style={{ background: p.color }} />
              <h3 className="font-medium text-[13px] text-white mb-1">{p.title}</h3>
              <p className="text-[10px] text-white/25 mb-3">{p.en}</p>
              <div className="flex gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5" style={{ background: `${p.color}15`, color: p.color }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vibe row */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20">Vibe Coding & AI</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {VIBE.map((v, i) => (
              <div
                key={v.title}
                className="proj-card p-4"
                style={{
                  "--accent": v.color,
                  opacity: loaded ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.5 + i * 0.07}s`,
                } as React.CSSProperties}
              >
                <div className="w-4 h-px mb-3" style={{ background: v.color }} />
                <h3 className="font-medium text-[12px] text-white mb-1.5">{v.title}</h3>
                <div className="flex gap-1.5">
                  {v.tags.map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5" style={{ background: `${v.color}18`, color: v.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ABOUT OVERLAY — revealed on demand */}
      <div className={`about-panel ${showAbout ? "open" : ""}`} onClick={() => setShowAbout(false)}>
        <div className="about-inner max-w-sm text-center px-8" onClick={e => e.stopPropagation()}>
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-2 border-white/10">
            <img src="/__mockup/images/photo_me.png" alt="怡君" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-['DM_Serif_Display'] text-[32px] text-white mb-2">怡君</h2>
          <p className="text-[12px] text-white/40 tracking-widest uppercase mb-6">UX Designer</p>
          <p className="text-[13px] text-white/50 leading-relaxed mb-6">
            UI/UX全流程设计，深耕交互逻辑与用户体验。具备华为、奔驰等大型客户ToB系统设计实战经验。
          </p>
          <div className="text-[11px] text-white/30 space-y-1 mb-6">
            <div>yijdong@163.com</div>
            <div>18092240354</div>
          </div>
          <button className="text-[11px] text-white/25 hover:text-white/60 transition-colors" onClick={() => setShowAbout(false)}>
            × 关闭
          </button>
        </div>
      </div>
    </div>
  );
}
