import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

function ResumeZH() {
  return (
    <div className="bg-card rounded-3xl p-8 md:p-16 border border-border shadow-xl shadow-black/5 font-sans">

      {/* Header */}
      <div className="text-center md:text-left border-b border-border/60 pb-8 mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-foreground mb-1">董怡君 (Yijun Dong)</h2>
        <p className="text-xl text-primary font-medium mb-3">求职岗位：UI/UX设计师</p>
        <p className="text-muted-foreground text-sm">邮箱: yijdong@163.com | 电话: 18092240354</p>
      </div>

      {/* 个人优势 */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">个人优势</h3>
        <ul className="space-y-3 text-foreground/90 list-disc pl-5">
          <li><span className="font-semibold">UI/UX全流程设计：</span>深耕交互逻辑与用户体验，能够主导需求分析、用户研究、交互设计、视觉设计、可用性测试全链路设计流程。</li>
          <li><span className="font-semibold">ToB复杂系统设计：</span>擅长复杂系统的信息架构与任务流程设计，具备华为、奔驰等客户的大型ToB系统实战经验，能快速梳理多角色业务场景并输出高可用性解决方案。</li>
          <li><span className="font-semibold">AI产品设计：</span>参与AI数据平台与AI终端系统相关产品设计，将AI能力转化为清晰、可落地的交互方案，支撑多角色协作与复杂系统运行。善用AI生图与原型 Demo 等工具辅助方案构思与验证。</li>
          <li><span className="font-semibold">设计规范与组件库：</span>擅长企业级设计规范制定与标准化组件库搭建，能够输出可复用的设计标准与清晰的交互文档，支撑复杂系统稳定落地。</li>
        </ul>
      </section>

      {/* 工作经历 */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">工作经历</h3>
        <div className="space-y-10">

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">微创软件 | 交互设计师</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2025.05 – 至今</span>
            </div>
            <p className="text-foreground/70 text-sm mb-3">加入百度文心一言项目组 (应用模型用户体验部)，负责一言标注平台与一言数据工程平台的交互设计工作。</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">需求分析与决策：</span>梳理需求与设计目标，澄清关键问题，推动方案落地。</li>
              <li><span className="font-semibold">交互设计：</span>进行竞品分析与方案探索，设计核心流程、关键组件及异常场景。</li>
              <li><span className="font-semibold">跨角色协作落地：</span>协同视觉与研发，推进设计评审并跟进实现效果。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">立讯精密 | 产品经理 (手机系统交互)</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2024.12 – 2025.03</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>负责 AI 手机系统设计与竞品分析，并开展 AI 研发工具设计，基于多轮用户访谈明确需求。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Thoughtworks (西安) | 用户体验设计师</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2019.10 – 2024.08</span>
            </div>
            <p className="text-foreground/70 text-sm mb-3">主要参与华为、奔驰等客户的项目，工作职责包括：</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">需求与业务洞察：</span>通过用户研究与需求分析，深入理解业务目标并明确设计方向。</li>
              <li><span className="font-semibold">体验设计与协作落地：</span>负责交互设计、视觉设计并对接客户评审，推动方案与业务目标一致落地。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">上海全应科技有限公司 (西安) | 交互设计师</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2018.04 – 2019.10</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>负责全应智慧热能云产品交互设计、视觉设计，聚焦 Web 与大屏数据可视化，提升产品操作效率。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">北京丸秀科技有限公司 (北京盖娅互娱) | UI设计师</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2017.03 – 2018.04</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>负责旅法师营地产品 App 端及 Web 端的交互设计、视觉设计及动效设计工作。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">北京小牛顿科学启蒙教育科技有限公司 (北京) | UI设计实习生</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2016.03 – 2017.03</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>负责小牛顿官网 UI 设计，公众号界面设计及运营活动 H5 界面设计，宣传物料设计等。</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 主要项目经历 */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">主要项目经历</h3>
        <div className="space-y-10">

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">一言标注平台及数据工程平台</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2025.05 – 至今</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">交互设计 | AI数据标注平台</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">标注平台体验升级：</span>负责标注端与管理端体验优化，主导面向垂类兼职人员的标注流程设计，并升级智能体组件、复杂内容对比与 AI 预检等核心能力，提升标注效率与质量可控性。</li>
              <li><span className="font-semibold">数据工程平台流程重构：</span>负责数据工程平台全链路交互优化，重构数据上传、质检、初审、终审、封版等关键流程，提升工程能力可理解性，降低 RD 使用门槛。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">奔驰金融服务平台</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2021.05 – 2024.07</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">从0-1设计 | 设计规范</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">汽车金融全周期产品设计：</span>主导 DSS 经销商平台与 Agent Portal 催收系统的 0-1 设计，重构金融用户留存系统体验，系统性优化复杂业务流程。</li>
              <li><span className="font-semibold">设计系统与规范建设：</span>制定全平台设计规范（覆盖 20+ 组件），推动开发过程中的组件复用。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">华为交付项目</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2019.11 – 2021.04</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">交互设计 | ToB复杂系统设计</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">多领域 ToB 系统设计：</span>主导企业级复杂系统从需求到落地的全流程设计，覆盖网络管理 (OSS ISSTAR)、设备管控 (HEM)、广告营销三大领域，服务 10 万+ 级用户场景。</li>
              <li><span className="font-semibold">跨平台一致性设计：</span>制定并落地 HEM 解决方案多端 (Web/移动/响应式官网) 统一设计规范，组件复用率提升 40%，开发周期缩短 25%。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">新能源车企用户研究</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2020.04 – 2024.03</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">用户研究 | 可用性测试</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">用户访谈：</span>通过深度访谈，挖掘用户典型用车场景与核心痛点，验证 20+ 功能假设并明确需求优先级。</li>
              <li><span className="font-semibold">用户跟拍：</span>安装车载摄像头记录用户 7 天真实用车行为，记录车机各应用使用频率与痛点。</li>
              <li><span className="font-semibold">可用性测试：</span>设计 30+ 核心任务，覆盖高频及边缘场景；利用眼动仪捕捉用户视觉焦点分布，分析界面信息层级合理性；记录定量数据与定性反馈，进行数据分析对需求进行优先级排序。</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">全应云平台微应用集群</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2018.04 – 2019.10</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">交互设计 | 数据可视化设计</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">工业互联网云平台设计：</span>基于热力能源行业特性，设计生产监控、智能预警、数字孪生等核心功能模块。</li>
              <li><span className="font-semibold">数据可视化设计：</span>基于示波器及行业 BI 系统的深度竞品分析，主导 Web 端与大屏数据可视化设计，设计数据趋势对比交互动效，明确交互逻辑。</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 教育经历 */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">教育经历</h3>
        <ul className="space-y-2 text-foreground/90 list-disc pl-5">
          <li>华侨大学 | 工业设计 | 本科 | 2012 - 2016</li>
          <li>台湾大同大学 | 工业设计 | 交换生 | 2014 - 2015</li>
        </ul>
      </section>

      {/* 工具技能 */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">工具技能</h3>
        <ul className="space-y-2 text-foreground/90 list-disc pl-5">
          <li>Figma / Sketch: 精通</li>
          <li>Gemini / Claude / Replit等Vibe Coding工具: 熟练</li>
          <li>Principal (动效): 熟练</li>
          <li>Adobe PS / AI: 熟练</li>
        </ul>
      </section>

    </div>
  );
}

function ResumeEN() {
  return (
    <div className="bg-card rounded-3xl p-8 md:p-16 border border-border shadow-xl shadow-black/5 font-sans">

      {/* Header */}
      <div className="text-center md:text-left border-b border-border/60 pb-8 mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-foreground mb-1">Yijun Dong</h2>
        <p className="text-xl text-primary font-medium mb-3">Job Objective: UI/UX Designer</p>
        <p className="text-muted-foreground text-sm">Email: yijdong@163.com | Phone: 18092240354</p>
      </div>

      {/* Profile */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Profile</h3>
        <ul className="space-y-3 text-foreground/90 list-disc pl-5">
          <li><span className="font-semibold">End-to-End UI/UX Design:</span> Focus on interaction and user experience. Able to handle the full design process, including requirements, user research, interaction, visual design, and usability testing.</li>
          <li><span className="font-semibold">Complex ToB System:</span> Experienced in enterprise system design (e.g., Huawei, Mercedes-Benz). Skilled in structuring multi-role workflows and turning complex business needs into clear and usable solutions.</li>
          <li><span className="font-semibold">AI Product Design:</span> Worked on AI data platforms and AI systems. Able to translate AI capabilities into practical interaction designs for multi-role use. Familiar with AI tools (image generation, prototyping) for design exploration.</li>
          <li><span className="font-semibold">Design System & Component Library:</span> Experienced in building design systems and reusable components. Able to define clear standards and documentation to support consistency and efficient development.</li>
        </ul>
      </section>

      {/* Work Experience */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Work Experience</h3>
        <div className="space-y-10">

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Wicresoft | Interaction Designer</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2025.05 - Present</span>
            </div>
            <p className="text-foreground/70 text-sm mb-3">Join Baidu ERNIE Bot team (UX Applied Model Dept.) Responsible for interaction design of the Data Annotation Platform and Data Engineering Platform.</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">Requirement analysis:</span> clarify requirements and goals, identify key issues, and support solution delivery.</li>
              <li><span className="font-semibold">Interaction design:</span> conduct competitor analysis and solution exploration; design core flows, key components.</li>
              <li><span className="font-semibold">Collaboration:</span> work with PM and Devs, support design reviews, and follow implementation quality.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Luxshare Precision | Product Manager (Mobile OS Interaction)</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2024.12 - 2025.03</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>Responsible for AI mobile system design and competitor analysis. Also worked on AI development tools, defining requirements based on multiple rounds of user interviews.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Thoughtworks Xi'an | UX Designer</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2019.10 - 2024.08</span>
            </div>
            <p className="text-foreground/70 text-sm mb-3">Participated in projects for clients like Huawei and Mercedes-Benz, with responsibilities including:</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>Used user research to find business goals and set the design direction.</li>
              <li>Created interaction and visual designs and presented them to clients for approval.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Quanying Technology Co., Ltd. (Xi'an) | Interaction Designer</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2018.04 - 2019.10</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>Responsible for the interaction design of the Quanying Cloud product, covering both web and mobile platforms.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Beijing Wanxiu Tech (Gaea) | UI Designer</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2017.03 - 2018.04</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>Handled the design of "Lü Fa Shi Camp," encompassing interaction design, UI design, and motion design.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Newton Science Education Co., Ltd. | UI Designer</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2016.03 - 2017.03</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li>Responsible for the UI design, H5 event interface design.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Project Experience */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Project Experience</h3>
        <div className="space-y-10">

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">ERNIE Data Annotation Platform & Data Engineering Platform</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2025.05 - Present</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">Annotation Platform UX Improvements:</span> Designed workflows for part-time annotators and improved key features such as agent components, complex content comparison, and AI pre-check to enhance efficiency and quality control.</li>
              <li><span className="font-semibold">Data Engineering Platform Redesign:</span> Led end-to-end interaction improvements. Rebuilt key workflows (data upload, QA, initial review, final review, release), making processes easier to understand and lowering the barrier for engineers.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Mercedes-Benz Financial Services Platform</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2021.05 - 2024.07</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">0-1 Design | Design System</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">0-1 Design:</span> Led the 0-1 design for the Dealer Platform (DSS) and Agent Portal. Improved the user retention system and simplified complex workflows.</li>
              <li><span className="font-semibold">Design System:</span> Built a design library with over 20 components to speed up development.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Huawei Enterprise Projects</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2019.11 - 2021.04</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">Multi-field ToB Design</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">Multi-field ToB Design:</span> Managed full design cycles for network management (OSS ISSTAR), device control (HEM), and ads. Served over 100,000 users.</li>
              <li><span className="font-semibold">Cross-platform Consistency:</span> Created a design systems for Web and Mobile. Increased component reuse by 40% and cut development time by 25%.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">EV User Research & Testing</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2020.04 - 2024.03</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">User Research & Usability Testing</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">User Interviews:</span> Found pain points and validated 20+ features through deep interviews.</li>
              <li><span className="font-semibold">User Shadowing:</span> Used car cameras to record 7 days of real driving behavior to identify pain points.</li>
              <li><span className="font-semibold">Usability Testing:</span> Tested 30+ core tasks. Used eye-tracking to analyze the interface and set feature priorities.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
              <h4 className="text-lg font-bold text-foreground">Quanying Cloud Platform</h4>
              <span className="text-primary font-medium text-sm mt-1 md:mt-0">2018.04 - 2019.10</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3">Industrial Internet</p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              <li><span className="font-semibold">Industrial Internet:</span> Designed core modules for energy monitoring, smart alerts, and digital twins.</li>
              <li><span className="font-semibold">Data Visualization:</span> Designed interactive charts and data trends for Web and Big Screens.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Education</h3>
        <ul className="space-y-2 text-foreground/90 list-disc pl-5">
          <li>Huaqiao University | Bachelor's Degree in Industrial Design | 2012-2016</li>
          <li>Tatung University, Taiwan | Exchange Student in Industrial Design | 2014-2015</li>
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Skills</h3>
        <ul className="space-y-2 text-foreground/90 list-disc pl-5">
          <li>Figma/Sketch: Expert</li>
          <li>AI-driven Prototyping: Proficient</li>
          <li>Principal (动效): Proficient</li>
          <li>Adobe PS/AI: Proficient</li>
        </ul>
      </section>

    </div>
  );
}

export default function Resume() {
  const { lang, t } = useLanguage();

  return (
    <PageTransition className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-border/50 pb-8">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4">{lang === "zh" ? "简历" : "Resume"}</h1>
        </div>
        <Button onClick={() => alert('Download functionality coming soon!')} className="gap-2 shrink-0 w-fit">
          <Download className="w-4 h-4" /> {lang === "zh" ? "下载简历" : "Download Resume"}
        </Button>
      </div>

      {lang === "zh" ? <ResumeZH /> : <ResumeEN />}

    </PageTransition>
  );
}
