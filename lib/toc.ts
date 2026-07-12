import GithubSlugger from "github-slugger";

export interface TocEntry {
  depth: 2 | 3;
  text: string;
  slug: string;
}

export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];

  for (const match of markdown.matchAll(headingPattern)) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    entries.push({ depth, text, slug: slugger.slug(text) });
  }

  return entries;
}
