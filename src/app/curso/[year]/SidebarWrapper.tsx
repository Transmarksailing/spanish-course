"use client";

import CourseSidebar from "@/components/layout/CourseSidebar";
import type { LessonRef, VocabularyRef } from "@/lib/types";

interface Props {
  year: string;
  lessons: LessonRef[];
  vocabulary: VocabularyRef[];
}

export default function SidebarWrapper({ year, lessons, vocabulary }: Props) {
  return <CourseSidebar year={year} lessons={lessons} vocabulary={vocabulary} />;
}
