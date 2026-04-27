"use client";

import { useState } from "react";
import type { VocabularyList, LessonRef, VocabularyRef } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import CourseSidebar from "@/components/layout/CourseSidebar";
import WordList from "@/components/vocabulary/WordList";
import VocabularyPractice from "@/components/vocabulary/VocabularyPractice";
import Button from "@/components/ui/Button";

interface Props {
  vocabulary: VocabularyList;
  yearId: string;
  lessons: LessonRef[];
  vocabularyRefs: VocabularyRef[];
}

// Normalize vocabulary data: some files have flat words[], others have categories[].words[]
function getCategories(vocabulary: VocabularyList) {
  if (vocabulary.categories && vocabulary.categories.length > 0) {
    return vocabulary.categories;
  }
  // Flat words[] format — wrap in a single category
  const raw = vocabulary as unknown as { words?: unknown[]; title: { en: string; nl?: string } };
  if (raw.words && Array.isArray(raw.words)) {
    return [{ name: vocabulary.title, words: raw.words as VocabularyList["categories"][0]["words"] }];
  }
  return [];
}

export default function VocabularyContent({
  vocabulary,
  yearId,
  lessons,
  vocabularyRefs,
}: Props) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"list" | "practice-to-es" | "practice-from-es">("list");

  const categories = getCategories(vocabulary);
  const allWords = categories.flatMap((c) => c.words);

  return (
    <div className="flex">
      <CourseSidebar year={yearId} lessons={lessons} vocabulary={vocabularyRefs} />

      <div className={`flex-1 ${vocabulary.layout === "single" ? "max-w-5xl" : "max-w-4xl"} px-4 sm:px-8 py-8`}>
        <h1 className="text-2xl font-bold mb-2">
          {t(vocabulary.title)}
        </h1>
        <p className="text-muted text-sm mb-6">
          {t({ en: `${allWords.length} words across ${categories.length} ${categories.length === 1 ? "category" : "categories"}`, nl: `${allWords.length} woorden in ${categories.length} ${categories.length === 1 ? "categorie" : "categorieën"}` })}
        </p>

        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === "list" ? "primary" : "outline"}
            onClick={() => setMode("list")}
          >
            {t({ en: "Word List", nl: "Woordenlijst" })}
          </Button>
          <Button
            variant={mode === "practice-to-es" ? "secondary" : "outline"}
            onClick={() => setMode("practice-to-es")}
          >
            {t({ en: "Practice → Spanish", nl: "Oefenen → Spaans" })}
          </Button>
          <Button
            variant={mode === "practice-from-es" ? "secondary" : "outline"}
            onClick={() => setMode("practice-from-es")}
          >
            {t({ en: "Practice ← Spanish", nl: "Oefenen ← Spaans" })}
          </Button>
        </div>

        {mode === "list" && <WordList categories={categories} layout={vocabulary.layout} />}
        {mode === "practice-to-es" && (
          <VocabularyPractice words={allWords} direction="to-spanish" />
        )}
        {mode === "practice-from-es" && (
          <VocabularyPractice words={allWords} direction="from-spanish" />
        )}
      </div>
    </div>
  );
}
