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

export interface GreatMindWheelNode {
  label: string;
  icon: string;
  description: string;
  /** Marks a node as a dead end in the diagram (e.g. a path selection removed) rather than part of the main sequence. */
  pruned?: boolean;
  /** Optional per-node quote that replaces the hero's default quote while this node is active. */
  quote?: string;
  /** Ordered labels of other nodes this one's thinking flows into, for cross-connection pulse animations. */
  relatedNodes?: string[];
}

export interface GreatMindThinkingStep {
  title: string;
  description: string;
}

export interface GreatMindMentalModel {
  name: string;
  description: string;
}

export interface GreatMindBigIdea {
  title: string;
  description: string;
}

export interface GreatMindTimelineEvent {
  year: string;
  event: string;
}

export interface GreatMindBook {
  title: string;
  author: string;
  why: string;
}

export interface GreatMindRelatedEntry {
  name: string;
  /** Omit if that figure doesn't have a page yet — renders as a "coming soon" tile instead of a link. */
  slug?: string;
}

export interface GreatMind {
  slug: string;
  name: string;
  positioning: string;
  metaphor: string;
  quote: string;
  secondaryQuote?: string;
  lifespan: string;
  era: string;
  roles: string[];
  description: string;
  date: string;
  draft?: boolean;
  wheel: GreatMindWheelNode[];
  corePhilosophy: string;
  thinkingProcess: GreatMindThinkingStep[];
  mentalModels: GreatMindMentalModel[];
  bigIdeas: GreatMindBigIdea[];
  timeline: GreatMindTimelineEvent[];
  books: GreatMindBook[];
  relatedMinds?: GreatMindRelatedEntry[];
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
