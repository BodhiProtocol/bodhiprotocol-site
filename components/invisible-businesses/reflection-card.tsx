import { Quote } from "lucide-react";

import { GlassCard } from "@/components/invisible-businesses/glass-card";
import { Eyebrow } from "@/components/ui/typography";

function ReflectionCard({ text }: { text: string }) {
  return (
    <GlassCard className="items-center text-center">
      <Quote className="size-8 text-brand/40" />
      <Eyebrow className="mt-2 text-brand">Bodhi Reflection</Eyebrow>
      <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-balance sm:text-2xl">
        {text}
      </p>
    </GlassCard>
  );
}

export { ReflectionCard };
