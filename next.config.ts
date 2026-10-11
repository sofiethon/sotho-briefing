import type { NextConfig } from "next";

// Die hochgeladenen Quiz-Bilder liegen im Supabase-Speicher; next/image braucht dessen Adresse.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : null;

const nextConfig: NextConfig = {
  // Das „N“-Symbol unten links im Entwicklungsmodus ausblenden – es verdeckt am Handy Inhalte.
  devIndicators: false,
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
};

export default nextConfig;
