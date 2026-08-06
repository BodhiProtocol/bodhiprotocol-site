import { ListChecks } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function NoiceOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        It Never Had To Win The Algorithm
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Noice doesn&apos;t sell snacks. It sells the ranking, the placement, and the
        margin every other brand has to fight Instamart for.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <ListChecks className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { NoiceOutcomeSidebar };
