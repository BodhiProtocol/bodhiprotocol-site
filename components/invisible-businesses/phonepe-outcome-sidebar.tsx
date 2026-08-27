import { Landmark } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function PhonepeOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        A Free Rail With a Business Bolted On
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        PhonePe isn&apos;t a payments company that happens to sell other things. It&apos;s a
        distribution business — insurance, lending, wealth — that happens to get its daily
        audience from a payment rail it&apos;s legally barred from charging for.
      </p>
      <div className="mt-2 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <Landmark className="size-7" />
        </span>
      </div>
    </div>
  );
}

export { PhonepeOutcomeSidebar };
