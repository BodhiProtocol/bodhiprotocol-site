import type { Playbook } from "@/types/content";

const qualityChecklist = `CHECKLIST DE QUALIDADE DOS CRITÉRIOS DE ACEITAÇÃO

[ ] Observável
[ ] Testável
[ ] Específico
[ ] Regra de negócio compreendida
[ ] Fluxo principal coberto
[ ] Fluxo negativo coberto
[ ] Condições de limite consideradas
[ ] Comportamento de erro definido
[ ] Expectativas de dados claras
[ ] Sem adjetivos vagos
[ ] Sem suposições ocultas
`;

export const comoEscreverCriteriosDeAceitacao: Omit<Playbook, "readingTime"> = {
  slug: "como-escrever-criterios-de-aceitacao",
  title: "Critérios de aceitação: do vago ao testável",
  description: "Como escrever critérios de aceitação que o time realmente consegue construir e testar.",
  summary:
    "Reescritas de exemplos ruins para bons dos critérios de aceitação que parecem certos à primeira vista — Dado/Quando/Então, cenários negativos, condições de limite e os adjetivos vagos que tornam um critério impossível de testar.",
  category: "Business Analysis",
  tags: ["Requisitos", "Critérios de Aceitação", "Testes"],
  author: "Surya",
  date: "2026-08-08",
  itemLabel: "Ajuste",
  intro: [
    "\"O sistema deve processar a operação corretamente.\" Parece certo numa primeira leitura. Aí o desenvolvimento pergunta o que \"corretamente\" significa, o QA pergunta como vai provar isso, e a frase para de parecer certa — passa a soar como algo que três pessoas estão prestes a interpretar de três jeitos diferentes.",
    "Critérios de aceitação existem para eliminar exatamente esse tipo de interpretação. Não é descrever a intenção de forma bonita. É descrever o comportamento com precisão suficiente para que dois desenvolvedores, trabalhando sozinhos, construam a mesma coisa a partir da mesma frase.",
  ],
  audience: [
    "Business Analysts",
    "Profissionais de QA revisando requisitos antes da sprint",
    "Desenvolvedores que herdam tickets ambíguos",
    "Product Owners escrevendo suas próprias User Stories",
  ],
  seoTitle: "Como escrever critérios de aceitação — guia com exemplos",
  seoDescription:
    "Guia prático de critérios de aceitação: exemplos ruins reescritos para bons, Dado/Quando/Então, cenários negativos e as palavras vagas que quebram a testabilidade.",
  closingHeading: ["\"Corretamente\" não é um requisito.", "É a promessa de um."],
  closingBody:
    "Todo critério de aceitação deve passar por um teste: dois desenvolvedores, trabalhando sozinhos, construiriam a mesma coisa a partir dele? Se a resposta depende dos dois chutarem do mesmo jeito, ainda não está pronto.",
  closingTemplate: qualityChecklist,
  closingTemplateName: "Checklist de qualidade dos critérios de aceitação",
  hacks: [
    {
      number: 1,
      title: "Diga o que deve ser observável, não o que deve ser verdade",
      insight: "\"Corretamente\" não é um comportamento. É uma sensação que todo mundo compartilha até deixar de compartilhar.",
      before: "O sistema deve processar a operação corretamente.",
      after: "Dado uma operação casada válida, quando o processamento de liquidação é executado, então uma instrução de liquidação é criada.",
      shiftLabel: "A reescrita",
      whyItHelps:
        "A reescrita não diz mais coisas. Ela diz algo que uma pessoa realmente consegue verificar — passou ou não passou, sem precisar de discussão.",
    },
    {
      number: 2,
      title: "Dado / Quando / Então é uma disciplina, não uma regra de formatação",
      insight: "Cada parte cumpre uma função específica. Pule uma delas e o critério deixa de ser testável.",
      visual: { steps: ["Dado — a condição inicial", "Quando — a ação que dispara", "Então — o resultado observável"] },
      whyItHelps:
        "A maioria dos critérios vagos está sem uma dessas três partes, geralmente o \"Dado\". Sem uma condição inicial, \"quando X acontece, então Y\" pode significar quase qualquer coisa.",
    },
    {
      number: 3,
      title: "Escreva o cenário negativo, não só o de sucesso",
      insight: "Um critério que só descreve o sucesso não disse a ninguém como é o fracasso.",
      before: "O sistema deve exibir a mensagem de erro apropriada.",
      after: [
        "Dado uma conta de liquidação inválida",
        "Quando o processamento de liquidação é executado",
        "Então a instrução é rejeitada",
        "E o usuário vê a mensagem de validação configurada",
      ],
      shiftLabel: "A reescrita",
      whyItHelps:
        "\"Mensagem de erro apropriada\" não é uma mensagem. Alguém ainda vai ter que inventar o texto de verdade durante o teste — e esse é o pior momento para inventar isso.",
    },
    {
      number: 4,
      title: "Condições de limite são onde os bugs realmente moram",
      insight: "Ninguém quebra o sistema no meio de um intervalo. Quebra na borda.",
      list: [
        "O que acontece exatamente no limite?",
        "O que acontece uma unidade acima?",
        "O que acontece uma unidade abaixo?",
        "O que acontece em zero, vazio ou nulo?",
      ],
      whyItHelps:
        "\"Ordens acima de R$1 milhão precisam de aprovação\" parece completo até alguém perguntar sobre uma ordem de exatamente R$1.000.000,00. Essa pergunta deveria vir de você, não de um chamado de defeito.",
    },
    {
      number: 5,
      title: "Defina o comportamento do erro, não só a existência dele",
      insight: "\"Mostrar erro se inválido\" descreve que algo acontece. Não descreve o quê.",
      before: "Mostrar erro se inválido.",
      after: [
        "Rejeitar a requisição",
        "Retornar um código de validação específico",
        "Exibir a mensagem configurada para o usuário",
        "Registrar o motivo da rejeição para auditoria",
      ],
      shiftLabel: "A reescrita",
      whyItHelps:
        "Quatro sistemas diferentes — UI, API, log, auditoria — precisam concordar sobre o que \"inválido\" realmente significa. Uma linha vaga deixa os quatro chutando cada um por conta própria.",
    },
    {
      number: 6,
      title: "Uma regra de negócio e um critério de aceitação não são a mesma frase",
      insight: "Uma descreve como o negócio funciona. A outra descreve como o sistema prova isso.",
      before: "\"Ordens acima de R$1 milhão exigem aprovação, então garanta que isso funcione\".",
      after: [
        "Regra de negócio — como o negócio funciona: ordens acima de R$1 milhão exigem aprovação da supervisão.",
        "Critério de aceitação — como o sistema se comporta: dado um valor de ordem acima de R$1 milhão, quando o trader a envia, então a ordem entra no status Pendente de Aprovação.",
      ],
      shiftLabel: "A diferença",
      whyItHelps:
        "Misturar os dois torna ambos mais difíceis de manter. Quando o limite mudar no ano que vem, você vai querer atualizar uma regra — não caçar em scripts de teste toda frase que mencionou isso.",
    },
    {
      number: 7,
      title: "Adjetivos vagos são onde a ambiguidade se esconde à vista de todos",
      insight: "Cada um desses parece específico o bastante para passar na revisão. Nenhum deles é testável do jeito que está escrito.",
      explanation:
        "\"A página deve carregar rapidamente\" é o caso clássico. Uma meta de performance mensurável é ótima quando existe uma meta de verdade — mas colar um número em toda frase só para soar preciso é um outro tipo de vagueza. Só adicione uma meta onde alguém consiga explicar por que aquele número, especificamente.",
      list: ["corretamente", "adequadamente", "rapidamente", "apropriadamente", "normalmente", "eficientemente", "amigável ao usuário"],
      whyItHelps:
        "Cada um desses acaba sendo redefinido por quem estiver testando, sob pressão de tempo, geralmente de um jeito diferente do que o negócio realmente quis dizer.",
    },
    {
      number: 8,
      title: "Deixe a implementação para quem vai implementar",
      insight: "Um critério que especifica tecnologia geralmente parou de especificar comportamento de negócio.",
      before: "Use um cache Redis com TTL de 5 minutos para que a consulta de sessão seja rápida.",
      after: "Dado uma sessão ativa, quando o usuário age dentro de 5 minutos da última ação, então ele continua logado.",
      shiftLabel: "A reescrita",
      whyItHelps:
        "A regra dos 5 minutos é decisão do negócio. O Redis não é. Nomear a tecnologia no critério só garante que ele vai estar errado no dia em que a engenharia escolher outra.",
    },
    {
      number: 9,
      title: "Um critério, um comportamento",
      insight: "Um critério que tenta provar quatro coisas ao mesmo tempo não consegue falhar de forma limpa quando uma delas quebra.",
      before:
        "Dado que uma operação é enviada, quando ela é validada e registrada e confirmada, então tudo deve funcionar, o usuário é notificado e o razão é atualizado.",
      after: [
        "CA1 — Dado uma operação válida, quando enviada, então é validada.",
        "CA2 — Dado uma operação validada, quando registrada, então uma confirmação é gerada.",
        "CA3 — Dado uma confirmação de registro, quando criada, então o razão é atualizado.",
      ],
      shiftLabel: "A reescrita",
      whyItHelps:
        "Quando CA1 a CA3 existem separadamente, uma falha de teste aponta exatamente para um deles. A versão emaranhada só te diz que alguma coisa, em algum lugar, deu errado.",
    },
    {
      number: 10,
      title: "Envolva o QA na conversa enquanto você ainda está escrevendo",
      insight: "A pessoa que vai ter que provar que um critério é falso é quem melhor sabe se isso é possível.",
      whyItHelps:
        "Um critério que sobrevive a uma leitura do QA antes da sprint começar é um critério que não vai voltar como pergunta de esclarecimento no meio da sprint, quando custa mais caro responder.",
      proTip:
        "Se o QA lê um critério e não consegue descrever como faria ele falhar, isso não é um problema do QA — é um critério inacabado.",
    },
  ],
};
