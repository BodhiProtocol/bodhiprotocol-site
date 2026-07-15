import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/layout/hero";
import { FeaturedEssays } from "@/components/home/featured-essays";
import { FeaturedBlueprints } from "@/components/home/featured-blueprints";
import { FeaturedLabs } from "@/components/home/featured-labs";
import { KnowledgeMap } from "@/components/home/knowledge-map";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="BodhiProtocol"
        title="Understand Complex Systems."
        description="Essays. Visual Learning. Interactive Tools."
        actions={
          <>
            <Button nativeButton={false} render={<Link href="/essays" />}>
              Explore Essays
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/tools" />}
            >
              Explore Tools
            </Button>
          </>
        }
      />
      <Container className="pb-16 sm:pb-24">
        <KnowledgeMap />
      </Container>
      <FeaturedEssays />
      <FeaturedBlueprints />
      <FeaturedLabs />
    </>
  );
}
