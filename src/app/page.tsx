import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="bg-sidebar text-sidebar-text">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl">
              LA
            </div>
            <div>
              <div className="font-serif text-xl font-bold">The Language Academy</div>
              <div className="text-sm text-sidebar-text/70">Spanish Classes in Javea</div>
            </div>
          </div>
          <Link
            href="/login"
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Student Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sidebar to-[#2A1F15] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Learn Spanish in the Heart of{" "}
            <span className="text-primary-light">Costa Blanca</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Interactive online courses with verb conjugation exercises, vocabulary
            training, and grammar explanations. Practice anytime, anywhere.
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            What You&apos;ll Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Exercises",
                desc: "Fill-in-the-blank verb conjugation practice with instant feedback. Type your answer and see immediately if you're correct.",
                icon: "&#9998;",
              },
              {
                title: "Vocabulary Training",
                desc: "Practice word lists with flashcard-style learning. Switch between Spanish-English and Spanish-Dutch modes.",
                icon: "&#128218;",
              },
              {
                title: "Grammar Explained",
                desc: "Clear conjugation tables and grammar rules. From Present Perfect to Subjunctive mood, all tenses covered.",
                icon: "&#128300;",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div
                  className="text-4xl mb-4"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Years */}
      <section className="py-16 bg-sand/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Course Levels</h2>
          <p className="text-muted mb-8">
            Progressive learning from beginner to advanced
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { year: "Year 1", level: "Beginner", available: false },
              { year: "Year 2", level: "Elementary", available: false },
              { year: "Year 3", level: "Intermediate", available: false },
              { year: "Year 4", level: "Advanced", available: true },
            ].map((course) => (
              <div
                key={course.year}
                className={`border rounded-xl p-5 ${
                  course.available
                    ? "bg-card border-primary shadow-md"
                    : "bg-card/50 border-border opacity-60"
                }`}
              >
                <div className="font-serif text-lg font-bold">
                  {course.year}
                </div>
                <div className="text-sm text-muted">{course.level}</div>
                {course.available ? (
                  <span className="inline-block mt-2 text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
                    Available Now
                  </span>
                ) : (
                  <span className="inline-block mt-2 text-xs bg-sand text-muted px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-text py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="font-serif text-lg font-semibold mb-2">
            The Language Academy
          </div>
          <p className="text-sm text-sidebar-text/60">
            Spanish Classes in Javea, Costa Blanca, Spain
          </p>
          <p className="text-xs text-sidebar-text/40 mt-4">
            &copy; {new Date().getFullYear()} spanishclassesinjavea.com
          </p>
        </div>
      </footer>
    </div>
  );
}
