import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type {
  GreatMind,
  GreatMindBigIdea,
  GreatMindBook,
  GreatMindMentalModel,
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
  thinkingProcess: GreatMindThinkingStep[];
  mentalModels: GreatMindMentalModel[];
  bigIdeas: GreatMindBigIdea[];
  timeline: GreatMindTimelineEvent[];
  books: GreatMindBook[];
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
    thinkingProcess: frontmatter.thinkingProcess ?? [],
    mentalModels: frontmatter.mentalModels ?? [],
    bigIdeas: frontmatter.bigIdeas ?? [],
    timeline: frontmatter.timeline ?? [],
    books: frontmatter.books ?? [],
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
