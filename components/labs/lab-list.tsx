"use client";

import * as React from "react";

import { LabCard } from "@/components/ui/lab-card";
import { TagButton } from "@/components/ui/tag";
import { categoryIcons } from "@/lib/category-icons";
import type { Lab } from "@/types/content";

function LabList({ labs }: { labs: Lab[] }) {
  const categories = React.useMemo(
    () => Array.from(new Set(labs.map((lab) => lab.category))).sort(),
    [labs],
  );
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const filtered = activeCategory
    ? labs.filter((lab) => lab.category === activeCategory)
    : labs;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <TagButton active={activeCategory === null} onClick={() => setActiveCategory(null)}>
          All
        </TagButton>
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <TagButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
              {category}
            </TagButton>
          );
        })}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lab) => (
          <LabCard key={lab.slug} lab={lab} />
        ))}
      </div>
    </div>
  );
}

export { LabList };
