export interface Essay {
  slug: string;
  title: string;
  description: string;
  /** Short editorial one-liner for the concept map. Falls back to `description`. */
  hook?: string;
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
  /** Overrides the default `<title>`/OG/Twitter title for this essay's page. */
  seoTitle?: string;
  /** Overrides the default meta/OG/Twitter description for this essay's page. */
  seoDescription?: string;
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
  /** Year this node's outcome actually arrived (e.g. Jamsetji Tata's Roots diagram, positioning each institution along a timeline). Unused by every other diagram. */
  year?: string;
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
  /** Overrides the default `<title>`/OG/Twitter title for this mind's page. */
  seoTitle?: string;
  /** Overrides the default meta/OG/Twitter description for this mind's page. */
  seoDescription?: string;
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

/** A small labeled flow of steps, e.g. ["Comment thread", "Decision made", "Update requirement"]. */
export interface PlaybookVisual {
  steps: string[];
}

/** Two related-but-distinct concepts shown neutrally side by side (not a right/wrong comparison). */
export interface PlaybookComparison {
  leftLabel: string;
  left: string;
  rightLabel: string;
  right: string;
}

export interface PlaybookTemplate {
  label: string;
  value: string;
}

export interface PlaybookHack {
  number: number;
  title: string;
  /** One-line payoff, always visible on the collapsed card. */
  insight: string;
  /** Expanded explanation, shown when the card opens. */
  explanation?: string;
  visual?: PlaybookVisual;
  /** A before-state (or states) contrasted with `after`. */
  before?: string | string[];
  /** A single after-state, or an ordered list of steps replacing the before-state. */
  after?: string | string[];
  /** Overrides the before/after block's default "The shift" caption. Pass "" to omit it when the before/after is self-explanatory. */
  shiftLabel?: string;
  /** Two distinct-but-related concepts shown neutrally, e.g. business rule vs. acceptance criterion. */
  compare?: PlaybookComparison;
  /** A plain, non-sequential bullet list (e.g. dashboard widgets). */
  list?: string[];
  /** A checkbox-style readiness list. */
  checklist?: string[];
  whyItHelps: string;
  whenToUse?: string;
  /** Copyable snippet rendered in a CopyTemplate block. */
  template?: string;
  /** Overrides CopyTemplate's default "Copy template" button label. */
  templateLabel?: string;
  /** Multiple named copyable snippets (e.g. several saved JQL filters), each with its own copy button. */
  templates?: PlaybookTemplate[];
  proTip?: string;
  /** Jump link to another section on the same page (e.g. pointing at the closing template instead of repeating it). */
  anchorLink?: { label: string; href: string };
}

export interface PlaybookToolkitFile {
  /** Selects which lucide icon represents this file in ToolkitCard's secondary link row. */
  icon: "checklist" | "template" | "examples";
  label: string;
  href: string;
  filename: string;
}

/** A downloadable bundle (PDF checklist, editable template, worked examples, all zipped) offered via the generic ToolkitCard in the closing section. */
export interface PlaybookToolkit {
  heading: string;
  /** Shown only in the full (non-compact) card. */
  tagline: string;
  description: string;
  /** Shown only in the compact reminder card. */
  compactDescription: string;
  zipHref: string;
  zipFilename: string;
  files: PlaybookToolkitFile[];
  /** Prefix for analytics event names, e.g. "front_to_back_trace". Combined with "_toolkit_downloaded" / "_checklist_downloaded" etc. */
  analyticsPrefix: string;
}

export interface Playbook {
  slug: string;
  title: string;
  description: string;
  /** Longer one-sentence summary used on the landing page's featured card and as the SEO description fallback. Falls back to the first `intro` paragraph when omitted. */
  summary?: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: string;
  /** Short framing paragraphs shown under the hero, before the first hack. */
  intro?: string[];
  /** Who this guide is written for, e.g. ["Business Analysts", "QA professionals"]. */
  audience?: string[];
  /** Highlighted on the /ba-playbooks landing page. At most one guide should set this. */
  featured?: boolean;
  hacks: PlaybookHack[];
  /** Raw prose driving reading-time calculation for playbooks whose body is a bespoke narrative component (not rendered from `hacks`) rather than structured card data. Omitted for standard card-based playbooks. */
  bodyText?: string;
  /** Word shown on each card's numbered badge (e.g. "Hack", "Move", "Step"). Defaults to "Hack". */
  itemLabel?: string;
  /** Two-line closing statement heading, e.g. ["You don't need more Jira.", "You need clearer Jira."]. */
  closingHeading?: string[];
  closingBody?: string;
  /** Template text offered as a quick "Copy the template" action in the closing section. */
  closingTemplate?: string;
  /** Feature name shown above the closing template preview, e.g. "BA Jira Story Template". Falls back to "Reusable template" when omitted. */
  closingTemplateName?: string;
  /** Roadmap topics (not live pages) shown as inert "Coming soon" cards under Related BA Playbooks. */
  relatedTopics?: string[];
  /** Hand-picked slugs of genuinely related live playbooks, in order. Overrides the automatic category/tag scoring in getRelatedPlaybooks when present. */
  relatedPlaybookSlugs?: string[];
  /** Overrides the default `<title>` for this guide's page. */
  seoTitle?: string;
  /** Overrides the default meta/OG description for this guide's page. */
  seoDescription?: string;
  /** Free downloadable PDF/zip bundle, rendered via the generic ToolkitCard in the closing section (hacks-driven playbooks only — bespoke narrative bodies render ToolkitCard directly instead). */
  toolkit?: PlaybookToolkit;
  /** Free downloadable single-file resource (e.g. one printable PDF) rendered via DownloadCard next to the closing template — for playbooks with one deliverable rather than a full toolkit bundle. Ignored when `toolkit` is also set. */
  download?: {
    icon: "checklist" | "template" | "examples";
    title: string;
    description: string;
    href: string;
    filename: string;
    meta: string;
    cta: string;
    analyticsEvent: string;
  };
  /** Full-width infographic shown between the intro and the numbered hacks (hacks-driven playbooks only — bespoke narrative bodies embed their own <figure> inline instead). */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
}
