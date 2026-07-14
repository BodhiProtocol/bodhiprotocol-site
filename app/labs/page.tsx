import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LabList } from "@/components/labs/lab-list";
import { getAllLabs } from "@/lib/labs";

const description =
  "Interactive tools for AI, capital markets, and business analysis — live, browser-based, and open source.";

export const metadata: Metadata = {
  title: "Labs",
  description,
  alternates: { canonical: "/labs" },
  openGraph: {
    type: "website",
    title: "Labs",
    description,
    url: "/labs",
    images: ["/opengraph-image"],
  },
};

export default function LabsPage() {
  const labs = getAllLabs();

  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="Labs"
        description="Interactive tools you can use right now — live, browser-based, and open source."
      />
      <Section>
        <Container>
          <LabList labs={labs} />
        </Container>
      </Section>
    </>
  );
}
