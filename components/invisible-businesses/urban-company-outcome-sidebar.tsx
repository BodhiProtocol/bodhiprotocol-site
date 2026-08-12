import { BadgeCheck } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function UrbanCompanyOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        You Never Had To Vet The Stranger
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Urban Company doesn&apos;t sell the plumbing. It sells the rejections that
        happened before the plumber ever reached your door.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <BadgeCheck className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { UrbanCompanyOutcomeSidebar };
