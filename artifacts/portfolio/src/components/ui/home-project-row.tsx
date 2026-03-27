import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface HomeProjectRowProps {
  project: Project;
  href: string;
  showDate?: boolean;
}

export function HomeProjectRow({ project, href, showDate = false }: HomeProjectRowProps) {
  const { lang } = useLanguage();

  const title = lang === "zh" ? project.titleZh : project.title;
  const description = lang === "zh" ? project.descriptionZh : project.description;
  const tags = project.tags;

  return (
    <Link href={href} className="group block outline-none">
      <article className="relative flex items-stretch overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5">

        {/* Left: text content */}
        <div className="flex-1 min-w-0 p-8 flex flex-col gap-4 transition-all duration-500">
          {showDate && project.date && (
            <span className="text-xs font-medium text-primary tracking-wide">
              {project.date}
            </span>
          )}

          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-border text-xs font-medium text-foreground/70 bg-background"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: image — hidden by default, expands on hover */}
        <div
          className={cn(
            "w-0 overflow-hidden shrink-0 transition-all duration-500 ease-out",
            "group-hover:w-[42%]"
          )}
        >
          <div className="h-full w-[100%] min-w-[280px] relative">
            <img
              src={`${import.meta.env.BASE_URL}images/${project.coverImage}`}
              alt={title}
              className="h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
              style={{ minWidth: "280px" }}
            />
            {/* Arrow indicator */}
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 shadow-sm">
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
