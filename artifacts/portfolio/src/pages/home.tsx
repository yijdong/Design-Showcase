import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { Link } from "wouter";
import { Phone, Mail, Copy, Check, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { VIBE_PROJECTS } from "@/lib/data";
import { SkillsSection } from "@/components/ui/skills-section";
import {
  AnnotationIllustration,
  HuaweiIllustration,
  MercedesIllustration,
  UserResearchGallery,
  VisualDesignGallery,
} from "@/components/ui/project-illustrations";

const BASE = import.meta.env.BASE_URL;

/* ═══════════════════════════════════════════
   Shared scroll-fade hook (IntersectionObserver)
   ═══════════════════════════════════════════ */
function useScrollFade(stagger = 80) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.querySelectorAll<HTMLElement>("[data-fade]"));

    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      child.style.transition = `opacity 0.6s ease-out ${i * stagger}ms, transform 0.6s ease-out ${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}

/* ═══════════════════════════════════════════
   Clipboard toast
   ═══════════════════════════════════════════ */
function useClipboardToast() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setCopied(false), 300);
    }, 1500);
  }, []);

  const Toast = (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium rounded-full shadow-xl pointer-events-none transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)",
      }}
    >
      <Check className="w-4 h-4" />
      已复制
    </div>
  );

  return { copy, Toast };
}

/* ═══════════════════════════════════════════
   Text Carousel
   ═══════════════════════════════════════════ */
const ADVANTAGES_ZH = [
  "UI/UX全流程设计：深耕交互逻辑与用户体验，可主导需求分析、用户研究、交互设计、视觉设计、可用性测试全链路设计工作。",
  "ToB复杂系统设计：擅长复杂系统的信息架构搭建与任务流程设计，具备华为、奔驰等大型客户ToB系统设计实战经验。",
  "AI产品设计：可将AI能力转化为清晰、可落地的交互方案，支撑多角色协作与复杂系统稳定运行。善于运用AI生图、Vibe coding等工具。",
  "设计规范与组件库：擅长企业级设计规范制定与标准化组件库搭建，可输出可复用的设计标准及清晰的交互文档。",
];

const ADVANTAGES_EN = [
  "End-to-End UI/UX Design: Deep expertise in interaction logic and UX, leading the full design cycle from requirements analysis to usability testing.",
  "Complex ToB System Design: Skilled in information architecture and task-flow design for enterprise systems. Hands-on experience with Huawei, Mercedes-Benz, and more.",
  "AI Product Design: Translating AI capabilities into clear, actionable interaction solutions. Proficient with AI image generation and Vibe coding tools.",
  "Design Systems & Component Libraries: Building enterprise-grade design systems and reusable component libraries with clear interaction documentation.",
];

function TextCarousel({ lang }: { lang: "zh" | "en" }) {
  const items = lang === "zh" ? ADVANTAGES_ZH : ADVANTAGES_EN;
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [next, setNext] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setNext((current + 1) % items.length);
      setExiting(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % items.length);
        setExiting(false);
      }, 400);
    }, 2500);
    return () => clearInterval(timer);
  }, [current, items.length]);

  return (
    <div className="relative h-[110px] overflow-hidden">
      {/* Exiting text */}
      <p
        key={`exit-${current}`}
        className="absolute inset-0 text-lg text-muted-foreground leading-relaxed transition-all duration-400 ease-in-out"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {items[current]}
      </p>
      {/* Entering text (pre-positioned below) */}
      {exiting && (
        <p
          key={`enter-${next}`}
          className="absolute inset-0 text-lg text-muted-foreground leading-relaxed transition-all duration-400 ease-in-out"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            animation: "slideInUp 0.4s ease-out forwards",
          }}
        >
          {items[next]}
        </p>
      )}
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Floating avatar tags
   ═══════════════════════════════════════════ */
const SKILL_TAGS_ZH = [
  "交互设计", "视觉设计", "用户研究", "可用性测试",
  "AI产品设计", "ToB复杂系统设计", "组件库搭建",
];
const SKILL_TAGS_EN = [
  "Interaction Design", "Visual Design", "User Research", "Usability Testing",
  "AI Product Design", "ToB System Design", "Component Library",
];

/* Positions around the avatar (percentages) */
const TAG_POSITIONS = [
  { top: "-18%", left: "5%", delay: 0 },
  { top: "-10%", right: "-5%", delay: 0.6 },
  { top: "20%", left: "-12%", delay: 1.2 },
  { top: "22%", right: "-22%", delay: 0.3 },
  { top: "60%", left: "-8%", delay: 0.9 },
  { top: "65%", right: "-18%", delay: 1.5 },
  { top: "104%", left: "20%", delay: 0.4 },
];

function FloatingTags({ lang }: { lang: "zh" | "en" }) {
  const tags = lang === "zh" ? SKILL_TAGS_ZH : SKILL_TAGS_EN;
  return (
    <>
      {tags.map((tag, i) => {
        const pos = TAG_POSITIONS[i];
        return (
          <span
            key={tag}
            className="absolute whitespace-nowrap px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-full text-xs font-semibold text-foreground shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-200 cursor-default"
            style={{
              ...pos,
              animation: `floatBob 3s ease-in-out infinite alternate`,
              animationDelay: `${pos.delay}s`,
            }}
          >
            {tag}
          </span>
        );
      })}
      <style>{`
        @keyframes floatBob {
          from { transform: translateY(0px); }
          to   { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════
   Projects section data
   ═══════════════════════════════════════════ */
interface HomeProject {
  id: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  tagsZh: string[];
  tagsEn: string[];
  detailHref?: string;
  illustration: ReactNode;
}

const PANEL_HEIGHT = 620;

function ProjectsSection({ lang }: { lang: "zh" | "en" }) {
  const projects: HomeProject[] = [
    {
      id: "ernie-annotation",
      titleZh: "AI数据标注平台",
      titleEn: "AI Annotation Platform",
      descZh: "作为平台核心交互设计师，负责标注端与管理端的关键体验设计，重点解决「专业人力难调度、复杂内容难标、质量难控」三类核心问题。",
      descEn: "As core interaction designer for the platform, responsible for key experience design on both annotator-side and management-side, focusing on scheduling, annotation complexity, and quality control.",
      tagsZh: ["交互设计", "AI后台产品设计", "交互文档输出"],
      tagsEn: ["Interaction Design", "AI Backend Product", "Documentation"],
      detailHref: "/projects/ernie-annotation",
      illustration: <AnnotationIllustration />,
    },
    {
      id: "huawei",
      titleZh: "全球化企业设备管理平台",
      titleEn: "Global Enterprise Device Platform",
      descZh: "作为用户体验设计师的角色，独立负责企业设备管理平台的全流程设计工作，包括分析产品需求、交互设计、视觉设计以及后续跟进开发的工作。",
      descEn: "Independently responsible for end-to-end design of an enterprise device management platform, including requirements analysis, interaction design, visual design, and development follow-up.",
      tagsZh: ["ToB 复杂系统设计", "0-1产品设计", "场景化设计方法"],
      tagsEn: ["ToB Complex Systems", "0-1 Product Design", "Scenario Design"],
      detailHref: "/projects/huawei",
      illustration: <HuaweiIllustration />,
    },
    {
      id: "mercedes-benz",
      titleZh: "汽车金融服务平台",
      titleEn: "Automotive Finance Platform",
      descZh: "作为用户体验设计师的角色，参与汽车金融服务平台数字化全周期产品的交互设计、视觉设计工作，包括售前、售中、售后等各个阶段的多个数字化产品。",
      descEn: "Participated in interaction and visual design for a full digital lifecycle automotive finance platform, covering pre-sale, in-sale, and after-sale digital products.",
      tagsZh: ["体验重塑", "用户旅程地图"],
      tagsEn: ["Experience Redesign", "User Journey Map"],
      detailHref: "/projects/mercedes-benz",
      illustration: <MercedesIllustration />,
    },
    {
      id: "user-research",
      titleZh: "用户研究项目",
      titleEn: "User Research Project",
      descZh: "作为用户体验设计师加入到某新能源汽车用户研究项目中，参与了从用户访谈材料准备、用户跟拍、需求分析、用户访谈、访谈数据处理，到可用性测试的完整设计流程。",
      descEn: "Joined an EV user research project covering the full cycle from interview prep and user shadowing, to requirements analysis, interviews, data processing, and usability testing.",
      tagsZh: ["用户研究", "用户访谈", "可用性测试"],
      tagsEn: ["User Research", "User Interview", "Usability Testing"],
      illustration: <UserResearchGallery lang={lang} />,
    },
    {
      id: "visual-design",
      titleZh: "视觉设计项目",
      titleEn: "Visual Design Projects",
      descZh: "除擅长的交互设计项目外，也参与过插画设计、大屏设计、数字孪生组态图设计等视觉设计任务。",
      descEn: "Beyond interaction design, also participated in illustration, large-screen UI, and digital twin configuration design projects.",
      tagsZh: ["插画", "大屏", "数据可视化"],
      tagsEn: ["Illustration", "Big Screen", "Data Visualization"],
      illustration: <VisualDesignGallery lang={lang} />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef(false);

  const switchTo = useCallback((idx: number) => {
    if (idx === selected || idx < 0 || idx >= projects.length) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayIdx(idx);
      setSelected(idx);
      setAnimating(false);
    }, 200);
  }, [selected, projects.length]);

  /* Scroll wheel switching */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isAtLast = selected === projects.length - 1;
      const isAtFirst = selected === 0;

      if (e.deltaY > 0 && isAtLast) {
        /* Let page scroll naturally */
        return;
      }
      if (e.deltaY < 0 && isAtFirst) {
        return;
      }

      e.preventDefault();

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => { throttleRef.current = false; }, 500);

      if (e.deltaY > 0) {
        switchTo(selected + 1);
      } else {
        switchTo(selected - 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [selected, projects.length, switchTo]);

  const current = projects[displayIdx];

  return (
    <div ref={sectionRef} className="flex gap-0" style={{ height: PANEL_HEIGHT }}>
      {/* Left: project list */}
      <div
        className="w-[320px] shrink-0 border-r border-border/60 overflow-y-auto"
      >
        {projects.map((p, i) => {
          const active = selected === i;
          return (
            <button
              key={p.id}
              onClick={() => switchTo(i)}
              className={cn(
                "w-full text-left px-6 py-5 relative transition-all duration-200 focus:outline-none",
                active
                  ? "bg-primary/8 font-semibold"
                  : "opacity-70 hover:opacity-100 hover:bg-muted/40"
              )}
            >
              {/* Left highlight bar */}
              <span
                className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-primary transition-opacity duration-200"
                style={{ opacity: active ? 1 : 0 }}
              />
              <h3 className={cn("text-sm leading-snug mb-1", active ? "font-bold text-foreground" : "font-medium text-foreground/80")}>
                {lang === "zh" ? p.titleZh : p.titleEn}
              </h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {(lang === "zh" ? p.tagsZh : p.tagsEn).map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-foreground/8 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Right: illustration + description */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Illustration */}
        <div
          className="flex-1 overflow-auto"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(0.98)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {current.illustration}
        </div>

        {/* Description + link */}
        <div
          className="px-6 py-4 border-t border-border/40 bg-background/50 shrink-0"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {lang === "zh" ? current.descZh : current.descEn}
          </p>
          {current.detailHref && (
            <Link
              href={current.detailHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              {lang === "zh" ? "查看详情" : "View Details"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   Main Home component
   ═══════════════════════════════════════════ */
export default function Home() {
  const { lang } = useLanguage();
  const { copy, Toast } = useClipboardToast();

  const aboutRef = useScrollFade(80);
  const projectsRef = useScrollFade(60);
  const aiRef = useScrollFade(60);
  const skillsRef = useScrollFade(60);

  return (
    <div className="min-h-screen" style={{ animation: "pageFadeIn 0.8s ease-out forwards" }}>
      <style>{`@keyframes pageFadeIn{from{opacity:0}to{opacity:1}}`}</style>
      {Toast}

      {/* ─── #about ─────────────────────── */}
      <section id="about" className="pt-24 pb-20">
        <div ref={aboutRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">

          {/* Left: text */}
          <div className="flex-1 space-y-8 min-w-0">
            <div data-fade className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                {lang === "zh" ? <>你好，我是 <span className="text-primary">怡君</span>。</> : <>Hi, I'm <span className="text-primary">Yijun</span>.</>}
              </h1>
              <p className="text-xl font-medium text-foreground/70">
                {lang === "zh" ? "UX 设计师" : "UX Designer"}
              </p>
            </div>

            {/* Text carousel */}
            <div data-fade>
              <TextCarousel lang={lang} />
            </div>

            {/* Contact */}
            <div data-fade className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <span>18092240354</span>
                <button
                  onClick={() => copy("18092240354")}
                  className="ml-1 p-1 rounded hover:bg-muted transition-colors"
                  title={lang === "zh" ? "复制" : "Copy"}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                <span>yijdong@163.com</span>
                <button
                  onClick={() => copy("yijdong@163.com")}
                  className="ml-1 p-1 rounded hover:bg-muted transition-colors"
                  title={lang === "zh" ? "复制" : "Copy"}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div data-fade className="flex flex-wrap gap-4">
              <Link href="/resume">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:scale-103 hover:shadow-lg transition-all duration-200">
                  <FileText className="w-4 h-4" />
                  {lang === "zh" ? "查看简历" : "View Resume"}
                </button>
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-semibold rounded-full hover:scale-103 hover:shadow-lg hover:bg-muted/50 transition-all duration-200"
              >
                {lang === "zh" ? "查看作品" : "View Portfolio"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: avatar + floating tags */}
          <div data-fade className="shrink-0 relative w-72 h-72 md:w-80 md:h-80">
            {/* Avatar */}
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
              <img
                src={`${BASE}images/home/photo_me.png`}
                alt="Yijun Dong"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            {/* Floating tags */}
            <FloatingTags lang={lang} />
          </div>
        </div>
      </section>

      {/* ─── #projects ──────────────────── */}
      <section id="projects" className="py-20 border-t border-border/40">
        <div ref={projectsRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div data-fade className="mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">
              {lang === "zh" ? "项目案例" : "Projects"}
            </h2>
            <p className="text-muted-foreground">
              {lang === "zh" ? "从需求到落地的完整设计实践" : "Complete design practice from requirements to delivery"}
            </p>
          </div>
          <div data-fade className="border border-border/60 rounded-2xl overflow-hidden">
            <ProjectsSection lang={lang} />
          </div>
        </div>
      </section>

      {/* ─── #ai ────────────────────────── */}
      <section id="ai" className="py-20 border-t border-border/40">
        <div ref={aiRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div data-fade className="mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">Vibe Coding & AI</h2>
            <p className="text-muted-foreground">
              {lang === "zh"
                ? "探索 AI 辅助设计与快速原型制作的前沿。"
                : "Exploring the frontier of AI-assisted design and rapid prototyping."}
            </p>
          </div>
          <div className="space-y-0 divide-y divide-border/40">
            {VIBE_PROJECTS.map((item) => (
              <article
                key={item.id}
                data-fade
                className="group py-8 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-wrap gap-2">
                  {(lang === "zh" ? (item.tagsZh ?? item.tags) : item.tags).map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors duration-200">
                  {lang === "zh" ? item.titleZh : item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                  {lang === "zh" ? item.descriptionZh : item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─────────────────────── */}
      <div id="skills" ref={skillsRef}>
        <SkillsSection />
      </div>
    </div>
  );
}
