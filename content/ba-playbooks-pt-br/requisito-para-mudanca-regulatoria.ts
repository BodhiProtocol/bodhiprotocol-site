import type { Playbook } from "@/types/content";

const traceabilitySheet = `PLANILHA DE RASTREABILIDADE DE REQUISITO REGULATÓRIO

REGULAÇÃO
Nome e citação (artigo / cláusula):
Data de vigência:
Versão ou emenda em que este requisito foi baseado:

ESCOPO
Produtos no escopo:
Tipos de cliente / contraparte no escopo:
Entidades legais e jurisdições no escopo:
Explicitamente fora de escopo:

TERMOS DEFINIDOS
Termo regulatório → equivalente de negócio/sistema:
[repetir por termo]

DECISÕES DE INTERPRETAÇÃO
Ponto ambíguo:
Interpretação adotada:
Decidido por (nome, cargo):
Data da decisão:

FASEAMENTO DO ESCOPO
Requisito do dia um (deve estar em conformidade até a data de vigência):
Fase 2 (adiada, documentada e acordada):

IMPACTO RETROSPECTIVO
Aplica-se somente a atividade nova? S / N
Remediação necessária para registros existentes? S / N — se sim, descreva a população e o método:

TRILHA DE EVIDÊNCIA
Cláusula → Regra de negócio → Mudança no sistema → Caso de teste → Artefato de evidência
[repetir por regra]

APROVAÇÃO FINAL
Responsável regulatório:
Aprovado em (data):
`;

export const requisitoParaMudancaRegulatoria: Omit<Playbook, "readingTime"> = {
  slug: "requisito-para-mudanca-regulatoria",
  title: "Escrevendo um Requisito para uma Mudança Regulatória",
  description:
    "O stakeholder é um regulamento, não uma pessoa, e o prazo não muda de lugar. Veja como transformar uma cláusula regulatória em um requisito que sobrevive a uma auditoria.",
  summary:
    "Um guia prático para escrever requisitos a partir de texto regulatório — encontrando o verdadeiro dono da interpretação, traduzindo termos definidos, delimitando com precisão a população afetada, faseando um prazo inegociável e construindo a trilha de evidência da cláusula até o comportamento do sistema que um regulador realmente consegue seguir.",
  category: "Capital Markets",
  tags: ["Regulatório", "Compliance", "Trilha de Auditoria"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Passo",
  intro: [
    "Um regulador publica uma regra nova. O Compliance repassa um resumo de uma linha: \"precisamos de reporte de operações para swaps de grande valor.\" A data de vigência já está no calendário e ela não vai se mover pelo planejamento de sprint de ninguém.",
    "Uma mudança regulatória parece um requisito comum vestindo uma etiqueta de urgente, e tratá-la assim é como times acabam construindo a coisa errada corretamente. O stakeholder não é uma pessoa que você pode entrevistar até a ambiguidade se resolver — é um texto legal que diz o que diz, interpretado por alguém que precisa estar disposto a colocar o nome nessa interpretação.",
    "Nada disso torna um requisito regulatório mais difícil de escrever. Torna diferente o tipo de escrita — uma em que o requisito precisa sobreviver à leitura de um auditor que não estava em nenhuma das suas reuniões.",
  ],
  audience: [
    "Business Analysts designados para uma mudança regulatória ou de compliance",
    "BAs traduzindo uma citação de regra para um requisito pela primeira vez",
    "Líderes de entrega que precisam de uma trilha pronta para auditoria, não só de software funcionando",
    "Qualquer um que já ouviu \"o Compliance disse que precisamos disso\" e nada mais específico",
  ],
  seoTitle: "Escrevendo um Requisito para uma Mudança Regulatória — Um Guia de BA",
  seoDescription:
    "Um guia prático para Analistas de Negócios transformarem texto regulatório em um requisito construível — delimitando a população afetada, documentando decisões de interpretação, faseando um prazo inegociável e construindo uma trilha de evidência pronta para auditoria.",
  closingHeading: [
    "Um regulador não pergunta se funciona.",
    "Um regulador pergunta se você consegue provar — e provar contra qual versão da regra você construiu.",
  ],
  closingBody:
    "Todo requisito regulatório se reduz ao mesmo formato: uma cláusula, um responsável disposto a interpretá-la, uma população à qual ela realmente se aplica e uma trilha conectando tudo isso ao que o sistema faz. O prazo nunca foi negociável. Tudo o mais é uma decisão que alguém precisa tomar e documentar — inclusive você.",
  closingTemplate: traceabilitySheet,
  closingTemplateName: "Planilha de Rastreabilidade de Requisito Regulatório",
  hacks: [
    {
      number: 1,
      title: "Encontre o responsável regulatório antes de encontrar o requisito",
      insight: "O regulamento não consegue responder uma pergunta de esclarecimento. Alguém ainda precisa.",
      explanation:
        "\"O Compliance disse que precisamos disso\" não é um responsável — é um departamento. Você precisa de uma pessoa nomeada no Compliance ou Jurídico que consiga ler a cláusula de verdade, decidir o que ela significa para o seu negócio e depois sustentar essa leitura. Todo o resto é um contribuinte, não quem decide.",
      whyItHelps:
        "Sem um responsável nomeado, toda ambiguidade no texto da regra vira um chute do BA por padrão — e o chute de um BA não é o que reguladores esperam encontrar por trás de um controle de compliance.",
    },
    {
      number: 2,
      title: "Leia a cláusula, não o resumo",
      insight: "A versão de uma linha que chega até você já perdeu os detalhes que importam.",
      compare: {
        leftLabel: "O que é repassado",
        left: "\"Precisamos de reporte de operações para swaps de grande valor.\"",
        rightLabel: "O que a cláusula realmente diz",
        right:
          "\"Operações de swap OTC com valor nocional acima do limite estabelecido devem ser reportadas ao repositório designado em até um dia útil após a execução, incluindo os identificadores de entidade legal da contraparte.\"",
      },
      whyItHelps:
        "O resumo derruba o limite exato, a referência de tempo e o que \"reportado\" é legalmente obrigado a incluir. Esses são exatamente os detalhes que um requisito não pode se dar ao luxo de herdar de segunda mão.",
    },
    {
      number: 3,
      title: "Traduza os termos definidos antes de traduzir os requisitos",
      insight: "O vocabulário do regulamento raramente bate com o que a Operação chama a mesma coisa no dia a dia.",
      list: [
        "\"Operação Reportável\" — inclui novações, terminações parciais, alocações?",
        "\"Execução\" — data da operação, horário da confirmação ou horário registrado no sistema-fonte?",
        "\"Contraparte\" — a entidade legal na confirmação ou a controladora final?",
        "\"Dia útil\" — o calendário de quem e em qual fuso horário?",
      ],
      whyItHelps:
        "Construa esse glossário antes de escrever uma única regra de negócio. Cada um desses termos decide quem está no escopo e quando o relógio começa a contar — erre o mapeamento e o requisito fica em conformidade com uma regra que não existe.",
    },
    {
      number: 4,
      title: "Delimite a população afetada com precisão",
      insight: "A falha mais comum em mudanças regulatórias é uma população sutilmente errada.",
      checklist: [
        "Quais produtos estão no escopo — e quais parecem semelhantes, mas não estão?",
        "Quais tipos de cliente e contraparte estão no escopo?",
        "A quais entidades legais e jurisdições isso realmente se aplica?",
        "Quais sistemas de registro guardam as operações afetadas hoje?",
        "O que está explicitamente fora de escopo, por escrito, não só presumido?",
      ],
      whyItHelps:
        "Uma funcionalidade tecnicamente perfeita construída contra a população errada não é uma versão menor de conforme — é não conforme, com uma trilha de auditoria provando que você sabia que a regra existia.",
    },
    {
      number: 5,
      title: "Documente cada interpretação ambígua como uma decisão nomeada",
      insight: "\"A gente presumiu\" não sobrevive a uma auditoria. Uma decisão datada e com responsável sobrevive.",
      before: "O BA lê uma cláusula ambígua, escolhe a interpretação que parece razoável e segue em frente sem registrar nada.",
      after: [
        "Ambiguidade registrada: \"execução\" significa data da operação ou horário da confirmação?",
        "Escalada ao responsável regulatório nomeado no Compliance",
        "Interpretação adotada, com justificativa, datada e atribuída",
      ],
      whyItHelps:
        "Se um regulador discordar da interpretação mais tarde, a pergunta vira \"quem decidiu isso e por quê\" — não \"por que o BA decidiu isso sozinho\".",
    },
    {
      number: 6,
      title: "A data de vigência não muda de lugar. O escopo, sim.",
      insight: "Você não consegue negociar o calendário de um regulador. Você consegue negociar o que \"conforme\" significa no dia um.",
      visual: {
        steps: [
          "MVP do dia um — o mínimo que precisa estar conforme até a data de vigência",
          "→ acordado com o responsável regulatório, por escrito",
          "→ Fase 2 — tudo o mais, com uma data real",
        ],
      },
      whyItHelps:
        "Um MVP documentado e aprovado é uma decisão de escopo. Um MVP não documentado que sai incompleto em silêncio é uma lacuna de compliance vestida de desculpa de cronograma.",
    },
    {
      number: 7,
      title: "Construa a trilha de evidência, não só a funcionalidade",
      insight: "Um regulador não pergunta se funciona. Um regulador pede para você provar.",
      visual: {
        steps: ["Cláusula", "→ Regra de negócio", "→ Mudança no sistema", "→ Caso de teste", "→ Artefato de evidência"],
      },
      whyItHelps:
        "\"Funciona\" é um resultado de QA. \"Aqui está o relatório, o registro de log e o caso de teste que remetem ao Artigo 12(3)\" é um resultado de auditoria — e só um dos dois é o que você realmente vai ter que apresentar.",
    },
    {
      number: 8,
      title: "Versione a regulação, não só o seu requisito",
      insight: "Regras são emendadas. Seu requisito precisa dizer contra qual versão da regra ele foi construído.",
      explanation:
        "Registre a citação, a versão ou data da emenda e a data de vigência contra a qual você construiu. Quando a regra mudar de novo daqui a seis meses, é isso que impede a mudança nova de ser silenciosamente incorporada — ou confundida — com a que você já entregou.",
      whyItHelps: "Um auditor perguntando \"isso foi construído contra a regra atual\" precisa de uma resposta de uma linha, não de uma investigação.",
    },
    {
      number: 9,
      title: "Pergunte se isso alcança o passado, não só o futuro",
      insight: "\"Operações novas a partir da data de vigência\" e \"todas as operações abertas existentes\" são dois projetos diferentes.",
      compare: {
        leftLabel: "Só daqui para frente",
        left: "Aplica-se a atividade nova registrada após a data de vigência. População menor, escopo contido.",
        rightLabel: "Remediação retrospectiva",
        right:
          "Aplica-se também a posições abertas existentes ou registros históricos — uma população maior, um problema de qualidade de dados e geralmente um plano de remediação separado.",
      },
      whyItHelps:
        "Presumir só-daqui-para-frente quando a regra na verdade exige remediação é uma lacuna que aparece na primeira amostragem do regulador, não durante os seus testes.",
    },
    {
      number: 10,
      title: "Encerre com uma aprovação documentada, não um \"tá bom\"",
      insight: "Um aceno verbal do Compliance não é evidência. Uma aprovação datada e atribuída é.",
      compare: {
        leftLabel: "\"Tá bom\"",
        left: "Um aceno numa reunião ou um joinha numa thread do Slack. Nada que um auditor consiga encontrar seis meses depois.",
        rightLabel: "Aprovação documentada",
        right:
          "Uma aprovação datada e atribuída contra o escopo, as decisões de interpretação e o limite do MVP — arquivada onde a próxima pessoa que mexer nisso consiga encontrar.",
      },
      whyItHelps:
        "Antes de começar a construção, consiga a aprovação por escrito do responsável regulatório contra o escopo, as decisões de interpretação e o limite do MVP — o mesmo artefato que responde toda pergunta futura sobre por que isso foi construído do jeito que foi.",
      proTip:
        "Envie a planilha de rastreabilidade, não um genérico \"por favor revise os requisitos\". Confirmação específica contra um documento específico é o que realmente produz uma trilha de auditoria.",
    },
  ],
};
