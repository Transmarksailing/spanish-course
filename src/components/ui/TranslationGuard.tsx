"use client";

import { useLanguage } from "@/lib/language-context";
import {
  useTranslationDetection,
  TRANSLATION_SENTINEL,
} from "@/lib/use-translation-detection";

interface Props {
  children: React.ReactNode;
}

// Verbergt oefeningen wanneer een browser-vertaaltool de pagina vertaalt.
// Een automatische vertaling verandert de Spaanse antwoorden, waardoor de
// oefeningen kapot lijken. We tonen dan een uitleg in plaats van de oefening.
export default function TranslationGuard({ children }: Props) {
  const { t } = useLanguage();
  const { detected, sentinelRef } = useTranslationDetection();

  // Onzichtbare sentinel-zin die de vertaaltool wél mag vertalen, zodat we
  // de vertaling kunnen detecteren. Geen "notranslate" hierop.
  const sentinel = (
    <span
      ref={sentinelRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {TRANSLATION_SENTINEL}
    </span>
  );

  if (!detected) {
    // Markeer de oefeningen als niet-vertaalbaar als extra bescherming.
    return (
      <>
        {sentinel}
        <div translate="no" className="notranslate">
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      {sentinel}
      <div
        translate="no"
        className="notranslate my-6 rounded-xl border border-warning/40 bg-warning/10 p-5 text-center"
        role="alert"
      >
        <div className="text-3xl mb-2" aria-hidden="true">
          &#127760;
        </div>
        <h4 className="text-base font-semibold text-foreground mb-1">
          {t({
            en: "Turn off automatic translation",
            nl: "Schakel automatische vertaling uit",
            es: "Desactiva la traducción automática",
          })}
        </h4>
        <p className="text-sm text-muted mb-3">
          {t({
            en: "Your browser is translating this page automatically. This changes the Spanish answers, so the exercises won't work correctly. Turn off translation for this page and reload to continue.",
            nl: "Je browser vertaalt deze pagina automatisch. Daardoor veranderen de Spaanse antwoorden en werken de oefeningen niet goed. Zet de vertaling voor deze pagina uit en herlaad om verder te gaan.",
            es: "Tu navegador está traduciendo esta página automáticamente. Esto cambia las respuestas en español, así que los ejercicios no funcionarán bien. Desactiva la traducción de esta página y recárgala para continuar.",
          })}
        </p>
        <p className="text-xs text-muted">
          {t({
            en: "Tip: right-click the page → \"Show original\", or disable translation in your browser's settings.",
            nl: "Tip: klik met de rechtermuisknop → \"Origineel weergeven\", of zet de vertaling uit in je browserinstellingen.",
            es: "Consejo: haz clic derecho → \"Mostrar original\", o desactiva la traducción en los ajustes del navegador.",
          })}
        </p>
      </div>
    </>
  );
}
