import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MESSAGES, LANGS } from "./messages";
import { EXTRA_MESSAGES } from "./extra-messages";

const ALL_MESSAGES = { ...MESSAGES, ...EXTRA_MESSAGES };

const LangContext = createContext(null);

const STORAGE_KEY = "dr-raju-lang";

function detectInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && LANGS.some((l) => l.code === saved)) return saved;
  for (const l of LANGS) {
    if (l.code === "en") continue;
    const nav = window.navigator.languages || [window.navigator.language || "en"];
    if (nav.some((n) => n && n.toLowerCase().startsWith(l.code))) return l.code;
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang);

  // Keep <html lang> in sync. The old build left it pinned to "en" in every
  // language, which breaks screen-reader pronunciation (WCAG 3.1.1 / 3.1.2).
  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang);
    document.documentElement.lang = meta ? meta.htmlLang : "en";
  }, [lang]);

  const setLangAndPersist = useCallback((next) => {
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — language simply won't persist */
    }
  }, []);

  // Translate by English source string, falling back to English when absent.
  const t = useCallback(
    (key) => {
      const entry = ALL_MESSAGES[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang: setLangAndPersist, t, langs: LANGS }),
    [lang, setLangAndPersist, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}