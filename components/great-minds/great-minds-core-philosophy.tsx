import { Eyebrow } from "@/components/ui/typography";
import { GreatMindsTakeaway } from "@/components/great-minds/great-minds-takeaway";

function GreatMindsCorePhilosophy({ philosophy, takeaway }: { philosophy: string; takeaway?: string }) {
  return (
    <section id="core-philosophy" className="scroll-mt-24">
      <div className="flex flex-col gap-4">
        <Eyebrow className="text-brand">Core Philosophy</Eyebrow>
        <p className="font-serif text-2xl leading-snug text-balance sm:text-3xl">{philosophy}</p>
        <GreatMindsTakeaway text={takeaway} />
      </div>
    </section>
  );
}

export { GreatMindsCorePhilosophy };
