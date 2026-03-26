"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/lib/language-context";
import { isLoggedIn } from "@/lib/auth";
import CourseHeader from "@/components/layout/CourseHeader";
import CourseFooter from "@/components/layout/CourseFooter";

export default function CursoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <CourseHeader />
        <main className="flex-1">{children}</main>
        <CourseFooter />
      </div>
    </LanguageProvider>
  );
}
