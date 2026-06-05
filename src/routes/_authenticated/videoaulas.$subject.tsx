import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, CheckCircle2, ExternalLink, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/ampliaedu-logo.png";
import { findSubject, type Subject } from "@/lib/videos";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { completeLesson, getProgress } from "@/lib/lessons.functions";

export const Route = createFileRoute("/_authenticated/videoaulas/$subject")({
  head: ({ params }) => ({ meta: [{ title: `${params.subject} — Videoaulas — AmpliaEdu` }] }),
  loader: ({ params }) => {
    const subject = findSubject(params.subject);
    if (!subject) throw notFound();
    return { subject };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Matéria não encontrada</h1>
        <Link to="/videoaulas" className="text-brand underline mt-4 inline-block">Ver todas as matérias</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-6">Erro: {error.message}</div>,
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData() as { subject: Subject };
  const [currentId, setCurrentId] = useState(subject.videos[0].id);
  const current = subject.videos.find((v) => v.id === currentId) ?? subject.videos[0];
  const currentIndex = subject.videos.findIndex((v) => v.id === current.id);

  const qc = useQueryClient();
  const fetchProgress = useServerFn(getProgress);
  const { data } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchProgress(),
  });

  const completedSet = useMemo(() => {
    const set = new Set<string>();
    (data?.completions ?? [])
      .filter((c) => c.subject_slug === subject.slug)
      .forEach((c) => set.add(c.video_id));
    return set;
  }, [data, subject.slug]);

  const doneCount = completedSet.size;
  const total = subject.videos.length;
  const pct = Math.round((doneCount / total) * 100);
  const isCurrentDone = completedSet.has(current.id);

  const completeFn = useServerFn(completeLesson);
  const mutation = useMutation({
    mutationFn: () =>
      completeFn({ data: { subject_slug: subject.slug, video_id: current.id } }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      if (res.already) {
        toast("Aula já estava concluída ✅");
      } else {
        toast.success(`+10 XP! Nível ${res.level} · 🔥 ${res.streak_days} dia(s)`);
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const embedSrc = subject.playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${subject.playlistId}&index=${currentIndex + 1}&rel=0`
    : `https://www.youtube.com/embed/${current.id}?rel=0`;
  const externalHref = subject.playlistId
    ? `https://www.youtube.com/playlist?list=${subject.playlistId}`
    : `https://www.youtube.com/watch?v=${current.id}`;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/videoaulas" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Matérias
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold tracking-tight">AmpliaEdu</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${subject.color} text-white flex items-center justify-center text-xl`}>
            {subject.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{subject.name}</h1>
            <p className="text-muted-foreground text-sm">
              {doneCount}/{total} aulas concluídas · faltam {total - doneCount}
            </p>
            <div className="mt-2 max-w-md">
              <Progress value={pct} className="h-1.5" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-black">
              <iframe
                key={embedSrc}
                className="w-full h-full"
                src={embedSrc}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{current.title}</h2>
                <p className="text-sm text-muted-foreground">{current.channel}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={externalHref} target="_blank" rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 shrink-0">
                  Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending || isCurrentDone}
                  variant={isCurrentDone ? "secondary" : "default"}
                >
                  {isCurrentDone ? (
                    <><CheckCircle2 className="h-4 w-4" /> Aula concluída</>
                  ) : (
                    <><Check className="h-4 w-4" /> Concluir aula (+10 XP)</>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-2 lg:max-h-[600px] lg:overflow-y-auto pr-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">Playlist</h3>
            {subject.videos.map((v, i) => {
              const active = v.id === current.id;
              const done = completedSet.has(v.id);
              return (
                <button key={v.id} onClick={() => setCurrentId(v.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${active ? "border-brand bg-brand/5" : "border-border bg-card hover:border-brand/40"}`}>
                  <div className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${done ? "bg-success text-white" : active ? "bg-brand text-white" : "bg-muted text-muted-foreground"}`}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate flex items-center gap-1">
                      {active && <PlayCircle className="h-3.5 w-3.5 text-brand shrink-0" />} {v.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{v.channel}</p>
                  </div>
                </button>
              );
            })}
          </aside>
        </div>
      </main>
    </div>
  );
}