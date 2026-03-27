import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav_about"), path: "/" },
    { label: t("nav_projects"), path: "/projects" },
    { label: t("nav_vibe"), path: "/vibe-coding" },
    { label: t("nav_insight"), path: "/insight" },
    { label: t("nav_resume"), path: "/resume" },
  ];

  const isCurrentPath = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 inset-x-0 h-[72px] bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="text-xl font-display font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Yijun Dong
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isCurrentPath(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "relative text-sm font-medium transition-colors py-2",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
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

        {/* Mobile: language toggle + menu */}
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
          <Link href="/">Menu</Link>
        </div>
      </div>
    </header>
  );
}
