import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("user-story-examples-business-analyst");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/user-story-examples-business-analyst" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/user-story-examples-business-analyst",
    images: ["/opengraph-image"],
  },
};

export default function UserStoryExamplesBusinessAnalystPage() {
  return <LearningPage page={page} />;
}
