"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { UILanguage, LocalizedText } from "./types";

interface LanguageContextType {
  language: UILanguage;
  setLanguage: (lang: UILanguage) => void;
  t: (text: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<UILanguage>("en");

  useEffect(() => {
    const saved = localStorage.getItem("course-language") as UILanguage;
    if (saved === "en" || saved === "nl") setLanguageState(saved);
  }, []);

  const setLanguage = (lang: UILanguage) => {
    setLanguageState(lang);
    localStorage.setItem("course-language", lang);
  };

  const t = (text: LocalizedText): string => {
    if (language === "nl" && text.nl) return text.nl;
    return text.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
