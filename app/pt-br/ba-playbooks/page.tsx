import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, H1, H2, Lead } from "@/components/ui/typography";
import { PlaybookCard } from "@/components/ba-playbooks/playbook-card";
import { getAllPlaybooksPtBr } from "@/lib/ba-playbooks-pt-br";

const description =
  "Guias práticos para quem trabalha com requisitos, Jira, User Stories, APIs, processos, dados e stakeholders.";

export const metadata: Metadata = {
  title: "BA Playbooks em Português — Guias Práticos para BAs",
  description,
  alternates: {
    canonical: "/pt-br/ba-playbooks",
    languages: {
      en: "/ba-playbooks",
      "pt-BR": "/pt-br/ba-playbooks",
      pt: "/pt-br/ba-playbooks",
      "x-default": "/ba-playbooks",
    },
  },
  openGraph: {
    type: "website",
    title: "BA Playbooks em Português — Guias Práticos para BAs",
    description,
    url: "/pt-br/ba-playbooks",
    locale: "pt_BR",
    images: ["/opengraph-image"],
  },
};

export default function PlaybooksPtBrPage() {
  const guides = getAllPlaybooksPtBr();

  return (
    <>
      <Section className="pt-16 pb-0 sm:pt-24">
        <Container>
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow className="text-brand">BodhiProtocol</Eyebrow>
            <H1>Business Analysis, sem complicação.</H1>
            <Lead>{description}</Lead>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-8">
          <H2 className="text-2xl sm:text-3xl">Guias em português</H2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <PlaybookCard key={guide.slug} guide={guide} practicesLabel="práticas" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Todos os guias do BA Playbooks estão disponíveis em português. Se preferir, a mesma
            biblioteca também está disponível{" "}
            <Link href="/ba-playbooks" className="font-medium text-brand hover:underline">
              em inglês
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
