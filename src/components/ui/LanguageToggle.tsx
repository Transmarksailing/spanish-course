"use client";

import type { UILanguage } from "@/lib/types";

interface LanguageToggleProps {
  language: UILanguage;
  onChange: (lang: UILanguage) => void;
}

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-sand rounded-lg p-1">
      <button
        onClick={() => onChange("en")}
        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
          language === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        ES ↔ EN
      </button>
      <button
        onClick={() => onChange("nl")}
        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
          language === "nl"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        ES ↔ NL
      </button>
    </div>
  );
}
