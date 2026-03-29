"use client";

import type { Lesson, LessonRef, VocabularyRef } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import CourseSidebar from "@/components/layout/CourseSidebar";
import GrammarSection from "@/components/grammar/GrammarSection";
import FillInTheBlank from "@/components/exercises/FillInTheBlank";
import TranslationExercise from "@/components/exercises/TranslationExercise";
import MultipleChoice from "@/components/exercises/MultipleChoice";

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

      <div className="flex-1 max-w-4xl px-3 sm:px-8 py-4 sm:py-8 w-full overflow-x-hidden">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          {t(lesson.title)}
        </h1>
        {lesson.title.es && (
          <p className="text-muted text-sm mb-6">{lesson.title.es}</p>
        )}

        {/* Video */}
        {lesson.videoPlaceholder && (() => {
          const raw = lesson.videoPlaceholder.videoUrl;
          const url = raw
            ? typeof raw === "string" ? raw : t(raw)
            : "";
          const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);

          if (ytMatch) {
            return (
              <div className="mb-8 rounded-xl overflow-hidden border border-border">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                    title={t(lesson.videoPlaceholder.title)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          }

          if (url) {
            return (
              <div className="bg-sand/50 border border-border rounded-xl p-6 mb-8 text-center">
                <video controls className="w-full rounded-lg" src={url} />
              </div>
            );
          }

          return (
            <div className="bg-sand/50 border border-border rounded-xl p-6 mb-8 text-center">
              <div className="text-4xl mb-2">&#127909;</div>
              <h3 className="font-semibold">{t(lesson.videoPlaceholder.title)}</h3>
              <p className="text-sm text-muted">{t(lesson.videoPlaceholder.description)}</p>
            </div>
          );
        })()}

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
            if (exercise.type === "multiple_choice") {
              return (
                <MultipleChoice
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
