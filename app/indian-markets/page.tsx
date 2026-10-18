import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";
import { pageTitle } from "@/lib/seo";

const page = getSeoLearningPage("indian-markets");

export const metadata: Metadata = {
  title: pageTitle(page.seoTitle),
  description: page.seoDescription,
  alternates: { canonical: "/indian-markets" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/indian-markets",
    images: ["/opengraph-image"],
  },
};

export default function IndianMarketsPage() {
  return <LearningPage page={page} />;
}
