import { useState } from "react";
import { MARQUEE } from "../data/content";

/**
 * Keyword ticker.
 *
 * The old build ran an infinite marquee with no way to stop it (WCAG 2.2.2
 * Pause, Stop, Hide). It now exposes an explicit pause control and stops
 * automatically for anyone who prefers reduced motion.
 */
export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee">
      <div
        className="marquee-viewport"
        data-paused={paused ? "true" : "false"}
      >
        <div className="marquee-track">
          {items.map((item, i) => (
            <span className="marquee-item" key={`${item}-${i}`}>
              {item}
              <span className="marquee-dot" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="marquee-toggle"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        <span className="marquee-toggle-text">
          {paused ? "Play" : "Pause"}
        </span>
      </button>
    </div>
  );
}