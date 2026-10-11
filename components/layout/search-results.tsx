"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { loadSearchIndex } from "@/components/layout/load-search-index";
import { Link } from "@/components/shared/app-link";
import { Tag } from "@/components/ui/tag";
import { H3, Muted } from "@/components/ui/typography";
import type { SearchItem } from "@/lib/search-index";

// Runs in the browser (reads ?q= client-side) so /search can be a plain
// pre-built page -- the site is also built as a fully static export.
function scoreSearchResult(item: SearchItem, query: string) {
  const normalizedQuery = query.toLowerCase();
  const terms = normalizedQuery
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);
  const haystacks = [
    item.title,
    item.category,
    item.description,
    item.tags.join(" "),
    item.content.slice(0, 1200),
  ].map((value) => value.toLowerCase());

  let score = 0;
  if (haystacks[0].includes(normalizedQuery)) score += 8;
  if (haystacks[1].includes(normalizedQuery)) score += 4;
  if (haystacks[2].includes(normalizedQuery)) score += 3;
  if (haystacks[3].includes(normalizedQuery)) score += 2;
  if (haystacks[4].includes(normalizedQuery)) score += 1;
  terms.forEach((term) => {
    if (haystacks[0].includes(term)) score += 3;
    if (haystacks[1].includes(term)) score += 2;
    if (haystacks[2].includes(term)) score += 1;
    if (haystacks[3].includes(term)) score += 1;
    if (haystacks[4].includes(term)) score += 0.5;
  });
  return score;
}

export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const [items, setItems] = useState<SearchItem[] | null>(null);

  useEffect(() => {
    loadSearchIndex().then(setItems);
  }, []);

  const results = query && items
    ? items
        .map((item) => ({ item, score: scoreSearchResult(item, query) }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 24)
    : [];

  return (
    <>
      <form action="/search" className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="site-search">
          Search the site
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="site-search"
            name="q"
            defaultValue={query}
            placeholder="Search trade lifecycle, acceptance criteria, AI..."
            className="h-11 w-full rounded-full border border-border bg-background pr-4 pl-10 text-sm outline-none transition-colors focus:border-brand focus:ring-3 focus:ring-brand/20"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      {query && items ? (
        <Muted className="font-mono text-xs">
          {results.length} {results.length === 1 ? "result" : "results"} for{" "}
          &quot;{query}&quot;
        </Muted>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {results.map(({ item }) => (
          <Link
            key={`${item.type}-${item.href}-${item.title}`}
            href={item.href}
            aria-label={`Open ${item.title}`}
            className="group flex min-h-44 flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Tag>{item.category}</Tag>
                <Tag>{item.type}</Tag>
              </div>
              <H3 className="text-xl group-hover:text-brand">{item.title}</H3>
              <Muted className="line-clamp-3">{item.description}</Muted>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Open result
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {query && items && results.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <H3>No results found</H3>
          <Muted className="mt-2">
            Try a broader concept like &quot;capital markets&quot;, &quot;requirements&quot;,
            &quot;trade lifecycle&quot;, or &quot;AI&quot;.
          </Muted>
        </div>
      ) : null}
    </>
  );
}
