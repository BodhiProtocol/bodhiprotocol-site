"use client";

import { CreditCard, Cloud, Headphones, Laptop, Smartphone, Tv, Watch } from "lucide-react";

import { BusinessStoryIllustration } from "@/components/invisible-businesses/business-story-illustration";

function AppleIllustration() {
  return (
    <BusinessStoryIllustration
      centerNode={{ label: "iPhone", icon: Smartphone }}
      nodes={[
        { label: "Apple Watch", icon: Watch },
        { label: "AirPods", icon: Headphones },
        { label: "MacBook", icon: Laptop },
        { label: "iCloud", icon: Cloud },
        { label: "Apple TV", icon: Tv },
        { label: "Apple Pay", icon: CreditCard },
      ]}
      outcome="Higher Switching Cost"
      caption="Every new Apple device raises the cost of ever leaving."
    />
  );
}

export { AppleIllustration };
