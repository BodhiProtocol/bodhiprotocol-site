import type { Playbook } from "@/types/content";

const releaseReadinessChecklist = `CHECKLIST DE PRONTIDÃO PARA RELEASE

[ ] Critérios de aceitação estão validados.
[ ] Os testes necessários estão completos.
[ ] Defeitos críticos estão resolvidos ou aceitos.
[ ] Dependências estão prontas.
[ ] As checagens não funcionais necessárias estão completas.
[ ] Dado / configuração de produção está pronto.
[ ] As aprovações necessárias foram obtidas.
[ ] Os passos de deploy estão entendidos.
[ ] O rollback / recuperação está entendido.
[ ] Monitoramento e alertas estão prontos.
[ ] Operações / Suporte entendem a mudança.
[ ] A responsabilidade pós-go-live está clara.
`;

export const aStoryEstaProntaPorQueNaoConseguimosLiberar: Omit<Playbook, "readingTime"> = {
  slug: "a-story-esta-pronta-por-que-nao-conseguimos-liberar",
  title: "A Story Está Pronta. Por Que Não Conseguimos Liberar?",
  description: "O Jira diz Pronto. A produção diz que ainda não. Aqui está a lacuna entre os dois.",
  summary:
    "Um framework de oito portões — Aceitação, Testes, Dependências, Não Funcional, Dados & Config, Aprovação, Deploy, Monitoramento — para rastrear por que uma story com critérios de aceitação verdes ainda não consegue ir para produção, trabalhado a partir de uma release de validação de beneficiário travada por um certificado faltante.",
  category: "Business Analysis",
  tags: ["Prontidão para Release", "Entrega", "Produção"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Portão",
  intro: [
    "O desenvolvedor terminou de codificar. O QA testou. Os critérios de aceitação estão verdes. O Jira diz PRONTO. Então você pergunta: \"ótimo, podemos liberar?\" E alguém responde: \"ainda não.\" Por quê? Porque story completa e prontidão para release não são a mesma coisa. Uma funcionalidade pode funcionar perfeitamente e ainda assim ser insegura ou impossível de liberar.",
    "Imagine uma plataforma de seguros lançando uma nova funcionalidade de status de sinistro: Enviado → Em Análise → Aprovado → Rejeitado. O desenvolvimento está completo, o QA passa em todo critério de aceitação, a demo parece perfeita — mas a release está bloqueada. O dado de referência de produção não está pronto. Uma API downstream ainda está na versão antiga. A Operação não recebeu o processo novo. O monitoramento não cobre a integração. Uma revisão de segurança ainda está em aberto. A funcionalidade funciona. O caminho de release não.",
    "\"Pronto\" significa uma coisa diferente para cada pessoa na sala: código completo para o desenvolvedor, testes aprovados para o QA, critérios de aceitação satisfeitos para o Product Owner, seguro para fazer deploy para o Release Management, eu consigo usar para o cliente. Então, quando alguém diz \"a story está pronta\", pergunte pronta para quem — e pronta para o quê? Depois rastreie o caminho de release pelos oito portões.",
  ],
  audience: [
    "Business Analysts que continuam ouvindo \"ainda não\" depois de o Jira ficar verde",
    "Product Owners decidindo o que \"pronto\" realmente significa para uma story",
    "Líderes de entrega rastreando por que uma funcionalidade terminada ainda não consegue ir para produção",
    "QA e desenvolvedores que querem os bloqueadores de release visíveis antes do go-live, não durante ele",
  ],
  seoTitle: "Checklist de Prontidão para Release para Business Analysts | BodhiProtocol",
  seoDescription:
    "Um framework de prontidão para release em oito portões para Business Analysts — Aceitação, Testes, Dependências, Não Funcional, Dados & Config, Aprovação, Deploy, Monitoramento.",
  closingHeading: ["Pronto para o time", "não é a mesma coisa que pronto para o cliente."],
  closingBody:
    "O Jira é uma ferramenta de fluxo de trabalho. Não é a Produção. Um ticket verde pode te dizer que o trabalho do time nessa story está completo. Nem sempre consegue te dizer que os clientes conseguem usar isso com segurança amanhã. Então, quando alguém perguntar \"a story está Pronta, por que não conseguimos liberar?\" — não fique olhando para o status. Rastreie o caminho de release. Encontre a condição não atendida. Remova o bloqueador cedo. Um bom BA não ajuda só a story a chegar em Pronto. Um bom BA ajuda o valor a chegar em Produção com segurança.",
  closingTemplate: releaseReadinessChecklist,
  closingTemplateName: "Checklist de Prontidão para Release",
  hacks: [
    {
      number: 1,
      title: "ACEITAÇÃO — Construímos a coisa certa?",
      insight: "Uma caixinha verde no Jira não é prova. É uma alegação que ainda precisa ser checada.",
      list: [
        "O comportamento esperado foi realmente demonstrado?",
        "Os casos de borda importantes estão cobertos?",
        "As regras de negócio foram interpretadas corretamente?",
        "O responsável de negócio certo validou o resultado?",
      ],
      whyItHelps: "Se as pessoas ainda discordam sobre o comportamento esperado, a story não está pronta — não importa o que o status do ticket diga.",
    },
    {
      number: 2,
      title: "TESTES — Provamos o suficiente?",
      insight: "Testes funcionais passando não significa que testes suficientes aconteceram.",
      list: [
        "Testes de integração",
        "Testes de regressão",
        "UAT",
        "Testes de performance",
        "Testes de segurança",
        "Testes de acessibilidade",
        "Testes de resiliência",
      ],
      explanation: "Nem toda story precisa de tudo dessa lista. Pergunte que evidência é apropriada para o risco dessa mudança — uma mudança de texto de botão e uma mudança no motor de pagamentos não deveriam enfrentar os mesmos portões.",
      whyItHelps: "Ajustar a profundidade dos testes ao risco real é o que mantém esse portão rápido para mudanças pequenas e rigoroso para as que não podem se dar ao luxo de estar erradas.",
    },
    {
      number: 3,
      title: "DEPENDÊNCIAS — Tudo em volta da story está pronto?",
      insight: "Seu ticket pode estar 100% completo enquanto a capacidade que ele entrega está só 80% pronta.",
      list: [
        "Outra story",
        "Outro time",
        "Uma API",
        "Um fornecedor",
        "Infraestrutura",
        "Dado de referência",
        "Uma mudança de banco de dados",
        "Uma aprovação",
        "Uma feature flag",
      ],
      whyItHelps: "Pergunte o que precisa ser verdade fora dessa story para a jornada do cliente realmente funcionar — essa pergunta expõe a dependência antes que ela vire uma surpresa no dia da release.",
    },
    {
      number: 4,
      title: "NÃO FUNCIONAL — Isso sobrevive à Produção?",
      insight: "Uma funcionalidade pode funcionar perfeitamente para um testador e ainda assim falhar no mundo real.",
      list: [
        "Performance — o que acontece sob carga real?",
        "Segurança — acesso e vulnerabilidades estão endereçados?",
        "Disponibilidade — o que acontece quando uma dependência falha?",
        "Auditabilidade — ações importantes conseguem ser rastreadas?",
        "Acessibilidade — os usuários pretendidos conseguem usar isso?",
        "Recuperação — o time consegue se recuperar com segurança?",
      ],
      compare: {
        leftLabel: "O teste funcional pergunta",
        left: "\"Isso funciona?\"",
        rightLabel: "A prontidão para release pergunta",
        right: "\"Nós conseguimos operar isso com segurança?\"",
      },
      whyItHelps: "São duas perguntas diferentes com duas respostas diferentes — uma story pode passar na primeira e ainda assim falhar na segunda.",
    },
    {
      number: 5,
      title: "DADOS & CONFIG — A Produção está preparada?",
      insight: "Às vezes o código está certo. O ambiente não está.",
      before: "A aplicação espera PENDING_REVIEW. A UAT tem isso. A Produção não tem.",
      after: "Os testes passam. A Produção ainda falha — e o código nunca foi o problema. A prontidão da Produção era.",
      shiftLabel: "O que realmente quebrou",
      list: [
        "Configuração",
        "Feature flags",
        "Dado de referência",
        "Permissões",
        "Certificados / segredos",
        "Mudanças de banco de dados",
        "Scripts de migração",
        "Suposições sobre o dado de produção",
      ],
      whyItHelps: "Checar esse portão antes do go-live pega exatamente a classe de falha que nenhuma quantidade extra de teste funcional jamais teria pegado.",
    },
    {
      number: 6,
      title: "APROVAÇÃO — As pessoas certas aprovaram?",
      insight: "O dia da release é o momento errado para descobrir que uma aprovação nunca foi pedida.",
      list: ["Produto", "Negócio", "Operações", "Risco", "Compliance", "Segurança", "Jurídico", "Arquitetura", "Release Management"],
      whyItHelps: "O BA não precisa ser dono de cada aprovação. Mas o BA deveria saber quais afetam o resultado de negócio — antes de o silêncio na reunião de release ser o primeiro sinal de que uma está faltando.",
    },
    {
      number: 7,
      title: "DEPLOY — Nós conseguimos realmente liberar isso?",
      insight: "Uma boa funcionalidade com um plano de deploy ruim ainda é uma release arriscada.",
      list: [
        "Qual é a sequência de deploy?",
        "Os scripts estão prontos?",
        "Qual dependência vai primeiro?",
        "É preciso downtime?",
        "Uma feature flag está envolvida?",
        "Conseguimos fazer rollback?",
        "A migração é reversível?",
        "Quem toma a decisão de ir ou não ir?",
      ],
      whyItHelps: "Cada uma dessas perguntas é barata de responder antes da release e cara de responder durante um incidente.",
    },
    {
      number: 8,
      title: "MONITORAMENTO — O que acontece depois do go-live?",
      insight: "A release não é o fim da entrega. É o começo do uso real.",
      before: "A funcionalidade vai ao ar às 22h. Às 22h15 ela começa a falhar.",
      after: "\"Quem sabe?\" — não é uma pergunta que você quer ver respondida pela primeira vez em produção.",
      shiftLabel: "O cenário a evitar",
      list: [
        "O que estamos monitorando?",
        "O que dispara um alerta?",
        "Quem recebe o alerta?",
        "O que o Suporte precisa saber?",
        "Existe um runbook?",
        "Quem é dono dos problemas depois do go-live?",
      ],
      whyItHelps: "Responder isso antes da release transforma uma surpresa das 22h15 num alerta das 22h15 com um responsável já definido.",
    },
    {
      number: 9,
      title: "Rastreie o caminho, não só reporte o status",
      insight: "\"A story está travada\" cria confusão. Um status rastreado cria ação.",
      list: [
        "Aceitação — Pronto",
        "Testes — Pronto",
        "Dependências — Pronto",
        "Segurança — Pronto",
        "Configuração de produção — Bloqueado: certificado faltando",
      ],
      compare: {
        leftLabel: "Enquadramento vago",
        left: "\"A story está travada.\"",
        rightLabel: "Enquadramento rastreado",
        right: "\"A funcionalidade está funcionalmente completa. A release está bloqueada porque o certificado de Produção não foi provisionado.\"",
      },
      whyItHelps: "Uma funcionalidade de validação de beneficiário de um banco passou exatamente por isso: o Jira dizia Pronto, o teste funcional passou, mas a release estava bloqueada. Rastrear os oito portões encontrou a única condição não atendida em quinze minutos, em vez de uma semana de \"por que isso ainda não está no ar?\"",
    },
    {
      number: 10,
      title: "Nomeie o tipo de bloqueador, não a pessoa a culpar",
      insight: "Não pergunte de quem é a culpa. Pergunte que condição para uma release segura ainda não foi atendida.",
      list: [
        "Processo — aprovação faltando, portão de mudança, documentação ou requisito de política",
        "Técnico — incompatibilidade de ambiente, feature flag, defeito ou dependência",
        "Dados — dado de referência, migração ou problema de qualidade de dados",
        "Pessoas — aprovador indisponível ou responsabilidade não clara",
        "Externo — dependência de fornecedor ou terceiro",
        "Risco — preocupação de segurança, defeito crítico ou teste insuficiente",
      ],
      proTip: "Durante o refinamento, pergunte: \"o que poderia impedir isso de chegar em Produção mesmo que a gente construa corretamente?\" Essa pergunta expõe dependências, aprovações, mudanças de dado, necessidades de segurança e requisitos operacionais enquanto ainda estão baratos de corrigir.",
      whyItHelps: "A maioria das stories Prontas-mas-não-liberadas caem numa dessas seis categorias — nomear a categoria aponta direto para quem precisa agir, em vez de começar uma conversa de culpa que não move a release para frente.",
    },
  ],
};
