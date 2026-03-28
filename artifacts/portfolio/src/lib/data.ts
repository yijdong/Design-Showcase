export type Tag = string;

export interface ProjectDetails {
  background: string;
  backgroundZh: string;
  problem: string;
  problemZh: string;
  role: string;
  roleZh: string;
  process: string;
  processZh: string;
  solutions: Array<{ title: string; titleZh: string; description: string; descriptionZh: string }>;
  outcome: string;
  outcomeZh: string;
}

export interface Project {
  id: string;
  type: 'commercial' | 'vibe';
  title: string;
  titleZh: string;
  tags: Tag[];
  tagsZh?: Tag[];
  date?: string;
  description: string;
  descriptionZh: string;
  coverImage: string;
  details: ProjectDetails;
}

export interface Article {
  id: string;
  title: string;
  titleZh: string;
  date: string;
  dateZh: string;
  summary: string;
  summaryZh: string;
  content: string;
  contentZh: string;
}

export const VIBE_PROJECTS: Project[] = [
  {
    id: "personal-website",
    type: "vibe",
    title: "Personal Website",
    titleZh: "个人主页",
    tags: ["Vibe Coding", "Replit"],
    description: "Designed and deployed this personal portfolio from scratch using Replit — a full end-to-end Vibe Coding experience.",
    descriptionZh: "使用Vibe coding工具Replit完成个人主页的设计与上线部署全流程。",
    coverImage: "project-cover-2.png",
    details: {
      background: "Wanted a personal portfolio that reflected both my design sensibility and my ability to ship real products.",
      backgroundZh: "希望打造一个能体现我设计审美与落地能力的个人作品集网站。",
      problem: "Most portfolio templates are generic and don't allow for the nuanced storytelling a UX designer needs.",
      problemZh: "大多数作品集模板过于通用，无法满足 UX 设计师所需的深度叙事。",
      role: "Designer & Vibe Coder",
      roleZh: "设计师 & Vibe Coder",
      process: "Design → Vibe Coding (Replit) → Deploy",
      processZh: "设计 → Vibe Coding（Replit）→ 上线部署",
      solutions: [
        {
          title: "Bilingual Support",
          titleZh: "双语支持",
          description: "Full CN/EN toggle throughout the entire site.",
          descriptionZh: "全站中英文切换支持。"
        },
        {
          title: "Full Deployment",
          titleZh: "完整部署",
          description: "Shipped a live production site via Replit in one session.",
          descriptionZh: "通过 Replit 在一次开发中完成了生产环境部署。"
        }
      ],
      outcome: "Live portfolio site built and deployed entirely through Vibe Coding — no traditional dev environment needed.",
      outcomeZh: "完全通过 Vibe Coding 完成构建与部署的在线作品集网站，无需传统开发环境。"
    }
  },
  {
    id: "ai-phone-system",
    type: "vibe",
    title: "AI Mobile System Design",
    titleZh: "AI 手机系统设计",
    tags: ["AI 终端产品设计"],
    description: "Led requirements definition for an AI mobile desktop system targeting the North American market, including competitor analysis and prototype design.",
    descriptionZh: "AI 手机系统设计；主导北美市场 AI 手机桌面系统需求定义，完成竞品分析、原型设计。",
    coverImage: "project-cover-2.png",
    details: {
      background: "The client needed a next-generation AI-native mobile OS experience targeting North American consumers.",
      backgroundZh: "客户需要一款面向北美消费者的下一代 AI 原生手机系统体验。",
      problem: "Existing AI phone features feel bolted-on rather than seamlessly integrated into the core OS.",
      problemZh: "现有 AI 手机功能感觉是后加的，而非无缝融入系统核心。",
      role: "Product Manager & UX Designer",
      roleZh: "产品经理 & UX 设计师",
      process: "User Interviews → Competitor Analysis → Requirements Definition → Prototype Design",
      processZh: "用户访谈 → 竞品分析 → 需求定义 → 原型设计",
      solutions: [
        {
          title: "AI-First Navigation",
          titleZh: "AI 优先导航",
          description: "Redesigned the home screen paradigm around proactive AI suggestions.",
          descriptionZh: "围绕主动式 AI 建议重新设计了桌面系统范式。"
        },
        {
          title: "Context Awareness",
          titleZh: "情境感知",
          description: "System learns usage patterns to surface the right tools at the right time.",
          descriptionZh: "系统学习使用习惯，在合适时机呈现合适工具。"
        }
      ],
      outcome: "Delivered a comprehensive prototype and requirements document used as the foundation for the engineering sprint.",
      outcomeZh: "交付了完整的原型与需求文档，作为工程冲刺的基础。"
    }
  },
  {
    id: "saddle-stitch-checker",
    type: "vibe",
    title: "Saddle Stitch Layout Checker",
    titleZh: "骑马钉拼版检查工具",
    tags: ["AI Studio", "Gemini"],
    description: "Built using AI Studio's build feature, with local runtime support achieved.",
    descriptionZh: "使用Vibe coding工具AI Studio中的build功能开发，并实现了本地运行。",
    coverImage: "project-cover-2.png",
    details: {
      background: "Print designers manually check saddle stitch imposition layouts — a tedious, error-prone process.",
      backgroundZh: "印刷设计师需手动检查骑马钉拼版版面——这是一个繁琐且容易出错的流程。",
      problem: "A single missed page order error in an imposition can ruin an entire print run.",
      problemZh: "拼版中哪怕一个页面顺序错误，都可能导致整批印刷报废。",
      role: "Designer & Developer (AI Studio)",
      roleZh: "设计师 & 开发者（AI Studio）",
      process: "Problem Definition → AI Studio Build → Local Runtime Testing",
      processZh: "问题定义 → AI Studio 构建 → 本地运行测试",
      solutions: [
        {
          title: "Automated Checking",
          titleZh: "自动检查",
          description: "Parses the PDF layout and validates page sequence automatically.",
          descriptionZh: "自动解析 PDF 版面并验证页面顺序。"
        },
        {
          title: "Local Runtime",
          titleZh: "本地运行",
          description: "Runs entirely on the user's machine — no upload, no privacy risk.",
          descriptionZh: "完全本地运行，无需上传文件，保障隐私安全。"
        }
      ],
      outcome: "A functional local tool that catches imposition errors before sending files to print.",
      outcomeZh: "一个可在本地运行的功能性工具，能在文件发送印刷前检测拼版错误。"
    }
  }
];

export const COMMERCIAL_PROJECTS: Project[] = [
  {
    id: "ernie-annotation",
    type: "commercial",
    title: "AI Annotation Platform",
    titleZh: "AI数据标注平台",
    tags: ["AI 数据标注平台"],
    date: "2025.05 – 至今",
    description: "Core interaction designer for the annotation platform; responsible for key experience design on both annotator-side and management-side.",
    descriptionZh: "作为平台核心交互设计师，负责标注端与管理端的关键体验设计",
    coverImage: "Annotation Platform.png",
    details: {
      background: "The AI data annotation platform supports multi-role collaboration through a complete annotation, quality inspection, and review workflow, ensuring stable and controllable data production while continuously delivering high-quality annotation results.",
      backgroundZh: "标注平台通过完善的标注、质检、审核流程，支持多角色高效协作，保障数据生产过程稳定、可控，持续输出高质量标注结果，并配套精细化的项目管理与数据统计，全面提升标注效率与管理可视性。\n\n提供灵活且可扩展的标注能力，支持自定义模板与组件配置，覆盖文本、图像、音频、视频等多模态标注场景。",
      problem: "Skilled workforce hard to schedule, complex content hard to annotate, quality hard to control.",
      problemZh: "专业人力难调度、复杂内容难标、质量难控",
      role: "Interaction Designer",
      roleZh: "交互设计师",
      process: "Requirement Analysis → Competitive Research → Interaction Design → Design Review → Handoff",
      processZh: "需求分析 → 竞品研究 → 交互设计 → 设计评审 → 开发交付",
      solutions: [
        {
          title: "Agent Component Experience Optimization",
          titleZh: "智能体组件体验优化",
          description: "Redesigned the agent annotation component to improve usability across complex multi-turn dialogue scenarios.",
          descriptionZh: "重新设计智能体标注组件，提升复杂多轮对话场景下的可用性。"
        },
        {
          title: "AI Pre-check Rule Configuration",
          titleZh: "AI预检规则配置",
          description: "Built an AI pre-check rule configuration system that catches quality issues automatically before manual review.",
          descriptionZh: "构建 AI 预检规则配置体系，在人工审核前自动识别质量问题。"
        }
      ],
      outcome: "Improved annotation efficiency and quality control for the AI data annotation platform.",
      outcomeZh: "提升了AI数据标注平台的标注效率与质量可控性"
    }
  },
  {
    id: "huawei",
    type: "commercial",
    title: "HUAWEI Enterprise Projects",
    titleZh: "HUAWEI（华为）",
    tags: ["TOB 复杂系统设计"],
    date: "2019.11 – 2021.04",
    description: "Enterprise device management platform; led end-to-end design of complex enterprise systems from requirements to delivery.",
    descriptionZh: "华为企业设备管理平台；主导企业级复杂系统从需求到落地的全流程设计。",
    coverImage: "project-cover-1.png",
    details: {
      background: "Huawei's enterprise clients needed a unified platform to manage large-scale device fleets across multiple regions.",
      backgroundZh: "华为企业客户需要一个统一平台，跨区域管理大规模设备资产。",
      problem: "Fragmented management tools created inconsistent user experiences and high training costs for enterprise IT teams.",
      problemZh: "分散的管理工具造成用户体验不一致，企业 IT 团队培训成本极高。",
      role: "UX Designer (Thoughtworks)",
      roleZh: "UX 设计师（Thoughtworks）",
      process: "User Research → Information Architecture → Interaction Design → Design System → Delivery",
      processZh: "用户研究 → 信息架构 → 交互设计 → 设计规范 → 开发交付",
      solutions: [
        {
          title: "Unified Design System",
          titleZh: "统一设计规范",
          description: "Created a cross-platform design system covering Web, Mobile and responsive web.",
          descriptionZh: "制定覆盖 Web、移动端和响应式官网的跨平台设计规范。"
        },
        {
          title: "Multi-Role Architecture",
          titleZh: "多角色架构",
          description: "Designed information architecture for 5+ distinct user roles with different permission levels.",
          descriptionZh: "为 5+ 个不同权限角色设计了差异化的信息架构。"
        }
      ],
      outcome: "Component reuse increased by 40%, development cycle shortened by 25%.",
      outcomeZh: "组件复用率提升 40%，开发周期缩短 25%。"
    }
  },
  {
    id: "mercedes-benz",
    type: "commercial",
    title: "Mercedes-Benz Finance",
    titleZh: "奔驰金融",
    tags: ["体验重塑"],
    date: "2021.05 – 2024.07",
    description: "Mercedes-Benz financial services platform; full-lifecycle automotive finance product design.",
    descriptionZh: "奔驰金融服务平台；汽车金融全周期产品设计。",
    coverImage: "project-cover-1.png",
    details: {
      background: "Mercedes-Benz Financial Services needed to digitize and streamline their dealer and collections operations.",
      backgroundZh: "奔驰金融服务需要对经销商与催收业务进行数字化改造与流程优化。",
      problem: "Complex financial workflows across multiple platforms created confusion and high error rates for dealers.",
      problemZh: "跨多平台的复杂金融工作流导致经销商操作混乱、错误率偏高。",
      role: "UX Designer (Thoughtworks)",
      roleZh: "UX 设计师（Thoughtworks）",
      process: "Business Analysis → 0-1 Design → Design System → User Validation → Iteration",
      processZh: "业务分析 → 0-1 设计 → 设计规范 → 用户验证 → 迭代",
      solutions: [
        {
          title: "Dealer Platform (DSS)",
          titleZh: "经销商平台（DSS）",
          description: "0-1 design of the dealer self-service portal, simplifying complex finance product workflows.",
          descriptionZh: "经销商自助服务门户 0-1 设计，简化复杂金融产品操作流程。"
        },
        {
          title: "Design System (20+ components)",
          titleZh: "设计规范（20+ 组件）",
          description: "Built a comprehensive component library covering 20+ components to accelerate development.",
          descriptionZh: "构建覆盖 20+ 组件的完整组件库，加速开发交付。"
        }
      ],
      outcome: "Successfully delivered a unified financial services platform serving the full dealer-to-collections lifecycle.",
      outcomeZh: "成功交付了覆盖经销商到催收全链路的统一金融服务平台。"
    }
  }
];

export const ARTICLES: Article[] = [
  {
    id: "ai-changing-ux-research",
    title: "How AI is Changing UX Research",
    titleZh: "AI 如何改变 UX 研究",
    date: "March 2026",
    dateZh: "2026 年 3 月",
    summary: "AI tools are transforming how we gather and synthesize user feedback — but the designer's judgment still matters most.",
    summaryZh: "AI 工具正在转变我们收集和分析用户反馈的方式——但设计师的判断力依然最重要。",
    content: "Artificial Intelligence has moved beyond a buzzword into our daily toolkits. From synthesizing hundreds of user interview transcripts in seconds to spotting sentiment trends we might have missed, AI is fundamentally changing the speed at which we can operate.\n\nHowever, it's crucial to remember that AI lacks empathy. It can tell you *what* users are saying, but often misses the nuanced *why* behind their frustrations. In this article, we explore how to balance AI-powered efficiency with human-centered empathy...",
    contentZh: "人工智能已从流行语走入我们的日常工具箱。从几秒内整合数百份用户访谈记录，到发现我们可能错过的情感趋势，AI 正从根本上改变我们的工作速度。\n\n然而，AI 缺乏共情能力。它能告诉你用户「说了什么」，却往往无法捕捉到他们痛点背后的深层「为什么」。在本文中，我们探讨如何在 AI 效率与以人为中心的共情之间取得平衡……"
  },
  {
    id: "designing-complexity-b2b",
    title: "Designing for Complexity: Lessons from B2B",
    titleZh: "为复杂性而设计：来自 B2B 的经验",
    date: "February 2026",
    dateZh: "2026 年 2 月",
    summary: "B2B products are messy. Here's how I approach designing for workflows that span dozens of roles and edge cases.",
    summaryZh: "B2B 产品本质上是复杂的。以下是我处理跨越多个角色和边界场景工作流时的设计方法。",
    content: "Consumer apps aim for simplicity—one primary user, one clear goal. B2B systems are inherently different. You're designing for multiple personas: the data entry clerk optimizing for speed, the manager needing oversight, and the executive requiring high-level analytics.\n\nThe secret isn't to dumb the system down. It's to use progressive disclosure to hide complexity until it's needed.",
    contentZh: "消费级产品追求简洁——一个主要用户，一个清晰目标。B2B 系统则截然不同。你面对的是多种角色：追求速度的数据录入员、需要监控全局的管理者、以及需要高层分析的决策者。\n\n关键不是简化系统，而是通过渐进式披露来隐藏复杂性，直到用户真正需要时才展示……"
  },
  {
    id: "vibe-coding-experiment",
    title: "Vibe Coding: My Experiment with AI-Assisted Prototyping",
    titleZh: "Vibe Coding：我的 AI 辅助原型实验",
    date: "January 2026",
    dateZh: "2026 年 1 月",
    summary: "I spent a month building prototypes with Gemini, Claude, and Replit. Here's what I learned about the future of design.",
    summaryZh: "我花了一个月用 Gemini、Claude 和 Replit 来构建原型。这是我对设计未来的思考。",
    content: "As a designer, I've always felt limited by my lack of deep engineering skills. I could build the 'happy path' in Figma, but testing real edge cases with real logic was impossible without an engineering team.\n\nEnter Vibe Coding. By pairing Claude for logic generation with Replit for instant deployment, I was able to build fully functional prototypes in days rather than months.",
    contentZh: "作为设计师，我一直感到工程技能的局限。我可以在 Figma 里构建「理想路径」，但没有工程团队，测试真实边界场景几乎不可能。\n\nVibe Coding 改变了这一切。结合 Claude 生成逻辑、Replit 即时部署，我能够在数天内而非数月内构建完整可用的原型……"
  },
  {
    id: "problem-with-simple-design",
    title: "The Problem with 'Simple' Design",
    titleZh: "「简洁」设计的问题",
    date: "December 2025",
    dateZh: "2025 年 12 月",
    summary: "Simplicity is often mistaken for minimalism. Great UX isn't about removing — it's about making the right things obvious.",
    summaryZh: "简洁常被误解为极简主义。好的 UX 不是去除什么——而是让对的东西变得显而易见。",
    content: "We've all seen 'clean' interfaces that are completely unusable. In the pursuit of minimalism, designers often strip away critical context, labels, and wayfinding elements.\n\nTrue simplicity in UX means reducing cognitive load, not just visual noise. Sometimes, adding a well-placed label or an explanatory helper text actually makes the interface simpler to use.",
    contentZh: "我们都见过那些「干净」却完全无法使用的界面。在追求极简主义的过程中，设计师往往删除了关键的上下文、标签和导航元素。\n\n真正的 UX 简洁意味着降低认知负荷，而非仅仅减少视觉噪音……"
  }
];

export const SKILLS_ZH = [
  "Figma / Sketch: 精通",
  "用户研究: 精通",
  "信息架构: 精通",
  "AI 原型设计: 熟练",
  "Principal (动效): 熟练",
  "Adobe PS / AI: 熟练"
];

export const SKILLS_EN = [
  "Figma / Sketch: Expert",
  "User Research: Expert",
  "Information Architecture: Expert",
  "AI Prototyping: Proficient",
  "Principal (Motion): Proficient",
  "Adobe PS / AI: Proficient"
];

export const CONTACT_INFO = {
  email: "yijdong@163.com",
  phone: "18092240354",
  wechat: "yijundong_ux",
  linkedin: "linkedin.com/in/yijundong"
};
