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
        <h4 className="font-serif text-lg font-semibold mb-2 text-primary">
          {t(data.title)}
        </h4>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-sand">
              <th className="px-4 py-2 text-left font-semibold text-muted border-b border-border">
                {data.verb}
                {data.tense && (
                  <span className="ml-2 font-normal text-xs text-muted">
                    ({data.tense})
                  </span>
                )}
              </th>
              <th className="px-4 py-2 text-left font-semibold text-muted border-b border-border">
                Conjugation
              </th>
            </tr>
          </thead>
          <tbody>
            {PRONOUNS.map((pronoun, i) => (
              <tr
                key={pronoun}
                className={i % 2 === 0 ? "bg-card" : "bg-warm-white"}
              >
                <td className="px-4 py-2 border-b border-border/50 font-medium text-muted">
                  {pronoun}
                </td>
                <td className="px-4 py-2 border-b border-border/50 font-semibold text-foreground">
                  {data.forms[pronoun]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
