import React from "react";
import { Download, ArrowRight, ExternalLink, Globe } from "lucide-react";

export default function BentoGrid() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-violet-500/30">
      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-zinc-100 tracking-tight">
            Yijun Dong
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-zinc-100 transition-colors">About</a>
            <a href="#projects" className="hover:text-zinc-100 transition-colors">Projects</a>
            <a href="#vibe" className="hover:text-zinc-100 transition-colors">Vibe</a>
            <a href="#insight" className="hover:text-zinc-100 transition-colors">Insight</a>
            <a href="#resume" className="hover:text-zinc-100 transition-colors">Resume</a>
            <div className="w-px h-4 bg-zinc-800 mx-2"></div>
            <button className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[160px]">
          
          {/* Identity Card - Top Left (col-span-2, row-span-2) */}
          <div className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-2">
                Yijun Dong <span className="text-zinc-500 text-3xl font-normal">(董一均)</span>
              </h1>
              <p className="text-violet-400 font-medium tracking-wide mb-6">UI/UX Designer</p>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                "I design with intention — blending research, systems thinking, and aesthetic precision to craft experiences that are both beautiful and purposeful."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8 relative z-10">
              <button className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-full font-medium hover:bg-white transition-colors focus:ring-2 focus:ring-violet-500 focus:outline-none">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
              <button className="flex items-center gap-2 bg-zinc-800/50 text-zinc-100 border border-zinc-700 px-5 py-2.5 rounded-full font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-colors focus:ring-2 focus:ring-violet-500 focus:outline-none">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Photo - Top Right (col-span-1, row-span-2) */}
          <div className="md:col-span-1 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-2 overflow-hidden">
            <div className="w-full h-full min-h-[300px] md:min-h-0 rounded-2xl bg-gradient-to-br from-purple-300 to-blue-400 flex items-center justify-center">
              <span className="text-white/30 font-medium rotate-[-15deg] text-xl tracking-widest uppercase">Photo</span>
            </div>
          </div>

          {/* Skills Card - Top Far Right (col-span-1, row-span-1) */}
          <div className="md:col-span-1 md:row-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-center">
            <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Top Skills</h3>
            <div className="flex flex-col gap-2">
              {['Figma', 'User Research', 'Prototyping'].map(skill => (
                <div key={skill} className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-200 text-xs px-3 py-1.5 rounded-full font-medium w-fit">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Empty/Extra Card - Top Far Right (col-span-1, row-span-1) to fill the 2x4 grid cleanly */}
          <div className="md:col-span-1 md:row-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center justify-center group cursor-pointer hover:bg-zinc-800/50 transition-colors">
            <div className="text-center">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4 text-violet-400" />
              </div>
              <p className="text-sm text-zinc-400 font-medium">All Skills</p>
            </div>
          </div>

          {/* Vibe Projects Row - Middle (2x col-span-2) */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:bg-zinc-800/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors">Personal Website</h3>
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              <p className="text-zinc-400 mb-6">A portfolio site built entirely with natural language and AI.</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-medium text-violet-400 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">Vibe Coding</span>
              <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">Replit</span>
            </div>
          </div>

          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:bg-zinc-800/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors">Emo AI</h3>
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              <p className="text-zinc-400 mb-6">Emotionally intelligent companion designed for empathy.</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-medium text-violet-400 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">AI</span>
              <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">Product Design</span>
            </div>
          </div>

          {/* Commercial Projects Row - Bottom (2x col-span-2) */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:bg-zinc-800/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors">Bank Smart Customer Service</h3>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors transform group-hover:translate-x-1" />
              </div>
              <p className="text-zinc-400 mb-6">Redesigning the digital service flow for enterprise banking clients.</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                <span className="text-xs font-medium text-violet-400 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">Fintech</span>
                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">UX Research</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">2023</span>
            </div>
          </div>

          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:bg-zinc-800/30 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors">WeChat Mini Program</h3>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors transform group-hover:translate-x-1" />
              </div>
              <p className="text-zinc-400 mb-6">Mobile-first e-commerce experience reaching millions of users.</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                <span className="text-xs font-medium text-violet-400 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">Mobile</span>
                <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">UX Design</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">2022</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
