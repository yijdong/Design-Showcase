export type Project = {
  num: string;
  title: string;
  en: string;
  tags: string[];
  href: boolean;
  desc: string;
};

export type VibeItem = {
  id: string;
  title: string;
  en: string;
  tags: string[];
  desc: string;
};

export const PROJECTS_ZH: Project[] = [
  { num: "01", title: "AI数据标注平台", en: "AI Annotation Platform", tags: ["交互设计", "AI后台产品", "交互文档"], href: true, desc: "面向 AI 训练数据生产的全流程标注工作台，覆盖从项目管理、数据标注到质量审核的完整链路，为 AI 模型训练提供高质量数据支撑。" },
  { num: "02", title: "全球化企业设备管理平台", en: "Global Device Management", tags: ["ToB复杂系统", "0-1产品设计", "场景化设计"], href: true, desc: "为华为大型企业客户设计的全球化IT设备全生命周期管理系统。深度参与需求挖掘与信息架构设计，打造适配多角色、多场景的复杂B端系统体验。" },
  { num: "03", title: "汽车金融服务平台", en: "Automotive Finance Platform", tags: ["体验重塑", "用户旅程地图"], href: true, desc: "梅赛德斯-奔驰金融服务数字化平台体验重塑项目。通过用户旅程地图与深度访谈，识别核心痛点，重新定义申请流程与核心交互模型。" },
  { num: "04", title: "用户研究项目", en: "User Research Project", tags: ["用户访谈", "可用性测试"], href: false, desc: "系统性用户研究项目，包含定性访谈、可用性测试及问卷调研。输出用户画像、旅程地图与设计洞察报告，为产品决策提供数据支撑。" },
  { num: "05", title: "视觉设计项目", en: "Visual Design Projects", tags: ["插画", "大屏", "数据可视化"], href: false, desc: "涵盖品牌插画、数据可视化大屏、UI视觉规范等多类型视觉设计项目，体现全链路视觉表达与设计执行能力。" },
];

export const PROJECTS_EN: Project[] = [
  { num: "01", title: "AI Annotation Platform", en: "ERNIE Bot · Wicresoft", tags: ["Interaction Design", "AI Backend", "Documentation"], href: true, desc: "Full-pipeline annotation workbench for AI training data covering image, text, and audio modalities. Led 0-1 product design — information architecture, core task flows, user research, prototyping, and usability testing." },
  { num: "02", title: "Global Device Management", en: "Huawei Enterprise", tags: ["Complex ToB System", "0-1 Design", "Multi-scenario"], href: true, desc: "Global IT device lifecycle management system for Huawei enterprise clients. Deeply involved in requirements, information architecture, and designing a system that works across multiple roles and scenarios." },
  { num: "03", title: "Automotive Finance Platform", en: "Mercedes-Benz Financial", tags: ["Experience Redesign", "User Journey"], href: true, desc: "Digital experience overhaul of Mercedes-Benz financial services. Identified core pain points via user journey maps and in-depth interviews, then redefined application flows and core interaction models." },
  { num: "04", title: "User Research Projects", en: "EV & Enterprise", tags: ["User Interviews", "Usability Testing"], href: false, desc: "Systematic user research including qualitative interviews, usability testing, and surveys. Outputs: user personas, journey maps, and design insight reports to support product decisions." },
  { num: "05", title: "Visual Design Projects", en: "Illustration & Data Viz", tags: ["Illustration", "Big Screen", "Data Visualization"], href: false, desc: "Brand illustration, data visualization big screens, and UI visual specifications — demonstrating full visual design and execution capability across diverse project types." },
];

export const VIBE_ZH: VibeItem[] = [
  { id: "0", title: "AI手机系统设计", en: "AI Mobile System Design", tags: ["AI终端产品设计"], desc: "主导北美市场AI手机桌面系统需求定义，完成竞品分析、原型设计，探索AI在移动端的交互范式。" },
  { id: "1", title: "个人主页", en: "Personal Portfolio Website", tags: ["Vibe Coding", "Replit"], desc: "使用Replit Vibe coding完成个人主页的设计与上线部署全流程，从设计稿到可交互产品一气呵成。" },
  { id: "2", title: "骑马钉拼版检查工具", en: "Saddle Stitch Layout Checker", tags: ["AI Studio", "Gemini"], desc: "使用Google AI Studio中的build功能开发印刷品拼版检查工具，实现本地运行与智能校验。" },
];

export const VIBE_EN: VibeItem[] = [
  { id: "0", title: "AI Mobile System Design", en: "Luxshare Precision", tags: ["AI Terminal Design"], desc: "Led product definition for an AI mobile OS for the North American market — competitor analysis, prototyping, and exploring new interaction paradigms for AI on mobile." },
  { id: "1", title: "Personal Portfolio Website", en: "This site", tags: ["Vibe Coding", "Replit"], desc: "Designed and shipped this portfolio entirely with Replit Vibe coding — from design concept to live interactive product in one continuous flow." },
  { id: "2", title: "Saddle Stitch Layout Checker", en: "AI Studio Tool", tags: ["AI Studio", "Gemini"], desc: "Built a print layout verification tool using Google AI Studio's build feature, enabling local execution and intelligent print checking." },
];

export type SeqItem = { kind: "project" | "vibe"; id: string };

// Unified navigation sequence across all detail-able items
export const DETAIL_SEQUENCE: SeqItem[] = [
  { kind: "project", id: "01" },
  { kind: "project", id: "02" },
  { kind: "project", id: "03" },
  { kind: "vibe",    id: "0"  },
  { kind: "vibe",    id: "1"  },
  { kind: "vibe",    id: "2"  },
];

export function seqPath(item: SeqItem) {
  return item.kind === "project" ? `/project/${item.id}` : `/vibe/${item.id}`;
}
