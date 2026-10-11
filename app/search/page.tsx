import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SearchResults } from "@/components/layout/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search BodhiProtocol essays, Lighthouse blueprints, tools, simulators, and learning resources.",
  alternates: { canonical: "/search" },
  // Internal search results are per-query and thin — keep them crawlable (so
  // Google can see this tag) but out of the index, per Google's own guidance
  // on site search result pages.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Search BodhiProtocol"
        description="Find essays, Lighthouse blueprints, tools, simulators, and resources across the site."
      />
      <Section>
        <Container className="flex flex-col gap-8">
          <Suspense>
            <SearchResults />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
