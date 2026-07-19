import type { LucideIcon } from "lucide-react";

interface SimulatorRoadmapCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function SimulatorRoadmapCard({ title, description, icon: Icon }: SimulatorRoadmapCardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-dashed border-border p-6 opacity-60 sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="font-serif text-2xl leading-snug font-medium text-balance">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <span className="mt-auto font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
        Coming soon
      </span>
    </div>
  );
}

export { SimulatorRoadmapCard };
