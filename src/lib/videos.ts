export type VideoLesson = { id: string; title: string; channel: string };
export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  /** Optional YouTube playlist id; when set the player uses the playlist for reliability */
  playlistId?: string;
  videos: VideoLesson[];
};

/**
 * Trilhas de aprendizagem por matéria. Cada trilha tem 10 aulas em ordem.
 * Quando uma matéria tem `playlistId`, o player embute a playlist oficial do
 * canal para garantir disponibilidade dos vídeos.
 */
export const subjects: Subject[] = [
  {
    slug: "matematica",
    name: "Matemática",
    emoji: "🧮",
    color: "from-brand to-brand-dark",
    playlistId: "PLTPg64KdGgYgFpOFt2TETLdEuBB4fvxxf",
    videos: [
      { id: "lesson-mat-1", title: "Aula 1 — Conjuntos numéricos", channel: "Equaciona Matemática" },
      { id: "lesson-mat-2", title: "Aula 2 — Razão, proporção e porcentagem", channel: "Equaciona Matemática" },
      { id: "lesson-mat-3", title: "Aula 3 — Função do 1º grau", channel: "Equaciona Matemática" },
      { id: "lesson-mat-4", title: "Aula 4 — Função do 2º grau", channel: "Equaciona Matemática" },
      { id: "lesson-mat-5", title: "Aula 5 — Funções exponenciais e logarítmicas", channel: "Equaciona Matemática" },
      { id: "lesson-mat-6", title: "Aula 6 — Progressões (PA e PG)", channel: "Equaciona Matemática" },
      { id: "lesson-mat-7", title: "Aula 7 — Geometria plana", channel: "Equaciona Matemática" },
      { id: "lesson-mat-8", title: "Aula 8 — Geometria espacial", channel: "Equaciona Matemática" },
      { id: "lesson-mat-9", title: "Aula 9 — Trigonometria", channel: "Equaciona Matemática" },
      { id: "lesson-mat-10", title: "Aula 10 — Análise combinatória e probabilidade", channel: "Equaciona Matemática" },
    ],
  },
  {
    slug: "biologia",
    name: "Biologia",
    emoji: "🧬",
    color: "from-success to-brand-dark",
    playlistId: "PLrZynBnUz9zNlfPlCkfPHy4xX9LFhE1pH",
    videos: [
      { id: "lesson-bio-1", title: "Aula 1 — Citologia", channel: "Prof. Jubilut" },
      { id: "lesson-bio-2", title: "Aula 2 — Bioquímica celular", channel: "Prof. Jubilut" },
      { id: "lesson-bio-3", title: "Aula 3 — Genética", channel: "Prof. Jubilut" },
      { id: "lesson-bio-4", title: "Aula 4 — Evolução", channel: "Prof. Jubilut" },
      { id: "lesson-bio-5", title: "Aula 5 — Ecologia", channel: "Prof. Jubilut" },
      { id: "lesson-bio-6", title: "Aula 6 — Botânica", channel: "Prof. Jubilut" },
      { id: "lesson-bio-7", title: "Aula 7 — Zoologia", channel: "Prof. Jubilut" },
      { id: "lesson-bio-8", title: "Aula 8 — Fisiologia humana", channel: "Prof. Jubilut" },
      { id: "lesson-bio-9", title: "Aula 9 — Microbiologia e imunologia", channel: "Prof. Jubilut" },
      { id: "lesson-bio-10", title: "Aula 10 — Biomas brasileiros", channel: "Prof. Jubilut" },
    ],
  },
  {
    slug: "quimica",
    name: "Química",
    emoji: "⚗️",
    color: "from-brand to-success",
    playlistId: "PL8VRG3roBhDH0czfO7fbkZsKpkW2c0LHm",
    videos: [
      { id: "lesson-qui-1", title: "Aula 1 — Estrutura atômica", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-2", title: "Aula 2 — Tabela periódica", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-3", title: "Aula 3 — Ligações químicas", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-4", title: "Aula 4 — Funções inorgânicas", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-5", title: "Aula 5 — Estequiometria", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-6", title: "Aula 6 — Soluções", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-7", title: "Aula 7 — Termoquímica", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-8", title: "Aula 8 — Cinética e equilíbrio", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-9", title: "Aula 9 — Eletroquímica", channel: "Profa. Martha Reis" },
      { id: "lesson-qui-10", title: "Aula 10 — Química orgânica", channel: "Profa. Martha Reis" },
    ],
  },
  {
    slug: "fisica",
    name: "Física",
    emoji: "⚛️",
    color: "from-brand-dark to-brand",
    playlistId: "PLB7DA09148D14E0BC",
    videos: [
      { id: "lesson-fis-1", title: "Aula 1 — Cinemática", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-2", title: "Aula 2 — Dinâmica e leis de Newton", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-3", title: "Aula 3 — Trabalho e energia", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-4", title: "Aula 4 — Hidrostática", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-5", title: "Aula 5 — Termologia", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-6", title: "Aula 6 — Óptica", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-7", title: "Aula 7 — Ondulatória", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-8", title: "Aula 8 — Eletrostática", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-9", title: "Aula 9 — Eletrodinâmica", channel: "Prof. Marcelo Boaro" },
      { id: "lesson-fis-10", title: "Aula 10 — Eletromagnetismo", channel: "Prof. Marcelo Boaro" },
    ],
  },
  {
    slug: "geografia",
    name: "Geografia",
    emoji: "🌍",
    color: "from-success to-brand",
    playlistId: "PLn5IkU1ZhgiYJm2QzTjQ6m0xkkqLwIQ4f",
    videos: [
      { id: "lesson-geo-1", title: "Aula 1 — Cartografia", channel: "Parábola — Geografia" },
      { id: "lesson-geo-2", title: "Aula 2 — Geologia e relevo", channel: "Parábola — Geografia" },
      { id: "lesson-geo-3", title: "Aula 3 — Climatologia", channel: "Parábola — Geografia" },
      { id: "lesson-geo-4", title: "Aula 4 — Hidrografia", channel: "Parábola — Geografia" },
      { id: "lesson-geo-5", title: "Aula 5 — Biomas e vegetação", channel: "Parábola — Geografia" },
      { id: "lesson-geo-6", title: "Aula 6 — Geografia da população", channel: "Parábola — Geografia" },
      { id: "lesson-geo-7", title: "Aula 7 — Urbanização", channel: "Parábola — Geografia" },
      { id: "lesson-geo-8", title: "Aula 8 — Agricultura e indústria", channel: "Parábola — Geografia" },
      { id: "lesson-geo-9", title: "Aula 9 — Geopolítica e globalização", channel: "Parábola — Geografia" },
      { id: "lesson-geo-10", title: "Aula 10 — Questões ambientais", channel: "Parábola — Geografia" },
    ],
  },
  {
    slug: "historia",
    name: "História",
    emoji: "🏛️",
    color: "from-brand-dark to-success",
    playlistId: "PLn5IkU1ZhgiZ5h0qrZkF1k1cQp_yTQVUC",
    videos: [
      { id: "lesson-his-1", title: "Aula 1 — Antiguidade clássica", channel: "Parábola — História" },
      { id: "lesson-his-2", title: "Aula 2 — Idade Média", channel: "Parábola — História" },
      { id: "lesson-his-3", title: "Aula 3 — Idade Moderna e Iluminismo", channel: "Parábola — História" },
      { id: "lesson-his-4", title: "Aula 4 — Revolução Francesa", channel: "Parábola — História" },
      { id: "lesson-his-5", title: "Aula 5 — Brasil colônia", channel: "Parábola — História" },
      { id: "lesson-his-6", title: "Aula 6 — Independência e Império", channel: "Parábola — História" },
      { id: "lesson-his-7", title: "Aula 7 — República Velha e Era Vargas", channel: "Parábola — História" },
      { id: "lesson-his-8", title: "Aula 8 — Guerras Mundiais", channel: "Parábola — História" },
      { id: "lesson-his-9", title: "Aula 9 — Guerra Fria", channel: "Parábola — História" },
      { id: "lesson-his-10", title: "Aula 10 — Ditadura e redemocratização", channel: "Parábola — História" },
    ],
  },
  {
    slug: "filosofia",
    name: "Filosofia",
    emoji: "🧠",
    color: "from-brand to-brand-dark",
    videos: [
      { id: "lesson-fil-1", title: "Aula 1 — Introdução à filosofia", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-2", title: "Aula 2 — Pré-socráticos", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-3", title: "Aula 3 — Sócrates, Platão e Aristóteles", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-4", title: "Aula 4 — Filosofia medieval", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-5", title: "Aula 5 — Racionalismo e empirismo", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-6", title: "Aula 6 — Iluminismo e Kant", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-7", title: "Aula 7 — Hegel e Marx", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-8", title: "Aula 8 — Existencialismo", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-9", title: "Aula 9 — Escola de Frankfurt", channel: "Curso ENEM Gratuito" },
      { id: "lesson-fil-10", title: "Aula 10 — Ética e filosofia contemporânea", channel: "Curso ENEM Gratuito" },
    ],
  },
  {
    slug: "sociologia",
    name: "Sociologia",
    emoji: "👥",
    color: "from-success to-brand-dark",
    videos: [
      { id: "lesson-soc-1", title: "Aula 1 — O que é sociologia", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-2", title: "Aula 2 — Durkheim", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-3", title: "Aula 3 — Max Weber", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-4", title: "Aula 4 — Karl Marx", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-5", title: "Aula 5 — Cultura e indústria cultural", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-6", title: "Aula 6 — Trabalho e sociedade", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-7", title: "Aula 7 — Movimentos sociais", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-8", title: "Aula 8 — Cidadania e direitos humanos", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-9", title: "Aula 9 — Desigualdade social", channel: "Curso ENEM Gratuito" },
      { id: "lesson-soc-10", title: "Aula 10 — Sociologia no Brasil", channel: "Curso ENEM Gratuito" },
    ],
  },
  {
    slug: "ingles",
    name: "Inglês",
    emoji: "🇺🇸",
    color: "from-brand to-brand-dark",
    videos: [
      { id: "lesson-ing-1", title: "Aula 1 — Reading strategies", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-2", title: "Aula 2 — Cognatos e falsos cognatos", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-3", title: "Aula 3 — Verb to be", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-4", title: "Aula 4 — Tempos verbais", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-5", title: "Aula 5 — Modal verbs", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-6", title: "Aula 6 — Phrasal verbs", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-7", title: "Aula 7 — Conditionals", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-8", title: "Aula 8 — Voz passiva", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-9", title: "Aula 9 — Vocabulário temático", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ing-10", title: "Aula 10 — Interpretação ENEM", channel: "Curso ENEM Gratuito" },
    ],
  },
  {
    slug: "artes",
    name: "Artes",
    emoji: "🎨",
    color: "from-brand to-success",
    videos: [
      { id: "lesson-art-1", title: "Aula 1 — Introdução à história da arte", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-2", title: "Aula 2 — Arte na antiguidade", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-3", title: "Aula 3 — Renascimento", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-4", title: "Aula 4 — Barroco", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-5", title: "Aula 5 — Impressionismo", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-6", title: "Aula 6 — Vanguardas europeias", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-7", title: "Aula 7 — Semana de Arte Moderna de 1922", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-8", title: "Aula 8 — Modernismo brasileiro", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-9", title: "Aula 9 — Arte contemporânea", channel: "Curso ENEM Gratuito" },
      { id: "lesson-art-10", title: "Aula 10 — Linguagens artísticas", channel: "Curso ENEM Gratuito" },
    ],
  },
  {
    slug: "educacao-fisica",
    name: "Educação Física",
    emoji: "🏃",
    color: "from-success to-brand",
    videos: [
      { id: "lesson-ef-1", title: "Aula 1 — História da educação física", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-2", title: "Aula 2 — Corpo, saúde e qualidade de vida", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-3", title: "Aula 3 — Esportes coletivos", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-4", title: "Aula 4 — Esportes individuais", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-5", title: "Aula 5 — Jogos e brincadeiras", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-6", title: "Aula 6 — Lutas e danças", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-7", title: "Aula 7 — Ginástica", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-8", title: "Aula 8 — Fisiologia do exercício", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-9", title: "Aula 9 — Esporte e sociedade", channel: "Curso ENEM Gratuito" },
      { id: "lesson-ef-10", title: "Aula 10 — Olimpíadas e doping", channel: "Curso ENEM Gratuito" },
    ],
  },
];

export function findSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export function totalLessons(): number {
  return subjects.reduce((acc, s) => acc + s.videos.length, 0);
}