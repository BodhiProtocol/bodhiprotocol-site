import readingTime from "reading-time";

import type { Playbook } from "@/types/content";
import { primeiraUserStory } from "@/content/ba-playbooks-pt-br/primeira-user-story";
import { comoEscreverCriteriosDeAceitacao } from "@/content/ba-playbooks-pt-br/como-escrever-criterios-de-aceitacao";
import { dicasDeJiraParaAnalistasDeNegocios } from "@/content/ba-playbooks-pt-br/dicas-de-jira-para-analistas-de-negocios";
import { guiaDeLevantamentoDeRequisitos } from "@/content/ba-playbooks-pt-br/guia-de-levantamento-de-requisitos";
import { primeiraVezTrabalhandoComUmaApi } from "@/content/ba-playbooks-pt-br/primeira-vez-trabalhando-com-uma-api";
import { doisSistemasMostramNumerosDiferentes } from "@/content/ba-playbooks-pt-br/dois-sistemas-mostram-numeros-diferentes";
import { requisitoParaMudancaRegulatoria } from "@/content/ba-playbooks-pt-br/requisito-para-mudanca-regulatoria";
import { cicloDeVidaDaOperacao } from "@/content/ba-playbooks-pt-br/ciclo-de-vida-da-operacao";
import { oStakeholderSumiuNoMeioDaUat } from "@/content/ba-playbooks-pt-br/o-stakeholder-sumiu-no-meio-da-uat";
import { doisPmsDuasPrioridadesDiferentes } from "@/content/ba-playbooks-pt-br/dois-pms-duas-prioridades-diferentes";
import { guiaDeRastreamentoFrontToBack } from "@/content/ba-playbooks-pt-br/guia-de-rastreamento-front-to-back";
import { oRequisitoMudouNoMeioDaSprint } from "@/content/ba-playbooks-pt-br/o-requisito-mudou-no-meio-da-sprint";
import { oBatchRodouComSucessoPorQueOsDadosSumiram } from "@/content/ba-playbooks-pt-br/o-batch-rodou-com-sucesso-por-que-os-dados-sumiram";
import { aStoryEstaProntaPorQueNaoConseguimosLiberar } from "@/content/ba-playbooks-pt-br/a-story-esta-pronta-por-que-nao-conseguimos-liberar";
import { defeitoOuComportamentoEsperado } from "@/content/ba-playbooks-pt-br/defeito-ou-comportamento-esperado";
import { quemEODonoDoRequisito } from "@/content/ba-playbooks-pt-br/quem-e-o-dono-do-requisito";
import { releaseEAmanhaORequisitoMudouHoje } from "@/content/ba-playbooks-pt-br/a-release-e-amanha-o-requisito-mudou-hoje";
import { todoMundoQuerUmaCoisaDiferente } from "@/content/ba-playbooks-pt-br/todo-mundo-quer-uma-coisa-diferente";
import { oQueOBaDeveChecarAntesDaUat } from "@/content/ba-playbooks-pt-br/o-que-o-ba-deve-checar-antes-da-uat";
import { aStoryFoiArrastadaPorQuatroSprints } from "@/content/ba-playbooks-pt-br/a-story-foi-arrastada-por-quatro-sprints";
import { oQueFrontOfficeMiddleOfficeEBackOfficeFazem } from "@/content/ba-playbooks-pt-br/o-que-front-office-middle-office-e-back-office-fazem";
import { ninguemConsegueReproduzirOProblemaEmProducao } from "@/content/ba-playbooks-pt-br/ninguem-consegue-reproduzir-o-problema-em-producao";
import { funcionouNaUatPorQueFalhouEmProducao } from "@/content/ba-playbooks-pt-br/funcionou-na-uat-por-que-falhou-em-producao";
import { modeloDeUserStoryParaBusinessAnalyst } from "@/content/ba-playbooks-pt-br/modelo-de-user-story-para-business-analyst";
import { modeloDeAnaliseDeImpacto } from "@/content/ba-playbooks-pt-br/modelo-de-analise-de-impacto";

// Same array-of-modules pattern as lib/ba-playbooks.ts. Add a new
// content/ba-playbooks-pt-br/<slug>.ts module and an entry here once a
// translation is ready to publish; pair it in lib/ba-playbooks-i18n.ts too.
const playbookEntries: Omit<Playbook, "readingTime">[] = [
  primeiraUserStory,
  comoEscreverCriteriosDeAceitacao,
  dicasDeJiraParaAnalistasDeNegocios,
  guiaDeLevantamentoDeRequisitos,
  primeiraVezTrabalhandoComUmaApi,
  doisSistemasMostramNumerosDiferentes,
  requisitoParaMudancaRegulatoria,
  cicloDeVidaDaOperacao,
  oStakeholderSumiuNoMeioDaUat,
  doisPmsDuasPrioridadesDiferentes,
  guiaDeRastreamentoFrontToBack,
  oRequisitoMudouNoMeioDaSprint,
  oBatchRodouComSucessoPorQueOsDadosSumiram,
  aStoryEstaProntaPorQueNaoConseguimosLiberar,
  defeitoOuComportamentoEsperado,
  quemEODonoDoRequisito,
  releaseEAmanhaORequisitoMudouHoje,
  todoMundoQuerUmaCoisaDiferente,
  oQueOBaDeveChecarAntesDaUat,
  aStoryFoiArrastadaPorQuatroSprints,
  oQueFrontOfficeMiddleOfficeEBackOfficeFazem,
  ninguemConsegueReproduzirOProblemaEmProducao,
  funcionouNaUatPorQueFalhouEmProducao,
  modeloDeUserStoryParaBusinessAnalyst,
  modeloDeAnaliseDeImpacto,
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
