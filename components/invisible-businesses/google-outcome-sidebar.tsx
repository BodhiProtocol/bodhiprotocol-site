import { DollarSign, Search, Sparkles, User, Users } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

const orbitNodes = [
  { label: "More Intent", icon: Search, position: "top-0 left-1/2 -translate-x-1/2" },
  { label: "More Revenue", icon: DollarSign, position: "top-1/2 right-0 -translate-y-1/2" },
  { label: "Better Products", icon: Sparkles, position: "bottom-0 left-1/2 -translate-x-1/2" },
  { label: "More Users", icon: Users, position: "top-1/2 left-0 -translate-y-1/2" },
];

function GoogleOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Self-Funding Flywheel
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        By monetizing intent, Google funds better products, which attract more users, which
        generate more high-intent moments. The flywheel never stops.
      </p>
      <div className="relative mx-auto mt-2 size-32">
        <div className="absolute inset-0 rounded-full border border-dashed border-brand/30" />
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm shadow-brand/30">
          <User className="size-4.5" />
        </span>
        {orbitNodes.map((node) => {
          const Icon = node.icon;
          return (
            <span
              key={node.label}
              className={`absolute flex size-7 items-center justify-center rounded-full border border-brand/20 bg-card text-brand shadow-sm ${node.position}`}
            >
              <Icon className="size-3.5" />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export { GoogleOutcomeSidebar };
