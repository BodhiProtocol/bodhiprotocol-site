// Stable pairing between an English BA Playbook and its Brazilian Portuguese
// counterpart, kept independent of either slug so either side can be renamed
// without breaking the link. Add a row here only once both articles exist —
// this table is what drives reciprocal hreflang and the language switcher's
// "jump to the translated version" behaviour.
interface PlaybookTranslationPair {
  id: string;
  enSlug: string;
  ptBrSlug: string;
}

export const playbookTranslations: PlaybookTranslationPair[] = [
  {
    id: "first-user-story",
    enSlug: "first-time-writing-a-user-story",
    ptBrSlug: "como-escrever-sua-primeira-user-story",
  },
  {
    id: "acceptance-criteria",
    enSlug: "acceptance-criteria-playbook",
    ptBrSlug: "como-escrever-criterios-de-aceitacao",
  },
  {
    id: "jira-hacks",
    enSlug: "jira-hacks-for-business-analysts",
    ptBrSlug: "dicas-de-jira-para-analistas-de-negocios",
  },
  {
    id: "requirement-elicitation",
    enSlug: "requirement-elicitation-playbook",
    ptBrSlug: "guia-de-levantamento-de-requisitos",
  },
  {
    id: "first-time-api",
    enSlug: "first-time-working-with-an-api",
    ptBrSlug: "primeira-vez-trabalhando-com-uma-api",
  },
  {
    id: "two-systems-different-numbers",
    enSlug: "two-systems-show-different-numbers",
    ptBrSlug: "dois-sistemas-mostram-numeros-diferentes",
  },
  {
    id: "regulatory-change-requirement",
    enSlug: "regulatory-change-requirement-playbook",
    ptBrSlug: "requisito-para-mudanca-regulatoria",
  },
  {
    id: "trade-lifecycle",
    enSlug: "trade-lifecycle-playbook",
    ptBrSlug: "ciclo-de-vida-da-operacao",
  },
  {
    id: "stakeholder-quiet-mid-uat",
    enSlug: "stakeholder-went-quiet-mid-uat",
    ptBrSlug: "o-stakeholder-sumiu-no-meio-da-uat",
  },
  {
    id: "two-pms-two-priorities",
    enSlug: "two-pms-two-different-priorities",
    ptBrSlug: "dois-pms-duas-prioridades-diferentes",
  },
  {
    id: "front-to-back-trade-trace",
    enSlug: "front-to-back-trade-trace-guide",
    ptBrSlug: "guia-de-rastreamento-front-to-back",
  },
  {
    id: "requirement-changed-mid-sprint",
    enSlug: "requirement-changed-mid-sprint",
    ptBrSlug: "o-requisito-mudou-no-meio-da-sprint",
  },
  {
    id: "batch-ran-successfully-data-missing",
    enSlug: "batch-ran-successfully-data-missing",
    ptBrSlug: "o-batch-rodou-com-sucesso-por-que-os-dados-sumiram",
  },
  {
    id: "story-is-done-why-cant-release",
    enSlug: "story-is-done-why-cant-we-release-it",
    ptBrSlug: "a-story-esta-pronta-por-que-nao-conseguimos-liberar",
  },
  {
    id: "defect-vs-expected-behaviour",
    enSlug: "defect-vs-expected-behaviour",
    ptBrSlug: "defeito-ou-comportamento-esperado",
  },
  {
    id: "who-owns-the-requirement",
    enSlug: "who-owns-the-requirement",
    ptBrSlug: "quem-e-o-dono-do-requisito",
  },
  {
    id: "release-tomorrow-requirement-changed-today",
    enSlug: "release-tomorrow-requirement-changed-today",
    ptBrSlug: "a-release-e-amanha-o-requisito-mudou-hoje",
  },
  {
    id: "everyone-wants-something-different",
    enSlug: "everyone-wants-something-different",
    ptBrSlug: "todo-mundo-quer-uma-coisa-diferente",
  },
  {
    id: "pre-uat-readiness-checklist",
    enSlug: "pre-uat-readiness-checklist",
    ptBrSlug: "o-que-o-ba-deve-checar-antes-da-uat",
  },
  {
    id: "story-carried-over-four-sprints",
    enSlug: "story-carried-over-four-sprints",
    ptBrSlug: "a-story-foi-arrastada-por-quatro-sprints",
  },
  {
    id: "front-office-middle-office-back-office",
    enSlug: "front-office-middle-office-back-office",
    ptBrSlug: "o-que-front-office-middle-office-e-back-office-fazem",
  },
  {
    id: "nobody-can-reproduce-the-production-issue",
    enSlug: "nobody-can-reproduce-the-production-issue",
    ptBrSlug: "ninguem-consegue-reproduzir-o-problema-em-producao",
  },
  {
    id: "uat-passed-production-failed",
    enSlug: "uat-passed-production-failed",
    ptBrSlug: "funcionou-na-uat-por-que-falhou-em-producao",
  },
];

export function getPtBrSlugForEnSlug(enSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.enSlug === enSlug)?.ptBrSlug;
}

export function getEnSlugForPtBrSlug(ptBrSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.ptBrSlug === ptBrSlug)?.enSlug;
}
