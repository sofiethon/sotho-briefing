"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  fuellen,
  materialien,
  stilName,
  temperaturen,
  type Fuelle,
  type GespeichertesBild,
  type Material,
  type Temperatur,
} from "@/lib/quiz";

export type VerwalteteBild = GespeichertesBild & { pfad: string };

const erlaubteTypen = ["image/jpeg", "image/png", "image/webp"];
const maxBytes = 5 * 1024 * 1024;
const feld = "min-h-11 w-full rounded-xl border border-border bg-card px-4 text-base";

export default function BilderVerwaltung({ userId, bilder }: { userId: string; bilder: VerwalteteBild[] }) {
  const router = useRouter();
  const dateiRef = useRef<HTMLInputElement>(null);
  const [temperatur, setTemperatur] = useState<Temperatur>("warm");
  const [material, setMaterial] = useState<Material>("natürlich");
  const [fuelle, setFuelle] = useState<Fuelle>("schlicht");
  const [fehler, setFehler] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  async function hochladen(e: React.FormEvent) {
    e.preventDefault();
    setFehler(null);
    const datei = dateiRef.current?.files?.[0];
    if (!datei) {
      setFehler("Bitte wähle zuerst ein Bild aus.");
      return;
    }
    if (!erlaubteTypen.includes(datei.type)) {
      setFehler("Diese Datei ist kein Bild, das wir verwenden können. Nimm ein JPG-, PNG- oder WebP-Bild.");
      return;
    }
    if (datei.size > maxBytes) {
      setFehler("Das Bild ist größer als 5 MB. Bitte nimm ein kleineres Bild.");
      return;
    }

    setLaeuft(true);
    const supabase = createClient();
    const endung = datei.type === "image/png" ? "png" : datei.type === "image/webp" ? "webp" : "jpg";
    const pfad = `${userId}/${crypto.randomUUID()}.${endung}`;

    const { error: uploadFehler } = await supabase.storage.from("quiz-bilder").upload(pfad, datei, { contentType: datei.type });
    if (uploadFehler) {
      setFehler("Das Bild konnte nicht hochgeladen werden. Versuch es bitte noch einmal.");
      setLaeuft(false);
      return;
    }
    const { error: eintragFehler } = await supabase
      .from("quiz_bilder")
      .insert({ bild_pfad: pfad, temperatur, material, fuelle });
    if (eintragFehler) {
      await supabase.storage.from("quiz-bilder").remove([pfad]);
      setFehler("Das Bild konnte nicht gespeichert werden. Versuch es bitte noch einmal.");
      setLaeuft(false);
      return;
    }
    if (dateiRef.current) dateiRef.current.value = "";
    setLaeuft(false);
    router.refresh();
  }

  async function loeschen(bild: VerwalteteBild) {
    setFehler(null);
    const supabase = createClient();
    const { error } = await supabase.from("quiz_bilder").delete().eq("id", bild.id);
    if (error) {
      setFehler("Das Bild konnte nicht gelöscht werden. Versuch es bitte noch einmal.");
      return;
    }
    await supabase.storage.from("quiz-bilder").remove([bild.pfad]);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={hochladen} className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
        <h2 className="text-xl font-semibold">Neues Bild anlegen</h2>
        <label className="flex flex-col gap-1 font-medium">
          Bild (JPG, PNG oder WebP, höchstens 5 MB)
          <input
            ref={dateiRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="min-h-11 rounded-xl border border-border bg-background px-3 py-2 text-base"
          />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1 font-medium">
            Farbe
            <select value={temperatur} onChange={(e) => setTemperatur(e.target.value as Temperatur)} className={feld}>
              {temperaturen.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 font-medium">
            Material
            <select value={material} onChange={(e) => setMaterial(e.target.value as Material)} className={feld}>
              {materialien.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 font-medium">
            Fülle
            <select value={fuelle} onChange={(e) => setFuelle(e.target.value as Fuelle)} className={feld}>
              {fuellen.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
        {fehler && (
          <p role="alert" className="rounded-xl bg-error-soft px-4 py-3 text-error">
            {fehler}
          </p>
        )}
        <button
          type="submit"
          disabled={laeuft}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          <Upload size={18} aria-hidden="true" />
          {laeuft ? "Wird hochgeladen …" : "Bild hochladen"}
        </button>
      </form>

      <h2 className="mb-3 text-xl font-semibold">Deine Bilder ({bilder.length})</h2>
      {bilder.length === 0 ? (
        <p className="text-muted">Du hast noch kein Bild angelegt. Lade oben dein erstes Bild hoch.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {bilder.map((bild, i) => (
            <li key={bild.id}>
              <article className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={bild.src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 220px, 45vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="text-sm">{stilName(bild)}</p>
                  <button
                    type="button"
                    onClick={() => loeschen(bild)}
                    aria-label={`Bild löschen (${stilName(bild)})`}
                    className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-border hover:bg-error-soft"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
