import { BlueprintCard } from "@/components/ui/blueprint-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/home/section-heading";
import { getAllBlueprints } from "@/lib/blueprints";

function FeaturedBlueprints() {
  const blueprints = getAllBlueprints().slice(0, 3);

  return (
    <Section className="bg-muted/30">
      <Container className="flex flex-col gap-8">
        <SectionHeading title="Project Lighthouse" href="/lighthouse" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blueprints.map((blueprint) => (
            <BlueprintCard key={blueprint.slug} blueprint={blueprint} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { FeaturedBlueprints };
