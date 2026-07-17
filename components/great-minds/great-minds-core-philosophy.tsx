import { Eyebrow } from "@/components/ui/typography";

function GreatMindsCorePhilosophy({ philosophy }: { philosophy: string }) {
  return (
    <section id="core-philosophy" className="scroll-mt-24">
      <div className="flex flex-col gap-4">
        <Eyebrow className="text-brand">Core Philosophy</Eyebrow>
        <p className="font-serif text-2xl leading-snug text-balance sm:text-3xl">{philosophy}</p>
      </div>
    </section>
  );
}

export { GreatMindsCorePhilosophy };
