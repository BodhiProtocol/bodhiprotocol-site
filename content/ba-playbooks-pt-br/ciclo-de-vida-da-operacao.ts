import type { Playbook } from "@/types/content";

const stageChecklist = `CHECKLIST DE ESTÁGIO DO CICLO DE VIDA DA OPERAÇÃO

Requisito / defeito / pergunta:

ESTÁGIO 1 — ORDEM
Isso toca a instrução antes de ela ser casada (compra/venda, quantidade, tipo de ordem, conta)?

ESTÁGIO 2 — EXECUÇÃO
Isso toca a operação casada em si — uma ordem ou uma de várias execuções parciais?

ESTÁGIO 3 — ENRIQUECIMENTO & CONFIRMAÇÃO
Isso toca os detalhes adicionados depois da execução (conta, moeda, instruções de liquidação) ou a confirmação com a contraparte?

ESTÁGIO 4 — CLEARING
Isso toca a obrigação depois da novação — o lado da câmara de compensação, não o da contraparte original?

ESTÁGIO 5 — LIQUIDAÇÃO
Isso toca a movimentação real de ativos e caixa na data de liquidação?

A qual estágio isso realmente pertence?

"Operação completa", aqui, quer dizer executada ou liquidada?
`;

export const cicloDeVidaDaOperacao: Omit<Playbook, "readingTime"> = {
  slug: "ciclo-de-vida-da-operacao",
  title: "Guia do Ciclo de Vida da Operação",
  description: "Os cinco estágios que uma operação atravessa e o que um BA verifica em cada um.",
  summary:
    "Uma passagem estágio a estágio por uma operação, da Ordem até a Liquidação — Ordem, Execução, Enriquecimento & Confirmação, Clearing, Liquidação — com o que realmente acontece em cada estágio, onde requisitos quebram em silêncio e um modelo gratuito de checklist de estágio.",
  category: "Capital Markets",
  tags: ["Ciclo de Vida da Operação", "Capital Markets", "Liquidação"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Estágio",
  intro: [
    "Seu gestor diz que a mudança está \"no estágio de liquidação\". Você acena com a cabeça. Mas você não sabe de verdade quantos estágios vêm antes da liquidação, nem o que acontece em cada um — então você não consegue dizer se essa mudança sequer pertence ali.",
    "Uma operação não é um evento só. Do momento em que um cliente diz \"comprar\" até o momento em que ativos e caixa realmente trocam de mãos, ela passa fisicamente por cinco estágios distintos — cada um produzindo um registro diferente, num sistema diferente, sob responsabilidade de um time diferente.",
    "Front Office, Middle Office e Back Office dizem quem é responsável (veja o outro guia para essa perspectiva). Este aqui é a mecânica — o que entra em cada estágio, o que muda dentro dele e o que você está realmente confirmando antes de a operação poder avançar para o próximo.",
  ],
  audience: [
    "Recém-formados e BAs começando seu primeiro projeto de Capital Markets ou ciclo de vida da operação",
    "BAs que conhecem as responsabilidades de Front/Middle/Back Office, mas não sabem o que acontece dentro de cada estágio",
    "QAs e desenvolvedores tentando descobrir a qual estágio um defeito realmente pertence",
    "Qualquer um prestes a escrever um requisito que toca o processamento de operações",
  ],
  seoTitle: "Guia do Ciclo de Vida da Operação — Da Ordem à Liquidação para BAs | BodhiProtocol",
  seoDescription:
    "Os cinco estágios de uma operação — Ordem, Execução, Enriquecimento & Confirmação, Clearing, Liquidação — explicados estágio a estágio para Analistas de Negócios, com um modelo gratuito de checklist de estágio.",
  closingHeading: ["Uma operação não é um evento só.", "São cinco estágios, e cada um pode quebrar sozinho."],
  closingBody:
    "Ordem, Execução, Enriquecimento & Confirmação, Clearing, Liquidação — saiba a qual estágio um requisito, defeito ou pergunta realmente pertence, e \"a operação já terminou?\" deixa de ser a única pergunta que você sabe fazer.",
  closingTemplate: stageChecklist,
  closingTemplateName: "Checklist de Estágio do Ciclo de Vida da Operação",
  hacks: [
    {
      number: 1,
      title: "Cinco estágios, não um único momento de \"operação pronta\"",
      insight: "Toda operação, em qualquer bolsa, passa pelos mesmos cinco estágios, na mesma ordem.",
      visual: { steps: ["Ordem", "Execução", "Enriquecimento & Confirmação", "Clearing", "Liquidação"] },
      explanation:
        "O \"pronto\" de um trader geralmente significa Execução — estágio dois de cinco. Mais três estágios ainda precisam acontecer corretamente antes de o cliente realmente possuir os ativos e o vendedor realmente ter o caixa. A maior parte da confusão entre times (\"eu achei que isso já tinha liquidado\") vem de duas pessoas usando \"pronto\" para significar dois estágios diferentes.",
      whyItHelps: "Uma vez que você consegue nomear os cinco estágios, \"onde isso está no ciclo de vida\" vira uma resposta específica em vez de um chute.",
    },
    {
      number: 2,
      title: "Ordem — a instrução, antes de qualquer casamento",
      insight: "O ciclo de vida começa com uma instrução, não com uma operação.",
      explanation:
        "Um cliente instrui um corretor a comprar ou vender — instrumento, quantidade, tipo de ordem (a mercado ou limitada), conta. Essa instrução é uma ordem. Ela ainda não foi casada com ninguém e talvez nunca seja totalmente casada: pode ser parcialmente executada, cancelada ou expirar sem execução.",
      compare: {
        leftLabel: "Ordem",
        left: "Uma instrução para comprar ou vender. Ainda não executada. Pode ser parcialmente executada, cancelada ou expirar.",
        rightLabel: "Operação",
        right: "A execução casada de fato. Uma ordem pode gerar várias operações se for executada em partes.",
      },
      whyItHelps: "Saber que uma ordem não é uma operação explica por que uma ordem pode virar três registros de operação separados mais adiante — e por que contar ordens em vez de operações quebra uma reconciliação em silêncio.",
    },
    {
      number: 3,
      title: "Execução — a ordem vira uma ou mais operações",
      insight: "A ordem é casada com uma contraparte a um preço e uma quantidade — esse casamento é a operação.",
      explanation:
        "Uma ordem de 10.000 ações pode não ser executada de uma vez só — 3.000 aqui, 4.000 ali, 3.000 depois, cada uma contra uma contraparte diferente, possivelmente a um preço diferente. Cada execução parcial é seu próprio registro de operação, com seu próprio ID de execução. A ordem é o pedido; a operação é o que realmente aconteceu na bolsa.",
      whyItHelps: "Se um requisito presume que \"uma ordem é igual a uma operação\", ele vai lidar mal, em silêncio, com toda ordem parcialmente executada — que, numa mesa ativa, é a maioria delas.",
    },
    {
      number: 4,
      title: "Enriquecimento & Confirmação — a operação recebe o que precisa para liquidar",
      insight: "Uma operação recém-executada ainda não carrega o que a liquidação precisa — isso é adicionado logo depois.",
      explanation:
        "A execução só produz instrumento, quantidade, preço e contraparte. O Middle Office enriquece essa operação bruta com dados de referência — conta do comprador, moeda, instruções padrão de liquidação — e então confirma que esses detalhes batem com a contraparte antes de qualquer um se comprometer a liquidar.",
      before: "Status da operação: Executada.",
      after: "Status da operação: Executada e enriquecida — conta, moeda e instrução de liquidação anexadas, confirmadas com a contraparte.",
      whyItHelps: "É aqui que os requisitos mais frequentemente quebram em silêncio: a execução pode estar impecável e a liquidação ainda assim falhar porque o enriquecimento anexou uma instrução de liquidação desatualizada ou errada.",
      proTip: "Se uma liquidação está travada e a execução parece limpa, verifique o enriquecimento antes de verificar qualquer coisa depois dele.",
    },
    {
      number: 5,
      title: "Clearing — a operação vira uma obrigação da câmara de compensação",
      insight: "Numa bolsa, você não liquida de fato com a sua contraparte original — você liquida com a câmara de compensação.",
      explanation:
        "Por meio de um processo chamado novação, a câmara de compensação (NSE Clearing ou ICCL na Índia, DTCC/NSCC nos EUA; no Brasil, a B3) entra no meio de toda operação — virando a compradora para todo vendedor e a vendedora para todo comprador. Ela também faz netting: várias operações de compra e venda do mesmo instrumento no mesmo dia se colapsam em uma única obrigação líquida por membro. É por isso que uma contraparte em default não derruba a operação inteira junto.",
      whyItHelps: "Uma vez que você sabe que o clearing aconteceu, \"contra quem essa operação liquida\" deixa de ser a contraparte original e passa a ser a câmara de compensação — e problemas de margem ou de membro de compensação ficam tão relevantes para a liquidação quanto a operação em si.",
    },
    {
      number: 6,
      title: "Liquidação — ativos e caixa realmente trocam de mãos",
      insight: "Esse é o único estágio em que algo se move fisicamente.",
      explanation:
        "Na data de liquidação, a depositária (NSDL ou CDSL na Índia; no Brasil, a B3) move os ativos do vendedor para o comprador enquanto o caixa se move na direção oposta — feito junto, como Entrega contra Pagamento (DvP), para que nenhum dos lados entregue a sua parte sem receber a do outro. A data de liquidação não é o mesmo dia da execução; para ações à vista na Índia, costuma ser o próximo dia de pregão (T+1).",
      before: "Painel: \"Operação completa\" (significa: executada).",
      after: "Painel: \"Operação liquidada\" (significa: ativos creditados na conta demat do comprador, caixa debitado e creditado entre os custodiantes).",
      whyItHelps: "\"Operação completa\" numa tela de front-end costuma significar executada, não liquidada — e o intervalo entre as duas pode ser um dia inteiro ou mais, que é exatamente a janela onde falhas de liquidação moram.",
    },
    {
      number: 7,
      title: "Erros que BAs novos cometem no primeiro projeto de ciclo de vida",
      insight: "O mesmo punhado de suposições causa a maior parte da confusão inicial.",
      list: [
        "Tratar \"operação pronta\" como \"ciclo de vida pronto\", em vez de verificar a qual estágio \"pronto\" realmente se refere",
        "Presumir que uma ordem sempre corresponde a exatamente um registro de operação",
        "Confundir clearing com liquidação — são dois estágios distintos, não um só",
        "Presumir que a liquidação acontece no mesmo dia da execução, em vez de numa data de liquidação separada",
        "Não verificar se uma liquidação travada é na verdade um problema de enriquecimento (conta ou instrução errada) em vez de um problema do estágio de liquidação",
      ],
      whyItHelps: "Cada um desses transforma uma pergunta de ciclo de vida de cinco minutos numa investigação bem mais longa, se não for verificado.",
    },
    {
      number: 8,
      title: "Perguntas para guardar no bolso",
      insight: "Elas funcionam em praticamente qualquer requisito, defeito ou investigação de processamento de operações.",
      checklist: [
        "A qual estágio isso realmente toca — Ordem, Execução, Enriquecimento & Confirmação, Clearing ou Liquidação?",
        "Isso é um único registro de operação ou pode ser vários (execuções parciais, obrigações líquidas)?",
        "Qual é a data de liquidação desse instrumento, e o requisito presume que é no mesmo dia?",
        "Depois do clearing, de quem é essa obrigação — da contraparte original ou da câmara de compensação?",
        "\"Operação completa\", neste requisito, significa executada ou liquidada?",
      ],
      whyItHelps: "Fazer essas perguntas antes de escrever ou revisar um requisito pega uma lacuna de escopo antes de um desenvolvedor construir contra o estágio errado.",
    },
  ],
};
