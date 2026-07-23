import { Eyebrow, H2 } from "@/components/ui/typography";
import { GreatMindsTakeaway } from "@/components/great-minds/great-minds-takeaway";
import type { GreatMindThinkingStep } from "@/types/content";

function GreatMindsThinkingProcess({
  steps,
  takeaway,
}: {
  steps: GreatMindThinkingStep[];
  takeaway?: string;
}) {
  return (
    <section id="thinking-process" className="scroll-mt-24 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">How He Thought</Eyebrow>
        <H2>Thinking Process</H2>
      </div>
      <ol className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/25 font-mono text-sm font-semibold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1.5 pt-1">
              <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <GreatMindsTakeaway text={takeaway} />
    </section>
  );
}

export { GreatMindsThinkingProcess };
