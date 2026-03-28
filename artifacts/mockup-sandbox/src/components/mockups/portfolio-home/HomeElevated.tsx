import { motion } from "framer-motion";
import { Download, ArrowRight, MousePointer2, Layers, Users, ClipboardCheck } from "lucide-react";

const vibeProjects = [
  { id: "1", title: "个人主页", description: "探索现代前端与 AI 辅助编程的边界，使用 Replit 快速构建响应式个人作品集。", tags: ["Vibe Coding", "Replit"] },
  { id: "2", title: "Emo AI", description: "一款具有情感感知能力的 AI 助手界面设计，旨在提供更温暖、自然的人机对话体验。", tags: ["AI", "Product Design"] },
];

const commercialProjects = [
  { id: "3", title: "企业协作平台重设计", date: "2024", description: "对拥有千万级用户的复杂 B2B 协作系统进行体验重构，优化核心工作流，提升企业沟通与协作效率。", tags: ["B2B", "工作流"] },
  { id: "4", title: "AI 数据看板", date: "2024", description: "为企业管理层设计的数据可视化平台，集成 AI 自动分析与洞察生成，让海量数据变得清晰可操作。", tags: ["AI", "Dashboard"] },
];

const skills = [
  { icon: MousePointer2, title: "交互设计", tools: "Figma · Sketch", level: "精通", pct: 90 },
  { icon: Layers, title: "视觉设计", tools: "AI原型", level: "熟练", pct: 70 },
  { icon: Users, title: "用户研究", tools: "Principal · 动效", level: "熟练", pct: 70 },
  { icon: ClipboardCheck, title: "可用性测试", tools: "Adobe PS · AI", level: "熟练", pct: 70 },
];

export function HomeElevated() {
  return (
    <div className="min-h-screen text-stone-900 bg-[#faf6ee] font-sans selection:bg-amber-200">
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(180,130,50,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm font-bold tracking-widest text-stone-500 uppercase block mb-4">
                  你好，我是
                </span>
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-4">
                  <span className="text-amber-500">怡君</span>
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-800">
                  UX 设计师。
                </h2>
              </div>
              
              <p className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed italic font-serif">
                专注设计复杂 B2B 系统与 AI 产品，让混乱变得清晰。
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex flex-wrap items-center gap-6"
            >
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold rounded-none hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                <Download className="w-5 h-5" /> 下载简历
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-stone-800 text-stone-800 font-bold rounded-none hover:bg-stone-800 hover:text-white transition-all duration-200">
                查看项目 <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative shrink-0 mt-12 md:mt-0"
          >
            {/* Offset shadow rectangle */}
            <div className="absolute inset-0 bg-amber-500 translate-x-3 translate-y-3 z-0" />
            {/* Photo frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-rose-100 border-2 border-amber-500 z-10 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tr from-amber-200/50 to-orange-200/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-[#f5bc51] py-20 border-y border-amber-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className="flex items-center gap-6 pb-6 border-b border-amber-900/10 last:border-b-0 md:last:border-b">
                  <div className="shrink-0 w-14 h-14 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-950">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-bold text-lg text-amber-950">{skill.title}</h3>
                      <span className="text-sm font-semibold text-amber-900/60">{skill.level}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-sm font-medium text-amber-900/80">{skill.tools}</span>
                      <div className="flex-1 h-1.5 bg-amber-900/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-amber-950 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vibe Projects Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 shrink-0">Vibe Coding & AI</h2>
          <div className="flex-1 h-px bg-amber-400/40 mt-2"></div>
        </div>

        <div className="space-y-8">
          {vibeProjects.map((project, i) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row bg-white hover:bg-stone-50 transition-colors border border-stone-200 overflow-hidden"
            >
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-600 transition-colors">{project.title}</h3>
                <p className="text-stone-600 mb-8 leading-relaxed max-w-3xl">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-[120px] h-48 sm:h-auto bg-gradient-to-br from-amber-100 to-rose-200 shrink-0 border-l border-stone-100" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* Commercial Projects Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 shrink-0">商业项目</h2>
          <div className="flex-1 h-px bg-amber-400/40 mt-2"></div>
        </div>

        <div className="space-y-8">
          {commercialProjects.map((project, i) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row bg-white hover:bg-stone-50 transition-colors border border-stone-200 overflow-hidden"
            >
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                {project.date && (
                  <span className="text-sm font-bold text-amber-600 mb-3 block">{project.date}</span>
                )}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-600 transition-colors">{project.title}</h3>
                <p className="text-stone-600 mb-8 leading-relaxed max-w-3xl">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-[120px] h-48 sm:h-auto bg-gradient-to-br from-stone-200 to-amber-100 shrink-0 border-l border-stone-100" />
            </motion.article>
          ))}
        </div>
      </section>
      
    </div>
  );
}
