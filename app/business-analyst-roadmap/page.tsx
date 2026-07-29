import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("business-analyst-roadmap");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/business-analyst-roadmap" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/business-analyst-roadmap",
    images: ["/opengraph-image"],
  },
};

export default function BusinessAnalystRoadmapPage() {
  return <LearningPage page={page} />;
}
