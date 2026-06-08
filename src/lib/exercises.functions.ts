import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { subjects } from "@/lib/videos";

const Input = z.object({
  subject_slug: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9-]+$/),
});

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string(),
});
const QuestionsSchema = z.object({ questions: z.array(QuestionSchema).min(20) });

export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const generateExercises = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const subject = subjects.find((s) => s.slug === data.subject_slug);
    if (!subject) throw new Error("Matéria não encontrada");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY ausente");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    const prompt = `Você é um professor brasileiro experiente em ensino médio e ENEM.
Gere EXATAMENTE 30 questões de múltipla escolha sobre "${subject.name}" para alunos do ensino médio brasileiro, no estilo ENEM.

Regras:
- Cada questão tem 4 alternativas, apenas 1 correta.
- Varie a dificuldade (fácil, médio, difícil) e os tópicos cobertos.
- Português do Brasil, claro e objetivo.
- Inclua uma explicação curta da resposta correta.
- Não numere as questões dentro do texto.

Responda APENAS com JSON válido no formato exato:
{"questions":[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}, ... 30 itens ...]}
Sem texto fora do JSON, sem markdown, sem \`\`\`.`;

    const { text } = await generateText({ model, prompt });
    const cleaned = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Falha ao gerar questões.");
      parsed = JSON.parse(match[0]);
    }
    const result = QuestionsSchema.parse(parsed);
    return { questions: result.questions.slice(0, 30) as Question[] };
  });