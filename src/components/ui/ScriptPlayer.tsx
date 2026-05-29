"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
// Basis voorbewerking voor EN/NL — markdown weg, slashes vervangen
function prepareNonSpanishText(text: string): string {
  let out = text;
  out = out.replace(/\*\*(.+?)\*\*/g, "$1");
  out = out.replace(/\*(.+?)\*/g, "$1");
  out = out.replace(/`(.+?)`/g, "$1");
  out = out.replace(/[*_~]/g, "");
  out = out.replace(/\|/g, ",");
  out = out.replace(/—/g, ", ");
  out = out.replace(/–/g, ", ");
  out = out.replace(/\s+/g, " ").trim();
  return out;
}

interface ScriptPlayerProps {
  title: string;
  description: string;
  scriptEn: string;
  scriptNl: string;
}

// Find best female voice for a language
function findVoice(voices: SpeechSynthesisVoice[], lang: "en" | "nl"): SpeechSynthesisVoice | null {
  const targetPrefix = lang === "nl" ? "nl" : "en";
  const candidates = voices.filter((v) => v.lang.toLowerCase().startsWith(targetPrefix));
  if (candidates.length === 0) return null;

  const PREFERRED: Record<string, string[]> = {
    nl: [
      "Microsoft Colette Online",
      "Microsoft Fenna Online",
      "Google Nederlands",
      "Xander",
      "Claire",
      "Microsoft Colette",
      "Microsoft Fenna",
    ],
    en: [
      "Microsoft Aria Online",
      "Microsoft Jenny Online",
      "Google UK English Female",
      "Google US English",
      "Samantha",
      "Karen",
      "Microsoft Zira",
      "Microsoft Hazel",
    ],
  };

  for (const name of PREFERRED[lang]) {
    const match = candidates.find((v) => v.name.includes(name));
    if (match) return match;
  }

  const maleNames = /^(Microsoft (David|Mark|George|James)|Daniel|Alex|Fred|Diego|Xander)/i;
  const female = candidates.find((v) => !maleNames.test(v.name));
  return female || candidates[0];
}

export default function ScriptPlayer({ title, description, scriptEn, scriptNl }: ScriptPlayerProps) {
  const { language, t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const script = language === "nl" ? scriptNl : scriptEn;
  const speechLang = language === "nl" ? "nl-NL" : "en-US";

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const loadVoices = () => {
      const voices = synth.getVoices();
      voiceRef.current = findVoice(voices, language);
    };

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
      setPlaying(false);
      setPaused(false);
    };
  }, [language]);

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (paused) {
      synth.resume();
      setPaused(false);
      return;
    }

    if (playing) {
      synth.pause();
      setPaused(true);
      return;
    }

    synth.cancel();

    // Voorbewerking: markdown weg, afkortingen expanderen
    const cleanedScript = prepareNonSpanishText(script);

    // Split into sentences to avoid Chrome's ~200 char per utterance limit
    const sentences = cleanedScript.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanedScript];
    const chunks: string[] = [];
    let current = "";
    for (const s of sentences) {
      if ((current + s).length > 180 && current) {
        chunks.push(current);
        current = s;
      } else {
        current += s;
      }
    }
    if (current) chunks.push(current);

    let chunkIndex = 0;
    const speakNext = () => {
      if (chunkIndex >= chunks.length) {
        setPlaying(false);
        setPaused(false);
        return;
      }
      const utt = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utt.lang = speechLang;
      utt.rate = 0.92;
      utt.pitch = 1.0;
      if (voiceRef.current) utt.voice = voiceRef.current;
      utt.onend = () => {
        chunkIndex++;
        speakNext();
      };
      utt.onerror = () => {
        setPlaying(false);
        setPaused(false);
      };
      synth.speak(utt);
    };

    setPlaying(true);
    setPaused(false);
    speakNext();
  }, [script, speechLang, playing, paused]);

  const handleStop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setPaused(false);
  }, []);

  return (
    <div className="bg-sand/50 border border-border rounded-xl p-5 mb-8">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl shrink-0">🎧</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          type="button"
          onClick={handlePlay}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {paused ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              {t({ en: "Resume", nl: "Hervat" })}
            </>
          ) : playing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              {t({ en: "Pause", nl: "Pauze" })}
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              {t({ en: "Listen", nl: "Luister" })}
            </>
          )}
        </button>

        {(playing || paused) && (
          <button
            type="button"
            onClick={handleStop}
            className="inline-flex items-center gap-2 bg-card border-2 border-border hover:border-foreground text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
            {t({ en: "Stop", nl: "Stop" })}
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowScript((s) => !s)}
          className="inline-flex items-center gap-2 bg-card border-2 border-border hover:border-foreground text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-auto"
        >
          {showScript
            ? t({ en: "Hide script", nl: "Verberg script" })
            : t({ en: "Show script", nl: "Toon script" })}
        </button>
      </div>

      <p className="text-xs text-muted">
        {language === "nl"
          ? "Audiouitleg in het Nederlands — gebruikt de browserstem"
          : "Audio explanation in English — uses the browser voice"}
      </p>

      {showScript && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {script}
          </div>
        </div>
      )}
    </div>
  );
}
