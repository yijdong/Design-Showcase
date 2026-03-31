import { useEffect, useRef, useState } from "react";
import { MousePointer2, Layers, Users, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const PAIRS = {
  zh: [
    {
      cap: { icon: MousePointer2, title: "交互设计" },
      tool: { name: "Figma / Sketch", extra: null, level: "精通", pct: 90 },
    },
    {
      cap: { icon: Layers, title: "视觉设计" },
      tool: { name: "Gemini / Claude / Replit", extra: "(AI原型)", level: "熟练", pct: 70 },
    },
    {
      cap: { icon: Users, title: "用户研究" },
      tool: { name: "Principal", extra: "(动效)", level: "熟练", pct: 70 },
    },
    {
      cap: { icon: ClipboardCheck, title: "可用性测试" },
      tool: { name: "Adobe PS / AI", extra: null, level: "熟练", pct: 70 },
    },
  ],
  en: [
    {
      cap: { icon: MousePointer2, title: "Interaction Design" },
      tool: { name: "Figma / Sketch", extra: null, level: "Expert", pct: 90 },
    },
    {
      cap: { icon: Layers, title: "Visual Design" },
      tool: { name: "Gemini / Claude / Replit", extra: "(AI Prototyping)", level: "Proficient", pct: 70 },
    },
    {
      cap: { icon: Users, title: "User Research" },
      tool: { name: "Principal", extra: "(Motion Design)", level: "Proficient", pct: 70 },
    },
    {
      cap: { icon: ClipboardCheck, title: "Usability Testing" },
      tool: { name: "Adobe PS / AI", extra: null, level: "Proficient", pct: 70 },
    },
  ],
};

const SECTION_TITLES = {
  zh: { capabilities: "我会做什么", tools: "我使用的设计工具" },
  en: { capabilities: "What I Do", tools: "Design Tools I Use" },
};

function ProgressBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <div className="relative h-[5px] w-full rounded-full overflow-hidden bg-black/20">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-foreground/75 transition-[width] duration-700 ease-out"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export function SkillsSection() {
  const { lang } = useLanguage();
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

  const pairs = PAIRS[lang];
  const titles = SECTION_TITLES[lang];

  return (
    <div className="w-full py-14" style={{ backgroundColor: "hsl(42 88% 60%)" }}>
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Column headers */}
        <div className="grid grid-cols-2 gap-8 md:gap-16 mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/55">
            {titles.capabilities}
          </h2>
          <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/55">
            {titles.tools}
          </h2>
        </div>

        {/* Paired rows — no dividers */}
        <div>
          {pairs.map(({ cap, tool }, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="grid grid-cols-2 gap-8 md:gap-16 py-4 items-center"
              >
                {/* Left — capability */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 rounded-lg p-2 bg-foreground/10 text-foreground/75">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <span className="font-semibold text-foreground/90 text-sm">
                    {cap.title}
                  </span>
                </div>

                {/* Right — tool */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-foreground text-sm leading-snug">
                      {tool.name}
                      {tool.extra && (
                        <span className="font-normal text-foreground/55 text-xs ml-1">{tool.extra}</span>
                      )}
                    </span>
                    <span className="text-xs text-foreground/55 shrink-0">{tool.level}</span>
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
