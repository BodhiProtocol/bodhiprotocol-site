import { BadgeCheck } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function OyoOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Name, Not The Room
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        OYO doesn&apos;t sell a hotel room. It sells a small property the one thing it was
        missing: a name strangers already trust.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <BadgeCheck className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { OyoOutcomeSidebar };
