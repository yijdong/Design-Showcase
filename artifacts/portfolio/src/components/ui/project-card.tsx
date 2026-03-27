import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "./pill";
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { lang } = useLanguage();

  const linkUrl = project.type === "commercial"
    ? `/projects/${project.id}`
    : `/vibe-coding/${project.id}`;

  const title = lang === "zh" ? project.titleZh : project.title;
  const description = lang === "zh" ? project.descriptionZh : project.description;

  return (
    <Link href={linkUrl} className={cn("group block outline-none", className)}>
      <article className="h-full flex flex-col bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:border-foreground/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary">

        <div className="absolute top-6 right-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out z-10 text-primary">
          <ArrowUpRight className="w-6 h-6" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors pr-8">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
          {description}
        </p>
      </article>
    </Link>
  );
}
