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
];

export function getPtBrSlugForEnSlug(enSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.enSlug === enSlug)?.ptBrSlug;
}

export function getEnSlugForPtBrSlug(ptBrSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.ptBrSlug === ptBrSlug)?.enSlug;
}
