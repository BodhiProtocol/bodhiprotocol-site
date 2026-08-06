import type { Essay } from "@/types/content";

import { getAllEssays } from "@/lib/essays";
import { getSeriesForSlug, getSeriesById } from "@/lib/series";

/**
 * Walks forward from an essay through the rest of its series, continuing into
 * the next series when this one runs out. Reading order comes from
 * lib/series.ts — the same source the rails on /essays render from.
 */
function pickFromSeries(essay: Essay, allEssays: Essay[], limit: number) {
  const membership = getSeriesForSlug(essay.slug);
  if (!membership) return [];

  const essayBySlug = new Map(allEssays.map((item) => [item.slug, item]));
  const picks: Essay[] = [];

  let series = membership.series;
  let start = membership.order;
  const visited = new Set<string>();

  while (picks.length < limit && !visited.has(series.id)) {
    visited.add(series.id);

    for (const slug of series.slugs.slice(start)) {
      const found = essayBySlug.get(slug);
      if (found) picks.push(found);
      if (picks.length === limit) return picks;
    }

    const upcoming = series.nextSeriesId ? getSeriesById(series.nextSeriesId) : undefined;
    if (!upcoming) break;
    series = upcoming;
    start = 0;
  }

  return picks;
}

export function getReadNextEssays(essay: Essay, limit = 3) {
  const allEssays = getAllEssays();
  const seriesPicks = pickFromSeries(essay, allEssays, limit);
  if (seriesPicks.length >= limit) return seriesPicks;

  const used = new Set([essay.slug, ...seriesPicks.map((item) => item.slug)]);
  const fallback = allEssays
    .filter((candidate) => !used.has(candidate.slug))
    .filter(
      (candidate) =>
        candidate.category === essay.category ||
        candidate.tags.some((tag) => essay.tags.includes(tag)),
    )
    .slice(0, limit - seriesPicks.length);

  return [...seriesPicks, ...fallback];
}
