"use client";

import { useLanguage } from "@/lib/language-context";

interface Props {
  isCorrect: boolean;
  correctAnswer: string;
  show: boolean;
}

export default function ExerciseFeedback({ isCorrect, correctAnswer, show }: Props) {
  const { t } = useLanguage();
  if (!show) return null;

  if (isCorrect) {
    return (
      <div className="animate-fadeIn flex items-center gap-2 mt-1">
        <span className="text-success font-bold text-lg">&#10003;</span>
        <span className="text-success text-sm font-medium">{t({ en: "Correct!", nl: "Correct!" })}</span>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn flex items-center gap-2 mt-1">
      <span className="text-danger font-bold text-lg">&#10007;</span>
      <span className="text-sm text-muted">
        {t({ en: "Correct answer:", nl: "Juiste antwoord:" })}{" "}
        <strong className="text-secondary">{correctAnswer}</strong>
      </span>
    </div>
  );
}
