"use client";

const CHARS = ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"];

interface SpecialCharsProps {
  onInsert: (char: string) => void;
}

export default function SpecialChars({ onInsert }: SpecialCharsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {CHARS.map((char) => (
        <button
          key={char}
          type="button"
          onClick={() => onInsert(char)}
          className="char-btn"
          title={`Insert ${char}`}
        >
          {char}
        </button>
      ))}
    </div>
  );
}
