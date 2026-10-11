import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Solange noch keine Supabase-Werte in .env.local stehen, läuft die App mit den Beispielbildern weiter.
export const supabaseKonfiguriert = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Aus einer Server-Komponente heraus nicht möglich – das Auffrischen übernimmt proxy.ts.
          }
        },
      },
    },
  );
}
