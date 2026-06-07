import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getProgress } from "@/lib/lessons.functions";
import { subjects, totalLessons } from "@/lib/videos";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/ampliaedu-logo.png";
import {
  Flame, Trophy, Brain, Youtube, Target, BookOpen,
  ChevronRight, LogOut, Sparkles, User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Meu painel — AmpliaEdu" }] }),
  component: Dashboard,
});

const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

function Dashboard() {
  const navigate = useNavigate();
  const fetchProgress = useServerFn(getProgress);
  const { data, isLoading } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchProgress(),
  });

  const profile = data?.profile;
  const completions = data?.completions ?? [];
  const bySubject = new Map<string, number>();
  for (const c of completions) bySubject.set(c.subject_slug, (bySubject.get(c.subject_slug) ?? 0) + 1);
  const totalDone = completions.length;
  const total = totalLessons();
  const overallPct = Math.round((totalDone / total) * 100);

  const name = profile?.display_name ?? "Estudante";
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_days ?? 0;
  const nextLevelXp = Math.ceil((xp + 100) / 100) * 100;
  const levelProgress = nextLevelXp === 0 ? 0 : ((xp % 100) / 100) * 100;
  const level = Math.floor(xp / 100) + 1;

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Até logo!");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold tracking-tight">AmpliaEdu</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
        {/* Greeting + Stats */}
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
               style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-success/30 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Nível {level}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isLoading ? "Carregando..." : `Olá, ${name.split(" ")[0]}!`}
              </h1>
              <p className="mt-2 text-white/85">Pronto para mais um dia de aprendizado?</p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="opacity-90">{xp} XP</span>
                  <span className="opacity-90">{nextLevelXp} XP</span>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${levelProgress}%` }} />
                </div>
                <p className="text-xs mt-2 opacity-80">{Math.max(0, nextLevelXp - xp)} XP para o próximo nível</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="rounded-2xl bg-card border border-border p-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                <Flame className="h-4 w-4 text-orange-500" /> Sequência
              </div>
              <div className="mt-2 text-3xl font-bold">{streak}<span className="text-lg text-muted-foreground font-medium"> dias</span></div>
              <div className="mt-3 flex gap-1">
                {weekDays.map((d, i) => (
                  <div key={i} className={`flex-1 h-7 rounded-md flex items-center justify-center text-[10px] font-semibold ${i < streak % 7 ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"}`}>{d}</div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-5">
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                <Trophy className="h-4 w-4 text-brand" /> XP total
              </div>
              <div className="mt-2 text-3xl font-bold">{xp}</div>
              <p className="text-xs text-muted-foreground mt-1">Continue estudando para subir!</p>
            </div>
          </div>
        </section>

        {/* Overall progress */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Progresso geral</h2>
            <span className="text-sm font-semibold">{totalDone}/{total} aulas · {overallPct}%</span>
          </div>
          <Progress value={overallPct} className="h-2" />
        </section>

        {/* Tracks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Suas trilhas</h2>
            <Link to="/videoaulas" className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1">
              Ver tudo <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => {
              const done = bySubject.get(s.slug) ?? 0;
              const pct = Math.round((done / s.videos.length) * 100);
              const remaining = s.videos.length - done;
              return (
                <Link key={s.slug} to="/videoaulas/$subject" params={{ subject: s.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] hover:border-brand/40 transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-lg shrink-0`}>
                      {s.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold truncate">{s.name}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {done === 0 ? "Comece sua trilha" : remaining === 0 ? "🏆 Trilha concluída!" : `Faltam ${remaining} aulas`}
                      </p>
                      <div className="mt-3">
                        <Progress value={pct} className="h-1.5" />
                        <p className="text-[11px] text-muted-foreground mt-1">{done}/{s.videos.length} · {pct}%</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Acesso rápido</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <a href="https://chat.openai.com/" target="_blank" rel="noreferrer"
              className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              <Brain className="h-5 w-5" /> IA Tutora
            </a>
            <Link to="/videoaulas" className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              <Youtube className="h-5 w-5" /> Videoaulas
            </Link>
            <Link to="/enem" className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              <Target className="h-5 w-5" /> Simulado
            </Link>
            <a href="https://biblion.odilo.us/" target="_blank" rel="noreferrer"
              className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              <BookOpen className="h-5 w-5" /> Biblioteca Digital
            </a>
            <Link to="/profile" className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              <UserIcon className="h-5 w-5" /> Meu perfil
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}