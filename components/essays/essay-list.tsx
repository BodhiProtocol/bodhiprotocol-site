"use client";

import * as React from "react";
import { LayoutGrid } from "lucide-react";

import { ArticleCard } from "@/components/ui/article-card";
import { TagButton } from "@/components/ui/tag";
import { FeaturedEssayCard } from "@/components/essays/featured-essay-card";
import { categoryIcons } from "@/lib/category-icons";
import { essayIllustrations } from "@/lib/essay-illustrations";
import type { Essay } from "@/types/content";

const activeChipClassName =
  "data-[active=true]:border-brand data-[active=true]:bg-brand data-[active=true]:text-brand-foreground";

function EssayList({ essays }: { essays: Essay[] }) {
  const categories = React.useMemo(
    () => Array.from(new Set(essays.map((essay) => essay.category))).sort(),
    [essays],
  );
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  // essays is sorted newest-first (see getAllEssays), so the newest is featured.
  const featuredEssay = essays[0];

  const filtered = activeCategory
    ? essays.filter((essay) => essay.category === activeCategory)
    : essays;
  const showFeatured = Boolean(
    featuredEssay && filtered.some((essay) => essay.slug === featuredEssay.slug),
  );
  const rest = showFeatured
    ? filtered.filter((essay) => essay.slug !== featuredEssay!.slug)
    : filtered;
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((essay) => (
          <ArticleCard key={essay.slug} essay={essay} />
        ))}
      </div>
    </div>
  );
}

export { EssayList };
