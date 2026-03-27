import { CONTACT_INFO } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-border bg-card py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-3xl font-display font-bold mb-4">{t("footer_heading")}</h2>
          <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
            {t("footer_desc")}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-muted-foreground w-16">{t("footer_email")}</span> {CONTACT_INFO.email}
          </a>
          <div className="font-medium text-foreground flex items-center gap-2">
            <span className="text-muted-foreground w-16">{t("footer_phone")}</span> {CONTACT_INFO.phone}
          </div>
          <div className="font-medium text-foreground flex items-center gap-2">
            <span className="text-muted-foreground w-16">{t("footer_wechat")}</span> {CONTACT_INFO.wechat}
          </div>
          <a href={`https://${CONTACT_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-muted-foreground w-16">{t("footer_social")}</span> LinkedIn
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-border/50 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {t("footer_copyright")}
      </div>
    </footer>
  );
}
