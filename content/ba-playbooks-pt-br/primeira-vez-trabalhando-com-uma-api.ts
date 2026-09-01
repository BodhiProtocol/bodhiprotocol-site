import type { Playbook } from "@/types/content";

const checklistApi = `CHECKLIST DE REQUISITO DE API PARA BAS

PROPÓSITO
Para que serve essa API, em uma frase?

CONSUMIDOR
Quem chama essa API?
Quando, e com que frequência?

ENDPOINT
O que está sendo pedido?

MÉTODO
GET, POST, PUT/PATCH, ou DELETE?

CAMPOS DA REQUISIÇÃO
Que informação é enviada?
Quais campos são obrigatórios?

VALIDAÇÃO
O que torna uma requisição inválida?

RESPOSTA
O que volta como resposta?
O que cada campo significa?

CÓDIGOS DE STATUS
Quais códigos são esperados?
O que cada um significa para esse requisito específico?

ERROS
Quais respostas de erro são possíveis?
O que o usuário deve ver em cada caso?

AUTENTICAÇÃO
Como quem está chamando é identificado?

AUTORIZAÇÃO
O que quem está chamando pode fazer, especificamente?

TIMEOUT
O que acontece se a resposta demorar demais?

RETRY
A requisição pode ser reenviada com segurança?

DUPLICATAS
O que acontece se a mesma requisição chegar duas vezes?

CONSUMIDORES A JUSANTE
Quem mais depende dessa resposta?

AUDITORIA
Essa chamada precisa ser registrada?

MONITORAMENTO
Como saberemos se essa API começar a falhar?

VERSIONAMENTO
Isso é uma versão nova, ou uma mudança numa já existente?
`;

const exemploOperacao = `GET /trades/T12345

Response:
{
  "tradeId": "T12345",
  "status": "MATCHED",
  "quantity": 1000
}`;

export const primeiraVezTrabalhandoComUmaApi: Omit<Playbook, "readingTime"> = {
  slug: "primeira-vez-trabalhando-com-uma-api",
  title: "Primeira vez trabalhando com uma API",
  description: "Os conceitos de API que uma BA realmente precisa entender.",
  summary:
    "A explicação sem jargão de endpoints, métodos, códigos de status, autenticação vs. autorização, retries e idempotência — o suficiente para fazer as perguntas certas numa discussão de requisito de API.",
  category: "Business Analysis",
  tags: ["APIs", "Integração", "Letramento Técnico"],
  author: "Surya",
  date: "2026-09-03",
  itemLabel: "Conceito",
  intro: [
    "A primeira vez que alguém junta \"endpoint\", \"payload\", \"401\" e \"retry logic\" na mesma frase, APIs podem parecer bem mais complicadas do que realmente são.",
    "Tire todo esse jargão e uma API é isto: o Sistema A pede algo ao Sistema B, usando um contrato que os dois lados já combinaram. Isso já é o suficiente para começar.",
    "Você não precisa construir uma. Você precisa saber o que perguntar quando outra pessoa está construindo uma para o seu requisito.",
  ],
  audience: [
    "Business Analysts novos em trabalho de integração",
    "BAs escrevendo um requisito relacionado a API pela primeira vez",
    "Product Owners trabalhando de perto com times técnicos",
    "Qualquer pessoa que assente com a cabeça quando ouve \"endpoint\" e \"payload\" sem perguntar nada",
  ],
  seoTitle: "Guia de API para BAs — primeira vez trabalhando com APIs",
  seoDescription:
    "Os conceitos de API que uma BA realmente precisa — endpoints, requisições, códigos de status, autenticação vs. autorização, retries e idempotência, explicados sem jargão, com um exemplo real.",
  closingHeading: ["Você não precisa construir a API.", "Você precisa saber o que perguntar sobre ela."],
  closingBody:
    "Todo requisito de API se resume ao mesmo punhado de perguntas: o que está sendo pedido, o que volta como resposta, o que acontece quando falha, e quem mais depende de a resposta continuar sendo a mesma.",
  closingTemplate: checklistApi,
  closingTemplateName: "Checklist de requisito de API para BAs",
  hacks: [
    {
      number: 1,
      title: "Uma API é um sistema pedindo algo a outro",
      insight: "Tire o jargão e essa é a ideia inteira.",
      visual: { steps: ["Sistema A pede", "usando um contrato combinado", "Sistema B responde"] },
      template: exemploOperacao,
      templateLabel: "Exemplo de requisição e resposta",
      explanation:
        "Isso não tem nada de misterioso. O sistema pediu: \"me dá a operação T12345.\" O outro sistema devolveu dados estruturados descrevendo ela. A maior parte do que você vai lidar como BA fica exatamente nesse nível.",
      whyItHelps: "Depois que esse formato parece assim tão comum, o resto do vocabulário é só dar nome a partes de algo que você já entende.",
    },
    {
      number: 2,
      title: "Endpoint, requisição, resposta — os três únicos substantivos que você realmente precisa",
      insight: "Tudo o mais é detalhe em cima desses três.",
      list: [
        "Endpoint — o endereço específico que você está pedindo",
        "Requisição — o que você envia, incluindo o que você está pedindo",
        "Resposta — o que volta, e o que isso significa",
      ],
      whyItHelps: "Quando uma conversa começa a afogar em siglas, essas três palavras geralmente bastam para trazer ela de volta a algo que você consegue acompanhar.",
    },
    {
      number: 3,
      title: "O método diz que tipo de pedido é esse",
      insight: "GET, POST, PUT/PATCH, DELETE não são curiosidade — eles dizem o que o requisito faz com os dados.",
      list: [
        "GET — lê algo, nada muda",
        "POST — cria algo novo",
        "PUT / PATCH — atualiza algo que já existe",
        "DELETE — remove algo",
      ],
      whyItHelps: "\"Isso lê os dados ou muda eles?\" é uma das primeiras perguntas úteis em qualquer discussão de requisito de API, e o método geralmente já responde isso em uma palavra.",
    },
    {
      number: 4,
      title: "Códigos de status são o sistema contando o que aconteceu",
      insight: "Você não precisa decorar isso. Você precisa reconhecer a diferença entre alguns deles.",
      list: [
        "200 — funcionou, aqui está seu dado",
        "201 — criado com sucesso",
        "400 — a própria requisição estava errada",
        "401 — você não está autenticado",
        "403 — você está autenticado, mas não tem permissão",
        "404 — essa coisa não existe",
        "409 — conflita com algo que já existe",
        "500 — o outro sistema quebrou, não você",
      ],
      whyItHelps: "Um 401 e um 403 são falhas diferentes, com donos diferentes — uma é um problema de login, a outra é uma permissão que alguém decidiu de propósito. Essa distinção muda quem conserta.",
    },
    {
      number: 5,
      title: "Todo campo é obrigatório ou opcional — decida qual, de propósito",
      insight: "Um campo que é opcional sem ninguém decidir isso é um requisito que ninguém realmente escreveu.",
      list: [
        "Quais campos são obrigatórios para a requisição funcionar?",
        "O que acontece se um campo opcional estiver faltando na resposta?",
        "O que acontece se um obrigatório estiver faltando — rejeitar, ou chutar?",
      ],
      whyItHelps: "\"O campo geralmente está lá\" não é a mesma coisa que \"o campo é obrigatório.\" O time de desenvolvimento vai construir de acordo com o que você realmente escreveu.",
    },
    {
      number: 6,
      title: "Autenticação e autorização são duas perguntas diferentes",
      insight: "\"Quem é você?\" e \"o que você pode fazer?\" são jogados no mesmo saco o tempo todo. Não são a mesma verificação.",
      compare: {
        leftLabel: "Autenticação",
        left: "Prova quem está chamando — um login, um token, uma chave.",
        rightLabel: "Autorização",
        right: "Decide o que quem está chamando pode fazer, depois de provado quem é.",
      },
      whyItHelps: "Quem está chamando pode estar autenticado e ainda assim não autorizado — logado corretamente, e mesmo assim sem permissão para ver essa operação específica.",
    },
    {
      number: 7,
      title: "Retries e duplicatas são uma conversa de requisito, não só uma conversa técnica",
      insight: "\"É só mandar de novo\" é uma decisão, mesmo quando ninguém quis que fosse.",
      list: [
        "Essa requisição pode ser reenviada com segurança se der timeout?",
        "O que acontece se a mesma requisição chegar duas vezes?",
        "Um retry poderia criar a mesma operação uma segunda vez?",
      ],
      explanation:
        "A palavra técnica para \"seguro de repetir sem efeitos colaterais\" é idempotência. Você não precisa da palavra. Você precisa da pergunta: se isso for enviado duas vezes por acidente, alguma coisa ruim acontece duas vezes?",
      whyItHelps: "Essa é a pergunta que falta na maioria dos requisitos de API — não porque é difícil, mas porque é fácil assumir que a resposta é obviamente sim.",
    },
    {
      number: 8,
      title: "Descubra quem mais depende dessa resposta antes de mudá-la",
      insight: "Uma resposta de API é uma promessa para todo mundo que já está consumindo ela, não só para você.",
      list: [
        "Quem mais chama isso hoje?",
        "O que quebra para eles se um campo for renomeado ou removido?",
        "Isso é uma versão nova, ou uma mudança que quebra uma já existente?",
      ],
      whyItHelps: "\"A gente só precisa adicionar um campo\" geralmente é seguro. \"A gente precisa mudar o que um campo já existente significa\" geralmente não é — e essa diferença importa para pessoas com quem você talvez nunca converse diretamente.",
    },
    {
      number: 9,
      title: "Planeje para o momento em que o outro sistema não responder",
      insight: "Um requisito que só descreve uma API funcionando ainda não descreveu a API.",
      before: "O requisito assume que a API sempre responde, instantaneamente e corretamente.",
      after: [
        "O que acontece se a API estiver indisponível?",
        "O que acontece se der timeout?",
        "O que o usuário vê enquanto esperamos, e depois que desistimos?",
      ],
      whyItHelps: "Essa é a lacuna que vira um relatório de incidente em produção seis meses depois, geralmente começando com \"a gente nunca discutiu de verdade o que acontece se...\"",
    },
  ],
};
