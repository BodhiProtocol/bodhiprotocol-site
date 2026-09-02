import type { Playbook } from "@/types/content";

// A narrativa completa + os dois exemplos trabalhados vivem em
// components/ba-playbooks/modelo-de-user-story-para-business-analyst-body.tsx
// (renderizada via o registro customPlaybookBodies, não a partir de `hacks`).
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Você abre o Jira. Clica em Create. E de repente essa caixinha vazia parece uma prova. Summary. Description. Acceptance Criteria. O que exatamente você deveria colocar ali? Uma user story não precisa ser longa. Ela precisa tornar a próxima conversa mais fácil. Aqui está um modelo que você consegue realmente usar. Você não vai precisar de toda seção em toda story. Pense nisso como uma caixa de ferramentas, não um formulário.

Comece com a versão simples: Como [usuário / papel], eu quero [capacidade / ação], para que [resultado de negócio / motivo]. Exemplo da Índia, Pagamentos UPI: Como cliente, eu quero ver por que meu pagamento UPI falhou, para que eu saiba se devo tentar de novo, usar outra conta, ou contatar meu banco. Exemplo de Capital Markets, Trade Surveillance: Como Analista de Trade Surveillance, eu quero que os alertas mostrem a classificação de risco mais recente do cliente, para que eu possa priorizar casos de alto risco. As duas são válidas. Mas nenhuma está pronta para ser construída ainda.

Primeiro, olhe uma story ruim: Como usuário, eu quero informação de risco, para que eu possa usá-la. Ela segue o formato. Mas o que ela realmente nos diz? Qual usuário? Qual informação? Onde deveria aparecer? Quão recente ela precisa ser? O que acontece se ela estiver indisponível? Uma story pode parecer completa e ainda assim conter muita ambiguidade. Vamos consertar isso.

Contexto. Explique o que acontece hoje. UPI: clientes podem receber uma mensagem genérica quando um pagamento UPI falha e não entender o que deu errado. Trade Surveillance: analistas atualmente abrem outro sistema para checar a classificação de risco do cliente enquanto investigam um alerta.

Problema. Explique por que isso importa. UPI: clientes podem tentar de novo desnecessariamente ou contatar o suporte porque não sabem que ação tomar. Trade Surveillance: analistas gastam tempo extra trocando de sistema e podem perder informação de risco relevante. Contexto é o que acontece. Problema é por que a gente se importa.

Comportamento Esperado. Descreva o que deveria acontecer depois da mudança. UPI: quando um pagamento falha, mostre um motivo compreensível e, onde apropriado, orientação sobre o que fazer a seguir. Trade Surveillance: quando um analista abre um alerta, mostre a classificação de risco mais recente disponível do cliente junto com a informação do cliente. Note o que não escrevemos: chamar a API X usando o endpoint Y e popular a coluna Z. Isso pode ser parte da implementação. Mas primeiro descreva o comportamento. Não confunda a solução com o requisito.

Critérios de Aceitação. Agora torne o comportamento testável, usando Dado, Quando, Então. UPI, saldo insuficiente: dado que o cliente inicia um pagamento UPI, e a conta vinculada tem saldo insuficiente, quando a transação falha, então o cliente deveria ver um motivo claro. UPI, banco indisponível: dado que o banco está temporariamente indisponível, quando a transação não pode ser completada, então o cliente deveria ser informado e aconselhado a tentar de novo mais tarde. Trade Surveillance, risco disponível: dado que a informação de risco do cliente está disponível, quando o analista abre o alerta, então a classificação de risco mais recente deveria ser exibida. Trade Surveillance, risco indisponível: dado que a informação de risco do cliente não pode ser recuperada, quando o analista abre o alerta, então mostre informação de risco indisponível e não apresente uma classificação antiga como atual. Agora o QA sabe o que testar, o desenvolvimento sabe qual comportamento importa e o negócio pode desafiar a regra antes do código existir. Esse é o ponto.

Regras de Negócio. Algumas regras se aplicam a vários cenários. Mantenha-as visíveis. UPI: um pagamento com falha nunca deve aparecer como bem-sucedido; mensagens ao cliente deveriam usar linguagem compreensível, não códigos de erro internos. Trade Surveillance: só a classificação de risco ativa mais recente deveria ser mostrada; classificações expiradas não devem aparecer como atuais; se nenhuma classificação existir, deixe isso claro.

Requisitos de Dado. Se o comportamento depende de dado, torne o dado visível. Dado do Trade Surveillance: ID do Cliente vindo do alerta de surveillance, obrigatório, identifica o cliente. Classificação de risco vinda do sistema de risco, obrigatório, valor ativo mais recente. Data da classificação vinda do sistema de risco, obrigatório, determina se está desatualizada. Motivo do risco vindo do sistema de risco, opcional, escopo futuro. Você não precisa de um documento de mapeamento enorme para toda story. Mas pergunte: o que acontece se o dado estiver faltando, desatualizado, atrasado, duplicado ou inconsistente? Essa pergunta costuma expor requisitos importantes.

Dependências. Pergunte: o que precisa funcionar antes dessa story conseguir funcionar? UPI: a plataforma de pagamento retorna um status de falha significativo; status de falha são mapeados para mensagens amigáveis ao cliente; o app mobile suporta as respostas novas. Stories simples costumam travar aqui. Encontre dependências cedo.

Suposições. Escreva o que o time está atualmente tratando como verdade. Trade Surveillance: um cliente tem uma classificação de risco ativa; o sistema de risco é dono da classificação; usuários de surveillance conseguem visualizá-la. Suposições são perigosas quando todo mundo as tem, mas ninguém as escreve. E lembre: uma suposição não é uma decisão.

Fora de Escopo. Torne a fronteira visível. UPI, fora de escopo: mudanças de roteamento de pagamento, mudanças de processamento do lado do banco, tratamento de reembolso, falhas de pagamento com cartão. Escopo claro evita discussões depois.

Perguntas em Aberto. Não esconda perguntas não resolvidas em notas de reunião. Coloque-as na story. Trade Surveillance: o que acontece se o serviço de risco der timeout? Quão antiga a classificação pode ser antes de ficar desatualizada? Analistas deveriam ver o timestamp da classificação? Quem é dono da decisão sobre dado desatualizado? Uma pergunta em aberto é normal. Uma pergunta em aberto escondida não é.

Registro de Decisões. Quando uma pergunta importante é respondida, preserve isso. Exemplo: mostrar uma mensagem amigável ao cliente em vez do erro de pagamento bruto, de responsabilidade do Payments Product, porque clientes não deveriam precisar entender códigos bancários internos. Três semanas depois, alguém vai perguntar por que fizemos assim. Agora a resposta não está presa na memória de alguém.

Antes de mover para ready, pergunte: a gente sabe quem precisa disso, a gente entende por que, o comportamento esperado está claro, o QA consegue testar, as regras de negócio estão visíveis, a gente conhece os sistemas e dados relevantes, dependências e suposições estão visíveis, o fora-de-escopo está claro, perguntas em aberto estão visíveis, a gente sabe quem é dono das decisões-chave. Se várias respostas forem não, a story provavelmente não está pronta. E tudo bem. O objetivo não é fazer o Jira parecer completo. O objetivo é garantir que o time entenda o que está concordando em construir.

Não leia só o playbook. Use-o na sua próxima sessão de refinamento — um modelo copiar-colar, um checklist de prontidão de uma página e um pacote de exemplo completo, todos gratuitos para baixar abaixo.`;

export const modeloDeUserStoryParaBusinessAnalyst: Omit<Playbook, "readingTime"> = {
  slug: "modelo-de-user-story-para-business-analyst",
  title: "Modelo de User Story para Business Analyst",
  description:
    "Pare de encarar o ticket vazio do Jira. Uma caixa de ferramentas reutilizável para transformar um pedido vago numa user story que seu time consegue realmente construir, testar e desafiar.",
  summary:
    "Um modelo prático e copiar-colar de user story — Contexto, Regras de Negócio, Critérios de Aceitação, Requisitos de Dado, Dependências, Suposições e mais — trabalhado em dois exemplos completos, uma falha de pagamento UPI e um alerta de Trade Surveillance, mais um modelo, checklist de prontidão e pacote de exemplo completo gratuitos para baixar.",
  category: "Requirements",
  tags: ["Requisitos", "user-stories", "modelos"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Recém-formados e aspirantes a Business Analyst escrevendo sua primeira story baseada em modelo",
    "Business Analysts que querem uma estrutura reutilizável em vez de uma caixa vazia do Jira",
    "QAs e desenvolvedores que precisam de critérios de aceitação que consigam realmente testar",
    "Qualquer um tentando entender como requisitos reais funcionam dentro de times de tecnologia",
  ],
  bodyText,
  seoTitle: "Modelo de User Story para Business Analyst + Exemplos | BodhiProtocol",
  seoDescription:
    "Um modelo prático de user story para Business Analyst com critérios de aceitação, regras de negócio, requisitos de dado, dependências, exemplos e um checklist de prontidão gratuito.",
  closingHeading: [
    "Uma boa user story não é o requisito.",
    "É o recipiente para a conversa que transforma um requisito em algo construível.",
  ],
  closingBody:
    "Seu trabalho como BA não é preencher todo campo. É tornar a ambiguidade visível antes que ela vire código.",
  closingTemplate: `## User Story

**Como:**
[papel]

**Eu quero:**
[capacidade]

**Para que:**
[resultado de negócio]

## Contexto

[O que acontece hoje?]

## Problema

[Por que isso importa?]

## Comportamento Esperado

[O que deveria acontecer?]

## Critérios de Aceitação

### AC1

**Dado** [condição]
**Quando** [evento/ação]
**Então** [comportamento esperado]

## Regras de Negócio

* BR-01:
* BR-02:

## Requisitos de Dado

* Dado:
* Fonte:
* Validação:
* Comportamento em caso de falha:

## Dependências

*

## Suposições

*

## Fora de Escopo

*

## Perguntas em Aberto

*

## Decisões

* Decisão:
* Responsável:
* Motivo:`,
  closingTemplateName: "Modelo de User Story para BA",
  relatedPlaybookSlugs: [
    "como-escrever-sua-primeira-user-story",
    "a-story-foi-arrastada-por-quatro-sprints",
    "quem-e-o-dono-do-requisito",
  ],
  hacks: [
    {
      number: 1,
      title: "Contexto",
      insight: "Explique o que acontece hoje.",
      whyItHelps: "Responde a pergunta que um leitor sempre vai fazer primeiro: o que acontece hoje?",
    },
    {
      number: 2,
      title: "Problema",
      insight: "Explique por que isso importa.",
      whyItHelps: "Contexto é o que acontece. Problema é por que a gente se importa — as duas coisas não são a mesma frase.",
    },
    {
      number: 3,
      title: "Comportamento Esperado",
      insight: "Descreva o que deveria acontecer depois da mudança, não como construir isso.",
      whyItHelps: "Não confunda a solução com o requisito.",
    },
    {
      number: 4,
      title: "Critérios de Aceitação",
      insight: "Dado / Quando / Então torna o comportamento testável.",
      whyItHelps: "O QA sabe o que testar, o desenvolvimento sabe qual comportamento importa e o negócio pode desafiar a regra antes do código existir.",
    },
    {
      number: 5,
      title: "Regras de Negócio",
      insight: "Algumas regras se aplicam a vários cenários — mantenha-as visíveis.",
      whyItHelps: "Uma regra de negócio e um critério de aceitação não são a mesma frase.",
    },
    {
      number: 6,
      title: "Requisitos de Dado",
      insight: "Se o comportamento depende de dado, torne o dado visível.",
      whyItHelps: "Perguntar o que acontece se o dado estiver faltando, desatualizado, atrasado, duplicado ou inconsistente costuma expor requisitos reais.",
    },
    {
      number: 7,
      title: "Dependências",
      insight: "O que precisa funcionar antes dessa story conseguir funcionar?",
      whyItHelps: "Stories simples costumam travar aqui — encontre dependências cedo, não durante a entrega.",
    },
    {
      number: 8,
      title: "Suposições",
      insight: "Escreva o que o time está atualmente tratando como verdade.",
      whyItHelps: "Uma suposição não é uma decisão — escrevê-la é o que a torna desafiável.",
    },
    {
      number: 9,
      title: "Fora de Escopo",
      insight: "Torne a fronteira visível.",
      whyItHelps: "Escopo claro evita discussões depois.",
    },
    {
      number: 10,
      title: "Perguntas em Aberto",
      insight: "Não esconda perguntas não resolvidas em notas de reunião — coloque-as na story.",
      whyItHelps: "Uma pergunta em aberto é normal. Uma pergunta em aberto escondida não é.",
    },
    {
      number: 11,
      title: "Registro de Decisões",
      insight: "Quando uma pergunta importante é respondida, preserve isso.",
      whyItHelps: "Três semanas depois, a resposta para \"por que fizemos assim?\" não fica presa na memória de alguém.",
    },
  ],
};
