export type VideoLesson = { id: string; title: string; channel: string };
export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  videos: VideoLesson[];
};

export const subjects: Subject[] = [
  {
    slug: "matematica",
    name: "Matemática",
    emoji: "🧮",
    color: "from-brand to-brand-dark",
    videos: [
      { id: "oRDvHIz_zDc", title: "Função do 1º grau", channel: "Matemática Rio" },
      { id: "0RkE0YzPSAU", title: "Equação do 2º grau (Bhaskara)", channel: "Matemática Rio" },
      { id: "tAtbT3CIpFc", title: "Razão e proporção", channel: "Equaciona" },
      { id: "Y6JsEja15Hk", title: "Trigonometria no triângulo retângulo", channel: "Matemática Rio" },
      { id: "8mAITcNt710", title: "Logaritmos", channel: "Equaciona" },
      { id: "Nbu7enVkrLg", title: "Progressão Aritmética (PA)", channel: "Matemática Rio" },
      { id: "EUyTRiP2hpQ", title: "Progressão Geométrica (PG)", channel: "Matemática Rio" },
      { id: "Cm9NRP9OmFE", title: "Geometria plana — áreas", channel: "Matemática Rio" },
      { id: "Q1L7n4Q6Z0Y", title: "Funções exponenciais", channel: "Equaciona" },
      { id: "GltlPlnNJKw", title: "Análise combinatória", channel: "Matemática Rio" },
    ],
  },
  {
    slug: "portugues",
    name: "Português",
    emoji: "📖",
    color: "from-success to-brand",
    videos: [
      { id: "bL2yvkpEhUg", title: "Interpretação de texto", channel: "Português com Letícia" },
      { id: "JZBp5ROKfHc", title: "Crase descomplicada", channel: "Português com Letícia" },
      { id: "qNQTaq3xSjY", title: "Concordância verbal", channel: "Curso em Vídeo" },
      { id: "MWshfMcCG8Y", title: "Figuras de linguagem", channel: "Português com Letícia" },
      { id: "Eu8E_Q1bC2c", title: "Pronomes", channel: "Português com Letícia" },
      { id: "VWi5jKbdyaA", title: "Acentuação gráfica", channel: "Português com Letícia" },
      { id: "5xVbPK1xQGY", title: "Orações subordinadas", channel: "Português com Letícia" },
      { id: "8K4y8Mr9rwM", title: "Redação ENEM nota 1000", channel: "Curso Enem Gratuito" },
      { id: "AbPxqx5sXkY", title: "Coesão e coerência", channel: "Português com Letícia" },
      { id: "Z8m6KvLPi6Q", title: "Gêneros textuais", channel: "Português com Letícia" },
    ],
  },
  {
    slug: "biologia",
    name: "Biologia",
    emoji: "🧬",
    color: "from-success to-brand-dark",
    videos: [
      { id: "fkSCLDAYbu0", title: "Citologia — a célula", channel: "Biologia Total" },
      { id: "FvPL5XbXQbQ", title: "Genética mendeliana", channel: "Biologia Total" },
      { id: "qK0E2pH0nC0", title: "Evolução", channel: "Biologia Total" },
      { id: "Y4G7sFL6sJk", title: "Ecologia — cadeias alimentares", channel: "Biologia Total" },
      { id: "yqcLh5J2YqI", title: "Sistema imunológico", channel: "Biologia Total" },
      { id: "0c7-qP3y8gE", title: "Fotossíntese", channel: "Biologia Total" },
      { id: "DJ55B58i_Q4", title: "Reino animal — vertebrados", channel: "Biologia Total" },
      { id: "9j4l5bxk1dE", title: "Sistema nervoso", channel: "Biologia Total" },
      { id: "u8a3F8eHFkE", title: "Reprodução humana", channel: "Biologia Total" },
      { id: "VxQ5o4j8b2Y", title: "Biomas brasileiros", channel: "Biologia Total" },
    ],
  },
  {
    slug: "fisica",
    name: "Física",
    emoji: "⚛️",
    color: "from-brand-dark to-brand",
    videos: [
      { id: "ZM8ECpBuQYE", title: "Cinemática — MRU e MRUV", channel: "Física Total" },
      { id: "k3y3vQ2HtCw", title: "Leis de Newton", channel: "Física Total" },
      { id: "JpQ8s7ZQ7zE", title: "Energia mecânica", channel: "Física Total" },
      { id: "Zr6e1H6_Yos", title: "Hidrostática", channel: "Física Total" },
      { id: "kgWY8WJsLEk", title: "Termodinâmica", channel: "Física Total" },
      { id: "9Gx3qY8H7zI", title: "Óptica geométrica", channel: "Física Total" },
      { id: "WgY-h0bP3jw", title: "Ondas", channel: "Física Total" },
      { id: "rXxQyP9R6tM", title: "Eletrostática", channel: "Física Total" },
      { id: "VOoYn5lkE_E", title: "Circuitos elétricos", channel: "Física Total" },
      { id: "5jWQ4f9V3pE", title: "Eletromagnetismo", channel: "Física Total" },
    ],
  },
  {
    slug: "quimica",
    name: "Química",
    emoji: "⚗️",
    color: "from-brand to-success",
    videos: [
      { id: "G4LMnVMD6cM", title: "Tabela periódica", channel: "Química em Ação" },
      { id: "F8j5wlGq7lQ", title: "Ligações químicas", channel: "Química em Ação" },
      { id: "PB4r3z9JaQk", title: "Funções inorgânicas", channel: "Química em Ação" },
      { id: "i8yY9PvFTsg", title: "Estequiometria", channel: "Química em Ação" },
      { id: "yX0Mh5z3GHU", title: "Soluções e concentração", channel: "Química em Ação" },
      { id: "Q3qD9rL0qK4", title: "Termoquímica", channel: "Química em Ação" },
      { id: "fEoCSXAi-3o", title: "Cinética química", channel: "Química em Ação" },
      { id: "GZcvL5W4q9I", title: "Equilíbrio químico", channel: "Química em Ação" },
      { id: "v1c3yYwM-xY", title: "Química orgânica — introdução", channel: "Química em Ação" },
      { id: "Yc5n6Vq7H6c", title: "Eletroquímica", channel: "Química em Ação" },
    ],
  },
  {
    slug: "historia",
    name: "História",
    emoji: "🏛️",
    color: "from-brand-dark to-success",
    videos: [
      { id: "0c8m7QqK6vU", title: "Idade Média", channel: "Débora Aladim" },
      { id: "B3Hk5xY4OmI", title: "Iluminismo", channel: "Débora Aladim" },
      { id: "vk2tQUq8mEo", title: "Revolução Francesa", channel: "Débora Aladim" },
      { id: "9qK6Y5x3R6Q", title: "Brasil Colônia", channel: "Débora Aladim" },
      { id: "X6Lh1iQ9oWM", title: "Independência do Brasil", channel: "Débora Aladim" },
      { id: "Aqj9N9b6yX0", title: "República Velha", channel: "Débora Aladim" },
      { id: "k7QnzMv9pXE", title: "Era Vargas", channel: "Débora Aladim" },
      { id: "TVuYpBkW4rE", title: "1ª Guerra Mundial", channel: "Débora Aladim" },
      { id: "rJsTcsCK1Tk", title: "2ª Guerra Mundial", channel: "Débora Aladim" },
      { id: "tk6JS_aF3UA", title: "Ditadura Militar", channel: "Débora Aladim" },
    ],
  },
  {
    slug: "geografia",
    name: "Geografia",
    emoji: "🌍",
    color: "from-success to-brand",
    videos: [
      { id: "M4r4q4N5kVM", title: "Globalização", channel: "Geobrasil Prof. Marcelo" },
      { id: "x3kQ7yX2qP4", title: "Cartografia", channel: "Geobrasil Prof. Marcelo" },
      { id: "TX2y7zJ8aCk", title: "Climas do Brasil", channel: "Geobrasil Prof. Marcelo" },
      { id: "JqY8K5fX9pE", title: "Biomas do Brasil", channel: "Geobrasil Prof. Marcelo" },
      { id: "h6mFvKQq3jE", title: "Urbanização brasileira", channel: "Geobrasil Prof. Marcelo" },
      { id: "z3J5kQpY9XE", title: "Geopolítica mundial", channel: "Geobrasil Prof. Marcelo" },
      { id: "Z6vF7tJ8sLA", title: "Demografia", channel: "Geobrasil Prof. Marcelo" },
      { id: "kT7yU8qN6rE", title: "Recursos hídricos", channel: "Geobrasil Prof. Marcelo" },
      { id: "wXjK9z3Yq8A", title: "Agricultura no Brasil", channel: "Geobrasil Prof. Marcelo" },
      { id: "F8nB3yQ7pCM", title: "Indústria e energia", channel: "Geobrasil Prof. Marcelo" },
    ],
  },
  {
    slug: "ingles",
    name: "Inglês",
    emoji: "🇺🇸",
    color: "from-brand to-brand-dark",
    videos: [
      { id: "juCXgcUyrlI", title: "Verb to be", channel: "Mairo Vergara" },
      { id: "WyaB3HRPqHk", title: "Simple Present", channel: "Mairo Vergara" },
      { id: "v4HK4Z2VlcE", title: "Simple Past", channel: "Mairo Vergara" },
      { id: "8gjN0Z6QqEY", title: "Present Continuous", channel: "Mairo Vergara" },
      { id: "1B7iY5j5jvE", title: "Present Perfect", channel: "Mairo Vergara" },
      { id: "9k5MXl0J9JU", title: "Modal verbs", channel: "Mairo Vergara" },
      { id: "fU7Gv9b6lXo", title: "Phrasal verbs essenciais", channel: "Mairo Vergara" },
      { id: "tQk0d9X8N1c", title: "Reading comprehension", channel: "Mairo Vergara" },
      { id: "Yt5gHj9Y3Zo", title: "Vocabulário ENEM", channel: "Mairo Vergara" },
      { id: "0qFq5y9Y8Nc", title: "Conditionals", channel: "Mairo Vergara" },
    ],
  },
];

export function findSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}