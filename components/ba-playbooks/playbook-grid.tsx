"use client";

import * as React from "react";

import { CategoryFilter } from "@/components/ba-playbooks/category-filter";
import { ComingSoonPlaybookCard } from "@/components/ba-playbooks/coming-soon-playbook-card";
import { PlaybookCard } from "@/components/ba-playbooks/playbook-card";
import { Muted } from "@/components/ui/typography";
import { trackEvent } from "@/lib/analytics/track-event";
import type { Playbook } from "@/types/content";

interface PlaybookGridProps {
  guides: Playbook[];
  planned: string[];
  /** Real category values in use, e.g. from getPlaybookCategories(). */
  categories: string[];
}

function matchesCategory(guide: Playbook, category: string) {
  return category === "All" || guide.category === category;
}

// Coming-soon roadmap cards have no category to filter on, so they only
// surface under "All" — a specific chip should show real, working playbooks only.
function PlaybookGrid({ guides, planned, categories }: PlaybookGridProps) {
  const [category, setCategory] = React.useState("All");
  const filtered = guides.filter((guide) => matchesCategory(guide, category));

  function handleCategoryChange(next: string) {
    setCategory(next);
    trackEvent("ba_playbook_category_selected", { category: next });
  }

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilter active={category} categories={categories} onChange={handleCategoryChange} />
      {filtered.length === 0 && category !== "All" ? (
        <p className="text-sm text-muted-foreground">
          No live playbooks in this category yet — more are on the way.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <PlaybookCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
      {category === "All" && planned.length > 0 ? (
        <div className="flex flex-col gap-4 border-t border-border pt-8">
          <Muted className="font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Coming next
          </Muted>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((title) => (
              <ComingSoonPlaybookCard key={title} title={title} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { PlaybookGrid };
