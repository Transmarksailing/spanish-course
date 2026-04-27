// Meertalige tekst
export interface LocalizedText {
  en: string;
  nl?: string;
  es?: string;
}

// Leerjaar index
export interface YearIndex {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  order: number;
  lessons: LessonRef[];
  vocabulary: VocabularyRef[];
}

export interface LessonRef {
  slug: string;
  title: LocalizedText;
  order: number;
  icon?: string;
}

export interface VocabularyRef {
  slug: string;
  title: LocalizedText;
}

// Les inhoud
export interface Lesson {
  slug: string;
  year: string;
  title: LocalizedText;
  grammarSections: GrammarSection[];
  exercises: Exercise[];
  videoPlaceholder?: {
    title: LocalizedText;
    description: LocalizedText;
    videoUrl?: string | LocalizedText;
  };
}

// Grammatica secties
export type GrammarSection =
  | GrammarExplanation
  | GrammarConjugationTable
  | GrammarRuleBox
  | GrammarWordList;

export interface GrammarWordList {
  type: "word_list";
  title?: LocalizedText;
  items: { term: string; translation: LocalizedText }[];
}

export interface GrammarExplanation {
  type: "explanation";
  title: LocalizedText;
  content: LocalizedText;
}

export interface GrammarConjugationTable {
  type: "conjugation_table";
  title?: LocalizedText;
  verb: string;
  tense?: string;
  forms: {
    yo: string;
    tú: string;
    "él/ella/usted": string;
    nosotros: string;
    vosotros: string;
    "ellos/ustedes": string;
  };
}

export interface GrammarRuleBox {
  type: "rule_box";
  title?: LocalizedText;
  content: LocalizedText;
  link?: string;
}

// Oefeningen
export interface Exercise {
  id: string;
  type: "fill_in_blank" | "translation" | "sentence_completion" | "vocabulary" | "multiple_choice";
  instruction: LocalizedText;
  items: ExerciseItem[];
}

export interface ExerciseItem {
  id: string;
  sentence?: string;
  before?: string;
  after?: string;
  source?: LocalizedText;
  translation?: LocalizedText;
  correctAnswers: string[];
  hint?: string;
  acceptAlternatives?: boolean;
}

// Woordenlijsten
export interface VocabularyList {
  slug: string;
  year: string;
  title: LocalizedText;
  categories: VocabularyCategory[];
}

export interface VocabularyCategory {
  name: LocalizedText;
  words: VocabularyWord[];
}

export interface VocabularyWord {
  id: string;
  spanish: string;
  english: string;
  dutch: string;
  category?: string;
  relatedVerb?: string;
}

// Voortgang
export interface ExerciseProgress {
  lessonSlug: string;
  exerciseId: string;
  itemId: string;
  isCorrect: boolean;
  attempts: number;
  completedAt: string;
}

// Taal context
export type UILanguage = "en" | "nl";
