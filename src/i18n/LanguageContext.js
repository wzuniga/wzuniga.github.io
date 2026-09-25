import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ui from "./ui";

export const LANGUAGES = [
  { code: "en", label: "EN", name: "English", locale: "en-US" },
  { code: "es", label: "ES", name: "Español", locale: "es-ES" },
  { code: "pt", label: "PT", name: "Português", locale: "pt-BR" },
];

const STORAGE_KEY = "wz-lang";
const SUPPORTED = LANGUAGES.map((l) => l.code);

// Saved choice first, then the browser language, then English.
function detectLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch (err) {
    // storage unavailable (private mode, blocked cookies)
  }
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : "en";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // ignore
    }
  }, [lang]);

  // UI string lookup with {placeholder} interpolation; falls back to English.
  const t = useCallback(
    (key, vars) => {
      let text = ui[lang][key] ?? ui.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([name, value]) => {
          text = text.replace(`{${name}}`, value);
        });
      }
      return text;
    },
    [lang]
  );

  // Resolves a content value that may be a plain string or { en, es, pt }.
  const tr = useCallback(
    (value) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value[lang] ?? value.en;
      }
      return value;
    },
    [lang]
  );

  const locale = LANGUAGES.find((l) => l.code === lang).locale;

  const value = useMemo(() => ({ lang, setLang, t, tr, locale }), [lang, t, tr, locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
