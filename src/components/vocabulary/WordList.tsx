"use client";

import { useState } from "react";
import type { VocabularyCategory } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";

interface Props {
  categories: VocabularyCategory[];
}

type PracticeMode = "view" | "hide-spanish" | "hide-translation";

// Normalize word data — handles both old format (id/spanish/english/dutch)
// and new format (es/en/nl) from vocabulary JSON files
function getWordFields(word: Record<string, string>) {
  const id = word.id || word.es || word.spanish || "";
  const spanish = word.spanish || word.es || "";
  const english = word.english || word.en || "";
  const dutch = word.dutch || word.nl || "";
  return { id, spanish, english, dutch };
}

export default function WordList({ categories }: Props) {
  const { language, t } = useLanguage();
  const [mode, setMode] = useState<PracticeMode>("view");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleReveal = (wordId: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(wordId)) next.delete(wordId);
      else next.add(wordId);
      return next;
    });
  };

  const getTranslation = (english: string, dutch: string) =>
    language === "nl" ? dutch : english;

  const modes: { key: PracticeMode; label: string }[] = [
    { key: "view", label: "All" },
    { key: "hide-spanish", label: "Hide ES" },
    { key: "hide-translation", label: language === "nl" ? "Hide NL" : "Hide EN" },
  ];

  return (
    <div className="my-4">
      <div className="flex gap-1 mb-5 bg-sand rounded-lg p-1 w-fit">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setRevealed(new Set()); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === m.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {categories.map((category) => (
        <div key={t(category.name)} className="mb-6">
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            {t(category.name)}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {category.words.map((rawWord) => {
              const word = getWordFields(rawWord as unknown as Record<string, string>);
              const isRevealed = revealed.has(word.id);
              const hideSpanish = mode === "hide-spanish" && !isRevealed;
              const hideTranslation = mode === "hide-translation" && !isRevealed;
              const isClickable = mode !== "view";

              return (
                <div
                  key={word.id}
                  onClick={() => isClickable && toggleReveal(word.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                    isClickable ? "cursor-pointer hover:border-primary/30" : ""
                  } ${
                    isRevealed ? "border-success/30 bg-success-light/30" : "border-border bg-card"
                  }`}
                >
                  <span className={`text-sm font-medium ${hideSpanish ? "text-border select-none" : "text-foreground"}`}>
                    {hideSpanish ? "tap to reveal" : word.spanish}
                  </span>
                  <span className={`text-sm ${hideTranslation ? "text-border select-none" : "text-muted"}`}>
                    {hideTranslation ? "tap" : getTranslation(word.english, word.dutch)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
