import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { num: "01", title: "AI数据标注平台", en: "AI Annotation Platform", tags: ["交互设计", "AI后台产品", "交互文档"], year: "2023" },
  { num: "02", title: "全球化企业设备管理平台", en: "Global Device Management", tags: ["ToB复杂系统", "0-1产品设计"], year: "2023" },
  { num: "03", title: "汽车金融服务平台", en: "Automotive Finance Platform", tags: ["体验重塑", "用户旅程地图"], year: "2022" },
  { num: "04", title: "用户研究项目", en: "User Research Project", tags: ["用户访谈", "可用性测试"], year: "2022" },
  { num: "05", title: "视觉设计项目", en: "Visual Design Projects", tags: ["插画", "大屏", "数据可视化"], year: "2021" },
];

const VIBE = [
  { title: "AI手机系统设计", tags: ["AI终端"], year: "2024" },
  { title: "个人主页", tags: ["Vibe Coding"], year: "2024" },
  { title: "骑马钉拼版检查工具", tags: ["AI Studio"], year: "2024" },
];

const SKILLS = ["交互设计", "视觉设计", "用户研究", "可用性测试", "AI产品设计", "ToB系统设计"];

export default function SplitFixed() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxOffset = -scrollY * 0.12;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

        .proj-item {
          border-top: 1px solid #e0dcd6;
          transition: background 0.2s;
          cursor: default;
        }
        .proj-item:last-child { border-bottom: 1px solid #e0dcd6; }
        .proj-item:hover { background: rgba(245,166,35,0.04); }
        .proj-item .arrow { opacity: 0; transform: translateX(-6px); transition: opacity 0.2s, transform 0.2s; }
        .proj-item:hover .arrow { opacity: 1; transform: translateX(0); }
        .proj-item .num { transition: color 0.2s; }
        .proj-item:hover .num { color: #F5A623; }

        .skill-dot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #888;
          padding: 4px 0;
          letter-spacing: 0.04em;
        }
        .skill-dot::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #F5A623;
          flex-shrink: 0;
        }

        .section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0dcd6;
        }

        .left-panel {
          scrollbar-width: none;
        }
        .right-panel {
          scrollbar-width: thin;
          scrollbar-color: #e0dcd6 transparent;
        }
        .right-panel::-webkit-scrollbar { width: 3px; }
        .right-panel::-webkit-scrollbar-track { background: transparent; }
        .right-panel::-webkit-scrollbar-thumb { background: #e0dcd6; }

        .vibe-card {
          border: 1px solid #e0dcd6;
          padding: 16px;
          transition: border-color 0.2s;
        }
        .vibe-card:hover { border-color: #1a1a1a; }

        .fade-left {
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-left.in {
          opacity: 1;
          transform: translateX(0);
        }
        .fade-right {
          opacity: 0;
          transform: translateX(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-right.in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      {/* LEFT PANEL — Fixed identity */}
      <div
        className="left-panel w-[38%] shrink-0 border-r border-[#e0dcd6] flex flex-col overflow-hidden"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Nav top */}
        <div className="px-8 h-14 flex items-center justify-between border-b border-[#e0dcd6] shrink-0">
          <span className="font-['DM_Serif_Display'] text-[17px]">Yijun Dong</span>
          <span className="text-[10px] font-semibold tracking-[0.18em] border border-[#ddd] px-2 py-0.5 text-[#888]">CN/EN</span>
        </div>

        {/* Photo — parallax */}
        <div className="relative overflow-hidden shrink-0" style={{ height: "260px" }}>
          <img
            src="/__mockup/images/photo_me.png"
            alt="怡君"
            className="w-full h-full object-cover object-top"
            style={{ transform: `translateY(${parallaxOffset}px) scale(1.15)`, transition: "transform 0.05s linear" }}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, #FAFAF8)" }} />
        </div>

        {/* Identity content — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 left-panel">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#aaa] uppercase mb-3">UX Designer · 产品体验设计师</p>
            <h1 className="font-['DM_Serif_Display'] text-[36px] leading-[1.1] text-[#1a1a1a] mb-4">
              你好，我是<br /><span className="text-[#F5A623]">怡君</span>。
            </h1>
            <p className="text-[12px] text-[#666] leading-[1.8]">
              UI/UX全流程设计，专注于复杂B端系统体验与AI产品设计。具备华为、奔驰等大型客户实战经验。
            </p>
          </div>

          {/* Skills */}
          <div>
            <div className="section-label">能力范围</div>
            <div className="space-y-1">
              {SKILLS.map((s) => (
                <div key={s} className="skill-dot">{s}</div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-[#e0dcd6]">
            {[["5+", "年经验"], ["3", "品牌客户"], ["20+", "项目交付"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-[20px] font-bold text-[#1a1a1a] leading-none">{n}</div>
                <div className="text-[9px] text-[#aaa] tracking-[0.1em] uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-2 text-[11px] text-[#888]">
            <div>✉ yijdong@163.com</div>
            <div>☎ 18092240354</div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2 pb-4">
            <button className="w-full py-2.5 bg-[#1a1a1a] text-[#FAFAF8] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
              下载简历
            </button>
            <button className="w-full py-2.5 border border-[#ddd] text-[#888] text-[11px] font-semibold tracking-wider uppercase hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
              联系我
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Scrollable work */}
      <div
        ref={rightRef}
        className="right-panel flex-1 overflow-y-auto"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        <div className="px-10 py-10 space-y-12 max-w-[660px]">

          {/* Projects section */}
          <div>
            <div className="section-label">项目案例</div>
            <div className="space-y-0">
              {PROJECTS.map((p, i) => (
                <div
                  key={p.num}
                  className="proj-item py-5 flex items-start gap-4"
                  onMouseEnter={() => setActive(p.num)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "none" : "translateX(16px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
                  }}
                >
                  <span className="num text-[12px] font-bold text-[#ddd] w-7 shrink-0 tabular-nums pt-0.5">{p.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-semibold text-[14px] text-[#1a1a1a]">{p.title}</span>
                      <span className="text-[10px] text-[#bbb]">{p.en}</span>
                    </div>
                    <div className="flex gap-2 mt-1 flex-wrap items-center">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] text-[#aaa] tracking-wide">{t}</span>
                      ))}
                      <span className="ml-auto text-[10px] text-[#ccc] tabular-nums">{p.year}</span>
                    </div>
                  </div>
                  <span className="arrow text-[#aaa] text-sm shrink-0 mt-0.5">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vibe section */}
          <div>
            <div className="section-label">Vibe Coding & AI</div>
            <div className="grid grid-cols-1 gap-3">
              {VIBE.map((v) => (
                <div key={v.title} className="vibe-card cursor-default">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex gap-1.5 flex-wrap mb-2">
                        {v.tags.map((t) => (
                          <span key={t} className="text-[9px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 bg-[#F5A623]/10 text-[#b37d00]">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-medium text-[13px] text-[#1a1a1a]">{v.title}</h3>
                    </div>
                    <span className="text-[10px] text-[#ccc] tabular-nums shrink-0">{v.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About strip */}
          <div className="border-t border-[#e0dcd6] pt-8 pb-4">
            <div className="section-label">关于工具</div>
            <div className="grid grid-cols-2 gap-6 text-[12px] text-[#888]">
              {[
                { label: "Figma / Sketch", note: "主力设计工具" },
                { label: "Gemini / Claude / Replit", note: "AI辅助与Vibe" },
                { label: "Principal", note: "高保真原型" },
                { label: "Adobe PS / AI", note: "视觉输出" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col gap-0.5">
                  <span className="font-medium text-[#1a1a1a] text-[12px]">{t.label}</span>
                  <span className="text-[10px] text-[#bbb]">{t.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-[10px] text-[#ccc] pb-6">
            © 2024 Yijun Dong · UX Designer
          </div>
        </div>
      </div>
    </div>
  );
}
