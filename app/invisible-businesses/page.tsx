import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { IBCard } from "@/components/invisible-businesses/ib-card";
import { getAllInvisibleBusinesses } from "@/lib/invisible-businesses";

const description =
  "Great companies rarely sell what people think they sell. Discover the invisible business models behind the world's most successful companies.";

export const metadata: Metadata = {
  title: "Invisible Businesses",
  description,
  alternates: { canonical: "/invisible-businesses" },
  openGraph: {
    type: "website",
    title: "Invisible Businesses",
    description,
    url: "/invisible-businesses",
    images: ["/opengraph-image"],
  },
};

export default function InvisibleBusinessesPage() {
  const episodes = getAllInvisibleBusinesses();

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent)]" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
          <Eyebrow className="text-brand">A new kind of story</Eyebrow>
          <h1 className="max-w-3xl font-serif text-5xl font-medium tracking-tight text-balance sm:text-7xl">
            Invisible Businesses
          </h1>
          <p className="max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
            Great companies rarely sell what people think they sell. Discover the
            invisible business models behind the world&apos;s most successful companies.
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          {episodes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <IBCard key={episode.slug} episode={episode} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              The first episode is coming soon.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
