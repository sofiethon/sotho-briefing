"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AbmeldenKnopf() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium hover:bg-accent-soft"
    >
      Abmelden
    </button>
  );
}
