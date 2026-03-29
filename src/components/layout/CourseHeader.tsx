"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchDialog from "@/components/ui/SearchDialog";
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
      <div className="px-3 sm:px-8 py-0">
        <div className="flex items-center h-14 gap-1.5 sm:gap-3">
          <Link href="/curso" className="flex items-center gap-2 hover:opacity-90 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              TM
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold leading-tight">
                Transmark Language Tool
              </div>
            </div>
          </Link>

          <LanguageToggle language={language} onChange={setLanguage} />
          <SearchDialog />
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="text-xs text-sidebar-text/60 hover:text-sidebar-text transition-colors px-2 py-1.5 rounded hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
