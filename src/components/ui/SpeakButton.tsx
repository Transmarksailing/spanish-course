"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { prepareSpanishText } from "@/lib/speech-prep";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  className?: string;
}

// Voorkeurstemmen voor Castiliaans Spaans (zoals gesproken in Valencia).
// Eerst hoogkwaliteit neurale stemmen die "es-ES" exact aanhouden, dan macOS
// premium Mónica, dan Microsoft default ES-stemmen. Latijns-Amerikaanse
// stemmen (Paulina, Jimena, Sabina, Esperanza, Ximena) staan bewust onderaan
// of zijn weggelaten — die hebben een herkenbaar accent dat afwijkt van wat
// in Valencia gesproken wordt.
const CASTILIAN_VOICES = [
  // Hoogkwaliteit neuraal (Edge, Chrome)
  "Microsoft Elvira Online (Natural)",
  "Microsoft Elvira Online",
  "Microsoft Alvaro Online",            // mannelijk maar uitstekende es-ES kwaliteit
  "Google español de España",
  "Microsoft Abril Online",
  "Microsoft Vera Online",
  // macOS / iOS premium
  "Mónica",                              // Castiliaans (macOS standaard)
  "Marisol",
  // Microsoft default ES-ES
  "Microsoft Elvira",
  "Microsoft Helena",
  "Microsoft Laura",
];

const LATAM_FALLBACK = [
  // Alleen als er geen es-ES stem is — accent klinkt anders
  "Microsoft Sabina",
  "Microsoft Esperanza",
  "Microsoft Ximena Online",
  "Google español",
  "Paulina",
  "Jimena",
];

function findCastilianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  // Stap 1: alleen es-ES voices (Castiliaans)
  const esES = voices.filter((v) => v.lang.toLowerCase() === "es-es");

  for (const name of CASTILIAN_VOICES) {
    const match = esES.find((v) => v.name.includes(name));
    if (match) return match;
  }

  // Stap 2: andere es-ES stemmen, mannelijke namen vermijden
  if (esES.length > 0) {
    const maleNames = /(Pablo|Jorge|Diego|Alvaro|Carlos|Juan|Fernando|Lorenzo|Miguel)/i;
    const female = esES.find((v) => !maleNames.test(v.name));
    if (female) return female;
    return esES[0];
  }

  // Stap 3: fallback naar alle Spaanse stemmen
  const anyEs = voices.filter((v) => v.lang.toLowerCase().startsWith("es"));
  if (anyEs.length === 0) return null;

  for (const name of LATAM_FALLBACK) {
    const match = anyEs.find((v) => v.name.includes(name));
    if (match) return match;
  }
  return anyEs[0];
}

export default function SpeakButton({ text, lang = "es-ES", className = "" }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const loadVoices = () => {
      const voices = synth.getVoices();
      voiceRef.current = findCastilianVoice(voices);
    };

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
    };
  }, [lang]);

  const handleSpeak = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const prepared = prepareSpanishText(text);
    if (!prepared) return;

    const utterance = new SpeechSynthesisUtterance(prepared);
    utterance.lang = lang;
    utterance.rate = 0.85;       // iets langzamer — duidelijker voor leerlingen
    utterance.pitch = 1.0;       // natuurlijke toon

    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    synth.speak(utterance);
  }, [text, lang]);

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-sand/80 transition-colors text-muted hover:text-foreground shrink-0 ${speaking ? "text-primary" : ""} ${className}`}
      title={speaking ? "Stop" : "Luister"}
      aria-label={speaking ? "Stop afspelen" : "Lees voor in het Spaans"}
    >
      {speaking ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
