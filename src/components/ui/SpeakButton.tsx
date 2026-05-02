"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  className?: string;
}

// Preferred female Spanish voices, ranked by quality across platforms
const PREFERRED_VOICES = [
  // Top-tier neural / online voices (Edge, Chrome, mobile)
  "Microsoft Elvira Online",   // Windows 10/11 neural ES
  "Microsoft Ximena Online",   // Windows neural ES (Mexico)
  "Google español de España",  // Chrome high-quality
  "Google español",            // Chrome standard

  // macOS / iOS premium voices
  "Mónica",    // Castilian Spanish (macOS)
  "Paulina",   // Mexican Spanish (macOS)
  "Jimena",    // Mexican Spanish (iOS)
  "Marisol",   // Spanish

  // Microsoft Edge default voices (Windows)
  "Microsoft Elvira",   // Spanish ES
  "Microsoft Helena",   // Spanish ES
  "Microsoft Laura",    // Spanish ES
  "Microsoft Sabina",   // Spanish MX
  "Microsoft Esperanza", // Spanish MX
];

function findFemaleSpanishVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | null {
  const spanishVoices = voices.filter((v) => v.lang.startsWith("es"));
  if (spanishVoices.length === 0) return null;

  // Try preferred voices first (in order of quality)
  for (const name of PREFERRED_VOICES) {
    const match = spanishVoices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  // Prefer voices that match the exact locale (es-ES)
  const localeMatch = spanishVoices.find((v) => v.lang === lang);
  if (localeMatch) return localeMatch;

  // Avoid male names if we can detect them (heuristic)
  const maleNames = /^(Microsoft (Pablo|Jorge|Diego|Alvaro)|Carlos|Diego|Jorge|Juan)/i;
  const female = spanishVoices.find((v) => !maleNames.test(v.name));
  return female || spanishVoices[0];
}

export default function SpeakButton({ text, lang = "es-ES", className = "" }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const loadVoices = () => {
      const voices = synth.getVoices();
      voiceRef.current = findFemaleSpanishVoice(voices, lang);
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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

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
