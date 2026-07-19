import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { GlassCard } from "@/components/simulators/glass-card";
import { Muted } from "@/components/ui/typography";

interface SimulatorCardProps {
  href: string;
  title: string;
  description: string;
  preview: ReactNode;
}

function SimulatorCard({ href, title, description, preview }: SimulatorCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <GlassCard className="h-full gap-4 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-brand/15">
        <div className="flex items-center justify-center py-2">{preview}</div>
        <h3 className="font-serif text-2xl leading-snug font-medium text-balance group-hover:text-brand">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
        <Muted className="mt-auto flex items-center gap-1 font-mono text-xs tracking-[0.15em] text-brand uppercase">
          Launch simulator <ArrowRight className="size-3" />
        </Muted>
      </GlassCard>
    </Link>
  );
}

export { SimulatorCard };
