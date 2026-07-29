import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("business-analyst-interview-questions");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/business-analyst-interview-questions" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/business-analyst-interview-questions",
    images: ["/opengraph-image"],
  },
};

export default function BusinessAnalystInterviewQuestionsPage() {
  return <LearningPage page={page} />;
}
