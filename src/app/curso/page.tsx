import Link from "next/link";
import { getYears } from "@/lib/content";

const levelBadges: Record<string, { label: string; color: string }> = {
  cours: { label: "Spaanse Cursus", color: "bg-primary/10 text-primary" },
};

export default function CursoDashboard() {
  const years = getYears();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Jouw Cursussen</h1>
      <p className="text-muted text-sm mb-8">
        Kies een cursusniveau om te beginnen
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {years.map((year) => {
          const badge = levelBadges[year.id] || { label: year.id, color: "bg-sand text-muted" };
          return (
            <Link
              key={year.id}
              href={`/curso/${year.id}`}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.color}`}>
                  {badge.label}
                </span>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                  &rarr;
                </span>
              </div>
              <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
                {year.title.nl || year.title.en}
              </h2>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                {year.description.nl || year.description.en}
              </p>
              <div className="mt-4 flex gap-3 text-xs text-muted">
                <span>{year.lessons.length} lessen</span>
                <span>&middot;</span>
                <span>
                  {year.vocabulary.length} woordenlijst
                  {year.vocabulary.length !== 1 ? "en" : ""}
                </span>
              </div>
            </Link>
          );
        })}

        {years.length === 0 && (
          <p className="text-muted col-span-2 text-center py-12">
            Nog geen cursussen beschikbaar. Kom binnenkort terug!
          </p>
        )}
      </div>
    </div>
  );
}
