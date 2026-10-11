"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Modus = "anmelden" | "registrieren";

function verstaendlicheMeldung(nachricht: string): string {
  const text = nachricht.toLowerCase();
  if (text.includes("invalid login")) return "E-Mail oder Passwort stimmen nicht. Probier es noch einmal.";
  if (text.includes("already registered")) return "Mit dieser E-Mail gibt es schon ein Konto. Wechsle zu „Anmelden“.";
  if (text.includes("at least")) return "Das Passwort ist zu kurz. Nimm mindestens 6 Zeichen.";
  if (text.includes("email not confirmed")) return "Bitte bestätige zuerst den Link in der E-Mail, die wir dir geschickt haben.";
  if (text.includes("rate limit")) return "Das ging zu oft hintereinander. Warte kurz und versuch es dann noch einmal.";
  return "Das hat nicht geklappt. Prüf deine Eingaben und versuch es noch einmal.";
}

export default function AnmeldeFormular() {
  const router = useRouter();
  const [modus, setModus] = useState<Modus>("anmelden");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [meldung, setMeldung] = useState<{ art: "fehler" | "info"; text: string } | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    setLaeuft(true);
    setMeldung(null);
    const supabase = createClient();

    if (modus === "anmelden") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });
      if (error) {
        setMeldung({ art: "fehler", text: verstaendlicheMeldung(error.message) });
        setLaeuft(false);
        return;
      }
      router.push("/bilder");
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password: passwort });
    setLaeuft(false);
    if (error) {
      setMeldung({ art: "fehler", text: verstaendlicheMeldung(error.message) });
      return;
    }
    if (data.session) {
      router.push("/bilder");
      router.refresh();
      return;
    }
    setMeldung({
      art: "info",
      text: "Fast geschafft: Wir haben dir eine E-Mail geschickt. Klick dort auf den Link und melde dich danach hier an.",
    });
  }

  const feld = "min-h-11 w-full rounded-xl border border-border bg-card px-4 text-base";

  return (
    <form onSubmit={absenden} className="flex flex-col gap-4" noValidate={false}>
      <div className="flex rounded-full border border-border bg-card p-1" role="group" aria-label="Anmelden oder registrieren">
        {(["anmelden", "registrieren"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={modus === m}
            onClick={() => {
              setModus(m);
              setMeldung(null);
            }}
            className={`min-h-11 flex-1 rounded-full px-4 font-medium ${modus === m ? "bg-accent text-white" : "hover:bg-accent-soft"}`}
          >
            {m === "anmelden" ? "Anmelden" : "Registrieren"}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1 font-medium">
        E-Mail
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={feld}
        />
      </label>
      <label className="flex flex-col gap-1 font-medium">
        Passwort
        <input
          type="password"
          required
          minLength={6}
          autoComplete={modus === "anmelden" ? "current-password" : "new-password"}
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
          className={feld}
        />
      </label>

      {meldung && (
        <p
          role={meldung.art === "fehler" ? "alert" : "status"}
          className={`rounded-xl px-4 py-3 ${meldung.art === "fehler" ? "bg-error-soft text-error" : "bg-accent-soft"}`}
        >
          {meldung.text}
        </p>
      )}

      <button
        type="submit"
        disabled={laeuft}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {laeuft ? "Einen Moment …" : modus === "anmelden" ? "Anmelden" : "Konto anlegen"}
      </button>
    </form>
  );
}
