"use client";

import { useState } from "react";
import type { VocabularyCategory } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import Button from "@/components/ui/Button";

interface Props {
  categories: VocabularyCategory[];
}

type PracticeMode = "view" | "hide-spanish" | "hide-translation";

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

  const translationLabel = language === "nl" ? "Nederlands" : "English";
  const getTranslation = (word: { english: string; dutch: string }) =>
    language === "nl" ? word.dutch : word.english;

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted font-medium">Mode:</span>
        <Button
          size="sm"
          variant={mode === "view" ? "primary" : "outline"}
          onClick={() => { setMode("view"); setRevealed(new Set()); }}
        >
          View All
        </Button>
        <Button
          size="sm"
          variant={mode === "hide-spanish" ? "primary" : "outline"}
          onClick={() => { setMode("hide-spanish"); setRevealed(new Set()); }}
        >
          Hide Spanish
        </Button>
        <Button
          size="sm"
          variant={mode === "hide-translation" ? "primary" : "outline"}
          onClick={() => { setMode("hide-translation"); setRevealed(new Set()); }}
        >
          Hide {translationLabel}
        </Button>
      </div>

      {categories.map((category) => (
        <div key={t(category.name)} className="mb-6">
          <h4 className="font-serif text-lg font-semibold text-foreground mb-3">
            {t(category.name)}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-sand">
                  <th className="px-4 py-2 text-left font-semibold text-muted border-b border-border">
                    Espa&ntilde;ol
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-muted border-b border-border">
                    {translationLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.words.map((word, i) => {
                  const isRevealed = revealed.has(word.id);
                  const hideSpanish =
                    mode === "hide-spanish" && !isRevealed;
                  const hideTranslation =
                    mode === "hide-translation" && !isRevealed;

                  return (
                    <tr
                      key={word.id}
                      className={`${
                        i % 2 === 0 ? "bg-card" : "bg-warm-white"
                      } cursor-pointer hover:bg-sand/50 transition-colors`}
                      onClick={() =>
                        mode !== "view" && toggleReveal(word.id)
                      }
                    >
                      <td className="px-4 py-2 border-b border-border/50">
                        {hideSpanish ? (
                          <span className="text-muted italic">
                            click to reveal
                          </span>
                        ) : (
                          <span className="font-medium">{word.spanish}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-border/50">
                        {hideTranslation ? (
                          <span className="text-muted italic">
                            click to reveal
                          </span>
                        ) : (
                          getTranslation(word)
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
