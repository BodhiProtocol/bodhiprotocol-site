import type { Playbook } from "@/types/content";

const midSprintChangeNote = `NOTA DE MUDANÇA NO MEIO DA SPRINT

MUDANÇA
Comportamento antigo:
Comportamento novo:
Limites / fronteiras:
Exceções:

POR QUE AGORA
Regulatório / defeito / informação nova / preferência de stakeholder / risco de produção:

RAIO DE IMPACTO ATINGIDO
[ ] Regras de negócio   [ ] UI   [ ] API   [ ] Dados
[ ] Configuração   [ ] Dependências   [ ] Testes   [ ] Documentação

ESFORÇO
O que já está construído:
O que Dev / QA precisa refazer:

DECISÃO
Opção escolhida: Absorver / Dividir / Trocar / Adiar / Parar e Refazer
Solicitado por:
Avaliado por:
Aceito por:

COMUNICADO PARA
[ ] Desenvolvedor  [ ] QA  [ ] Produto  [ ] Entrega  [ ] Operações / Suporte  [ ] Times downstream`;

export const oRequisitoMudouNoMeioDaSprint: Omit<Playbook, "readingTime"> = {
  slug: "o-requisito-mudou-no-meio-da-sprint",
  title: "O Requisito Mudou no Meio da Sprint. E Agora?",
  description: "Não saia atualizando o Jira. Encontre o raio de impacto primeiro.",
  summary:
    "Um framework de 8 passos — Mudança, Por Quê, Raio de Impacto, Esforço, Opções, Decisão, Rastro, Comunicar — para lidar com uma mudança de requisito depois que a sprint já começou, trabalhado a partir de uma mudança de limite de verificação num e-commerce indiano.",
  category: "Business Analysis",
  tags: ["Requisitos", "Entrega", "Gestão de Mudança"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Passo",
  intro: [
    "A sprint está em andamento. O desenvolvimento já começou. O QA preparou os casos de teste. Aí alguém diz: \"precisamos de uma mudancinha pequena.\" Se você já trabalhou tempo suficiente num projeto, sabe o que costuma vir a seguir. A mudança pode ser pequena. O impacto pode não ser.",
    "Aqui está o requisito. Imagine uma plataforma de e-commerce. O requisito original diz: ordens acima de ₹50.000 exigem verificação adicional do cliente. O BA escreve os critérios de aceitação. O desenvolvimento começa. O QA prepara os cenários. Três dias dentro da sprint, o negócio diz: \"Mude ₹50.000 para ₹25.000.\" Depois: \"E clientes internacionais devem exigir verificação independentemente do valor da ordem.\" Duas frases mudaram. O BA deveria simplesmente atualizar o Jira? Não — porque o requisito mudou num lugar. O impacto pode ter mudado em dez.",
    "Sua primeira pergunta não deveria ser \"o que eu mudo na story?\" Pergunte: \"o que essa mudança toca?\" Pense nisso como o raio de impacto: Requisito → Regras de Negócio → UI / API / Dados → Dependências → Desenvolvimento → Testes → Release. O trabalho do BA é entender esse raio antes de o time se comprometer com a mudança.",
  ],
  audience: [
    "Business Analysts lidando com uma mudança de requisito depois que a sprint já começou",
    "Recém-formados e aspirantes a BA aprendendo que \"eu atualizo o Jira\" não é o primeiro movimento certo",
    "QAs e desenvolvedores que precisam do raio de impacto mapeado antes de mexer no código ou nos casos de teste",
    "Líderes de entrega e Product Owners decidindo entre absorver, dividir, trocar, adiar ou parar o trabalho",
  ],
  seoTitle: "Checklist de Mudança de Requisito no Meio da Sprint para BAs | BodhiProtocol",
  seoDescription:
    "Um framework de 8 passos para lidar com uma mudança de requisito no meio da sprint — Mudança, Por Quê, Raio de Impacto, Esforço, Opções, Decisão, Rastro, Comunicar.",
  closingHeading: ["Uma mudança de requisito de duas linhas", "pode criar uma mudança de entrega de vinte itens."],
  closingBody:
    "Requisitos mudando no meio da sprint não é automaticamente um fracasso — informação nova aparece, suposições se revelam erradas, regulações mudam. A parte perigosa é tratar uma mudança de requisito como uma edição de texto. Encontre o raio de impacto. Torne a decisão visível. Só então mude o requisito.",
  closingTemplate: midSprintChangeNote,
  closingTemplateName: "Nota de Mudança no Meio da Sprint",
  hacks: [
    {
      number: 1,
      title: "MUDANÇA — O que exatamente mudou?",
      insight: "Deixe a regra nova completamente clara antes de analisar qualquer coisa.",
      before: "Ordens acima de ₹50.000 exigem verificação.",
      after: [
        "Ordens acima de ₹25.000 exigem verificação.",
        "Clientes internacionais exigem verificação independentemente do valor.",
      ],
      shiftLabel: "Regra antiga → Regra nova",
      explanation:
        "Agora as perguntas começam. ₹25.000 significa acima de ₹25.000 ou ₹25.000 e acima? O que acontece exatamente em ₹25.000? O que torna alguém \"internacional\" — nacionalidade, país de cobrança, país de envio ou país de registro da conta? Uma frase pode esconder várias decisões.",
      list: [
        "O limite significa estritamente maior que, ou maior-ou-igual?",
        "O que acontece exatamente no valor de fronteira?",
        "Que definição de \"internacional\" o negócio está realmente usando?",
      ],
      whyItHelps: "Antes de analisar o impacto, deixe o comportamento preciso — uma regra ambígua produz uma análise de impacto ambígua.",
    },
    {
      number: 2,
      title: "POR QUÊ — Por que agora?",
      insight: "Essa pergunta muda a decisão, não o requisito.",
      list: [
        "O Compliance introduziu uma regra obrigatória — talvez não seja possível adiar.",
        "Um stakeholder mudou uma preferência — talvez seja seguro esperar.",
        "O requisito original estava errado — o desenvolvimento existente já pode estar incorreto.",
        "A produção expôs um risco que ninguém tinha considerado.",
      ],
      explanation: "Mesma mudança. Urgência diferente. Pergunte \"por que isso precisa mudar agora?\" — não para desafiar o stakeholder, mas para entender a restrição.",
      whyItHelps: "A urgência muda quais opções sequer estão na mesa no passo 5.",
    },
    {
      number: 3,
      title: "RAIO DE IMPACTO — O que mais se move?",
      insight: "Não pare na story do Jira. Rastreie a mudança pelo sistema e pela cadeia de entrega.",
      visual: { steps: ["Requisito", "Regras de Negócio", "UI / API / Dados", "Dependências", "Desenvolvimento", "Testes", "Release"] },
      list: [
        "Regras de negócio — o limite mudou, e clientes internacionais agora têm uma regra adicional.",
        "UI — o cliente vê uma mensagem de verificação, e o texto dela muda?",
        "API — o limite é enviado para outro serviço? Uma API agora precisa de informação de país?",
        "Dados — o país do cliente está disponível, confiável e definido de forma consistente?",
        "Regras / configuração — ₹50.000 está fixo no código, ou a regra é configurável?",
        "Sistemas downstream — Fraude, Risco, CRM, Operações ou outros sistemas consomem o resultado da verificação?",
        "Testes — cenários antigos podem estar errados agora; novos casos de fronteira e exceção são necessários.",
        "Analytics e documentação — relatórios, procedimentos de suporte ou guias operacionais ainda usam a regra antiga?",
      ],
      whyItHelps: "\"Mude ₹50.000 para ₹25.000\" deixa de ser uma única mudança assim que você rastreia isso — essa é a análise de impacto.",
    },
    {
      number: 4,
      title: "ESFORÇO — O que já está construído?",
      insight: "Não estime o impacto só pelo ticket do Jira — fale com as pessoas mais próximas do impacto.",
      compare: {
        leftLabel: "Se é configurável",
        left: "\"É configurável. Mudança de cinco minutos.\" Ótimo.",
        rightLabel: "Se está fixo em três lugares",
        right: "\"O limite é usado em três serviços e dois já estão prontos.\" Conversa diferente.",
      },
      list: [
        "Pergunte ao Desenvolvimento quanto da regra original já está implementado.",
        "Pergunte ao QA quais cenários já estão preparados ou executados.",
        "Pergunte aos times afetados se algo downstream depende do comportamento original.",
      ],
      whyItHelps: "A mesma mudança de requisito pode significar cinco minutos ou três dias — e só quem está construindo sabe qual.",
    },
    {
      number: 5,
      title: "OPÇÕES — Como devemos lidar com isso?",
      insight: "Um BA agrega valor trazendo opções, não só repassando a mudança.",
      list: [
        "Absorver — a mudança é pequena, entendida e cabe com segurança na sprint. Faça agora.",
        "Dividir — mantenha o escopo original e crie uma story separada para o comportamento novo. Entregue de forma incremental.",
        "Trocar — a mudança importa mas adiciona esforço. Remova outra coisa de esforço parecido. Proteja a capacidade.",
        "Adiar — a mudança é válida mas não urgente o suficiente para perturbar a entrega atual. Mova para a próxima sprint.",
        "Parar e Refazer — o requisito novo torna o trabalho atual errado, inseguro ou inútil. Pare, reavalie e refaça.",
      ],
      whyItHelps: "O BA pode não tomar a decisão final. Mas o BA deveria tornar as opções e as consequências visíveis.",
    },
    {
      number: 6,
      title: "DECISÃO — Quem aceita a consequência?",
      insight: "Alguém precisa decidir — e discussão não é responsabilidade assumida.",
      checklist: [
        "Quem pediu a mudança?",
        "Quem avaliou o impacto?",
        "Quem aceitou a consequência de entrega?",
      ],
      proTip: "Um resultado perigoso é: \"a gente discutiu, então presumimos que todo mundo concordou.\" Discussão não é responsabilidade assumida.",
      whyItHelps: "Dependendo da organização, essa decisão pode envolver Produto, Negócio, Engenharia, QA, Entrega, Risco, Compliance ou Operações — nomear quem decidiu evita a conversa \"quem aprovou isso?\" depois.",
    },
    {
      number: 7,
      title: "RASTRO — Atualize a fonte da verdade",
      insight: "Agora sim, atualize o Jira. Não antes.",
      checklist: [
        "Requisito — deixe o comportamento antigo e o novo inequívocos",
        "Critérios de aceitação — adicione limites, fronteiras e exceções",
        "Casos de teste — reflita o comportamento novo",
        "Dependências — vincule APIs, serviços, times ou stories afetados",
        "Design / documentação — atualize tudo que as pessoas vão consultar depois",
        "Registro de decisão — capture por que a mudança aconteceu e quem concordou",
      ],
      whyItHelps: "Você não precisa de um documento de mudança de 12 páginas. Você precisa de histórico suficiente para que, três meses depois, alguém consiga responder \"por que o sistema se comporta assim?\"",
    },
    {
      number: 8,
      title: "COMUNICAR — Avise todo mundo cujo trabalho mudou",
      insight: "Atualizar o Jira não significa que todo mundo vai perceber.",
      before: "\"Requisito atualizado.\"",
      after:
        "\"Limite de verificação mudou de ₹50.000 para ₹25.000. Clientes internacionais agora exigem verificação independentemente do valor. O mapeamento de API e os cenários de QA são afetados. O time concordou em absorver a mudança nesta sprint.\"",
      shiftLabel: "A mudança",
      explanation: "Avise as pessoas cujo trabalho mudou: Desenvolvedor, QA, Produto, Entrega, Operações, Suporte e times downstream. Comunique a mudança e a consequência, não só que um ticket foi atualizado.",
      whyItHelps: "Clareza vence suposição.",
    },
  ],
};
