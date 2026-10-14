import { useId } from "react";
import { sectionNumber, SECTION_ORDER } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";
import Reveal from "./Reveal";

/**
 * A numbered content section. The eyebrow number is derived from the section's
 * position in SECTION_ORDER, so the sequence can never develop gaps.
 */
export default function Section({ id, title, children, className = "" }) {
  const { t } = useLang();
  const headingId = useId();
  const meta = SECTION_ORDER.find((s) => s.id === id);

  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <div className="shell">
        <Reveal className="section-inner">
          <p className="eyebrow">
            <span className="eyebrow-num">{sectionNumber(id)}</span>
            <span className="eyebrow-sep" aria-hidden="true">
              /
            </span>
            <span className="eyebrow-label">{t(meta ? meta.label : title)}</span>
          </p>
          {title ? (
            <h2 id={headingId} className="section-title">
              {t(title)}
            </h2>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Section without a visible heading — used where a card grid carries the titles. */
export function SectionBare({ id, children, className = "" }) {
  const { t } = useLang();
  const headingId = useId();
  const meta = SECTION_ORDER.find((s) => s.id === id);

  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <div className="shell">
        <h2 id={headingId} className="sr-only">
          {t(meta ? meta.label : id)}
        </h2>
        <Reveal className="section-inner">{children}</Reveal>
      </div>
    </section>
  );
}