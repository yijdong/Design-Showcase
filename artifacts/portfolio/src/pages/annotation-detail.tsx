import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid, RefreshCw, Network } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/lib/language-context";

const BASE = import.meta.env.BASE_URL;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function FeatureCards() {
  const cards = [
    {
      icon: <LayoutGrid className="w-5 h-5" />,
      title: "多模态标注能力",
      desc: "覆盖文本、多模态、智能体等复杂题型",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "完整质量闭环",
      desc: "标注-质检-审核-返修-数据入库",
    },
    {
      icon: <Network className="w-5 h-5" />,
      title: "规模化人力调度",
      desc: "支持场内+垂类兼职+专家人员协同作业",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {cards.map((c) => (
        <div key={c.title} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            {c.icon}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-1">{c.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const USER_PERSONAS = [
  {
    img: "user01.png",
    name: "管理人员",
    desc: "配置任务、规则与人员体系",
  },
  {
    img: "user02.png",
    name: "标注人员",
    desc: "完成具体数据标注任务",
  },
  {
    img: "user03.png",
    name: "质检/审核人员",
    desc: "对标注结果进行多级质量把控",
  },
];

function UsersSection() {
  return (
    <div className="flex flex-col sm:flex-row gap-8">
      {USER_PERSONAS.map((u) => (
        <div key={u.name} className="flex items-center gap-4">
          <img
            src={`${BASE}images/${u.img}`}
            alt={u.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="font-semibold text-base text-foreground">{u.name}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{u.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const PHASES = [
  { num: "01", label: "项目创建与规则准备", colorClass: "bg-slate-50 border-t-4 border-slate-400" },
  { num: "02", label: "人员匹配与入场", colorClass: "bg-emerald-50 border-t-4 border-emerald-400" },
  { num: "03", label: "标注执行", colorClass: "bg-blue-50 border-t-4 border-blue-400" },
  { num: "04", label: "质检与审核", colorClass: "bg-amber-50 border-t-4 border-amber-400" },
  { num: "05", label: "结算与闭环", colorClass: "bg-gray-50 border-t-4 border-gray-400" },
];

const MATRIX: Record<string, string[][]> = {
  manager: [
    ["创建项目与任务目标", "配置标注题型", "定义质量标准"],
    ["筛选合适标注人员", "发布或定向分发任务"],
    ["查看整体进度", "关注异常与产能"],
    ["抽检或终审结果", "控制整体质量水平"],
    ["确认完成情况", "放行结算流程"],
  ],
  annotator: [
    [],
    ["浏览任务信息", "报名并完成认证", "获得角色与权限"],
    ["领取标注任务", "进行标注任务"],
    ["提交前自查结果", "根据提示修正问题"],
    ["查看收益明细", "完成任务闭环"],
  ],
  system: [
    ["题型配置", "★ AI 预检规则配置"],
    ["储备人才库", "人才能力校验与资质审核", "角色权限分配", "★ 人才招募与报名"],
    ["图片标注 / 划词", "★ 多轮对话智能体标注"],
    ["★ AI 预检浮窗"],
    ["任务与费用汇总", "结算与账单展示"],
  ],
};

const ROLE_LABELS = [
  { key: "manager", label: "管理者", sub: "Manager", colorClass: "text-blue-700 bg-blue-50" },
  { key: "annotator", label: "标注员", sub: "Annotator", colorClass: "text-emerald-700 bg-emerald-50" },
  { key: "system", label: "系统支持", sub: "System", colorClass: "text-gray-600 bg-gray-50" },
];

function WorkflowMatrix() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="min-w-[900px] w-full border-collapse bg-white text-sm">
        <thead>
          <tr>
            <th className="w-28 bg-slate-100 text-slate-500 text-[10px] uppercase tracking-widest font-semibold p-4 border-b border-r border-slate-200 text-left">
              角色 / 阶段
            </th>
            {PHASES.map((p) => (
              <th key={p.num} className={`p-4 text-left border-b border-r border-slate-100 ${p.colorClass}`}>
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70 mb-0.5">
                  PHASE {p.num}
                </span>
                <span className="text-sm font-semibold text-slate-800">{p.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLE_LABELS.map((role) => (
            <tr key={role.key}>
              <td className={`p-4 border-b border-r border-slate-100 font-semibold text-xs text-center align-middle sticky left-0 z-10 ${role.colorClass}`}>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-bold">{role.label}</span>
                  <span className="text-[9px] opacity-60 font-normal">{role.sub}</span>
                </div>
              </td>
              {MATRIX[role.key].map((items, pi) => (
                <td key={pi} className="p-4 border-b border-r border-slate-50 align-top">
                  {items.length === 0 ? (
                    <span className="text-xs text-slate-300 italic">—</span>
                  ) : (
                    <ul className="space-y-1.5">
                      {items.map((item, ii) => (
                        <li key={ii} className={`text-xs leading-relaxed ${item.startsWith("★") ? "font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded" : "text-slate-600 pl-3 relative before:absolute before:left-0 before:top-[0.45rem] before:w-1 before:h-1 before:rounded-full before:bg-slate-300"}`}>
                          {item.startsWith("★") ? item.slice(2) : item}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CAROUSEL_SLIDES = [
  { key: "agent1", title: "agent1", img: `${BASE}images/agent1.png` },
  { key: "agent2", title: "agent2", img: `${BASE}images/agent2.png` },
];

function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const slide = CAROUSEL_SLIDES[index];

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-card">
      <div className="relative">
        <img
          src={slide.img}
          alt={slide.title}
          className="w-full object-contain"
        />
        {CAROUSEL_SLIDES.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-foreground hover:bg-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % CAROUSEL_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-foreground hover:bg-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/30">
        <span className="text-sm font-medium text-foreground">{slide.title}</span>
        <div className="flex gap-1.5">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-muted-foreground/30"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnnotationPlatformDetail() {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  const title = isZh ? "AI数据标注平台" : "AI Annotation Platform";
  const description = isZh
    ? "作为平台核心交互设计师，负责标注端与管理端的关键体验设计"
    : "Core interaction designer for the annotation platform; responsible for key experience design on both annotator-side and management-side.";

  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> {isZh ? "← 返回项目案例" : "← Back to Projects"}
        </Link>

        <div className="space-y-6 mb-16">
          <div className="flex flex-wrap gap-2">
            <Pill>AI 数据标注平台</Pill>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden bg-card border border-border shadow-md mb-20">
          <img
            src={`${BASE}images/Annotation Platform.png`}
            alt={title}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-20">

          <Section title={isZh ? "背景" : "Background"}>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground/90">
                {isZh
                  ? "标注平台通过完善的标注、质检、审核流程，支持多角色高效协作，保障数据生产过程稳定、可控，持续输出高质量标注结果，并配套精细化的项目管理与数据统计，全面提升标注效率与管理可视性。"
                  : "The AI data annotation platform supports multi-role collaboration through a complete annotation, quality inspection, and review workflow, ensuring stable and controllable data production while continuously delivering high-quality annotation results."}
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                {isZh
                  ? "提供灵活且可扩展的标注能力，支持自定义模板与组件配置，覆盖文本、图像、音频、视频等多模态标注场景。"
                  : "It offers flexible and extensible annotation capabilities with customizable templates and component configurations, covering multi-modal scenarios including text, image, audio, and video."}
              </p>
            </div>
            <FeatureCards />
          </Section>

          <Section title={isZh ? "用户" : "Users"}>
            <UsersSection />
          </Section>

          <Section title={isZh ? "业务全流程概览" : "End-to-End Business Flow"}>
            <WorkflowMatrix />
          </Section>

          <Section title={isZh ? "核心问题" : "Core Problems"}>
            <p className="text-lg leading-relaxed text-foreground/90 border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
              {isZh
                ? "专业人力难调度、复杂内容难标、质量难控"
                : "Skilled workforce hard to schedule, complex content hard to annotate, quality hard to control."}
            </p>
          </Section>

          <Section title={isZh ? "我的角色" : "My Role"}>
            <p className="text-lg leading-relaxed font-medium text-foreground">
              {isZh ? "交互设计师" : "Interaction Designer"}
            </p>
          </Section>

          <Section title={isZh ? "设计过程" : "Design Process"}>
            <p className="text-lg leading-relaxed text-foreground/90">
              {isZh
                ? "需求分析 → 竞品研究 → 交互设计 → 设计评审 → 开发交付"
                : "Requirement Analysis → Competitive Research → Interaction Design → Design Review → Handoff"}
            </p>
          </Section>

          <Section title={isZh ? "关键方案" : "Key Solutions"}>
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {isZh ? "智能体组件体验优化" : "Agent Component Experience Optimization"}
                  </h3>
                </div>
                <ImageCarousel />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {isZh ? "AI预检规则配置" : "AI Pre-check Rule Configuration"}
                  </h3>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border shadow-md">
                  <img
                    src={`${BASE}images/check.png`}
                    alt={isZh ? "AI预检规则配置" : "AI Pre-check Rule Configuration"}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title={isZh ? "成果与影响" : "Outcome & Impact"}>
            <p className="text-xl md:text-2xl leading-relaxed font-display font-medium text-primary-foreground">
              "{isZh ? "提升了AI数据标注平台的标注效率与质量可控性" : "Improved annotation efficiency and quality control for the AI data annotation platform."}"
            </p>
          </Section>

        </div>
      </div>
    </PageTransition>
  );
}
