import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/ampliaedu-logo.png";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, Trophy, Youtube, Sparkles, Target,
  GraduationCap, Library, BarChart3, Users, Zap, Heart,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AmpliaEdu — Plataforma educacional gratuita com IA" },
      { name: "description", content: "Estude do Fundamental ao Ensino Médio com trilhas, videoaulas, IA tutora, simulados ENEM e gamificação. 100% gratuito." },
      { property: "og:title", content: "AmpliaEdu — Educação ampliada por IA" },
      { property: "og:description", content: "Plataforma educacional gratuita com trilhas, biblioteca digital, IA tutora e integração com YouTube." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Brain, title: "IA Tutora", desc: "Tire dúvidas 24/7 com uma inteligência artificial que entende seu nível e seu ritmo." },
  { icon: Youtube, title: "YouTube Inteligente", desc: "Curadoria automática das melhores videoaulas dos canais educacionais mais confiáveis." },
  { icon: Target, title: "Modo ENEM", desc: "Simulados, redação e trilhas focadas na sua aprovação no ENEM e vestibulares." },
  { icon: Library, title: "Biblioteca Digital", desc: "PDFs, resumos, apostilas e simulados organizados por disciplina e série." },
  { icon: Trophy, title: "Gamificação", desc: "XP, níveis, conquistas e metas diárias para manter você motivado todos os dias." },
  { icon: BarChart3, title: "Progresso Real", desc: "Acompanhe sua evolução com dashboards inteligentes e relatórios detalhados." },
];

const subjects = [
  "Matemática", "Português", "Física", "Química", "Biologia",
  "História", "Geografia", "Inglês", "Filosofia", "Sociologia",
  "Artes", "Ed. Física",
];

const stages = [
  { title: "Fundamental I", years: "1º ao 5º ano", color: "from-brand to-brand-dark" },
  { title: "Fundamental II", years: "6º ao 9º ano", color: "from-brand-dark to-brand" },
  { title: "Ensino Médio", years: "1º ao 3º ano", color: "from-brand to-success" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AmpliaEdu" className="h-9 w-9 object-contain" />
            <span className="font-bold text-lg tracking-tight">AmpliaEdu</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a>
            <a href="#disciplinas" className="hover:text-foreground transition-colors">Disciplinas</a>
            <a href="#niveis" className="hover:text-foreground transition-colors">Níveis</a>
            <a href="#ia" className="hover:text-foreground transition-colors">IA Tutora</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Entrar</Button>
            <Button size="sm" className="bg-brand hover:bg-brand/90 text-brand-foreground shadow-[var(--shadow-soft)]">
              Começar grátis
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full blur-3xl opacity-30"
               style={{ background: "var(--gradient-brand)" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                100% gratuito • Com IA integrada
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Educação que <span className="bg-gradient-to-r from-brand to-success bg-clip-text text-transparent">amplia</span> seu potencial.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Do Fundamental ao Ensino Médio. Trilhas personalizadas, videoaulas curadas por IA, biblioteca digital, simulados ENEM e uma tutora inteligente sempre disponível.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="bg-brand hover:bg-brand/90 text-brand-foreground shadow-[var(--shadow-elegant)] h-12 px-7 text-base">
                  Criar conta gratuita
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 text-base">
                  Explorar plataforma
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-success" /> Sem cartão</div>
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-brand" /> Acesso imediato</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
                   style={{ background: "var(--gradient-hero)" }} />
              <div className="relative rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
                <img src={logo} alt="Disciplinas AmpliaEdu" className="w-full max-w-md mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / NIVEIS */}
      <section id="niveis" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Para todas as fases da escola</h2>
            <p className="mt-3 text-muted-foreground">Conteúdo organizado por etapa, série e disciplina.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {stages.map((s) => (
              <div key={s.title} className={`rounded-2xl p-6 bg-gradient-to-br ${s.color} text-white shadow-[var(--shadow-soft)]`}>
                <GraduationCap className="h-8 w-8 mb-4 opacity-90" />
                <div className="text-xl font-semibold">{s.title}</div>
                <div className="text-sm opacity-90 mt-1">{s.years}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="recursos" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block text-xs font-semibold tracking-wider text-brand uppercase mb-3">Recursos</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Tudo o que você precisa para estudar melhor</h2>
            <p className="mt-4 text-muted-foreground">Uma plataforma completa que combina conteúdo, tecnologia e inteligência artificial.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] hover:border-brand/40 transition-all">
                <div className="h-11 w-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINAS */}
      <section id="disciplinas" className="py-20 bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Todas as disciplinas, em um só lugar</h2>
            <p className="mt-3 text-muted-foreground">Conteúdo alinhado à BNCC e ao ENEM.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* IA TUTORA */}
      <section id="ia" className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden"
               style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-success/30 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium mb-5">
                  <Sparkles className="h-3.5 w-3.5" /> IA Tutora + YouTube
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Uma tutora particular que nunca dorme.</h2>
                <p className="mt-4 text-white/85 text-lg">
                  A IA da AmpliaEdu encontra as melhores videoaulas do YouTube, monta playlists por tema, sugere exercícios e tira suas dúvidas no momento exato em que você precisa.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="bg-white text-brand-dark hover:bg-white/90 h-12 px-6">
                    Experimentar IA agora
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-12 px-6">
                    Ver demonstração
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Youtube, label: "Videoaulas curadas" },
                  { icon: Brain, label: "Respostas instantâneas" },
                  { icon: Target, label: "Foco em ENEM" },
                  { icon: Users, label: "Para todos os níveis" },
                ].map((i) => (
                  <div key={i.label} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5">
                    <i.icon className="h-6 w-6 mb-3" />
                    <div className="text-sm font-semibold">{i.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Pronto para ampliar seus estudos?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Junte-se à nova geração de estudantes que aprende com IA, gamificação e os melhores conteúdos do Brasil.</p>
          <Button size="lg" className="mt-8 bg-brand hover:bg-brand/90 text-brand-foreground shadow-[var(--shadow-elegant)] h-12 px-8 text-base">
            Criar minha conta gratuita
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-7 w-7 object-contain" />
            <span className="font-semibold">AmpliaEdu</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AmpliaEdu — Educação gratuita e de qualidade para todos.</p>
        </div>
      </footer>
    </div>
  );
}
