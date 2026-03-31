import { useState, useRef } from "react";
import { Plus, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

/* ─────────────────────────────────────────────
   1. AI 数据标注平台 — vertical step flow
   ───────────────────────────────────────────── */
export function AnnotationIllustration() {
  const BrowserBar = () => (
    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5">
      <div className="flex gap-1.5 mr-4">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
      <div className="flex-1 h-4 bg-white/5 rounded border border-white/5 flex items-center px-2">
        <div className="w-16 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#0a0c10] flex items-start justify-center p-8 font-sans select-none overflow-y-auto">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12 relative">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Step 01 */}
        <div className="w-full flex items-center group">
          <div className="flex-1 pr-8 text-right">
            <h2 className="text-white/40 text-xs tracking-[0.2em] font-bold mb-1 uppercase">Step 01</h2>
            <h3 className="text-white text-lg font-bold tracking-wide">项目管理</h3>
            <p className="text-white/30 text-xs mt-1 leading-relaxed">高效创建与分配标注任务</p>
          </div>
          <div className="relative">
            <div className="absolute top-full left-1/2 w-px h-10 bg-gradient-to-b from-blue-500/50 to-transparent -translate-x-1/2" />
            <div className="w-[360px] bg-[#161b22] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-500">
              <BrowserBar />
              <div className="p-4 flex justify-between items-center border-b border-white/5">
                <div className="text-white/80 text-xs font-bold">标注项目管理</div>
                <div className="px-2 py-1 bg-blue-600 rounded-lg flex items-center gap-1 shadow-lg shadow-blue-900/20">
                  <Plus size={9} className="text-white" />
                  <span className="text-white text-[10px] font-medium whitespace-nowrap">新建标注项目</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3 py-2 px-1 border-b border-white/5 last:border-0 items-center">
                    <div className="w-1/3 h-2 bg-white/10 rounded-full" />
                    <div className="w-1/3 h-2 bg-white/5 rounded-full" />
                    <div className="w-1/3 h-2 bg-white/5 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 02 — highlighted */}
        <div className="w-full flex items-center group">
          <div className="flex-1 pr-8 text-right">
            <h2 className="text-blue-500 text-xs tracking-[0.2em] font-bold mb-1 uppercase">Step 02</h2>
            <h3 className="text-white text-lg font-bold tracking-wide">数据标注</h3>
            <p className="text-white/30 text-xs mt-1 leading-relaxed">多维度的智能标注体验</p>
          </div>
          <div className="relative scale-105 z-10">
            <div className="absolute top-full left-1/2 w-px h-10 bg-gradient-to-b from-blue-500/50 to-transparent -translate-x-1/2" />
            <div className="w-[380px] bg-[#1c2128] rounded-2xl border border-blue-500/30 flex flex-col overflow-hidden" style={{ boxShadow: "0 0 40px rgba(59,130,246,0.1)" }}>
              <BrowserBar />
              <div className="flex flex-row overflow-hidden h-[200px]">
                <div className="w-[35%] bg-white/5 border-r border-white/5 p-3 flex flex-col">
                  <div className="text-blue-400 text-[10px] font-bold border-b-2 border-blue-500 inline-block self-start pb-1 mb-3 whitespace-nowrap">参考文章/前文对话</div>
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-white/10 rounded-full opacity-60" />
                    <div className="w-3/4 h-1.5 bg-white/10 rounded-full opacity-40" />
                    <div className="w-full h-1.5 bg-white/10 rounded-full opacity-30" />
                  </div>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div className="space-y-1.5">
                    <div className="text-white/40 text-[10px] font-bold">Query</div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
                      <div className="w-3/4 h-2 bg-emerald-500/20 rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5 flex flex-col">
                    <div className="text-white/40 text-[10px] font-bold">答复</div>
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                      <div className="w-full h-2 bg-blue-500/20 rounded-full mb-2" />
                      <div className="w-5/6 h-2 bg-blue-500/20 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="text-white/20 text-[9px] uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded">Prev</div>
                    <div className="text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-blue-600 rounded shadow-md">Next</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 03 */}
        <div className="w-full flex items-center group">
          <div className="flex-1 pr-8 text-right">
            <h2 className="text-white/40 text-xs tracking-[0.2em] font-bold mb-1 uppercase">Step 03</h2>
            <h3 className="text-white text-lg font-bold tracking-wide">数据质检/审核</h3>
            <p className="text-white/30 text-xs mt-1 leading-relaxed">全方位的质量回溯与审核</p>
          </div>
          <div className="relative">
            <div className="w-[360px] bg-[#161b22] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-500">
              <BrowserBar />
              <div className="p-4 border-b border-white/5">
                <div className="text-white/80 text-xs font-bold">任务概览</div>
              </div>
              <div className="p-4 flex flex-col gap-2 relative h-[140px]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={cn("flex items-center gap-3", i === 2 ? "opacity-100" : "opacity-30")}>
                    <div className={cn("w-3 h-3 rounded border flex items-center justify-center shrink-0", i === 2 ? "bg-blue-500 border-blue-500" : "border-white/10")}>
                      {i === 2 && <div className="text-white text-[7px]">✓</div>}
                    </div>
                    <div className="flex-1 h-2 bg-white/10 rounded-full" />
                    <div className={cn("w-8 h-3 rounded-full shrink-0", i === 2 ? "bg-orange-500/20 border border-orange-500/20" : "bg-white/5")} />
                  </div>
                ))}
                <div className="absolute bottom-3 left-0 w-full flex justify-center gap-2 px-4">
                  <div className="flex-1 bg-red-500/10 text-red-400 py-1.5 rounded-lg flex justify-center items-center gap-1 border border-red-500/20 text-[10px] font-bold">
                    批量打回
                  </div>
                  <div className="flex-1 bg-emerald-500/10 text-emerald-400 py-1.5 rounded-lg flex justify-center items-center gap-1 border border-emerald-500/20 text-[10px] font-bold">
                    批量通过
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. 全球化企业设备管理平台 (Huawei)
   ───────────────────────────────────────────── */
export function HuaweiIllustration() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center p-8 select-none">
      <div className="w-full max-w-2xl">
        {/* Window */}
        <div className="bg-[rgba(30,41,59,0.65)] backdrop-blur rounded-3xl border border-white/8 shadow-2xl overflow-hidden"
          style={{ animation: "floatCenter 8s ease-in-out infinite" }}>
          {/* Title bar */}
          <div className="flex items-center px-6 py-4 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <div className="ml-6 w-28 h-1.5 bg-white/5 rounded-full" />
          </div>
          {/* Content */}
          <div className="p-10">
            <div className="text-white/30 text-[11px] uppercase tracking-[0.2em] mb-2">Home › Enterprise Console</div>
            <div className="text-white text-2xl font-bold mb-8 tracking-tight">Enterprise Console</div>
            {/* 6-grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Highlighted card */}
              <div className="rounded-2xl p-5 flex flex-col items-center justify-center border"
                style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.5)", animation: "borderPulse 2.5s ease-in-out infinite" }}>
                <svg className="w-10 h-10 mb-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div className="text-blue-400 text-sm font-bold mb-2">Device Deployment</div>
                <div className="w-16 h-1.5 bg-blue-400/20 rounded-full" />
              </div>
              {/* Plain cards */}
              {[
                { icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />, label: "Org Management" },
                { icon: <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="9" /></>, label: "Device Control" },
                { icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18" /></>, label: "App Market" },
                { icon: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /></>, label: "Billing Center" },
                { icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94" />, label: "Support" },
              ].map(({ icon, label }, i) => (
                <div key={i} className="rounded-2xl p-5 flex flex-col items-center justify-center bg-white/3 border border-white/5 opacity-60">
                  <svg className="w-10 h-10 mb-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>{icon}</svg>
                  <div className="text-white/70 text-sm font-medium mb-2">{label}</div>
                  <div className="w-16 h-1.5 bg-white/8 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes floatCenter { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.005)} }
        @keyframes borderPulse { 0%{border-color:rgba(59,130,246,0.3)} 50%{border-color:rgba(59,130,246,0.9)} 100%{border-color:rgba(59,130,246,0.3)} }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. 汽车金融服务平台 (Mercedes-Benz)
   ───────────────────────────────────────────── */
export function MercedesIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 select-none relative overflow-hidden"
      style={{ background: "radial-gradient(circle at top, #1a2a44 0%, #0d1117 100%)" }}>
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(59,130,246,0.12)", filter: "blur(120px)", animation: "glowDrift 15s infinite alternate ease-in-out" }} />
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(30,64,175,0.15)", filter: "blur(120px)", animation: "glowDrift 15s infinite alternate ease-in-out", animationDelay: "-5s" }} />
      <div className="w-full max-w-2xl" style={{ animation: "windowAppear 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
        {/* Mac window */}
        <div className="rounded-2xl overflow-hidden border border-white/8"
          style={{ background: "rgba(23,27,34,0.7)", backdropFilter: "blur(24px)", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.7)" }}>
          {/* Title bar */}
          <div className="h-11 px-5 flex items-center border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] mr-2" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] mr-2" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <div className="ml-6 w-28 h-1 bg-white/5 rounded-full" />
          </div>
          <div className="p-7 flex flex-col gap-5">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-white text-2xl font-bold tracking-tight">Wang Lin</h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20 font-bold tracking-widest uppercase">VIP Client</span>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-lg shadow-lg shadow-blue-900/30">Assign Manager</button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[4, 5, 3, 2].map((w, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-1.5 w-8 bg-white/8 rounded-full" />
                  <div className={cn("h-2 bg-white/10 rounded-full", w === 5 ? "w-4/5" : w === 4 ? "w-3/4" : w === 3 ? "w-2/3" : "w-1/2")} />
                </div>
              ))}
            </div>
            {/* Timeline */}
            <div className="relative h-10 flex items-center border-y border-white/5">
              <div className="w-4/5 mx-auto h-0.5 bg-white/5 relative">
                <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500"
                  style={{ boxShadow: "0 0 15px #3b82f6" }} />
                <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20" />
              </div>
              <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 px-3 bg-[#13171e] text-[9px] text-blue-400/50 uppercase tracking-[0.3em]">Customer Journey</div>
            </div>
            {/* Main content */}
            <div className="flex gap-6 h-44">
              {/* Sidebar */}
              <div className="w-52 flex flex-col gap-2">
                <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" /></svg>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-1.5 w-full bg-white/15 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-white/8 rounded-full" />
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-white/5 bg-white/5 flex items-center gap-3 opacity-40">
                  <div className="w-8 h-8 rounded-lg bg-white/5" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-1.5 w-1/3 bg-white/8 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Detail */}
              <div className="flex-1 bg-black/20 rounded-2xl p-5 border border-white/5 flex flex-col relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Technical Specification</div>
                    <h2 className="text-white text-lg font-semibold">Mercedes-EQE SUV</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-white/20 text-[9px] font-bold uppercase mb-0.5">Estimate</div>
                    <div className="text-white text-2xl font-light tracking-tighter">¥ 486,000</div>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {[40, 32].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                      <div className="h-1.5 bg-white/10 rounded-full opacity-30" style={{ width: w + "%" }} />
                    </div>
                  ))}
                </div>
                {/* Car SVG */}
                <div className="flex-1 flex items-center justify-center relative">
                  <svg className="w-52" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="carGradMb" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>
                    </defs>
                    <circle cx="120" cy="120" r="22" fill="#0a0a0a" />
                    <circle cx="120" cy="120" r="15" fill="#111" stroke="#3b82f6" strokeWidth="0.5" />
                    <circle cx="380" cy="120" r="22" fill="#0a0a0a" />
                    <circle cx="380" cy="120" r="15" fill="#111" stroke="#3b82f6" strokeWidth="0.5" />
                    <path d="M50,115 L80,115 C80,100 100,85 125,85 C150,85 170,100 170,115 L330,115 C330,100 350,85 375,85 C400,85 420,100 420,115 L460,115 C480,115 490,105 480,90 C460,60 400,35 320,30 C220,25 120,40 70,75 C50,90 40,105 50,115 Z" fill="url(#carGradMb)" />
                    <path d="M465,92 L478,96" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.8">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-blue-500/5 text-5xl font-black italic select-none">ELECTRIC</div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button className="px-3 py-1.5 border border-white/15 text-white/60 text-xs rounded-lg">Save Draft</button>
                  <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg">Finalize Offer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes windowAppear { from{opacity:0;transform:translateY(20px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes glowDrift { from{transform:translate(0,0) scale(1)} to{transform:translate(50px,30px) scale(1.2)} }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. 用户研究项目 — tab image gallery
   ───────────────────────────────────────────── */
const USER_RESEARCH_TABS = [
  {
    id: "camera",
    labelZh: "用户跟拍",
    labelEn: "User Shadowing",
    images: [
      { src: "camera_1.jpg", subtitleZh: "安装固定摄像头", subtitleEn: "Install Fixed Camera" },
      { src: "camera_2.jpg", subtitleZh: "安装固定摄像头", subtitleEn: "Install Fixed Camera" },
      { src: "camera_3.png", subtitleZh: "跟拍录像截图", subtitleEn: "Shadowing Screenshot" },
      { src: "camera_4.png", subtitleZh: "跟拍录像截图", subtitleEn: "Shadowing Screenshot" },
    ],
  },
  {
    id: "interview",
    labelZh: "用户访谈",
    labelEn: "User Interview",
    images: [
      { src: "interview_1.png", subtitleZh: "用户访谈", subtitleEn: "User Interview" },
      { src: "interview_2.png", subtitleZh: "用户访谈", subtitleEn: "User Interview" },
      { src: "interview_3.jpg", subtitleZh: "用户旅程地图", subtitleEn: "User Journey Map" },
      { src: "interview_4.jpg", subtitleZh: "价值矩阵", subtitleEn: "Value Matrix" },
    ],
  },
  {
    id: "usertest",
    labelZh: "可用性测试",
    labelEn: "Usability Test",
    images: [
      { src: "usertest_1.jpeg", subtitleZh: "可用性测试", subtitleEn: "Usability Testing" },
      { src: "usertest_2.jpeg", subtitleZh: "可用性测试", subtitleEn: "Usability Testing" },
      { src: "usertest_3.jpeg", subtitleZh: "可用性测试", subtitleEn: "Usability Testing" },
    ],
  },
];

export function UserResearchGallery({ lang = "zh" }: { lang?: "zh" | "en" }) {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState(0);

  const switchTab = (idx: number) => {
    if (idx === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayTab(idx);
      setActiveTab(idx);
      setAnimating(false);
    }, 200);
  };

  const tab = USER_RESEARCH_TABS[displayTab];

  return (
    <div className="w-full h-full flex flex-col bg-[#111318] rounded-xl overflow-hidden select-none">
      {/* Capsule tabs */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2">
        <div className="relative flex bg-white/8 rounded-full p-1 gap-1">
          {USER_RESEARCH_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTab(i)}
              className={cn(
                "relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300",
                activeTab === i ? "text-[#111318] bg-white shadow-sm" : "text-white/50 hover:text-white/80"
              )}
            >
              {lang === "zh" ? t.labelZh : t.labelEn}
            </button>
          ))}
        </div>
      </div>
      {/* Images grid */}
      <div
        className="flex-1 px-4 pb-4 grid gap-2 overflow-hidden transition-all duration-400"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "scale(0.98)" : "scale(1)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          gridTemplateColumns: tab.images.length === 3 ? "repeat(3,1fr)" : "repeat(2,1fr)",
        }}
      >
        {tab.images.map((img) => (
          <div key={img.src} className="relative rounded-lg overflow-hidden bg-black/20 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <img
                src={`${BASE}images/home/${img.src}`}
                alt={lang === "zh" ? img.subtitleZh : img.subtitleEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-2 py-1 text-[10px] text-white/50 font-medium bg-black/40 text-center">
              {lang === "zh" ? img.subtitleZh : img.subtitleEn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. 视觉设计项目 — tab image gallery with horizontal scroll
   ───────────────────────────────────────────── */
const VISUAL_TABS = [
  { id: "illustrator", labelZh: "插画", labelEn: "Illustration" },
  { id: "datavisual1", labelZh: "大屏", labelEn: "Big Screen" },
  { id: "datavisual2", labelZh: "数据可视化", labelEn: "Data Viz" },
];

export function VisualDesignGallery({ lang = "zh" }: { lang?: "zh" | "en" }) {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const switchTab = (idx: number) => {
    if (idx === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayTab(idx);
      setActiveTab(idx);
      setAnimating(false);
    }, 200);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const imageMap: Record<number, string> = {
    0: "illustrator.png",
    1: "datavisual_1.jpg",
    2: "datavisual_2.jpg",
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#111318] rounded-xl overflow-hidden select-none">
      {/* Capsule tabs */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2">
        <div className="relative flex bg-white/8 rounded-full p-1 gap-1">
          {VISUAL_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTab(i)}
              className={cn(
                "relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300",
                activeTab === i ? "text-[#111318] bg-white shadow-sm" : "text-white/50 hover:text-white/80"
              )}
            >
              {lang === "zh" ? t.labelZh : t.labelEn}
            </button>
          ))}
        </div>
      </div>
      {/* Image content */}
      <div
        className="flex-1 px-4 pb-4 overflow-hidden relative"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "scale(0.98)" : "scale(1)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {displayTab === 0 ? (
          /* Illustrator — horizontal scroll */
          <div className="relative h-full">
            <div
              ref={scrollRef}
              className="h-full overflow-x-auto overflow-y-hidden flex items-center"
              style={{ scrollbarWidth: "none" }}
            >
              <img
                src={`${BASE}images/home/illustrator.png`}
                alt="插画"
                className="h-full max-h-full w-auto object-contain"
              />
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          /* Normal image */
          <div className="h-full rounded-lg overflow-hidden">
            <img
              src={`${BASE}images/home/${imageMap[displayTab]}`}
              alt={VISUAL_TABS[displayTab].labelZh}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
