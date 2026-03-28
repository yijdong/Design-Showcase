import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { Pill } from "@/components/ui/pill";
import { useProject } from "@/hooks/use-portfolio";
import { useLanguage } from "@/lib/language-context";
import NotFound from "./not-found";

export default function ProjectDetail() {
  const [matchProjects, paramsProjects] = useRoute("/projects/:id");
  const [matchVibe, paramsVibe] = useRoute("/vibe-coding/:id");

  const id = (paramsProjects?.id || paramsVibe?.id) as string;
  const isVibe = !!matchVibe;
  const { lang, t } = useLanguage();

  const { data: project } = useProject(id);

  if (!project) {
    return <NotFound />;
  }

  const { details } = project;
  const title = lang === "zh" ? project.titleZh : project.title;
  const description = lang === "zh" ? project.descriptionZh : project.description;
  const background = lang === "zh" ? details.backgroundZh : details.background;
  const problem = lang === "zh" ? details.problemZh : details.problem;
  const role = lang === "zh" ? details.roleZh : details.role;
  const process = lang === "zh" ? details.processZh : details.process;
  const outcome = lang === "zh" ? details.outcomeZh : details.outcome;

  const backLabel = isVibe ? t("detail_back_vibe") : t("detail_back_projects");
  const backPath = isVibe ? "/vibe-coding" : "/projects";

  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link href={backPath} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        {/* Hero Header */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => <Pill key={tag}>{tag}</Pill>)}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Cover Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-card border border-border shadow-md mb-20 relative">
          {project.coverImage ? (
            <img
              src={`${import.meta.env.BASE_URL}images/${project.coverImage}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium">
              {t("detail_cover_placeholder")}
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-20">

          <Section title={t("detail_background")}>
            <p className="text-lg leading-relaxed text-foreground/90">{background}</p>
          </Section>

          <Section title={t("detail_problem")}>
            <p className="text-lg leading-relaxed text-foreground/90 border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
              {problem}
            </p>
          </Section>

          <Section title={t("detail_role")}>
            <p className="text-lg leading-relaxed font-medium text-foreground">{role}</p>
          </Section>

          <Section title={t("detail_process")}>
            <p className="text-lg leading-relaxed text-foreground/90">{process}</p>
          </Section>

          <Section title={t("detail_solutions")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.solutions.map((solution, i) => (
                <div key={i} className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {lang === "zh" ? solution.titleZh : solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {lang === "zh" ? solution.descriptionZh : solution.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title={t("detail_outcome")}>
            <p className="text-xl md:text-2xl leading-relaxed font-display font-medium text-primary-foreground">
              "{outcome}"
            </p>
          </Section>

        </div>
      </div>
    </PageTransition>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
