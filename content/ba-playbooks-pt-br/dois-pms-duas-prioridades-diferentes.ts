import type { Playbook } from "@/types/content";

const capacityReconciliationSheet = `PLANILHA DE RECONCILIAÇÃO DE CAPACIDADE E PRIORIDADE ENTRE DOIS PMS

CAPACIDADE COMPARTILHADA
Sprint / ciclo:
Capacidade total disponível (pontos / horas):

PEDIDO A
PM / responsável:
Item:
Valor se entregue neste ciclo:
Custo se NÃO for entregue neste ciclo:
Tamanho (pontos / horas):

PEDIDO B
PM / responsável:
Item:
Valor se entregue neste ciclo:
Custo se NÃO for entregue neste ciclo:
Tamanho (pontos / horas):

ISSO É UM CONFLITO REAL?
Os dois itens realmente competem pela mesma capacidade, time ou sistema? S / N
Se não — anote por que eles não colidem de fato:

OPÇÕES DE SEQUENCIAMENTO CONSIDERADAS
Opção A (ex.: A neste ciclo, B no próximo — garantido):
Opção B (ex.: entrega faseada ou parcial dos dois):
Opção C (escalar — nenhum sequenciamento aceitável encontrado):

DECISÃO
Opção escolhida:
Responsável pela decisão, se escalada além do BA:
Justificativa, compartilhada com os dois PMs:
Data da decisão:

CADÊNCIA PERMANENTE
Isso tende a se repetir todo ciclo? S / N
Sincronização recorrente de priorização proposta? S / N
`;

export const doisPmsDuasPrioridadesDiferentes: Omit<Playbook, "readingTime"> = {
  slug: "dois-pms-duas-prioridades-diferentes",
  title: "Dois PMs, Duas Prioridades Diferentes. Mesma Sprint.",
  description:
    "Dois product managers, um time compartilhado e os dois convencidos de que o próprio item é o mais urgente desta sprint. Um guia prático para transformar uma briga por capacidade numa decisão de sequenciamento — sem o BA virar o desempatador acidental.",
  summary:
    "Um guia prático para reconciliar as prioridades concorrentes de dois product managers num único time compartilhado — colocando os dois pedidos no mesmo documento, precificando o custo de não fazer cada um, testando se o conflito é real e propondo uma opção de sequenciamento em vez de forçar uma escolha binária.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Priorização", "Capacidade"],
  author: "Surya",
  date: "2026-08-22",
  itemLabel: "Passo",
  intro: [
    "Dois product managers compartilham o mesmo time de entrega. Cada um tem seu próprio backlog, seus próprios stakeholders e seu próprio item que decidiram ser a prioridade máxima desta sprint — e o time só tem capacidade para um dos dois, talvez.",
    "Cada PM tem conversado com o BA separadamente, em reuniões separadas, defendendo o próprio caso. Nenhum dos dois ouviu o do outro. Esse costuma ser o problema real — não que as duas prioridades sejam irreconciliáveis, mas que ninguém as comparou contra o mesmo número, na mesma sala, ao mesmo tempo.",
    "O BA entre dois PMs não está ali para escolher um vencedor. O trabalho é tornar o trade-off visível o suficiente para que a pessoa certa — às vezes são os dois PMs juntos, às vezes é para quem os dois se reportam — consiga realmente tomar a decisão.",
  ],
  audience: [
    "Business Analysts apoiando dois product managers num único time de entrega compartilhado",
    "BAs pegos repassando duas prioridades concorrentes em vez de reconciliá-las",
    "Líderes de entrega vendo a mesma briga por capacidade ressurgir toda sprint",
    "Qualquer um que teve dois 1:1s essa semana em que cada PM chamou o próprio item de \"a prioridade\"",
  ],
  seoTitle: "Dois PMs, Duas Prioridades Diferentes — Um Guia de BA",
  seoDescription:
    "Um guia prático de Business Analyst para dois product managers competindo pela mesma capacidade de sprint — comparando os dois pedidos contra o mesmo número, testando se o conflito é real e propondo uma opção de sequenciamento em vez de uma escolha binária.",
  closingHeading: [
    "O trabalho do BA não é decidir qual prioridade vence.",
    "É garantir que o trade-off fique visível antes de alguém precisar decidir.",
  ],
  closingBody:
    "Dois PMs raramente precisam de um árbitro — precisam dos dois pedidos lado a lado contra o mesmo número de capacidade, na mesma conversa, em vez de duas separadas. Precifique o custo de não fazer cada item, verifique se o conflito é real e ofereça uma opção de sequenciamento antes de forçar alguém a uma escolha binária. Se ainda assim continuar genuinamente sem solução, escale para quem os dois PMs se reportam — isso é uma decisão de prioridade organizacional, não uma decisão do BA.",
  closingTemplate: capacityReconciliationSheet,
  closingTemplateName: "Planilha de Reconciliação de Capacidade e Prioridade Entre Dois PMs",
  hacks: [
    {
      number: 1,
      title: "Coloque as duas prioridades por escrito, no mesmo documento",
      insight: "Duas prioridades vivendo em duas threads de Slack separadas não podem ser comparadas — só discutidas, separadamente, para sempre.",
      explanation:
        "Reúna os principais pedidos dos dois PMs num único documento compartilhado antes de marcar qualquer conversa sobre trade-offs. O documento em si geralmente já revela se isso é um conflito real ou só dois pedidos que nunca precisaram ser comparados.",
      whyItHelps: "Você não consegue reconciliar o que não consegue ver lado a lado.",
    },
    {
      number: 2,
      title: "Pergunte pelo custo de NÃO fazer, não só pelo valor de fazer",
      insight: "Todo PM consegue argumentar por que o próprio item importa. Poucos conseguem dizer o que realmente acontece se ele esperar.",
      compare: {
        leftLabel: "Enquadramento de valor",
        left: "\"Isso destrava uma experiência de checkout melhor para o nosso maior segmento.\"",
        rightLabel: "Enquadramento de custo do atraso",
        right: "\"Se isso esperar mais uma sprint, perdemos a janela da campanha e o maior impulso de aquisição do trimestre.\"",
      },
      whyItHelps: "Valor sozinho faz todo pedido soar essencial. O custo de esperar é o que realmente distingue urgente de meramente importante.",
    },
    {
      number: 3,
      title: "Verifique se o conflito é real antes de tratá-lo como um",
      insight: "Às vezes duas prioridades \"concorrentes\" nem tocam a mesma capacidade quando você olha de perto.",
      list: [
        "Os dois itens precisam dos mesmos engenheiros ou de engenheiros diferentes?",
        "Eles tocam o mesmo sistema ou sistemas genuinamente separados?",
        "Um poderia rodar nesta sprint e o outro na próxima, sem perda real para nenhum dos dois?",
        "O desacordo é sobre sequenciamento ou sobre algo que só soa como um conflito de recursos?",
      ],
      whyItHelps: "Um conflito fabricado, resolvido como se fosse real, só ensina os dois PMs a escalar mais forte da próxima vez.",
    },
    {
      number: 4,
      title: "Coloque a restrição de capacidade na frente dos dois PMs ao mesmo tempo",
      insight: "Dois 1:1s separados deixam cada PM acreditar que o item do outro é essencialmente de graça.",
      before: "O BA ouve a Prioridade A numa reunião e a Prioridade B em outra e depois tenta reconciliá-las sozinho.",
      after: [
        "Uma conversa compartilhada, com os dois PMs presentes",
        "Um número de capacidade declarado claramente: \"Esta sprint tem 40 pontos. Só esses dois backlogs pedem 65.\"",
        "Os dois PMs reagindo à mesma restrição, não a um resumo de segunda mão do BA",
      ],
      whyItHelps: "O trade-off só parece real quando os dois PMs veem o mesmo déficit ao mesmo tempo — um BA repassando separadamente só soa como opinião.",
    },
    {
      number: 5,
      title: "Não deixe o BA virar o desempatador por padrão",
      insight: "Se ninguém explicitamente é dono da decisão, ela silenciosamente vira quem sequenciou o backlog por último.",
      explanation:
        "Quando as duas prioridades são genuína e inevitavelmente incompatíveis, escale para quem os dois PMs se reportam — um gestor compartilhado, um líder de entrega, um comitê. Isso é uma decisão de prioridade organizacional, não um detalhe de agenda.",
      whyItHelps: "Um BA que silenciosamente classifica o trabalho de dois PMs é quem leva a culpa depois, por uma decisão que nunca foi dele para tomar.",
    },
    {
      number: 6,
      title: "Proponha uma opção de sequenciamento, não uma escolha binária",
      insight: "\"A ou B\" costuma ser o formato errado para a pergunta. \"A, depois B, nesta data\" costuma ser o certo.",
      visual: {
        steps: [
          "Opção A nesta sprint, Opção B na próxima — com uma data firme, não uma promessa vaga",
          "→ ou uma divisão faseada: a fatia de maior valor de cada um, nesta sprint",
          "→ ou escalar, só depois de opções reais de sequenciamento terem sido tentadas e rejeitadas",
        ],
      },
      whyItHelps: "Um \"você é o próximo\" garantido converte uma briga de soma zero numa decisão de agenda que a maioria dos PMs consegue aceitar.",
    },
    {
      number: 7,
      title: "Registre a decisão onde os dois PMs consigam ver — e por quê",
      insight: "Uma decisão de sequenciamento não documentada é silenciosamente rediscutida no momento em que qualquer um dos PMs esquece o raciocínio.",
      whyItHelps: "Uma nota curta e compartilhada de justificativa — o que foi decidido e por quê — é o que impede a mesma briga de ressurgir palavra por palavra na próxima sprint.",
      whenToUse: "No momento em que uma decisão de sequenciamento é tomada, antes de qualquer um dos PMs seguir para o próximo pedido.",
    },
    {
      number: 8,
      title: "Se isso continuar acontecendo, construa uma cadência permanente em vez de rebrigar",
      insight: "Um conflito de capacidade que se repete toda sprint não são oito incidentes separados — é uma lacuna estrutural só.",
      explanation:
        "Dois PMs compartilhando um time de entrega é uma configuração normal, mas precisa de um mecanismo normal: uma sincronização curta e recorrente de priorização, onde os dois backlogs são comparados contra a mesma capacidade antes de qualquer PM comprometer stakeholders com uma data.",
      whyItHelps: "Resolver essa colisão uma vez e seguir em frente só garante uma quase idêntica na próxima sprint — uma cadência permanente resolve o padrão, não a instância.",
    },
  ],
};
