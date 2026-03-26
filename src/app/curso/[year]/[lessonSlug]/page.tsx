import { notFound } from "next/navigation";
import { getYear, getLesson } from "@/lib/content";
import LessonContent from "./LessonContent";

interface Props {
  params: Promise<{ year: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { year: yearId, lessonSlug } = await params;
  const year = getYear(yearId);
  const lesson = getLesson(yearId, lessonSlug);

  if (!year || !lesson) notFound();

  return (
    <LessonContent
      lesson={lesson}
      yearId={yearId}
      lessons={year.lessons}
      vocabulary={year.vocabulary}
    />
  );
}
