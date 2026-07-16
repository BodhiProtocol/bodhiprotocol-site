import { H3 } from "@/components/ui/typography";
import type { InvisibleBusinessInsight } from "@/types/content";

function InsightCard({ icon, text }: InvisibleBusinessInsight) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <p className="text-sm leading-relaxed text-pretty">{text}</p>
    </div>
  );
}

function InsightGrid({
  heading,
  insights,
}: {
  heading: string;
  insights: InvisibleBusinessInsight[];
}) {
  if (insights.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <H3>{heading}</H3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>
    </div>
  );
}

export { InsightGrid };
