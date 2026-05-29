/**
 * Tekstvoorbewerking voor de Web Speech API.
 *
 * De Spaanse synth heeft de neiging om afkortingen letter-voor-letter te
 * spellen (Ud., Uds., etc.), markdown-tekens uit te spreken, en slashes
 * tussen vormen ("yo/tú/él") te vertalen naar "slash". Deze helper maakt
 * de tekst klaar voor natuurlijke voorlezing.
 */

const SPANISH_ABBREVIATIONS: Array<[RegExp, string]> = [
  // Personen (vormen die in vervoegingstabellen voorkomen)
  [/\bUd\.?\b/g, "usted"],
  [/\bUds\.?\b/g, "ustedes"],
  [/\bSr\.?\b/g, "señor"],
  [/\bSra\.?\b/g, "señora"],
  [/\bSrta\.?\b/g, "señorita"],
  [/\bDr\.?\b/g, "doctor"],
  [/\bDra\.?\b/g, "doctora"],
  // Algemene afkortingen
  [/\bp\.\s*ej\.?/gi, "por ejemplo"],
  [/\betc\.?/gi, "etcétera"],
  [/\bp\.\s*p\./gi, "página"],
  [/\bnº\.?/gi, "número"],
  [/\bnro\.?/gi, "número"],
  // Romeinse cijfers in eeuwen — "siglo XII" → "siglo doce"
  [/\bsiglo\s+I\b/gi, "siglo uno"],
  [/\bsiglo\s+II\b/gi, "siglo dos"],
  [/\bsiglo\s+III\b/gi, "siglo tres"],
  [/\bsiglo\s+IV\b/gi, "siglo cuatro"],
  [/\bsiglo\s+V\b/gi, "siglo cinco"],
  [/\bsiglo\s+VI\b/gi, "siglo seis"],
  [/\bsiglo\s+VII\b/gi, "siglo siete"],
  [/\bsiglo\s+VIII\b/gi, "siglo ocho"],
  [/\bsiglo\s+IX\b/gi, "siglo nueve"],
  [/\bsiglo\s+X\b/gi, "siglo diez"],
  [/\bsiglo\s+XI\b/gi, "siglo once"],
  [/\bsiglo\s+XII\b/gi, "siglo doce"],
  [/\bsiglo\s+XIII\b/gi, "siglo trece"],
  [/\bsiglo\s+XIV\b/gi, "siglo catorce"],
  [/\bsiglo\s+XV\b/gi, "siglo quince"],
  [/\bsiglo\s+XVI\b/gi, "siglo dieciséis"],
  [/\bsiglo\s+XVII\b/gi, "siglo diecisiete"],
  [/\bsiglo\s+XVIII\b/gi, "siglo dieciocho"],
  [/\bsiglo\s+XIX\b/gi, "siglo diecinueve"],
  [/\bsiglo\s+XX\b/gi, "siglo veinte"],
  [/\bsiglo\s+XXI\b/gi, "siglo veintiuno"],
];

/**
 * Maakt Spaanse tekst klaar voor TTS: verwijdert markdown, expandeert
 * afkortingen, normaliseert leestekens.
 */
export function prepareSpanishText(text: string): string {
  let out = text;

  // 1. Markdown-tekens weghalen
  out = out.replace(/\*\*(.+?)\*\*/g, "$1"); // **bold**
  out = out.replace(/\*(.+?)\*/g, "$1"); // *italic*
  out = out.replace(/`(.+?)`/g, "$1"); // `code`
  out = out.replace(/^#+\s+/gm, ""); // # headings
  out = out.replace(/[*_~]/g, ""); // overgebleven losse tekens

  // 2. Markdown tabelpipes en headerlijn weg
  out = out.replace(/\|/g, ",");
  out = out.replace(/^[-:|\s]+$/gm, "");

  // 3. Slashes binnen woorden of tussen vormen → comma
  //    "él/ella/Ud." → "él, ella, usted"
  //    "yo/tú" → "yo, tú"
  out = out.replace(/(\w)\s*\/\s*(\w)/g, "$1, $2");

  // 4. Afkortingen expanderen
  for (const [re, repl] of SPANISH_ABBREVIATIONS) {
    out = out.replace(re, repl);
  }

  // 5. Parenthetische vertaling weg ("hablo (I speak)" → "hablo")
  //    Alleen tussen haakjes Engelse uitleg verwijderen — niet Spaanse
  //    Detectie: haakjes met overwegend ASCII-letters die kort zijn
  out = out.replace(/\s*\(([^()]{1,60})\)/g, (match, content: string) => {
    // Spaanse haakjesinhoud bevat vaak accenten of typische woorden
    const hasSpanishChar = /[áéíóúñü¿¡]/i.test(content);
    const looksEnglish = /\b(the|a|an|to|of|with|for|and|or|is|was|have|had)\b/i.test(content);
    if (!hasSpanishChar && looksEnglish) return "";
    return match;
  });

  // 6. Emdash en andere tekens
  out = out.replace(/—/g, ",");
  out = out.replace(/–/g, ",");

  // 7. Dubbele spaties en spaties voor leestekens opruimen
  out = out.replace(/\s+/g, " ");
  out = out.replace(/\s+([,.;:!?])/g, "$1");
  out = out.replace(/,\s*,/g, ",");

  return out.trim();
}
