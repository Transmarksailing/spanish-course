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

export default function TranslationExercise({ exercise, lessonSlug }: Props) {
  const { language, t } = useLanguage();

  const [states, setStates] = useState<Record<string, ItemState>>(() =>
    Object.fromEntries(
      exercise.items.map((item) => [
        item.id,
        { value: "", status: "default" as const, showFeedback: false, attempts: 0 },
      ])
    )
  );

  const activeInputId = useRef<string | null>(null);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

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

      if (!isCorrect) {
        setTimeout(() => {
          setStates((prev) => ({
            ...prev,
            [itemId]: { ...prev[itemId], status: "default" },
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

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  }, []);

  const getSourceText = (item: (typeof exercise.items)[0]): string => {
    if (!item.source) return "";
    return language === "nl" && item.source.nl ? item.source.nl : item.source.en;
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
        {exercise.items.map((item, index) => {
          const state = states[item.id];
          return (
            <div
              key={item.id}
              className={`p-2.5 sm:p-4 rounded-lg border transition-colors ${
                state.status === "correct"
                  ? "bg-success-light/50 border-success/30"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xs text-muted font-mono w-5 sm:w-6 pt-1 text-right shrink-0">
                  {index + 1}.
                </span>
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {getSourceText(item)}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
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
                    {state.status !== "correct" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCheck(item.id)}
                        className="shrink-0"
                      >
                        Check
                      </Button>
                    )}
                  </div>
                  <ExerciseFeedback
                    isCorrect={state.status === "correct"}
                    correctAnswer={getCorrectAnswer(item.correctAnswers)}
                    show={state.showFeedback}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <SpecialChars onInsert={handleInsertChar} />
      </div>
    </div>
  );
}
