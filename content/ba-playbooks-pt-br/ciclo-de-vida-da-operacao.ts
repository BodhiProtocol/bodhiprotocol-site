import type { Playbook } from "@/types/content";

const checklistEtapasDoCiclo = `CHECKLIST DE ETAPAS DO CICLO DE VIDA DA OPERAÇÃO

Requisito / defeito / dúvida:

ETAPA 1 — ORDEM
Isso envolve a instrução antes de ela ser casada (compra/venda, quantidade, tipo de ordem, conta)?

ETAPA 2 — EXECUÇÃO
Isso envolve a operação já casada em si — uma ordem, ou uma de várias execuções parciais?

ETAPA 3 — ENRIQUECIMENTO E CONFIRMAÇÃO
Isso envolve os dados adicionados após a execução (conta, moeda, instruções de liquidação) ou a confirmação com a contraparte?

ETAPA 4 — COMPENSAÇÃO
Isso envolve a obrigação após a novação — o lado da câmara de compensação, não o da contraparte original?

ETAPA 5 — LIQUIDAÇÃO
Isso envolve a movimentação real de títulos e dinheiro na data de liquidação?

A qual etapa isso realmente pertence?

Aqui, "operação concluída" quer dizer executada, ou liquidada?
`;

export const cicloDeVidaDaOperacao: Omit<Playbook, "readingTime"> = {
  slug: "ciclo-de-vida-da-operacao",
  title: "Ciclo de Vida da Operação: da Ordem à Liquidação",
  description: "As cinco etapas que uma operação percorre, e o que uma BA verifica em cada uma delas.",
  summary:
    "Uma travessia etapa por etapa de uma operação, da Ordem à Liquidação — Ordem, Execução, Enriquecimento e Confirmação, Compensação, Liquidação — com o que acontece em cada etapa, onde os requisitos quebram silenciosamente, e um checklist de etapas gratuito.",
  category: "Capital Markets",
  tags: ["Ciclo da Operação", "Mercado de Capitais", "Liquidação"],
  author: "Surya",
  date: "2026-09-01",
  itemLabel: "Etapa",
  intro: [
    "Seu gestor diz que a mudança está \"na etapa de liquidação\". Você concorda com a cabeça. Mas, na verdade, não sabe quantas etapas vêm antes da liquidação, nem o que acontece em cada uma — então não consegue dizer se essa mudança realmente pertence ali.",
    "Uma operação não é um evento único. Do momento em que um cliente diz \"comprar\" até o momento em que os títulos e o dinheiro realmente trocam de mãos, ela passa fisicamente por cinco etapas distintas — cada uma gerando um registro diferente, em um sistema diferente, sob responsabilidade de um time diferente.",
    "Front Office, Middle Office e Back Office dizem quem é responsável (essa é a lente de outro playbook). Este aqui é sobre a mecânica — o que entra em cada etapa, o que muda dentro dela, e o que você está realmente confirmando antes de a operação poder avançar para a próxima.",
  ],
  audience: [
    "Iniciantes e BAs começando seu primeiro projeto de Mercado de Capitais ou de ciclo de vida da operação",
    "BAs que já conhecem as responsabilidades de Front/Middle/Back Office, mas não o que acontece dentro de cada etapa",
    "QAs e desenvolvedores tentando descobrir a qual etapa um defeito realmente pertence",
    "Qualquer pessoa prestes a escrever um requisito que envolve o processamento de operações",
  ],
  seoTitle: "Ciclo de Vida da Operação — Guia para BAs de Mercado de Capitais | BodhiProtocol",
  seoDescription:
    "As cinco etapas de uma operação — Ordem, Execução, Enriquecimento e Confirmação, Compensação e Liquidação — explicadas passo a passo para Business Analysts, com checklist gratuito.",
  closingHeading: ["Uma operação não é um evento único.", "São cinco etapas, e cada uma pode quebrar por conta própria."],
  closingBody:
    "Ordem, Execução, Enriquecimento e Confirmação, Compensação, Liquidação — saiba a qual etapa um requisito, defeito ou dúvida realmente pertence, e \"a operação já foi concluída?\" deixa de ser a única pergunta que você sabe fazer.",
  closingTemplate: checklistEtapasDoCiclo,
  closingTemplateName: "Checklist de Etapas do Ciclo de Vida da Operação",
  hacks: [
    {
      number: 1,
      title: "Cinco etapas, não um único momento de \"operação concluída\"",
      insight: "Toda operação, em qualquer bolsa, passa pelas mesmas cinco etapas, na mesma ordem.",
      visual: { steps: ["Ordem", "Execução", "Enriquecimento e Confirmação", "Compensação", "Liquidação"] },
      explanation:
        "Quando um trader diz \"concluída\", geralmente quer dizer Execução — a etapa dois de cinco. Ainda faltam três etapas para acontecerem corretamente antes de o cliente realmente ser dono das ações e o vendedor realmente ter o dinheiro em mãos. A maior parte da confusão entre times (\"eu achei que isso já tinha sido liquidado\") vem de duas pessoas usando \"concluída\" para se referir a duas etapas diferentes.",
      whyItHelps: "Depois que você consegue nomear as cinco etapas, \"em que ponto do ciclo isso está\" deixa de ser um chute e passa a ter uma resposta específica.",
    },
    {
      number: 2,
      title: "Ordem — a instrução, antes de qualquer coisa ser casada",
      insight: "O ciclo começa com uma instrução, não com uma operação.",
      explanation:
        "Um cliente instrui a corretora a comprar ou vender — ativo, quantidade, tipo de ordem (a mercado ou limitada), conta. Essa instrução é uma ordem. Ela ainda não foi casada com ninguém, e pode nunca ser totalmente casada: pode ser parcialmente executada, cancelada, ou expirar sem execução.",
      compare: {
        leftLabel: "Ordem",
        left: "Uma instrução de compra ou venda. Ainda não executada. Pode ser parcialmente executada, cancelada ou expirar.",
        rightLabel: "Operação",
        right: "A execução casada de fato. Uma ordem pode gerar várias operações se for executada em partes.",
      },
      whyItHelps: "Saber que ordem e operação não são a mesma coisa explica por que uma ordem pode virar três registros de operação separados mais à frente — e por que contar ordens em vez de operações quebra silenciosamente uma reconciliação.",
    },
    {
      number: 3,
      title: "Execução — a ordem se transforma em uma ou mais operações",
      insight: "A ordem é casada com uma contraparte a um preço e uma quantidade — esse casamento é a operação.",
      explanation:
        "Uma ordem de 10.000 ações pode não ser executada de uma vez só — 3.000 aqui, 4.000 ali, 3.000 depois, cada uma contra uma contraparte diferente e, possivelmente, a um preço diferente. Cada execução parcial vira seu próprio registro de operação, com seu próprio ID de execução. A ordem é o pedido; a operação é o que realmente aconteceu na bolsa.",
      whyItHelps: "Se um requisito assume que \"uma ordem é igual a uma operação\", ele vai tratar mal, silenciosamente, toda ordem executada parcialmente — o que, em uma mesa ativa, é a maioria delas.",
    },
    {
      number: 4,
      title: "Enriquecimento e Confirmação — a operação recebe o que precisa para ser liquidada",
      insight: "Uma operação recém-executada ainda não carrega o que a liquidação precisa — isso é adicionado logo em seguida.",
      explanation:
        "A execução só produz ativo, quantidade, preço e contraparte. O Middle Office enriquece essa operação bruta com dados de referência — conta do comprador, moeda, instruções padrão de liquidação — e então confirma que esses detalhes batem com a contraparte antes que alguém se comprometa a liquidar.",
      before: "Status da operação: Executada.",
      after: "Status da operação: Executada e enriquecida — conta, moeda e instrução de liquidação anexadas, confirmadas com a contraparte.",
      whyItHelps: "É aqui que os requisitos mais silenciosamente quebram: a execução pode ser perfeita e a liquidação ainda assim falhar, porque a etapa de enriquecimento anexou uma instrução de liquidação desatualizada ou errada.",
      proTip: "Se uma liquidação está travada e a execução parece limpa, verifique o enriquecimento antes de verificar qualquer coisa depois dele.",
    },
    {
      number: 5,
      title: "Compensação — a operação se torna uma obrigação da câmara de compensação",
      insight: "Numa bolsa, você não liquida de fato com sua contraparte original — você liquida com a câmara de compensação.",
      explanation:
        "Por meio de um processo chamado novação, a câmara de compensação (NSE Clearing ou ICCL na Índia, DTCC/NSCC nos Estados Unidos) se coloca no meio de cada operação — tornando-se a compradora para cada vendedor e a vendedora para cada comprador. Ela também faz netting: várias operações de compra e venda do mesmo ativo no mesmo dia são consolidadas em uma única obrigação líquida por participante. É por isso que a inadimplência de uma contraparte não derruba a operação inteira junto com ela.",
      whyItHelps: "Depois que você sabe que a compensação aconteceu, \"contra quem essa operação vai ser liquidada\" deixa de ser a contraparte original e passa a ser a câmara de compensação — e problemas de margem ou do membro de compensação se tornam tão relevantes para a liquidação quanto a própria operação.",
    },
    {
      number: 6,
      title: "Liquidação — títulos e dinheiro realmente trocam de mãos",
      insight: "Essa é a única etapa em que algo realmente se movimenta.",
      explanation:
        "Na data de liquidação, a depositária (NSDL ou CDSL, na Índia) move os títulos do vendedor para o comprador, enquanto o dinheiro se move no sentido contrário — os dois juntos, como Entrega contra Pagamento (DvP), para que nenhum dos lados entregue sua parte sem receber a outra. A data de liquidação não é o mesmo dia da execução; para ações à vista na Índia, costuma ser o próximo dia útil de negociação (T+1).",
      before: "Painel: \"Operação concluída\" (significa: executada).",
      after: "Painel: \"Operação liquidada\" (significa: títulos creditados na conta demat do comprador, dinheiro debitado e creditado entre os custodiantes).",
      whyItHelps: "\"Operação concluída\" numa tela de front-end geralmente significa executada, não liquidada — e o intervalo entre as duas pode ser um dia inteiro ou mais, exatamente a janela onde vivem as falhas de liquidação.",
    },
    {
      number: 7,
      title: "Erros que BAs novos cometem no primeiro projeto de ciclo de vida",
      insight: "Um punhado das mesmas suposições causa a maior parte da confusão no início.",
      list: [
        "Tratar \"operação concluída\" como \"ciclo concluído\" em vez de verificar a qual etapa \"concluída\" realmente se refere",
        "Assumir que uma ordem sempre é igual a exatamente um registro de operação",
        "Confundir compensação com liquidação — são duas etapas distintas, não uma só",
        "Assumir que a liquidação acontece no mesmo dia da execução, em vez de numa data de liquidação separada",
        "Não verificar se uma liquidação travada é, na verdade, um problema de enriquecimento (conta ou instrução errada) em vez de um problema da própria etapa de liquidação",
      ],
      whyItHelps: "Cada um desses erros transforma uma pergunta de cinco minutos sobre o ciclo em uma investigação bem mais longa, se não for verificado a tempo.",
    },
    {
      number: 8,
      title: "Perguntas para guardar no bolso",
      insight: "Elas funcionam em praticamente qualquer requisito, defeito ou investigação de processamento de operações.",
      checklist: [
        "A qual etapa isso realmente pertence — Ordem, Execução, Enriquecimento e Confirmação, Compensação ou Liquidação?",
        "Isso é um único registro de operação, ou pode ser vários (execuções parciais, obrigações líquidas)?",
        "Qual é a data de liquidação desse ativo, e o requisito está assumindo que é no mesmo dia?",
        "Depois da compensação, de quem é essa obrigação — da contraparte original, ou da câmara de compensação?",
        "\"Operação concluída\", neste requisito, significa executada ou liquidada?",
      ],
      whyItHelps: "Fazer essas perguntas antes de escrever ou revisar um requisito pega uma lacuna de escopo antes que um desenvolvedor construa algo contra a etapa errada.",
    },
  ],
};
