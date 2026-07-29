import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("capital-markets-for-business-analysts");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/capital-markets-for-business-analysts" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/capital-markets-for-business-analysts",
    images: ["/opengraph-image"],
  },
};

export default function CapitalMarketsForBusinessAnalystsPage() {
  return <LearningPage page={page} />;
}
