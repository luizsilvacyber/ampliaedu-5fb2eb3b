import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/dashboard.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/ampliaedu-logo.png";
import {
  Flame, Trophy, BookOpen, Brain, Youtube, Target,
  ChevronRight, LogOut, Sparkles, Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Meu painel — AmpliaEdu" }] }),
  component: Dashboard,
});

const tracks = [
  { icon: BookOpen, title: "Matemática", desc: "Continue: Funções de 1º grau", progress: 62, color: "from-brand to-brand-dark" },
  { icon: Brain, title: "Português", desc: "Próximo: Interpretação de texto", progress: 34, color: "from-success to-brand" },
  { icon: Target, title: "Modo ENEM", desc: "Simulado disponível", progress: 18, color: "from-brand-dark to-brand" },
  { icon: Youtube, title: "Videoaulas", desc: "5 novas curadas para você", progress: 0, color: "from-brand to-success" },
];

const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

function Dashboard() {
  const navigate = useNavigate();
  const fetchDashboard = useServerFn(getDashboard);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
  });

  const profile = data?.profile;
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

        {/* Tracks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Suas trilhas</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Ver todas <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tracks.map((t) => (
              <button key={t.title} className="text-left group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] hover:border-brand/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white shrink-0`}>
                    <t.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold truncate">{t.title}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{t.desc}</p>
                    {t.progress > 0 && (
                      <div className="mt-3">
                        <Progress value={t.progress} className="h-1.5" />
                        <p className="text-[11px] text-muted-foreground mt-1">{t.progress}% concluído</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Acesso rápido</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Brain, label: "IA Tutora" },
              { icon: BookOpen, label: "Biblioteca" },
              { icon: Target, label: "Simulado" },
              { icon: Calendar, label: "Meta diária" },
            ].map((a) => (
              <button key={a.label} className="rounded-2xl border border-border bg-card p-4 hover:border-brand hover:text-brand transition-colors flex flex-col items-center gap-2 text-sm font-medium">
                <a.icon className="h-5 w-5" />
                {a.label}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}