import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import logo from "@/assets/ampliaedu-logo.png";
import { findSubject, type Subject } from "@/lib/videos";

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
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{subject.name}</h1>
            <p className="text-muted-foreground text-sm">Selecione uma aula para assistir</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-black">
              <iframe
                key={current.id}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${current.id}?rel=0`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{current.title}</h2>
                <p className="text-sm text-muted-foreground">{current.channel}</p>
              </div>
              <a href={`https://www.youtube.com/watch?v=${current.id}`} target="_blank" rel="noreferrer"
                className="text-sm text-brand hover:underline inline-flex items-center gap-1 shrink-0">
                Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <aside className="space-y-2 lg:max-h-[600px] lg:overflow-y-auto pr-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">Playlist</h3>
            {subject.videos.map((v, i) => {
              const active = v.id === current.id;
              return (
                <button key={v.id} onClick={() => setCurrentId(v.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${active ? "border-brand bg-brand/5" : "border-border bg-card hover:border-brand/40"}`}>
                  <div className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${active ? "bg-brand text-white" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
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