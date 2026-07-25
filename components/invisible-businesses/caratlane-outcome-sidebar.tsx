import { Fingerprint } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function CaratlaneOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Last Inch, Delivered
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        A certificate can prove a diamond&apos;s specs from anywhere. It can&apos;t prove how it looks on
        your own hand. CaratLane didn&apos;t skip the showroom — it just moved the showroom to whichever
        place actually closes the sale.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Fingerprint className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { CaratlaneOutcomeSidebar };
