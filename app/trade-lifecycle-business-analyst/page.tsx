import type { Metadata } from "next";

import { LearningPage } from "@/components/seo/learning-page";
import { getSeoLearningPage } from "@/lib/seo-learning-pages";

const page = getSeoLearningPage("trade-lifecycle-business-analyst");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: "/trade-lifecycle-business-analyst" },
  openGraph: {
    type: "article",
    title: page.seoTitle,
    description: page.seoDescription,
    url: "/trade-lifecycle-business-analyst",
    images: ["/opengraph-image"],
  },
};

export default function TradeLifecycleBusinessAnalystPage() {
  return <LearningPage page={page} />;
}
