import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { useArticle } from "@/hooks/use-portfolio";
import { useLanguage } from "@/lib/language-context";
import NotFound from "./not-found";

export default function ArticleDetail() {
  const [, params] = useRoute("/insight/:id");
  const id = params?.id as string;
  const { data: article } = useArticle(id);
  const { lang, t } = useLanguage();

  if (!article) {
    return <NotFound />;
  }

  const title = lang === "zh" ? article.titleZh : article.title;
  const date = lang === "zh" ? article.dateZh : article.date;
  const summary = lang === "zh" ? article.summaryZh : article.summary;
  const content = lang === "zh" ? article.contentZh : article.content;

  return (
    <PageTransition className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/insight" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> {t("insight_back")}
        </Link>

        <header className="mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            {date}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-border pl-6">
            {summary}
          </p>
        </header>

        <article className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed max-w-none text-foreground/90">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </div>
    </PageTransition>
  );
}
