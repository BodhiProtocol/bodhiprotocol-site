import readingTime from "reading-time";

import type { Playbook } from "@/types/content";
import { primeiraUserStory } from "@/content/ba-playbooks-pt-br/primeira-user-story";
import { comoEscreverCriteriosDeAceitacao } from "@/content/ba-playbooks-pt-br/como-escrever-criterios-de-aceitacao";
import { cicloDeVidaDaOperacao } from "@/content/ba-playbooks-pt-br/ciclo-de-vida-da-operacao";
import { doisSistemasMostramNumerosDiferentes } from "@/content/ba-playbooks-pt-br/dois-sistemas-mostram-numeros-diferentes";

// Same array-of-modules pattern as lib/ba-playbooks.ts. Add a new
// content/ba-playbooks-pt-br/<slug>.ts module and an entry here once a
// translation is ready to publish; pair it in lib/ba-playbooks-i18n.ts too.
const playbookEntries: Omit<Playbook, "readingTime">[] = [
  primeiraUserStory,
  comoEscreverCriteriosDeAceitacao,
  cicloDeVidaDaOperacao,
  doisSistemasMostramNumerosDiferentes,
];

function withReadingTime(guide: Omit<Playbook, "readingTime">): Playbook {
  const text = [
    ...(guide.intro ?? []),
    guide.bodyText ?? "",
    guide.closingBody ?? "",
    ...guide.hacks.flatMap((hack) => [
      hack.title,
      hack.insight,
      hack.explanation ?? "",
      hack.whyItHelps,
      hack.whenToUse ?? "",
      hack.template ?? "",
      ...(hack.templates?.map((template) => template.value) ?? []),
      hack.proTip ?? "",
    ]),
  ].join(" ");

  // The reading-time package only formats its .text output in English, so
  // build the Portuguese label from its raw .minutes figure instead.
  const minutes = Math.max(1, Math.ceil(readingTime(text).minutes));
  return { ...guide, readingTime: `${minutes} min de leitura` };
}

export function getAllPlaybooksPtBr(): Playbook[] {
  return playbookEntries
    .map(withReadingTime)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPlaybookPtBrSlugs(): string[] {
  return playbookEntries.map((guide) => guide.slug);
}

export function getPlaybookPtBrBySlug(slug: string): Playbook | undefined {
  const entry = playbookEntries.find((guide) => guide.slug === slug);
  return entry ? withReadingTime(entry) : undefined;
}
