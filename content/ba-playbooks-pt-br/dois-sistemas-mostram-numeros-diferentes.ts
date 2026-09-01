import type { Playbook } from "@/types/content";

const checklistInvestigacao = `CHECKLIST DE INVESTIGAÇÃO DE DIVERGÊNCIA DE DADOS

[ ] Mesma métrica
[ ] Mesma definição de negócio
[ ] Mesma data
[ ] Mesmo fuso horário
[ ] Mesma população
[ ] Mesmos filtros
[ ] Mesmo status
[ ] Mesma fonte
[ ] Mesmos identificadores
[ ] Verificação de duplicidade feita
[ ] Verificação de registros ausentes feita
[ ] Pequena amostra conciliada
[ ] Causa raiz classificada
[ ] Decisão de negócio registrada
`;

export const doisSistemasMostramNumerosDiferentes: Omit<Playbook, "readingTime"> = {
  slug: "dois-sistemas-mostram-numeros-diferentes",
  title: "Dois sistemas mostram números diferentes",
  description: "Um guia prático de BA para investigar divergências de dados.",
  summary:
    "Uma sequência de investigação em 14 passos para o momento em que dois sistemas discordam — confirmando a métrica, a população, o tempo e as definições antes de alguém decidir qual número está \"errado\".",
  category: "Business Analysis",
  tags: ["Dados", "Conciliação", "Investigação"],
  author: "Surya",
  date: "2026-09-02",
  itemLabel: "Passo",
  intro: [
    "Sistema A: 1.248 operações. Sistema B: 1.231 operações. Alguém joga os dois prints no Teams e pergunta: \"qual dos dois está errado?\"",
    "Talvez nenhum. Números diferentes geralmente vêm de definições, tempo, populações, filtros ou estados de processamento diferentes — não de um sistema quebrado.",
    "A primeira tarefa não é achar o número errado. A primeira tarefa é garantir que você está realmente comparando a mesma coisa.",
  ],
  audience: [
    "Business Analysts investigando divergências de dados",
    "BAs dando suporte a funções de conciliação ou controle",
    "Qualquer pessoa que recebeu um \"qual número está certo\" sem mais contexto",
    "Product Owners triando um chamado de qualidade de dados",
  ],
  seoTitle: "Como investigar divergências de dados entre sistemas",
  seoDescription:
    "Um guia passo a passo de BA para investigar por que dois sistemas mostram números diferentes — confirmando a métrica, a população, o tempo e as definições antes de assumir que um dos sistemas está errado.",
  closingHeading: ["Nenhum dos números estava \"errado\".", "Eles nunca estiveram contando a mesma coisa."],
  closingBody:
    "A maioria das divergências de dados se resolve numa resposta de uma frase só, assim que alguém rastreia um punhado de registros em vez de discutir os totais. Os totais são um sintoma. A lacuna de definição, tempo ou status por trás deles é a descoberta de verdade.",
  closingTemplate: checklistInvestigacao,
  closingTemplateName: "Checklist de investigação de divergência de dados",
  hacks: [
    {
      number: 1,
      title: "Confirme a métrica",
      insight: "\"Operações\" sozinho ainda não é uma definição compartilhada.",
      list: ["Operação?", "Ordem?", "Execução?", "Lançamento?", "Bruto ou líquido?"],
      whyItHelps: "Dois times podem estar certos e mesmo assim discordar, se um está contando ordens e o outro está contando execuções.",
    },
    {
      number: 2,
      title: "Confirme a janela de tempo",
      insight: "O mesmo dia pode significar três coisas diferentes para três sistemas diferentes.",
      list: ["Data de negócio, ou data de calendário?", "Qual fuso horário?", "Qual é o horário de corte?", "A que horas o batch realmente roda?"],
      whyItHelps: "Uma operação lançada às 23h58 pode cair em \"hoje\" ou \"amanhã\", dependendo de qual dessas quatro respostas o sistema usa.",
    },
    {
      number: 3,
      title: "Confirme a população",
      insight: "Antes de comparar contagens, confirme que os dois lados estão contando o mesmo recorte do mundo.",
      list: ["Mercado?", "Região?", "Cliente?", "Produto?", "Praça?", "Status?"],
      whyItHelps: "Um sistema com escopo na EMEA e outro com escopo global nunca vão bater, e nenhum dos dois está com defeito.",
    },
    {
      number: 4,
      title: "Confirme a fonte",
      insight: "Nem todo número vem do mesmo lugar, mesmo quando a tela parece igual.",
      list: ["Banco de dados ao vivo?", "API?", "Relatório agendado?", "Cache?", "Warehouse?"],
      explanation:
        "Um relatório em cache que fica atrás do banco de dados ao vivo por design não é um bug. Vale a pena saber disso antes de alguém passar a tarde inteira caçando isso como se fosse um.",
      whyItHelps: "A fonte diz o quão atualizado o número pode ser — o que, às vezes, já explica a lacuna sozinho.",
    },
    {
      number: 5,
      title: "Compare definições, não só contagens",
      insight: "Os dois sistemas podem estar certos e mesmo assim nunca vão concordar.",
      compare: {
        leftLabel: "Sistema A",
        left: "Conta uma operação alterada como uma única operação — só a versão mais recente.",
        rightLabel: "Sistema B",
        right: "Conta cada versão da operação separadamente, incluindo as alterações.",
      },
      whyItHelps: "Os dois podem estar se comportando exatamente como projetado. A divergência é uma lacuna de definição, não um defeito em nenhum dos dois.",
    },
    {
      number: 6,
      title: "Compare os estados de processamento",
      insight: "Uma contagem feita no meio do pipeline nunca vai bater com uma contagem feita no final dele.",
      visual: { steps: ["Recebida", "Validada", "Lançada", "Casada", "Liquidada", "Rejeitada"] },
      whyItHelps: "Se o Sistema A conta tudo que passou de \"Recebida\" e o Sistema B só conta \"Liquidada\", a lacuna já está explicada antes de você olhar para uma única linha.",
    },
    {
      number: 7,
      title: "Verifique os filtros",
      insight: "Alguém, em algum momento, provavelmente aplicou um filtro e esqueceu dele.",
      list: [
        "Um filtro da interface deixado ligado",
        "Padrões de relatório que ninguém lembra de ter configurado",
        "Condições WHERE do SQL embutidas na consulta",
        "Status excluídos por padrão",
      ],
      whyItHelps: "Sozinho, esse passo resolve mais divergências do que qualquer um dos outros, e é o mais fácil de pular porque parece simples demais para ser a resposta.",
    },
    {
      number: 8,
      title: "Verifique se há duplicidade",
      insight: "Às vezes o número maior é o errado, não o menor.",
      whyItHelps: "Uma requisição reenviada, um batch executado de novo, ou um join que se multiplica sem querer podem inflar uma contagem silenciosamente.",
    },
    {
      number: 9,
      title: "Verifique se há registros ausentes",
      insight: "E às vezes é o número menor que está incompleto de verdade.",
      whyItHelps: "Uma carga que falhou, um filtro que descarta nulos silenciosamente, ou um join que descarta linhas sem correspondência podem reduzir uma contagem sem avisar.",
    },
    {
      number: 10,
      title: "Compare os identificadores",
      insight: "Casar os dados pela chave errada pode parecer exatamente uma divergência de dados.",
      list: ["ID da operação", "ID da ordem", "ID da transação", "ID externo"],
      whyItHelps: "Se o Sistema A usa como chave um ID interno da operação e o Sistema B usa uma referência externa, registros que realmente batem vão parecer sem correspondência até o mapeamento ser corrigido.",
    },
    {
      number: 11,
      title: "Pegue uma amostra pequena antes de mexer na população inteira",
      insight: "Não comece pelas 100 mil linhas inteiras.",
      whyItHelps: "Escolha de 5 a 10 divergências individuais e rastreie cada uma na mão. O padrão que explica todas elas geralmente já aparece depois da terceira ou quarta.",
      proTip: "Se a mesma explicação dá conta das suas primeiras cinco divergências, é bem provável que ela explique o resto também — confirme isso antes de assumir o contrário.",
    },
    {
      number: 12,
      title: "Separe o que você encontrar em categorias de conciliação",
      insight: "Nem toda divergência é do mesmo tipo. Separe-as antes de explicá-las.",
      visual: { steps: ["Só em A", "Só em B", "Nos dois, valores diferentes", "Nos dois, iguais"] },
      whyItHelps: "\"Só em A\" aponta para um problema de registro ausente. \"Nos dois, valores diferentes\" aponta para um problema de definição ou de tempo. Eles precisam de investigações diferentes, não de uma explicação única para os dois.",
    },
    {
      number: 13,
      title: "Classifique a causa raiz",
      insight: "Toda divergência remonta a uma de um pequeno número de causas.",
      list: [
        "Dados — algo está ausente ou duplicado",
        "Definição — os dois lados significam coisas diferentes",
        "Tempo — os dois lados foram medidos em momentos diferentes",
        "Processamento — os dois lados estão em etapas diferentes do pipeline",
        "Relatório — a camada de relatório, não os dados subjacentes, está errada",
        "Requisito — ninguém realmente especificou qual dos dois estava correto",
      ],
      whyItHelps: "Nomear a categoria já é a maior parte da solução. \"É um problema de tempo\" já diz a todo mundo que tipo de conversa vem a seguir.",
    },
    {
      number: 14,
      title: "Documente a causa de verdade, não só que foi resolvido",
      insight: "\"Resolvido\" não é uma descoberta. É a ausência de uma.",
      before: "Divergência de dados corrigida.",
      after: "O Sistema B exclui operações com status PENDING_ALLOCATION, enquanto o Sistema A as inclui. Decisão de negócio: a definição do Sistema A está correta; o filtro do relatório do Sistema B foi atualizado para corresponder.",
      whyItHelps: "A próxima pessoa que encontrar uma divergência parecida — e vai ter uma próxima pessoa — precisa da causa de verdade, não de uma atualização de status.",
    },
  ],
};
