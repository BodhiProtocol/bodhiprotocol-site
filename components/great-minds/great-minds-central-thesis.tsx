import { ArrowDown } from "lucide-react";

import { GREAT_MINDS_ICON_MAP } from "@/components/great-minds/great-minds-icon-map";
import { Eyebrow } from "@/components/ui/typography";
import type { GreatMindCentralThesis } from "@/types/content";

// Generic "N inputs converge on one idea" diagram. Deliberately flat and
// static (no rings, no motion) so it reads as structurally distinct from any
// person's circular hero diagram on the same page. Renders nothing when a
// mind's frontmatter doesn't define centralThesis.
function GreatMindsCentralThesis({ thesis }: { thesis?: GreatMindCentralThesis }) {
  if (!thesis) return null;

  return (
    <section id="central-thesis" className="scroll-mt-24 flex flex-col items-center gap-8 text-center">
      <Eyebrow className="text-brand">The Central Thesis</Eyebrow>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {thesis.nodes.map((node) => {
          const Icon = GREAT_MINDS_ICON_MAP[node.icon] ?? GREAT_MINDS_ICON_MAP.Brain;
          return (
            <div key={node.label} className="flex flex-col items-center gap-2">
              <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm">
                <Icon className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      <ArrowDown className="size-5 text-brand/60" aria-hidden="true" />

      <span className="rounded-full border border-brand bg-brand px-6 py-2.5 font-heading text-lg font-semibold text-brand-foreground shadow-md shadow-brand/25">
        {thesis.centerLabel}
      </span>

      <p className="max-w-xl text-balance text-muted-foreground">{thesis.caption}</p>
    </section>
  );
}

export { GreatMindsCentralThesis };
