import { HERO } from "../data/content";
import { useLang } from "../i18n/LanguageProvider";

export default function Hero() {
  const { t } = useLang();

  return (
    <header className="hero">
      <div className="shell hero-inner">
        <p className="hero-eyebrow">
          <span>{t(HERO.eyebrow)}</span>
          <span className="hero-location">{t(HERO.location)}</span>
        </p>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-name">{t(HERO.name)}</h1>
            <p className="hero-role">{t(HERO.role)}</p>
            <p className="hero-lede">{t(HERO.lede)}</p>
            <p className="hero-position">
              {t(HERO.roleLine1)}
              <br />
              {t(HERO.roleLine2)}
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#work">
                {t("Explore the work")}
                <span className="btn-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a className="btn btn-ghost" href="#contact">
                {t("Connect")}
              </a>
            </div>
          </div>

          <figure className="hero-figure">
            {/* Decorative wireframe globe sits behind the portrait. */}
            <div className="hero-globe" aria-hidden="true">
              <GlobeArt />
            </div>
            <img
              className="hero-portrait"
              src={HERO.portrait}
              alt={t(HERO.portraitAlt)}
              width="720"
              height="860"
            />
            <figcaption className="hero-caption">
              {t(HERO.portraitCaption)}
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}

/** Static SVG network-sphere, mirroring the original decorative graphic. */
function GlobeArt() {
  const nodes = [
    [50, 6], [72, 15], [86, 30], [92, 48], [88, 66], [74, 80], [56, 88],
    [38, 84], [22, 72], [12, 56], [14, 36], [28, 18], [45, 30], [62, 26],
    [76, 44], [66, 60], [48, 64], [34, 48], [55, 46], [80, 56], [40, 14],
    [18, 30],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 10], [10, 11], [11, 0], [0, 12], [12, 13], [13, 14],
    [14, 3], [4, 15], [15, 6], [12, 16], [16, 7], [13, 17], [17, 10],
    [14, 19], [19, 5], [11, 20], [20, 1], [12, 18], [18, 14], [16, 15],
    [17, 16], [21, 11], [21, 10],
  ];

  return (
    <svg viewBox="0 0 100 100" role="presentation" focusable="false">
      <circle cx="50" cy="50" r="44" className="globe-ring" />
      <g className="globe-edges">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g className="globe-nodes">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" />
        ))}
      </g>
    </svg>
  );
}