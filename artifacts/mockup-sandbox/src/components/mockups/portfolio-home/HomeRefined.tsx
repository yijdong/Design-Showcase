import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, MousePointer2, Layers, Users, ClipboardCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VIBE_PROJECTS = [
  { id: 1, title: "个人主页", description: "探索现代 Web 开发与 AI 辅助设计的边界。", tags: ["Vibe Coding", "Replit"] },
  { id: 2, title: "Emo AI", description: "通过情感计算带来更温暖的 AI 交互体验。", tags: ["AI", "Product Design"] },
];

const COMMERCIAL_PROJECTS = [
  { id: 1, title: "企业协作平台重设计", date: "2024", description: "重构核心工作流，提升 30% 跨部门协作效率。", tags: ["B2B", "工作流"] },
  { id: 2, title: "AI 数据看板", date: "2024", description: "将复杂的企业数据转化为直观的业务洞察。", tags: ["AI", "Dashboard"] },
];

const SKILLS = [
  { cap: { icon: MousePointer2, title: "交互设计" }, tool: { name: "Figma·Sketch", level: "精通", pct: 90 } },
  { cap: { icon: Layers, title: "视觉设计" }, tool: { name: "AI原型", level: "熟练", pct: 70 } },
  { cap: { icon: Users, title: "用户研究" }, tool: { name: "Principal·动效", level: "熟练", pct: 70 } },
  { cap: { icon: ClipboardCheck, title: "可用性测试" }, tool: { name: "Adobe PS·AI", level: "熟练", pct: 70 } },
];

function ProgressBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <div className="relative h-[4px] w-full rounded-full overflow-hidden bg-black/15">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-foreground/80 transition-[width] duration-700 ease-out"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

function SkillsSection() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="w-full py-10 relative overflow-hidden" 
      style={{ 
        backgroundColor: "hsl(42 88% 60%)",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "16px 16px"
      }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Column headers */}
        <div className="grid grid-cols-2 gap-8 md:gap-12 mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/50">
            我会做什么
          </h2>
          <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/50">
            我使用的设计工具
          </h2>
        </div>

        {/* Paired rows */}
        <div className="flex flex-col gap-1">
          {SKILLS.map(({ cap, tool }, i) => {
            const Icon = cap.icon;
            return (
              <div key={i} className="grid grid-cols-2 gap-8 md:gap-12 py-3 items-center">
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 rounded bg-foreground/5 p-1.5 text-foreground/75">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="font-semibold text-foreground/90 text-sm">
                    {cap.title}
                  </span>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-foreground text-sm leading-snug">
                      {tool.name}
                    </span>
                    <span className="text-xs font-medium text-foreground/55 shrink-0">{tool.level}</span>
                  </div>
                  <ProgressBar pct={tool.pct} animate={animated} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, index, showDate = false }: { project: any; index: number; showDate?: boolean }) {
  const displayIndex = String(index + 1).padStart(2, "0");
  
  return (
    <a href="#" className="group block outline-none">
      <article className="relative flex items-stretch overflow-hidden rounded-2xl border border-border/60 bg-white transition-all duration-300 hover:border-foreground/15 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Left: text content */}
        <div className="flex-1 min-w-0 p-8 flex gap-6 transition-all duration-500">
          <div className="pt-1.5 hidden sm:block text-muted-foreground/40 font-mono text-sm">
            {displayIndex}
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {showDate && project.date && (
              <span className="text-xs font-medium text-amber-600 tracking-wide">
                {project.date}
              </span>
            )}

            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-amber-600 transition-colors duration-300 leading-tight">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full border border-border/50 text-xs font-medium text-foreground/60 bg-stone-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: image reveal */}
        <div className="w-0 overflow-hidden shrink-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[38%]">
          <div className="h-full w-[100%] min-w-[240px] relative bg-gradient-to-br from-amber-100 to-rose-50">
            {/* Arrow indicator */}
            <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 shadow-sm">
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}

export function HomeRefined() {
  return (
    <div className="min-h-screen bg-[#faf6ee] text-gray-900 font-sans selection:bg-amber-200">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="flex-1 space-y-7">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              你好，我是 <span className="text-amber-500">怡君</span>。<br />
              UX 设计师。
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              专注设计复杂 B2B 系统与 AI 产品，让混乱变得清晰。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 text-sm font-semibold transition-colors shadow-sm">
              <Download className="w-4 h-4" /> 下载简历
            </button>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
              查看项目 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative shrink-0"
        >
          {/* Amber offset decorative square */}
          <div className="absolute inset-0 bg-amber-400 rounded-[2rem] rotate-6 scale-[1.02] origin-center opacity-90 shadow-lg" />
          
          {/* Photo frame */}
          <div className="w-56 h-56 md:w-64 md:h-64 relative rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-gradient-to-tr from-amber-300 to-rose-300 z-10" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Vibe Coding Preview */}
      <section className="mt-20 md:mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-amber-500" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Vibe Coding & AI</h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {VIBE_PROJECTS.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* Commercial Projects Preview */}
      <section className="mt-20 md:mt-28 mb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-amber-500" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">商业项目</h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {COMMERCIAL_PROJECTS.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} showDate={true} />
          ))}
        </div>
      </section>

    </div>
  );
}
