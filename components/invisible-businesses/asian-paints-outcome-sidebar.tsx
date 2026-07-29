import { ShieldCheck } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function AsianPaintsOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Decision, Not A Can
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Asian Paints does not remove only the labour of painting. It removes the fear of choosing
        wrong: the shade, the finish, the worker, the mess, and the regret after the wall dries.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <ShieldCheck className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { AsianPaintsOutcomeSidebar };
