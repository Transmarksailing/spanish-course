import Link from "next/link";
import { getYears } from "@/lib/content";

export default function CursoDashboard() {
  const years = getYears();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-2">Your Courses</h1>
      <p className="text-muted mb-8">
        Select a course year to start learning
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {years.map((year) => (
          <Link
            key={year.id}
            href={`/curso/${year.id}`}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                  {year.title.en}
                </h2>
                <p className="text-sm text-muted mt-1">
                  {year.description.en}
                </p>
              </div>
              <span className="text-2xl text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                &rarr;
              </span>
            </div>
            <div className="mt-4 text-xs text-muted">
              {year.lessons.length} lessons &middot;{" "}
              {year.vocabulary.length} vocabulary list
              {year.vocabulary.length !== 1 ? "s" : ""}
            </div>
          </Link>
        ))}

        {years.length === 0 && (
          <p className="text-muted col-span-2 text-center py-12">
            No courses available yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
