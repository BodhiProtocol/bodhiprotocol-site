import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";
import { pageTitle } from "@/lib/seo";

const page = getSeoLearningPage("capital-markets-business-analyst");

export const metadata: Metadata = {
  title: pageTitle(page.seoTitle),
  description: page.seoDescription,
  alternates: { canonical: "/capital-markets-business-analyst" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/capital-markets-business-analyst",
    images: ["/opengraph-image"],
  },
};

export default function CapitalMarketsBusinessAnalystPage() {
  return <LearningPage page={page} />;
}
