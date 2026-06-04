import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/ampliaedu-logo.png";

export const Route = createFileRoute("/_authenticated/enem")({
  head: () => ({ meta: [{ title: "Modo ENEM — AmpliaEdu" }] }),
  component: EnemPage,
});

type Question = {
  area: string;
  statement: string;
  options: string[];
  answer: number; // index
  explanation: string;
};

const questions: Question[] = [
  {
    area: "Matemática",
    statement: "Se f(x) = 2x + 3, qual o valor de f(5)?",
    options: ["10", "13", "11", "8"],
    answer: 1,
    explanation: "f(5) = 2·5 + 3 = 13.",
  },
  {
    area: "Linguagens",
    statement: "Na frase 'O menino chegou cedo', o sujeito é:",
    options: ["chegou", "cedo", "O menino", "Oração sem sujeito"],
    answer: 2,
    explanation: "Sujeito é quem pratica a ação — 'O menino'.",
  },
  {
    area: "Ciências da Natureza",
    statement: "Qual organela é responsável pela respiração celular?",
    options: ["Ribossomo", "Mitocôndria", "Lisossomo", "Complexo de Golgi"],
    answer: 1,
    explanation: "A mitocôndria produz ATP através da respiração celular.",
  },
  {
    area: "Ciências Humanas",
    statement: "A Proclamação da República no Brasil ocorreu em:",
    options: ["1822", "1888", "1889", "1891"],
    answer: 2,
    explanation: "Proclamada em 15 de novembro de 1889.",
  },
  {
    area: "Matemática",
    statement: "Qual o valor de 3² + 4²?",
    options: ["25", "49", "14", "12"],
    answer: 0,
    explanation: "9 + 16 = 25 (Pitágoras).",
  },
  {
    area: "Ciências da Natureza",
    statement: "A unidade de medida da corrente elétrica é:",
    options: ["Volt", "Watt", "Ampère", "Ohm"],
    answer: 2,
    explanation: "Corrente é medida em Ampère (A).",
  },
  {
    area: "Linguagens",
    statement: "'Suas ideias são luz no caminho' é exemplo de:",
    options: ["Metáfora", "Hipérbole", "Antítese", "Pleonasmo"],
    answer: 0,
    explanation: "Comparação implícita — metáfora.",
  },
  {
    area: "Ciências Humanas",
    statement: "O bioma com maior biodiversidade do Brasil é:",
    options: ["Cerrado", "Caatinga", "Mata Atlântica", "Amazônia"],
    answer: 3,
    explanation: "A Floresta Amazônica é o bioma mais biodiverso.",
  },
  {
    area: "Matemática",
    statement: "20% de 250 é igual a:",
    options: ["25", "50", "45", "75"],
    answer: 1,
    explanation: "0,2 × 250 = 50.",
  },
  {
    area: "Linguagens",
    statement: "Assinale a alternativa com crase obrigatória:",
    options: ["Vou a pé", "Refiro-me a ela", "Cheguei à escola", "Falei a você"],
    answer: 2,
    explanation: "'à escola' — preposição a + artigo a.",
  },
];

function EnemPage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const q = questions[idx];
  const score = useMemo(
    () => Object.entries(answers).reduce((acc, [i, v]) => acc + (questions[Number(i)].answer === v ? 1 : 0), 0),
    [answers],
  );

  function confirm() {
    if (selected === null) return;
    setAnswers((a) => ({ ...a, [idx]: selected }));
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
    setSelected(null);
  }

  function restart() {
    setIdx(0); setSelected(null); setAnswers({}); setFinished(false);
  }

  const answered = answers[idx] !== undefined;
  const correct = answered && answers[idx] === q.answer;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="font-bold tracking-tight">AmpliaEdu</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
            <Target className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Simulado ENEM</h1>
            <p className="text-muted-foreground text-sm">{questions.length} questões — todas as áreas</p>
          </div>
        </div>

        {finished ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-4">
            <div className="inline-flex h-16 w-16 rounded-full bg-success/10 text-success items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Simulado concluído!</h2>
            <p className="text-muted-foreground">Você acertou</p>
            <div className="text-5xl font-bold text-brand">{score}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
            <Progress value={(score / questions.length) * 100} className="h-2" />
            <Button onClick={restart} className="mt-4"><RefreshCw className="h-4 w-4" /> Refazer simulado</Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-brand">{q.area}</span>
              <span className="text-muted-foreground">Questão {idx + 1} de {questions.length}</span>
            </div>
            <Progress value={((idx + (answered ? 1 : 0)) / questions.length) * 100} className="h-1.5" />

            <h2 className="text-lg font-semibold leading-relaxed">{q.statement}</h2>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = answered && i === q.answer;
                const isWrong = answered && selected === i && i !== q.answer;
                return (
                  <button key={i} disabled={answered} onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      isCorrect ? "border-success bg-success/5" :
                      isWrong ? "border-destructive bg-destructive/5" :
                      selected === i ? "border-brand bg-brand/5" :
                      "border-border hover:border-brand/40"
                    }`}>
                    <span className={`h-7 w-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCorrect ? "border-success bg-success text-white" :
                      isWrong ? "border-destructive bg-destructive text-white" :
                      selected === i ? "border-brand bg-brand text-white" :
                      "border-muted-foreground/30"
                    }`}>{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1 text-sm">{opt}</span>
                    {isCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                    {isWrong && <XCircle className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`p-4 rounded-xl text-sm ${correct ? "bg-success/10 text-success-foreground border border-success/30" : "bg-destructive/5 border border-destructive/30"}`}>
                <p className="font-semibold mb-1">{correct ? "Resposta correta!" : "Resposta incorreta"}</p>
                <p className="text-muted-foreground">{q.explanation}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {!answered ? (
                <Button onClick={confirm} disabled={selected === null}>Confirmar resposta</Button>
              ) : (
                <Button onClick={next}>{idx + 1 >= questions.length ? "Ver resultado" : "Próxima questão"}</Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}