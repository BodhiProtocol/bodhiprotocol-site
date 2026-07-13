import { BlueprintCard } from "@/components/ui/blueprint-card";
import { H3 } from "@/components/ui/typography";
import type { Blueprint } from "@/types/content";

function RelatedBlueprints({ blueprints }: { blueprints: Blueprint[] }) {
  if (blueprints.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-8">
      <H3>Related concepts</H3>
      <div className="grid gap-6 sm:grid-cols-3">
        {blueprints.map((blueprint) => (
          <BlueprintCard key={blueprint.slug} blueprint={blueprint} />
        ))}
      </div>
    </div>
  );
}

export { RelatedBlueprints };
