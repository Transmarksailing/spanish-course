import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Language Academy - Spanish Courses in Javea",
  description:
    "Learn Spanish with interactive exercises, verb conjugation practice, and vocabulary training. Professional courses in Javea, Costa Blanca.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
