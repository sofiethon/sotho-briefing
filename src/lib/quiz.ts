// Beispiel-Quiz-Inhalt (Issue 1). Sobald die Designerin genug eigene Bilder angelegt hat (Issue 2), nutzt das Quiz diese.

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

function beschreibung(stil: Stil, ort: string): string {
  const farbe = stil.temperatur === "warm" ? "warmen" : "kühlen";
  const stoff = stil.material === "natürlich" ? "Holz und Pflanzen" : "Marmor und Metall";
  const fülle = stil.fuelle === "schlicht" ? "wenig Dekoration" : "viel Dekoration";
  return `${ort} in ${farbe} Farben mit ${stoff} und ${fülle}`;
}

function bild(nr: number, temperatur: Temperatur, material: Material, fuelle: Fuelle): QuizBild {
  return {
    src: `/quiz/bild-${String(nr).padStart(2, "0")}.svg`,
    beschreibung: beschreibung({ temperatur, material, fuelle }, "Wohnzimmer"),
    temperatur,
    material,
    fuelle,
  };
}

// Jede Stil-Achse unterscheidet sich in genau 3 Paaren – so gibt es nie ein Unentschieden.
export const beispielPaare: QuizPaar[] = [
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

export function stilAusAntworten(gewaehlt: QuizBild[], paare: QuizPaar[]): Stil {
  // Gezählt wird nur dort, wo sich die beiden Bilder eines Paars bei dieser Achse unterscheiden.
  // Bei Gleichstand (bei eigenen Bildern möglich) gilt die zuletzt gegebene Antwort.
  const stimmen = { warm: 0, kühl: 0, natürlich: 0, elegant: 0, schlicht: 0, lebendig: 0 };
  const zuletzt: Partial<Stil> = {};
  gewaehlt.forEach((gewählt, i) => {
    const [a, b] = paare[i];
    if (a.temperatur !== b.temperatur) {
      stimmen[gewählt.temperatur]++;
      zuletzt.temperatur = gewählt.temperatur;
    }
    if (a.material !== b.material) {
      stimmen[gewählt.material]++;
      zuletzt.material = gewählt.material;
    }
    if (a.fuelle !== b.fuelle) {
      stimmen[gewählt.fuelle]++;
      zuletzt.fuelle = gewählt.fuelle;
    }
  });
  return {
    temperatur:
      stimmen.warm === stimmen.kühl ? (zuletzt.temperatur ?? "kühl") : stimmen.warm > stimmen.kühl ? "warm" : "kühl",
    material:
      stimmen.natürlich === stimmen.elegant
        ? (zuletzt.material ?? "elegant")
        : stimmen.natürlich > stimmen.elegant
          ? "natürlich"
          : "elegant",
    fuelle:
      stimmen.schlicht === stimmen.lebendig
        ? (zuletzt.fuelle ?? "lebendig")
        : stimmen.schlicht > stimmen.lebendig
          ? "schlicht"
          : "lebendig",
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

// ---- Eigene Bilder der Designerin (Issue 2) ----

export const temperaturen: Temperatur[] = ["warm", "kühl"];
export const materialien: Material[] = ["natürlich", "elegant"];
export const fuellen: Fuelle[] = ["schlicht", "lebendig"];

// Alle 8 Stile, so geordnet, dass sich benachbarte Stile (auch der letzte und der erste) in genau einer Achse unterscheiden.
export const stileImKreis: Stil[] = [
  { temperatur: "warm", material: "natürlich", fuelle: "schlicht" },
  { temperatur: "warm", material: "natürlich", fuelle: "lebendig" },
  { temperatur: "warm", material: "elegant", fuelle: "lebendig" },
  { temperatur: "warm", material: "elegant", fuelle: "schlicht" },
  { temperatur: "kühl", material: "elegant", fuelle: "schlicht" },
  { temperatur: "kühl", material: "elegant", fuelle: "lebendig" },
  { temperatur: "kühl", material: "natürlich", fuelle: "lebendig" },
  { temperatur: "kühl", material: "natürlich", fuelle: "schlicht" },
];

export const bilderProStil = 2;

export type GespeichertesBild = Stil & { id: string; src: string };

function gleicherStil(a: Stil, b: Stil): boolean {
  return a.temperatur === b.temperatur && a.material === b.material && a.fuelle === b.fuelle;
}

export function bilderVonStil<T extends Stil>(bilder: T[], stil: Stil): T[] {
  return bilder.filter((b) => gleicherStil(b, stil));
}

// Stile, für die noch Bilder fehlen, mit der Anzahl fehlender Bilder.
export function fehlendeBilder(bilder: Stil[]): { stil: Stil; fehlen: number }[] {
  return stileImKreis
    .map((stil) => ({ stil, fehlen: bilderProStil - bilderVonStil(bilder, stil).length }))
    .filter((e) => e.fehlen > 0);
}

export function istVollstaendig(bilder: Stil[]): boolean {
  return fehlendeBilder(bilder).length === 0;
}

export function stilName(stil: Stil): string {
  return `${stil.temperatur}, ${stil.material}, ${stil.fuelle}`;
}

// Baut aus 2 Bildern je Stil 8 Paare: Jeder Stil kommt zweimal vor, immer gegen seinen Nachbarn im Kreis.
export function paareAusBildern(bilder: GespeichertesBild[]): QuizPaar[] {
  const zuQuizBild = (b: GespeichertesBild): QuizBild => ({
    src: b.src,
    beschreibung: beschreibung(b, "Bild"),
    temperatur: b.temperatur,
    material: b.material,
    fuelle: b.fuelle,
  });
  return stileImKreis.map((stil, k) => {
    const naechster = stileImKreis[(k + 1) % stileImKreis.length];
    const a = zuQuizBild(bilderVonStil(bilder, stil)[0]);
    const b = zuQuizBild(bilderVonStil(bilder, naechster)[1]);
    return k % 2 === 0 ? [a, b] : [b, a];
  });
}
