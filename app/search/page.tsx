import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { H3, Muted } from "@/components/ui/typography";
import { getSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description: "Search BodhiProtocol essays, Lighthouse blueprints, tools, simulators, and learning resources.",
  alternates: { canonical: "/search" },
  // Internal search results are per-query and thin — keep them crawlable (so
  // Google can see this tag) but out of the index, per Google's own guidance
  // on site search result pages.
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

function getQuery(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function scoreSearchResult(item: ReturnType<typeof getSearchIndex>[number], query: string) {
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getQuery(params.q).trim();
  const items = getSearchIndex();
  const results = query
    ? items
        .map((item) => ({ item, score: scoreSearchResult(item, query) }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 24)
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Search BodhiProtocol"
        description="Find essays, Lighthouse blueprints, tools, simulators, and resources across the site."
      />
      <Section>
        <Container className="flex flex-col gap-8">
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

          {query ? (
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

          {query && results.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-6">
              <H3>No results found</H3>
              <Muted className="mt-2">
                Try a broader concept like &quot;capital markets&quot;, &quot;requirements&quot;,
                &quot;trade lifecycle&quot;, or &quot;AI&quot;.
              </Muted>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
