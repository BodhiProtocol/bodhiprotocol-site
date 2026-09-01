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
    id: "trade-lifecycle",
    enSlug: "trade-lifecycle-playbook",
    ptBrSlug: "ciclo-de-vida-da-operacao",
  },
];

export function getPtBrSlugForEnSlug(enSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.enSlug === enSlug)?.ptBrSlug;
}

export function getEnSlugForPtBrSlug(ptBrSlug: string): string | undefined {
  return playbookTranslations.find((pair) => pair.ptBrSlug === ptBrSlug)?.enSlug;
}
