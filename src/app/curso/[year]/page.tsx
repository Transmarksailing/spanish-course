import Link from "next/link";
import { notFound } from "next/navigation";
import { getYear, getAllYearParams } from "@/lib/content";
import CourseSidebarWrapper from "./SidebarWrapper";

interface Props {
  params: Promise<{ year: string }>;
}

export function generateStaticParams() {
  return getAllYearParams();
}

export default async function YearPage({ params }: Props) {
  const { year: yearId } = await params;
  const year = getYear(yearId);

  if (!year) notFound();

  return (
    <div className="flex">
      <CourseSidebarWrapper
        year={yearId}
        lessons={year.lessons}
        vocabulary={year.vocabulary}
      />

      <div className="flex-1 max-w-4xl px-4 sm:px-8 py-8">
        <h1 className="font-serif text-3xl font-bold mb-2">
          {year.title.en}
        </h1>
        <p className="text-muted mb-8">{year.description.en}</p>

        <h2 className="font-serif text-xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-3">
          {year.lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/curso/${yearId}/${lesson.slug}`}
              className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {lesson.title.en}
                </h3>
                {lesson.title.es && (
                  <p className="text-xs text-muted">{lesson.title.es}</p>
                )}
              </div>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        {year.vocabulary.length > 0 && (
          <>
            <h2 className="font-serif text-xl font-semibold mt-8 mb-4">
              Vocabulary
            </h2>
            <div className="space-y-3">
              {year.vocabulary.map((vocab) => (
                <Link
                  key={vocab.slug}
                  href={`/curso/${yearId}/vocabulary/${vocab.slug}`}
                  className="flex items-center gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-lg shrink-0">
                    &#128218;
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {vocab.title.en}
                    </h3>
                  </div>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
