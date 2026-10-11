import Link from "next/link";
import AbmeldenKnopf from "@/components/AbmeldenKnopf";
import { createClient, supabaseKonfiguriert } from "@/lib/supabase/server";

export default async function Header() {
  let angemeldet = false;
  if (supabaseKonfiguriert) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    angemeldet = Boolean(data?.claims?.sub);
  }
  const linkKlasse = "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium hover:bg-accent-soft";

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded-full bg-accent" />
          sotho-briefing
        </Link>
        <nav aria-label="Hauptmenü" className="flex items-center">
          {angemeldet ? (
            <>
              <Link href="/bilder" className={linkKlasse}>
                Meine Bilder
              </Link>
              <AbmeldenKnopf />
            </>
          ) : (
            <Link href="/anmelden" className={linkKlasse}>
              Anmelden
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
