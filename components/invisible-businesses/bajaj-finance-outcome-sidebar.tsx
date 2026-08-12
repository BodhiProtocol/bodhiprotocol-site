import { Landmark } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function BajajFinanceOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The First Loan Was The Interview
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Bajaj Finance doesn&apos;t make its money on the TV you financed. It makes it
        on everything it sells you once it knows how you pay.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Landmark className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { BajajFinanceOutcomeSidebar };
