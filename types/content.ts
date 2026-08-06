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
  /** Series id from lib/series.ts — absent when the essay stands alone. */
  series?: string;
  /** 1-based position within that series. */
  seriesOrder?: number;
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
  /** Which side of a two-path convergence diagram this node belongs on (e.g. Jobs' Intersection). */
  side?: "technology" | "humanities";
  /** Which concentric orbit path a node sits on (e.g. JRD Tata's Orbit diagram). Unused by every other diagram. */
  orbitRadius?: "inner" | "mid" | "outer";
  /** Marks a node for distinct emphasis (ring + emphasized aria-label) in diagrams that single one node out (e.g. JRD Tata's Orbit diagram highlighting Air India). Unused by every other diagram. */
  highlight?: boolean;
}

export interface GreatMindThinkingStep {
  title: string;
  description: string;
}

export interface GreatMindMentalModel {
  name: string;
  description: string;
  /** Optional bespoke icon (key into the shared Great Minds icon map). Falls back to a generic Brain icon when omitted. */
  icon?: string;
}

export interface GreatMindBigIdea {
  title: string;
  description: string;
  /** Optional bespoke icon (key into the shared Great Minds icon map). Falls back to a generic Lightbulb icon when omitted. */
  icon?: string;
}

export interface GreatMindTimelineEvent {
  year: string;
  event: string;
  /** Optional expanded detail, revealed via a native <details> disclosure. Entries without this render exactly as before. */
  detail?: string;
}

export interface GreatMindCentralThesisNode {
  label: string;
  icon: string;
}

export interface GreatMindCentralThesis {
  centerLabel: string;
  caption: string;
  nodes: GreatMindCentralThesisNode[];
}

export interface GreatMindEnduringInfluenceEntry {
  modelName: string;
  icon: string;
  ancient: string;
  modern: string;
  whyItMatters: string;
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

export interface GreatMindTurningPointSide {
  year: string;
  label: string;
  description: string;
}

export interface GreatMindTurningPoint {
  eyebrow: string;
  heading: string;
  before: GreatMindTurningPointSide;
  after: GreatMindTurningPointSide;
  insight: string;
}

export interface GreatMindConceptFacet {
  label: string;
  icon: string;
}

export interface GreatMindConceptIllustration {
  eyebrow: string;
  heading: string;
  principle: string;
  facets: GreatMindConceptFacet[];
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
  /** Optional closing takeaway line, rendered as a highlighted callout. Section renders exactly as before when omitted. */
  corePhilosophyTakeaway?: string;
  thinkingProcess: GreatMindThinkingStep[];
  thinkingProcessTakeaway?: string;
  mentalModels: GreatMindMentalModel[];
  mentalModelsTakeaway?: string;
  bigIdeas: GreatMindBigIdea[];
  timeline: GreatMindTimelineEvent[];
  timelineTakeaway?: string;
  books: GreatMindBook[];
  relatedMinds?: GreatMindRelatedEntry[];
  /** Optional "5 inputs converging on 1 idea" diagram, rendered right after the hero. Section is omitted entirely when absent. */
  centralThesis?: GreatMindCentralThesis;
  /** Optional section extending each mental model with an ancient/modern/why-it-matters angle. Omitted entirely when absent. */
  enduringInfluence?: GreatMindEnduringInfluenceEntry[];
  /** When true, renders Mental Models before Thinking Process instead of the default order. Defaults to false (existing order) for every mind that doesn't set it. */
  promoteMentalModels?: boolean;
  /** When true, renders Turning Point right after Core Philosophy instead of its default slot after Mental Models. Defaults to false (existing order) for every mind that doesn't set it. */
  promoteTurningPoint?: boolean;
  /** Optional short closing statement rendered after Books, before Related Minds. Omitted entirely when absent. */
  closingReflection?: string;
  /** Optional list of historiography caveats, rendered as a collapsible disclosure near Books. Omitted entirely when absent. */
  scholarshipNotes?: string[];
  /** Optional before/after comparison section, rendered after Thinking Process. Omitted entirely when absent. */
  turningPoint?: GreatMindTurningPoint;
  /** Optional principle + facet-icons illustration, rendered after Big Ideas. Omitted entirely when absent. */
  conceptIllustration?: GreatMindConceptIllustration;
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
