import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BlueprintList } from "@/components/lighthouse/blueprint-list";
import { getAllBlueprints } from "@/lib/blueprints";

const description =
  "Visual-metaphor blueprints that break down the core concepts behind AI, capital markets, business analysis, decision making, and economics.";

export const metadata: Metadata = {
  title: "Project Lighthouse",
  description,
  alternates: { canonical: "/lighthouse" },
  openGraph: {
    type: "website",
    title: "Project Lighthouse",
    description,
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
      <Section>
        <Container>
          <BlueprintList blueprints={blueprints} />
        </Container>
      </Section>
    </>
  );
}
