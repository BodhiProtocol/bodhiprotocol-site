import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EssayList } from "@/components/essays/essay-list";
import { getAllEssays } from "@/lib/essays";

const description =
  "Essays on artificial intelligence, capital markets, business analysis, decision making, and economics.";

export const metadata: Metadata = {
  title: "Essays",
  description,
  alternates: { canonical: "/essays" },
  openGraph: {
    type: "website",
    title: "Essays",
    description,
    url: "/essays",
    images: ["/opengraph-image"],
  },
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <>
      <PageHeader
        eyebrow="Essays"
        title="Essays"
        description="Writing on AI, capital markets, business analysis, decision making, and economics."
      />
      <Section>
        <Container>
          <EssayList essays={essays} />
        </Container>
      </Section>
    </>
  );
}
