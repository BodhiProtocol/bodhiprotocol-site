import type { Playbook } from "@/types/content";

const questionBank = `PROBLEMA
Que problema isso está realmente resolvendo?
O que acontece se não fizermos nada?

ESTADO ATUAL
O que acontece hoje?
Quem executa o processo?
Qual(is) sistema(s) está(ão) envolvido(s)?
Que parte disso é manual?
Onde costuma quebrar?
Já existe um workaround em uso?

USUÁRIOS
Quem pediu isso?
Quem vai realmente usar isso no dia a dia?
São a mesma pessoa?

GATILHO
O que dá início a esse processo?
Uma ação do usuário, um evento de sistema, ou um batch agendado?

PROCESSO
Como é o fluxo principal, do início ao fim?
Qual é a menor versão disso que ainda seria útil?

REGRAS DE NEGÓCIO
Existem limites, tetos ou condições de aprovação envolvidos?
Clientes, produtos ou mercados diferentes se comportam de forma diferente?

EXCEÇÕES
O que acontece se faltar um dado obrigatório?
O que acontece se um sistema upstream estiver indisponível?
O que acontece se a solicitação for duplicada?
O que acontece se o processamento tiver sucesso parcial?

DADOS
De onde vem o dado?
Quem é o dono dele?
Quais campos são obrigatórios, e quais são opcionais?

DEPENDÊNCIAS
De quais outros sistemas, times ou requisitos isso depende?
O que mais depende disso?

SEGURANÇA
Quem NÃO deveria conseguir ver ou acionar isso?
Existem restrições de jurisdição ou de perfil de acesso?

RELATÓRIOS
Isso precisa ser reportado?
Para quem, e com que frequência?

AUDITORIA
Essa ação precisa ser rastreável depois?
O que especificamente precisa ser registrado?

SUCESSO
Como vamos saber que isso realmente funcionou?
Como é "melhor", de forma mensurável?

QUESTÕES EM ABERTO
[Qualquer coisa ainda não confirmada]

SUPOSIÇÕES
[Qualquer coisa sendo assumida em vez de confirmada]
`;

export const guiaDeLevantamentoDeRequisitos: Omit<Playbook, "readingTime"> = {
  slug: "guia-de-levantamento-de-requisitos",
  title: "Guia de Levantamento de Requisitos",
  description: "Como sair de \"precisamos disso\" e chegar no que o negócio realmente precisa.",
  summary:
    "Um guia orientado à descoberta com as perguntas que separam um pedido declarado do requisito real por trás dele — estado atual, gatilhos, exceções, regras de negócio e as perguntas que ninguém lembra de fazer.",
  category: "Business Analysis",
  tags: ["Requisitos", "Levantamento", "Descoberta"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Passo",
  intro: [
    "Um stakeholder te diz: \"precisamos de um botão de exportar.\" O caminho fácil é escrever o ticket exatamente assim — Adicionar botão de Exportar — e mandar para o backlog. Na maioria das vezes, esse também é o caminho errado, porque a parte interessante do trabalho ainda nem começou.",
    "Por que eles precisam da exportação? O que acontece com o arquivo depois que eles têm ele? Quem realmente abre? Com que frequência? O que eles fazem hoje em vez disso? As respostas para essas perguntas costumam estar escondendo o requisito real — e nem sempre é um botão.",
    "Um bom levantamento de requisitos não é sobre fazer mais perguntas. É sobre encontrar o pequeno número de perguntas que expõe o que realmente está acontecendo.",
  ],
  audience: [
    "Business Analysts",
    "Analistas de Requisitos",
    "Product Owners conduzindo descoberta",
    "BAs mais novos em conversas com stakeholders",
    "Qualquer um que já escreveu um ticket exatamente como foi pedido e se arrependeu",
  ],
  seoTitle: "Guia de Levantamento de Requisitos para Analistas de Negócios",
  seoDescription:
    "Um guia prático de levantamento de requisitos para Analistas de Negócios — as perguntas de descoberta que separam um pedido declarado da necessidade de negócio por trás dele, cobrindo estado atual, gatilhos, exceções e regras de negócio.",
  closingHeading: ["O requisito nunca foi o botão.", "Era o problema por baixo dele."],
  closingBody:
    "Toda conversa de descoberta acaba se reduzindo ao mesmo formato: um pedido declarado, um problema real por baixo dele, e um conjunto de perguntas que conecta os dois. O botão de exportar ainda pode ser a resposta certa. Agora você vai saber disso por um motivo, não por padrão.",
  closingTemplate: questionBank,
  closingTemplateName: "Banco de Perguntas de Levantamento de Requisitos",
  hacks: [
    {
      number: 1,
      title: "Comece pelo problema, não pela solução pedida",
      insight: "A solução pedida é uma pista. Raramente é o requisito.",
      compare: {
        leftLabel: "O que disseram",
        left: "\"Precisamos de um botão de exportar.\"",
        rightLabel: "O que talvez precisem de verdade",
        right:
          "Uma forma de levar os dados da operação para a ferramenta de reconciliação sem redigitar tudo manualmente toda manhã.",
      },
      whyItHelps:
        "Um botão é fácil de construir e fácil de errar. Se a necessidade real é dado se movendo entre dois sistemas, um botão de exportar é uma resposta possível entre várias — e talvez não a melhor.",
      proTip: "Pergunte o que eles vão fazer com aquilo assim que conseguirem. Essa resposta costuma ser o requisito real.",
    },
    {
      number: 2,
      title: "Pergunte o que acontece hoje, antes de perguntar o que deveria acontecer",
      insight: "Você não consegue desenhar um processo melhor sem saber como o atual realmente funciona.",
      list: [
        "Quem faz isso hoje?",
        "Qual sistema, ou sistemas, está envolvido?",
        "Que parte disso é manual?",
        "Onde costuma dar errado?",
        "Já existe um workaround em uso?",
      ],
      whyItHelps:
        "Metade das vezes, o workaround que as pessoas descrevem, meio de passagem, acaba sendo o requisito de verdade — só que ninguém tinha parado para pedir isso formalmente.",
    },
    {
      number: 3,
      title: "Encontre o gatilho",
      insight: "Nada acontece isoladamente. Algo dá início a esse processo — descubra o quê.",
      visual: { steps: ["Ação do usuário", "Evento de sistema", "Execução da operação", "Chegada de arquivo", "Batch agendado"] },
      whyItHelps:
        "O gatilho decide como o requisito vai ser construído. \"Um usuário clica em um botão\" e \"um arquivo cai numa pasta durante a madrugada\" são dois pedaços de trabalho completamente diferentes vestindo a mesma descrição de uma linha.",
    },
    {
      number: 4,
      title: "Mapeie o fluxo principal antes de sair procurando problema",
      insight: "Deixe a versão simples funcionando no papel primeiro — a versão em que nada dá errado.",
      visual: { steps: ["Solicitação enviada", "Verificada", "Aprovada", "Processada", "Confirmada"] },
      whyItHelps:
        "É tentador pular direto para os casos de borda porque eles parecem ser a parte difícil. Mas você não consegue identificar quais casos de borda realmente importam até que o fluxo principal esteja claro.",
      whenToUse: "Logo depois que o gatilho é confirmado, antes de discutir qualquer exceção.",
    },
    {
      number: 5,
      title: "Só então vá procurar exceções, de propósito",
      insight: "Exceções não se oferecem sozinhas. Você tem que ir atrás delas.",
      checklist: [
        "O que acontece se faltar um dado obrigatório?",
        "O que acontece se o sistema upstream estiver indisponível?",
        "O que acontece se a mesma solicitação chegar duas vezes?",
        "O que acontece se o processamento tiver sucesso parcial?",
      ],
      whyItHelps:
        "\"A gente resolve isso depois\" é como um ticket de duas semanas vira um de dois meses — depois que o desenvolvimento já começou e a exceção aparece sem avisar.",
    },
    {
      number: 6,
      title: "Regras de negócio se escondem dentro de frases comuns",
      insight: "Um stakeholder raramente diz \"aqui está uma regra de negócio.\" Ele só diz a frase.",
      list: [
        "\"Operações acima de R$1 milhão precisam de aprovação da supervisão.\"",
        "\"Clientes em jurisdições restritas não deveriam ver esse relatório.\"",
        "\"Ordens canceladas não passam pela mesma checagem que as executadas.\"",
      ],
      whyItHelps:
        "Cada uma dessas parece um comentário de passagem. Cada uma é uma condição que seu requisito precisa considerar explicitamente, não inferir depois a partir de um bug reportado.",
    },
    {
      number: 7,
      title: "Encontre o dado antes de finalizar os campos",
      insight: "Um campo num formulário é a última decisão, não a primeira.",
      list: [
        "De onde esse dado realmente vem?",
        "Quem é dono desse sistema, e dá para confiar nele?",
        "Quais campos são realmente obrigatórios, e quais só parecem que deveriam ser?",
      ],
      whyItHelps:
        "Desenhar a tela antes de confirmar que o dado existe, no formato certo, num sistema que você realmente consegue acessar, é como requisitos acabam sendo refeitos três sprints depois.",
    },
    {
      number: 8,
      title: "Encontre as dependências antes de se comprometer com uma data",
      insight: "Um requisito raramente é autossuficiente. Descubra sobre o que ele está apoiado.",
      visual: { steps: ["Este requisito", "→ precisa de acesso a API", "→ precisa de uma migração de dados", "→ precisa de aprovação do Risco"] },
      whyItHelps:
        "Dependências descobertas durante o levantamento são um insumo de planejamento. Dependências descobertas na sprint dois são um atraso com o seu nome do lado.",
    },
    {
      number: 9,
      title: "Pergunte como o sucesso vai ser realmente medido",
      insight: "Se ninguém consegue dizer como é \"melhor\", ninguém consegue te dizer quando parar.",
      compare: {
        leftLabel: "Meta vaga",
        left: "\"Deixar o processo de reconciliação mais rápido.\"",
        rightLabel: "Meta mensurável",
        right: "\"Reduzir o tempo de reconciliação manual de 45 minutos para menos de 10, por dia útil.\"",
      },
      whyItHelps:
        "Sem isso, uma entrega tecnicamente correta ainda pode ser recebida como uma decepção, porque ninguém combinou antecipadamente como seria vencer.",
    },
    {
      number: 10,
      title: "Escreva as questões em aberto em vez de decidi-las sozinho, em silêncio",
      insight: "Uma pergunta sem resposta que você decidiu sozinho agora é uma suposição escondida vestida de requisito.",
      before: "BA assume que a notificação por e-mail está ok, não menciona isso, e segue em frente.",
      after: [
        "Questão em aberto registrada: canal de notificação — e-mail ou in-app — ainda não confirmado",
        "Sinalizada diretamente ao stakeholder, com uma data para fechar",
        "Suposição documentada e visível até ser respondida",
      ],
      whyItHelps: "A versão cara desse erro aparece na UAT, quando \"obviamente e-mail\" era óbvio para exatamente uma pessoa.",
    },
    {
      number: 11,
      title: "Leia o requisito de volta antes de qualquer pessoa construir",
      insight: "Diga em palavras simples e observe o rosto da pessoa, não só as palavras dela.",
      whyItHelps:
        "Parafrasear captura mais mal-entendidos do que mais uma rodada de perguntas de esclarecimento, porque força os dois lados a concordarem sobre a mesma frase, em vez de duas imagens mentais diferentes dela.",
      proTip: "Se o stakeholder hesita antes de concordar, essa hesitação é um dado. Pergunte o que fez ele hesitar.",
    },
  ],
};
