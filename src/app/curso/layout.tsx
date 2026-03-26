import { LanguageProvider } from "@/lib/language-context";
import CourseHeader from "@/components/layout/CourseHeader";
import CourseFooter from "@/components/layout/CourseFooter";

export default function CursoLayout({ children }: { children: React.ReactNode }) {
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
