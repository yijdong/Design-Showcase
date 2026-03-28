import React from "react";
import { Download, ArrowRight } from "lucide-react";

export default function CenteredMinimal() {
  const projects = [
    { id: "01", title: "Personal Website", tags: "Vibe Coding, Replit" },
    { id: "02", title: "Emo AI", tags: "AI, Product Design" },
    { id: "03", title: "Bank Smart Customer Service", tags: "Fintech, UX Research" },
    { id: "04", title: "WeChat Mini Program", tags: "Mobile, UX" },
  ];

  const skills = [
    "Figma",
    "User Research",
    "Prototyping",
    "Design Systems",
    "Framer",
    "Usability Testing",
  ];

  const navLinks = [
    "About",
    "Projects",
    "Vibe",
    "Insight",
    "Resume",
    "CN/EN",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
        <div className="text-sm font-medium tracking-tight">Yijun Dong</div>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 pt-32 pb-24 flex flex-col items-center">
        {/* Portrait */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 to-blue-400 shadow-xl shadow-purple-900/10" />

        {/* Identity */}
        <h1 className="text-5xl font-bold text-center mt-8 tracking-tight text-white">
          Yijun Dong
        </h1>
        <h2 className="text-zinc-400 text-center mt-2 font-medium">
          UI/UX Designer
        </h2>

        {/* Bio */}
        <p className="text-zinc-500 text-center mt-6 text-sm leading-loose max-w-sm mx-auto">
          "I design with intention — blending research, systems thinking, and
          aesthetic precision to craft experiences that are both beautiful and
          purposeful."
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-8">
          <button className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors py-2 px-4 rounded-full hover:bg-zinc-900">
            <Download className="w-4 h-4" />
            Download Resume
          </button>
          <button className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors py-2 px-4 rounded-full hover:bg-zinc-900">
            View Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full mt-20 border-t border-zinc-800/50" />

        {/* Projects */}
        <div className="w-full mt-16 flex flex-col">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex items-baseline gap-4 py-5 border-b border-zinc-800/50 hover:border-zinc-700/50 transition-colors cursor-pointer"
            >
              <span className="text-zinc-700 text-xs font-mono w-6 group-hover:text-zinc-500 transition-colors">
                {project.id}
              </span>
              <span className="text-white font-medium flex-1 group-hover:text-violet-300 transition-colors">
                {project.title}
              </span>
              <span className="text-zinc-600 text-xs group-hover:text-zinc-400 transition-colors">
                {project.tags}
              </span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-zinc-600 text-xs uppercase tracking-widest hover:text-zinc-400 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
