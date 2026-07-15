import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LabList } from "@/components/labs/lab-list";
import { getAllTools } from "@/lib/tools";

const description =
  "5 live, browser-based tools for capital markets and business analysis.";

export const metadata: Metadata = {
  title: "Tools",
  description,
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    title: "Tools",
    description,
    url: "/tools",
    images: ["/opengraph-image"],
  },
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title="Tools"
        description="5 live, browser-based tools you can use right now."
      />
      <Section>
        <Container>
          <LabList labs={tools} />
        </Container>
      </Section>
    </>
  );
}
