import type { Metadata } from "next";
import Link from "next/link";
import BilderVerwaltung, { type VerwalteteBild } from "@/components/BilderVerwaltung";
import { fehlendeBilder, istVollstaendig, stilName, bilderProStil } from "@/lib/quiz";
import { zuGespeichertemBild, type BildZeile } from "@/lib/quiz-bilder";
import { createClient, supabaseKonfiguriert } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Meine Bilder",
};

function Huelle({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <h1 className="mb-4 text-3xl font-bold leading-tight">Meine Quiz-Bilder</h1>
      {children}
    </main>
  );
}

export default async function BilderPage() {
  if (!supabaseKonfiguriert) {
    return (
      <Huelle>
        <p className="rounded-xl bg-error-soft px-4 py-3 text-error" role="alert">
          Die Datenbank ist noch nicht eingerichtet. Es fehlen die Supabase-Werte in der Datei .env.local.
        </p>
      </Huelle>
    );
  }

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;

  if (!userId) {
    return (
      <Huelle>
        <p className="mb-4 text-lg">Diese Seite ist nur für angemeldete Designer*innen. Bitte melde dich an, um Quiz-Bilder anzulegen.</p>
        <Link
          href="/anmelden"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-semibold text-white hover:opacity-90"
        >
          Zur Anmeldung
        </Link>
      </Huelle>
    );
  }

  const { data } = await supabase
    .from("quiz_bilder")
    .select("id, user_id, bild_pfad, temperatur, material, fuelle")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  const zeilen = (data ?? []) as BildZeile[];
  const bilder: VerwalteteBild[] = zeilen.map((z) => ({ ...zuGespeichertemBild(z), pfad: z.bild_pfad }));
  const fehlt = fehlendeBilder(bilder);

  return (
    <Huelle>
      {istVollstaendig(bilder) ? (
        <p className="mb-6 rounded-xl bg-accent-soft px-4 py-3">
          Deine Liste ist vollständig. Das Quiz zeigt jetzt deine Bilder.{" "}
          <Link href="/quiz" className="font-semibold underline">
            Quiz ansehen
          </Link>
        </p>
      ) : (
        <div className="mb-6 rounded-xl bg-accent-soft px-4 py-3" role="status">
          <p className="mb-2">
            Es fehlen noch Bilder: Du brauchst je Stil mindestens {bilderProStil} Bilder (insgesamt 16). Bis dahin nutzt das Quiz die
            Beispielbilder.
          </p>
          <ul className="list-disc pl-5">
            {fehlt.map((f) => (
              <li key={stilName(f.stil)}>
                {stilName(f.stil)}: noch {f.fehlen}
              </li>
            ))}
          </ul>
        </div>
      )}
      <BilderVerwaltung userId={userId} bilder={bilder} />
    </Huelle>
  );
}
