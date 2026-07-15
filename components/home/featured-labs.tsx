import { Container } from "@/components/ui/container";
import { LabCard } from "@/components/ui/lab-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/home/section-heading";
import { getAllTools } from "@/lib/tools";

function FeaturedLabs() {
  const tools = getAllTools().slice(0, 3);

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <SectionHeading title="Featured Tools" href="/tools" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <LabCard key={tool.slug} lab={tool} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { FeaturedLabs };
