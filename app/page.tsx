import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            <Button
              nativeButton={false}
              render={<Link href="/essays" />}
              className="h-11 rounded-full px-7 shadow-sm duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Essays
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/tools" />}
              className="h-11 gap-1.5 px-3 text-muted-foreground duration-200 hover:bg-transparent"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/button:border-current">
                Explore Tools
              </span>
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
            </Button>
          </>
        }
      />
      <Container className="hero-enter pb-16 sm:pb-24 [animation-delay:480ms]">
        <KnowledgeMap />
      </Container>
      <FeaturedEssays />
      <FeaturedBlueprints />
      <FeaturedLabs />
    </>
  );
}
