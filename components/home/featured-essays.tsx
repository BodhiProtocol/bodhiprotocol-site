import { ArticleCard } from "@/components/ui/article-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/home/section-heading";
import { featuredEssays } from "@/lib/featured-content";

function FeaturedEssays() {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <SectionHeading title="Featured Essays" href="/essays" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEssays.map((essay) => (
            <ArticleCard key={essay.slug} essay={essay} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { FeaturedEssays };
