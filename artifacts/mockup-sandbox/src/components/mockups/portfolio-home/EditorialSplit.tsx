import React from "react";
import { Download, ExternalLink, ArrowRight, Globe } from "lucide-react";

export default function EditorialSplit() {
  const projects = [
    {
      id: "01",
      title: "Personal Website",
      category: "Vibe Coding, Replit",
      description: "A digital garden and portfolio crafted with AI assistance and vibe coding techniques.",
      image: "bg-gradient-to-tr from-violet-500 to-orange-300",
    },
    {
      id: "02",
      title: "Bank Smart Customer Service",
      category: "Fintech, UX Research",
      description: "Redesigning the customer service portal to streamline dispute resolution and enhance user satisfaction.",
      image: "bg-gradient-to-bl from-emerald-500 to-teal-400",
    },
    {
      id: "03",
      title: "Emo AI",
      category: "AI, Product Design",
      description: "An emotional intelligence companion app that helps users track and understand their daily moods.",
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      id: "04",
      title: "WeChat Mini Program",
      category: "Mobile, UX",
      description: "A high-conversion e-commerce mini program tailored for the Chinese market.",
      image: "bg-gradient-to-tr from-rose-400 to-orange-400",
    },
  ];

  const skills = [
    "Figma", "User Research", "Prototyping", "Design Systems", "Framer", "Usability Testing"
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Left Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-[240px] bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between py-12 px-8 z-10 hidden md:flex">
        <div className="space-y-12">
          <div>
            <h1 className="text-2xl font-serif font-medium tracking-tight text-white">
              Yijun<br />Dong
            </h1>
          </div>

          <nav className="space-y-6">
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <a href="#about" className="text-zinc-400 hover:text-white transition-colors relative group">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-400 transition-all group-hover:h-full"></span>
                About
              </a>
              <a href="#projects" className="text-white relative">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-full bg-emerald-400"></span>
                Projects
              </a>
              <a href="#vibe" className="text-zinc-400 hover:text-white transition-colors relative group">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-400 transition-all group-hover:h-full"></span>
                Vibe
              </a>
              <a href="#insight" className="text-zinc-400 hover:text-white transition-colors relative group">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-400 transition-all group-hover:h-full"></span>
                Insight
              </a>
              <a href="#resume" className="text-zinc-400 hover:text-white transition-colors relative group">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-400 transition-all group-hover:h-full"></span>
                Resume
              </a>
            </div>
          </nav>
        </div>

        <div className="space-y-6">
          <button className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            <span>EN / CN</span>
          </button>
          <div className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Yijun Dong.
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 ml-0 md:ml-[240px] overflow-y-auto bg-zinc-950">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 bg-zinc-900 border-b border-zinc-800">
          <h1 className="text-xl font-serif font-medium text-white">Yijun Dong</h1>
          <button className="text-zinc-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>

        {/* Hero Image Section */}
        <section className="relative h-96 w-full bg-gradient-to-br from-purple-900 to-blue-800 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-32">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-4">
                Yijun Dong
              </h2>
              <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed">
                UI/UX Designer
              </p>
              <p className="mt-4 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
                I design with intention — blending research, systems thinking, and aesthetic precision to craft experiences that are both beautiful and purposeful.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors rounded-none">
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-800 transition-colors rounded-none">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Strip */}
        <section className="py-12 border-b border-zinc-800 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
          
          <div className="flex gap-8 px-8 whitespace-nowrap overflow-x-auto no-scrollbar items-center justify-start md:justify-center">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{skill}</span>
                {i < skills.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>}
              </div>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto" id="projects">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-16">Selected Work</h3>
          
          <div className="flex flex-col">
            {projects.map((project, index) => {
              const isEven = index % 2 === 1; // 0-indexed, so 1 is 2nd row
              
              return (
                <article key={project.id} className="group py-16 border-b border-zinc-800/50 last:border-0 flex flex-col md:flex-row items-center gap-12 md:gap-24">
                  
                  {/* Image side - changes order based on isEven */}
                  <div className={`w-full md:w-1/2 aspect-[4/3] relative overflow-hidden bg-zinc-900 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className={`absolute inset-0 ${project.image} opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal`}></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <span className="text-5xl md:text-7xl font-serif font-light text-zinc-800 group-hover:text-emerald-400 transition-colors duration-500 mb-6">
                      {project.id}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h4>
                    <p className="text-emerald-400 text-sm font-mono uppercase tracking-wider mb-6">
                      {project.category}
                    </p>
                    <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                      {project.description}
                    </p>
                    <div>
                      <button className="text-sm font-medium text-white flex items-center gap-2 group/btn">
                        Explore Project 
                        <span className="transform group-hover/btn:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-16 border-t border-zinc-900 bg-zinc-950 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">Let's build something beautiful together.</p>
          <a href="mailto:hello@example.com" className="text-white font-medium hover:text-emerald-400 transition-colors">
            yijun@example.com
          </a>
        </footer>

      </main>
    </div>
  );
}
