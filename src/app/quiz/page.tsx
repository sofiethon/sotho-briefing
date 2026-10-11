import type { Metadata } from "next";
import Quiz from "@/components/Quiz";
import { ladeQuizPaare } from "@/lib/quiz-bilder";

export const metadata: Metadata = {
  title: "Stil-Quiz",
};

export default async function QuizPage() {
  const paare = await ladeQuizPaare();

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-6">
      <h1 className="mb-4 text-3xl font-bold leading-tight">Stil-Quiz</h1>
      <Quiz paare={paare} />
    </main>
  );
}
