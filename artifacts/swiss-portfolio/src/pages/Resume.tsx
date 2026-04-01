import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Phone, ArrowLeft } from "lucide-react";

const C = {
  bg: "#F9F6F1",
  card: "#E8E2D9",
  text: "#2E2E2E",
  desc: "#666666",
  accent: "#B7947A",
  border: "#E1DAD1",
  navBg: "rgba(252,251,248,0.97)",
  navBorder: "#EFEBE4",
};

const SERIF = "'Playfair Display', 'DM Serif Display', serif";
const SANS = "'PingFang SC', 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── ZH CONTENT ──────────────────────────────────────────────────────────────

const ZH = {
  name: "董怡君 (Yijun Dong)",
  role: "求职岗位：UI/UX设计师",
  sections: [
    {
      title: "个人优势",
      items: [
        { label: "UI/UX全流程设计", body: "深耕交互逻辑与用户体验，能够主导需求分析、用户研究、交互设计、视觉设计、可用性测试全链路设计流程。" },
        { label: "ToB复杂系统设计", body: "擅长复杂系统的信息架构与任务流程设计，具备华为、奔驰等客户的大型ToB系统实战经验，能快速梳理多角色业务场景并输出高可用性解决方案。" },
        { label: "AI产品设计", body: "参与AI数据平台与AI终端系统相关产品设计，将AI能力转化为清晰、可落地的交互方案，支撑多角色协作与复杂系统运行。善用AI生图与原型 Demo 等工具辅助方案构思与验证。" },
        { label: "设计规范与组件库", body: "擅长企业级设计规范制定与标准化组件库搭建，能够输出可复用的设计标准与清晰的交互文档，支撑复杂系统稳定落地。" },
      ],
    },
    {
      title: "工作经历",
      jobs: [
        {
          company: "微创软件",
          role: "交互设计师",
          period: "2025.05 – 至今",
          note: "加入百度文心一言项目组（应用模型用户体验部），负责一言标注平台与一言数据工程平台的交互设计工作。",
          items: [
            { label: "需求分析与决策", body: "梳理需求与设计目标，澄清关键问题，推动方案落地。" },
            { label: "交互设计", body: "进行竞品分析与方案探索，设计核心流程、关键组件及异常场景。" },
            { label: "跨角色协作落地", body: "协同视觉与研发，推进设计评审并跟进实现效果。" },
          ],
        },
        {
          company: "立讯精密",
          role: "产品经理 (手机系统交互)",
          period: "2024.12 – 2025.03",
          items: [{ label: "", body: "负责 AI 手机系统设计与竞品分析，并开展 AI 研发工具设计，基于多轮用户访谈明确需求。" }],
        },
        {
          company: "Thoughtworks (西安)",
          role: "用户体验设计师",
          period: "2019.10 – 2024.08",
          note: "主要参与华为、奔驰等客户的项目，工作职责包括：",
          items: [
            { label: "需求与业务洞察", body: "通过用户研究与需求分析，深入理解业务目标并明确设计方向。" },
            { label: "体验设计与协作落地", body: "负责交互设计、视觉设计并对接客户评审，推动方案与业务目标一致落地。" },
          ],
        },
        {
          company: "上海全应科技有限公司 (西安)",
          role: "交互设计师",
          period: "2018.04 – 2019.10",
          items: [{ label: "", body: "负责全应智慧热能云产品交互设计、视觉设计，聚焦 Web 与大屏数据可视化，提升产品操作效率。" }],
        },
        {
          company: "北京丸秀科技有限公司 (北京盖娅互娱)",
          role: "UI设计师",
          period: "2017.03 – 2018.04",
          items: [{ label: "", body: "负责旅法师营地产品 App 端及 Web 端的交互设计、视觉设计及动效设计工作。" }],
        },
        {
          company: "北京小牛顿科学启蒙教育科技有限公司 (北京)",
          role: "UI设计实习生",
          period: "2016.03 – 2017.03",
          items: [{ label: "", body: "负责小牛顿官网 UI 设计，公众号界面设计及运营活动 H5 界面设计，宣传物料设计等。" }],
        },
      ],
    },
    {
      title: "主要项目经历",
      projects: [
        {
          name: "一言标注平台及数据工程平台",
          period: "2025.05 – 至今 | 交互设计 | AI数据标注平台",
          items: [
            { label: "标注平台体验升级", body: "负责标注端与管理端体验优化，主导面向垂类兼职人员的标注流程设计，并升级智能体组件、复杂内容对比与 AI 预检等核心能力，提升标注效率与质量可控性。" },
            { label: "数据工程平台流程重构", body: "负责数据工程平台全链路交互优化，重构数据上传、质检、初审、终审、封版等关键流程，提升工程能力可理解性，降低 RD 使用门槛。" },
          ],
        },
        {
          name: "奔驰金融服务平台",
          period: "2021.05 – 2024.07 | 从0-1设计 | 设计规范",
          items: [
            { label: "汽车金融全周期产品设计", body: "主导 DSS 经销商平台与 Agent Portal 催收系统的 0-1 设计，重构金融用户留存系统体验，系统性优化复杂业务流程。" },
            { label: "设计系统与规范建设", body: "制定全平台设计规范（覆盖 20+ 组件），推动开发过程中的组件复用。" },
          ],
        },
        {
          name: "华为交付项目",
          period: "2019.11 – 2021.04 | 交互设计 | ToB复杂系统设计",
          items: [
            { label: "多领域 ToB 系统设计", body: "主导企业级复杂系统从需求到落地的全流程设计，覆盖网络管理 (OSS ISSTAR)、设备管控 (HEM)、广告营销三大领域，服务 10 万+ 级用户场景。" },
            { label: "跨平台一致性设计", body: "制定并落地 HEM 解决方案多端 (Web/移动/响应式官网) 统一设计规范，组件复用率提升 40%，开发周期缩短 25%。" },
          ],
        },
        {
          name: "新能源车企用户研究",
          period: "2020.04 – 2024.03 | 用户研究 | 可用性测试",
          items: [
            { label: "用户访谈", body: "通过深度访谈，挖掘用户典型用车场景与核心痛点，验证 20+ 功能假设并明确需求优先级。" },
            { label: "用户跟拍", body: "安装车载摄像头记录用户 7 天真实用车行为，记录车机各应用使用频率与痛点。" },
            { label: "可用性测试", body: "设计 30+ 核心任务，覆盖高频及边缘场景；利用眼动仪捕捉用户视觉焦点分布，分析界面信息层级合理性；记录定量数据与定性反馈，进行数据分析对需求进行优先级排序。" },
          ],
        },
        {
          name: "全应云平台微应用集群",
          period: "2018.04 – 2019.10 | 交互设计 | 数据可视化设计",
          items: [
            { label: "工业互联网云平台设计", body: "基于热力能源行业特性，设计生产监控、智能预警、数字孪生等核心功能模块。" },
            { label: "数据可视化设计", body: "基于示波器及行业 BI 系统的深度竞品分析，主导 Web 端与大屏数据可视化设计，设计数据趋势对比交互动效，明确交互逻辑。" },
          ],
        },
      ],
    },
    {
      title: "教育经历",
      edu: [
        { school: "华侨大学", major: "工业设计", degree: "本科", period: "2012 – 2016" },
        { school: "台湾大同大学", major: "工业设计", degree: "交换生", period: "2014 – 2015" },
      ],
    },
    {
      title: "工具技能",
      skills: [
        { name: "Figma / Sketch", level: "精通" },
        { name: "Gemini / Claude / Replit 等 Vibe Coding 工具", level: "熟练" },
        { name: "Principal (动效)", level: "熟练" },
        { name: "Adobe PS / AI", level: "熟练" },
      ],
    },
  ],
};

// ─── EN CONTENT ──────────────────────────────────────────────────────────────

const EN = {
  name: "Yijun Dong",
  role: "Job Objective: UI/UX Designer",
  sections: [
    {
      title: "Profile",
      items: [
        { label: "End-to-End UI/UX Design", body: "Focus on interaction and user experience. Able to handle the full design process, including requirements, user research, interaction, visual design, and usability testing." },
        { label: "Complex ToB System", body: "Experienced in enterprise system design (e.g., Huawei, Mercedes-Benz). Skilled in structuring multi-role workflows and turning complex business needs into clear and usable solutions." },
        { label: "AI Product Design", body: "Worked on AI data platforms and AI systems. Able to translate AI capabilities into practical interaction designs for multi-role use. Familiar with AI tools (image generation, prototyping) for design exploration." },
        { label: "Design System & Component Library", body: "Experienced in building design systems and reusable components. Able to define clear standards and documentation to support consistency and efficient development." },
      ],
    },
    {
      title: "Work Experience",
      jobs: [
        {
          company: "Wicresoft",
          role: "Interaction Designer",
          period: "2025.05 – Present",
          note: "Join Baidu ERNIE Bot team (UX Applied Model Dept.) Responsible for interaction design of the Data Annotation Platform and Data Engineering Platform.",
          items: [
            { label: "Requirement analysis", body: "Clarify requirements and goals, identify key issues, and support solution delivery." },
            { label: "Interaction design", body: "Conduct competitor analysis and solution exploration; design core flows, key components." },
            { label: "Collaboration", body: "Work with PM and Devs, support design reviews, and follow implementation quality." },
          ],
        },
        {
          company: "Luxshare Precision",
          role: "Product Manager (Mobile OS Interaction)",
          period: "2024.12 – 2025.03",
          items: [{ label: "", body: "Responsible for AI mobile system design and competitor analysis. Also worked on AI development tools, defining requirements based on multiple rounds of user interviews." }],
        },
        {
          company: "Thoughtworks Xi'an",
          role: "UX Designer",
          period: "2019.10 – 2024.08",
          note: "Participated in projects for clients like Huawei and Mercedes-Benz, with responsibilities including:",
          items: [
            { label: "User research", body: "Used user research to find business goals and set the design direction." },
            { label: "Design & collaboration", body: "Created interaction and visual designs and presented them to clients for approval." },
          ],
        },
        {
          company: "Quanying Technology Co., Ltd. (Xi'an)",
          role: "Interaction Designer",
          period: "2018.04 – 2019.10",
          items: [{ label: "", body: "Responsible for the interaction design of the Quanying Cloud product, covering both web and mobile platforms." }],
        },
        {
          company: "Beijing Wanxiu Tech (Gaea)",
          role: "UI Designer",
          period: "2017.03 – 2018.04",
          items: [{ label: "", body: "Handled the design of \"Lü Fa Shi Camp,\" encompassing interaction design, UI design, and motion design." }],
        },
        {
          company: "Newton Science Education Co., Ltd.",
          role: "UI Designer",
          period: "2016.03 – 2017.03",
          items: [{ label: "", body: "Responsible for the UI design, H5 event interface design." }],
        },
      ],
    },
    {
      title: "Project Experience",
      projects: [
        {
          name: "ERNIE Data Annotation Platform & Data Engineering Platform",
          period: "2025.05 – Present",
          items: [
            { label: "Annotation Platform UX Improvements", body: "Designed workflows for part-time annotators and improved key features such as agent components, complex content comparison, and AI pre-check to enhance efficiency and quality control." },
            { label: "Data Engineering Platform Redesign", body: "Led end-to-end interaction improvements. Rebuilt key workflows (data upload, QA, initial review, final review, release), making processes easier to understand and lowering the barrier for engineers." },
          ],
        },
        {
          name: "Mercedes-Benz Financial Services Platform",
          period: "2021.05 – 2024.07 | 0-1 Design | Design System",
          items: [
            { label: "0-1 Design", body: "Led the 0-1 design for the Dealer Platform (DSS) and Agent Portal. Improved the user retention system and simplified complex workflows." },
            { label: "Design System", body: "Built a design library with over 20 components to speed up development." },
          ],
        },
        {
          name: "Huawei Enterprise Projects",
          period: "2019.11 – 2021.04 | Multi-field ToB Design",
          items: [
            { label: "Multi-field ToB Design", body: "Managed full design cycles for network management (OSS ISSTAR), device control (HEM), and ads. Served over 100,000 users." },
            { label: "Cross-platform Consistency", body: "Created a design system for Web and Mobile. Increased component reuse by 40% and cut development time by 25%." },
          ],
        },
        {
          name: "EV User Research & Testing",
          period: "2020.04 – 2024.03 | User Research & Usability Testing",
          items: [
            { label: "User Interviews", body: "Found pain points and validated 20+ features through deep interviews." },
            { label: "User Shadowing", body: "Used car cameras to record 7 days of real driving behavior to identify pain points." },
            { label: "Usability Testing", body: "Tested 30+ core tasks. Used eye-tracking to analyze the interface and set feature priorities." },
          ],
        },
        {
          name: "Quanying Cloud Platform",
          period: "2018.04 – 2019.10 | Industrial Internet",
          items: [
            { label: "Industrial Internet", body: "Designed core modules for energy monitoring, smart alerts, and digital twins." },
            { label: "Data Visualization", body: "Designed interactive charts and data trends for Web and Big Screens." },
          ],
        },
      ],
    },
    {
      title: "Education",
      edu: [
        { school: "Huaqiao University", major: "Industrial Design", degree: "Bachelor's Degree", period: "2012 – 2016" },
        { school: "Tatung University, Taiwan", major: "Industrial Design", degree: "Exchange Student", period: "2014 – 2015" },
      ],
    },
    {
      title: "Skills",
      skills: [
        { name: "Figma / Sketch", level: "Expert" },
        { name: "AI-driven Prototyping (Gemini / Claude / Replit)", level: "Proficient" },
        { name: "Principal (Motion)", level: "Proficient" },
        { name: "Adobe PS / AI", level: "Proficient" },
      ],
    },
  ],
};

type ResumeData = typeof ZH;
type Section = ResumeData["sections"][number];

function SectionBlock({ section }: { section: Section }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: C.text, margin: 0, whiteSpace: "nowrap" }}>{section.title}</h2>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>

      {"items" in section && section.items && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, marginTop: 10, flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: 600, color: C.text, fontSize: 15 }}>{item.label}</span>
                {item.label && <span style={{ color: C.text }}> — </span>}
                <span style={{ color: C.desc, fontSize: 15, lineHeight: 1.75 }}>{item.body}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {"jobs" in section && section.jobs && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {section.jobs.map((job, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.text }}>{job.company}</span>
                <span style={{ color: C.accent, fontWeight: 600, fontSize: 14 }}>{job.role}</span>
              </div>
              <div style={{ fontSize: 13, color: "#aaa", marginBottom: 8, fontVariantNumeric: "tabular-nums" }}>{job.period}</div>
              {job.note && <p style={{ fontSize: 14, color: C.desc, marginBottom: 10, lineHeight: 1.7, margin: "0 0 10px" }}>{job.note}</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {job.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, paddingLeft: 4 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.border, marginTop: 10, flexShrink: 0 }} />
                    <div style={{ fontSize: 14, color: C.desc, lineHeight: 1.75 }}>
                      {item.label && <span style={{ fontWeight: 600, color: C.text }}>{item.label}: </span>}
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {"projects" in section && section.projects && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {section.projects.map((proj, i) => (
            <div key={i}>
              <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 4 }}>{proj.name}</div>
              <div style={{ fontSize: 13, color: "#aaa", marginBottom: 12, fontVariantNumeric: "tabular-nums" }}>{proj.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {proj.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, paddingLeft: 4 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.border, marginTop: 10, flexShrink: 0 }} />
                    <div style={{ fontSize: 14, color: C.desc, lineHeight: 1.75 }}>
                      <span style={{ fontWeight: 600, color: C.text }}>{item.label}: </span>
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {"edu" in section && section.edu && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {section.edu.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", paddingBottom: 16, borderBottom: i < section.edu!.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: C.text }}>{e.school}</span>
              <span style={{ color: C.desc, fontSize: 14 }}>{e.major}</span>
              <span style={{ color: C.accent, fontSize: 13, fontWeight: 600 }}>{e.degree}</span>
              <span style={{ color: "#aaa", fontSize: 13, marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{e.period}</span>
            </div>
          ))}
        </div>
      )}

      {"skills" in section && section.skills && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {section.skills.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{s.name}</span>
              <span style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{s.level}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Resume() {
  const [lang, setLang] = useState<"zh" | "en">(() => (localStorage.getItem("sp-lang") as "zh" | "en") || "zh");
  const [, navigate] = useLocation();
  const data = lang === "zh" ? ZH : EN;

  const setLangPersist = (l: "zh" | "en") => { setLang(l); localStorage.setItem("sp-lang", l); };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap');
        * { box-sizing: border-box; }
        @media print { .no-print { display: none !important; } body { background: white; } }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print" style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", paddingTop: 18, paddingBottom: 18, background: "rgba(249,246,241,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ width: "min(900px, calc(100vw - 48px))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, cursor: "pointer", color: C.desc, fontSize: 14, fontFamily: SANS, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.desc)}
          >
            <ArrowLeft size={16} />
            {lang === "zh" ? "返回主页" : "Back"}
          </button>

          <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 600, color: C.text }}>
            {lang === "zh" ? "个人简历" : "Résumé"}
          </span>

          <div style={{ display: "flex", alignItems: "center", background: "#EDE8E0", borderRadius: 100, padding: 3, gap: 2 }}>
            {(["zh", "en"] as const).map(l => (
              <div key={l} onClick={() => setLangPersist(l)} style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.2s, color 0.2s", background: lang === l ? C.text : "transparent", color: lang === l ? C.bg : "#999", userSelect: "none" }}>
                {l === "zh" ? "中" : "EN"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESUME CONTENT */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: `1px solid ${C.border}` }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, color: C.text, margin: "0 0 8px", lineHeight: 1.1 }}>{data.name}</h1>
          <p style={{ fontSize: 16, color: C.accent, fontWeight: 600, margin: "0 0 20px", letterSpacing: "0.04em" }}>{data.role}</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.desc }}>
              <Mail size={14} style={{ color: C.accent }} />
              <span>yijdong@163.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.desc }}>
              <Phone size={14} style={{ color: C.accent }} />
              <span>18092240354</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        {data.sections.map((section, i) => (
          <SectionBlock key={i} section={section as Section} />
        ))}

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}`, textAlign: "center", fontSize: 12, color: "#bbb" }}>
          Yijun Dong · yijdong@163.com · 18092240354
        </div>
      </div>
    </div>
  );
}
