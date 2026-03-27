import { useState } from "react";
import { PageTransition } from "@/components/layout/page-transition";
import { ProjectCard } from "@/components/ui/project-card";
import { useCommercialProjects } from "@/hooks/use-portfolio";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const CATEGORIES_EN = ["All", "B2B", "Finance", "Dashboard", "System"];
const CATEGORIES_ZH = ["全部", "B2B", "Finance", "Dashboard", "System"];

export default function Projects() {
  const { data: projects } = useCommercialProjects();
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = lang === "zh" ? CATEGORIES_ZH : CATEGORIES_EN;
  const filterTag = CATEGORIES_EN[activeIndex];

  const filteredProjects = projects.filter(project => {
    if (filterTag === "All") return true;
    return project.tags.includes(filterTag);
  });

  return (
    <PageTransition className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-3xl mb-16">
        <h1 className="text-5xl font-display font-bold mb-6">{t("projects_title")}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t("projects_subtitle")}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-border/50 pb-6">
        {categories.map((category, idx) => (
          <button
            key={category}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
              activeIndex === idx
                ? "bg-foreground text-background shadow-md"
                : "bg-card text-muted-foreground hover:bg-border/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} className="h-full" />
        ))}
      </div>

    </PageTransition>
  );
}
