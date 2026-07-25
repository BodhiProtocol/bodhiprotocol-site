import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LearningLedger } from "@/components/navigator/learning-ledger";
import { NavigatorFooterCta } from "@/components/navigator/navigator-footer-cta";

const description = "Learn. Prepare. Break into investment banking.";

export const metadata: Metadata = {
  title: "Navigator",
  description,
  alternates: { canonical: "/navigator" },
  openGraph: {
    type: "website",
    title: "Navigator",
    description,
    url: "/navigator",
    images: ["/opengraph-image"],
  },
};

export default function NavigatorPage() {
  return (
    <>
      <PageHeader eyebrow="Navigator" title="Navigator" description={description} />
      <Section className="pt-10 sm:pt-12">
        <Container className="max-w-2xl">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Capital-markets business analysis sits at an odd intersection — enough finance to need
            real fluency in trades, settlement and risk; enough technology to need the same rigor
            a systems analyst brings anywhere else. Most guidance for breaking into the field
            teaches one half or the other. Navigator uses the essays, tools and explanations
            already built into this site, arranged into a single order, to teach both.
          </p>
          <div className="mt-12">
            <LearningLedger />
          </div>
          <NavigatorFooterCta />
        </Container>
      </Section>
    </>
  );
}
