"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import type { LessonRef, VocabularyRef } from "@/lib/types";

interface CourseSidebarProps {
  year: string;
  lessons: LessonRef[];
  vocabulary: VocabularyRef[];
}

const lessonIcons: Record<string, string> = {
  "present-perfect": "✓",
  "future-ir-a": "→",
  "simple-future": "»",
  "ignorance-expressions": "?",
  "present-subjunctive": "~",
  "past-subjunctive": "≈",
  "commands-vosotros": "!",
  "ser-vs-estar": "≡",
};

export default function CourseSidebar({ year, lessons, vocabulary }: CourseSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
      <nav>
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3 px-2">
            Lessons
          </h3>
          <ul className="space-y-1">
            {lessons.map((lesson) => {
              const href = `/curso/${year}/${lesson.slug}`;
              const isActive = pathname === href;
              return (
                <li key={lesson.slug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-sand"
                    }`}
                  >
                    <span className="w-5 text-center text-xs">
                      {lessonIcons[lesson.slug] || "•"}
                    </span>
                    {t(lesson.title)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {vocabulary.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3 px-2">
              Vocabulary
            </h3>
            <ul className="space-y-1">
              {vocabulary.map((vocab) => {
                const href = `/curso/${year}/vocabulary/${vocab.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={vocab.slug}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-sand"
                      }`}
                    >
                      <span className="w-5 text-center text-xs">📖</span>
                      {t(vocab.title)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
