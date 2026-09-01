import type { Playbook } from "@/types/content";

const investigationChecklist = `CHECKLIST DE INVESTIGAÇÃO DE DIVERGÊNCIA DE DADOS

[ ] Mesma métrica
[ ] Mesma definição de negócio
[ ] Mesma data
[ ] Mesmo fuso horário
[ ] Mesma população
[ ] Mesmos filtros
[ ] Mesmo status
[ ] Mesma origem
[ ] Mesmos identificadores
[ ] Checagem de duplicatas feita
[ ] Checagem de registros faltantes feita
[ ] Amostra pequena reconciliada
[ ] Causa raiz classificada
[ ] Decisão de negócio registrada
`;

export const doisSistemasMostramNumerosDiferentes: Omit<Playbook, "readingTime"> = {
  slug: "dois-sistemas-mostram-numeros-diferentes",
  title: "Dois Sistemas Mostram Números Diferentes",
  description: "Um guia prático de BA para investigar divergências de dados.",
  summary:
    "Uma sequência de investigação em 14 passos para o momento em que dois sistemas discordam — confirmando métrica, população, tempo e definições antes de qualquer um decidir qual número está \"errado\".",
  category: "Business Analysis",
  tags: ["Dados", "Reconciliação", "Investigação"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Passo",
  intro: [
    "Sistema A: 1.248 operações. Sistema B: 1.231 operações. Alguém joga os dois prints no Teams e pergunta: \"qual dos dois está errado?\"",
    "Talvez nenhum. Números diferentes costumam vir de definições, tempos, populações, filtros ou estados de processamento diferentes — não de um dos sistemas estar quebrado.",
    "O primeiro trabalho não é achar o número errado. O primeiro trabalho é garantir que você está realmente comparando a mesma coisa.",
  ],
  audience: [
    "Business Analysts investigando divergências de dados",
    "BAs apoiando funções de reconciliação ou controle",
    "Qualquer um que recebeu \"qual número está certo\" sem mais nenhum contexto",
    "Product Owners triando um ticket de qualidade de dados",
  ],
  seoTitle: "Como Investigar Divergências de Dados Entre Sistemas",
  seoDescription:
    "Um guia de BA passo a passo para investigar por que dois sistemas mostram números diferentes — confirmando métrica, população, tempo e definições antes de assumir que um dos sistemas está errado.",
  closingHeading: ["Nenhum dos números estava \"errado\".", "Eles nunca estiveram contando a mesma coisa."],
  closingBody:
    "A maioria das divergências de dados se resolve numa resposta de uma frase assim que alguém rastreia um punhado de registros em vez de discutir sobre os totais. Os totais são um sintoma. A lacuna de definição, tempo ou status por baixo deles é o achado de verdade.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Checklist de Investigação de Divergência de Dados",
  hacks: [
    {
      number: 1,
      title: "Confirme a métrica",
      insight: "\"Operações\" sozinho ainda não é uma definição compartilhada.",
      list: ["Operação?", "Ordem?", "Execução?", "Registro (booking)?", "Bruto ou líquido?"],
      whyItHelps: "Dois times podem estar certos e mesmo assim discordar, se um está contando ordens e o outro está contando execuções.",
    },
    {
      number: 2,
      title: "Confirme a janela de tempo",
      insight: "O mesmo dia pode significar três coisas diferentes para três sistemas diferentes.",
      list: ["Data de negócio, ou data de calendário?", "Qual fuso horário?", "Qual é o corte (cut-off)?", "A que horas o batch realmente roda?"],
      whyItHelps: "Uma operação registrada às 23h58 pode cair em \"hoje\" ou \"amanhã\" dependendo de qual dessas quatro respostas o sistema usa.",
    },
    {
      number: 3,
      title: "Confirme a população",
      insight: "Antes de comparar contagens, confirme que os dois lados estão contando a mesma fatia do mundo.",
      list: ["Mercado?", "Região?", "Cliente?", "Produto?", "Praça?", "Status?"],
      whyItHelps: "Um sistema restrito à EMEA e outro global nunca vão bater, e nenhum dos dois está com defeito.",
    },
    {
      number: 4,
      title: "Confirme a origem",
      insight: "Nem todo número vem do mesmo lugar, mesmo quando a tela parece igual.",
      list: ["Banco de dados ao vivo?", "API?", "Relatório agendado?", "Cache?", "Data warehouse?"],
      explanation: "Um relatório em cache atrasado em relação ao banco ao vivo, por design, não é um bug. Vale a pena saber disso antes de alguém passar a tarde perseguindo isso como se fosse um.",
      whyItHelps: "A origem diz o quão atualizado o número tem permissão para estar — o que às vezes já explica toda a diferença sozinho.",
    },
    {
      number: 5,
      title: "Compare definições, não só contagens",
      insight: "Os dois sistemas podem estar corretos e mesmo assim nunca concordar.",
      compare: {
        leftLabel: "Sistema A",
        left: "Conta uma operação alterada como uma única operação — só a versão mais recente.",
        rightLabel: "Sistema B",
        right: "Conta cada versão da operação separadamente, incluindo as alterações.",
      },
      whyItHelps: "Os dois podem estar se comportando exatamente como foram desenhados. A divergência é uma lacuna de definição, não um defeito em nenhum dos dois.",
    },
    {
      number: 6,
      title: "Compare estados de processamento",
      insight: "Uma contagem feita no meio do pipeline nunca vai bater com uma contagem feita no final dele.",
      visual: { steps: ["Recebida", "Validada", "Registrada", "Casada", "Liquidada", "Rejeitada"] },
      whyItHelps: "Se o Sistema A conta qualquer coisa depois de \"Recebida\" e o Sistema B só conta \"Liquidada\", a diferença já está explicada antes de você olhar uma única linha.",
    },
    {
      number: 7,
      title: "Verifique os filtros",
      insight: "Alguém, em algum momento, provavelmente aplicou um filtro e esqueceu dele.",
      list: ["Um filtro de tela deixado ligado", "Padrões de relatório que ninguém lembra de ter configurado", "Condições WHERE de SQL embutidas na query", "Status excluídos por padrão"],
      whyItHelps: "Esse único passo resolve mais divergências do que qualquer um dos outros, e é o mais fácil de pular porque parece simples demais para ser a resposta.",
    },
    {
      number: 8,
      title: "Verifique se há duplicatas",
      insight: "Às vezes o número maior é o errado, não o menor.",
      whyItHelps: "Uma requisição reenviada, um batch executado de novo, ou um join que se multiplica inesperadamente podem inflar uma contagem silenciosamente.",
    },
    {
      number: 9,
      title: "Verifique se há registros faltando",
      insight: "E às vezes é o número menor que está incompleto de verdade.",
      whyItHelps: "Uma carga que falhou, um filtro que descarta nulos silenciosamente, ou um join que descarta linhas sem correspondência podem encolher uma contagem silenciosamente.",
    },
    {
      number: 10,
      title: "Compare identificadores",
      insight: "Casar pela chave errada pode parecer exatamente uma divergência de dados.",
      list: ["ID da Operação", "ID da Ordem", "ID da Transação", "ID Externo"],
      whyItHelps: "Se o Sistema A usa um ID de operação interno como chave e o Sistema B usa uma referência externa, registros que na verdade batem vão parecer sem correspondência até o mapeamento ser corrigido.",
    },
    {
      number: 11,
      title: "Pegue uma amostra pequena antes de mexer na população inteira",
      insight: "Não comece pelas 100.000 linhas.",
      whyItHelps: "Escolha de 5 a 10 divergências individuais e rastreie cada uma manualmente. O padrão que explica todas elas geralmente aparece depois da terceira ou quarta.",
      proTip: "Se a mesma explicação der conta das suas primeiras cinco divergências, é bem provável que ela explique o resto também — confirme isso antes de assumir o contrário.",
    },
    {
      number: 12,
      title: "Separe o que você encontrar em categorias de reconciliação",
      insight: "Nem toda divergência é o mesmo tipo de divergência. Separe-as antes de explicá-las.",
      visual: { steps: ["Só em A", "Só em B", "Nos dois, valores diferem", "Nos dois, bate"] },
      whyItHelps: "\"Só em A\" aponta para um problema de registro faltante. \"Nos dois, valores diferem\" aponta para um problema de definição ou tempo. Elas precisam de investigações diferentes, não de uma explicação em comum.",
    },
    {
      number: 13,
      title: "Classifique a causa raiz",
      insight: "Toda divergência remete a uma de um pequeno número de causas.",
      list: ["Dado — algo está faltando ou duplicado", "Definição — os dois lados querem dizer coisas diferentes", "Tempo — os dois lados foram medidos em momentos diferentes", "Processamento — os dois lados estão em estágios diferentes do pipeline", "Relatório — a camada de relatório, não o dado subjacente, está errada", "Requisito — ninguém realmente especificou qual desses estava correto"],
      whyItHelps: "Nomear a categoria já é a maior parte da correção. \"É um problema de tempo\" já diz a todos que tipo de conversa vem a seguir.",
    },
    {
      number: 14,
      title: "Documente a causa real, não só que foi resolvido",
      insight: "\"Resolvido\" não é um achado. É a ausência de um.",
      before: "Divergência de dados resolvida.",
      after: "O Sistema B exclui operações em status PENDING_ALLOCATION enquanto o Sistema A as inclui. Decisão de negócio: a definição do Sistema A está correta; o filtro do relatório do Sistema B foi atualizado para bater com ela.",
      whyItHelps: "A próxima pessoa que se deparar com uma divergência parecida — e vai ter uma próxima pessoa — precisa da causa real, não de uma atualização de status.",
    },
  ],
};
