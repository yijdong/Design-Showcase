import { useState, useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    num: "01",
    title: "AI数据标注平台",
    en: "AI Annotation Platform",
    tags: ["交互设计", "AI后台产品", "交互文档"],
    href: true,
    desc: "面向AI训练数据生产的全流程标注工作台，覆盖图像、文本、音频等多模态数据类型。主导0-1产品设计，搭建信息架构与核心任务流程，完成用户研究、原型设计及可用性测试。",
  },
  {
    num: "02",
    title: "全球化企业设备管理平台",
    en: "Global Device Management",
    tags: ["ToB复杂系统", "0-1产品设计", "场景化设计"],
    href: true,
    desc: "为华为大型企业客户设计的全球化IT设备全生命周期管理系统。深度参与需求挖掘与信息架构设计，打造适配多角色、多场景的复杂B端系统体验。",
  },
  {
    num: "03",
    title: "汽车金融服务平台",
    en: "Automotive Finance Platform",
    tags: ["体验重塑", "用户旅程地图"],
    href: true,
    desc: "梅赛德斯-奔驰金融服务数字化平台体验重塑项目。通过用户旅程地图与深度访谈，识别核心痛点，重新定义申请流程与核心交互模型。",
  },
  {
    num: "04",
    title: "用户研究项目",
    en: "User Research Project",
    tags: ["用户访谈", "可用性测试"],
    href: false,
    desc: "系统性用户研究项目，包含定性访谈、可用性测试及问卷调研。输出用户画像、旅程地图与设计洞察报告，为产品决策提供数据支撑。",
  },
  {
    num: "05",
    title: "视觉设计项目",
    en: "Visual Design Projects",
    tags: ["插画", "大屏", "数据可视化"],
    href: false,
    desc: "涵盖品牌插画、数据可视化大屏、UI视觉规范等多类型视觉设计项目，体现全链路视觉表达与设计执行能力。",
  },
];

const SKILLS = ["交互设计", "视觉设计", "用户研究", "可用性测试", "AI产品设计", "ToB复杂系统设计"];

const TOOLS = [
  { name: "Figma / Sketch", pct: 90 },
  { name: "Gemini / Claude / Replit", pct: 70 },
  { name: "Principal", pct: 70 },
  { name: "Adobe PS / AI", pct: 70 },
];

const VIBE = [
  {
    title: "AI手机系统设计",
    en: "AI Mobile System Design",
    tags: ["AI终端产品设计"],
    desc: "主导北美市场AI手机桌面系统需求定义，完成竞品分析、原型设计，探索AI在移动端的交互范式。",
  },
  {
    title: "个人主页",
    en: "Personal Portfolio Website",
    tags: ["Vibe Coding", "Replit"],
    desc: "使用Replit Vibe coding完成个人主页的设计与上线部署全流程，从设计稿到可交互产品一气呵成。",
  },
  {
    title: "骑马钉拼版检查工具",
    en: "Saddle Stitch Layout Checker",
    tags: ["AI Studio", "Gemini"],
    desc: "使用Google AI Studio中的build功能开发印刷品拼版检查工具，实现本地运行与智能校验。",
  },
];

const NAV_LINKS = [
  { label: "关于我", href: "#about" },
  { label: "项目案例", href: "#projects" },
  { label: "Vibe & AI", href: "#vibe" },
  { label: "设计工具", href: "#tools" },
];

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ProgressBar({ pct, visible }: { pct: number; visible: boolean }) {
  return (
    <div className="h-px bg-[#e0dcd6] w-full relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[#1a1a1a]"
        style={{
          width: visible ? `${pct}%` : "0%",
          transition: visible ? "width 1s ease-out" : "none",
        }}
      />
    </div>
  );
}

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const toolsSection = useVisible();
  const vibeSection = useVisible();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "projects", "vibe", "tools"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function copyEmail() {
    navigator.clipboard.writeText("yijdong@163.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen text-[#1a1a1a] overflow-x-hidden" style={{ background: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,700;0,14..32,900;1,14..32,300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

        html { scroll-behavior: smooth; }

        .project-row {
          border-bottom: 1px solid #e0dcd6;
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
          transition: transform 0.38s cubic-bezier(.16,1,.3,1);
        }
        .project-row:hover::after { transform: scaleX(1); }
        .project-row .proj-num { transition: color 0.2s; }
        .project-row:hover .proj-num { color: #F5A623; }
        .project-row .proj-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .project-row:hover .proj-arrow { opacity: 1; transform: translateX(0); }
        .project-row .proj-desc {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, margin 0.35s ease;
        }
        .project-row:hover .proj-desc {
          max-height: 100px;
          opacity: 1;
          margin-top: 8px;
        }

        .skill-pill {
          display: inline-block;
          border: 1px solid #c8c2bb;
          border-radius: 2px;
          padding: 3px 11px;
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 500;
          color: #5a5550;
          transition: all 0.2s;
          cursor: default;
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
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .vibe-card {
          border: 1px solid #e0dcd6;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .vibe-card:hover {
          border-color: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .photo-wrap img {
          transition: transform 0.7s cubic-bezier(.16,1,.3,1), filter 0.5s;
          filter: grayscale(15%);
        }
        .photo-wrap:hover img {
          transform: scale(1.04);
          filter: grayscale(0%);
        }

        .counter-num { font-feature-settings: 'tnum'; }

        .fade-in {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* NAV */}
      <nav
        className="sticky top-0 z-50 px-8 md:px-12 h-14 flex items-center justify-between border-b border-[#e0dcd6]"
        style={{
          background: scrolled ? "rgba(250,250,248,0.92)" : "#FAFAF8",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
          opacity: loaded ? 1 : 0,
          transitionDelay: loaded ? "0s" : "0s",
        }}
      >
        <span
          className="font-['DM_Serif_Display'] text-[18px] tracking-tight cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Yijun Dong
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              className={`nav-link ${activeSection === l.href.replace("#", "") ? "active text-[#1a1a1a]" : "text-[#888]"}`}
              onClick={() => scrollTo(l.href)}
            >
              {l.label}
            </button>
          ))}
          <button className="text-[11px] font-semibold tracking-widest border border-[#c8c2bb] rounded-sm px-2.5 py-0.5 text-[#5a5550] hover:bg-[#1a1a1a] hover:text-[#FAFAF8] hover:border-[#1a1a1a] transition-colors">
            CN/EN
          </button>
        </nav>
      </nav>

      {/* ABOUT / HERO */}
      <section id="about" className="px-8 md:px-12 pt-16 pb-14 border-b border-[#e0dcd6] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div
            className="fade-in"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase mb-5">
              UX DESIGNER · 产品体验设计师
            </p>
            <h1 className="font-['DM_Serif_Display'] text-[56px] md:text-[68px] leading-[1.05] text-[#1a1a1a] mb-0">
              你好，<br />
              我是<span className="text-[#F5A623]">怡君</span>。
            </h1>
          </div>

          <div
            className="space-y-3 text-[13.5px] text-[#5a5550] leading-[1.75] max-w-[460px]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <p>
              UI/UX全流程设计，深耕交互逻辑与用户体验，可主导需求分析、用户研究、交互设计、视觉设计、可用性测试全链路设计工作。
            </p>
            <p>
              擅长复杂系统的信息架构搭建与任务流程设计，具备华为、奔驰等大型客户ToB系统设计实战经验。
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.48s",
            }}
          >
            {SKILLS.map((s) => (
              <span key={s} className="skill-pill">{s}</span>
            ))}
          </div>

          <div
            className="flex items-center gap-6 text-[12px] text-[#5a5550]"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.58s",
            }}
          >
            <button
              className="flex items-center gap-1.5 hover:text-[#1a1a1a] transition-colors group"
              onClick={copyEmail}
            >
              <span>✉</span>
              <span>yijdong@163.com</span>
              <span className="text-[10px] text-[#aaa] group-hover:text-[#888] transition-colors">
                {copied ? "已复制!" : "点击复制"}
              </span>
            </button>
            <span className="text-[#ddd]">·</span>
            <span>☎ 18092240354</span>
          </div>

          <div
            className="flex gap-3"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.68s",
            }}
          >
            <button className="px-5 py-2.5 bg-[#1a1a1a] text-[#FAFAF8] text-[12px] font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors">
              查看简历
            </button>
            <button
              className="px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-[12px] font-semibold tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-[#FAFAF8] transition-colors"
              onClick={() => scrollTo("#projects")}
            >
              查看作品 →
            </button>
          </div>
        </div>

        {/* Right: photo */}
        <div
          className="md:col-span-5 flex justify-center md:justify-end items-start"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s",
          }}
        >
          <div className="w-full max-w-[260px]">
            <div className="photo-wrap aspect-[3/4] overflow-hidden bg-[#e8e4de]">
              <img
                src={`${BASE}images/photo_me.png`}
                alt="怡君"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between mt-4 border-t border-[#e0dcd6] pt-4">
              {[
                ["5+", "年经验"],
                ["3", "大型客户"],
                ["20+", "项目交付"],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="counter-num text-[18px] font-bold text-[#1a1a1a] leading-none">{n}</div>
                  <div className="text-[10px] text-[#aaa] tracking-wider mt-1 uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-8 md:px-12 py-14 max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">项目案例</h2>
          <div className="h-px flex-1 mx-6 bg-[#e0dcd6]" />
          <span className="text-[11px] text-[#aaa]">{PROJECTS.length} projects</span>
        </div>

        <div className="space-y-0">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-row py-5 flex items-start gap-5 cursor-default"
              onMouseEnter={() => setHoveredProject(p.num)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${0.08 + i * 0.07}s, transform 0.6s ease ${0.08 + i * 0.07}s`,
              }}
            >
              <span className="proj-num counter-num text-[13px] font-bold text-[#ccc] w-8 shrink-0 pt-0.5">
                {p.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-semibold text-[16px] text-[#1a1a1a] leading-snug">{p.title}</span>
                  <span className="text-[11px] text-[#aaa] font-light hidden md:inline">{p.en}</span>
                </div>
                <div className="flex gap-3 mt-1.5 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] text-[#aaa] tracking-[0.1em] uppercase">{t}</span>
                  ))}
                </div>
                <div className="proj-desc text-[12px] text-[#888] leading-relaxed max-w-[540px]">
                  {p.desc}
                </div>
              </div>
              {p.href && (
                <span className="proj-arrow text-[#aaa] text-sm shrink-0 mt-0.5">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIBE CODING */}
      <section
        id="vibe"
        ref={vibeSection.ref}
        className="px-8 md:px-12 py-14 border-t border-[#e0dcd6] max-w-[1200px] mx-auto"
      >
        <div className="flex items-baseline gap-6 mb-10">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">Vibe Coding & AI</h2>
          <div className="h-px flex-1 bg-[#e0dcd6]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VIBE.map((v, i) => (
            <div
              key={v.title}
              className="vibe-card p-6 cursor-default"
              style={{
                opacity: vibeSection.visible ? 1 : 0,
                transform: vibeSection.visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="flex gap-1.5 flex-wrap mb-3">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold tracking-[0.1em] uppercase px-1.5 py-0.5"
                    style={{ background: "rgba(245,166,35,0.12)", color: "#b37d00" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-[15px] mb-2 leading-snug text-[#1a1a1a]">{v.title}</h3>
              <p className="text-[12px] text-[#888] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section
        id="tools"
        ref={toolsSection.ref}
        className="px-8 md:px-12 py-14 border-t border-[#e0dcd6]"
        style={{ background: "#F0EDE8" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-baseline gap-6 mb-10">
            <h2 className="text-[11px] font-semibold tracking-[0.22em] text-[#888] uppercase">设计工具</h2>
            <div className="h-px flex-1 bg-[#ccc]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {TOOLS.map((t, i) => (
              <div
                key={t.name}
                style={{
                  opacity: toolsSection.visible ? 1 : 0,
                  transform: toolsSection.visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div className="flex justify-between mb-2.5 text-[12.5px]">
                  <span className="font-medium text-[#1a1a1a]">{t.name}</span>
                  <span className="text-[#aaa] counter-num">{t.pct}%</span>
                </div>
                <ProgressBar pct={t.pct} visible={toolsSection.visible} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-12 py-8 border-t border-[#e0dcd6] max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-[#aaa]">
        <span className="font-['DM_Serif_Display'] text-[17px] text-[#1a1a1a]">Yijun Dong</span>
        <div className="flex items-center gap-4">
          <button onClick={copyEmail} className="hover:text-[#1a1a1a] transition-colors">
            yijdong@163.com
          </button>
          <span>·</span>
          <span>18092240354</span>
        </div>
        <span>© 2024 · UX Designer</span>
      </footer>
    </div>
  );
}
