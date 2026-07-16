import type { ComponentType } from "react";

import { AppleIllustration } from "@/components/invisible-businesses/apple-illustration";
import { NetflixIllustration } from "@/components/invisible-businesses/netflix-illustration";

interface IBIllustrationConfig {
  component: ComponentType;
  wide?: boolean;
}

export const ibIllustrations: Record<string, IBIllustrationConfig> = {
  "netflix-doesnt-sell-movies": { component: NetflixIllustration },
  "apple-doesnt-sell-phones": { component: AppleIllustration, wide: true },
};
