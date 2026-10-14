import { FOOTER, sectionNumber } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="footer-line">
          <span className="footer-num" aria-hidden="true">
            {sectionNumber("booking")}
          </span>
          {t(FOOTER.line)}
        </p>
      </div>
    </footer>
  );
}