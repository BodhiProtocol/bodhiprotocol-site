import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("acceptance-criteria-examples");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/acceptance-criteria-examples" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/acceptance-criteria-examples",
    images: ["/opengraph-image"],
  },
};

export default function AcceptanceCriteriaExamplesPage() {
  return <LearningPage page={page} />;
}
