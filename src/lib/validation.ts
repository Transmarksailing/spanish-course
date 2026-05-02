/**
 * Antwoord validatie voor oefeningen
 * Ondersteunt lenient mode (zonder accenten) en strict mode (met accenten)
 */

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function stripAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Strip leading articles (Spanish, Dutch, English) — for vocabulary checks */
function stripArticles(text: string): string {
  return text
    .replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, "")
    .replace(/^(de|het|een)\s+/i, "")
    .replace(/^(the|a|an)\s+/i, "")
    .trim();
}

/** Lenient check: accenten worden genegeerd */
export function checkAnswer(userInput: string, correctAnswers: string[]): boolean {
  const normalized = stripAccents(normalize(userInput));
  return correctAnswers.some(
    (answer) => stripAccents(normalize(answer)) === normalized
  );
}

/** Vocabulary check: ignores accents AND leading articles (el, la, de, het, the, etc.) */
export function checkVocabAnswer(userInput: string, correctAnswers: string[]): boolean {
  const normalizedInput = stripArticles(stripAccents(normalize(userInput)));
  return correctAnswers.some((answer) => {
    const normalizedAnswer = stripArticles(stripAccents(normalize(answer)));
    return normalizedAnswer === normalizedInput;
  });
}

/** Strict check: accenten moeten correct zijn */
export function checkAnswerStrict(userInput: string, correctAnswers: string[]): boolean {
  const normalized = normalize(userInput);
  return correctAnswers.some((answer) => normalize(answer) === normalized);
}

/** Geeft het eerste correcte antwoord terug (voor weergave) */
export function getCorrectAnswer(correctAnswers: string[]): string {
  return correctAnswers[0] || "";
}
