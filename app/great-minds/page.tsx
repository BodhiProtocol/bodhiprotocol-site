import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { GreatMindsCard } from "@/components/great-minds/great-minds-card";
import { getAllGreatMinds } from "@/lib/great-minds";

const description =
  "Not biographies — thinking. How history's greatest minds actually reasoned, connected ideas, and solved problems, one figure at a time.";

export const metadata: Metadata = {
  title: "Great Minds",
  description,
  alternates: { canonical: "/great-minds" },
  openGraph: {
    type: "website",
    title: "Great Minds",
    description,
    url: "/great-minds",
    images: ["/opengraph-image"],
  },
};

export default function GreatMindsPage() {
  const minds = getAllGreatMinds();

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent)]" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
          <Eyebrow className="text-brand">Not biography — thinking</Eyebrow>
          <h1 className="max-w-3xl font-serif text-5xl font-medium tracking-tight text-balance sm:text-7xl">
            Great Minds
          </h1>
          <p className="max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
            Not what they achieved — how they thought. Each figure gets one visual metaphor for the
            way their mind actually worked, plus the mental models you can borrow for your own.
          </p>
        </Container>
      </div>
      <Section>
        <Container>
          {minds.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {minds.map((mind) => (
                <GreatMindsCard key={mind.slug} mind={mind} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">The first mind is coming soon.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
