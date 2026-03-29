import { notFound } from "next/navigation";
import { getYear, getAllYearParams } from "@/lib/content";
import CourseSidebarWrapper from "./SidebarWrapper";
import YearContent from "./YearContent";

interface Props {
  params: Promise<{ year: string }>;
}

export function generateStaticParams() {
  return getAllYearParams();
}

export default async function YearPage({ params }: Props) {
  const { year: yearId } = await params;
  const year = getYear(yearId);

  if (!year) notFound();

  return (
    <div className="flex">
      <CourseSidebarWrapper
        year={yearId}
        lessons={year.lessons}
        vocabulary={year.vocabulary}
      />
      <YearContent yearId={yearId} year={year} />
    </div>
  );
}
