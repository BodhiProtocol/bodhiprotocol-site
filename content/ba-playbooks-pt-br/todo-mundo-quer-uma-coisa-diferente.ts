import type { Playbook } from "@/types/content";

const stakeholderAlignmentSheet = `FICHA DE ALINHAMENTO E TROCAS ENTRE STAKEHOLDERS

1. RESULTADO
Que problema ou resultado de negócio estamos tentando resolver?

2. NECESSIDADES
Para cada stakeholder — o que ele está realmente tentando alcançar ou proteger?

3. CONFLITO
Onde essas necessidades realmente colidem? Não confunda palavras diferentes com um conflito real.

4. RESTRIÇÕES
Inegociáveis: regulação, política interna, segurança, orçamento, arquitetura, dados, prazo, capacidade.

5. PRIORIDADES
Ordene indispensáveis e resultados de negócio. O que acontece se cada necessidade não for atendida?

6. OPÇÕES / TROCAS
Opção A —
  Valor:
  Custo / risco:
  Encaixe com as restrições:

Opção B —
  Valor:
  Custo / risco:
  Encaixe com as restrições:

Opção C —
  Valor:
  Custo / risco:
  Encaixe com as restrições:

7. DECISÃO
Opção escolhida:
Responsável pela decisão:
Por que essa opção:

8. TORNE CONSTRUÍVEL
Traduza a decisão em regras, papéis, limites, exceções, dados, necessidades de auditoria e critérios de aceitação.

ANTES DE ENCERRAR A REUNIÃO
[ ] O problema de fundo está claro
[ ] As necessidades estão separadas das soluções propostas
[ ] Conflitos e restrições estão explícitos
[ ] Prioridades e trocas estão entendidas
[ ] O responsável pela decisão está claro
[ ] A decisão está traduzida em requisitos testáveis
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/todo-mundo-quer-uma-coisa-diferente-body.tsx
// (renderizada via o registro customPlaybookBodies, não a partir de `hacks`).
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Você está numa reunião de requisitos. O Comercial diz que a gente precisa de mais flexibilidade. A Operação diz que a gente precisa de controles mais rígidos. O Compliance diz que a gente precisa de menos exceções. A Tecnologia finalmente pergunta: será que alguém pode simplesmente dizer o que a gente vai construir? Todo mundo olha para o BA. Essa não é necessariamente uma reunião ruim — pode simplesmente significar que cada stakeholder está protegendo uma coisa diferente. O trabalho não é encontrar a frase que todo mundo desgosta igualmente. É descobrir que resultado estamos tentando alcançar, quais restrições são reais e quais trocas estamos dispostos a fazer.

Imagine uma empresa de e-commerce mudando seu processo de reembolso. O Comercial quer que os agentes aprovem reembolsos rapidamente. A Operação quer controles porque erros de reembolso saem caro. O Risco quer que reembolsos grandes sejam revisados. A Tecnologia quer um fluxo único e claro. "Deixar os reembolsos flexíveis", "exigir aprovação", "reduzir exceções" — nenhuma dessas é o requisito. São posições de stakeholders. O requisito de verdade está por baixo delas.

ESCUTE. Pergunte ao Comercial que problema mais flexibilidade resolveria — talvez clientes esperem dois dias por reembolsos simples. Pergunte à Operação de que risco os controles estão protegendo — talvez os agentes às vezes reembolsem o valor errado. Pergunte ao Risco quais reembolsos realmente precisam de revisão — talvez só os acima de um certo valor. A discordância fica mais precisa. O Comercial talvez não queira ficar totalmente sem controles. A Operação talvez não queira aprovação em tudo. Eram posições; as necessidades por baixo podem ser compatíveis.

SEPARE. Stakeholders costumam descrever soluções como requisitos — "adiciona uma tela de aprovação", "dá um botão de override para os gestores", "deixa tudo automático". Antes de aceitar a solução, pergunte que problema ela resolveria. "Tela de aprovação" pode realmente significar que reembolsos de alto valor precisam de revisão independente. "Botão de override" pode significar que casos urgentes precisam de um caminho de exceção. "Automatizar tudo" pode significar que reembolsos de baixo risco não deveriam esperar por revisão manual. Agora você desenha em torno da necessidade, não da primeira solução que alguém sugeriu.

CONFLITO. Escreva as necessidades claramente — o Comercial quer menos espera, a Operação quer menos erros, o Risco quer exposição controlada, a Tecnologia quer um fluxo sustentável — depois pergunte onde elas realmente colidem. Muitas vezes todo mundo concorda que reembolsos pequenos deveriam ser rápidos, e a discordância só existe acima de um limite. Uma discussão de quatro lados vira uma decisão só. Isso é trabalho de BA.

RESTRIÇÕES. Algumas preferências são flexíveis; algumas restrições não são. Procure por regulação, política interna, compromissos contratuais, segurança, orçamento, arquitetura, disponibilidade de dados, datas de entrega, capacidade operacional. "Reembolsos acima de um limite exigem aprovação independente por causa de política da empresa" é diferente de "a gente prefere que os gestores aprovem". Deixe as restrições explícitas, ou os times vão discutir opções que nunca foram viáveis.

PRIORIZE. Quando tudo é crítico, nada é. Pergunte o que é indispensável, o que cria mais valor, o que evita o maior risco, o que pode esperar, o que acontece se a gente não fizer isso. Ordene os resultados em vez da hierarquia dos stakeholders, para que as decisões de design tenham algo para se ancorar.

TROCAS. Não pergunte qual opção as pessoas preferem — mostre as consequências. Aprovação para todo reembolso dá o controle mais forte, mas um processo mais lento e pesado. Sem aprovação é o mais rápido, mas aumenta a exposição a erro e fraude. Aprovação baseada em risco — automática abaixo de um limite baixo, aprovação do agente na faixa do meio, revisão do gestor acima de um limite alto — compra velocidade onde o risco é baixo e controle onde o risco é alto. Agora o time não está discutindo opiniões. Está escolhendo uma troca.

DECIDA. Uma armadilha comum do BA é tentar deixar todo mundo completamente feliz — às vezes isso não é possível. O objetivo não é todo mundo ganhar tudo; é a decisão certa, tomada com as trocas entendidas. Se os stakeholders não conseguem concordar, identifique o responsável pela decisão e apresente problema, opções, restrições, impacto, recomendação — depois consiga uma decisão. Consenso é útil. Decisão é essencial.

DOCUMENTE. Transforme a decisão em comportamento preciso e testável — limites, papéis, exceções, comportamento de erro, requisitos de auditoria, notificações, relatórios, critérios de aceitação. Não mande "por favor revise os requisitos". Mande "concordamos em aprovação baseada em risco — por favor confirme esses limites, papéis e regras de exceção". Confirmação específica gera feedback melhor.

Se o stakeholder mais sênior simplesmente sobrepõe o grupo, isso não remove a necessidade de mostrar as consequências — documente o impacto da escolha dele para que ele consiga ver o que está escolhendo. E muitas vezes todo mundo está certo ao mesmo tempo: o Comercial está certo sobre experiência do cliente, a Operação sobre controle, o Risco sobre exposição, a Tecnologia sobre complexidade. A resposta não é escolher um vencedor — são limites, fluxos diferentes, permissões, exceções, entrega faseada, regras configuráveis. Necessidades conflitantes às vezes precisam de um design melhor, não de compromisso.

Armadilhas comuns: escolher um lado e virar mensageiro em vez de analista; pular direto para uma solução proposta e resolver o problema errado; concordar com tudo até o produto ficar caro e contraditório; ignorar suposições que ninguém disse em voz alta; perseguir consenso para sempre porque ninguém nomeou um responsável pela decisão; e esquecer de documentar a troca, então três meses depois ninguém lembra por que a decisão foi tomada.

A discordância entre stakeholders costuma ser onde o requisito de verdade está escondido. Quando o Comercial pede flexibilidade, a Operação pede controle e o Risco pede menos exceções, não vá direto pro meio-termo. Pergunte o que cada pessoa está tentando proteger. Exponha o conflito real. Deixe as restrições visíveis. Mostre as trocas. Consiga a decisão. O trabalho do BA não é encontrar o meio-termo — é encontrar o requisito que melhor serve o resultado dentro das restrições reais. Um bom BA não faz todo mundo concordar. Um bom BA garante que todo mundo entenda o que foi decidido e por quê.`;

export const todoMundoQuerUmaCoisaDiferente: Omit<Playbook, "readingTime"> = {
  slug: "todo-mundo-quer-uma-coisa-diferente",
  title: "Todo Mundo Quer uma Coisa Diferente. Qual É o Requisito de Verdade?",
  description:
    "Quatro stakeholders, quatro respostas, um time esperando para construir. Não busque o meio-termo — encontre o requisito por baixo das posições.",
  summary:
    "Um exemplo de processo de reembolso percorrendo o playbook de oito passos — Escute, Separe, Conflito, Restrições, Priorize, Trocas, Decida, Documente — para transformar os pedidos concorrentes de Comercial, Operação, Risco e Tecnologia numa única decisão construível.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Requisitos", "Trocas"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Passo",
  audience: [
    "Business Analysts numa sala onde cada stakeholder quer uma coisa diferente",
    "BAs tentados a tirar a média de quatro posições e virar um requisito diluído",
    "Líderes de entrega que precisam de uma decisão, não de mais uma rodada perseguindo consenso",
    "Qualquer um que já ouviu quatro respostas diferentes para \"o que estamos construindo?\" na mesma reunião",
  ],
  bodyText,
  seoTitle: "Todo Mundo Quer uma Coisa Diferente — Um Playbook de Alinhamento de Stakeholders",
  seoDescription:
    "Um guia prático de BA para pedidos conflitantes de stakeholders — como separar posições de necessidades, expor o conflito real, deixar restrições explícitas, mostrar trocas e conseguir uma decisão tomada e documentada.",
  closingHeading: [
    "Um bom BA não faz todo mundo concordar.",
    "Um bom BA garante que todo mundo entenda o que foi decidido — e por quê.",
  ],
  closingBody:
    "Da próxima vez que quatro stakeholders quiserem quatro coisas diferentes, não procure a frase que todo mundo desgosta igualmente. Pergunte o que cada um está protegendo, exponha onde as necessidades realmente colidem, deixe as restrições explícitas, mostre as trocas — depois consiga a decisão tomada e registrada.",
  closingTemplate: stakeholderAlignmentSheet,
  closingTemplateName: "Ficha de Alinhamento e Trocas entre Stakeholders",
  hacks: [
    {
      number: 1,
      title: "ESCUTE — o que cada stakeholder está realmente protegendo?",
      insight: "\"Mais flexibilidade\", \"controles mais rígidos\" e \"menos exceções\" são posições, não requisitos.",
      explanation:
        "Pergunte ao Comercial que problema mais flexibilidade resolveria, pergunte à Operação de que risco os controles estão protegendo, pergunte ao Risco quais casos realmente precisam de revisão. A discordância fica mais precisa — e as necessidades por baixo costumam ser compatíveis mesmo quando as posições soam opostas.",
      whyItHelps: "Você não consegue reconciliar quatro posições. Você costuma conseguir reconciliar quatro necessidades, uma vez que sabe quais são de verdade.",
    },
    {
      number: 2,
      title: "SEPARE — necessidade ou solução proposta?",
      insight: "Stakeholders descrevem soluções como requisitos: \"adiciona uma tela de aprovação\", \"dá um botão de override para os gestores\".",
      explanation:
        "Antes de aceitar a solução, pergunte que problema ela resolveria. \"Tela de aprovação\" pode significar que casos de alto valor precisam de revisão independente. \"Botão de override\" pode significar que casos urgentes precisam de um caminho de exceção.",
      whyItHelps: "Desenhe em torno da necessidade, não da primeira solução que alguém sugeriu na reunião.",
    },
    {
      number: 3,
      title: "CONFLITO — onde as necessidades realmente colidem?",
      insight: "Escreva a necessidade de cada stakeholder claramente, depois pergunte onde elas realmente conflitam.",
      explanation:
        "Muitas vezes todo mundo concorda com os 80% fáceis — reembolsos pequenos deveriam ser rápidos, casos de baixo risco não deveriam esperar. A discordância real só existe acima de um limite ou num cenário específico.",
      whyItHelps: "Uma discussão de quatro lados geralmente colapsa numa decisão estreita assim que o conflito falso é removido.",
    },
    {
      number: 4,
      title: "RESTRIÇÕES — o que não pode ser negociado?",
      insight: "Algumas preferências são flexíveis. Algumas restrições não são — e as duas acabam sendo discutidas como se fossem iguais.",
      list: [
        "Regulação e política interna",
        "Compromissos contratuais e segurança",
        "Orçamento e arquitetura",
        "Disponibilidade de dados e datas de entrega",
        "Capacidade operacional",
      ],
      whyItHelps: "\"A política da empresa exige\" e \"eu prefiro que seja assim\" são frases diferentes. Nomear qual é qual impede os times de discutir opções que nunca foram viáveis.",
    },
    {
      number: 5,
      title: "PRIORIZE — o que importa mais?",
      insight: "Quando tudo é crítico, nada é.",
      explanation:
        "Pergunte o que é indispensável, o que cria mais valor de negócio, o que evita o maior risco, o que pode esperar e o que acontece se não for feito de jeito nenhum. Ordene os resultados em vez da hierarquia dos stakeholders.",
      whyItHelps: "Uma lista ordenada dá a cada decisão de design seguinte algo concreto para se ancorar.",
    },
    {
      number: 6,
      title: "TROCAS — mostre o que cada opção ganha e custa",
      insight: "Não pergunte qual opção as pessoas preferem. Mostre as consequências de cada uma.",
      compare: {
        leftLabel: "Aprovação para todo reembolso",
        left: "Controle mais forte. Experiência do cliente mais lenta, mais trabalho operacional.",
        rightLabel: "Aprovação baseada em risco",
        right: "Automática abaixo de um limite baixo, aprovação do agente no meio, revisão do gestor acima de um limite alto — velocidade onde o risco é baixo, controle onde o risco é alto.",
      },
      whyItHelps: "Uma vez que as consequências estão na mesa, o time está escolhendo uma troca, não discutindo gosto.",
    },
    {
      number: 7,
      title: "DECIDA — não persiga o consenso perfeito",
      insight: "O objetivo não é todo mundo ganhar tudo. É a decisão certa, tomada com as trocas entendidas.",
      explanation:
        "Se os stakeholders não conseguem concordar, identifique o responsável pela decisão e apresente problema, opções, restrições, impacto, recomendação — depois consiga uma decisão. Consenso é útil. Decisão é essencial.",
      whyItHelps: "Uma reunião sem um responsável nomeado só vira a reunião da semana que vem, com as mesmas quatro posições.",
    },
    {
      number: 8,
      title: "DOCUMENTE — transforme a decisão em comportamento construível",
      insight: "\"Por favor revise os requisitos\" gera feedback vago. Confirmação específica gera feedback útil.",
      explanation:
        "Defina limites, papéis, exceções, comportamento de erro, requisitos de auditoria, notificações, relatórios e critérios de aceitação — depois mande \"concordamos em aprovação baseada em risco, por favor confirme esses limites, papéis e regras de exceção\".",
      whyItHelps: "Três meses depois, alguém vai perguntar por que isso foi decidido. A troca documentada é a única coisa que ainda responde essa pergunta.",
    },
  ],
};
