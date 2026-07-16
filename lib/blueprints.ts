import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { Blueprint } from "@/types/content";

const BLUEPRINTS_DIR = path.join(process.cwd(), "content/blueprints");

export interface BlueprintWithContent extends Blueprint {
  content: string;
}

interface BlueprintFrontmatter {
  title: string;
  summary: string;
  module: string;
  season: string;
  tags?: string[];
  author: string;
  date: string;
  heroImage?: string;
  pdfUrl?: string;
}

function readBlueprintFile(filename: string): BlueprintWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLUEPRINTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlueprintFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    summary: frontmatter.summary,
    module: frontmatter.module,
    season: frontmatter.season,
    tags: frontmatter.tags ?? [],
    author: frontmatter.author,
    date: frontmatter.date,
    heroImage: frontmatter.heroImage,
    pdfUrl: frontmatter.pdfUrl,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllBlueprints(): BlueprintWithContent[] {
  if (!fs.existsSync(BLUEPRINTS_DIR)) return [];
  return fs
    .readdirSync(BLUEPRINTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readBlueprintFile)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getBlueprintBySlug(slug: string): BlueprintWithContent | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(BLUEPRINTS_DIR, filename))) return undefined;
  return readBlueprintFile(filename);
}

export function getAdjacentBlueprints(slug: string): {
  previous: Blueprint | null;
  next: Blueprint | null;
} {
  const blueprints = getAllBlueprints();
  const index = blueprints.findIndex((blueprint) => blueprint.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? blueprints[index - 1] : null,
    next: index < blueprints.length - 1 ? blueprints[index + 1] : null,
  };
}

export function getRelatedBlueprints(blueprint: Blueprint, limit = 3): Blueprint[] {
  return getAllBlueprints()
    .filter((candidate) => candidate.slug !== blueprint.slug)
    .map((candidate) => ({
      blueprint: candidate,
      score:
        (candidate.module === blueprint.module ? 2 : 0) +
        candidate.tags.filter((tag) => blueprint.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ blueprint: related }) => related);
}
