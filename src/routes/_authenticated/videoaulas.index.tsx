import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronRight, Youtube } from "lucide-react";
import logo from "@/assets/ampliaedu-logo.png";
import { subjects } from "@/lib/videos";
import { Progress } from "@/components/ui/progress";
import { getProgress } from "@/lib/lessons.functions";

export const Route = createFileRoute("/_authenticated/videoaulas/")({
  head: () => ({ meta: [{ title: "Videoaulas — AmpliaEdu" }] }),
  component: VideoaulasIndex,
});

function VideoaulasIndex() {
  const fetchProgress = useServerFn(getProgress);
  const { data } = useQuery({ queryKey: ["progress"], queryFn: () => fetchProgress() });
  const bySubject = new Map<string, number>();
  for (const c of data?.completions ?? []) {
    bySubject.set(c.subject_slug, (bySubject.get(c.subject_slug) ?? 0) + 1);
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold tracking-tight">AmpliaEdu</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <Youtube className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Todas as matérias</h1>
            <p className="text-muted-foreground">{subjects.length} trilhas · 10 aulas curadas por matéria, em ordem.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const done = bySubject.get(s.slug) ?? 0;
            const pct = Math.round((done / s.videos.length) * 100);
            return (
              <Link key={s.slug} to="/videoaulas/$subject" params={{ subject: s.slug }}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] hover:border-brand/40 transition-all">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl`}>
                    {s.emoji}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-3 font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{done}/{s.videos.length} concluídas</p>
                <div className="mt-3">
                  <Progress value={pct} className="h-1.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}