import { createFileRoute, Link } from "@tanstack/react-router";
import { subjects } from "@/lib/videos";
import { ChevronRight, ArrowLeft, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/_authenticated/exercicios/")({
  head: () => ({ meta: [{ title: "Exercícios — AmpliaEdu" }] }),
  component: ExerciciosIndex,
});

function ExerciciosIndex() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="ml-auto flex items-center gap-2 font-semibold">
            <ClipboardList className="h-5 w-5 text-brand" /> Exercícios
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pratique por matéria</h1>
          <p className="text-muted-foreground mt-1">30 questões geradas por IA para cada disciplina, no estilo ENEM.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => (
            <Link
              key={s.slug}
              to="/exercicios/$subject"
              params={{ subject: s.slug }}
              className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] hover:border-brand/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-lg shrink-0`}>
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold truncate">{s.name}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">30 questões geradas por IA</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}