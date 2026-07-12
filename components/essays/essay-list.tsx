"use client";

import * as React from "react";

import { ArticleCard } from "@/components/ui/article-card";
import { TagButton } from "@/components/ui/tag";
import type { Essay } from "@/types/content";

function EssayList({ essays }: { essays: Essay[] }) {
  const categories = React.useMemo(
    () => Array.from(new Set(essays.map((essay) => essay.category))).sort(),
    [essays],
  );
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const filtered = activeCategory
    ? essays.filter((essay) => essay.category === activeCategory)
    : essays;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <TagButton
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          All
        </TagButton>
        {categories.map((category) => (
          <TagButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </TagButton>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((essay) => (
          <ArticleCard key={essay.slug} essay={essay} />
        ))}
      </div>
    </div>
  );
}

export { EssayList };
