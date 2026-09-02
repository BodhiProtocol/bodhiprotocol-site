import type { Playbook } from "@/types/content";

const decisionChecklist = `MUDANÇA DE REQUISITO DE ÚLTIMA HORA
Checklist de Decisão de Release

1. PAUSE
[ ] Disse "vamos avaliar o impacto antes de comprometer isso na release"
[ ] Não atualizou o Jira nem prometeu nada antes disso

2. ENTENDA A MUDANÇA
[ ] Escopo: quem/o que é afetado, o que exatamente mudou
[ ] Comportamento: sucesso, falha, retry e comportamento de exceção
[ ] Momento: por que agora, é obrigatório para essa release
[ ] Risco: o que acontece se não incluirmos

3. IMPACTO RÁPIDO
[ ] Rastreou Requisito -> UI -> API -> Dados -> Regras -> Integrações -> Testes -> Operações
[ ] A Engenharia confirmou o que muda
[ ] O QA confirmou o que precisa ser reexecutado
[ ] A Operação confirmou o que muda amanhã
[ ] O Produto confirmou o que acontece se adiado
[ ] Risco/Compliance confirmou se é opcional ou obrigatório

4. VERIFIQUE O TEMPO ATÉ ESTAR PRONTO PARA RELEASE
[ ] Perguntou "quanto tempo até estar pronto para release", não só "quanto tempo para codificar"
[ ] A estimativa inclui revisão, build, deploy, teste de integração, regressão e aprovação final

5. APRESENTE OPÇÕES
[ ] Absorver — o impacto é pequeno, entendido e totalmente testável
[ ] Trocar escopo — o tempo é fixo, trocou escopo em vez de inventar capacidade
[ ] Feature flag / config — a arquitetura já suporta habilitação controlada
[ ] Adiar — a estabilidade da release importa mais do que apressar a mudança
[ ] Não incluir — implementação/teste seguros não podem ser demonstrados a tempo

6. DEIXE A RESPONSABILIDADE EXPLÍCITA
[ ] Quem decide estava na mesma conversa, trabalhando com os mesmos fatos
[ ] O responsável de negócio/release tomou a decisão final de ir ou não ir

7. ANTES DO SINAL VERDE
[ ] Requisito + critérios de aceitação atualizados
[ ] Build final gerado
[ ] Testes impactados atualizados + executados
[ ] Defeitos críticos/altos resolvidos ou explicitamente aceitos
[ ] Sistemas/dados downstream verificados
[ ] Operações + Suporte informados
[ ] Rollback/recuperação entendido
[ ] Negócio/Produto aceita a decisão de release
[ ] Responsável pela decisão + qualquer exceção de risco registrados

Registro da decisão: motivo -> impacto -> responsável -> resultado
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/a-release-e-amanha-o-requisito-mudou-hoje-body.tsx,
// renderizada via o registro customPlaybookBodies, não a partir de `hacks`.
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Amanhã é dia de release. O build está pronto. O QA terminou os testes. As release notes estão sendo preparadas. Aí, às 16h37: "precisamos de uma pequena mudança de requisito antes de amanhã." Todo mundo olha para o BA. Você diz sim? Não? Adia a release? Nenhuma dessas deveria ser sua primeira reação. Pause. Entenda a mudança. Deixe o risco visível. Porque quando a release é amanhã, você não está mais gerenciando só um requisito. Você está gerenciando uma decisão de release.

Imagine um fluxo de checkout de e-commerce programado para ir ao ar amanhã. O requisito aprovado diz que clientes novos podem fazer um pedido depois da verificação de e-mail e celular. Hoje, o negócio adiciona: "a gente também precisa de verificação de endereço para todo cliente novo." Parece pequeno. Mas o desenvolvimento e a regressão já terminaram, e a Operação está pronta. Essa mudança "pequena" pode tocar UI, API, dado do cliente, serviço de verificação, tratamento de erro, testes e suporte. O calendário diz um dia. O sistema não liga para isso.

Alguém pergunta: "você consegue atualizar rapidinho os critérios de aceitação?" Não. Ainda não. Atualizar o Jira não torna o sistema seguro para liberar. Primeiro pergunte o que mudou, o que isso toca e o que acontece se a gente errar.

Pause. Não se comprometa sob pressão. Uma resposta útil é: "vamos avaliar rapidamente o impacto antes de comprometer isso na release de amanhã." Isso não é resistência. É entrega responsável. A urgência deveria aumentar a disciplina, não removê-la.

Entenda o que realmente mudou. "Adicionar verificação de endereço" não basta. Esclareça quais clientes e endereços, em que ponto do checkout, o que acontece se a verificação falhar, se o cliente pode tentar de novo, se revisão manual é permitida, se é obrigatório para amanhã e por que isso foi introduzido agora. Uma frase vaga pode esconder várias decisões de negócio. Amanhã é um péssimo dia para descobri-las.

Impacto rápido: rastreie o caminho útil mais curto do requisito pela UI, API, dados, regras, integrações, testes e operações. Pergunte à engenharia quais componentes mudam, ao QA quais cenários precisam ser reexecutados, à operação se o processo de amanhã muda, ao produto o que acontece se deixarmos de fora e ao risco/compliance se é opcional ou obrigatório. Rápido não significa descuidado. Significa focado.

Verifique o tempo até estar pronto para release. "A gente codifica isso em duas horas" não é o mesmo que "a gente consegue liberar isso com segurança em duas horas." Uma mudança pode precisar de desenvolvimento, revisão, build, deploy, teste de integração, regressão e aprovação final. Pergunte quanto tempo até isso estar pronto para release, não só codificado. Uma mudança de código de duas horas pode virar uma mudança de release de oito horas.

Apresente opções em vez de forçar uma decisão binária. Absorva quando o impacto for pequeno, a implementação for entendida, os testes puderem terminar e o risco for aceitável. Troque escopo quando a mudança importa, mas o tempo é fixo — troque escopo em vez de fingir que capacidade apareceu do nada. Use feature flag ou configuração quando a arquitetura já suporta habilitação controlada. Adie para a próxima release quando a estabilidade importa mais do que apressar. Não inclua quando o tempo não sustenta implementação e teste seguros — isso é uma recomendação baseada em risco, não uma rejeição.

Comunique: reúna quem decide. Essa não é uma decisão só do BA. Reúna prioridade de negócio, impacto técnico, risco de qualidade, impacto de release e impacto operacional. O trabalho do BA é garantir que todo mundo esteja decidindo a partir dos mesmos fatos. O BA informa a decisão. O responsável de negócio/release toma a decisão final de ir ou não ir.

Decida e deixe a decisão explícita. Registre motivo, impacto, responsável e resultado. "O negócio disse que era urgente" não é um registro de decisão.

Antes do sinal verde, verifique se o requisito e os critérios de aceitação estão atualizados, o build final foi gerado, os testes impactados foram atualizados e executados, defeitos críticos/altos estão resolvidos ou explicitamente aceitos, sistemas e dados downstream foram verificados, operações e suporte sabem o que mudou, o rollback está entendido, negócio/produto aceita a decisão e o responsável pela decisão e qualquer exceção de risco estão registrados. Se você não consegue explicar a mudança, o impacto e a decisão com clareza, provavelmente você não está pronto para liberar.

Se o Compliance disser que uma mudança é obrigatória, a restrição muda, mas a necessidade de análise de impacto não muda — as opções viram corrigir e testar, atrasar a release ou desabilitar a funcionalidade afetada, nunca pular os testes porque é urgente. Se o CEO perguntar, o processo continua o mesmo — hierarquia muda prioridade, não muda física. O código ainda precisa funcionar, as integrações ainda precisam se comportar, os testes ainda precisam passar.

Mudanças de última hora vão acontecer. O objetivo não é eliminá-las. É impedir que a urgência vire caos. Quanto mais perto da release, mais caras ficam as suposições. Não entre em pânico. Não diga não de cara. E não fique atualizando o Jira em silêncio. Entenda a mudança. Exponha o risco. Dê opções ao time. Deixe a decisão visível. Um bom BA não impede a mudança. Um bom BA ajuda o time a mudar com segurança.`;

export const releaseEAmanhaORequisitoMudouHoje: Omit<Playbook, "readingTime"> = {
  slug: "a-release-e-amanha-o-requisito-mudou-hoje",
  title: "A Release É Amanhã. O Requisito Mudou Hoje.",
  description:
    "Um guia prático de BA para o momento em que alguém pede \"uma mudancinha\" um dia antes da release — como pausar, dimensionar o impacto e trazer uma decisão real em vez de um sim ou não.",
  summary:
    "Um cenário real de dia de release — um fluxo de checkout a um dia da release e um pedido tardio para adicionar verificação de endereço — mostrando como pausar, entender a mudança, rastrear o impacto rápido, verificar o tempo real até estar pronto para release, apresentar opções em vez de um sim ou não e deixar a decisão de ir ou não ir explícita.",
  category: "Business Analysis",
  tags: ["Gestão de Release", "Análise de Impacto", "Controle de Mudança", "Risco"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Passo",
  bodyText,
  audience: [
    "Business Analysts chamados a absorver uma mudança de requisito bem antes da release",
    "Líderes de entrega e release managers pesando uma decisão tardia de ir ou não ir",
    "Product Owners e líderes de QA sob pressão de dia de release",
    "Qualquer um que já ouviu \"dá pra encaixar isso\" um dia antes do go-live",
  ],
  seoTitle: "A Release É Amanhã. O Requisito Mudou Hoje. — Guia de BA",
  seoDescription:
    "Um framework prático de Business Analyst para mudanças de requisito de última hora antes de uma release: pause, entenda, avalie o impacto rápido, verifique o tempo real até estar pronto, apresente opções e deixe a decisão explícita.",
  closingHeading: ["Um bom BA não impede a mudança.", "Um bom BA ajuda o time a mudar com segurança."],
  closingBody:
    "Quanto mais perto da release, mais caras ficam as suposições. Pause, deixe o risco visível, apresente opções reais e deixe o responsável tomar a decisão.",
  closingTemplate: decisionChecklist,
  closingTemplateName: "Mudança de Requisito de Última Hora — Checklist de Decisão de Release",
  hacks: [
    {
      number: 1,
      title: "Pause",
      insight: "Não se comprometa imediatamente.",
      explanation:
        "Diga \"vamos avaliar o impacto antes de comprometer isso na release\" em vez de prometer qualquer coisa às 16h37.",
      whyItHelps: "A urgência deveria aumentar a disciplina, não removê-la — atualizar o Jira não torna o sistema seguro para liberar.",
    },
    {
      number: 2,
      title: "Entenda",
      insight: "O que mudou e por que agora?",
      explanation:
        "Esclareça escopo, comportamento, momento e risco. \"Adicionar verificação de endereço\" não basta — uma frase vaga pode esconder várias decisões de negócio.",
      whyItHelps: "Amanhã é um péssimo dia para descobrir uma decisão escondida que você nem sabia que estava tomando.",
    },
    {
      number: 3,
      title: "Impacto rápido",
      insight: "Quais sistemas, dados, testes e times são afetados?",
      explanation:
        "Rastreie o caminho útil mais curto: requisito pela UI, API, dados, regras, integrações, testes e operações.",
      whyItHelps: "Rápido não significa descuidado — significa focado nas pessoas mais perto do impacto.",
    },
    {
      number: 4,
      title: "Realidade do esforço",
      insight: "Quanto tempo até estar pronto para release, não só codificado?",
      explanation:
        "Uma estimativa pronta para release inclui revisão, build, deploy, teste de integração, regressão e aprovação final.",
      whyItHelps: "Uma mudança de código de duas horas pode virar uma mudança de release de oito horas quando você conta o caminho inteiro.",
    },
    {
      number: 5,
      title: "Opções",
      insight: "Absorver, trocar escopo, feature flag, adiar ou não incluir.",
      explanation:
        "Traga alternativas em vez de forçar uma decisão binária, cada uma com uma condição clara de \"use quando se aplica\".",
      whyItHelps: "Um menu de opções transforma uma decisão de pânico numa troca ponderada que o time consegue sustentar.",
    },
    {
      number: 6,
      title: "Comunique",
      insight: "Coloque quem decide na mesma conversa.",
      explanation:
        "Essa não é uma decisão só do BA — reúna prioridade de negócio, impacto técnico, risco de qualidade e impacto operacional.",
      whyItHelps: "O BA informa a decisão; todo mundo decidindo a partir dos mesmos fatos evita uma decisão tomada com informação parcial.",
    },
    {
      number: 7,
      title: "Decida",
      insight: "Registre o impacto, o responsável e o resultado.",
      explanation:
        "\"O negócio disse que era urgente\" não é um registro de decisão — motivo, impacto, responsável e resultado é.",
      whyItHelps: "Um registro de decisão explícito é o que permite ao time explicar, meses depois, por que essa mudança entrou (ou não).",
    },
  ],
};
