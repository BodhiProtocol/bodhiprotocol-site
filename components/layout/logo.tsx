import Link from "next/link";

import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-lg font-medium tracking-tight whitespace-nowrap",
        className,
      )}
    >
      Bodhi<span className="text-brand">Protocol</span>
    </Link>
  );
}

export { Logo };
