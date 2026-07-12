import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Hero } from "@/components/layout/hero";
import { FeaturedEssays } from "@/components/home/featured-essays";
import { FeaturedBlueprints } from "@/components/home/featured-blueprints";
import { FeaturedLabs } from "@/components/home/featured-labs";
import { NewsletterCta } from "@/components/home/newsletter-cta";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="BodhiProtocol"
        title="Understand Complex Systems."
        description="Essays. Visual Learning. Interactive Labs."
        actions={
          <>
            <Button nativeButton={false} render={<Link href="/essays" />}>
              Explore Essays
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/labs" />}
            >
              Explore Labs
            </Button>
          </>
        }
      />
      <FeaturedEssays />
      <FeaturedBlueprints />
      <FeaturedLabs />
      <NewsletterCta />
    </>
  );
}
