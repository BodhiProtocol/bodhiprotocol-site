import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ResourceList } from "@/components/library/resource-list";
import { getAllResources } from "@/lib/resources";
import { pageTitle } from "@/lib/seo";

const description =
  "A curated library of the books, papers, and courses worth your time on AI, capital markets, business analysis, decision making, and economics — each with a note on why.";

export const metadata: Metadata = {
  title: pageTitle("Library: Best Books on AI, Markets and Business Analysis"),
  description,
  alternates: { canonical: "/library" },
  openGraph: {
    type: "website",
    title: "Library",
    description,
    url: "/library",
    images: ["/opengraph-image"],
  },
};

export default function LibraryPage() {
  const resources = getAllResources();

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Library"
        description="The books, papers, and courses actually worth your time — and, more importantly, why."
      />
      <Section>
        <Container>
          <Suspense fallback={null}>
            <ResourceList resources={resources} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
