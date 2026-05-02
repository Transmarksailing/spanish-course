"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <nav>
      <div className="mb-5">
        <h3 className="text-xs uppercase tracking-wider text-foreground font-bold mb-2 px-2">
          {t({ en: "Verbs / Tenses", nl: "Werkwoorden / Tijden" })}
        </h3>
        <ul className="space-y-0.5">
          {lessons.map((lesson, index) => {
            const href = `/curso/${year}/${lesson.slug}`;
            const isActive = pathname === href;
            return (
              <li key={lesson.slug}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
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
          <h3 className="text-xs uppercase tracking-wider text-foreground font-bold mb-2 px-2">
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
                    onClick={() => setMobileOpen(false)}
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
  );

  return (
    <>
      {/* Mobile/small-screen toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-30 bg-card border border-border rounded-lg p-2 shadow-md hover:bg-sand transition-colors"
        aria-label={t({ en: "Open menu", nl: "Open menu" })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-3 overflow-y-auto z-50 transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto block mb-3 p-1.5 rounded hover:bg-sand"
          aria-label={t({ en: "Close menu", nl: "Sluit menu" })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop / laptop sidebar (md and up) */}
      <aside className="w-56 lg:w-60 bg-card border-r border-border min-h-[calc(100vh-3.5rem)] p-3 hidden md:block overflow-y-auto">
        {sidebarContent}
      </aside>
    </>
  );
}
