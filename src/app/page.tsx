import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">Zeig uns deinen Stil</h1>
      <p className="mb-8 max-w-xl text-lg text-muted">
        Acht Bildpaare, jeweils ein Fingertipp: Danach siehst du in einem Satz, welcher Einrichtungsstil zu dir passt.
      </p>
      <div>
        <Link
          href="/quiz"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-base font-semibold text-white hover:opacity-90"
        >
          Quiz starten
        </Link>
      </div>
    </main>
  );
}
