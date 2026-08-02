import { Building2 } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function McdonaldsOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Restaurant Brand With a Property Engine
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        McDonald&apos;s is not merely a landlord wearing a drive-thru as a disguise. It&apos;s a
        restaurant and franchise system whose control of property creates a powerful stream of
        recurring revenue.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Building2 className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { McdonaldsOutcomeSidebar };
