"use client";

import { useState, useCallback } from "react";
import type { Exercise } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import { saveProgress } from "@/lib/progress";
import ProgressBar from "@/components/ui/ProgressBar";

interface Props {
  exercise: Exercise;
  lessonSlug: string;
}

interface ItemState {
  selected: string | null;
  status: "default" | "correct" | "incorrect";
}

export default function MultipleChoice({ exercise, lessonSlug }: Props) {
  const { t } = useLanguage();

  const [states, setStates] = useState<Record<string, ItemState>>(() =>
    Object.fromEntries(
      exercise.items.map((item) => [
        item.id,
        { selected: null, status: "default" as const },
      ])
    )
  );

  const completedCount = Object.values(states).filter(
    (s) => s.status === "correct"
  ).length;

  // Extract options from hint field (format: "option1|option2|option3")
  const getOptions = (hint?: string): string[] => {
    if (!hint) return [];
    return hint.split("|").map((o) => o.trim());
  };

  const handleSelect = useCallback(
    (itemId: string, option: string) => {
      const item = exercise.items.find((i) => i.id === itemId);
      if (!item) return;

      const state = states[itemId];
      if (state.status === "correct") return;

      const isCorrect = item.correctAnswers.includes(option);

      setStates((prev) => ({
        ...prev,
        [itemId]: {
          selected: option,
          status: isCorrect ? "correct" : "incorrect",
        },
      }));

      saveProgress({
        lessonSlug,
        exerciseId: exercise.id,
        itemId,
        isCorrect,
        attempts: (state.status === "incorrect" ? 2 : 1),
        completedAt: new Date().toISOString(),
      });

      if (!isCorrect) {
        setTimeout(() => {
          setStates((prev) => ({
            ...prev,
            [itemId]: { selected: null, status: "default" },
          }));
        }, 1500);
      }
    },
    [exercise, states, lessonSlug]
  );

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-semibold text-foreground">
          {t(exercise.instruction)}
        </h4>
        <ProgressBar current={completedCount} total={exercise.items.length} />
      </div>

      <div className="space-y-2 sm:space-y-3">
        {exercise.items.map((item, index) => {
          const state = states[item.id];
          const options = getOptions(item.hint);

          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-colors ${
                state.status === "correct"
                  ? "bg-success-light/50"
                  : state.status === "incorrect"
                  ? "bg-danger-light/50"
                  : "bg-card"
              }`}
            >
              <span className="text-xs text-muted font-mono w-5 sm:w-6 text-right shrink-0">
                {index + 1}.
              </span>
              <span className="text-sm font-semibold text-foreground min-w-[160px]">
                {item.sentence}
              </span>
              <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(item.id, option)}
                    disabled={state.status === "correct"}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all font-medium ${
                      state.status === "correct" && state.selected === option
                        ? "bg-success text-white border-success"
                        : state.status === "incorrect" && state.selected === option
                        ? "bg-danger text-white border-danger animate-shake"
                        : state.status === "correct"
                        ? "opacity-50 cursor-default border-border text-muted"
                        : "border-border hover:border-primary hover:text-primary cursor-pointer bg-card"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
