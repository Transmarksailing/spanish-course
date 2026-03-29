"use client";

import { useState, useRef, useCallback } from "react";
import type { Exercise } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import { checkAnswer, getCorrectAnswer } from "@/lib/validation";
import { saveProgress } from "@/lib/progress";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SpecialChars from "@/components/ui/SpecialChars";
import ExerciseFeedback from "./ExerciseFeedback";
import ProgressBar from "@/components/ui/ProgressBar";

interface Props {
  exercise: Exercise;
  lessonSlug: string;
}

interface ItemState {
  value: string;
  status: "default" | "correct" | "incorrect";
  showFeedback: boolean;
  attempts: number;
}

export default function FillInTheBlank({ exercise, lessonSlug }: Props) {
  const { t } = useLanguage();
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const [states, setStates] = useState<Record<string, ItemState>>(() =>
    Object.fromEntries(
      exercise.items.map((item) => [
        item.id,
        { value: "", status: "default" as const, showFeedback: false, attempts: 0 },
      ])
    )
  );

  const activeInputId = useRef<string | null>(null);

  const completedCount = Object.values(states).filter(
    (s) => s.status === "correct"
  ).length;

  const handleCheck = useCallback(
    (itemId: string) => {
      const item = exercise.items.find((i) => i.id === itemId);
      if (!item) return;

      const state = states[itemId];
      if (state.status === "correct") return;

      const isCorrect = checkAnswer(state.value, item.correctAnswers);
      const newAttempts = state.attempts + 1;

      setStates((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          status: isCorrect ? "correct" : "incorrect",
          showFeedback: true,
          attempts: newAttempts,
        },
      }));

      saveProgress({
        lessonSlug,
        exerciseId: exercise.id,
        itemId,
        isCorrect,
        attempts: newAttempts,
        completedAt: new Date().toISOString(),
      });

      // Bij incorrect: na 2 seconden reset naar default zodat ze opnieuw kunnen proberen
      if (!isCorrect) {
        setTimeout(() => {
          setStates((prev) => ({
            ...prev,
            [itemId]: {
              ...prev[itemId],
              status: "default",
            },
          }));
        }, 2000);
      }
    },
    [exercise, states, lessonSlug]
  );

  const handleInsertChar = useCallback((char: string) => {
    if (!activeInputId.current) return;
    const input = inputRefs.current.get(activeInputId.current);
    if (!input) return;

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const newValue =
      input.value.substring(0, start) + char + input.value.substring(end);

    setStates((prev) => ({
      ...prev,
      [activeInputId.current!]: {
        ...prev[activeInputId.current!],
        value: newValue,
        status: "default",
        showFeedback: false,
      },
    }));

    // Focus terug en cursor na ingevoegd karakter
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  }, []);

  const renderInput = (item: (typeof exercise.items)[0]) => {
    const state = states[item.id];
    return (
      <div className="inline-flex flex-col min-w-[140px] sm:min-w-[180px]">
        <Input
          ref={(el) => {
            if (el) inputRefs.current.set(item.id, el);
          }}
          value={state.value}
          status={state.status}
          placeholder="..."
          disabled={state.status === "correct"}
          onFocus={() => (activeInputId.current = item.id)}
          onChange={(e) =>
            setStates((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                value: e.target.value,
                status: "default",
                showFeedback: false,
              },
            }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheck(item.id);
          }}
        />
        <ExerciseFeedback
          isCorrect={state.status === "correct"}
          correctAnswer={getCorrectAnswer(item.correctAnswers)}
          show={state.showFeedback}
        />
        {item.hint && state.attempts > 0 && state.status !== "correct" && (
          <span className="text-xs text-muted italic mt-0.5">{item.hint}</span>
        )}
      </div>
    );
  };

  const renderSentence = (item: (typeof exercise.items)[0]) => {
    // Support before/after format (e.g. "Quiero que tú ___ más.")
    if (item.before !== undefined || item.after !== undefined) {
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {item.before && <span className="text-sm">{item.before}</span>}
          {renderInput(item)}
          {item.after && <span className="text-sm">{item.after}</span>}
        </div>
      );
    }

    // Original sentence format with ___ blank marker
    const parts = (item.sentence || "").split(/(_+)/);
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        {parts.map((part, i) => {
          if (part.match(/^_+$/)) {
            return <span key={i}>{renderInput(item)}</span>;
          }
          return (
            <span key={i} className="text-sm">
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold text-foreground">
          {t(exercise.instruction)}
        </h4>
        <ProgressBar current={completedCount} total={exercise.items.length} />
      </div>

      <div className="space-y-2 sm:space-y-3">
        {exercise.items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors ${
              states[item.id].status === "correct"
                ? "bg-success-light/50"
                : "bg-card"
            }`}
          >
            <span className="text-xs text-muted font-mono w-5 sm:w-6 pt-2 text-right shrink-0">
              {index + 1}.
            </span>
            <div className="flex-1 min-w-0">
              {renderSentence(item)}
            </div>
            {states[item.id].status !== "correct" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCheck(item.id)}
                className="shrink-0 mt-0.5"
              >
                Check
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SpecialChars onInsert={handleInsertChar} />
      </div>
    </div>
  );
}
