"use client";

import type { ExerciseProgress } from "./types";

const STORAGE_KEY = "spanish-course-progress";

export function getProgress(): ExerciseProgress[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProgress(entry: ExerciseProgress): void {
  const all = getProgress();
  const existing = all.findIndex(
    (p) =>
      p.lessonSlug === entry.lessonSlug &&
      p.exerciseId === entry.exerciseId &&
      p.itemId === entry.itemId
  );
  if (existing >= 0) {
    all[existing] = entry;
  } else {
    all.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getLessonProgress(lessonSlug: string): {
  completed: number;
  total: number;
  correct: number;
} {
  const all = getProgress().filter((p) => p.lessonSlug === lessonSlug);
  return {
    completed: all.length,
    total: 0, // wordt ingevuld door de component
    correct: all.filter((p) => p.isCorrect).length,
  };
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
