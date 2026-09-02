import type { Playbook } from "@/types/content";

const stuckStoryDiagnostic = `DIAGNÓSTICO DE STORY PARADA

Story:

Quantidade de sprints arrastada:

O que exatamente está inacabado?

Causa raiz:
[ ] Técnica
[ ] Requisito
[ ] Dependência
[ ] Teste
[ ] Escopo
[ ] Decisão
[ ] Outra

O que estamos esperando?

Responsável pela decisão / bloqueio:

Responsável pela próxima ação:

O que precisa acontecer a seguir?

O escopo já concluído pode ser separado ou liberado à parte?

Próxima ação concreta:

Prazo:

O que tornaria essa story genuinamente Done?
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/a-story-foi-arrastada-por-quatro-sprints-body.tsx
// (renderizada via o registro customPlaybookBodies, não a partir de `hacks`).
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Sprint 1: arrastada. Sprint 2: arrastada. Sprint 3: arrastada. Segunda de manhã. Sprint 4. E lá está ela de novo. ABC-142. Mesmo título. Mesma pontuação. Mesma sensação levemente incômoda quando alguém pergunta "o que falta nessa aí?" Alguém diz "está quase pronta". O que é interessante, porque também estava quase pronta há três semanas. Nesse ponto, eu não perguntaria "como a gente termina essa story?" Eu perguntaria "por que essa story sobreviveu quatro sprints?" Porque uma story que fica sendo arrastada geralmente está te dizendo alguma coisa. O erro é tratar o próprio arrasto como o problema.

Primeiro, pare de chamar de "quase pronta". O status da ABC-142 é In Progress. O último comentário diz "desenvolvimento quase completo. Aguardando validação final." Parece razoável, mas "quase pronta" não é particularmente útil. Então pergunte: o que exatamente está inacabado? Não quanto falta, não que porcentagem está completa — nomeie de verdade o que resta. A gente pergunta ao desenvolvedor. Acontece que a UI está pronta, as mudanças de backend estão prontas, a integração de API está pronta, o teste unitário está pronto. Então o desenvolvimento não é realmente o problema. O QA está esperando. Agora temos onde procurar.

A story não está bloqueada por tudo. Uma story pode parecer travada como um objeto único, mas geralmente só uma parte está realmente travada. A ABC-142 está sentada em "In Progress" há semanas, o que dá a impressão de que a story inteira está inacabada. Não está. A maior parte está pronta. O problema que resta é que o QA não consegue completar um cenário de teste. Agora pergunte por quê.

O QA diz que o comportamento esperado não está claro. Um serviço upstream normalmente retorna dados de risco do cliente, mas às vezes o serviço não retorna nenhum registro. O QA pergunta o que deveria acontecer quando nenhum registro de risco é retornado. Os critérios de aceitação dizem que o sistema deveria tratar a resposta "de forma apropriada". O desenvolvimento interpretou isso como continuar o processamento. O QA interpretou como parar o processamento e mostrar um erro. O negócio não confirmou nenhuma das duas. A ABC-142 não está realmente esperando o QA — o QA está esperando um requisito.

Então a gente checa o requisito. Descrição, nada. Critérios de aceitação, nada. Página do Confluence linkada, nada. Depois chegamos nos comentários. O comentário #38 diz "precisa de confirmação do negócio sobre o comportamento esperado quando nenhum registro de risco é retornado", postado há 13 dias, sem resposta. Ali está: quatro sprints de arrasto, e o bloqueio real é uma pergunta sem resposta dentro de um comentário do Jira. A story não estava bloqueada pelo desenvolvimento. Também não estava realmente bloqueada pelo QA. Estava bloqueada por uma decisão que ninguém tinha tornado visível.

É por isso que o arrasto é uma informação útil. É tentador tratar o arrasto como um problema de planejamento — estimativa ruim, trabalho demais assumido, velocidade caindo. Às vezes é exatamente isso que aconteceu. Mas o arrasto repetido merece uma pergunta diferente, não "por que estamos lentos", mas sim "que tipo de trabalho inacabado continua sobrevivendo ao limite do sprint". Porque "inacabado" pode significar coisas muito diferentes.

Existem pelo menos seis tipos de inacabado. Inacabado técnico significa que genuinamente ainda falta trabalho de implementação — código ou integração está incompleto, um problema técnico não foi resolvido. Inacabado de requisito significa que o time não sabe de verdade o que o sistema deveria fazer — os critérios de aceitação não estão claros, uma exceção não foi definida, uma regra está faltando ou dois stakeholders interpretam o requisito de formas diferentes. Inacabado de dependência significa que seu time terminou a parte dele, mas está esperando outro time, uma API, infraestrutura, um ambiente de teste, um fornecedor, dado de referência ou aprovação. Inacabado de teste significa que o desenvolvimento pode estar completo, mas o comportamento ainda não foi comprovado — falta dado de teste, o ambiente de QA está quebrado, os casos de teste não estão claros, defeitos permanecem ou a validação do negócio não aconteceu. Inacabado de escopo é traiçoeiro — toda vez que alguém mexe na story, mais alguma coisa é adicionada, então a story não termina porque a linha de chegada continua se movendo. Inacabado de decisão significa que alguém precisa escolher — opção A ou B, aprovar ou rejeitar, incluir ou excluir, falhar ou continuar — mas ninguém decidiu isso claramente. Foi o que aconteceu com a ABC-142, e isso é incrivelmente comum.

Voltando à ABC-142. Agora que sabemos o bloqueio, em vez de dizer "ainda pendente de QA", atualizamos a story com um Bloqueio, uma Decisão necessária, um Responsável pela decisão, um Impacto e um Responsável. Agora o problema está visível. Um status vermelho vago virou uma decisão específica.

Depois pergunte se isso ainda deveria ser uma story só. Isso ainda é de verdade um único pedaço coerente de trabalho? Em algum momento, manter tudo dentro de uma story só para de ajudar. Talvez o escopo concluído possa ser separado, talvez a parte inacabada mereça o próprio ticket, talvez a story original fosse simplesmente grande demais. A pergunta é se manter tudo isso junto ainda ajuda a entregar o trabalho.

Verifique se a story mudou enquanto as pessoas estavam construindo ela. Às vezes uma story não levou quatro sprints — quatro versões diferentes da story levaram quatro sprints. Olhe o histórico da descrição, mudanças nos critérios de aceitação, escopo recém-adicionado, comentários contendo decisões, defeitos linkados e novas dependências. Se o requisito continua mudando depois que a implementação começa, aponte isso em vez de esconder dentro do número de arrasto.

Pergunte se o QA encontrou um defeito ou um requisito faltando. Se um aviso era obrigatório e está faltando, isso é um defeito. Se ninguém nunca decidiu o que deveria acontecer, isso é uma lacuna de requisito. Do contrário, os times acabam registrando defeitos contra um comportamento que ninguém nunca especificou, criando um ciclo: requisito faltando, registrado como defeito, o desenvolvedor pergunta qual é o comportamento correto, decisão de negócio necessária, a story é arrastada de novo. Nomeie o problema real.

Encontre o responsável pelo bloqueio. "Esperando o negócio" não é responsabilidade. Pergunte quem é responsável por conseguir a próxima resposta ou ação — não necessariamente a pessoa que precisa tomar a decisão. Para a ABC-142, a Operação de Risco é dona da decisão, mas o BA é dono de conseguir essa decisão, com um prazo. Agora alguma coisa consegue andar.

O teste de arrasto de cinco minutos: o que exatamente está inacabado, por que está inacabado, quem ou o que estamos esperando, a parte concluída pode ser separada e qual é a próxima ação concreta.

O que aconteceu com a ABC-142? A Operação de Risco eventualmente confirma que, se nenhum registro de risco do cliente for retornado, o processamento deve parar e a transação deve entrar em Revisão Manual. Atualizamos a regra de negócio e o critério de aceitação, o QA testa, passa, e a ABC-142 é fechada. O trabalho de desenvolvimento não foi o que levou quatro sprints — o comportamento sem resposta foi.

Uma story pode estar verde e ainda estar travada. Times costumam usar o status do Jira como atalho para saúde, mas o status não diz se o entendimento está avançando. Quando alguma coisa é arrastada repetidamente, pergunte o que mudou nessa story durante o último sprint. Uma decisão foi tomada, um bloqueio foi removido, uma dependência foi entregue, algo foi testado, o escopo foi esclarecido? Se a resposta é basicamente nada, mover para outro sprint não vai mudar isso magicamente.

Não culpe a estimativa automaticamente. Às vezes o time simplesmente subestimou o trabalho. Mas o arrasto repetido também pode ser sintoma de requisitos vagos, dependências escondidas, decisões atrasadas, aumento de escopo, divisão ruim de stories, dado de teste faltando, problemas de ambiente ou responsabilidade pouco clara. Se você tratar todo arrasto como estimativa ruim, pode acabar gastando horas ajustando pontos de story enquanto o bloqueio real fica intocado. Por isso o diagnóstico vem primeiro.`;

export const aStoryFoiArrastadaPorQuatroSprints: Omit<Playbook, "readingTime"> = {
  slug: "a-story-foi-arrastada-por-quatro-sprints",
  title: "A Story Foi Arrastada Por Quatro Sprints",
  description: "Como descobrir o que está realmente impedindo uma story de ser concluída.",
  summary:
    "Um exemplo real de diagnóstico de uma story que continua sobrevivendo aos limites de sprint — os seis tipos de \"inacabado\", o teste de arrasto de cinco perguntas e como um comentário do Jira sem resposta segurou quatro sprints de trabalho.",
  category: "Business Analysis",
  tags: ["Entrega", "Jira", "causa raiz"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Business Analysts investigando uma story que continua sendo arrastada",
    "Scrum Masters e líderes de entrega triando o arrasto de sprint",
    "Product Owners decidindo se devem redefinir o escopo de uma story travada",
    "Qualquer um que já disse \"está quase pronta\" por três sprints seguidos",
  ],
  bodyText,
  seoTitle: "Por Que Uma Story Continua Sendo Arrastada — Um Guia de Diagnóstico para BAs",
  seoDescription:
    "Um guia prático de BA para diagnosticar uma story que continua sendo arrastada entre sprints — os seis tipos de trabalho inacabado, o teste de arrasto de cinco minutos e um exemplo real completo.",
  closingHeading: [
    "O que está sendo carregado de sprint em sprint geralmente não é a story.",
    "É uma pergunta sem resposta.",
  ],
  closingBody:
    "Da próxima vez que uma story aparecer no terceiro ou quarto sprint, não a mova de novo automaticamente. Abra ela. Pergunte o que exatamente está inacabado. Pergunte por quê. Pergunte quem é dono dessa resposta.",
  closingTemplate: stuckStoryDiagnostic,
  closingTemplateName: "Diagnóstico de Story Parada",
  hacks: [
    {
      number: 1,
      title: "Inacabado técnico",
      insight: "Genuinamente ainda falta trabalho de implementação.",
      explanation: "O código está incompleto. A integração está incompleta. Um problema técnico não foi resolvido. Direto ao ponto.",
      whyItHelps: "Nomear isso cedo confirma que a solução ainda está nas mãos do desenvolvimento, não esperando por ninguém mais.",
    },
    {
      number: 2,
      title: "Inacabado de requisito",
      insight: "O time não sabe de verdade o que o sistema deveria fazer.",
      list: ["Os critérios de aceitação não estão claros", "Uma exceção não foi definida", "Uma regra está faltando", "Dois stakeholders interpretam o requisito de formas diferentes"],
      whyItHelps: "O código pode estar esperando por entendimento, não por mais código — isso muda quem precisa agir a seguir.",
    },
    {
      number: 3,
      title: "Inacabado de dependência",
      insight: "Seu time terminou a parte dele, mas o trabalho que resta está em outro lugar.",
      list: ["Outro time", "Uma API", "Infraestrutura", "Ambiente de teste", "Fornecedor", "Dado de referência", "Aprovação"],
      whyItHelps: "A story está tecnicamente \"em andamento\", mas nada que seu time fizer vai movê-la até a dependência ser resolvida.",
    },
    {
      number: 4,
      title: "Inacabado de teste",
      insight: "O desenvolvimento pode estar completo, mas o comportamento ainda não foi comprovado.",
      list: ["Falta dado de teste", "O ambiente de QA está quebrado", "Os casos de teste não estão claros", "Defeitos permanecem", "A validação do negócio não aconteceu"],
      whyItHelps: "Problema diferente, responsável diferente — tratar um ambiente quebrado como uma lacuna de código manda a solução para a pessoa errada.",
    },
    {
      number: 5,
      title: "Inacabado de escopo",
      insight: "Toda vez que alguém mexe na story, mais alguma coisa é adicionada.",
      explanation: "\"Já que estamos aqui, dá pra gente também...\" Depois \"esse caso extremo provavelmente deveria estar incluído.\" Depois \"a gente deveria dar suporte para outro mercado também.\"",
      whyItHelps: "A story não termina porque a linha de chegada continua se movendo — nomear isso impede que a culpa caia no ritmo do time em vez disso.",
    },
    {
      number: 6,
      title: "Inacabado de decisão",
      insight: "Alguém precisa escolher, e ninguém escolheu.",
      list: ["Opção A ou B", "Aprovar ou rejeitar", "Incluir ou excluir", "Falhar ou continuar"],
      whyItHelps: "Foi o que aconteceu com a ABC-142 — e isso é incrivelmente comum, por isso vale a pena checar primeiro, não por último.",
    },
  ],
};
