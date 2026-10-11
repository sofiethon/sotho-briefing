import { createClient, supabaseKonfiguriert } from "@/lib/supabase/server";
import { beispielPaare, istVollstaendig, paareAusBildern, type GespeichertesBild, type QuizPaar } from "@/lib/quiz";

export type BildZeile = {
  id: string;
  user_id: string;
  bild_pfad: string;
  temperatur: GespeichertesBild["temperatur"];
  material: GespeichertesBild["material"];
  fuelle: GespeichertesBild["fuelle"];
};

export const bucketName = "quiz-bilder";

export function bildUrl(pfad: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${pfad}`;
}

export function zuGespeichertemBild(zeile: BildZeile): GespeichertesBild {
  return {
    id: zeile.id,
    src: bildUrl(zeile.bild_pfad),
    temperatur: zeile.temperatur,
    material: zeile.material,
    fuelle: zeile.fuelle,
  };
}

// Das Quiz nutzt die Bilder der ersten Designerin mit vollständiger Liste, sonst die Beispielbilder.
export async function ladeQuizPaare(): Promise<QuizPaar[]> {
  if (!supabaseKonfiguriert) return beispielPaare;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz_bilder")
    .select("id, user_id, bild_pfad, temperatur, material, fuelle")
    .order("created_at", { ascending: true });
  if (error || !data) return beispielPaare;

  const nachDesignerin = new Map<string, GespeichertesBild[]>();
  for (const zeile of data as BildZeile[]) {
    const liste = nachDesignerin.get(zeile.user_id) ?? [];
    liste.push(zuGespeichertemBild(zeile));
    nachDesignerin.set(zeile.user_id, liste);
  }
  for (const bilder of nachDesignerin.values()) {
    if (istVollstaendig(bilder)) return paareAusBildern(bilder);
  }
  return beispielPaare;
}
