import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
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
  questions: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctIndex: z.number().int().min(0).max(3),
        explanation: z.string(),
      }),
    )
    .length(30),
});

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

    const prompt = `Você é um professor brasileiro experiente em ensino médio e preparação para o ENEM.
Gere EXATAMENTE 30 questões de múltipla escolha sobre a matéria "${subject.name}" para alunos do ensino médio brasileiro, no estilo ENEM.

Regras:
- Cada questão deve ter 4 alternativas (A, B, C, D), apenas 1 correta.
- Varie o nível de dificuldade (fácil, médio, difícil) e os tópicos.
- Use português do Brasil claro e objetivo.
- Inclua uma explicação curta para a resposta correta.
- Não numere as questões dentro do texto.
- Retorne no formato estruturado solicitado.`;

    const { experimental_output } = await generateText({
      model,
      prompt,
      experimental_output: Output.object({ schema: QuestionSchema }),
    });

    return experimental_output as { questions: Question[] };
  });