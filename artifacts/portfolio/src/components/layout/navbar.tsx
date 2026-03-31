import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const SECTIONS = ["about", "projects", "ai"] as const;
type SectionId = typeof SECTIONS[number];

const NAV_LABELS: Record<SectionId, { zh: string; en: string }> = {
  about: { zh: "关于我", en: "About Me" },
  projects: { zh: "项目案例", en: "Projects" },
  ai: { zh: "Vibe Coding & AI", en: "Vibe Coding & AI" },
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [location, navigate] = useLocation();
  const { lang, setLang } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location === "/" || location === "";

  /* shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll spy — highlight section that occupies ≥50% of viewport */
  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (sectionId: SectionId) => {
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 h-[68px] bg-background/85 backdrop-blur-md border-b border-border/50 z-50 transition-shadow duration-300",
        scrolled && "shadow-md shadow-black/10"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-display font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Yijun Dong
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {SECTIONS.map((id) => {
            const label = lang === "zh" ? NAV_LABELS[id].zh : NAV_LABELS[id].en;
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={cn(
                  "relative text-sm font-medium transition-colors py-2 cursor-pointer",
                  active ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </button>
            );
          })}

          {/* Language Toggle */}
          <div className="flex items-center gap-1 ml-4 border border-border rounded-full px-1 py-0.5 text-sm font-semibold">
            <button
              onClick={() => setLang("zh")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all duration-200",
                lang === "zh"
                  ? "bg-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              CN
            </button>
            <span className="text-border select-none">/</span>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all duration-200",
                lang === "en"
                  ? "bg-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3 text-sm font-medium">
          <div className="flex items-center gap-1 border border-border rounded-full px-1 py-0.5">
            <button
              onClick={() => setLang("zh")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all duration-200",
                lang === "zh" ? "bg-primary text-foreground" : "text-muted-foreground"
              )}
            >
              CN
            </button>
            <span className="text-border select-none">/</span>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all duration-200",
                lang === "en" ? "bg-primary text-foreground" : "text-muted-foreground"
              )}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
