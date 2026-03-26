import type { YearIndex, Lesson, VocabularyList } from "./types";

// Static imports — all content bundled at build time
import coursIndex from "@/content/years/cours/index.json";

// Lessons
import verbTensesOverview from "@/content/years/cours/lessons/verb-tenses-overview.json";
import presentTenseIrregulars from "@/content/years/cours/lessons/present-tense-irregulars.json";
import presentProgressive from "@/content/years/cours/lessons/present-progressive.json";
import presentPerfect from "@/content/years/cours/lessons/present-perfect.json";
import preteriteTense from "@/content/years/cours/lessons/preterite-tense.json";
import imperfectTense from "@/content/years/cours/lessons/imperfect-tense.json";
import preteriteVsImperfect from "@/content/years/cours/lessons/preterite-vs-imperfect.json";
import pastPerfect from "@/content/years/cours/lessons/past-perfect.json";
import futureTense from "@/content/years/cours/lessons/future-tense.json";
import conditional from "@/content/years/cours/lessons/conditional.json";
import reflexiveVerbs from "@/content/years/cours/lessons/reflexive-verbs.json";
import serVsEstar from "@/content/years/cours/lessons/ser-vs-estar.json";
import presentSubjunctive from "@/content/years/cours/lessons/present-subjunctive.json";
import pastSubjunctive from "@/content/years/cours/lessons/past-subjunctive.json";
import ignoranceExpressions from "@/content/years/cours/lessons/ignorance-expressions.json";
import commandsVosotros from "@/content/years/cours/lessons/commands-vosotros.json";
import imperativeTuCommands from "@/content/years/cours/lessons/imperative-tu-commands.json";
import imperativeFormalCommands from "@/content/years/cours/lessons/imperative-formal-commands.json";
import subjunctiveExpressions from "@/content/years/cours/lessons/subjunctive-expressions.json";
import saberVsConocer from "@/content/years/cours/lessons/saber-vs-conocer.json";
import conditionalStructures from "@/content/years/cours/lessons/conditional-structures.json";
import serEstarTenerHay from "@/content/years/cours/lessons/ser-estar-tener-hay.json";
import multiTensePractice from "@/content/years/cours/lessons/multi-tense-practice.json";
import reportedSpeech from "@/content/years/cours/lessons/reported-speech.json";
import stemChangingVerbs from "@/content/years/cours/lessons/stem-changing-verbs.json";

// Vocabulary
import verbs from "@/content/years/cours/vocabulary/verbs.json";
import foodAndDrinks from "@/content/years/cours/vocabulary/food-and-drinks.json";
import bodyParts from "@/content/years/cours/vocabulary/body-parts.json";
import clothing from "@/content/years/cours/vocabulary/clothing.json";
import weather from "@/content/years/cours/vocabulary/weather.json";
import house from "@/content/years/cours/vocabulary/house.json";
import cityAndTransport from "@/content/years/cours/vocabulary/city-and-transport.json";
import irregularParticiples from "@/content/years/cours/vocabulary/irregular-participles.json";
import transport from "@/content/years/cours/vocabulary/transport.json";
import airportAndStations from "@/content/years/cours/vocabulary/airport-and-stations.json";
import medical from "@/content/years/cours/vocabulary/medical.json";
import office from "@/content/years/cours/vocabulary/office.json";
import bank from "@/content/years/cours/vocabulary/bank.json";
import inTheCity from "@/content/years/cours/vocabulary/in-the-city.json";
import meatAndFish from "@/content/years/cours/vocabulary/meat-and-fish.json";
import fruitsAndVegetables from "@/content/years/cours/vocabulary/fruits-and-vegetables.json";
import groceries from "@/content/years/cours/vocabulary/groceries.json";
import professions from "@/content/years/cours/vocabulary/professions.json";
import kitchen from "@/content/years/cours/vocabulary/kitchen.json";
import gardening from "@/content/years/cours/vocabulary/gardening.json";
import roomsAndFurniture from "@/content/years/cours/vocabulary/rooms-and-furniture.json";
import houseObjects from "@/content/years/cours/vocabulary/house-objects.json";

const yearsMap: Record<string, YearIndex> = {
  cours: coursIndex as unknown as YearIndex,
};

const lessonsMap: Record<string, Record<string, Lesson>> = {
  cours: {
    "verb-tenses-overview": verbTensesOverview as unknown as Lesson,
    "present-tense-irregulars": presentTenseIrregulars as unknown as Lesson,
    "present-progressive": presentProgressive as unknown as Lesson,
    "present-perfect": presentPerfect as unknown as Lesson,
    "preterite-tense": preteriteTense as unknown as Lesson,
    "imperfect-tense": imperfectTense as unknown as Lesson,
    "preterite-vs-imperfect": preteriteVsImperfect as unknown as Lesson,
    "past-perfect": pastPerfect as unknown as Lesson,
    "future-tense": futureTense as unknown as Lesson,
    "conditional": conditional as unknown as Lesson,
    "reflexive-verbs": reflexiveVerbs as unknown as Lesson,
    "ser-vs-estar": serVsEstar as unknown as Lesson,
    "present-subjunctive": presentSubjunctive as unknown as Lesson,
    "past-subjunctive": pastSubjunctive as unknown as Lesson,
    "ignorance-expressions": ignoranceExpressions as unknown as Lesson,
    "commands-vosotros": commandsVosotros as unknown as Lesson,
    "imperative-tu-commands": imperativeTuCommands as unknown as Lesson,
    "imperative-formal-commands": imperativeFormalCommands as unknown as Lesson,
    "subjunctive-expressions": subjunctiveExpressions as unknown as Lesson,
    "saber-vs-conocer": saberVsConocer as unknown as Lesson,
    "conditional-structures": conditionalStructures as unknown as Lesson,
    "ser-estar-tener-hay": serEstarTenerHay as unknown as Lesson,
    "multi-tense-practice": multiTensePractice as unknown as Lesson,
    "reported-speech": reportedSpeech as unknown as Lesson,
    "stem-changing-verbs": stemChangingVerbs as unknown as Lesson,
  },
};

const vocabularyMap: Record<string, Record<string, VocabularyList>> = {
  cours: {
    "verbs": verbs as unknown as VocabularyList,
    "food-and-drinks": foodAndDrinks as unknown as VocabularyList,
    "body-parts": bodyParts as unknown as VocabularyList,
    "clothing": clothing as unknown as VocabularyList,
    "weather": weather as unknown as VocabularyList,
    "house": house as unknown as VocabularyList,
    "city-and-transport": cityAndTransport as unknown as VocabularyList,
    "irregular-participles": irregularParticiples as unknown as VocabularyList,
    "transport": transport as unknown as VocabularyList,
    "airport-and-stations": airportAndStations as unknown as VocabularyList,
    "medical": medical as unknown as VocabularyList,
    "office": office as unknown as VocabularyList,
    "bank": bank as unknown as VocabularyList,
    "in-the-city": inTheCity as unknown as VocabularyList,
    "meat-and-fish": meatAndFish as unknown as VocabularyList,
    "fruits-and-vegetables": fruitsAndVegetables as unknown as VocabularyList,
    "groceries": groceries as unknown as VocabularyList,
    "professions": professions as unknown as VocabularyList,
    "kitchen": kitchen as unknown as VocabularyList,
    "gardening": gardening as unknown as VocabularyList,
    "rooms-and-furniture": roomsAndFurniture as unknown as VocabularyList,
    "house-objects": houseObjects as unknown as VocabularyList,
  },
};

export function getYears(): YearIndex[] {
  return Object.values(yearsMap).sort((a, b) => a.order - b.order);
}

export function getYear(yearId: string): YearIndex | null {
  return yearsMap[yearId] || null;
}

export function getLesson(yearId: string, slug: string): Lesson | null {
  return lessonsMap[yearId]?.[slug] || null;
}

export function getVocabulary(yearId: string, slug: string): VocabularyList | null {
  return vocabularyMap[yearId]?.[slug] || null;
}

export function getAllLessonParams() {
  const params: { year: string; lessonSlug: string }[] = [];
  for (const [yearId, lessons] of Object.entries(lessonsMap)) {
    for (const slug of Object.keys(lessons)) {
      params.push({ year: yearId, lessonSlug: slug });
    }
  }
  return params;
}

export function getAllVocabularyParams() {
  const params: { year: string; slug: string }[] = [];
  for (const [yearId, vocabs] of Object.entries(vocabularyMap)) {
    for (const slug of Object.keys(vocabs)) {
      params.push({ year: yearId, slug });
    }
  }
  return params;
}

export function getAllYearParams() {
  return Object.keys(yearsMap).map((year) => ({ year }));
}
