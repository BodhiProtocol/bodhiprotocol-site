"use client";

import * as React from "react";

import { ResourceCard } from "@/components/ui/resource-card";
import { TagButton } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import type { Resource } from "@/types/content";

function ResourceList({ resources }: { resources: Resource[] }) {
  const categories = React.useMemo(
    () => Array.from(new Set(resources.map((r) => r.category))).sort(),
    [resources],
  );

  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [freeOnly, setFreeOnly] = React.useState(false);

  const filtered = resources.filter(
    (r) =>
      (activeCategory === null || r.category === activeCategory) &&
      (!freeOnly || r.free),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
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
        <div className="flex items-center gap-3">
          <TagButton active={freeOnly} onClick={() => setFreeOnly((v) => !v)}>
            Free to read
          </TagButton>
          <Muted className="font-mono text-xs">
            {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
          </Muted>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <ResourceCard key={resource.url} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export { ResourceList };
