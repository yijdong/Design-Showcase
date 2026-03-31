import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { num: "01", titleZh: "AI数据标注平台", titleEn: "AI Annotation Platform", tags: ["交互设计", "AI后台"], color: "#6C63FF", href: true },
  { num: "02", titleZh: "全球化企业设备管理平台", titleEn: "Global Device Management", tags: ["ToB系统", "0-1产品"], color: "#00C9A7", href: true },
  { num: "03", titleZh: "汽车金融服务平台", titleEn: "Automotive Finance", tags: ["体验重塑"], color: "#F5A623", href: true },
  { num: "04", titleZh: "用户研究项目", titleEn: "User Research", tags: ["访谈", "测试"], color: "#FF6B8A", href: false },
  { num: "05", titleZh: "视觉设计项目", titleEn: "Visual Design", tags: ["插画", "大屏"], color: "#34D399", href: false },
];

const SKILLS = ["交互设计", "视觉设计", "用户研究", "可用性测试", "AI产品设计", "ToB系统设计", "组件库搭建"];

const VIBE = [
  { title: "AI手机系统设计", tags: ["AI", "终端"], desc: "主导北美市场 AI 手机桌面系统需求定义，完成竞品分析、原型设计。" },
  { title: "个人主页", tags: ["Replit", "Vibe Coding"], desc: "使用Vibe coding工具Replit完成个人主页的设计与上线部署全流程。" },
  { title: "骑马钉拼版检查工具", tags: ["AI Studio", "Gemini"], desc: "使用Vibe coding工具AI Studio中的build功能开发，并实现了本地运行。" },
];

function useCountIn(target: number, duration = 1200, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

function useVisible(threshold = 0.2) {
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

export default function DarkEditorial() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const statsSection = useVisible();

  const yearsVal = useCountIn(5, 1400, statsSection.visible);
  const clientsVal = useCountIn(3, 1000, statsSection.visible);
  const projectsVal = useCountIn(20, 1600, statsSection.visible);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const move = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 24,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 16,
      });
    };
    hero.addEventListener("mousemove", move);
    return () => hero.removeEventListener("mousemove", move);
  }, []);

  const NAME = "怡君";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ebe4] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        .char-reveal {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
        }
        .char-inner {
          display: inline-block;
          transform: translateY(110%);
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .char-inner.up {
          transform: translateY(0);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.in {
          opacity: 1;
          transform: translateY(0);
        }
        .proj-card {
          border-top: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .proj-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .proj-card:hover::before { opacity: 0.04; }
        .proj-card .proj-num-inner {
          transition: color 0.25s;
        }
        .proj-card:hover .proj-num-inner {
          color: var(--accent);
        }
        .proj-card .arrow {
          opacity: 0; transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .proj-card:hover .arrow { opacity: 1; transform: translateX(0); }
        .skill-tag {
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,235,228,0.6);
          font-size: 11px;
          font-weight: 500;
          padding: 4px 12px;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          display: inline-block;
        }
        .skill-tag:hover {
          border-color: rgba(245,166,35,0.5);
          color: #F5A623;
        }
        .nav-item {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,235,228,0.4);
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-item:hover { color: #f0ebe4; }
        .glow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #F5A623;
          box-shadow: 0 0 12px #F5A623;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.8)} }
        .vibe-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
        }
        .vibe-card:hover {
          border-color: rgba(245,166,35,0.3);
          background: rgba(245,166,35,0.04);
          transform: translateY(-3px);
        }
        .counter-num { font-feature-settings: 'tnum'; }
        .photo-parallax {
          transition: transform 0.1s linear;
        }
        .mq-wrap {
          display: flex;
          gap: 48px;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 px-8 h-14 flex items-center justify-between border-b border-white/5"
        style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(16px)", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <span className="font-['DM_Serif_Display'] text-lg tracking-tight">Yijun Dong</span>
        <div className="flex items-center gap-8">
          {["关于我", "项目案例", "Vibe & AI"].map((l) => (
            <span key={l} className="nav-item">{l}</span>
          ))}
          <span className="text-[11px] font-bold border border-white/15 px-2.5 py-1 rounded-sm cursor-pointer hover:border-white/40 transition-colors">CN/EN</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col px-8 pt-16 pb-12 overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(245,166,35,0.06) 0%, transparent 60%)" }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "64px 64px" }}
        />

        <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 items-center">
          {/* Left */}
          <div className="col-span-7 space-y-6">
            <p className={`text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F5A623]/70 fade-up ${loaded ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
              UX Designer · 产品体验设计师
            </p>

            {/* Animated name */}
            <h1 className="font-['DM_Serif_Display'] leading-none select-none">
              <div className="text-[13vw] md:text-[72px] text-white/10 font-bold tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>
                {"你好".split("").map((c, i) => (
                  <span key={i} className="char-reveal">
                    <span className={`char-inner ${loaded ? "up" : ""}`} style={{ transitionDelay: `${0.15 + i * 0.08}s` }}>{c}</span>
                  </span>
                ))}
              </div>
              <div className="text-[13vw] md:text-[72px] font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
                {"我是怡君".split("").map((c, i) => (
                  <span key={i} className="char-reveal">
                    <span
                      className={`char-inner ${loaded ? "up" : ""}`}
                      style={{
                        transitionDelay: `${0.25 + i * 0.09}s`,
                        color: c === "怡" || c === "君" ? "#F5A623" : "#f0ebe4",
                      }}
                    >{c}</span>
                  </span>
                ))}
                <span className="char-reveal">
                  <span className={`char-inner ${loaded ? "up" : ""} text-white/40`} style={{ transitionDelay: "0.65s" }}>。</span>
                </span>
              </div>
            </h1>

            <div className={`space-y-3 text-[13px] text-white/50 leading-relaxed max-w-lg fade-up ${loaded ? "in" : ""}`} style={{ transitionDelay: "0.7s" }}>
              <p>UI/UX全流程设计，专注解决复杂B2B系统与AI产品体验，让混乱变得清晰。</p>
              <p>具备华为、奔驰等大型客户ToB系统设计实战经验，善用AI辅助设计与Vibe coding工具。</p>
            </div>

            <div className={`flex flex-wrap gap-2 fade-up ${loaded ? "in" : ""}`} style={{ transitionDelay: "0.85s" }}>
              {SKILLS.map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>

            <div className={`flex gap-3 fade-up ${loaded ? "in" : ""}`} style={{ transitionDelay: "1s" }}>
              <button className="px-6 py-3 text-sm font-semibold text-[#0a0a0a] bg-[#F5A623] hover:bg-[#e89b1a] transition-colors rounded-none tracking-wider">查看简历</button>
              <button className="px-6 py-3 text-sm font-semibold text-[#f0ebe4] border border-white/20 hover:border-white/50 transition-colors tracking-wider">查看作品 →</button>
            </div>

            {/* Contact */}
            <div className={`flex items-center gap-4 text-[11px] text-white/30 fade-up ${loaded ? "in" : ""}`} style={{ transitionDelay: "1.1s" }}>
              <span className="flex items-center gap-2"><div className="glow-dot" /> 在线 · Available</span>
              <span>·</span>
              <span>yijdong@163.com</span>
              <span>·</span>
              <span>18092240354</span>
            </div>
          </div>

          {/* Right: photo */}
          <div
            className={`col-span-5 flex justify-center items-center fade-up ${loaded ? "in" : ""}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="relative">
              {/* Glow backdrop */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)" }}
              />
              {/* Photo */}
              <div
                className="relative w-[260px] h-[310px] overflow-hidden"
                style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)" }}
              >
                <img
                  src="/__mockup/images/photo_me.png"
                  alt="怡君"
                  className="photo-parallax w-full h-full object-cover"
                  style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.06)` }}
                />
                {/* Film grain overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
                />
              </div>
              {/* Badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-[#F5A623] text-[#0a0a0a] px-3 py-2 text-[10px] font-bold uppercase tracking-widest"
              >
                UX·Designer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div ref={statsSection.ref} className="border-y border-white/6 bg-white/[0.02] px-8 py-5 flex justify-between items-center">
        {[
          { val: yearsVal, suffix: "+", label: "年设计经验" },
          { val: clientsVal, suffix: "", label: "大型品牌客户" },
          { val: projectsVal, suffix: "+", label: "项目落地交付" },
        ].map(({ val, suffix, label }) => (
          <div key={label} className="text-center flex-1">
            <div className="counter-num text-4xl font-bold text-[#F5A623]">{val}{suffix}</div>
            <div className="text-[11px] text-white/30 tracking-wider mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <section className="px-8 py-14">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-white/30 uppercase">项目案例</span>
          <div className="h-px flex-1 bg-white/6" />
        </div>
        <div className="space-y-0">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="proj-card group py-5 flex items-center gap-5 cursor-default"
              style={{ "--accent": p.color } as React.CSSProperties}
              onMouseEnter={() => setHoveredProject(p.num)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <span
                className="proj-num-inner text-[12px] font-bold text-white/15 w-8 shrink-0 counter-num"
              >
                {p.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-semibold text-[15px] text-[#f0ebe4] leading-snug">{p.titleZh}</span>
                  <span className="text-[11px] text-white/30 hidden md:block">{p.titleEn}</span>
                </div>
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] text-white/25 tracking-wider uppercase">{t}</span>
                  ))}
                </div>
              </div>
              {/* Color accent dot */}
              <div
                className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
                style={{
                  background: p.color,
                  boxShadow: hoveredProject === p.num ? `0 0 16px ${p.color}` : "none",
                  opacity: hoveredProject === p.num ? 1 : 0.3,
                }}
              />
              {p.href && <span className="arrow text-white/40 text-sm shrink-0">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Marquee skills */}
      <div className="border-y border-white/5 py-4 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-16 z-10" style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-16 z-10" style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />
        <div className="mq-wrap">
          {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="text-[11px] font-medium tracking-[0.2em] text-white/20 uppercase shrink-0">
              {i % 3 === 0 ? <span className="text-[#F5A623]/40">✦</span> : null} {s}
            </span>
          ))}
        </div>
      </div>

      {/* Vibe Coding */}
      <section className="px-8 py-14">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-white/30 uppercase">Vibe Coding & AI</span>
          <div className="h-px flex-1 bg-white/6" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {VIBE.map((v, i) => (
            <div key={v.title} className="vibe-card p-5 cursor-default">
              <div className="flex gap-2 flex-wrap mb-3">
                {v.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-[#F5A623]/10 text-[#F5A623]/70">{t}</span>
                ))}
              </div>
              <h3 className="font-semibold text-[14px] text-[#f0ebe4] leading-snug mb-2">{v.title}</h3>
              <p className="text-[11px] text-white/30 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/5 flex justify-between items-center">
        <span className="font-['DM_Serif_Display'] text-base">Yijun Dong</span>
        <div className="text-[11px] text-white/25">
          yijdong@163.com · 18092240354
        </div>
        <div className="text-[11px] text-white/20">© 2024</div>
      </footer>
    </div>
  );
}
