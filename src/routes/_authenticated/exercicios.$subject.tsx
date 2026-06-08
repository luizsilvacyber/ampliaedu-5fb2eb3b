import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { findSubject } from "@/lib/videos";
import { generateExercises, type Question } from "@/lib/exercises.functions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, RefreshCw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/exercicios/$subject")({
  head: () => ({ meta: [{ title: "Exercícios — AmpliaEdu" }] }),
  component: ExerciciosSubject,
});

function ExerciciosSubject() {
  const { subject } = useParams({ from: "/_authenticated/exercicios/$subject" });
  const subj = findSubject(subject);
  const fetchExercises = useServerFn(generateExercises);
  const query = useQuery({
    queryKey: ["exercises", subject],
    queryFn: () => fetchExercises({ data: { subject_slug: subject } }),
    enabled: !!subj,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const questions: Question[] = query.data?.questions ?? [];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) s++;
    });
    return s;
  }, [submitted, answers, questions]);

  if (!subj) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Matéria não encontrada. <Link to="/exercicios" className="text-brand underline">Voltar</Link></p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link to="/exercicios" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Matérias
          </Link>
          <div className="ml-auto flex items-center gap-2 font-semibold">
            <span className="text-xl">{subj.emoji}</span> {subj.name}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-6">
        {query.isLoading && (
          <div className="rounded-2xl border border-border bg-card p-12 flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-brand" />
            <h2 className="text-lg font-semibold">Gerando 30 questões com IA…</h2>
            <p className="text-sm text-muted-foreground">Isso pode levar alguns segundos.</p>
          </div>
        )}

        {query.isError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="font-medium mb-3">Não foi possível gerar as questões.</p>
            <Button onClick={() => query.refetch()} variant="outline">
              <RefreshCw className="h-4 w-4" /> Tentar novamente
            </Button>
          </div>
        )}

        {query.isSuccess && questions.length > 0 && (
          <>
            {!submitted && (
              <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur border-b border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">{answeredCount}/{questions.length} respondidas</span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {submitted && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <Trophy className="h-10 w-10 text-brand mx-auto" />
                <h2 className="text-2xl font-bold mt-2">{score} / {questions.length}</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {Math.round((score / questions.length) * 100)}% de acertos
                </p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    Refazer
                  </Button>
                  <Button onClick={() => query.refetch()} variant="outline">
                    <RefreshCw className="h-4 w-4" /> Novas questões
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {questions.map((q, i) => {
                const selected = answers[i];
                return (
                  <div key={i} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-xs font-bold rounded-full bg-brand/10 text-brand px-2 py-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-medium flex-1">{q.question}</p>
                    </div>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = selected === oi;
                        const isCorrect = q.correctIndex === oi;
                        const showState = submitted;
                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={submitted}
                            onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                            className={cn(
                              "w-full text-left text-sm rounded-xl border px-3 py-2.5 transition-all flex items-start gap-2",
                              !showState && isSelected && "border-brand bg-brand/5",
                              !showState && !isSelected && "border-border hover:border-brand/40",
                              showState && isCorrect && "border-green-500 bg-green-500/10",
                              showState && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                              showState && !isCorrect && !isSelected && "border-border opacity-60",
                            )}
                          >
                            <span className="font-semibold text-xs mt-0.5">{String.fromCharCode(65 + oi)})</span>
                            <span className="flex-1">{opt}</span>
                            {showState && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                            {showState && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                        <span className="font-semibold text-foreground">Explicação: </span>{q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {!submitted && (
              <div className="sticky bottom-4 z-30 flex justify-center">
                <Button
                  size="lg"
                  disabled={answeredCount < questions.length}
                  onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="shadow-lg"
                >
                  {answeredCount < questions.length
                    ? `Responda todas (${answeredCount}/${questions.length})`
                    : "Ver resultado"}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}