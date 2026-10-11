// Fester Beispiel-Quiz-Inhalt (Issue 1). Eigene Bilder der Designerin kommen mit Issue 2.

export type Temperatur = "warm" | "kühl";
export type Material = "natürlich" | "elegant";
export type Fuelle = "schlicht" | "lebendig";

export type QuizBild = {
  src: string;
  beschreibung: string;
  temperatur: Temperatur;
  material: Material;
  fuelle: Fuelle;
};

export type QuizPaar = [QuizBild, QuizBild];

function bild(nr: number, temperatur: Temperatur, material: Material, fuelle: Fuelle): QuizBild {
  const farbe = temperatur === "warm" ? "warmen" : "kühlen";
  const stoff = material === "natürlich" ? "Holz und Pflanzen" : "Marmor und Metall";
  const fülle = fuelle === "schlicht" ? "wenig Dekoration" : "viel Dekoration";
  return {
    src: `/quiz/bild-${String(nr).padStart(2, "0")}.svg`,
    beschreibung: `Wohnzimmer in ${farbe} Farben mit ${stoff} und ${fülle}`,
    temperatur,
    material,
    fuelle,
  };
}

// Jede Stil-Achse unterscheidet sich in genau 3 Paaren – so gibt es nie ein Unentschieden.
export const paare: QuizPaar[] = [
  [bild(1, "warm", "natürlich", "schlicht"), bild(2, "kühl", "natürlich", "schlicht")],
  [bild(3, "kühl", "elegant", "lebendig"), bild(4, "warm", "elegant", "lebendig")],
  [bild(5, "warm", "natürlich", "lebendig"), bild(6, "kühl", "natürlich", "schlicht")],
  [bild(7, "warm", "elegant", "schlicht"), bild(8, "warm", "natürlich", "schlicht")],
  [bild(9, "kühl", "natürlich", "lebendig"), bild(10, "kühl", "elegant", "lebendig")],
  [bild(11, "warm", "elegant", "lebendig"), bild(12, "warm", "natürlich", "lebendig")],
  [bild(13, "warm", "elegant", "lebendig"), bild(14, "warm", "elegant", "schlicht")],
  [bild(15, "kühl", "natürlich", "lebendig"), bild(16, "kühl", "natürlich", "schlicht")],
];

export type Stil = {
  temperatur: Temperatur;
  material: Material;
  fuelle: Fuelle;
};

export function stilAusAntworten(gewaehlt: QuizBild[]): Stil {
  // Gezählt wird nur dort, wo sich die beiden Bilder eines Paars bei dieser Achse unterscheiden.
  const stimmen = { warm: 0, kühl: 0, natürlich: 0, elegant: 0, schlicht: 0, lebendig: 0 };
  gewaehlt.forEach((gewählt, i) => {
    const [a, b] = paare[i];
    if (a.temperatur !== b.temperatur) stimmen[gewählt.temperatur]++;
    if (a.material !== b.material) stimmen[gewählt.material]++;
    if (a.fuelle !== b.fuelle) stimmen[gewählt.fuelle]++;
  });
  return {
    temperatur: stimmen.warm > stimmen.kühl ? "warm" : "kühl",
    material: stimmen.natürlich > stimmen.elegant ? "natürlich" : "elegant",
    fuelle: stimmen.schlicht > stimmen.lebendig ? "schlicht" : "lebendig",
  };
}

export function stilSatz(stil: Stil): string {
  return `${stil.temperatur}, ${stil.material}, eher ${stil.fuelle}`;
}

// Die drei gewählten Bilder, die am besten zum Ergebnis passen.
export function beispielBilder(gewaehlt: QuizBild[], stil: Stil): QuizBild[] {
  const punkte = (b: QuizBild) =>
    Number(b.temperatur === stil.temperatur) + Number(b.material === stil.material) + Number(b.fuelle === stil.fuelle);
  return [...gewaehlt].sort((a, b) => punkte(b) - punkte(a)).slice(0, 3);
}
