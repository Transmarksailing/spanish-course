"use client";

import type { GrammarSection as GrammarSectionType } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import ConjugationTable from "./ConjugationTable";

interface Props {
  section: GrammarSectionType;
}

export default function GrammarSection({ section }: Props) {
  const { t } = useLanguage();

  if (section.type === "conjugation_table") {
    return <ConjugationTable data={section} />;
  }

  if (section.type === "rule_box") {
    return (
      <div className="my-4 border-l-4 border-primary bg-sand/50 rounded-r-lg p-4">
        {section.title && (
          <h4 className="font-serif font-semibold text-primary mb-1">
            {t(section.title)}
          </h4>
        )}
        <p
          className="text-sm text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: t(section.content).replace(
              /\*\*(.*?)\*\*/g,
              "<strong>$1</strong>"
            ),
          }}
        />
      </div>
    );
  }

  // type === "explanation"
  return (
    <div className="my-4">
      {section.title && (
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          {t(section.title)}
        </h3>
      )}
      <div
        className="text-sm text-foreground leading-relaxed space-y-2"
        dangerouslySetInnerHTML={{
          __html: t(section.content)
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}
