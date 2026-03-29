"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [year, setYear] = useState("cours");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(year, password)) {
      router.push(`/curso/${year}`);
    } else {
      setError("Onjuist wachtwoord. Probeer het opnieuw.");
    }
  };

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            TM
          </div>
          <h1 className="text-2xl font-bold text-white">
            Student Login
          </h1>
          <p className="text-sm text-sidebar-text/60 mt-1">
            Transmark Language Tool — Javea
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Cursus
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="cours">Spanish Course</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vul je cursus wachtwoord in"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-danger bg-danger-light rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            Naar cursus
          </Button>

          <p className="text-xs text-center text-muted">
            Vraag je docent om het cursus wachtwoord
          </p>
        </form>
      </div>
    </div>
  );
}
