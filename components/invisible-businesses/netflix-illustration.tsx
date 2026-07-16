"use client";

import { Clapperboard, CreditCard, Film, History, Sparkles, Target, Zap } from "lucide-react";

import { BusinessStoryIllustration } from "@/components/invisible-businesses/business-story-illustration";

function NetflixIllustration() {
  return (
    <BusinessStoryIllustration
      centerNode={{ label: "Netflix", icon: Clapperboard }}
      nodes={[
        { label: "Original Content", icon: Film },
        { label: "Recommendation Engine", icon: Target },
        { label: "UX", icon: Zap },
        { label: "Personalization", icon: Sparkles },
        { label: "Viewing History", icon: History },
        { label: "Subscriptions", icon: CreditCard },
      ]}
      outcome="Higher Retention"
      caption="The more you watch, the better it gets at keeping you watching."
    />
  );
}

export { NetflixIllustration };
