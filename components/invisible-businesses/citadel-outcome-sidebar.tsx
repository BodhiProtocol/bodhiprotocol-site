import { EyeOff } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function CitadelOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Exchange Is the Backup Plan
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Citadel Securities doesn&apos;t out-compete the stock exchange on price.
        It just gets to the order first, most of the time, before the exchange
        ever finds out there was one.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <EyeOff className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { CitadelOutcomeSidebar };
