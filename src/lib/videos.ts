export type VideoLesson = {
  /** YouTube video ID — used as both the embed source and the completion key. */
  id: string;
  title: string;
  channel: string;
};
export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  videos: VideoLesson[];
};

export function thumbnailUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
export function youtubeUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildLessons(channel: string, ids: string[]): VideoLesson[] {
  return ids.map((id, i) => ({ id, title: `Aula ${i + 1}`, channel }));
}

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
    videos: buildLessons("YouTube", [
      "az6OYFS7AUA","oSzh7TjIsjs","BetgRvNQEC0","GpnfZHB3Rpw","qzl93K6_-LY",
      "nBYcEu3P6EQ","qYww45PyTEs","74jrzl0yPlI","_GmG-b3fpb0","Jg05vwP-pkY",
    ]),
  },
  {
    slug: "portugues",
    name: "Português",
    emoji: "📘",
    color: "from-brand-dark to-brand",
    videos: buildLessons("YouTube", [
      "zd8_NUqoZH4","k0sM0Ovooo8","yBjKjnHK-pA","R7_Tv2Cr8HE","PacZEXen_YY",
      "vmKggNWVvtU","L5BoYEdd6Hg","UaYz46MpI3M","qgR5kOpyIQc","Gjv44CgF68Y",
    ]),
  },
  {
    slug: "biologia",
    name: "Biologia",
    emoji: "🧬",
    color: "from-success to-brand-dark",
    videos: buildLessons("YouTube", [
      "WLzehSVCTvw","3Yvgb_3-GHU","sP5vQOw_-4w","YLSUkfB2dMA","LkEtsEa5LyM",
      "9hyGXTUk7AU","ZbehvahF6Jc","GGx51r5QnIQ","8oFmkWqnJeQ","Srh-_PwNumE",
    ]),
  },
  {
    slug: "quimica",
    name: "Química",
    emoji: "⚗️",
    color: "from-brand to-success",
    videos: buildLessons("YouTube", [
      "AKDSnERremQ","6yH_-whKmqs","wvAj_aUecdg","agY-5gY6xhE","tZJzKz5Z8kw",
      "4pS9iZXl60I","n9oSXloGknQ","K6Y-d23IZb4","0BRc38C5bUY","XvoHJMu1e_s",
    ]),
  },
  {
    slug: "fisica",
    name: "Física",
    emoji: "⚛️",
    color: "from-brand-dark to-brand",
    videos: buildLessons("YouTube", [
      "FtLtDqE-VX0","1szfg-VovbM","VnqhH9S9vIc","oVb3WV1CLSE","m21X-MhCyrE",
      "6r-foeydR2c","HvmshToybB4","bzpL3YQPD5A","JfCmVT7hs5Q","IWQf_uEgK7s",
    ]),
  },
  {
    slug: "geografia",
    name: "Geografia",
    emoji: "🌍",
    color: "from-success to-brand",
    videos: buildLessons("YouTube", [
      "ExJO6rncnwg","uw3ltpWkwT4","Q58ro7_jnVU","ZxV26l5pyR4","BWOSbD1e1oQ",
      "7mpuNLc_gWU","5cy1lM_W3W0","PStB6p4oMSc","Y3t9QhGKbwA","BhYcZJixbjs",
    ]),
  },
  {
    slug: "historia",
    name: "História",
    emoji: "🏛️",
    color: "from-brand-dark to-success",
    videos: buildLessons("YouTube", [
      "ZdIrgqd7keI","wvkslsfuY4c","L-A8u46YUss","FJ7FwQsDWvk","Z7S7N6EDp2g",
      "gfZztGey4ig","Fr1zTZT3a94","vJaZEH6fRWc","_cN9Iomj8tw","d7BeCopGqP4",
    ]),
  },
  {
    slug: "filosofia",
    name: "Filosofia",
    emoji: "🧠",
    color: "from-brand to-brand-dark",
    videos: buildLessons("YouTube", [
      "AawLM81gIHo","0UN_HbOTTcI","eLa685J5uA8","PaYW7pIw0Fk","2bSbaeEnMDw",
      "VjMCJLK_dts","_xaj8QSJZ0E","3dkO1eatEmY","pNPqQPrcSIo","J3P9V4vKJ8A",
    ]),
  },
  {
    slug: "sociologia",
    name: "Sociologia",
    emoji: "👥",
    color: "from-success to-brand-dark",
    videos: buildLessons("YouTube", [
      "lk0Jc7w6TRE","bLH15zBoP_E","Z1Y775NylVc","pfHPiXjTmJY","m6qgmfzrpbE",
      "6u6Ye7n_I1M","ecmXjooN3RE","Grn2gXVGMEo","fzItVzLSjyw","7rMS9ETGEoE",
    ]),
  },
  {
    slug: "ingles",
    name: "Inglês",
    emoji: "🇺🇸",
    color: "from-brand to-brand-dark",
    videos: buildLessons("YouTube", [
      "X5TdMsc4YCg","h5HHhm-n5LQ","PlhaxL5GpZo","nZPLrqsH570","0FF0y6SQsw4",
      "SknYjWljXn0","S0-v8FUEVlM","TuNUCGYFohw","j26_A7crDrA","E_7BpyZ_jIg",
    ]),
  },
  {
    slug: "artes",
    name: "Artes",
    emoji: "🎨",
    color: "from-brand to-success",
    videos: buildLessons("YouTube", [
      "vckXhGsFMus","5AcjMcivyhs","j7oQhsyZPHY","ITPXzQNzNw0","2lF26xgUJvI",
      "bFPLhlxSzXs","-n4TsZwTwew","mkZAqQHs9t4","n_shZeXciGQ","5AcjMcivyhs",
    ]),
  },
  {
    slug: "educacao-fisica",
    name: "Educação Física",
    emoji: "🏃",
    color: "from-success to-brand",
    videos: buildLessons("YouTube", [
      "MZ9vaoQfrZ0","9MhYxGc-Ybo","sdABBXl0x5Y","tialxlIhkRA","N8n6I63imUM",
      "ac__CKeO0_A","-ULf1Isyy9M","K-BSqxmrwgU","ENOf3zkdDI4","yYPnPbUbVbc",
    ]),
  },
];

export function findSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export function totalLessons(): number {
  return subjects.reduce((acc, s) => acc + s.videos.length, 0);
}