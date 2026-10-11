"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { beispielBilder, paare, stilAusAntworten, stilSatz, type QuizBild } from "@/lib/quiz";

const bildGroessen = "(min-width: 640px) 288px, 45vw";

export default function Quiz() {
  // Nur im Speicher der Seite: Wer neu lädt, beginnt von vorn und sieht nie ein halbes Ergebnis.
  const [gewaehlt, setGewaehlt] = useState<QuizBild[]>([]);
  const ergebnisRef = useRef<HTMLHeadingElement>(null);
  const fertig = gewaehlt.length === paare.length;

  useEffect(() => {
    if (fertig) ergebnisRef.current?.focus();
  }, [fertig]);

  if (fertig) {
    const stil = stilAusAntworten(gewaehlt);
    return (
      <section aria-labelledby="ergebnis-titel">
        <h2 id="ergebnis-titel" ref={ergebnisRef} tabIndex={-1} className="mb-2 text-2xl font-semibold">
          Dein Stil
        </h2>
        <p className="mb-6 text-xl">{stilSatz(stil)}</p>
        <ul className="mb-8 grid grid-cols-3 gap-3">
          {beispielBilder(gewaehlt, stil).map((bild) => (
            <li key={bild.src}>
              <article className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card">
                <Image src={bild.src} alt="" fill sizes="(min-width: 640px) 192px, 30vw" className="object-cover" />
              </article>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setGewaehlt([])}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 font-medium hover:bg-accent-soft"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Quiz noch einmal machen
        </button>
      </section>
    );
  }

  const nummer = gewaehlt.length + 1;
  const [links, rechts] = paare[gewaehlt.length];

  return (
    <section aria-labelledby="frage">
      <p className="mb-1 text-sm text-muted" aria-live="polite">
        {nummer} von {paare.length}
      </p>
      <div
        className="mb-4 h-2 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-label="Fortschritt"
        aria-valuemin={1}
        aria-valuemax={paare.length}
        aria-valuenow={nummer}
      >
        <div className="h-full bg-accent" style={{ width: `${(nummer / paare.length) * 100}%` }} />
      </div>
      <h2 id="frage" className="mb-4 text-2xl font-semibold">
        Welches gefällt dir mehr?
      </h2>
      <ul className="grid grid-cols-2 gap-3">
        {[links, rechts].map((bild, position) => (
          <li key={position}>
            <button
              type="button"
              aria-label={bild.beschreibung}
              onClick={() => setGewaehlt([...gewaehlt, bild])}
              className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:border-accent"
            >
              <Image src={bild.src} alt="" fill sizes={bildGroessen} priority={gewaehlt.length === 0} className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
