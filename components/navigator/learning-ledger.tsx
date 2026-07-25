"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const TRACKS = [
  "Capital markets",
  "Trade lifecycle",
  "Business analysis",
  "Systems thinking",
  "Interview preparation",
  "Resume guidance",
] as const;

function LearningLedger() {
  const { ref, played } = useRevealOnScroll();

  return (
    <div ref={ref} className="mx-auto max-w-xl">
      <ol role="list" className="list-none">
        {TRACKS.map((track, i) => (
          <li
            key={track}
            className="flex items-baseline gap-3.5 border-b border-border py-3.5 font-serif text-[15px] transition-all duration-500"
            style={{
              transitionDelay: played ? `${i * 110}ms` : "0ms",
              opacity: played ? 1 : 0,
              transform: played ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {track}
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t-2 border-brand pt-4 font-serif text-[15px] italic">Ready</p>
    </div>
  );
}

export { LearningLedger };
