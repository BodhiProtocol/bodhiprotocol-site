import { Heart, Link2, Wrench } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function IkeaOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Labor Discount
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Every flat-pack box, IKEA trades a lower price for your time — and gets a customer who
        values the piece more for having built it.
      </p>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 bg-card text-brand">
          <Wrench className="size-4" />
        </span>
        <Link2 className="size-4 text-muted-foreground/50" />
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Heart className="size-4.5" />
        </span>
      </div>
    </div>
  );
}

export { IkeaOutcomeSidebar };
