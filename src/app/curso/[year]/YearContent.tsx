"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import type { YearIndex } from "@/lib/types";

interface Props {
  yearId: string;
  year: YearIndex;
}

export default function YearContent({ yearId, year }: Props) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 max-w-4xl px-4 sm:px-8 py-8">
      <h1 className="text-2xl font-bold mb-1">
        {t(year.title)}
      </h1>
      <p className="text-muted text-sm mb-8">{t(year.description)}</p>

      <h2 className="text-lg font-semibold mb-4">
        {t({ en: "Lessons", nl: "Lessen" })}
      </h2>
      <div className="space-y-2">
        {year.lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/curso/${yearId}/${lesson.slug}`}
            className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                {t(lesson.title)}
              </h3>
              {lesson.title.es && (
                <p className="text-xs text-muted truncate">{lesson.title.es}</p>
              )}
            </div>
            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              &rarr;
            </span>
          </Link>
        ))}
      </div>

      {year.vocabulary.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-10 mb-4">
            {t({ en: "Vocabulary", nl: "Woordenlijsten" })}
          </h2>
          <div className="space-y-2">
            {year.vocabulary.map((vocab) => (
              <Link
                key={vocab.slug}
                href={`/curso/${yearId}/vocabulary/${vocab.slug}`}
                className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-lg shrink-0">
                  &#128218;
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                    {t(vocab.title)}
                  </h3>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
