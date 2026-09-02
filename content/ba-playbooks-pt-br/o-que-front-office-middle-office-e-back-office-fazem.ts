import type { Playbook } from "@/types/content";

const tradeLifecycleQuickReference = `REFERÊNCIA RÁPIDA DO CICLO DE VIDA DA OPERAÇÃO

Market Data — O que está acontecendo?

Reference Data — Com o que exatamente estamos lidando?

Front Office — Como foi executada?

Risk — Que exposição isso criou?

Middle Office — Foi capturada e controlada corretamente?

Back Office — A transação foi concluída?
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/o-que-front-office-middle-office-e-back-office-fazem-body.tsx
// (renderizada via o registro customPlaybookBodies, não a partir de `hacks`).
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Você entra no seu primeiro projeto de Capital Markets. Em poucas reuniões: "isso é um problema do Front Office." Depois: "o Middle Office deveria ter pego isso." Mais tarde: "confere com o Back Office." Todo mundo segue em frente. Você ainda está pensando: o que exatamente são esses "offices"? E onde entram Market Data, Reference Data e Risk? Vamos usar a Reliance Industries na Índia e ocasionalmente a Microsoft nos EUA, para ver como a mesma jornada de operação funciona em mercados diferentes.

Primeiro, esqueça a palavra "escritório". Eles não são necessariamente escritórios físicos. Pense neles como responsabilidades amplas ao longo do ciclo de vida da operação. Um modelo mental simples: o Front Office executa a operação, o Middle Office confere e controla, o Back Office processa até a liquidação. E o Risk pode atravessar a jornada inteira. Não decore o organograma, decore a responsabilidade — firmas diferentes organizam esses times de formas diferentes, mas o ciclo de vida é o que importa.

Market Data: o que está acontecendo? Você está prestes a comprar Reliance na NSE. Primeira pergunta: o que o mercado está fazendo? Você precisa de preço, bid e ask, volume, dado do livro de ofertas, índices, taxas — isso é Market Data. Um trader comprando Microsoft precisa do mesmo tipo de informação do mercado americano correspondente. Market Data é o que está acontecendo no mercado agora. Sem isso, você basicamente está operando no escuro.

Reference Data: com o que exatamente estamos operando? Você diz "comprar Reliance." Um humano entende. Um sistema precisa de mais — qual instrumento, qual bolsa, qual moeda, qual conta, qual contraparte. Isso é Reference Data: instrumentos, bolsas, moedas, contas, entidades legais, instruções de liquidação. Market Data é o que está acontecendo com ele. Reference Data é o que ele é. Essa distinção sozinha já evita muita confusão depois.

Front Office: vamos executar a ordem. Um cliente institucional diz "comprar 10.000 ações da Reliance." A ordem chega ao Front Office — Sales, Trading, Execution, OMS, EMS. O cliente envia uma ordem, mas 10.000 ações podem não ser executadas de uma vez — talvez 3.000, depois 4.000, depois 3.000. Essas são execuções. A mesma ideia se aplica se o cliente estiver comprando Microsoft nos EUA. O Front Office está basicamente perguntando: certo, como a gente realmente executa essa ordem?

A operação foi executada. Terminou? Não. Executada não significa finalizada. A ordem da Reliance pode mostrar FILLED, mas a operação ainda pode ter a conta errada, instruções de liquidação faltando, um descasamento de posição, uma quebra de reconciliação ou uma falha de liquidação. Imagine que a execução foi perfeita, mas a instrução de liquidação aponta para a conta errada. O Front Office vê "operação feita." Os times de pós-operação veem "temos um problema." Sucesso na execução não é igual a ciclo de vida completo.

Middle Office: capturamos isso corretamente? O trader diz "feito." O Middle Office diz "legal, está tudo realmente certo?" As responsabilidades variam por firma, mas o Middle Office costuma lidar com validação de operação, posições, checagens de P&L, reconciliação, enriquecimento de operação, exceções e controles. O Front Office operou. O Middle Office confere se foi capturado e controlado corretamente. Isso já basta para começar.

Risk: o que essa operação mudou? Toda operação muda alguma coisa — uma posição, uma exposição, um risco. Market Risk: e se o preço se mover contra a gente? Credit / Counterparty Risk: e se a outra parte não conseguir cumprir a obrigação dela? Liquidity Risk: a gente consegue financiar ou sair da posição? Operational Risk: e se um sistema ou processo falhar? O Risk não fica parado em um único ponto do ciclo de vida — uma checagem de limite pré-operação é Risk, monitorar exposição depois da execução é Risk, checar se uma contraparte está perto do limite de crédito também é Risk. O Risk pode atravessar a jornada inteira.

Back Office: agora conclua a operação. Você comprou as ações da Reliance. Eventualmente duas coisas precisam acontecer: os títulos se movem, e o dinheiro se move. É aí que entra o Back Office — confirmação, clearing, liquidação, processamento de caixa, processamento de títulos, reconciliação, eventos corporativos, exceções de liquidação. Na Índia, a jornada pode envolver bolsas, câmaras de compensação, corretoras, custodiantes e depositárias como a NSDL ou a CDSL. Nos EUA, a infraestrutura é diferente, mas a pergunta é a mesma: o comprador recebeu os títulos, e o vendedor recebeu o dinheiro? Isso é liquidação da forma mais simples.

Agora olhe a jornada inteira. O que parecia "comprar Reliance" na verdade é: Market Data (o que está acontecendo?) leva a Reference Data (o que estamos operando?) leva a Front Office (ordem, execução, operação) leva a Middle Office (validar, enriquecer, controlar) leva a Back Office (confirmar, compensar, liquidar) leva ao movimento de caixa e títulos. E ao longo de toda a jornada, o Risk pergunta que exposição existe e se estamos dentro dos nossos limites. Essas param de parecer seis definições sem relação — todas estão ajudando uma operação a se mover através de um sistema.

Por que isso importa se você é BA, QA ou desenvolvedor. Imagine que o Desenvolvimento diz "é só um campo novo." Parece inofensivo. Agora comece a perguntar: de onde vem esse campo, o Front Office o cria, o Reference Data o fornece, o Risk o usa, o Middle Office o valida, o Back Office precisa dele, outro sistema downstream o consome? De repente um campo não é só um campo — é informação viajando através de uma cadeia. Para um BA, isso é análise de impacto. Para um QA, isso significa testar além de uma única tela. Para um desenvolvedor, isso explica por que uma mudança pequena pode afetar vários sistemas. E para um recém-formado ou analista, isso te dá o mapa antes de você começar a aprender cada rua.

As seis perguntas para lembrar: Market Data — o que está acontecendo? Reference Data — com o que exatamente estamos lidando? Front Office — como foi executada? Risk — que exposição isso criou? Middle Office — foi capturada e controlada corretamente? Back Office — a transação foi concluída? Você não precisa entender cada sistema no primeiro dia. Comece com: onde isso se encaixa na jornada da operação?

A ideia para levar com você. Quando alguém diz "isso é um problema do Front Office" ou "o Middle Office deveria investigar," não pergunte imediatamente "qual departamento é esse?" Pergunte "o que está acontecendo com a operação nesse ponto?" Essa pergunta geralmente vai te aproximar muito mais da resposta. Porque uma operação não é só uma compra e uma venda — é uma jornada da intenção até a execução, o controle e a liquidação. E Market Data, Reference Data e Risk ajudam essa jornada a funcionar. Uma vez que você vê a jornada, o jargão começa a virar um mapa.`;

export const oQueFrontOfficeMiddleOfficeEBackOfficeFazem: Omit<Playbook, "readingTime"> = {
  slug: "o-que-front-office-middle-office-e-back-office-fazem",
  title: "Front Office, Middle Office e Back Office — O Que Eles Fazem, De Verdade?",
  description: "Vamos acompanhar uma operação, do clique até a liquidação.",
  summary:
    "Uma operação com ações da Reliance, acompanhada da ordem até a liquidação, para mostrar onde Market Data, Reference Data, Front Office, Middle Office, Back Office e Risk realmente se encaixam — e por que \"é só um campo novo\" nunca é só um campo.",
  category: "Capital Markets",
  tags: ["Capital Markets", "Ciclo de Vida da Operação", "Front Office"],
  author: "Surya",
  date: "2026-08-12",
  audience: [
    "Recém-formados e analistas começando o primeiro projeto de Capital Markets",
    "Business Analysts que já ouviram \"isso é um problema do Middle Office\" sem uma definição clara",
    "QAs e desenvolvedores tentando entender por que uma mudança pequena toca vários sistemas",
    "Qualquer um tentando entender como o Capital Markets realmente funciona",
  ],
  bodyText,
  seoTitle: "Front Office, Middle Office e Back Office Explicados | BodhiProtocol",
  seoDescription:
    "Entenda Front Office, Middle Office, Back Office, Market Data, Reference Data e Risk acompanhando uma operação de Capital Markets da ordem até a liquidação.",
  closingHeading: [
    "Uma operação não é só uma compra e uma venda.",
    "É uma jornada da intenção até a execução, o controle e a liquidação.",
  ],
  closingBody:
    "Da próxima vez que alguém disser \"isso é um problema do Front Office\" ou \"o Middle Office deveria investigar,\" não pergunte qual departamento é esse. Pergunte o que está acontecendo com a operação nesse ponto — essa pergunta te aproxima muito mais da resposta.",
  closingTemplate: tradeLifecycleQuickReference,
  closingTemplateName: "Referência Rápida do Ciclo de Vida da Operação",
  relatedPlaybookSlugs: [
    "guia-de-rastreamento-front-to-back",
    "dois-sistemas-mostram-numeros-diferentes",
  ],
  hacks: [
    {
      number: 1,
      title: "Market Data",
      insight: "O que está acontecendo no mercado agora?",
      explanation: "Preço, bid e ask, volume, dado do livro de ofertas, índices, taxas e volatilidade.",
      whyItHelps: "Sem isso, você basicamente está operando no escuro.",
    },
    {
      number: 2,
      title: "Reference Data",
      insight: "Com o que exatamente estamos lidando?",
      explanation: "Instrumentos, bolsas, moedas, contas, entidades legais, instruções de liquidação.",
      whyItHelps: "Market Data te diz o que está acontecendo com ele. Reference Data te diz o que ele é.",
    },
    {
      number: 3,
      title: "Front Office",
      insight: "Como foi executada?",
      explanation: "Sales, Trading, Execution, OMS, EMS — a ordem vira uma ou mais execuções, que viram uma operação.",
      whyItHelps: "O Front Office está perguntando: certo, como a gente realmente executa essa ordem?",
    },
    {
      number: 4,
      title: "Risk",
      insight: "Que exposição isso criou?",
      list: ["Market Risk", "Credit / Counterparty Risk", "Liquidity Risk", "Operational Risk"],
      whyItHelps: "O Risk não fica parado em um único ponto do ciclo de vida — ele atravessa a jornada inteira.",
    },
    {
      number: 5,
      title: "Middle Office",
      insight: "Foi capturada e controlada corretamente?",
      explanation: "Validação de operação, posições, checagens de P&L, reconciliação, enriquecimento de operação, exceções e controles.",
      whyItHelps: "O Front Office operou. O Middle Office confere se foi capturado e controlado corretamente.",
    },
    {
      number: 6,
      title: "Back Office",
      insight: "A transação foi concluída?",
      explanation: "Confirmação, clearing, liquidação, processamento de caixa e títulos — o comprador recebeu os títulos, e o vendedor recebeu o dinheiro?",
      whyItHelps: "Isso é liquidação da forma mais simples, seja a operação na NSE/BSE ou na NASDAQ.",
    },
  ],
};
