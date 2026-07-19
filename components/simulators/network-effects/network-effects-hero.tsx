import type { ReactNode } from "react";
import { Waypoints } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NetworkEffectsHeroProps {
  diagram: ReactNode;
}

function NetworkEffectsHero({ diagram }: NetworkEffectsHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-8 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit gap-1.5 py-1 pr-3 pl-2.5 text-brand">
            <Waypoints className="size-3" />
            Interactive Simulator
          </Badge>

          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
              Network Effects
            </h1>
            <p className="max-w-md font-serif text-xl text-balance text-muted-foreground sm:text-2xl">
              Why do some products become more valuable as more people join?
            </p>
          </div>

          <div className="h-px w-16 bg-border" />

          <p className="max-w-sm text-muted-foreground">Move the sliders and discover why.</p>

          <div className="flex items-center gap-3 pt-1">
            <Button size="lg" nativeButton={false} render={<a href="#simulator" />}>
              Start Exploring
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">{diagram}</div>
      </div>
    </div>
  );
}

export { NetworkEffectsHero };
