import Section from "./Section";
import { CONTACT } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

export default function Contact() {
  const { t } = useLang();

  return (
    <Section id="contact" title={CONTACT.heading}>
      <p className="lead">{t(CONTACT.body)}</p>

      {/*
        The old build rendered these two as inline siblings inside a block
        container with a 12px right margin on the mailto link, which put the
        gap on the wrong side — the two collided and the LinkedIn arrow glyph
        was clipped. A flex row with a real gap cannot drift like that.
      */}
      <div className="contact-actions">
        {CONTACT.actions.map((a) =>
          a.variant === "solid" ? (
            <a key={a.label} className="btn btn-solid" href={a.href}>
              {t(a.label)}
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <a
              key={a.label}
              className="btn btn-outline"
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(a.label)}
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )
        )}
      </div>

      <p className="fine-print">{t(CONTACT.note)}</p>
    </Section>
  );
}