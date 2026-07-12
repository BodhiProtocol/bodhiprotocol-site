import { Container } from "@/components/ui/container";
import { LabCard } from "@/components/ui/lab-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/home/section-heading";
import { featuredLabs } from "@/lib/featured-content";

function FeaturedLabs() {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <SectionHeading title="Featured Labs" href="/labs" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLabs.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { FeaturedLabs };
