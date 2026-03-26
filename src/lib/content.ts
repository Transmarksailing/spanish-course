import { readFileSync, readdirSync, existsSync } from "fs";
import path from "path";
import type { YearIndex, Lesson, VocabularyList } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/years");

export function getYears(): YearIndex[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((d) => d.startsWith("year"))
    .map((d) => {
      const file = path.join(CONTENT_DIR, d, "index.json");
      if (!existsSync(file)) return null;
      return JSON.parse(readFileSync(file, "utf-8")) as YearIndex;
    })
    .filter((y): y is YearIndex => y !== null)
    .sort((a, b) => a.order - b.order);
}

export function getYear(yearId: string): YearIndex | null {
  const file = path.join(CONTENT_DIR, yearId, "index.json");
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function getLesson(yearId: string, slug: string): Lesson | null {
  const file = path.join(CONTENT_DIR, yearId, "lessons", `${slug}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function getVocabulary(yearId: string, slug: string): VocabularyList | null {
  const file = path.join(CONTENT_DIR, yearId, "vocabulary", `${slug}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf-8"));
}
