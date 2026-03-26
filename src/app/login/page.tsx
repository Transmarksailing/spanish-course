"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [year, setYear] = useState("year4");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(year, password)) {
      router.push(`/curso/${year}`);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sidebar to-[#2A1F15] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-2xl mx-auto mb-4">
            LA
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Student Login
          </h1>
          <p className="text-sm text-white/60 mt-1">
            The Language Academy
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl border border-border shadow-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Course Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="year4">Year 4 - Advanced</option>
              <option value="year3" disabled>Year 3 - Intermediate (Coming Soon)</option>
              <option value="year2" disabled>Year 2 - Elementary (Coming Soon)</option>
              <option value="year1" disabled>Year 1 - Beginner (Coming Soon)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your course password"
              className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-danger bg-danger-light rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            Enter Course
          </Button>

          <p className="text-xs text-center text-muted">
            Ask your teacher for the course password
          </p>
        </form>
      </div>
    </div>
  );
}
