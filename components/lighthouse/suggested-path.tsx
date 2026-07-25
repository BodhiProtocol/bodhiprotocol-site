"use client";

import Link from "next/link";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Eyebrow, H2, Muted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { suggestedPath } from "@/lib/suggested-path";

function TrackLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const className =
    "inline-flex h-6 w-fit shrink-0 items-center rounded-full border border-border px-2.5 text-xs font-medium text-foreground transition-colors hover:border-brand hover:text-brand";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function SuggestedPath() {
  const { ref, played } = useRevealOnScroll();
  const available = suggestedPath.filter((track) => !track.comingSoon).length;

  return (
    <div id="suggested-path" className="scroll-mt-20 border-b border-border py-16 sm:py-20">
      <Container className="max-w-2xl">
        <Eyebrow>Suggested path</Eyebrow>
        <H2 className="mt-3">Breaking into capital markets as a BA</H2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          The blueprints below cover a lot of ground. If your goal is specifically breaking into
          capital markets as a business analyst, here&apos;s the order — {available} of{" "}
          {suggestedPath.length} tracks are live now.
        </p>

        <div ref={ref} className="relative mt-10">
          <div className="absolute top-5 bottom-5 left-[19px] w-px bg-border" aria-hidden="true" />
          {suggestedPath.map((track, i) => (
            <div
              key={track.title}
              className={cn(
                "relative grid grid-cols-[40px_1fr] gap-4 py-5 transition-all duration-500",
                i > 0 && "border-t border-border",
              )}
              style={{
                transitionDelay: played ? `${i * 90}ms` : "0ms",
                opacity: played ? 1 : 0,
                transform: played ? "translateY(0)" : "translateY(6px)",
              }}
            >
              <span
                className={cn(
                  "relative z-10 flex size-10 items-center justify-center rounded-full border bg-background font-mono text-xs font-semibold",
                  track.comingSoon
                    ? "border-border text-muted-foreground"
                    : "border-brand bg-brand/5 text-brand",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-base leading-snug font-medium">{track.title}</h3>
                  {track.comingSoon ? <Badge variant="outline">In development</Badge> : null}
                </div>
                <Muted className="mt-1.5 max-w-[46ch] leading-relaxed">{track.description}</Muted>
                {track.links.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {track.links.map((link) => (
                      <TrackLink key={link.label} {...link} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export { SuggestedPath };
