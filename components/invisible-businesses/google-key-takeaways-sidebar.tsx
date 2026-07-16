import { CircleCheck } from "lucide-react";

import { Eyebrow } from "@/components/ui/typography";

const takeaways = [
  "Search is free.",
  "Intent is scarce and valuable.",
  "Google wins the moment of intent.",
  "Better intent data creates a compounding advantage.",
  "The business is attention + intent + action.",
];

function GoogleKeyTakeawaysSidebar() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <Eyebrow className="text-brand">Key Takeaways</Eyebrow>
      <ul className="flex flex-col gap-2.5">
        {takeaways.map((takeaway) => (
          <li key={takeaway} className="flex items-start gap-2 text-sm">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" />
            <span className="text-pretty">{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { GoogleKeyTakeawaysSidebar };
