"use client";

import { useState, useCallback, useRef } from "react";
import type { VocabularyWord } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SpecialChars from "@/components/ui/SpecialChars";
import ExerciseFeedback from "@/components/exercises/ExerciseFeedback";
import ProgressBar from "@/components/ui/ProgressBar";
import { checkAnswer } from "@/lib/validation";

interface Props {
  words: VocabularyWord[];
  direction: "to-spanish" | "from-spanish";
}

interface WordState {
  value: string;
  status: "default" | "correct" | "incorrect";
  showFeedback: boolean;
}

// Normalize word data — handles both old format (spanish/english/dutch)
// and new format (es/en/nl) from vocabulary JSON files
function getWordFields(word: Record<string, string>) {
  return {
    spanish: word.spanish || word.es || "",
    english: word.english || word.en || "",
    dutch: word.dutch || word.nl || "",
  };
}

export default function VocabularyPractice({ words, direction }: Props) {
  const { language, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<WordState>({
    value: "",
    status: "default",
    showFeedback: false,
  });
  const [correctCount, setCorrectCount] = useState(0);

  const rawWord = words[currentIndex];
  if (!rawWord) return null;

  const currentWord = getWordFields(rawWord as unknown as Record<string, string>);

  const prompt =
    direction === "to-spanish"
      ? language === "nl"
        ? currentWord.dutch
        : currentWord.english
      : currentWord.spanish;

  const correctAnswers =
    direction === "to-spanish"
      ? [currentWord.spanish]
      : language === "nl"
        ? [currentWord.dutch]
        : [currentWord.english];

  const handleCheck = useCallback(() => {
    if (state.status === "correct") return;
    const isCorrect = checkAnswer(state.value, correctAnswers);

    setState({
      value: state.value,
      status: isCorrect ? "correct" : "incorrect",
      showFeedback: true,
    });

    if (isCorrect) setCorrectCount((c) => c + 1);

    if (!isCorrect) {
      setTimeout(() => {
        setState((prev) => ({ ...prev, status: "default" }));
      }, 2000);
    }
  }, [state.value, correctAnswers]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((i) => i + 1);
      setState({ value: "", status: "default", showFeedback: false });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleInsertChar = useCallback((char: string) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const newValue =
      input.value.substring(0, start) + char + input.value.substring(end);
    setState((prev) => ({
      ...prev,
      value: newValue,
      status: "default",
      showFeedback: false,
    }));
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <ProgressBar
        current={currentIndex + (state.status === "correct" ? 1 : 0)}
        total={words.length}
        className="mb-6"
      />

      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <p className="text-xs text-muted mb-2 uppercase tracking-wider">
          {direction === "to-spanish" ? t({ en: "Translate to Spanish", nl: "Vertaal naar Spaans" }) : t({ en: "Translate from Spanish", nl: "Vertaal vanuit Spaans" })}
        </p>
        <p className="text-2xl font-bold text-foreground mb-6">
          {prompt}
        </p>

        <div className="space-y-3">
          <Input
            ref={inputRef}
            value={state.value}
            status={state.status}
            placeholder={t({ en: "Your answer...", nl: "Jouw antwoord..." })}
            disabled={state.status === "correct"}
            onChange={(e) =>
              setState({
                value: e.target.value,
                status: "default",
                showFeedback: false,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (state.status === "correct") handleNext();
                else handleCheck();
              }
            }}
            className="text-center text-lg"
          />

          <ExerciseFeedback
            isCorrect={state.status === "correct"}
            correctAnswer={correctAnswers[0]}
            show={state.showFeedback}
          />

          <div className="flex justify-center gap-2 mt-4">
            {state.status === "correct" ? (
              <Button onClick={handleNext} size="lg">
                {currentIndex < words.length - 1 ? t({ en: "Next", nl: "Volgende" }) : t({ en: "Finish", nl: "Klaar" })}
              </Button>
            ) : (
              <Button onClick={handleCheck} size="lg">
                {t({ en: "Check", nl: "Controleer" })}
              </Button>
            )}
          </div>

          <SpecialChars onInsert={handleInsertChar} />
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-4">
        {t({ en: `${correctCount} correct out of ${currentIndex + (state.status === "correct" ? 1 : 0)}`, nl: `${correctCount} goed van de ${currentIndex + (state.status === "correct" ? 1 : 0)}` })}
      </p>
    </div>
  );
}
