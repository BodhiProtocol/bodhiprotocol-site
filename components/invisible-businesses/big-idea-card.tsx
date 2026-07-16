import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { Eyebrow } from "@/components/ui/typography";

function BigIdeaCard({ text }: { text: string }) {
  return (
    <GlassCard className="items-center text-center">
      <Eyebrow className="text-brand">The Big Idea</Eyebrow>
      <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl">
        {text}
      </p>
    </GlassCard>
  );
}

export { BigIdeaCard };
