import { Gift, Link2, ShieldCheck } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function CredOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Membership Premium
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        CRED doesn&apos;t charge members for anything. It charges brands for the privilege of
        reaching the specific members CRED already filtered in.
      </p>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 bg-card text-brand">
          <ShieldCheck className="size-4" />
        </span>
        <Link2 className="size-4 text-muted-foreground/50" />
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Gift className="size-4.5" />
        </span>
      </div>
    </div>
  );
}

export { CredOutcomeSidebar };
