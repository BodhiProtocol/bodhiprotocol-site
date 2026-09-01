import type { Playbook } from "@/types/content";

const apiChecklist = `CHECKLIST DE REQUISITO DE API PARA BAS

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
Qual informação é enviada?
Quais campos são obrigatórios?

VALIDAÇÃO
O que torna uma requisição inválida?

RESPOSTA
O que volta?
O que cada campo significa?

CÓDIGOS DE STATUS
Quais códigos são esperados?
O que cada um significa para este requisito específico?

ERROS
Quais respostas de erro são possíveis?
O que o usuário deveria ver em cada caso?

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

CONSUMIDORES DOWNSTREAM
Quem mais depende dessa resposta?

AUDITORIA
Essa chamada precisa ser registrada?

MONITORAMENTO
Como vamos saber se essa API começar a falhar?

VERSIONAMENTO
Isso é uma versão nova, ou uma mudança em uma já existente?
`;

const tradeExample = `GET /trades/T12345

Resposta:
{
  "tradeId": "T12345",
  "status": "MATCHED",
  "quantity": 1000
}`;

export const primeiraVezTrabalhandoComUmaApi: Omit<Playbook, "readingTime"> = {
  slug: "primeira-vez-trabalhando-com-uma-api",
  title: "Primeira Vez Trabalhando com uma API",
  description: "Os conceitos de API que um Analista de Negócios realmente precisa entender.",
  summary:
    "A versão em português claro de endpoints, métodos, códigos de status, autenticação vs. autorização, retries e idempotência — o suficiente para fazer as perguntas certas numa discussão de requisito de API.",
  category: "Business Analysis",
  tags: ["APIs", "Integração", "Letramento Técnico"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Conceito",
  intro: [
    "Na primeira vez que alguém junta \"endpoint\", \"payload\", \"401\" e \"retry logic\" na mesma frase, APIs podem soar bem mais complicadas do que realmente são.",
    "Tire tudo isso e uma API é isto: o Sistema A pede algo ao Sistema B, usando um contrato que os dois lados já combinaram. Isso já é o suficiente para começar.",
    "Você não precisa construir uma. Você precisa saber o que perguntar quando outra pessoa está construindo uma para o seu requisito.",
  ],
  audience: [
    "Business Analysts novos em trabalho de integração",
    "BAs escrevendo um requisito relacionado a API pela primeira vez",
    "Product Owners que trabalham de perto com times técnicos",
    "Qualquer um que finge entender \"endpoint\" e \"payload\" sem perguntar",
  ],
  seoTitle: "Guia de API para Analistas de Negócios — Primeira Vez Trabalhando com APIs",
  seoDescription:
    "Os conceitos de API que um Analista de Negócios realmente precisa — endpoints, requisições, códigos de status, autenticação vs. autorização, retries e idempotência, explicados em português claro com um exemplo real.",
  closingHeading: ["Você não precisa construir a API.", "Você precisa saber o que perguntar sobre ela."],
  closingBody:
    "Todo requisito de API se reduz ao mesmo punhado de perguntas: o que está sendo pedido, o que volta, o que acontece quando falha e quem mais depende dessa resposta continuar igual.",
  closingTemplate: apiChecklist,
  closingTemplateName: "Checklist de Requisito de API para BAs",
  hacks: [
    {
      number: 1,
      title: "Uma API é um sistema pedindo algo a outro",
      insight: "Tire o jargão e essa é a ideia inteira.",
      visual: { steps: ["Sistema A pede", "usando um contrato combinado", "Sistema B responde"] },
      template: tradeExample,
      templateLabel: "Exemplo de requisição e resposta",
      explanation:
        "Não tem mistério nenhum aqui. O sistema pediu: \"me dá a operação T12345.\" O outro sistema devolveu um dado estruturado descrevendo ela. A maior parte do que você vai lidar como BA fica exatamente nesse nível.",
      whyItHelps: "Assim que essa estrutura parecer comum, o resto do vocabulário é só dar nome às partes de algo que você já entende.",
    },
    {
      number: 2,
      title: "Endpoint, requisição, resposta — os três únicos substantivos que você realmente precisa",
      insight: "Tudo o mais é detalhe em cima desses três.",
      list: [
        "Endpoint — o endereço específico que você está chamando",
        "Requisição — o que você envia, incluindo o que você está pedindo",
        "Resposta — o que volta e o que isso significa",
      ],
      whyItHelps: "Quando uma conversa começa a afundar em siglas, essas três palavras geralmente bastam para trazer ela de volta para algo que você consegue acompanhar.",
    },
    {
      number: 3,
      title: "O método diz que tipo de pedido é esse",
      insight: "GET, POST, PUT/PATCH, DELETE não são curiosidade — eles dizem o que o requisito faz com o dado.",
      list: [
        "GET — ler algo, nada muda",
        "POST — criar algo novo",
        "PUT / PATCH — atualizar algo que já existe",
        "DELETE — remover algo",
      ],
      whyItHelps: "\"Isso lê o dado ou muda ele?\" é uma das primeiras perguntas úteis em qualquer discussão de requisito de API, e o método geralmente responde isso em uma palavra.",
    },
    {
      number: 4,
      title: "Códigos de status são o sistema te contando o que aconteceu",
      insight: "Você não precisa decorar todos eles. Você precisa reconhecer a diferença entre alguns.",
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
      whyItHelps: "Um 401 e um 403 são falhas diferentes com donos diferentes — uma é um problema de login, a outra é uma permissão que alguém decidiu de propósito. Essa distinção muda quem resolve.",
    },
    {
      number: 5,
      title: "Todo campo é obrigatório ou opcional — decida qual, de propósito",
      insight: "Um campo silenciosamente opcional é um requisito que ninguém realmente escreveu.",
      list: [
        "Quais campos são obrigatórios para a requisição funcionar?",
        "O que acontece se um campo opcional estiver ausente na resposta?",
        "O que acontece se um obrigatório estiver ausente — rejeitar, ou chutar?",
      ],
      whyItHelps: "\"O campo geralmente está lá\" não é o mesmo que \"o campo é obrigatório.\" O desenvolvimento vai construir de acordo com o que você realmente escreveu.",
    },
    {
      number: 6,
      title: "Autenticação e autorização são duas perguntas diferentes",
      insight: "\"Quem é você?\" e \"o que você pode fazer?\" são constantemente jogados no mesmo saco. Não são a mesma checagem.",
      compare: {
        leftLabel: "Autenticação",
        left: "Prova quem está chamando — um login, um token, uma chave.",
        rightLabel: "Autorização",
        right: "Decide o que quem está chamando pode fazer, depois de comprovado quem é.",
      },
      whyItHelps: "Quem chama pode estar autenticado e mesmo assim não autorizado — logado corretamente, e ainda sem permissão para ver essa operação específica.",
    },
    {
      number: 7,
      title: "Retries e duplicatas são uma conversa de requisitos, não só técnica",
      insight: "\"Só tenta de novo\" é uma decisão, mesmo quando ninguém quis que fosse.",
      list: [
        "Essa requisição pode ser reenviada com segurança se der timeout?",
        "O que acontece se a mesma requisição exata chegar duas vezes?",
        "Um retry poderia criar a mesma operação uma segunda vez?",
      ],
      explanation:
        "A palavra técnica para \"seguro de repetir sem efeitos colaterais\" é idempotência. Você não precisa da palavra. Você precisa da pergunta: se isso for enviado duas vezes por acidente, alguma coisa ruim acontece duas vezes?",
      whyItHelps: "Essa é a pergunta que falta na maioria dos requisitos de API — não porque é difícil, mas porque é fácil assumir que a resposta é obviamente sim.",
    },
    {
      number: 8,
      title: "Descubra quem mais depende da resposta antes de ela mudar",
      insight: "Uma resposta de API é uma promessa para todo mundo que já consome ela, não só para você.",
      list: [
        "Quem mais chama isso hoje?",
        "O que quebra para eles se um campo for renomeado ou removido?",
        "Isso é uma versão nova, ou uma mudança quebrando uma já existente?",
      ],
      whyItHelps: "\"A gente só precisa adicionar um campo\" geralmente é seguro. \"A gente precisa mudar o que um campo existente significa\" geralmente não é — e a diferença importa para pessoas com quem você talvez nunca converse diretamente.",
    },
    {
      number: 9,
      title: "Planeje para o momento em que o outro sistema não responder",
      insight: "Um requisito que só descreve uma API funcionando ainda não descreveu a API.",
      before: "O requisito assume que a API sempre responde, instantaneamente e corretamente.",
      after: [
        "O que acontece se a API estiver indisponível?",
        "O que acontece se der timeout?",
        "O que o usuário vê enquanto espera, e depois que desistimos?",
      ],
      whyItHelps: "Essa é a lacuna que vira um relatório de incidente de produção seis meses depois, geralmente começando com \"a gente nunca discutiu de verdade o que acontece se...\"",
    },
  ],
};
