import { GreatMindsTakeaway } from "@/components/great-minds/great-minds-takeaway";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindTimelineEvent } from "@/types/content";

function GreatMindsTimeline({
  events,
  takeaway,
}: {
  events: GreatMindTimelineEvent[];
  takeaway?: string;
}) {
  return (
    <section id="timeline" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">The Life, Briefly</Eyebrow>
        <H2>Timeline</H2>
      </div>
      <ol className="relative flex flex-col gap-7 border-l border-border pl-6">
        {events.map((event) => (
          <li key={event.year} className="relative">
            <span className="absolute top-1.5 -left-[1.65rem] size-2.5 rounded-full border-2 border-brand bg-background" />
            <span className="font-mono text-xs font-semibold tracking-[0.1em] text-brand uppercase">
              {event.year}
            </span>
            {event.detail ? (
              <details className="group mt-1">
                <summary className="cursor-pointer leading-relaxed text-muted-foreground marker:content-none">
                  {event.event}{" "}
                  <span className="text-xs text-brand group-open:hidden">(expand)</span>
                </summary>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{event.detail}</p>
              </details>
            ) : (
              <p className="mt-1 leading-relaxed text-muted-foreground">{event.event}</p>
            )}
          </li>
        ))}
      </ol>
      <GreatMindsTakeaway text={takeaway} />
    </section>
  );
}

export { GreatMindsTimeline };
