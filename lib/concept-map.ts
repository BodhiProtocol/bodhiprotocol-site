import { categoryColors, defaultCategoryColor } from "@/lib/category-colors";
import { getAllEssays } from "@/lib/essays";
import { essayBridges, essaySeries, getSeriesForSlug } from "@/lib/series";
import type { EssaySeries } from "@/lib/series";
import type { Essay } from "@/types/content";

/**
 * Only the fields a station needs to render. The map is a client component, so
 * projecting here keeps every essay's MDX body out of the RSC payload.
 */
export interface ConceptStation {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  hook?: string;
}

/** One transit line: a series, or the row holding essays that belong to none. */
export interface ConceptArc {
  id: string;
  title: string;
  blurb: string;
  /**
   * Lucide display name rather than the component itself — this crosses into a
   * client component, and a function can't be serialized.
   */
  iconName: string;
  essays: ConceptStation[];
  /** Drives the line colour — the category most of its essays sit in. */
  category: string;
  color: string;
  minutes: number;
  recommendedStart: boolean;
  /** True for the row of essays with no series; drawn as a spur, not a line. */
  standalone: boolean;
}

export interface ConceptBridge {
  from: ConceptStation;
  to: ConceptStation;
  label: string;
}

export interface ConceptMapData {
  arcs: ConceptArc[];
  bridges: ConceptBridge[];
  categories: string[];
  totals: { essays: number; arcs: number; bridges: number; minutes: number };
}

function minutesOf(essays: ConceptStation[]) {
  return essays.reduce((sum, essay) => {
    const minutes = Number.parseInt(essay.readingTime, 10);
    return Number.isFinite(minutes) ? sum + minutes : sum;
  }, 0);
}

/**
 * A series can span categories — the clearing arc ends on an Economics essay —
 * so the line takes the category most of its parts share, first part breaking ties.
 */
function dominantCategory(essays: ConceptStation[]) {
  if (essays.length === 0) return "";
  const counts = new Map<string, number>();
  for (const essay of essays) {
    counts.set(essay.category, (counts.get(essay.category) ?? 0) + 1);
  }
  let best = essays[0].category;
  for (const [category, count] of counts) {
    if (count > (counts.get(best) ?? 0)) best = category;
  }
  return best;
}

function toArc(series: EssaySeries, essays: ConceptStation[]): ConceptArc {
  const category = dominantCategory(essays);
  return {
    id: series.id,
    title: series.title,
    blurb: series.blurb,
    iconName: series.icon.displayName ?? "Compass",
    essays,
    category,
    color: categoryColors[category] ?? defaultCategoryColor,
    minutes: minutesOf(essays),
    recommendedStart: Boolean(series.recommendedStart),
    standalone: false,
  };
}

function toStation(essay: Essay): ConceptStation {
  return {
    slug: essay.slug,
    title: essay.title,
    category: essay.category,
    readingTime: essay.readingTime,
    hook: essay.hook,
  };
}

export function getConceptMapData(): ConceptMapData {
  const allEssays = getAllEssays().map(toStation);
  const essayBySlug = new Map(allEssays.map((essay) => [essay.slug, essay]));

  const arcs: ConceptArc[] = essaySeries
    .map((series) => {
      const essays = series.slugs
        .map((slug) => essayBySlug.get(slug))
        .filter((essay): essay is ConceptStation => Boolean(essay));
      return toArc(series, essays);
    })
    .filter((arc) => arc.essays.length > 0);

  // Essays in no series ride a spur off the network rather than vanishing.
  const orphans = allEssays.filter((essay) => !getSeriesForSlug(essay.slug));
  if (orphans.length > 0) {
    const category = dominantCategory(orphans);
    arcs.push({
      id: "standalone",
      title: orphans.length === 1 ? "Standalone" : "Standalone essays",
      blurb: "Off the main lines — connected by a single idea.",
      iconName: "Compass",
      essays: orphans,
      category,
      color: categoryColors[category] ?? defaultCategoryColor,
      minutes: minutesOf(orphans),
      recommendedStart: false,
      standalone: true,
    });
  }

  const bridges: ConceptBridge[] = essayBridges
    .map((bridge) => {
      const from = essayBySlug.get(bridge.from);
      const to = essayBySlug.get(bridge.to);
      return from && to ? { from, to, label: bridge.label } : null;
    })
    .filter((bridge): bridge is ConceptBridge => bridge !== null);

  const categories = Array.from(new Set(arcs.map((arc) => arc.category)));

  return {
    arcs,
    bridges,
    categories,
    totals: {
      essays: allEssays.length,
      arcs: arcs.filter((arc) => !arc.standalone).length,
      bridges: bridges.length,
      minutes: minutesOf(allEssays),
    },
  };
}
