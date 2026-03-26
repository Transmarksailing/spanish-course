import { notFound } from "next/navigation";
import { getYear, getVocabulary, getAllVocabularyParams } from "@/lib/content";
import VocabularyContent from "./VocabularyContent";

interface Props {
  params: Promise<{ year: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllVocabularyParams();
}

export default async function VocabularyPage({ params }: Props) {
  const { year: yearId, slug } = await params;
  const year = getYear(yearId);
  const vocabulary = getVocabulary(yearId, slug);

  if (!year || !vocabulary) notFound();

  return (
    <VocabularyContent
      vocabulary={vocabulary}
      yearId={yearId}
      lessons={year.lessons}
      vocabularyRefs={year.vocabulary}
    />
  );
}
