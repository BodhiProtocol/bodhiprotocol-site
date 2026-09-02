import type { Playbook } from "@/types/content";

const bancoDePerguntas = `PROBLEMA
Que problema isso está realmente resolvendo?
O que acontece se a gente não fizer nada?

ESTADO ATUAL
O que acontece hoje?
Quem executa o processo?
Qual(is) sistema(s) está(ão) envolvido(s)?
Qual parte é manual?
Onde costuma quebrar?
Já existe uma solução alternativa em uso?

USUÁRIOS
Quem pediu isso?
Quem realmente vai usar no dia a dia?
São a mesma pessoa?

GATILHO
O que dá início a esse processo?
Uma ação do usuário, um evento do sistema, ou um batch agendado?

PROCESSO
Como é o fluxo principal, do início ao fim?
Qual é a menor versão disso que ainda seria útil?

REGRAS DE NEGÓCIO
Existem limiares, limites ou condições de aprovação envolvidos?
Diferentes tipos de cliente, produto ou mercado se comportam de forma diferente?

EXCEÇÕES
O que acontece se dados obrigatórios estiverem faltando?
O que acontece se um sistema a montante estiver indisponível?
O que acontece se a requisição for duplicada?
O que acontece se o processamento for parcialmente bem-sucedido?

DADOS
De onde vêm os dados?
Quem é o dono deles?
Quais campos são obrigatórios, e quais são opcionais?

DEPENDÊNCIAS
De quais outros sistemas, times ou requisitos isso depende?
O que mais depende disso?

SEGURANÇA
Quem NÃO deveria conseguir ver ou acionar isso?
Existem restrições de jurisdição ou de permissão de acesso?

RELATÓRIOS
Isso precisa ser reportado?
Para quem, e com que frequência?

AUDITORIA
Essa ação precisa ser rastreável depois?
O que especificamente precisa ser registrado?

SUCESSO
Como vamos saber que isso realmente funcionou?
Como é "melhor", de forma mensurável?

PERGUNTAS EM ABERTO
[Qualquer coisa ainda não confirmada]

PREMISSAS
[Qualquer coisa sendo assumida em vez de confirmada]
`;

export const guiaDeElicitacaoDeRequisitos: Omit<Playbook, "readingTime"> = {
  slug: "guia-de-elicitacao-de-requisitos",
  title: "Guia de elicitação de requisitos",
  description: "Como sair de \"a gente precisa disso\" para o que o negócio realmente precisa.",
  summary:
    "Um guia orientado a descoberta com as perguntas que separam um pedido declarado do requisito real por trás dele — estado atual, gatilhos, exceções, regras de negócio e as perguntas que ninguém pensa em fazer.",
  category: "Business Analysis",
  tags: ["Requisitos", "Elicitação", "Descoberta"],
  author: "Surya",
  date: "2026-09-04",
  itemLabel: "Jogada",
  intro: [
    "Um stakeholder te diz: \"a gente precisa de um botão de exportação\". O caminho fácil é escrever o chamado exatamente assim — Adicionar botão de exportação — e mover para o backlog. Na maioria das vezes, esse também é o caminho errado, porque a parte interessante do trabalho ainda nem começou.",
    "Por que precisam da exportação? O que acontece com o arquivo depois que a pessoa tem ele em mãos? Quem realmente abre esse arquivo? Com que frequência? O que fazem hoje em vez disso? As respostas para essas perguntas geralmente são onde o requisito real está escondido — e nem sempre é um botão.",
    "Boa elicitação não é sobre fazer mais perguntas. É sobre encontrar o pequeno número de perguntas que expõe o que está realmente acontecendo.",
  ],
  audience: [
    "Business Analysts",
    "Analistas de requisitos",
    "Product Owners conduzindo descoberta",
    "BAs mais novos em conversas com stakeholders",
    "Qualquer pessoa que já escreveu um ticket exatamente como foi pedido e se arrependeu",
  ],
  seoTitle: "Guia de elicitação de requisitos para BAs",
  seoDescription:
    "Um guia prático de elicitação de requisitos para BAs — as perguntas de descoberta que separam um pedido declarado da necessidade de negócio por trás dele, cobrindo estado atual, gatilhos, exceções e regras de negócio.",
  closingHeading: ["O requisito nunca foi o botão.", "Era o problema por trás dele."],
  closingBody:
    "Toda conversa de descoberta acaba se reduzindo ao mesmo formato: um pedido declarado, um problema real por trás dele, e um conjunto de perguntas que conecta os dois. O botão de exportação ainda pode ser a resposta certa. Agora você vai saber disso por um motivo, não por padrão.",
  closingTemplate: bancoDePerguntas,
  closingTemplateName: "Banco de perguntas de elicitação de requisitos",
  hacks: [
    {
      number: 1,
      title: "Comece pelo problema, não pela solução pedida",
      insight: "A solução pedida é uma pista. Raramente é o requisito.",
      compare: {
        leftLabel: "O que disseram",
        left: "\"A gente precisa de um botão de exportação\".",
        rightLabel: "O que talvez realmente precisem",
        right: "Uma forma de levar os dados da operação para a ferramenta de conciliação sem ter que redigitar tudo à mão toda manhã.",
      },
      whyItHelps:
        "Um botão é fácil de construir e fácil de fazer errado. Se a necessidade real é dados se movendo entre dois sistemas, um botão de exportação é uma resposta possível entre várias — e talvez não seja a melhor.",
      proTip: "Pergunte o que a pessoa vai fazer com isso assim que conseguir. Essa resposta geralmente é o requisito real.",
    },
    {
      number: 2,
      title: "Pergunte o que acontece hoje, antes de perguntar o que deveria acontecer",
      insight: "Você não consegue desenhar um processo melhor sem saber como é o atual de verdade.",
      list: [
        "Quem faz isso hoje?",
        "Qual sistema, ou sistemas, estão envolvidos?",
        "Qual parte é manual?",
        "Onde costuma dar errado?",
        "Já existe uma solução alternativa em uso?",
      ],
      whyItHelps:
        "Metade das vezes, a solução alternativa que as pessoas descrevem de passagem acaba sendo o requisito de verdade — só que ninguém tinha chegado a pedir isso formalmente.",
    },
    {
      number: 3,
      title: "Encontre o gatilho",
      insight: "Nada acontece isoladamente. Alguma coisa dá início a esse processo — descubra o quê.",
      visual: { steps: ["Ação do usuário", "Evento do sistema", "Execução da operação", "Chegada de arquivo", "Batch agendado"] },
      whyItHelps:
        "O gatilho decide como o requisito vai ser construído. \"Um usuário clica em um botão\" e \"um arquivo cai numa pasta de madrugada\" são dois trabalhos completamente diferentes vestindo a mesma descrição de uma linha.",
    },
    {
      number: 4,
      title: "Mapeie o fluxo principal antes de sair procurando problema",
      insight: "Deixe a versão simples funcionando no papel primeiro — a versão em que nada dá errado.",
      visual: { steps: ["Solicitação enviada", "Verificada", "Aprovada", "Processada", "Confirmada"] },
      whyItHelps:
        "É tentador pular direto para os casos extremos porque eles parecem ser a parte difícil. Mas você não consegue identificar quais casos extremos realmente importam até o fluxo principal estar claro.",
      whenToUse: "Logo depois que o gatilho for confirmado, antes de discutir qualquer exceção.",
    },
    {
      number: 5,
      title: "Depois, vá atrás das exceções de propósito",
      insight: "Exceções não aparecem sozinhas. Você tem que ir atrás delas.",
      checklist: [
        "O que acontece se dados obrigatórios estiverem faltando?",
        "O que acontece se o sistema a montante estiver indisponível?",
        "O que acontece se a mesma requisição chegar duas vezes?",
        "O que acontece se o processamento for parcialmente bem-sucedido?",
      ],
      whyItHelps:
        "\"A gente resolve isso depois\" é assim que um ticket de duas semanas vira um de dois meses — depois que o desenvolvimento já começou e a exceção aparece sem avisar.",
    },
    {
      number: 6,
      title: "Regras de negócio se escondem dentro de frases comuns",
      insight: "Um stakeholder raramente diz \"aqui está uma regra de negócio\". Ele só fala a frase.",
      list: [
        "\"Operações acima de R$1 milhão precisam de aprovação da supervisão\".",
        "\"Clientes em jurisdições restritas não deveriam ver esse relatório\".",
        "\"Ordens canceladas não passam pela mesma verificação que as executadas\".",
      ],
      whyItHelps:
        "Cada uma dessas frases parece um comentário passageiro. Cada uma é uma condição que seu requisito precisa considerar explicitamente, não inferir depois a partir de um relatório de bug.",
    },
    {
      number: 7,
      title: "Encontre os dados antes de finalizar os campos",
      insight: "Um campo num formulário é a última decisão, não a primeira.",
      list: [
        "De onde esses dados realmente vêm?",
        "Quem é o dono desse sistema, e dá para confiar nele?",
        "Quais campos são obrigatórios, e quais só parecem que deveriam ser?",
      ],
      whyItHelps:
        "Desenhar a tela antes de confirmar que os dados existem, no formato certo, num sistema que você realmente consegue acessar, é assim que requisitos são reconstruídos três sprints depois.",
    },
    {
      number: 8,
      title: "Encontre as dependências antes de se comprometer com uma data",
      insight: "Um requisito raramente é autossuficiente. Descubra em que ele está apoiado.",
      visual: { steps: ["Esse requisito", "→ precisa de acesso à API", "→ precisa de uma migração de dados", "→ precisa da aprovação do Risco"] },
      whyItHelps:
        "Dependências descobertas durante a elicitação são um insumo de planejamento. Dependências descobertas na sprint dois são um atraso com o seu nome do lado.",
    },
    {
      number: 9,
      title: "Pergunte como o sucesso vai ser medido de verdade",
      insight: "Se ninguém consegue dizer como é \"melhor\", ninguém consegue dizer quando parar.",
      compare: {
        leftLabel: "Meta vaga",
        left: "\"Deixar o processo de conciliação mais rápido\".",
        rightLabel: "Meta mensurável",
        right: "\"Reduzir o tempo de conciliação manual de 45 minutos para menos de 10, por dia útil\".",
      },
      whyItHelps:
        "Sem isso, uma entrega tecnicamente correta ainda pode ser recebida como uma decepção, porque ninguém combinou antes como seria vencer.",
    },
    {
      number: 10,
      title: "Registre as perguntas em aberto em vez de decidi-las sozinho, em silêncio",
      insight: "Uma pergunta sem resposta que você decidiu sozinho agora é uma suposição escondida vestida de requisito.",
      before: "A BA assume que a notificação por e-mail está ok, não menciona isso, e segue em frente.",
      after: [
        "Pergunta em aberto registrada: canal de notificação — e-mail ou no aplicativo — ainda não confirmado",
        "Sinalizada diretamente ao stakeholder, com uma data para ser resolvida",
        "Premissa documentada e visível até ser respondida",
      ],
      whyItHelps: "A versão cara desse erro aparece no UAT, quando \"obviamente e-mail\" se revela ter sido óbvio para exatamente uma pessoa.",
    },
    {
      number: 11,
      title: "Parafraseie o requisito antes de alguém construí-lo",
      insight: "Repita o que você entendeu, em linguagem simples, e observe o rosto da pessoa, não só as palavras.",
      whyItHelps:
        "Parafrasear pega mais mal-entendidos do que mais uma rodada de perguntas de esclarecimento, porque força os dois lados a concordarem com a mesma frase, em vez de duas imagens mentais diferentes dela.",
      proTip: "Se o stakeholder hesitar antes de concordar, essa hesitação é um dado. Pergunte o que causou a hesitação.",
    },
  ],
};
