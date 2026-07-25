import { Sparkles } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function NikeOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Logo, Not A Factory
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Nike doesn&apos;t need to make a better shoe. It needs the swoosh to mean something —
        a marketing company wearing a sneaker as a disguise.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Sparkles className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { NikeOutcomeSidebar };
