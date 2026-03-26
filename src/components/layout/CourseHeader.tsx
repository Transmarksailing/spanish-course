"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function CourseHeader() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-sidebar text-sidebar-text border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/curso" className="flex items-center gap-3 hover:opacity-90">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              LA
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight">
                The Language Academy
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle language={language} onChange={setLanguage} />
            <button
              onClick={handleLogout}
              className="text-xs text-sidebar-text/60 hover:text-sidebar-text transition-colors px-2 py-1 rounded hover:bg-white/5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
