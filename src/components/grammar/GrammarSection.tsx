"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { GrammarSection as GrammarSectionType } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
import ConjugationTable from "./ConjugationTable";

interface Props {
  section: GrammarSectionType;
}

export default function GrammarSection({ section }: Props) {
  const { t } = useLanguage();
  const pathname = usePathname();

  // Extract /curso/[year] base from current path
  const cursoMatch = pathname.match(/\/curso\/[^/]+/);
  const cursoBase = cursoMatch ? cursoMatch[0] : "/curso/cours";

  if (section.type === "conjugation_table") {
    return <ConjugationTable data={section} />;
  }

  if (section.type === "word_list") {
    return (
      <div className="my-4 border-l-4 border-primary bg-sand/50 rounded-r-lg p-4">
        {section.title && (
          <h4 className="font-semibold text-primary mb-3">
            {t(section.title)}
          </h4>
        )}
        <div className="grid grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)] gap-x-6 gap-y-1 text-sm">
          {section.items.map((item, i) => (
            <div key={i} className="contents">
              <span className="font-semibold text-foreground">{item.term}</span>
              <span className="text-muted">{t(item.translation)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section.type === "rule_box") {
    const titleEl = section.title ? (
      section.link ? (
        <Link href={`${cursoBase}/${section.link}`} className="font-semibold text-primary hover:underline mb-1 block">
          {t(section.title)} →
        </Link>
      ) : (
        <h4 className="font-semibold text-primary mb-1">
          {t(section.title)}
        </h4>
      )
    ) : null;

    return (
      <div className="my-4 border-l-4 border-primary bg-sand/50 rounded-r-lg p-4">
        {titleEl}
        <div
          className="text-sm text-foreground leading-loose"
          dangerouslySetInnerHTML={{
            __html: t(section.content)
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    );
  }

  // type === "explanation"
  return (
    <div className="my-4">
      {section.title && (
        <h3 className="text-lg font-semibold text-foreground mb-2">
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
