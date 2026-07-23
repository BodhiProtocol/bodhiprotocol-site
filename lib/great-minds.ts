import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type {
  GreatMind,
  GreatMindBigIdea,
  GreatMindBook,
  GreatMindCentralThesis,
  GreatMindEnduringInfluenceEntry,
  GreatMindMentalModel,
  GreatMindRelatedEntry,
  GreatMindThinkingStep,
  GreatMindTimelineEvent,
  GreatMindWheelNode,
} from "@/types/content";

const GREAT_MINDS_DIR = path.join(process.cwd(), "content/great-minds");

export interface GreatMindWithContent extends GreatMind {
  content: string;
  readingTime: string;
}

interface GreatMindFrontmatter {
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
  centralThesis?: GreatMindCentralThesis;
  enduringInfluence?: GreatMindEnduringInfluenceEntry[];
  promoteMentalModels?: boolean;
  closingReflection?: string;
  scholarshipNotes?: string[];
}

function readGreatMindFile(filename: string): GreatMindWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(GREAT_MINDS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as GreatMindFrontmatter;

  return {
    slug,
    name: frontmatter.name,
    positioning: frontmatter.positioning,
    metaphor: frontmatter.metaphor,
    quote: frontmatter.quote,
    secondaryQuote: frontmatter.secondaryQuote,
    lifespan: frontmatter.lifespan,
    era: frontmatter.era,
    roles: frontmatter.roles ?? [],
    description: frontmatter.description,
    date: frontmatter.date,
    draft: frontmatter.draft ?? false,
    wheel: frontmatter.wheel ?? [],
    corePhilosophy: frontmatter.corePhilosophy,
    corePhilosophyTakeaway: frontmatter.corePhilosophyTakeaway,
    thinkingProcess: frontmatter.thinkingProcess ?? [],
    thinkingProcessTakeaway: frontmatter.thinkingProcessTakeaway,
    mentalModels: frontmatter.mentalModels ?? [],
    mentalModelsTakeaway: frontmatter.mentalModelsTakeaway,
    bigIdeas: frontmatter.bigIdeas ?? [],
    timeline: frontmatter.timeline ?? [],
    timelineTakeaway: frontmatter.timelineTakeaway,
    books: frontmatter.books ?? [],
    relatedMinds: frontmatter.relatedMinds ?? [],
    centralThesis: frontmatter.centralThesis,
    enduringInfluence: frontmatter.enduringInfluence ?? [],
    promoteMentalModels: frontmatter.promoteMentalModels ?? false,
    closingReflection: frontmatter.closingReflection,
    scholarshipNotes: frontmatter.scholarshipNotes ?? [],
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllGreatMinds(): GreatMindWithContent[] {
  if (!fs.existsSync(GREAT_MINDS_DIR)) return [];
  return fs
    .readdirSync(GREAT_MINDS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readGreatMindFile)
    .filter((mind) => !mind.draft)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getGreatMindSlugs(): string[] {
  if (!fs.existsSync(GREAT_MINDS_DIR)) return [];
  return fs
    .readdirSync(GREAT_MINDS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGreatMindBySlug(slug: string): GreatMindWithContent | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(GREAT_MINDS_DIR, filename))) return undefined;
  const mind = readGreatMindFile(filename);
  return mind.draft ? undefined : mind;
}
