import { Package, ShoppingCart, Truck, User } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

function AmazonOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        Higher Customer Lifetime Value
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        By reducing uncertainty at every step, Amazon turns first-time buyers into lifelong
        customers.
      </p>
      <div className="relative mx-auto mt-2 size-28">
        <div className="absolute inset-0 rounded-full border border-dashed border-brand/30" />
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <User className="size-4.5" />
        </span>
        <span className="absolute top-0 left-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm">
          <Package className="size-3.5" />
        </span>
        <span className="absolute bottom-1 left-0 flex size-7 -translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm">
          <ShoppingCart className="size-3.5" />
        </span>
        <span className="absolute right-0 bottom-1 flex size-7 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm">
          <Truck className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

export { AmazonOutcomeSidebar };
