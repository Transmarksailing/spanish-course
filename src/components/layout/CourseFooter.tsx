export default function CourseFooter() {
  return (
    <footer className="border-t border-border bg-sand/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <span className="font-semibold text-foreground">
            Transmark Language Tool
          </span>
          <div>
            &copy; {new Date().getFullYear()} spanishclassesinjavea.com
          </div>
        </div>
      </div>
    </footer>
  );
}
