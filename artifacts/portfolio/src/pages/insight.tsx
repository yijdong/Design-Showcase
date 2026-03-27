import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { useArticles } from "@/hooks/use-portfolio";
import { useLanguage } from "@/lib/language-context";

export default function Insight() {
  const { data: articles } = useArticles();
  const { lang, t } = useLanguage();

  return (
    <PageTransition className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="mb-16">
        <h1 className="text-5xl font-display font-bold mb-6">{t("insight_title")}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t("insight_subtitle")}
        </p>
      </div>

      <div className="space-y-12">
        {articles.map((article) => (
          <article key={article.id} className="group flex flex-col gap-3 py-6 border-b border-border/50">
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              {lang === "zh" ? article.dateZh : article.date}
            </span>
            <Link href={`/insight/${article.id}`}>
              <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-200">
                {lang === "zh" ? article.titleZh : article.title}
              </h2>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              {lang === "zh" ? article.summaryZh : article.summary}
            </p>
            <Link href={`/insight/${article.id}`} className="inline-flex items-center gap-2 text-sm font-semibold mt-2 hover:text-primary transition-colors w-fit">
              {t("insight_read_more")} <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}
      </div>

    </PageTransition>
  );
}
