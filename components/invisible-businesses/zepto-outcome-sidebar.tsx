import { Clock, Link2, MapPin } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function ZeptoOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Proximity Premium
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Every order, Zepto charges a small fee for compressing a grocery run that used to take
        thirty minutes into ten.
      </p>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 bg-card text-brand">
          <MapPin className="size-4" />
        </span>
        <Link2 className="size-4 text-muted-foreground/50" />
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Clock className="size-4.5" />
        </span>
      </div>
    </div>
  );
}

export { ZeptoOutcomeSidebar };
