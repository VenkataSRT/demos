import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { GALLERY } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

const total = GALLERY.slides.length;

export default function Gallery() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);

  const go = (next) => setIndex((next + total) % total);

  // Arrow-key support, scoped to the gallery so it doesn't hijack the page.
  const regionRef = useRef(null);
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index]);

  const slide = GALLERY.slides[index];

  return (
    <Section id="gallery" title={GALLERY.heading}>
      <div
        className="gallery"
        ref={regionRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={t(GALLERY.heading)}
        tabIndex={0}
      >
        <div className="gallery-stage">
          <img
            key={slide.src}
            className={`gallery-slide${slide.contain ? " is-contain" : ""}`}
            src={slide.src}
            alt={t(slide.alt)}
            loading="lazy"
            decoding="async"
            width="1200"
            height="675"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
              touchX.current = null;
            }}
          />

          <button
            type="button"
            className="gallery-arrow gallery-prev"
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">â†</span>
            <span className="sr-only">{t("Previous photo")}</span>
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-next"
            onClick={() => go(index + 1)}
          >
            <span aria-hidden="true">â†’</span>
            <span className="sr-only">{t("Next photo")}</span>
          </button>

          <p className="gallery-counter" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div className="gallery-meta">
          <p className="gallery-caption">
            <strong>{t(slide.caption)}</strong>
            <span className="gallery-meta-sub">{t(slide.meta)}</span>
          </p>
        </div>

        <ul className="gallery-thumbs">
          {GALLERY.slides.map((s, i) => (
            <li key={s.src + i}>
              <button
                type="button"
                className="gallery-thumb"
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
              >
                <img
                  className={s.contain ? "is-contain" : ""}
                  src={s.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="240"
                  height="135"
                />
                <span className="sr-only">{`Photo ${i + 1}: ${t(s.thumb)}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="fine-print gallery-source">
        {t(GALLERY.sourcePrefix)}{" "}
        {GALLERY.sourceLinks.map((l, i) => (
          <span key={l.href}>
            {i > 0 ? " Â· " : ""}
            <a className="text-link" href={l.href} target="_blank" rel="noopener noreferrer">
              {t(l.label)}
            </a>
          </span>
        ))}
      </p>
    </Section>
  );
}