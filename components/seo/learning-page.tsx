import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/shared/json-ld";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H2, H3, Muted, P } from "@/components/ui/typography";
import { siteConfig } from "@/lib/site-config";
import type { SeoLearningPage } from "@/lib/seo-learning-pages";

function LearningPage({ page }: { page: SeoLearningPage }) {
  const learningJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: page.title,
    description: page.seoDescription,
    url: `${siteConfig.url}/${page.slug}`,
    creator: {
      "@type": "Person",
      name: "Surya",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    educationalLevel: "Beginner to Intermediate",
    learningResourceType: "Roadmap",
    about: page.title,
  };

  const faqJsonLd = page.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={learningJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <PageHeader eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="flex max-w-3xl flex-col gap-14">
            <div className="flex flex-col gap-4">
              {page.intro.map((paragraph) => (
                <P key={paragraph} className="text-lg text-muted-foreground">
                  {paragraph}
                </P>
              ))}
            </div>

            {page.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-4">
                <H2>{section.title}</H2>
                {section.paragraphs?.map((paragraph) => (
                  <P key={paragraph}>{paragraph}</P>
                ))}
                {section.items ? (
                  <ul className="grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {page.faqs ? (
              <section className="flex flex-col gap-5">
                <H2>FAQ</H2>
                <div className="grid gap-5">
                  {page.faqs.map((faq) => (
                    <div key={faq.question} className="border-t border-border pt-5">
                      <H3 className="text-xl sm:text-2xl">{faq.question}</H3>
                      <P className="mt-2 text-muted-foreground">{faq.answer}</P>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
              <div>
                <H3 className="text-xl sm:text-2xl">Related learning</H3>
                <Muted className="mt-1">Keep building the topic cluster.</Muted>
              </div>
              <div className="grid gap-3">
                {page.related.map((item) => {
                  const isExternal = item.href.startsWith("http");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="group rounded-md border border-border p-4 transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center justify-between gap-3 font-heading text-sm font-medium">
                        {item.label}
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </span>
                      <Muted className="mt-1">{item.description}</Muted>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

export { LearningPage };
