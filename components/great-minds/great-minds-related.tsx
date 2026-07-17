import { Users } from "lucide-react";

import { Eyebrow, H2 } from "@/components/ui/typography";

function GreatMindsRelated() {
  return (
    <section id="related-minds" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">Keep Exploring</Eyebrow>
        <H2>Related Great Minds</H2>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-10 text-center">
        <Users className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          More Great Minds — each with their own way of thinking — are coming soon.
        </p>
      </div>
    </section>
  );
}

export { GreatMindsRelated };
