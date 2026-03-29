import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-sidebar text-sidebar-text">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
              TM
            </div>
            <div>
              <div className="font-semibold">Transmark Language Tool</div>
              <div className="text-xs text-sidebar-text/60">Javea, Costa Blanca</div>
            </div>
          </div>
          <Link href="/login" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Login
          </Link>
        </div>
      </header>

      <section className="bg-sidebar text-white py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Leer Spaans<br />
            <span className="text-primary-light">op jouw manier</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Interactieve oefeningen, directe feedback, woordenschat training. Oefen altijd en overal op elk apparaat.
          </p>
          <Link href="/login" className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl text-base font-semibold transition-colors">
            Begin met leren
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            { title: "Werkwoord Oefeningen", desc: "Vul vervoegingen in en krijg direct feedback. Alle tijden behandeld.", icon: "&#9998;" },
            { title: "Woordenschat", desc: "Flashcards met tik-om-te-tonen. Oefen Spaans, Engels & Nederlands.", icon: "&#128218;" },
            { title: "Grammatica", desc: "Compacte vervoegingskaarten en duidelijke regeluitleg.", icon: "&#9889;" },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: f.icon }} />
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-sand/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Cursusniveaus</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { level: "Beginner", available: false },
              { level: "Elementair", available: false },
              { level: "Gemiddeld", available: false },
              { level: "Gevorderd", available: true },
            ].map((c) => (
              <div key={c.level} className={`rounded-xl p-4 border ${c.available ? "bg-card border-primary/30 shadow-sm" : "bg-card/50 border-border opacity-50"}`}>
                <div className="font-semibold">{c.level}</div>
                <span className={`text-xs mt-1 inline-block ${c.available ? "text-success font-medium" : "text-muted"}`}>
                  {c.available ? "Beschikbaar" : "Binnenkort"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-sidebar text-sidebar-text py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="font-semibold mb-1">Transmark Language Tool</div>
          <p className="text-xs text-sidebar-text/50">spanishclassesinjavea.com</p>
        </div>
      </footer>
    </div>
  );
}
