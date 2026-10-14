import Section, { SectionBare } from "./Section";
import { ABOUT, LEADERSHIP, WORK, MENTORSHIP, PUBLISHED, CONVERSATION } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

function ExternalLink({ href, children }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="btn-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <Section id="about" title={ABOUT.heading}>
      <div className="prose">
        {ABOUT.body.map((p) => (
          <p key={p}>{t(p)}</p>
        ))}
      </div>
      <p className="prose-links">
        <ExternalLink href={ABOUT.link.href}>{t(ABOUT.link.label)}</ExternalLink>
      </p>
    </Section>
  );
}

export function Leadership() {
  const { t } = useLang();
  return (
    <SectionBare id="leadership">
      <div className="card-grid card-grid-3">
        {LEADERSHIP.cards.map((card) => (
          <article className="card" key={card.title}>
            <p className="card-kicker">{t(card.kicker)}</p>
            <h3 className="card-title">{t(card.title)}</h3>
            <p className="card-body">{t(card.body)}</p>
            <ExternalLink href={card.link.href}>{t(card.link.label)}</ExternalLink>
          </article>
        ))}
      </div>
    </SectionBare>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <Section id="work" title={WORK.heading}>
      <div className="prose">
        <p>{t(WORK.body)}</p>
      </div>
      <div className="card-grid card-grid-4">
        {WORK.pillars.map((p, i) => (
          <article className="card card-num" key={p.title}>
            <p className="card-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="card-title">{t(p.title)}</h3>
            <p className="card-body">{t(p.body)}</p>
          </article>
        ))}
      </div>
      <p className="prose-links">
        <ExternalLink href={WORK.link.href}>{t(WORK.link.label)}</ExternalLink>
      </p>
    </Section>
  );
}

export function Conversation() {
  const { t } = useLang();
  return (
    <Section id="conversation" title={CONVERSATION.heading}>
      <div className="split-media">
        <figure className="media-figure">
          <img
            src={CONVERSATION.image}
            alt={t(CONVERSATION.imageAlt)}
            loading="lazy"
            decoding="async"
            width="1200"
            height="675"
          />
          <figcaption className="media-caption">
            {t(CONVERSATION.caption)}{" "}
            <ExternalLink href={CONVERSATION.link.href}>
              {t(CONVERSATION.link.label)}
            </ExternalLink>
          </figcaption>
        </figure>
        <div className="media-copy">
          <p className="card-kicker">{t(CONVERSATION.kicker)}</p>
          <p className="card-body">{t(CONVERSATION.body)}</p>
        </div>
      </div>
    </Section>
  );
}

export function Mentorship() {
  const { t } = useLang();
  return (
    <Section id="mentorship" title={MENTORSHIP.heading}>
      <div className="prose">
        <p>{t(MENTORSHIP.body)}</p>
      </div>
      <article className="feature-card">
        <p className="card-kicker">{t(MENTORSHIP.kicker)}</p>
        <h3 className="feature-card-title">{t(MENTORSHIP.title)}</h3>
        <p className="card-body">{t(MENTORSHIP.body2)}</p>
        <p className="fine-print">{t(MENTORSHIP.note)}</p>
        <ExternalLink href={MENTORSHIP.link.href}>{t(MENTORSHIP.link.label)}</ExternalLink>
      </article>
    </Section>
  );
}

export function Published() {
  const { t } = useLang();
  return (
    <Section id="published" title={PUBLISHED.heading}>
      <article className="quote-card">
        <p className="card-kicker">{t(PUBLISHED.kicker)}</p>
        <p className="card-body">{t(PUBLISHED.body)}</p>
        <ExternalLink href={PUBLISHED.link.href}>{t(PUBLISHED.link.label)}</ExternalLink>
        <p className="fine-print">{t(PUBLISHED.note)}</p>
      </article>
    </Section>
  );
}