"use client";

import type { Lesson, LessonRef, VocabularyRef } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import CourseSidebar from "@/components/layout/CourseSidebar";
import GrammarSection from "@/components/grammar/GrammarSection";
import FillInTheBlank from "@/components/exercises/FillInTheBlank";
import TranslationExercise from "@/components/exercises/TranslationExercise";

interface Props {
  lesson: Lesson;
  yearId: string;
  lessons: LessonRef[];
  vocabulary: VocabularyRef[];
}

export default function LessonContent({ lesson, yearId, lessons, vocabulary }: Props) {
  const { t } = useLanguage();

  return (
    <div className="flex">
      <CourseSidebar year={yearId} lessons={lessons} vocabulary={vocabulary} />

      <div className="flex-1 max-w-4xl px-4 sm:px-8 py-8">
        <h1 className="font-serif text-3xl font-bold mb-1">
          {t(lesson.title)}
        </h1>
        {lesson.title.es && (
          <p className="text-muted text-sm mb-6">{lesson.title.es}</p>
        )}

        {/* Video placeholder */}
        {lesson.videoPlaceholder && (
          <div className="bg-sand/50 border border-border rounded-xl p-6 mb-8 text-center">
            {lesson.videoPlaceholder.videoUrl ? (
              <video
                controls
                className="w-full rounded-lg"
                src={lesson.videoPlaceholder.videoUrl}
              />
            ) : (
              <>
                <div className="text-4xl mb-2">&#127909;</div>
                <h3 className="font-serif font-semibold">
                  {t(lesson.videoPlaceholder.title)}
                </h3>
                <p className="text-sm text-muted">
                  {t(lesson.videoPlaceholder.description)}
                </p>
              </>
            )}
          </div>
        )}

        {/* Grammatica secties */}
        {lesson.grammarSections.map((section, i) => (
          <GrammarSection key={i} section={section} />
        ))}

        {/* Scheidingslijn */}
        {lesson.grammarSections.length > 0 && lesson.exercises.length > 0 && (
          <hr className="my-8 border-border" />
        )}

        {/* Oefeningen */}
        <div className="space-y-8">
          {lesson.exercises.map((exercise) => {
            if (exercise.type === "fill_in_blank" || exercise.type === "sentence_completion") {
              return (
                <FillInTheBlank
                  key={exercise.id}
                  exercise={exercise}
                  lessonSlug={lesson.slug}
                />
              );
            }
            if (exercise.type === "translation") {
              return (
                <TranslationExercise
                  key={exercise.id}
                  exercise={exercise}
                  lessonSlug={lesson.slug}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
