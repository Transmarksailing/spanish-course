"use client";

import { useState, useCallback, useEffect } from "react";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  className?: string;
}

export default function SpeakButton({ text, lang = "es-ES", className = "" }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

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
    utterance.rate = 0.85;

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
