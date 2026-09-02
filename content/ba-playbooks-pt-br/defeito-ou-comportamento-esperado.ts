import type { Playbook } from "@/types/content";

const decisionSheet = `DEFEITO vs COMPORTAMENTO ESPERADO — FICHA DE DECISÃO
Classifique com evidência, não opinião.

TABELA DE EVIDÊNCIA RÁPIDA
Necessidade de negócio: ______________________________
Requisito / CA diz: ______________________________
O sistema realmente faz: ______________________________
Classificação: Defeito / Esperado / Lacuna / Config-Dado / Mudança
Decisão + responsável: ______________________________

ANTES DE FECHAR
[ ] O cenário está preciso.
[ ] A evidência de requisito/CA foi checada.
[ ] O resultado de negócio está entendido.
[ ] A classificação é baseada em evidência.
[ ] O responsável pela decisão está claro.
[ ] A story/CA/defeito/config relevante foi atualizada.

REGRA DE OURO
Não escolha lados. Compare intenção, evidência e resultado.
O objetivo não é vencer a discussão. É deixar o comportamento esperado inequívoco.
`;

export const defeitoOuComportamentoEsperado: Omit<Playbook, "readingTime"> = {
  slug: "defeito-ou-comportamento-esperado",
  title: "O Negócio Diz Que É Defeito. A Tecnologia Diz Que É Comportamento Esperado.",
  description: "Os dois lados podem estar falando a verdade. Veja como descobrir qual.",
  summary:
    "Um método passo a passo para a discussão em que todo BA se vê no meio — o Negócio chamando algo de defeito enquanto a Tecnologia chama de comportamento esperado — trabalhado a partir de um cenário de retroatividade de seguros e um cenário de cancelamento de e-commerce.",
  category: "Requirements",
  tags: ["Requisitos", "Critérios de Aceitação", "Defeitos"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Passo",
  intro: [
    "Um usuário tenta retroagir um sinistro de seguro em dez dias. O sistema rejeita. O Negócio diz: \"Defeito. A gente precisa retroagir sinistros.\" A Tecnologia diz: \"Comportamento esperado. O sistema rejeita datas com mais de sete dias.\" Agora o BA está no meio. É um defeito? Comportamento esperado? Ou cada um construiu uma expectativa diferente?",
    "O trabalho do BA não é escolher um lado. É responder uma pergunta melhor: o que o sistema deveria realmente fazer? Talvez o requisito realmente diga sete dias. Talvez o processo de negócio tenha mudado depois de ele ser escrito. Talvez os critérios de aceitação nunca tenham coberto esse cenário. Talvez sete dias seja uma configuração que ninguém explicou. Então não comece com \"quem está certo?\" Comece com \"o que foi pretendido, o que foi construído e o que o negócio precisa agora?\"",
    "Essa pergunta se divide em oito passos: escute a dor do negócio, recrie o cenário exato, verifique o requisito, verifique os critérios de aceitação, compare as três visões lado a lado, classifique que tipo de problema isso realmente é, pergunte se a necessidade de negócio mudou desde então, depois decida e documente para que a mesma discussão não volte na próxima sprint.",
  ],
  audience: [
    "Business Analysts presos entre \"isso é um defeito\" e \"isso é comportamento esperado\"",
    "BAs que querem um jeito repetível de classificar um comportamento de sistema em disputa",
    "QA e desenvolvedores decidindo se algo é um bug ou uma especificação",
    "Líderes de entrega que querem discordâncias resolvidas com evidência, não opinião",
  ],
  seoTitle: "Defeito vs Comportamento Esperado: Um Framework de Decisão para BAs | BodhiProtocol",
  seoDescription:
    "Um framework prático de BA para classificar comportamento de sistema em disputa como defeito, comportamento esperado, lacuna de requisito ou problema de configuração.",
  closingHeading: [
    "\"Defeito\" não significa que o negócio não gostou do resultado.",
    "Um bom BA deixa o comportamento esperado claro o suficiente para a discussão desaparecer.",
  ],
  closingBody:
    "Às vezes o sistema está errado. Às vezes a expectativa está errada. Às vezes o requisito está incompleto. Às vezes a necessidade de negócio mudou. O trabalho do BA é separar essas possibilidades — não escolha lados, compare intenção, evidência e resultado.",
  closingTemplate: decisionSheet,
  closingTemplateName: "Ficha de Decisão Defeito vs Comportamento Esperado",
  hacks: [
    {
      number: 1,
      title: "ESCUTAR — Entenda a dor do negócio",
      insight: "\"O sistema não permite retroatividade\" descreve comportamento. \"A Operação não consegue processar sinistros tardios legítimos\" descreve o problema de negócio.",
      list: [
        "O que você estava tentando alcançar?",
        "O que aconteceu no lugar disso?",
        "Que impacto isso cria?",
        "Existe um workaround?",
        "Com que frequência isso acontece?",
        "Quem é afetado?",
      ],
      whyItHelps: "Abrir o Jira antes de entender o problema de negócio significa que você está prestes a investigar a coisa errada com precisão.",
    },
    {
      number: 2,
      title: "RECRIAR — Veja o comportamento você mesmo",
      insight: "Não discuta um defeito que você não consegue descrever com precisão.",
      explanation: "Pegue o cenário exato. Data do sinistro: 1º de agosto. Data de entrada: 11 de agosto. O negócio espera: sinistro aceito. Real: \"A data do sinistro não pode ser mais de 7 dias no passado.\" Agora você tem algo testável.",
      list: ["Capture: usuário", "dado", "passos", "esperado", "real"],
      whyItHelps: "Um cenário preciso e reproduzível é o que transforma uma discussão de corredor numa investigação que todo mundo consegue checar.",
    },
    {
      number: 3,
      title: "REQUISITO — O que foi realmente pedido?",
      insight: "A Tecnologia pode ter construído o requisito exatamente como escrito — mas isso não é o fim da investigação.",
      list: ["requisito", "user story", "regras de negócio", "fluxo de processo", "design", "registro de decisão", "histórico de mudanças", "política relevante"],
      explanation: "Suponha que o requisito diga que sinistros podem ser retroagidos por no máximo sete dias corridos. A Tecnologia pode ter implementado isso corretamente, então o comportamento atual pode não ser um defeito de software. Mas o requisito em si ainda pode estar incompleto, desatualizado ou não servir mais à necessidade de negócio.",
      whyItHelps: "Verificar o requisito antes de discutir sobre o comportamento impede que os dois lados discutam de memória em vez de evidência.",
    },
    {
      number: 4,
      title: "ACEITAÇÃO — Que resultado nós concordamos?",
      insight: "Requisitos descrevem intenção. Critérios de aceitação tornam o comportamento testável.",
      list: ["fronteiras", "exceções", "casos negativos", "papéis", "mensagens de erro", "fluxos alternativos"],
      compare: {
        leftLabel: "Critério de aceitação claro",
        left: "\"Dado um sinistro com data anterior a sete dias, quando o usuário envia, então o sistema impede o envio.\" — o comportamento é claramente intencional.",
        rightLabel: "Critério de aceitação ambíguo",
        right: "\"Sinistros podem ser criados com uma data passada.\" Sete dias? Trinta? Qualquer data passada? Isso não é um defeito de código — é uma lacuna de requisito.",
      },
      whyItHelps: "O CA te diz se o cenário em disputa foi realmente decidido algum dia ou só presumido.",
    },
    {
      number: 5,
      title: "COMPARAR — Necessidade de negócio vs requisito vs comportamento",
      insight: "Coloque as três visões lado a lado e a conversa fica útil.",
      list: [
        "Necessidade de negócio — Sinistros tardios legítimos precisam ser processados.",
        "Requisito — Retroatividade limitada a 7 dias.",
        "Sistema — Rejeita qualquer coisa com mais de 7 dias.",
      ],
      explanation: "O sistema bate com o requisito. Mas o requisito pode não satisfazer a necessidade de negócio atual. Isso é diferente de dizer \"a Tecnologia está certa\". Uma conclusão melhor: o sistema está se comportando como especificado, mas a regra atual não sustenta o cenário de negócio.",
      whyItHelps: "Nomear qual das três visões está fora de sintonia com as outras te diz que tipo de problema você está realmente resolvendo.",
    },
    {
      number: 6,
      title: "CLASSIFICAR — Que tipo de problema é esse?",
      insight: "A mesma discordância pode se resolver em quatro classificações bem diferentes.",
      list: [
        "Defeito — o comportamento difere do requisito/CA acordado (o requisito permite 7 dias, o sistema rejeita 5).",
        "Comportamento esperado — o comportamento bate com a regra acordada (o requisito permite 7 dias, o sistema rejeita 10) — embora isso não signifique que nada deva mudar; agora pode ser uma solicitação de mudança em vez de uma correção de defeito.",
        "Lacuna de requisito — o cenário nunca foi claramente definido (o requisito diz \"sinistros podem ser retroagidos\", sem limite, sem exceção, sem fronteira) — o time precisa de uma decisão.",
        "Problema de configuração ou dado — a lógica está correta, mas a configuração não está (o requisito diz 7 dias, a configuração diz 3) — o sintoma parece um defeito, mas a causa raiz está em outro lugar.",
      ],
      whyItHelps: "Cada classificação aponta para uma ação seguinte diferente — corrigir código, atualizar um requisito, conseguir uma decisão ou corrigir uma config. Errar isso manda a correção para o time errado.",
    },
    {
      number: 7,
      title: "NECESSIDADE ATUAL — Alguma coisa mudou?",
      insight: "Um sistema pode implementar corretamente o requisito de ontem e ainda assim estar errado para o negócio de hoje.",
      list: [
        "Talvez a regulação tenha introduzido uma exceção.",
        "Talvez a Operação tenha mudado seu processo.",
        "Talvez um produto novo precise de retroatividade de 30 dias.",
        "Talvez a suposição original estivesse errada.",
      ],
      whyItHelps: "Não force a necessidade de hoje dentro da documentação de ontem — nomear a mudança explicitamente é o que transforma \"comportamento esperado\" numa solicitação de mudança legítima.",
    },
    {
      number: 8,
      title: "DECIDIR E DOCUMENTAR — Encerre a ambiguidade",
      insight: "No final, capture o suficiente para que a mesma discussão não volte na próxima sprint.",
      list: [
        "Comportamento observado — o que o sistema faz?",
        "Comportamento esperado — o que ele deveria fazer agora?",
        "Evidência — qual requisito, CA, regra ou política sustenta a conclusão?",
        "Classificação — defeito / comportamento esperado / lacuna de requisito / problema de configuração-dado / mudança.",
        "Decisão — corrigir, mudar, configurar, esclarecer ou aceitar.",
        "Responsável — quem decide ou entrega a próxima ação?",
      ],
      whyItHelps: "Depois atualize o requisito, CA, registro de decisão, configuração ou defeito relevante — a decisão só se sustenta se a documentação mudar junto.",
    },
    {
      number: 9,
      title: "Um segundo exemplo: mesma discordância, resposta diferente",
      insight: "A evidência decide — não qual lado soa mais confiante.",
      compare: {
        leftLabel: "O Negócio diz",
        left: "\"Clientes não conseguem cancelar pedidos depois da separação. Isso é um defeito.\"",
        rightLabel: "A Tecnologia diz",
        right: "\"Esperado. O cancelamento é desabilitado assim que status = SEPARADO.\"",
      },
      explanation: "Verifique o requisito: \"Pedidos podem ser cancelados antes do envio.\" SEPARADO é antes de ENVIADO. A regra da Tecnologia é mais rígida que o requisito acordado. Isso é um defeito — a conclusão oposta do exemplo do sinistro retroagido, alcançada pelo mesmo método.",
      whyItHelps: "O método não pré-decide quem está certo. Ele só garante que o requisito, não a voz mais alta, resolve a questão.",
    },
    {
      number: 10,
      title: "A armadilha do BA: virar o árbitro",
      insight: "Não repasse opiniões. Traga evidência.",
      compare: {
        leftLabel: "Repassando opiniões",
        left: "\"O Negócio diz que isso está errado.\" / \"A Tecnologia diz que é exatamente o que você pediu.\"",
        rightLabel: "Trazendo evidência",
        right: "\"O requisito permite cancelamento até o envio. O comportamento atual bloqueia na separação. Isso difere da regra acordada.\"",
      },
      proTip: "Ou: \"O limite de sete dias bate com o requisito aprovado. O negócio agora precisa de uma exceção de 30 dias, então isso é uma mudança de requisito.\" De qualquer jeito, a conversa avança em vez de recomeçar.",
      whyItHelps: "Um BA não precisa provar que alguém cometeu um erro — o objetivo é remover a ambiguidade para que todo mundo saiba o que construir e testar.",
    },
  ],
};
