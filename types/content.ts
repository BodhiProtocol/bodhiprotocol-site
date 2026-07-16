export interface Essay {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: string;
  coverImage?: string;
}

export interface Blueprint {
  slug: string;
  title: string;
  summary: string;
  module: string;
  season: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: string;
  heroImage?: string;
  pdfUrl?: string;
}

export type ResourceKind = "book" | "paper" | "course" | "essay" | "reference";

export interface Resource {
  title: string;
  author: string;
  year?: string;
  kind: ResourceKind;
  category: string;
  url: string;
  /** Why this is worth your time — the editorial value of the library. */
  why: string;
  free: boolean;
}

export interface InvisibleBusinessInsight {
  icon: string;
  text: string;
}

export interface InvisibleBusinessNextEpisode {
  title: string;
  slug?: string;
  comingSoon?: boolean;
}

export interface InvisibleBusiness {
  slug: string;
  title: string;
  tagline: string;
  episode: number;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  bigIdea: string;
  flywheel: string[];
  insightsHeading: string;
  insights: InvisibleBusinessInsight[];
  reflection: string;
  nextEpisode?: InvisibleBusinessNextEpisode;
}

export type LabStatus = "live" | "in-progress" | "planned";
export type LabDifficulty = "beginner" | "intermediate" | "advanced";

export interface Lab {
  slug: string;
  title: string;
  description: string;
  technology: string[];
  status: LabStatus;
  difficulty: LabDifficulty;
  category: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  roadmap?: string[];
}
