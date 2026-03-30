"use client";

import type { GrammarConjugationTable } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import SpeakButton from "@/components/ui/SpeakButton";

interface Props {
  data: GrammarConjugationTable;
}

// Singular (left column) and plural (right column)
const SINGULAR = ["yo", "tú", "él/ella/usted"] as const;
const PLURAL = ["nosotros", "vosotros", "ellos/ustedes"] as const;

export default function ConjugationTable({ data }: Props) {
  const { t } = useLanguage();

  return (
    <div className="my-4">
      {data.title && (
        <h4 className="text-sm font-semibold mb-2 text-primary uppercase tracking-wide">
          {t(data.title)}
        </h4>
      )}
      <div className="grid grid-cols-2 gap-1.5">
        {SINGULAR.map((singular, i) => {
          const plural = PLURAL[i];
          return (
            <div key={singular} className="contents">
              <div className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-1">
                <div className="flex-1">
                  <span className="text-xs text-muted">{singular}</span>
                  <div className="text-sm font-semibold text-foreground">
                    {data.forms[singular]}
                  </div>
                </div>
                <SpeakButton text={data.forms[singular]} />
              </div>
              <div className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-1">
                <div className="flex-1">
                  <span className="text-xs text-muted">{plural}</span>
                  <div className="text-sm font-semibold text-foreground">
                    {data.forms[plural]}
                  </div>
                </div>
                <SpeakButton text={data.forms[plural]} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
