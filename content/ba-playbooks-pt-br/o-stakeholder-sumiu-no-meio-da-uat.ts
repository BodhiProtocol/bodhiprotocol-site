import type { Playbook } from "@/types/content";

const escalationRiskLog = `LOG DE ESCALAÇÃO E RISCO DE APROVAÇÃO DE UAT

STAKEHOLDER
Nome e cargo:
Último contato confirmado (data):
Motivo da indisponibilidade, se conhecido:

DELEGADO
Autoridade de aprovação delegada, nomeada:
Delegado confirmado por escrito? S / N
Escalado para (nome, cargo):
Data da escalação:

STATUS DO ESCOPO
Cenários de teste / defeitos que exigem o julgamento DESTE stakeholder:
Cenários de teste / defeitos já acordados e desbloqueados:
O escopo desbloqueado pode seguir independentemente? S / N

SE O PRAZO REALMENTE NÃO PUDER MUDAR
Vai seguir sem aprovação formal? S / N
Risco de seguir, em linguagem simples:
Risco aceito por (nome, cargo — não só o BA):
Data de aceite:

FECHAR O CICLO
Aprovação retroativa recebida? S / N — data:
Delegado adicionado ao RACI do próximo ciclo? S / N
`;

export const oStakeholderSumiuNoMeioDaUat: Omit<Playbook, "readingTime"> = {
  slug: "o-stakeholder-sumiu-no-meio-da-uat",
  title: "O Stakeholder Sumiu no Meio da UAT. E Agora?",
  description:
    "A aprovação da UAT depende da palavra de uma pessoa, e essa pessoa parou de responder três dias antes do go-live. Um guia prático para manter uma release andando sem quem decide na sala — sem deixar o silêncio virar aprovação em silêncio.",
  summary:
    "Um guia prático para uma aprovação de UAT travada — descobrindo por que o stakeholder realmente sumiu, localizando um delegado nomeado, separando o escopo que genuinamente precisa do julgamento dele do que não precisa, escalando com uma decisão pronta para aprovar e documentando quem aceitou o risco se a release tiver que seguir sem assinatura.",
  category: "UAT",
  tags: ["UAT", "Stakeholders", "Aprovação"],
  author: "Surya",
  date: "2026-08-22",
  itemLabel: "Passo",
  intro: [
    "Os testes acabaram. Os defeitos foram triados e fechados. A única coisa entre o time e o go-live é um e-mail: a aprovação formal de UAT do stakeholder de negócio. Essa pessoa não responde há três dias, e a data da release não vai se mover pela caixa de entrada de ninguém.",
    "Isso não é um problema de teste, e persegui-lo como se fosse um — mais um e-mail de lembrete, mais um \"só passando para acompanhar\" — geralmente só atrasa descobrir por que a pessoa realmente sumiu. É um problema de disponibilidade vestido de pedido de aprovação e precisa de um movimento diferente.",
    "Nada disso significa pular a aprovação. Significa tirar uma decisão real dessa situação, tomada por alguém com autoridade para tomá-la, documentada o suficiente para que ninguém precise adivinhar depois por que a release saiu do jeito que saiu.",
  ],
  audience: [
    "Business Analysts segurando uma release travada por um stakeholder que não responde",
    "BAs decidindo se \"sem resposta\" é seguro tratar como aprovação",
    "Líderes de entrega gerenciando uma data de go-live que não vai se mover",
    "Qualquer um que já mandou um terceiro e-mail de lembrete e recebeu o mesmo silêncio de volta",
  ],
  seoTitle: "O Stakeholder Sumiu no Meio da UAT — Um Guia de BA",
  seoDescription:
    "Um guia prático de Business Analyst para uma aprovação de UAT travada — encontrando um delegado, separando o escopo genuinamente bloqueado do que não está, escalando com uma decisão pronta e documentando o risco se a release tiver que seguir sem assinatura.",
  closingHeading: [
    "Uma release não espera alguém checar a caixa de entrada.",
    "Mas ela não deveria acontecer em silêncio só porque a pessoa não checou.",
  ],
  closingBody:
    "Um stakeholder em silêncio é um problema de disponibilidade, não de teste — e precisa de um caminho de escalação, um delegado nomeado e uma decisão documentada, não de um quarto e-mail de lembrete. Descubra por que a pessoa sumiu, separe o que está realmente bloqueado do que só parece bloqueado, e se o prazo realmente não puder esperar, garanta que o risco de seguir sem assinatura foi aceito por alguém com autoridade para aceitá-lo.",
  closingTemplate: escalationRiskLog,
  closingTemplateName: "Log de Escalação e Risco de Aprovação de UAT",
  hacks: [
    {
      number: 1,
      title: "Não persiga mais forte — verifique o caminho de escalação primeiro",
      insight: "Um quarto e-mail de lembrete não resolve um problema de disponibilidade. Um caminho de escalação resolve.",
      explanation:
        "Antes de mandar mais um \"só passando para acompanhar\", verifique se algum caminho de escalação foi definido para essa aprovação — um substituto nomeado, um gestor, um patrocinador do projeto. A maioria dos times tem um e esquece de usar até chegar nesse ponto.",
      whyItHelps: "Repetir o mesmo pedido para o mesmo silêncio só queima os dias que faltam até o go-live.",
    },
    {
      number: 2,
      title: "Descubra por que a pessoa está em silêncio antes de presumir que está te ignorando",
      insight: "\"De licença\", \"realocado\", \"sobrecarregado\" e \"não entende o que está aprovando\" são quatro problemas diferentes.",
      list: [
        "De licença ou genuinamente indisponível — precisa de um delegado, não de insistência",
        "Realocado ou não é mais o responsável certo — precisa que a aprovação seja redirecionada para quem assumiu o lugar",
        "Soterrado em outras prioridades — precisa de uma decisão mais curta e mais fácil de tomar",
        "Não tem certeza do que está de fato aprovando — precisa de um pedido mais claro e específico, não mais rápido",
      ],
      whyItHelps: "A insistência só resolve o terceiro caso. Aplicada aos outros três, só desperdiça os dias que restam.",
    },
    {
      number: 3,
      title: "Encontre o delegado antes de precisar de um",
      insight: "Verifique se uma autoridade substituta de aprovação foi nomeada no kickoff do projeto — a maioria dos RACIs tem uma, sem uso até agora.",
      explanation:
        "Se nenhum delegado jamais foi nomeado, essa é a lacuna real: escale para o gestor do stakeholder e peça que nomeiem um por escrito, hoje, em vez de continuar esperando pela pessoa original.",
      whyItHelps: "Um delegado nomeado e confirmado transforma uma espera indefinida numa decisão que alguém realmente consegue tomar essa semana.",
    },
    {
      number: 4,
      title: "Nunca deixe o silêncio virar aprovação silenciosamente",
      insight: "\"Vamos presumir aprovação se não recebermos resposta até sexta\" parece eficiente. Na prática é uma decisão que ninguém concordou em tomar.",
      before: "Um prazo implícito de aprovação-por-silêncio, definido unilateralmente e nunca confirmado com quem tem autoridade para defini-lo.",
      after: [
        "Uma escalação explícita, enviada a um responsável nomeado",
        "Um prazo declarado para uma resposta real — aprovação, rejeição ou delegação",
        "Um padrão documentado, só se esse padrão em si foi aprovado por alguém sênior o suficiente para assumi-lo",
      ],
      whyItHelps: "Se algo quebrar em produção, \"presumimos que silêncio significava sim\" não é uma aprovação que ninguém consegue apontar.",
    },
    {
      number: 5,
      title: "Separe o que está realmente bloqueado do que só parece bloqueado",
      insight: "Nem todo cenário de teste precisa do julgamento dessa pessoa específica.",
      checklist: [
        "Quais cenários de teste ou defeitos genuinamente precisam do julgamento de negócio desse stakeholder?",
        "Quais já foram acordados e só estão esperando por uma formalidade?",
        "O escopo já acordado pode seguir sozinho, ou ir para produção numa release faseada?",
        "A parte bloqueada é pequena o suficiente para segurar separadamente, em vez de atrasar tudo?",
      ],
      whyItHelps: "Uma release não precisa ser tudo ou nada só porque uma pessoa está inacessível — muitas vezes só uma fração do escopo realmente precisa dela.",
    },
    {
      number: 6,
      title: "Escale com uma decisão pronta para aprovar, não uma pergunta para responder",
      insight: "Um stakeholder ocupado ou ausente responde mais rápido a \"responda APROVADO, ou diga por que não\" do que a um pedido aberto.",
      compare: {
        leftLabel: "Pedido aberto",
        left: "\"Você pode revisar e confirmar a aprovação da UAT quando tiver um tempo?\"",
        rightLabel: "Pedido pronto para decisão",
        right:
          "\"Com base nos resultados da UAT já concluídos, recomendamos seguir para o go-live na quinta. Responda APROVADO, ou diga o que está bloqueando, até o fim do dia amanhã.\"",
      },
      whyItHelps: "Uma decisão de sim/não contra um prazo declarado recebe resposta. Um pedido de revisão genérico é adiado.",
    },
    {
      number: 7,
      title: "Se o prazo realmente não puder mudar, documente quem aceitou o risco",
      insight: "Liberar sem aprovação formal pode ser a decisão certa — mas só quando alguém sênior explicitamente assume essa decisão.",
      visual: {
        steps: [
          "Declare o risco de seguir sem aprovação, em linguagem de negócio simples",
          "→ Apresente para alguém com autoridade para aceitá-lo — não só o BA",
          "→ Consiga a aceitação datada e por escrito",
        ],
      },
      whyItHelps: "Um BA decidindo sozinho, em silêncio, liberar sem aprovação é um único ponto de culpa esperando para acontecer. Um risco documentado e aceito por alguém sênior é uma decisão de negócio.",
      proTip: "Escreva o risco em termos de impacto de negócio, não de processo — \"clientes podem ver X no cenário Y\" chega mais rápido a quem decide do que \"a aprovação de UAT está pendente\".",
    },
    {
      number: 8,
      title: "Feche o ciclo depois do go-live, não só antes",
      insight: "O stakeholder reaparecendo depois da release não é o fim da história — é quando a aprovação vira real de verdade.",
      explanation:
        "Consiga uma confirmação retroativa registrada assim que a pessoa voltar e use o intervalo que você acabou de viver para adicionar um delegado nomeado ao RACI, para que a próxima release não fique travada na agenda de uma única pessoa de novo.",
      whyItHelps: "Sem esse passo, a mesma escalação exata acontece de novo na próxima release — nada sobre a lacuna que causou isso foi realmente corrigido.",
    },
  ],
};
