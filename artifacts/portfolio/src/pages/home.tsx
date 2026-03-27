import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { SkillsSection } from "@/components/ui/skills-section";
import { HomeProjectRow } from "@/components/ui/home-project-row";
import { useCommercialProjects, useVibeProjects } from "@/hooks/use-portfolio";
import { ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { data: commercialProjects } = useCommercialProjects();
  const { data: vibeProjects } = useVibeProjects();
  const { t } = useLanguage();

  return (
    <PageTransition className="pt-24 pb-16">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              {t("home_hi")} <span className="text-primary">{t("home_name_highlight")}</span>。<br />
              {t("home_title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("home_tagline")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/resume" className="inline-block">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" /> {t("home_download_resume")}
              </Button>
            </Link>
            <Link href="/projects" className="inline-block">
              <Button variant="outline" size="lg" className="gap-2">
                {t("home_view_projects")} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-48 h-48 md:w-72 md:h-72 shrink-0 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-background"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/profile-placeholder.png`}
            alt="Yijun Dong"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Vibe Coding Preview */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-display font-bold">{t("home_vibe_section")}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">{t("home_vibe_desc")}</p>
          </div>
          <Link href="/vibe-coding" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {t("home_see_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {vibeProjects.map((project) => (
            <HomeProjectRow
              key={project.id}
              project={project}
              href={`/vibe-coding/${project.id}`}
              showDate={false}
            />
          ))}
        </div>
      </section>

      {/* Commercial Projects Preview */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-display font-bold">{t("home_commercial_section")}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">{t("home_commercial_desc")}</p>
          </div>
          <Link href="/projects" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {t("home_see_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {commercialProjects.map((project) => (
            <HomeProjectRow
              key={project.id}
              project={project}
              href={`/projects/${project.id}`}
              showDate={true}
            />
          ))}
        </div>
      </section>

    </PageTransition>
  );
}
