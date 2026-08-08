import { Compass } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";

// Roadmap topic with no page yet — visually inert (not a link) so it reads as
// "on the way" rather than a broken or fake destination.
function ComingSoonPlaybookCard({ title }: { title: string }) {
  return (
    <Card className="h-full gap-3 border border-dashed border-border px-(--card-spacing) opacity-70 ring-0">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Compass className="size-4.5" />
        </span>
      </div>
      <h3 className="font-heading text-lg leading-snug font-medium text-balance text-foreground/80">
        {title}
      </h3>
      <Muted className="mt-auto font-mono text-xs tracking-wide uppercase">Coming soon</Muted>
    </Card>
  );
}

export { ComingSoonPlaybookCard };
