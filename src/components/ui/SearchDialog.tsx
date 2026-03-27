"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { getYear } from "@/lib/content";
import type { LessonRef, VocabularyRef } from "@/lib/types";

interface SearchResult {
  type: "lesson" | "vocabulary";
  title: string;
  href: string;
}

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results: SearchResult[] = [];
  if (query.length >= 2) {
    const year = getYear("cours");
    if (year) {
      const q = query.toLowerCase();
      year.lessons.forEach((l: LessonRef) => {
        const title = t(l.title);
        if (title.toLowerCase().includes(q) || l.slug.includes(q)) {
          results.push({ type: "lesson", title, href: `/curso/cours/${l.slug}` });
        }
      });
      year.vocabulary.forEach((v: VocabularyRef) => {
        const title = t(v.title);
        if (title.toLowerCase().includes(q) || v.slug.includes(q)) {
          results.push({ type: "vocabulary", title, href: `/curso/cours/vocabulary/${v.slug}` });
        }
      });
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sidebar-text/80 hover:text-sidebar-text hover:bg-white/10 transition-colors text-xs"
        title="Search (Ctrl+K)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)} />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-md bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons & vocabulary..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
          />
          <kbd className="hidden sm:inline text-[10px] text-muted border border-border rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {query.length < 2 && (
            <div className="px-4 py-6 text-center text-sm text-muted">
              Type to search...
            </div>
          )}
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-muted">
              No results found
            </div>
          )}
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-sand transition-colors border-b border-border last:border-0"
            >
              <span className="text-xs text-muted shrink-0 w-12">
                {r.type === "lesson" ? "Lesson" : "Vocab"}
              </span>
              <span className="text-sm text-foreground">{r.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
