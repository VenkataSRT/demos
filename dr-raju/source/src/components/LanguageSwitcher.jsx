import { useLang } from "../i18n/LanguageProvider";

/**
 * Language selector.
 *
 * The old build rendered a "Language / భాష / भाषा" label beside three buttons
 * whose own labels were already the language names — redundant, and it pushed
 * the buttons onto a second row on mobile. This is a single labelled group,
 * with `lang` on each button so screen readers switch voice correctly.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, langs } = useLang();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          className="lang-btn"
          lang={l.htmlLang}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}