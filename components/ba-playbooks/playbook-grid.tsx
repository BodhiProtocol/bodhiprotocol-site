"use client";

import * as React from "react";

import { CategoryFilter } from "@/components/ba-playbooks/category-filter";
import { ComingSoonPlaybookCard } from "@/components/ba-playbooks/coming-soon-playbook-card";
import { PlaybookCard } from "@/components/ba-playbooks/playbook-card";
import { trackEvent } from "@/lib/analytics/track-event";
import type { Playbook } from "@/types/content";

interface PlaybookGridProps {
  guides: Playbook[];
  planned: string[];
}

function matchesCategory(guide: Playbook, category: string) {
  if (category === "All") return true;
  const needle = category.toLowerCase();
  return (
    guide.category.toLowerCase() === needle || guide.tags.some((tag) => tag.toLowerCase() === needle)
  );
}

// Coming-soon roadmap cards have no tags to filter on, so they only surface
// under "All" — a specific chip should show real, working playbooks only.
function PlaybookGrid({ guides, planned }: PlaybookGridProps) {
  const [category, setCategory] = React.useState("All");
  const filtered = guides.filter((guide) => matchesCategory(guide, category));

  function handleCategoryChange(next: string) {
    setCategory(next);
    trackEvent("ba_playbook_category_selected", { category: next });
  }

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilter active={category} onChange={handleCategoryChange} />
      {filtered.length === 0 && category !== "All" ? (
        <p className="text-sm text-muted-foreground">
          No live playbooks in this category yet — more are on the way.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <PlaybookCard key={guide.slug} guide={guide} />
          ))}
          {category === "All"
            ? planned.map((title) => <ComingSoonPlaybookCard key={title} title={title} />)
            : null}
        </div>
      )}
    </div>
  );
}

export { PlaybookGrid };
