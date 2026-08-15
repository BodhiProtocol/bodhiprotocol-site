import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { Essay } from "@/types/content";
import { essaySeries, getSeriesForSlug } from "@/lib/series";
import type { EssaySeries } from "@/lib/series";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

export interface EssayWithContent extends Essay {
  content: string;
}

interface EssayFrontmatter {
  title: string;
  description: string;
  hook?: string;
  category: string;
  tags?: string[];
  author: string;
  date: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

function readEssayFile(filename: string): EssayWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(ESSAYS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as EssayFrontmatter;
  const membership = getSeriesForSlug(slug);

  return {
    slug,
    series: membership?.series.id,
    seriesOrder: membership?.order,
    title: frontmatter.title,
    description: frontmatter.description,
    hook: frontmatter.hook,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    author: frontmatter.author,
    date: frontmatter.date,
    coverImage: frontmatter.coverImage,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllEssays(): EssayWithContent[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readEssayFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEssaySlugs(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getEssayBySlug(slug: string): EssayWithContent | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(ESSAYS_DIR, filename))) return undefined;
  return readEssayFile(filename);
}

export function getAdjacentEssays(slug: string): {
  previous: Essay | null;
  next: Essay | null;
} {
  const essays = getAllEssays();
  const index = essays.findIndex((essay) => essay.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? essays[index - 1] : null,
    next: index < essays.length - 1 ? essays[index + 1] : null,
  };
}

/**
 * Position within a series plus its neighbours. `next` rolls over to the first
 * essay of `nextSeriesId` at the end of a series, so a reader is never dead-ended.
 */
export function getSeriesNav(slug: string) {
  const membership = getSeriesForSlug(slug);
  if (!membership) return null;

  const { series, order } = membership;
  const essayBySlug = new Map(getAllEssays().map((essay) => [essay.slug, essay]));
  const essays = series.slugs
    .map((candidate) => essayBySlug.get(candidate))
    .filter((essay): essay is EssayWithContent => Boolean(essay));

  const index = essays.findIndex((essay) => essay.slug === slug);
  if (index === -1) return null;

  let next: Essay | null = index < essays.length - 1 ? essays[index + 1] : null;
  let nextSeries: EssaySeries | null = null;

  if (!next && series.nextSeriesId) {
    const upcoming = essaySeries.find(
      (candidate) => candidate.id === series.nextSeriesId,
    );
    const firstOfNext = upcoming?.slugs
      .map((candidate) => essayBySlug.get(candidate))
      .find((essay): essay is EssayWithContent => Boolean(essay));

    if (upcoming && firstOfNext) {
      next = firstOfNext;
      nextSeries = upcoming;
    }
  }

  return {
    series,
    /** 1-based, matches what the reader sees as "Part N of M". */
    part: order,
    total: essays.length,
    previous: index > 0 ? essays[index - 1] : null,
    next,
    /** Set only when `next` crosses into a different series. */
    nextSeries,
  };
}

export function getRelatedEssays(essay: Essay, limit = 3): Essay[] {
  return getAllEssays()
    .filter((candidate) => candidate.slug !== essay.slug)
    .map((candidate) => ({
      essay: candidate,
      score:
        (candidate.category === essay.category ? 2 : 0) +
        candidate.tags.filter((tag) => essay.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ essay: related }) => related);
}
