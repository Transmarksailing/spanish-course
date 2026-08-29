"use client";

import { useEffect, useRef, useState } from "react";

// Spaanse zin die door een vertaaltool gegarandeerd wordt vertaald.
// We renderen deze (onzichtbaar) en kijken of de browser de tekst aanpast.
export const TRANSLATION_SENTINEL =
  "Esta frase comprueba si el navegador traduce la página automáticamente.";

function normalize(text: string | null): string {
  return (text ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

// Detecteert of een browser-vertaaltool (Google Translate, Microsoft/Edge,
// Safari, Firefox) de pagina automatisch vertaalt. Werkt cross-browser door
// (1) bekende markers te checken en (2) een Spaanse sentinel-zin te bewaken.
export function useTranslationDetection() {
  const sentinelRef = useRef<HTMLElement | null>(null);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const original = normalize(TRANSLATION_SENTINEL);

    const check = (): boolean => {
      const html = document.documentElement;

      // Google Translate: zet een class op <html>
      if (
        html.classList.contains("translated-ltr") ||
        html.classList.contains("translated-rtl")
      ) {
        return true;
      }

      // Microsoft/Edge translate: voegt _msthash-attributen toe
      if (
        html.hasAttribute("_msthash") ||
        document.body?.hasAttribute("_msthash") ||
        document.querySelector("[_msttexthash]") !== null
      ) {
        return true;
      }

      // Cross-browser: is de sentinel-zin door iets aangepast?
      const current = normalize(sentinelRef.current?.textContent ?? "");
      if (current && current !== original) {
        return true;
      }

      return false;
    };

    const run = () => {
      if (check()) setDetected(true);
    };

    // Vertaling kan pas ná het laden gebeuren: meermaals controleren.
    run();
    const timers = [300, 1000, 2500, 5000].map((ms) => setTimeout(run, ms));

    // Reageer direct op DOM-wijzigingen door de vertaaltool.
    const observer = new MutationObserver(run);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "lang", "_msthash"],
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return { detected, sentinelRef };
}
