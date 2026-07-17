import type { ReactNode } from "react";
import { Bookmark, Calendar, Landmark, Sparkles, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

interface GreatMindsHeroProps {
  name: string;
  positioning: string;
  quote: string;
  secondaryQuote?: string;
  lifespan: string;
  era: string;
  roles: string[];
  diagram: ReactNode;
  background?: ReactNode;
}

function GreatMindsHero({
  name,
  positioning,
  quote,
  secondaryQuote,
  lifespan,
  era,
  roles,
  diagram,
  background,
}: GreatMindsHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      {background}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-8 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit gap-1.5 py-1 pr-3 pl-2.5 text-brand">
            <Sparkles className="size-3" />
            Great Minds
          </Badge>

          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
              {name}
            </h1>
            <p className="font-serif text-xl text-brand text-balance sm:text-2xl">{positioning}</p>
          </div>

          <div className="h-px w-16 bg-border" />

          <blockquote className="max-w-sm font-serif text-lg leading-snug text-balance text-muted-foreground italic sm:text-xl">
            &ldquo;{quote}&rdquo;
            <footer className="mt-2 font-sans text-sm not-italic text-muted-foreground/70">— {name}</footer>
          </blockquote>

          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-brand/70" />
              <div className="leading-tight">
                <dt className="text-xs text-muted-foreground">Life</dt>
                <dd className="text-sm font-medium">{lifespan}</dd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-brand/70" />
              <div className="leading-tight">
                <dt className="text-xs text-muted-foreground">Era</dt>
                <dd className="text-sm font-medium">{era}</dd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-4 text-brand/70" />
              <div className="leading-tight">
                <dt className="text-xs text-muted-foreground">Many Roles</dt>
                <dd className="max-w-40 text-sm font-medium">{roles.join(", ")}</dd>
              </div>
            </div>
          </dl>

          <div className="flex items-center gap-3 pt-1">
            <Button size="lg" nativeButton={false} render={<a href="#core-philosophy" />}>
              Explore His Mind
            </Button>
            <Button size="icon-lg" variant="outline" aria-label={`Save ${name}`}>
              <Bookmark className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {diagram}
          {secondaryQuote ? (
            <Eyebrow className="hidden max-w-52 text-center font-serif text-base tracking-normal text-muted-foreground normal-case italic sm:block">
              &ldquo;{secondaryQuote}&rdquo;
            </Eyebrow>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { GreatMindsHero };
