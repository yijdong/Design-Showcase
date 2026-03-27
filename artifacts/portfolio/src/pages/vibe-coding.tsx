import { PageTransition } from "@/components/layout/page-transition";
import { ProjectCard } from "@/components/ui/project-card";
import { useVibeProjects } from "@/hooks/use-portfolio";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/lib/language-context";

export default function VibeCoding() {
  const { data: projects } = useVibeProjects();
  const { t } = useLanguage();

  return (
    <PageTransition className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-3xl mb-16">
        <h1 className="text-5xl font-display font-bold mb-6">{t("vibe_title")}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          {t("vibe_subtitle")}
        </p>

        <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">{t("vibe_tools_label")}</span>
          <div className="flex gap-2">
            <Pill className="bg-white border-primary/20 text-foreground">Gemini</Pill>
            <Pill className="bg-white border-primary/20 text-foreground">Claude</Pill>
            <Pill className="bg-white border-primary/20 text-foreground">Replit AI</Pill>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </PageTransition>
  );
}
