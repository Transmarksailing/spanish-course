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

export default function VocabularyContent({
  vocabulary,
  yearId,
  lessons,
  vocabularyRefs,
}: Props) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"list" | "practice-to-es" | "practice-from-es">("list");

  const allWords = vocabulary.categories.flatMap((c) => c.words);

  return (
    <div className="flex">
      <CourseSidebar year={yearId} lessons={lessons} vocabulary={vocabularyRefs} />

      <div className="flex-1 max-w-4xl px-4 sm:px-8 py-8">
        <h1 className="font-serif text-3xl font-bold mb-2">
          {t(vocabulary.title)}
        </h1>
        <p className="text-muted text-sm mb-6">
          {allWords.length} words across {vocabulary.categories.length} categories
        </p>

        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === "list" ? "primary" : "outline"}
            onClick={() => setMode("list")}
          >
            Word List
          </Button>
          <Button
            variant={mode === "practice-to-es" ? "secondary" : "outline"}
            onClick={() => setMode("practice-to-es")}
          >
            Practice → Spanish
          </Button>
          <Button
            variant={mode === "practice-from-es" ? "secondary" : "outline"}
            onClick={() => setMode("practice-from-es")}
          >
            Practice ← Spanish
          </Button>
        </div>

        {mode === "list" && <WordList categories={vocabulary.categories} />}
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
