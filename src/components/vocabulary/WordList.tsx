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
    { key: "view", label: "Alles" },
    { key: "hide-spanish", label: "Ocultar ES" },
    { key: "hide-translation", label: language === "nl" ? "Ocultar NL" : "Ocultar EN" },
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
        <div key={t(category.name)} className="mb-8">
          <h4 className="text-sm font-semibold text-primary mb-3 border-b border-border pb-2">
            {t(category.name)}
          </h4>
          <div className="divide-y divide-border/50">
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
                  className={`flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg transition-all ${
                    isClickable ? "cursor-pointer hover:bg-sand/50" : ""
                  } ${
                    isRevealed ? "bg-success-light/30" : ""
                  }`}
                >
                  <span className={`text-base font-semibold ${hideSpanish ? "text-border select-none italic" : "text-foreground"}`}>
                    {hideSpanish ? "toca para revelar" : word.spanish}
                  </span>
                  <span className={`text-sm ${hideTranslation ? "text-border select-none italic" : "text-muted"}`}>
                    {hideTranslation ? "toca" : getTranslation(word.english, word.dutch)}
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
