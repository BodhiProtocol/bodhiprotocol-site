import { Layers } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

// Bar heights (in px) suggesting a moat that widens as the stack grows.
const bars = [14, 22, 32, 44, 58];

function NvidiaOutcomeSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/10 via-card to-transparent p-5">
      <Eyebrow className="text-brand">Invisible Outcome</Eyebrow>
      <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
        The Widening Moat
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Every layer built on CUDA raises the cost of ever switching to a rival chip.
      </p>
      <div className="mt-2 flex items-end justify-center gap-1.5" aria-hidden>
        {bars.map((height, index) => (
          <span
            key={index}
            className="w-5 rounded-t-sm bg-gradient-to-t from-brand/40 to-brand"
            style={{ height }}
          />
        ))}
        <Layers className="mb-0.5 ml-1 size-4 text-brand" />
      </div>
    </div>
  );
}

export { NvidiaOutcomeSidebar };
