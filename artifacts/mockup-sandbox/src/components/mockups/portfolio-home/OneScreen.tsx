import { useState, useEffect } from "react";

const PROJECTS_FEATURED = [
  { num: "01", title: "AI数据标注平台", en: "AI Annotation Platform", tags: ["AI后台", "0-1设计"], color: "#6C63FF" },
  { num: "02", title: "全球化企业设备管理平台", en: "Global Device Management", tags: ["ToB复杂系统"], color: "#00C9A7" },
  { num: "03", title: "汽车金融服务平台", en: "Automotive Finance", tags: ["体验重塑"], color: "#F5A623" },
];

const ALL_TAGS = ["交互设计", "视觉设计", "用户研究", "可用性测试", "AI产品设计", "ToB系统设计"];

export default function OneScreen() {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    const ticker = setInterval(() => setTime(new Date()), 1000);
    return () => { clearTimeout(t); clearInterval(ticker); };
  }, []);

  const timeStr = time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = time.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      className="w-screen h-screen overflow-hidden select-none"
      style={{
        background: "#FAFAF8",
        fontFamily: "'Inter', sans-serif",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

        .proj-cell {
          border: 1px solid #e0dcd6;
          padding: 20px;
          cursor: default;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .proj-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: var(--c);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .proj-cell:hover::before { transform: scaleX(1); }
        .proj-cell:hover { border-color: transparent; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.07); }

        .tag-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #aaa;
          font-weight: 400;
          letter-spacing: 0.05em;
          padding: 2px 0;
        }
        .tag-item::before {
          content: '—';
          color: #ddd;
          flex-shrink: 0;
        }

        .photo-container {
          position: relative;
          overflow: hidden;
        }
        .photo-container img {
          transition: transform 0.6s ease, filter 0.4s;
          filter: grayscale(20%);
        }
        .photo-container:hover img {
          transform: scale(1.05);
          filter: grayscale(0%);
        }

        .cell-in {
          opacity: 0;
          transform: scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .cell-in.visible {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      {/* ENTIRE PORTFOLIO — one viewport, strict grid */}
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: "1fr 1.4fr 1fr",
          gridTemplateRows: "52px 1fr 1fr 44px",
          gap: "1px",
          background: "#e0dcd6",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* Top-left: Name / Title */}
        <div className="bg-[#FAFAF8] flex items-center px-6 gap-4">
          <span className="font-['DM_Serif_Display'] text-[18px] text-[#1a1a1a]">Yijun Dong</span>
          <span className="text-[10px] text-[#bbb] font-light tracking-wide">UX Designer</span>
        </div>

        {/* Top-center: Section nav */}
        <div className="bg-[#FAFAF8] flex items-center justify-center gap-10">
          {["项目案例", "Vibe & AI", "设计工具"].map((l) => (
            <span key={l} className="text-[11px] font-medium tracking-[0.1em] text-[#bbb] uppercase cursor-pointer hover:text-[#1a1a1a] transition-colors">
              {l}
            </span>
          ))}
        </div>

        {/* Top-right: Live clock */}
        <div className="bg-[#FAFAF8] flex items-center justify-end px-6 gap-4">
          <span className="text-[10px] text-[#bbb] tabular-nums">{dateStr}</span>
          <span className="text-[13px] font-bold text-[#1a1a1a] tabular-nums tracking-wider">{timeStr}</span>
        </div>

        {/* Row 2, Col 1: Identity */}
        <div
          className="bg-[#FAFAF8] flex flex-col px-6 py-5 gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(-12px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {/* Photo */}
          <div className="photo-container flex-1 min-h-0 overflow-hidden">
            <img
              src="/__mockup/images/photo_me.png"
              alt="怡君"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Mini bio */}
          <div>
            <h1 className="font-['DM_Serif_Display'] text-[26px] leading-tight mb-1">
              你好，我是<span className="text-[#F5A623]">怡君</span>。
            </h1>
            <p className="text-[11px] text-[#888] leading-relaxed">
              UI/UX全流程设计，专注B端系统与AI产品体验，具备华为、奔驰实战经验。
            </p>
          </div>
          <div className="text-[10px] text-[#aaa] space-y-0.5">
            <div>✉ yijdong@163.com</div>
            <div>☎ 18092240354</div>
          </div>
        </div>

        {/* Row 2, Col 2: Project 01 (featured) */}
        <div
          className="proj-cell"
          style={{
            "--c": PROJECTS_FEATURED[0].color,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s, border-color 0.25s, background 0.25s, box-shadow 0.25s",
          } as React.CSSProperties}
          onMouseEnter={() => setHovered("01")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-start justify-between mb-auto">
            <span className="text-[11px] font-bold text-[#ddd] tabular-nums">01</span>
            <span className="text-[10px] text-[#ddd]">2023</span>
          </div>
          <div className="flex flex-col h-full gap-3">
            <div className="flex-1" />
            <div className="w-8 h-0.5 mt-6" style={{ background: PROJECTS_FEATURED[0].color }} />
            <h2 className="font-semibold text-[22px] leading-tight">{PROJECTS_FEATURED[0].title}</h2>
            <p className="text-[11px] text-[#aaa]">{PROJECTS_FEATURED[0].en}</p>
            <div className="flex gap-2 flex-wrap">
              {PROJECTS_FEATURED[0].tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 font-medium"
                  style={{ background: `${PROJECTS_FEATURED[0].color}15`, color: PROJECTS_FEATURED[0].color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2, Col 3: Skills list */}
        <div
          className="bg-[#FAFAF8] px-6 py-5 flex flex-col gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(12px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#bbb]">能力范围</div>
          <div className="flex-1 space-y-1">
            {ALL_TAGS.map((t) => (
              <div key={t} className="tag-item">{t}</div>
            ))}
          </div>
          <div className="pt-3 border-t border-[#e0dcd6]">
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#bbb] mb-3">统计</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[["5+", "年"], ["3", "客户"], ["20+", "项目"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-[16px] font-bold tabular-nums">{n}</div>
                  <div className="text-[9px] text-[#bbb] uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3, Col 1: Project 02 */}
        <div
          className="proj-cell"
          style={{
            "--c": PROJECTS_FEATURED[1].color,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.25s, border-color 0.25s, background 0.25s, box-shadow 0.25s",
          } as React.CSSProperties}
          onMouseEnter={() => setHovered("02")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-[11px] font-bold text-[#ddd] tabular-nums">02</span>
            <span className="text-[10px] text-[#ddd]">2023</span>
          </div>
          <div className="w-6 h-0.5 mb-4" style={{ background: PROJECTS_FEATURED[1].color }} />
          <h3 className="font-semibold text-[16px] leading-tight mb-2">{PROJECTS_FEATURED[1].title}</h3>
          <p className="text-[10px] text-[#aaa] mb-3">{PROJECTS_FEATURED[1].en}</p>
          <div className="flex gap-1.5 flex-wrap">
            {PROJECTS_FEATURED[1].tags.map((t) => (
              <span key={t} className="text-[9px] px-1.5 py-0.5" style={{ background: `${PROJECTS_FEATURED[1].color}15`, color: PROJECTS_FEATURED[1].color }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Row 3, Col 2: Project 03 */}
        <div
          className="proj-cell"
          style={{
            "--c": PROJECTS_FEATURED[2].color,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s, border-color 0.25s, background 0.25s, box-shadow 0.25s",
          } as React.CSSProperties}
          onMouseEnter={() => setHovered("03")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-[11px] font-bold text-[#ddd] tabular-nums">03</span>
            <span className="text-[10px] text-[#ddd]">2022</span>
          </div>
          <div className="w-6 h-0.5 mb-4" style={{ background: PROJECTS_FEATURED[2].color }} />
          <h3 className="font-semibold text-[16px] leading-tight mb-2">{PROJECTS_FEATURED[2].title}</h3>
          <p className="text-[10px] text-[#aaa] mb-3">{PROJECTS_FEATURED[2].en}</p>
          <div className="flex gap-1.5 flex-wrap">
            {PROJECTS_FEATURED[2].tags.map((t) => (
              <span key={t} className="text-[9px] px-1.5 py-0.5" style={{ background: `${PROJECTS_FEATURED[2].color}15`, color: PROJECTS_FEATURED[2].color }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Row 3, Col 3: CTAs + Vibe tags */}
        <div
          className="bg-[#FAFAF8] px-6 py-5 flex flex-col gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.35s",
          }}
        >
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#bbb]">Vibe & AI</div>
          <div className="flex-1 space-y-2 text-[11px]">
            {["AI手机系统设计", "个人主页", "骑马钉工具"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 text-[#888] py-1 border-b border-[#f0ede8]">
                <span className="text-[9px] tabular-nums text-[#ccc]">0{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full py-2 bg-[#1a1a1a] text-[#FAFAF8] text-[10px] font-semibold tracking-widest uppercase hover:bg-[#333] transition-colors">
              下载简历
            </button>
            <button className="w-full py-2 border border-[#e0dcd6] text-[#888] text-[10px] font-semibold tracking-widest uppercase hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
              联系我
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#FAFAF8] col-span-3 flex items-center justify-between px-6">
          <span className="text-[10px] text-[#ccc]">© 2024 Yijun Dong</span>
          <div className="flex items-center gap-4">
            {["全部项目 →", "下载简历 →"].map((l) => (
              <span key={l} className="text-[10px] font-semibold tracking-wider text-[#ccc] hover:text-[#1a1a1a] transition-colors cursor-pointer uppercase">{l}</span>
            ))}
          </div>
          <span className="text-[10px] text-[#ccc]">UX Designer · 产品体验设计师</span>
        </div>
      </div>
    </div>
  );
}
