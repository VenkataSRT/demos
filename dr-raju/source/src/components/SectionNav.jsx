import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";
import { useScrollSpy } from "../hooks/useScrollSpy";

const SPY_IDS = NAV.map((n) => n.id);

/**
 * Sticky in-page navigation.
 *
 * The old build left this `position: static`, so on a ~6500px page the only
 * path to "Contact" and "Schedule a meeting" scrolled away with the hero.
 * It is now sticky and marks the current section with aria-current.
 *
 * The active pill is a single element that slides between links rather than
 * each link fading its own background — it reads as one moving object and
 * cannot drift out of sync with the scroll-spy.
 */
export default function SectionNav() {
  const { t } = useLang();
  const activeId = useScrollSpy(SPY_IDS);

  const listRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, ready: false });

  // Position the pill. Re-runs on active-section change, on language change
  // (labels change width), and on resize.
  useLayoutEffect(() => {
    const place = () => {
      const link = linkRefs.current[activeId];
      const pill = indicatorRef.current;
      const list = listRef.current;
      if (!link || !pill || !list) return;

      const l = link.getBoundingClientRect();
      const p = list.getBoundingClientRect();

      setIndicator({
        x: l.left - p.left + list.scrollLeft,
        w: l.width,
        ready: true,
      });
    };

    place();

    const ro = new ResizeObserver(place);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", place);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [activeId, t]);

  return (
    <div className="section-nav-bar">
      <nav className="section-nav" aria-label="Website sections">
        <ul className="section-nav-list" ref={listRef}>
          <span
            ref={indicatorRef}
            className="nav-indicator"
            data-visible={indicator.ready ? "true" : "false"}
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.x}px)`,
              width: `${indicator.w}px`,
            }}
          />
          {NAV.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="section-nav-link"
                  aria-current={isActive ? "true" : undefined}
                  data-active={isActive ? "true" : "false"}
                  ref={(el) => {
                    if (el) linkRefs.current[item.id] = el;
                  }}
                >
                  {t(item.label)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}