import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";

// Roadmap topic with no page yet — visually inert (not a link) so it reads as
// "on the way" rather than a broken or fake destination. Deliberately quieter
// than a live PlaybookCard (smaller text, no icon, softer border) so the live
// library stays the visually dominant thing on the page.
function ComingSoonPlaybookCard({ title }: { title: string }) {
  return (
    <Card
      size="sm"
      className="h-full justify-center gap-1.5 border-dashed border-border/60 px-(--card-spacing) opacity-60 ring-0"
    >
      <h3 className="font-heading text-sm leading-snug font-medium text-balance text-foreground/70">
        {title}
      </h3>
      <Muted className="font-mono text-[0.65rem] tracking-wide uppercase">Coming soon</Muted>
    </Card>
  );
}

export { ComingSoonPlaybookCard };
