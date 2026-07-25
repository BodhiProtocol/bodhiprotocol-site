import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function MarginaliaMark() {
  return (
    <svg width="20" height="46" viewBox="0 0 20 46" aria-hidden="true" className="shrink-0">
      <line x1="0" y1="4" x2="20" y2="4" className="stroke-border" strokeWidth="1.5" />
      <line x1="0" y1="22" x2="20" y2="22" className="stroke-border" strokeWidth="1.5" />
      <line x1="0" y1="41" x2="20" y2="41" className="stroke-brand" strokeWidth="2" />
    </svg>
  );
}

function SuggestedPathTeaser() {
  return (
    <Section className="bg-brand/5 py-16 sm:py-20">
      <Container className="flex max-w-2xl items-center gap-4">
        <MarginaliaMark />
        <div>
          <p className="font-serif text-xl leading-snug text-balance italic sm:text-2xl">
            Learn. Prepare. Break into investment banking.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Essays, tools and guidance from across the site, arranged into one path.
          </p>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/lighthouse#suggested-path" />}
            className="mt-4 h-auto gap-1.5 px-0 text-brand hover:bg-transparent hover:text-brand"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/button:border-current">
              See the suggested path
            </span>
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export { SuggestedPathTeaser };
