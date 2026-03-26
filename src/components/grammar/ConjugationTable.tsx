"use client";

import type { GrammarConjugationTable } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";

interface Props {
  data: GrammarConjugationTable;
}

const PRONOUNS = [
  "yo",
  "tú",
  "él/ella/usted",
  "nosotros",
  "vosotros",
  "ellos/ustedes",
] as const;

export default function ConjugationTable({ data }: Props) {
  const { t } = useLanguage();

  return (
    <div className="my-5 bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-primary/5 border-b border-border px-4 py-3 flex items-baseline gap-3">
        <span className="text-lg font-bold text-primary">{data.verb}</span>
        {data.tense && (
          <span className="text-xs text-muted uppercase tracking-wide">{data.tense}</span>
        )}
        {data.title && !data.tense && (
          <span className="text-xs text-muted">{t(data.title)}</span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {PRONOUNS.map((pronoun, i) => (
          <div
            key={pronoun}
            className={`px-4 py-2.5 ${
              i < PRONOUNS.length - (PRONOUNS.length % 2 === 0 ? 2 : 1)
                ? "border-b border-border/50"
                : ""
            } ${i % 2 === 0 ? "sm:border-r border-border/50" : ""} ${
              i % 3 !== 2 ? "sm:border-r" : ""
            }`}
          >
            <span className="text-xs text-muted">{pronoun}</span>
            <div className="text-sm font-semibold text-foreground">
              {data.forms[pronoun]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
