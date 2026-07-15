"use client";

import * as React from "react";
import { LayoutGrid } from "lucide-react";

import { ArticleCard } from "@/components/ui/article-card";
import { TagButton } from "@/components/ui/tag";
import { FeaturedArticleCard } from "@/components/essays/featured-article-card";
import { categoryIcons } from "@/lib/category-icons";
import type { Essay } from "@/types/content";

const activeChipClassName =
  "data-[active=true]:border-brand data-[active=true]:bg-brand data-[active=true]:text-brand-foreground";

function EssayList({ essays }: { essays: Essay[] }) {
  const categories = React.useMemo(
    () => Array.from(new Set(essays.map((essay) => essay.category))).sort(),
    [essays],
  );
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const filtered = activeCategory
    ? essays.filter((essay) => essay.category === activeCategory)
    : essays;
  const [featured, ...rest] = filtered;

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
      {featured ? <FeaturedArticleCard essay={featured} /> : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((essay) => (
          <ArticleCard key={essay.slug} essay={essay} />
        ))}
      </div>
    </div>
  );
}

export { EssayList };
