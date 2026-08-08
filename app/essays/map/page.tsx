import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Waypoints } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Muted } from "@/components/ui/typography";
import { Divider } from "@/components/ui/divider";
import { ConceptMap } from "@/components/essays/concept-map";
import { JsonLd } from "@/components/shared/json-ld";
import { getConceptMapData } from "@/lib/concept-map";
import { siteConfig } from "@/lib/site-config";

const description =
  "Every essay as one connected network — seven reading lines, and the interchanges where one idea reappears inside another.";

export const metadata: Metadata = {
  title: "The Concept Map",
  description,
  alternates: { canonical: "/essays/map" },
  openGraph: {
    type: "website",
    title: "The Concept Map",
    description,
    url: "/essays/map",
    images: ["/essays/map/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Concept Map",
    description,
    images: ["/essays/map/opengraph-image"],
  },
};

export default function EssayConceptMapPage() {
  const data = getConceptMapData();
  const { arcs, bridges, totals } = data;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Essays",
        item: `${siteConfig.url}/essays`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "The Concept Map",
        item: `${siteConfig.url}/essays/map`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHeader
        eyebrow="Essays"
        title="The Concept Map"
        description={description}
      />

      <Section className="pt-10 sm:pt-12">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>{totals.essays} essays</span>
                <span aria-hidden="true">·</span>
                <span>{totals.arcs} lines</span>
                <span aria-hidden="true">·</span>
                <span>{totals.bridges} interchanges</span>
                <span aria-hidden="true">·</span>
                <span>{totals.minutes} min end to end</span>
              </div>
              <Muted className="text-sm text-pretty">
                Each line is a reading order — follow one left to right and every
                essay builds on the one before it. The dashed curves are
                interchanges: two essays on different lines that run on the same
                idea. Hover a station to see why they connect.
              </Muted>
            </div>

            <ConceptMap data={data} />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Divider />
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg leading-snug font-medium">
                The interchanges
              </h2>
              <Muted className="text-sm text-pretty">
                Every cross-line connection on the map, written out.
              </Muted>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {bridges.map((bridge) => (
                <li key={`${bridge.from.slug}-${bridge.to.slug}`}>
                  <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4">
                    <span className="flex items-start gap-2">
                      <Waypoints
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                      />
                      <span className="text-sm leading-snug text-pretty">
                        {bridge.label}
                      </span>
                    </span>
                    <span className="mt-auto flex flex-wrap items-center gap-1.5 font-mono text-xs">
                      <Link
                        href={`/essays/${bridge.from.slug}`}
                        className="text-muted-foreground underline-offset-4 hover:text-brand hover:underline"
                      >
                        {bridge.from.title}
                      </Link>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3 shrink-0 text-brand"
                      />
                      <Link
                        href={`/essays/${bridge.to.slug}`}
                        className="text-muted-foreground underline-offset-4 hover:text-brand hover:underline"
                      >
                        {bridge.to.title}
                      </Link>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <Divider />

            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-lg leading-snug font-medium">
                The lines
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {arcs.map((arc) => (
                  <li key={arc.id}>
                    <Link
                      href={`/essays/${arc.essays[0]?.slug ?? ""}`}
                      className="group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/15"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-1 w-6 shrink-0 rounded-full"
                          style={{ backgroundColor: arc.color }}
                        />
                        <span className="font-heading text-sm leading-snug font-medium text-balance group-hover:text-brand">
                          {arc.title}
                        </span>
                      </span>
                      <Muted className="text-xs text-pretty">{arc.blurb}</Muted>
                      <Muted className="mt-auto pt-1 font-mono text-[0.7rem]">
                        {arc.essays.length}{" "}
                        {arc.essays.length === 1 ? "part" : "parts"}
                        {arc.minutes > 0 ? ` · ${arc.minutes} min` : ""}
                      </Muted>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/essays"
              className="group flex w-fit items-center gap-1.5 font-mono text-xs text-brand"
            >
              Browse all essays instead
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
