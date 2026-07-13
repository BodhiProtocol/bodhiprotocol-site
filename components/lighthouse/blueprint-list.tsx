"use client";

import * as React from "react";

import { BlueprintCard } from "@/components/ui/blueprint-card";
import { TagButton } from "@/components/ui/tag";
import type { Blueprint } from "@/types/content";

function BlueprintList({ blueprints }: { blueprints: Blueprint[] }) {
  const seasons = React.useMemo(
    () => Array.from(new Set(blueprints.map((blueprint) => blueprint.season))).sort(),
    [blueprints],
  );
  const [activeSeason, setActiveSeason] = React.useState<string | null>(null);

  const filtered = activeSeason
    ? blueprints.filter((blueprint) => blueprint.season === activeSeason)
    : blueprints;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <TagButton active={activeSeason === null} onClick={() => setActiveSeason(null)}>
          All
        </TagButton>
        {seasons.map((season) => (
          <TagButton
            key={season}
            active={activeSeason === season}
            onClick={() => setActiveSeason(season)}
          >
            {season}
          </TagButton>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((blueprint) => (
          <BlueprintCard key={blueprint.slug} blueprint={blueprint} />
        ))}
      </div>
    </div>
  );
}

export { BlueprintList };
