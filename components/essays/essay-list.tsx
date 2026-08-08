"use client";

import * as React from "react";
import { LayoutGrid } from "lucide-react";

import { ArticleCard } from "@/components/ui/article-card";
import { TagButton } from "@/components/ui/tag";
import { ConceptMapCallout } from "@/components/essays/concept-map-callout";
import { FeaturedEssayCard } from "@/components/essays/featured-essay-card";
import { SeriesRail } from "@/components/essays/series-rail";
import { categoryIcons } from "@/lib/category-icons";
import { essayIllustrations } from "@/lib/essay-illustrations";
import { essaySeries } from "@/lib/series";
import type { Essay } from "@/types/content";

const activeChipClassName =
  "data-[active=true]:border-brand data-[active=true]:bg-brand data-[active=true]:text-brand-foreground";

const categoryOrder = [
  "Capital Markets",
  "Business Analysis",
  "Artificial Intelligence",
  "Economics",
];

function EssayList({ essays }: { essays: Essay[] }) {
  const categories = React.useMemo(
    () =>
      Array.from(new Set(essays.map((essay) => essay.category))).sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a);
        const bIndex = categoryOrder.indexOf(b);

        if (aIndex === -1 && bIndex === -1) {
          return a.localeCompare(b);
        }

        if (aIndex === -1) {
          return 1;
        }

        if (bIndex === -1) {
          return -1;
        }

        return aIndex - bIndex;
      }),
    [essays],
  );
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  // Series membership and reading order both come from lib/series.ts.
  const seriesRails = React.useMemo(() => {
    const essayBySlug = new Map(essays.map((essay) => [essay.slug, essay]));
    return essaySeries
      .map((series) => ({
        series,
        essays: series.slugs
          .map((slug) => essayBySlug.get(slug))
          .filter((essay): essay is Essay => Boolean(essay)),
      }))
      .filter(({ essays: parts }) => parts.length > 0);
  }, [essays]);

  const standalone = React.useMemo(
    () => essays.filter((essay) => !essay.series),
    [essays],
  );

  // essays is sorted newest-first (see getAllEssays), so the newest is featured.
  const featuredEssay = essays[0];

  const filtered = activeCategory
    ? essays.filter((essay) => essay.category === activeCategory)
    : essays;
  const showFeatured = Boolean(
    featuredEssay && filtered.some((essay) => essay.slug === featuredEssay.slug),
  );

  // A series spans categories (the clearing arc ends on an Economics essay), so a
  // rail shows whenever any part matches — non-matching parts dim inside the rail.
  const visibleRails = activeCategory
    ? seriesRails.filter(({ essays: parts }) =>
        parts.some((essay) => essay.category === activeCategory),
      )
    : seriesRails;

  const visibleStandalone = standalone.filter(
    (essay) =>
      (!activeCategory || essay.category === activeCategory) &&
      !(showFeatured && essay.slug === featuredEssay?.slug),
  );

  const Illustration = featuredEssay ? essayIllustrations[featuredEssay.slug] : undefined;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <TagButton
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
          className={activeChipClassName}
        >
          <LayoutGrid className="size-3.5 shrink-0" />
          All
        </TagButton>
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <TagButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={activeChipClassName}
            >
              {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
              {category}
            </TagButton>
          );
        })}
      </div>
      {showFeatured && featuredEssay ? (
        <FeaturedEssayCard
          essay={featuredEssay}
          illustration={Illustration ? <Illustration /> : undefined}
        />
      ) : null}
      <ConceptMapCallout essayCount={essays.length} />
      {visibleRails.length > 0 ? (
        <div className="flex flex-col gap-5">
          {visibleRails.map(({ series, essays: parts }) => (
            <SeriesRail
              key={series.id}
              series={series}
              essays={parts}
              activeCategory={activeCategory}
            />
          ))}
        </div>
      ) : null}
      {visibleStandalone.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-lg leading-snug font-medium">
            {visibleStandalone.length === 1 ? "Standalone essay" : "Standalone essays"}
          </h2>
          {/* Most essays now belong to an arc, so this can be a single card —
              don't strand it in a three-column grid. */}
          <div
            className={
              visibleStandalone.length === 1
                ? "grid gap-6 sm:max-w-md"
                : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {visibleStandalone.map((essay) => (
              <ArticleCard key={essay.slug} essay={essay} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { EssayList };
