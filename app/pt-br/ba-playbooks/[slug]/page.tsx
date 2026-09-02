import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Divider } from "@/components/ui/divider";
import { P } from "@/components/ui/typography";
import { AudienceList } from "@/components/ba-playbooks/audience-list";
import { PlaybookHero } from "@/components/ba-playbooks/playbook-hero";
import { PlaybookMeta } from "@/components/ba-playbooks/playbook-meta";
import { PlaybookProgress, PlaybookProgressBar } from "@/components/ba-playbooks/playbook-progress";
import { HackCard } from "@/components/ba-playbooks/hack-card";
import { PlaybookEnding } from "@/components/ba-playbooks/playbook-ending";
import { QuemEODonoDoRequisitoBody } from "@/components/ba-playbooks/quem-e-o-dono-do-requisito-body";
import { ReleaseEAmanhaORequisitoMudouHojeBody } from "@/components/ba-playbooks/a-release-e-amanha-o-requisito-mudou-hoje-body";
import { TodoMundoQuerUmaCoisaDiferenteBody } from "@/components/ba-playbooks/todo-mundo-quer-uma-coisa-diferente-body";
import { OQueOBaDeveChecarAntesDaUatBody } from "@/components/ba-playbooks/o-que-o-ba-deve-checar-antes-da-uat-body";
import { AStoryFoiArrastadaPorQuatroSprintsBody } from "@/components/ba-playbooks/a-story-foi-arrastada-por-quatro-sprints-body";
import { OQueFrontOfficeMiddleOfficeEBackOfficeFazemBody } from "@/components/ba-playbooks/o-que-front-office-middle-office-e-back-office-fazem-body";
import { NinguemConsegueReproduzirOProblemaEmProducaoBody } from "@/components/ba-playbooks/ninguem-consegue-reproduzir-o-problema-em-producao-body";
import { FuncionouNaUatPorQueFalhouEmProducaoBody } from "@/components/ba-playbooks/funcionou-na-uat-por-que-falhou-em-producao-body";
import { JsonLd } from "@/components/shared/json-ld";
import { getPlaybookPtBrBySlug, getPlaybookPtBrSlugs } from "@/lib/ba-playbooks-pt-br";
import { getEnSlugForPtBrSlug } from "@/lib/ba-playbooks-i18n";
import { siteConfig } from "@/lib/site-config";

interface PlaybookPtBrPageProps {
  params: Promise<{ slug: string }>;
}

// Playbooks whose body is a narrative walkthrough rather than standalone
// numbered hacks render bespoke prose here instead of the hacks card list —
// mirrors the customPlaybookBodies registry in app/ba-playbooks/[slug]/page.tsx.
const customPlaybookBodies: Partial<Record<string, () => ReactNode>> = {
  "quem-e-o-dono-do-requisito": QuemEODonoDoRequisitoBody,
  "a-release-e-amanha-o-requisito-mudou-hoje": ReleaseEAmanhaORequisitoMudouHojeBody,
  "todo-mundo-quer-uma-coisa-diferente": TodoMundoQuerUmaCoisaDiferenteBody,
  "o-que-o-ba-deve-checar-antes-da-uat": OQueOBaDeveChecarAntesDaUatBody,
  "a-story-foi-arrastada-por-quatro-sprints": AStoryFoiArrastadaPorQuatroSprintsBody,
  "o-que-front-office-middle-office-e-back-office-fazem": OQueFrontOfficeMiddleOfficeEBackOfficeFazemBody,
  "ninguem-consegue-reproduzir-o-problema-em-producao": NinguemConsegueReproduzirOProblemaEmProducaoBody,
  "funcionou-na-uat-por-que-falhou-em-producao": FuncionouNaUatPorQueFalhouEmProducaoBody,
};

export function generateStaticParams() {
  return getPlaybookPtBrSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PlaybookPtBrPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPlaybookPtBrBySlug(slug);
  if (!guide) return {};

  const seoTitle = guide.seoTitle ?? guide.title;
  const seoDescription = guide.seoDescription ?? guide.description;
  const enSlug = getEnSlugForPtBrSlug(slug);

  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name: guide.author }],
    alternates: {
      canonical: `/pt-br/ba-playbooks/${guide.slug}`,
      languages: enSlug
        ? {
            en: `/ba-playbooks/${enSlug}`,
            "pt-BR": `/pt-br/ba-playbooks/${guide.slug}`,
            "x-default": `/ba-playbooks/${enSlug}`,
          }
        : undefined,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: guide.date,
      tags: guide.tags,
      url: `/pt-br/ba-playbooks/${guide.slug}`,
      locale: "pt_BR",
      images: [`/pt-br/ba-playbooks/${guide.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`/pt-br/ba-playbooks/${guide.slug}/opengraph-image`],
    },
  };
}

export default async function PlaybookPtBrPage({ params }: PlaybookPtBrPageProps) {
  const { slug } = await params;
  const guide = getPlaybookPtBrBySlug(slug);
  if (!guide) notFound();

  const guideUrl = `${siteConfig.url}/pt-br/ba-playbooks/${guide.slug}`;
  const CustomBody = customPlaybookBodies[guide.slug];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${guideUrl}/opengraph-image`,
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: guide.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": guideUrl },
    url: guideUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "BA Playbooks",
        item: `${siteConfig.url}/pt-br/ba-playbooks`,
      },
      { "@type": "ListItem", position: 3, name: guide.title, item: guideUrl },
    ],
  };

  return (
    <Section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <div className={CustomBody ? "flex justify-center" : "grid gap-12 lg:grid-cols-[1fr_240px]"}>
          <article className={CustomBody ? "flex min-w-0 max-w-3xl flex-col gap-8" : "flex min-w-0 flex-col gap-8"}>
            <PlaybookHero guide={guide} eyebrow="Guia BA" />
            <div className="flex max-w-2xl flex-col gap-3">
              <PlaybookMeta guide={guide} locale="pt-BR" practicesLabel="práticas" />
              {guide.audience?.length ? (
                <AudienceList audience={guide.audience} prefix="Para " andWord="e" />
              ) : null}
              {!CustomBody && guide.intro?.length ? (
                <P className="text-muted-foreground">{guide.intro.join(" ")}</P>
              ) : null}
            </div>
            {CustomBody ? (
              <CustomBody />
            ) : (
              <>
                <PlaybookProgressBar hacks={guide.hacks} jumpAriaPrefix="Ir para o passo" />
                <div className="flex flex-col gap-4">
                  {guide.hacks.map((hack) => (
                    <HackCard
                      key={hack.number}
                      hack={hack}
                      itemLabel={guide.itemLabel}
                      labels={{
                        flow: "O fluxo",
                        compare: "Comparação",
                        checklist: "Checklist",
                        bulletList: "Resumo",
                        whyItHelps: "Por que isso ajuda",
                        whenToUse: "Quando usar",
                        proTipPrefix: "Dica — ",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            <Divider />
            <PlaybookEnding
              guide={guide}
              url={guideUrl}
              labels={{
                eyebrow: "Leve isso com você",
                reusableTemplate: "Modelo reutilizável",
                copyTemplate: "Copiar modelo",
                newsletterCta: "Receba novos guias em primeira mão.",
                saveButton: "Salvar este BA Playbook",
                shareLabel: "Compartilhar playbook",
                copiedLabel: "Link copiado",
                copiedSrLabel: "Link copiado para a área de transferência",
                newsletterPlaceholder: "voce@email.com",
                newsletterAriaLabel: "Endereço de e-mail",
                newsletterButtonLabel: "Assinar",
                newsletterLoadingLabel: "Enviando...",
                newsletterSuccessMessage: "Você está na lista.",
                newsletterErrorFallback: "Algo deu errado. Tente novamente.",
              }}
            />
          </article>
          {!CustomBody ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PlaybookProgress hacks={guide.hacks} label="Neste guia" />
              </div>
            </aside>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
