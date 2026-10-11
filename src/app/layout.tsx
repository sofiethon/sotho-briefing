import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "sotho-briefing", template: "%s – sotho-briefing" },
  description: "Ein kurzes Bilder-Quiz zeigt Kundschaft von Innenarchitekt*innen ihren Stil und wie gut jeder Raumvorschlag dazu passt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
