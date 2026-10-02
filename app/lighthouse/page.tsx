import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlueprintList } from "@/components/lighthouse/blueprint-list";
import { SuggestedPath } from "@/components/lighthouse/suggested-path";
import { getAllBlueprints } from "@/lib/blueprints";

const seoTitle = "Project Lighthouse: Business Analyst Blueprints for Capital Markets & AI";
const seoDescription =
  "Business analyst blueprints that turn AI, capital markets, decision-making, and economics concepts into one memorable visual metaphor each.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: "/lighthouse" },
  openGraph: {
    type: "website",
    title: seoTitle,
    description: seoDescription,
    url: "/lighthouse",
    images: ["/opengraph-image"],
  },
};

export default function LighthousePage() {
  const blueprints = getAllBlueprints();

  return (
    <>
      <PageHeader
        eyebrow="Project Lighthouse"
        title="Project Lighthouse"
        description="Every hard concept, reduced to the one metaphor that makes it click."
      />
      <SuggestedPath />
      <Section>
        <Container>
          <BlueprintList blueprints={blueprints} />
        </Container>
      </Section>
    </>
  );
}
