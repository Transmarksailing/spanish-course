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

export default function CourseSidebar({ year, lessons, vocabulary }: CourseSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-60 bg-card border-r border-border min-h-[calc(100vh-3.5rem)] p-3 hidden lg:block overflow-y-auto">
      <nav>
        <div className="mb-5">
          <h3 className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2 px-2">
            Werkwoorden / Tijden
          </h3>
          <ul className="space-y-0.5">
            {lessons.map((lesson, index) => {
              const href = `/curso/${year}/${lesson.slug}`;
              const isActive = pathname === href;
              return (
                <li key={lesson.slug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/80 hover:bg-sand hover:text-foreground"
                    }`}
                  >
                    <span className="w-5 h-5 rounded text-[10px] font-medium bg-sand flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="truncate">{t(lesson.title)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {vocabulary.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2 px-2">
              Vocabulario
            </h3>
            <ul className="space-y-0.5">
              {vocabulary.map((vocab) => {
                const href = `/curso/${year}/vocabulary/${vocab.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={vocab.slug}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/80 hover:bg-sand hover:text-foreground"
                      }`}
                    >
                      <span className="w-5 text-center text-xs shrink-0">📖</span>
                      <span className="truncate">{t(vocab.title)}</span>
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
