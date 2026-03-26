"use client";

const CHARS = ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"];

interface SpecialCharsProps {
  onInsert: (char: string) => void;
}

export default function SpecialChars({ onInsert }: SpecialCharsProps) {
  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm py-2 -mx-3 px-3 sm:mx-0 sm:px-0 border-t border-border sm:border-0">
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
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
    </div>
  );
}
