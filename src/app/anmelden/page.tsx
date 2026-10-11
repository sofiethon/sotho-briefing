import type { Metadata } from "next";
import AnmeldeFormular from "@/components/AnmeldeFormular";
import { supabaseKonfiguriert } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Anmelden",
};

export default function AnmeldenPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-6">
      <h1 className="mb-2 text-3xl font-bold leading-tight">Anmelden</h1>
      <p className="mb-6 text-muted">Für Designer*innen: Melde dich an, um die Bilder für dein Quiz anzulegen.</p>
      {supabaseKonfiguriert ? (
        <AnmeldeFormular />
      ) : (
        <p className="rounded-xl bg-error-soft px-4 py-3 text-error" role="alert">
          Die Anmeldung ist noch nicht eingerichtet. Es fehlen die Supabase-Werte in der Datei .env.local.
        </p>
      )}
    </main>
  );
}
