"use client";

import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useRouter } from "next/navigation";

export default function CourseHeader() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="bg-sidebar text-sidebar-text border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <a href="/curso" className="flex items-center gap-3 hover:opacity-90">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg">
                LA
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-base font-semibold leading-tight">
                  The Language Academy
                </div>
                <div className="text-xs text-sidebar-text/70">
                  Spanish Classes in Javea
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle language={language} onChange={setLanguage} />
            <button
              onClick={handleLogout}
              className="text-xs text-sidebar-text/70 hover:text-sidebar-text transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
