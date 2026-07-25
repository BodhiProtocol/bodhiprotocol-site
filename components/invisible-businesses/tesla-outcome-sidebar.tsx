import { FileCheck2 } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function TeslaOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Permission Slip, Not A Car
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Tesla&apos;s first profitable quarter, in 2013, was partly a credit sale. Its thinnest
        margin quarter, in 2026, arrived right after those credits dried up — the same business,
        seen from both ends.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <FileCheck2 className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { TeslaOutcomeSidebar };
