import * as React from "react";

import { cn } from "@/lib/utils";

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.07] via-card/60 to-transparent p-6 shadow-2xl shadow-brand/10 ring-1 ring-inset ring-white/[0.04] backdrop-blur-md sm:p-8",
        className,
      )}
      {...props}
    />
  );
}

export { GlassCard };
