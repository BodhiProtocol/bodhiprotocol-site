import { Link2, Lock, Store, User } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function VisaOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Trust Toll
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Every swipe, tap, or click, Visa charges a small fee for solving a problem neither side
        wanted to solve themselves — trusting a stranger.
      </p>
      <div className="mt-2 flex items-center justify-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 bg-card text-brand">
          <User className="size-4" />
        </span>
        <Link2 className="size-4 text-muted-foreground/50" />
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Lock className="size-4.5" />
        </span>
        <Link2 className="size-4 text-muted-foreground/50" />
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 bg-card text-brand">
          <Store className="size-4" />
        </span>
      </div>
    </div>
  );
}

export { VisaOutcomeSidebar };
