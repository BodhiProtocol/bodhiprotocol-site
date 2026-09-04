import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("sql-for-business-analysts");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/sql-for-business-analysts" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/sql-for-business-analysts",
    images: ["/opengraph-image"],
  },
};

export default function SqlForBusinessAnalystsPage() {
  return <LearningPage page={page} />;
}
