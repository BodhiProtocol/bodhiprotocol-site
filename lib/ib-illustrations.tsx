import type { ComponentType } from "react";

import { AppleIllustration } from "@/components/invisible-businesses/apple-illustration";
import { NetflixIllustration } from "@/components/invisible-businesses/netflix-illustration";

export const ibIllustrations: Record<string, ComponentType> = {
  "netflix-doesnt-sell-movies": NetflixIllustration,
  "apple-doesnt-sell-phones": AppleIllustration,
};
