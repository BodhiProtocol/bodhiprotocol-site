import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type {
  InvisibleBusiness,
  InvisibleBusinessInsight,
  InvisibleBusinessNextEpisode,
} from "@/types/content";

const IB_DIR = path.join(process.cwd(), "content/invisible-businesses");

export interface InvisibleBusinessWithContent extends InvisibleBusiness {
  content: string;
}

interface InvisibleBusinessFrontmatter {
  title: string;
  tagline: string;
  episode: number;
  description: string;
  author: string;
  date: string;
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

function readEpisodeFile(filename: string): InvisibleBusinessWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(IB_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as InvisibleBusinessFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    tagline: frontmatter.tagline,
    episode: frontmatter.episode,
    description: frontmatter.description,
    author: frontmatter.author,
    date: frontmatter.date,
    coverImage: frontmatter.coverImage,
    featured: frontmatter.featured ?? false,
    draft: frontmatter.draft ?? false,
    bigIdea: frontmatter.bigIdea,
    flywheel: frontmatter.flywheel ?? [],
    insightsHeading: frontmatter.insightsHeading,
    insights: frontmatter.insights ?? [],
    reflection: frontmatter.reflection,
    nextEpisode: frontmatter.nextEpisode,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllInvisibleBusinesses(): InvisibleBusinessWithContent[] {
  if (!fs.existsSync(IB_DIR)) return [];
  return fs
    .readdirSync(IB_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readEpisodeFile)
    .filter((episode) => !episode.draft)
    .sort((a, b) => a.episode - b.episode);
}

export function getInvisibleBusinessSlugs(): string[] {
  if (!fs.existsSync(IB_DIR)) return [];
  return fs
    .readdirSync(IB_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getInvisibleBusinessBySlug(
  slug: string,
): InvisibleBusinessWithContent | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(IB_DIR, filename))) return undefined;
  const episode = readEpisodeFile(filename);
  return episode.draft ? undefined : episode;
}

export function getAdjacentInvisibleBusinesses(slug: string): {
  previous: InvisibleBusiness | null;
  next: InvisibleBusiness | null;
} {
  const episodes = getAllInvisibleBusinesses();
  const index = episodes.findIndex((episode) => episode.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? episodes[index - 1] : null,
    next: index < episodes.length - 1 ? episodes[index + 1] : null,
  };
}
