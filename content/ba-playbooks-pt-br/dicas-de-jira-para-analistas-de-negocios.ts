import type { Playbook } from "@/types/content";

const masterStoryTemplate = `TÍTULO

CONTEXTO
Explique o que está acontecendo e por que essa mudança existe.

PROBLEMA DE NEGÓCIO
Qual problema estamos resolvendo?

USER STORY
Como...
Eu quero...
Para que...

REGRAS DE NEGÓCIO


CRITÉRIOS DE ACEITAÇÃO
CA1
Dado...
Quando...
Então...

CA2
Dado...
Quando...
Então...

REQUISITOS DE DADOS
Entradas:
Saídas:
Sistemas de origem:
Campos-chave:

DEPENDÊNCIAS
Issues vinculadas:
Sistemas:
Times:

FORA DE ESCOPO


QUESTÕES EM ABERTO


DECISÕES
`;

export const dicasDeJiraParaAnalistasDeNegocios: Omit<Playbook, "readingTime"> = {
  slug: "dicas-de-jira-para-analistas-de-negocios",
  title: "Dicas de Jira para Analistas de Negócios",
  description: "12 pequenos hábitos que tornam o Jira muito mais fácil de conviver.",
  summary:
    "Formas práticas de escrever tickets mais claros, registrar decisões, expor dependências e tornar os requisitos mais fáceis de usar para desenvolvedores e QA.",
  category: "Business Analysis",
  tags: ["Jira", "Requisitos", "Ticketing"],
  author: "Surya",
  date: "2026-08-08",
  intro: [
    "O Jira fica doloroso quando vira um lugar onde informação é despejada em vez de estruturada.",
    "Isso não são truques de administração nem dicas de certificação em Jira.",
    "São pequenos hábitos de trabalho que ajudam Analistas de Negócio a deixar requisitos mais claros, decisões mais fáceis de rastrear, e tickets mais fáceis de usar para desenvolvedores e QA.",
  ],
  audience: [
    "Business Analysts",
    "Product Owners",
    "Profissionais de QA",
    "Desenvolvedores que trabalham de perto com BAs",
  ],
  seoTitle: "Dicas de Jira para Analistas de Negócios — 12 Dicas Práticas",
  seoDescription:
    "12 hábitos práticos de Jira para Analistas de Negócios cobrindo user stories, critérios de aceitação, dependências, decisões, dashboards, JQL e modelos reutilizáveis.",
  closingHeading: ["Você não precisa de mais Jira.", "Você precisa de um Jira mais claro."],
  closingBody:
    "A maioria dos problemas de Jira não são problemas de Jira, na verdade. São problemas de design de informação. Contexto claro, decisões explícitas, dependências visíveis e critérios de aceitação testáveis tornam a ferramenta muito mais fácil de usar.",
  closingTemplate: masterStoryTemplate,
  closingTemplateName: "Modelo Mestre de Story para BAs",
  hacks: [
    {
      number: 1,
      title: "Pare de escrever tickets recorrentes do zero",
      insight: "Se a estrutura já funciona, reaproveite.",
      shiftLabel: "",
      before: "Criar um ticket de Jira totalmente novo toda vez.",
      after: [
        "Clonar o ticket mais parecido",
        "Remover contexto irrelevante",
        "Atualizar o requisito",
        "Validar links e critérios de aceitação",
      ],
      whyItHelps: "Você preserva uma estrutura útil enquanto reduz omissões acidentais.",
      whenToUse: "Mudanças recorrentes entre produtos, mercados, releases ou fluxos de trabalho parecidos.",
      proTip: "Nunca clone às cegas suposições, datas, responsáveis ou dependências antigas.",
    },
    {
      number: 2,
      title: "Coloque o contexto antes da user story",
      insight: "Um desenvolvedor deveria entender o problema antes de ler a solução.",
      visual: {
        steps: [
          "Contexto",
          "Problema de Negócio",
          "User Story",
          "Regras de Negócio",
          "Critérios de Aceitação",
          "Requisitos de Dados",
          "Dependências",
          "Fora de Escopo",
          "Questões em Aberto",
        ],
      },
      whyItHelps: '"Como usuário..." raramente explica o suficiente sobre por que uma mudança existe.',
      template:
        "CONTEXTO:\n\nPROBLEMA DE NEGÓCIO:\n\nUSER STORY:\nComo...\nEu quero...\nPara que...\n\nREGRAS DE NEGÓCIO:\n\nCRITÉRIOS DE ACEITAÇÃO:\n\nREQUISITOS DE DADOS:\n\nDEPENDÊNCIAS:\n\nFORA DE ESCOPO:\n\nQUESTÕES EM ABERTO:",
      templateLabel: "Copiar Modelo",
    },
    {
      number: 3,
      title: "Escreva critérios de aceitação que o QA realmente consegue testar",
      insight: "Se o QA não consegue determinar claramente aprovado ou reprovado, o critério de aceitação provavelmente está vago demais.",
      visual: { steps: ["Requisito vago", "Comportamento observável", "Aprovado / Reprovado"] },
      before: "O usuário deve conseguir visualizar a operação.",
      after: [
        "Dado uma operação casada",
        "Quando o analista abre Detalhes da Operação",
        "Então praça de execução, quantidade, preço e horário de execução são exibidos",
      ],
      whyItHelps: "Critérios de aceitação testáveis reduzem lacunas de interpretação entre BA, desenvolvedores e QA.",
    },
    {
      number: 4,
      title: "Vincule dependências em vez de descrevê-las",
      insight: "Relacionamentos devem ser modelados, não enterrados dentro de parágrafos.",
      visual: { steps: ["Epic", "Story", "Depende da Story da API", "Bloqueada pela Task de Ambiente"] },
      whyItHelps:
        "Issues vinculadas são visíveis, pesquisáveis e muito mais fáceis de rastrear do que notas narrativas de dependência.",
      whenToUse: "Dependências entre times, de API, de infraestrutura, de dados ou upstream/downstream.",
    },
    {
      number: 5,
      title: "Separe regras de negócio de critérios de aceitação",
      insight:
        "Regras descrevem como o negócio funciona. Critérios de aceitação descrevem como o sistema deve se comportar.",
      compare: {
        leftLabel: "Regra de Negócio",
        left: "Ordens acima de R$1 milhão exigem aprovação da supervisão.",
        rightLabel: "Critério de Aceitação",
        right:
          "Dado um valor de ordem acima de R$1 milhão, quando o trader envia a ordem, então a ordem entra em status Pendente de Aprovação.",
      },
      whyItHelps: "Misturar as duas coisas torna os requisitos mais difíceis de manter e testar.",
    },
    {
      number: 6,
      title: "Use labels como uma taxonomia, não como hashtags",
      insight: "Labels só ficam úteis quando o time concorda sobre o que elas significam.",
      before: ["urgente", "novo", "importante", "mudança", "time1", "diversos"],
      after: ["regulatorio", "vigilancia-de-mercado", "dados-de-mercado", "onboarding-de-clientes", "emea", "release-2026-q3"],
      whyItHelps: "Labels consistentes melhoram filtros, dashboards, relatórios e análise histórica.",
      proTip: "Se cada um inventa suas próprias labels, elas acabam ficando inúteis.",
    },
    {
      number: 7,
      title: "Crie filtros que você vai realmente reaproveitar",
      insight: "Um bom filtro de Jira transforma uma busca em um clique.",
      explanation:
        "Substitua os placeholders entre colchetes pela chave do seu projeto e pelos nomes dos seus campos antes de salvar — a sintaxe exata do JQL depende dos campos customizados do seu projeto.",
      whyItHelps: "Um filtro salvo transforma uma busca manual recorrente em uma visão permanente e compartilhável.",
      templates: [
        {
          label: "Minhas stories abertas",
          value: 'project = "[SEU PROJETO]" AND assignee = currentUser() AND status != Done ORDER BY priority DESC',
        },
        {
          label: "Stories de BA bloqueadas",
          value: 'project = "[SEU PROJETO]" AND status = "Blocked" AND labels = "requirements" ORDER BY updated DESC',
        },
        {
          label: "Stories sem critérios de aceitação",
          value: 'project = "[SEU PROJETO]" AND issuetype = Story AND "Acceptance Criteria" is EMPTY',
        },
        {
          label: "Itens na release atual",
          value: 'project = "[SEU PROJETO]" AND fixVersion = "[RELEASE ATUAL]" ORDER BY status ASC',
        },
        {
          label: "Tickets alterados recentemente",
          value: 'project = "[SEU PROJETO]" AND updated >= -3d ORDER BY updated DESC',
        },
      ],
    },
    {
      number: 8,
      title: "Construa um dashboard de BA, não mais um dashboard de status",
      insight: "Um dashboard de BA deveria mostrar onde o raciocínio ou as decisões estão travados.",
      list: [
        "Requisitos aguardando esclarecimento",
        "Stories bloqueadas",
        "Dependências em aberto",
        "Itens aguardando uma decisão de negócio",
        "Defeitos de UAT",
        "Stories alteradas durante a sprint atual",
      ],
      whyItHelps: 'Isso é mais útil para um BA do que simplesmente ver quantos tickets estão "Em Andamento".',
    },
    {
      number: 9,
      title: "Não esconda decisões dentro de comentários",
      insight: "Comentários registram conversa. Requisitos deveriam registrar a verdade resultante.",
      before: "Requisito alterado conforme discutido.",
      after: [
        "Decisão: Ordens canceladas antes da confirmação não vão gerar alertas de vigilância",
        "Motivo: O evento não é considerado uma ação de negociação executada",
        "Data: 08 ago 2026",
        "Responsável pela decisão: Vigilância de Negócios",
        "Requisito relacionado: REQ-142",
      ],
      whyItHelps: "Seis meses depois, ninguém quer ler 47 comentários para reconstruir uma decisão.",
      template:
        "Decisão: [o que mudou]\nMotivo: [por quê]\nData: [data]\nResponsável pela decisão: [quem]\nRequisito relacionado: [ID do ticket/requisito]",
      templateLabel: "Copiar Modelo de Decisão",
    },
    {
      number: 10,
      title: "Adicione uma checagem de Definition of Ready",
      insight: "Um ticket ter sido criado não significa que ele está pronto.",
      checklist: [
        "Problema de negócio entendido",
        "Critérios de aceitação escritos",
        "Regras de negócio identificadas",
        "Dependências vinculadas",
        "Requisitos de dados entendidos",
        "Designs disponíveis, se necessário",
        "Questões em aberto resolvidas",
        "Abordagem de teste entendida",
      ],
      whyItHelps:
        "Uma checagem leve de prontidão evita que requisitos parcialmente entendidos entrem silenciosamente em desenvolvimento.",
      template:
        "Definition of Ready:\n[ ] Problema de negócio entendido\n[ ] Critérios de aceitação escritos\n[ ] Regras de negócio identificadas\n[ ] Dependências vinculadas\n[ ] Requisitos de dados entendidos\n[ ] Designs disponíveis, se necessário\n[ ] Questões em aberto resolvidas\n[ ] Abordagem de teste entendida",
      templateLabel: "Copiar Checklist",
    },
    {
      number: 11,
      title: "Use subtasks só para pedaços reais de trabalho",
      insight: "Não transforme cada ação que você toma em uma subtask do Jira.",
      before: ["Story", "→ Discutir", "→ Analisar", "→ Enviar e-mail para o time", "→ Atualizar Jira", "→ Checar de novo"],
      after: ["Story", "→ Implementação de backend", "→ Implementação de UI", "→ Migração de dados", "→ Validação de QA"],
      whyItHelps: "Subtasks são úteis quando representam trabalho de entrega rastreável, não uma lista de tarefas pessoal.",
    },
    {
      number: 12,
      title: "Construa um modelo de story de BA reutilizável",
      insight: "Toda dica deste guia acaba voltando para uma única coisa.",
      explanation: "Comece todo ticket com uma estrutura que te lembra o que precisa ser pensado.",
      list: [
        "Contexto",
        "Problema de Negócio",
        "User Story",
        "Regras de Negócio",
        "Critérios de Aceitação",
        "Requisitos de Dados",
        "Dependências",
        "Fora de Escopo",
        "Questões em Aberto",
        "Decisões",
      ],
      whyItHelps:
        "Um único modelo mestre significa que todo ticket novo começa a partir da mesma estrutura completa, em vez de uma página em branco.",
      anchorLink: { label: "Ir para o modelo completo", href: "#closing-template" },
    },
  ],
};
