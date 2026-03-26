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
    <div className="my-4">
      {data.title && (
        <h4 className="text-sm font-semibold mb-2 text-primary uppercase tracking-wide">
          {t(data.title)}
        </h4>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {PRONOUNS.map((pronoun) => (
          <div
            key={pronoun}
            className="bg-card border border-border rounded-lg px-3 py-2"
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
