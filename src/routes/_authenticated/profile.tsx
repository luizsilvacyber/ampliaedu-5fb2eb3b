import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboard } from "@/lib/dashboard.functions";
import { updateProfile } from "@/lib/profile.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Flame, Trophy, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/ampliaedu-logo.png";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Meu perfil — AmpliaEdu" }] }),
  component: ProfilePage,
});

const grades = [
  "Fundamental I", "Fundamental II", "1º Ensino Médio",
  "2º Ensino Médio", "3º Ensino Médio", "Pré-ENEM",
];

function ProfilePage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchDashboard = useServerFn(getDashboard);
  const save = useServerFn(updateProfile);
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDashboard() });
  const profile = data?.profile;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [grade, setGrade] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.display_name ?? "");
      setAvatar(profile.avatar_url ?? "");
      setGrade(profile.grade_level ?? "");
    }
  }, [profile]);

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_days ?? 0;
  const level = Math.floor(xp / 100) + 1;
  const nextLevelXp = level * 100;
  const progress = ((xp % 100) / 100) * 100;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await save({ data: { display_name: name, avatar_url: avatar, grade_level: grade } });
      await qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Perfil atualizado!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  const initial = (name || "E").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold tracking-tight">AmpliaEdu</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Meu perfil</h1>

        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
            <Sparkles className="h-5 w-5 mb-2 opacity-90" />
            <div className="text-xs uppercase tracking-wider opacity-80">Nível</div>
            <div className="text-3xl font-bold">{level}</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/25 overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[11px] mt-1 opacity-80">{xp}/{nextLevelXp} XP</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Trophy className="h-5 w-5 text-brand mb-2" />
            <div className="text-xs uppercase tracking-wider text-muted-foreground">XP total</div>
            <div className="text-3xl font-bold">{xp}</div>
            <p className="text-[11px] mt-1 text-muted-foreground">Acumulado nas trilhas</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Flame className="h-5 w-5 text-orange-500 mb-2" />
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Sequência</div>
            <div className="text-3xl font-bold">{streak}<span className="text-base text-muted-foreground font-medium"> dias</span></div>
            <p className="text-[11px] mt-1 text-muted-foreground">Recorde: {profile?.longest_streak ?? 0} dias</p>
          </div>
        </section>

        {/* Form */}
        <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand to-brand-dark text-white flex items-center justify-center text-2xl font-bold overflow-hidden shrink-0">
              {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : initial}
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Foto de perfil</p>
              <p>Cole a URL de uma imagem abaixo.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">URL do avatar</Label>
            <Input id="avatar" placeholder="https://..." value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Série / etapa</Label>
            <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Selecione...</option>
              {grades.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate({ to: "/dashboard" })}>Cancelar</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Salvar alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}