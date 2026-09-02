import type { Playbook } from "@/types/content";

const traceLog = `LOG DE RASTREAMENTO FRONT-TO-BACK

ID âncora:
Tipo de registro (operação / ordem / sinistro / ticket / outro):

ESTÁGIO 1
Sistema:
ID usado aqui:
O que chegou:
O que saiu:
Horário:
Status:
Notas / lacuna:

ESTÁGIO 2
Sistema:
ID usado aqui:
O que chegou:
O que saiu:
Horário:
Status:
Notas / lacuna:

ESTÁGIO 3
Sistema:
ID usado aqui:
O que chegou:
O que saiu:
Horário:
Status:
Notas / lacuna:

ESTÁGIO 4
Sistema:
ID usado aqui:
O que chegou:
O que saiu:
Horário:
Status:
Notas / lacuna:

ESTÁGIO 5
Sistema:
ID usado aqui:
O que chegou:
O que saiu:
Horário:
Status:
Notas / lacuna:

PONTO DE QUEBRA
Estágio onde a história parou de bater:
O que deveria ter acontecido:
O que realmente aconteceu:
Tipo de causa raiz (dado / definição / tempo / processamento / responsabilidade):
`;

export const guiaDeRastreamentoFrontToBack: Omit<Playbook, "readingTime"> = {
  slug: "guia-de-rastreamento-front-to-back",
  title: "Guia de Rastreamento Front-to-Back",
  description: "Siga um ID, do início ao fim, até a história parar de bater.",
  summary:
    "Um framework de rastreamento em cinco passos — Marcar, Mapear, Perguntar, Comparar, Explicar — para achar exatamente onde uma operação, ordem, sinistro ou ticket quebrou, usando uma operação da Reliance e exemplos equivalentes de e-commerce, seguros, saúde e crédito.",
  category: "Capital Markets",
  tags: ["Investigação", "Ciclo de Vida da Operação", "Causa Raiz"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Passo",
  intro: [
    "Seu gestor repassa uma mensagem: \"O cliente diz que vendeu as ações da Reliance dele semana passada. O dinheiro ainda não caiu na conta dele. Você consegue descobrir o que aconteceu?\" Você abre três sistemas. O Front Office mostra a operação como concluída. A Operação não mostra nada sinalizado. A Custódia mostra liquidação pendente. Todo mundo está tecnicamente certo, e o cliente ainda está esperando.",
    "Troque \"operação\" por ordem, sinistro, ticket ou consulta de paciente e você vai bater na mesma parede exata em qualquer projeto — bancário, e-commerce, seguros, saúde, não importa. Um registro passa por cinco ou seis sistemas no caminho do início ao fim, algo acontece pelo caminho, e todo painel continua dizendo \"tudo certo\".",
    "A solução não é perguntar quem quebrou. É perguntar onde, nessa jornada, a história parou de bater. Isso é um rastreamento e cabe num método de cinco passos fácil de lembrar sob pressão — no original em inglês, o mnemônico é TRACE (Tag, Route, Ask, Compare, Explain); em português, Marcar, Mapear, Perguntar, Comparar, Explicar. Cinco passos, executados em ordem, em praticamente qualquer registro que tenha um ID vinculado.",
  ],
  audience: [
    "Recém-formados e BAs chamados para investigar pela primeira vez uma operação, ordem ou sinistro quebrado",
    "QAs e desenvolvedores tentando isolar qual estágio de um pipeline realmente falhou",
    "Business Analysts fazendo investigação de causa raiz ou impacto entre sistemas bancários, de e-commerce, seguros ou saúde",
    "Qualquer um que recebeu um ID e a instrução \"só descobre o que aconteceu\"",
  ],
  seoTitle: "Guia de Rastreamento Front-to-Back | BodhiProtocol",
  seoDescription:
    "Um framework de rastreamento em cinco passos — Marcar, Mapear, Perguntar, Comparar, Explicar — para achar exatamente onde uma operação, ordem, sinistro ou ticket quebrou.",
  closingHeading: ["Não pergunte quem quebrou.", "Pergunte onde a história parou de bater."],
  closingBody:
    "Marque o ID, mapeie a jornada, pergunte o que entrou e o que saiu em cada parada, compare os dados em vez do status e nomeie o ponto exato onde a história parou de bater. É esse o método inteiro — numa operação, numa ordem, num sinistro ou num ticket.",
  closingTemplate: traceLog,
  closingTemplateName: "Log de Rastreamento Front-to-Back",
  hacks: [
    {
      number: 1,
      title: "Marcar: encontre o único ID que sobrevive à jornada inteira",
      insight: "Antes de abrir um único sistema, encontre o ID que amarra todos os estágios desse registro.",
      explanation:
        "Uma operação carrega um ID de ordem, depois um ou mais IDs de execução, depois um ID de operação, depois uma referência de liquidação. Um pedido de e-commerce carrega um número de pedido, uma referência de pagamento, um código de rastreio de envio. Um sinistro de seguro carrega um número de sinistro que sobrevive a vários IDs internos de caso. Os sistemas nem sempre chamam a mesma coisa pelo mesmo nome, e um ID lá em cima pode virar vários lá embaixo — uma ordem dividida em três remessas, um pedido pai casado com várias execuções parciais.",
      list: [
        "Como esse registro é chamado em cada sistema pelo qual ele passa?",
        "Um ID mapeia para exatamente um registro mais adiante, ou ele pode se dividir (execuções parciais, remessas divididas) ou se juntar (sinistros em lote)?",
      ],
      whyItHelps: "Sem uma âncora fixa, você acaba perseguindo quatro números de referência diferentes e chamando isso de quatro problemas diferentes.",
    },
    {
      number: 2,
      title: "Mapear: desenhe a jornada do início ao fim",
      insight: "Antes de culpar um sistema, desenhe os estágios pelos quais o registro realmente passa.",
      visual: { steps: ["Entrada", "Processamento", "Validação / Controle", "Confirmação", "Conclusão"] },
      explanation:
        "Os nomes dos estágios mudam por setor, o formato não muda. Uma corretora como a Zerodha ou um banco global passam uma operação por Ordem, Execução, Enriquecimento, Confirmação, Liquidação. A Flipkart e a Amazon passam um pedido por Carrinho, Pagamento, Separação, Envio, Nota Fiscal. A LIC e uma seguradora como a Allstate passam um sinistro por Entrada, Análise, Aprovação, Pagamento. Uma rede hospitalar como a Apollo e um sistema de saúde americano passam um episódio de paciente por Agendamento, Atendimento, Faturamento, Sinistro do Convênio, Reembolso. E uma financeira, de uma NBFC indiana a um banco americano, passa um empréstimo por Solicitação, Análise de Crédito, Liberação, Cronograma de Pagamento. Setores diferentes, o mesmo formato de cinco estágios.",
      whyItHelps: "Uma vez que a jornada está no papel, \"onde quebrou\" vira uma caixa específica para marcar, não um argumento vago entre times.",
    },
    {
      number: 3,
      title: "Perguntar em cada parada: o que entrou e o que saiu?",
      insight: "Em cada estágio, faça duas perguntas separadas, não uma.",
      explanation:
        "Vá estágio por estágio usando a rota que você acabou de mapear. Na Execução, pergunte o que entrou (a ordem) e o que saiu (uma ou mais execuções). No Enriquecimento, pergunte o que entrou (a execução) e o que saiu (uma operação totalmente marcada, com conta, moeda e instrução de liquidação anexadas). Não pule um estágio porque ele \"provavelmente funcionou\" — os que as pessoas pulam costumam ser onde a lacuna está.",
      list: [
        "O que esse estágio recebeu?",
        "O que esse estágio produziu — e isso bate com o que o próximo estágio realmente recebeu?",
      ],
      whyItHelps: "A maioria das quebras mora na lacuna entre dois estágios, não dentro de um deles — uma atualização de status que nunca disparou, um campo que não foi carregado adiante, um job de batch que pulou um registro em silêncio.",
      whenToUse: "Use isso no momento em que um sinalizador de status diz \"completo\", mas a pessoa mais adiante diz outra coisa.",
    },
    {
      number: 4,
      title: "Comparar os dados, não só o status",
      insight: "Um status verde e um resultado correto não são a mesma coisa.",
      before: "Status de liquidação: COMPLETA.",
      after: "Status de liquidação: COMPLETA — mas a instrução de liquidação aponta para uma conta encerrada, então nada realmente se moveu.",
      explanation:
        "O mesmo padrão aparece em todo lugar. Um pedido de e-commerce pode mostrar \"Entregue\" enquanto o próprio log de leitura da transportadora mostra o pacote ainda em trânsito. Um sinistro de seguro pode mostrar \"Pagamento Processado\" enquanto o arquivo de pagamento foi rejeitado no banco. Um ticket de suporte pode mostrar \"Resolvido\" enquanto o cliente nunca recebeu resposta. O campo de status é o que o sistema foi instruído a exibir. O registro por baixo dele é o que realmente aconteceu — e os dois podem discordar em silêncio.",
      whyItHelps: "Sinalizadores de status dizem o que o sistema acredita que aconteceu. O registro subjacente diz o que realmente aconteceu. Confie no segundo.",
      proTip: "Puxe o registro real em cada estágio em vez de confiar num painel que resume tudo. Resumos são exatamente onde essas lacunas se escondem.",
    },
    {
      number: 5,
      title: "Explicar o ponto de queda",
      insight: "O estágio onde o que-entrou para de bater com o que-saiu é o seu ponto de quebra — não a resposta inteira, mas exatamente onde cavar.",
      explanation:
        "Voltando às ações da Reliance do cliente. Marcar: o ID de operação da ordem conecta de forma limpa a uma execução e uma referência de liquidação — sem divisão, sem junção. Mapear: Ordem, Execução, Enriquecimento, Confirmação, Liquidação. Perguntar e Comparar, estágio por estágio: a operação foi corretamente executada e corretamente confirmada. Mas o registro que o Enriquecimento produziu carrega uma instrução de liquidação para uma conta que o cliente encerrou dois meses antes — que é exatamente por que a Liquidação está travada em \"pendente\" desde então. Esse é o ponto de queda: não um problema de Front Office, não um problema de Custódia, um único registro de enriquecimento com um número de conta desatualizado.",
      whyItHelps:
        "\"Em algum lugar entre Front Office e Liquidação\" não é um achado. \"A operação saiu do Middle Office corretamente enriquecida, mas a instrução de liquidação que o Back Office recebeu aponta para uma conta encerrada\" é algo que alguém consegue agir hoje.",
    },
    {
      number: 6,
      title: "Erros que travam um rastreamento",
      insight: "O mesmo punhado de hábitos atrasa quase toda investigação.",
      list: [
        "Pular para \"é um bug técnico\" antes de percorrer o registro estágio por estágio",
        "Confiar num sinalizador de status em vez do registro real subjacente",
        "Rastrear só para frente — às vezes a quebra aconteceu antes de onde o sintoma apareceu",
        "Perseguir um ID diferente em cada estágio em vez de mapeá-los para uma âncora primeiro",
        "Tratar um registro quebrado como um caso isolado sem verificar se um lote inteiro foi afetado",
        "Não registrar o que você encontrou em cada parada e perder a trilha depois de uma interrupção",
      ],
      whyItHelps: "Cada um desses pode transformar um rastreamento de 20 minutos numa discussão de dois dias.",
    },
    {
      number: 7,
      title: "Perguntas para guardar no bolso",
      insight: "Elas funcionam tanto rastreando uma operação quanto uma ordem, um sinistro ou um ticket de suporte.",
      checklist: [
        "Qual é o ID âncora nesse estágio e ele mapeia de forma limpa para o ID do estágio anterior?",
        "O que esse estágio recebeu, exatamente?",
        "O que esse estágio enviou adiante, exatamente?",
        "Existe um horário registrado aqui, e a sequência de horários faz sentido do início ao fim?",
        "Quem é dono desse estágio, e qual é o caminho de escalação se ele estiver travado?",
        "Esse estágio poderia falhar em silêncio — sem erro, só dado errado ou faltando?",
        "Isso é um único registro quebrado, ou a mesma lacuna aparece em outros do mesmo lote ou dia?",
      ],
      whyItHelps: "Fazer essas perguntas em ordem te leva ao ponto de queda mais rápido do que perguntar \"o que aconteceu\" e esperar alguém se voluntariar para responder.",
    },
  ],
};
