import { Ticket } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function CostcoOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Fee, Not a Sale
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Costco doesn&apos;t need you to buy more. It needs you to renew — a subscription business
        wearing a warehouse as a disguise.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Ticket className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { CostcoOutcomeSidebar };
