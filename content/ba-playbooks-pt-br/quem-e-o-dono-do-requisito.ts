import type { Playbook } from "@/types/content";

const requirementOwnershipCheck = `CHECAGEM DE RESPONSABILIDADE DO REQUISITO

Requisito:

Por que ele existe?

Dono do requisito:

Guardião do requisito:

Quem aprova mudanças relevantes?

Quem toma a decisão final quando as pessoas discordam?

Decisão em aberto:

Responsável pela decisão:

Impacto se não resolvido:
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/quem-e-o-dono-do-requisito-body.tsx (renderizada via
// o registro customPlaybookBodies, não a partir de `hacks`). Este é um espelho
// em texto simples dessa mesma prosa, usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Alguém pergunta: "quem é dono desse requisito?" O Produto diz que o Negócio é dono. O Negócio diz que o BA vem cuidando disso. O BA diz que o Risco tomou a decisão. O Risco diz que a Operação precisa confirmar. A Operação diz que o Compliance deveria decidir. O Compliance pergunta se isso não é do Risco. Seis respostas depois, ainda não temos um dono. Um requisito pode ter um monte de gente em volta dele e ainda assim não pertencer a ninguém.

Aqui está o requisito. REQ-218 — bloquear operações quando o dado de risco do cliente estiver indisponível. Se a informação de risco do cliente não puder ser obtida, a operação não deve prosseguir. O desenvolvimento começa. Aí o QA pergunta o que exatamente deveria acontecer. A operação deveria falhar completamente, ir para Revisão Manual ou continuar e ser sinalizada depois? Boa pergunta. Então o BA pergunta quem pode decidir. É aí que o problema de verdade começa.

"Pergunta pro negócio" não é uma resposta. Qual negócio — Risco, Operações, Front Office, Compliance, Produto? "Negócio" é um grupo de pessoas que podem querer coisas bem diferentes. Se a resposta para "quem decide" é o nome de um departamento, continue perguntando.

O BA também não é dono automaticamente. Você pode ter escrito a story, conduzido os workshops, documentado as regras, atualizado o Jira, explicado para o desenvolvimento, apoiado o QA — isso ainda não significa que você deveria tomar a decisão de negócio. Um BA costuma ser dono da clareza do requisito. Não necessariamente da escolha por trás dele.

O REQ-218 começa a viajar. O Risco diz que a Operação precisa confirmar o fluxo. A Operação diz que o Compliance precisa confirmar se a Revisão Manual é aceitável. O Compliance diz que o Risco é dono da política. Risco para Operação para Compliance para Risco. Todo mundo está envolvido. Ninguém está decidindo. É assim que costuma parecer uma responsabilidade não clara. Não é silêncio. É circulação.

Encontre a responsabilidade no ponto de decisão. Aqui está o teste mais simples: se dois stakeholders discordam, quem toma a decisão final? Essa pergunta é muito mais útil do que "quem está envolvido". Para o REQ-218, alguém eventualmente precisa escolher entre rejeitar, Revisão Manual ou continuar. A pessoa com autoridade para fazer essa escolha está bem mais perto do dono de verdade. A responsabilidade fica visível quando uma decisão precisa ser tomada.

Boa parte da confusão desaparece se pararmos de chamar todo mundo de dono. Três papéis valem a pena separar. O Dono do Requisito é responsável por como o comportamento de negócio deveria ser — consegue aprovar uma mudança relevante e sustentar o resultado. O Guardião do Requisito mantém o requisito claro, atualizado e testável — geralmente é o BA — garantindo que todo mundo entenda o requisito sem tomar a decisão de negócio automaticamente. O Responsável pela Decisão toma uma decisão específica de especialista: Risco é dono do tratamento de risco, Compliance é dono da interpretação regulatória, Operações é dona do processo operacional, Tecnologia é dona do design técnico. Podem ser pessoas diferentes. Isso é normal. O problema é quando ninguém sabe qual papel pertence a quem.

Voltando ao REQ-218. Em vez de escrever "Dono: Negócio", escrevemos: Dono do requisito — Head de Controles de Risco de Cliente. Guardião do requisito — Business Analyst. Decisão em aberto — o que acontece quando o dado de risco do cliente está indisponível? Responsável pela decisão — Head de Controles de Risco de Cliente. Consultados — Operações, Compliance, Tecnologia. Impacto se não resolvido — o QA não consegue validar o fluxo de exceção. Ainda precisamos da decisão. Mas agora sabemos quem precisa tomá-la. Em vez de mandar o requisito circulando pela organização, o BA pode levar a pergunta direto para quem realmente tem autoridade para resolvê-la.

Não confunda conhecimento técnico com responsabilidade. O especialista pode conhecer o processo melhor que ninguém. Isso não significa automaticamente que ele pode mudá-lo. O especialista pode dizer "é assim que o processo funciona hoje". O dono precisa conseguir dizer "é assim que o processo deveria funcionar amanhã". Conhecimento e autoridade são coisas diferentes. Os dois importam. Não são a mesma coisa.

O teste de responsabilidade de cinco minutos: escolha um requisito importante e pergunte quem consegue explicar por que ele existe, quem consegue aprovar uma mudança relevante, quem aceita o resultado de negócio e — a importante — se os stakeholders discordarem, quem toma a decisão final? Se ninguém consegue responder isso com clareza, você provavelmente ainda não encontrou o dono.

O que aconteceu com o REQ-218? O Head de Controles de Risco de Cliente finalmente toma a decisão: se o dado de risco estiver indisponível, a operação não deve prosseguir automaticamente — em vez disso, mande para Revisão Manual. Regra de Negócio: uma operação não deve prosseguir automaticamente quando o dado de risco do cliente exigido estiver indisponível. Critério de Aceitação: dado que o dado de risco do cliente não pode ser obtido, quando a validação pré-operação roda, então o processamento automático para e a operação entra em Revisão Manual. Agora sabemos os dois lados: o que o sistema deveria fazer e quem sustenta a decisão.

Um requisito não tem dono porque o nome de alguém aparece do lado dele no Jira. Ele tem dono quando alguém consegue dizer: "este é o comportamento que queremos, e eu sou responsável por essa decisão". O BA pode deixá-lo claro. O especialista pode deixá-lo preciso. A Tecnologia pode torná-lo viável. O QA pode provar que funciona. Mas nenhum deles é automaticamente dono da decisão. Quando o requisito chega numa bifurcação, faça uma pergunta: quem tem o direito de escolher? Se ninguém sabe, o requisito ainda não tem dono.`;

export const quemEODonoDoRequisito: Omit<Playbook, "readingTime"> = {
  slug: "quem-e-o-dono-do-requisito",
  title: "Ninguém Sabe Quem É o Dono do Requisito",
  description: "Quando todo mundo está envolvido, a responsabilidade pode silenciosamente não pertencer a ninguém.",
  summary:
    "Um exemplo real de um requisito que viaja do Risco para a Operação, para o Compliance e volta, sem ninguém decidir — e os três papéis (Dono, Guardião, Responsável pela Decisão) que impedem um requisito de circular para sempre.",
  category: "Business Analysis",
  tags: ["Stakeholders", "Requisitos", "Responsabilidade"],
  author: "Surya",
  date: "2026-08-08",
  audience: [
    "Business Analysts presos mandando um requisito em círculos entre departamentos",
    "BAs cujos documentos de requisito dizem \"Dono: Negócio\" e nada mais específico",
    "Líderes de entrega desembaraçando quem realmente pode aprovar uma mudança",
    "Qualquer um que já ouviu \"pergunta pro negócio\" como resposta",
  ],
  bodyText,
  seoTitle: "Ninguém Sabe Quem É o Dono do Requisito — Um Guia de Diagnóstico para BAs",
  seoDescription:
    "Um guia prático de BA para encontrar a responsabilidade real de um requisito — por que \"pergunta pro negócio\" não é uma resposta, os três papéis que vale a pena separar e um exemplo de um requisito que finalmente é decidido.",
  closingHeading: [
    "Um requisito não tem dono porque um nome está do lado dele no Jira.",
    "Ele tem dono quando alguém diz \"eu sou responsável por essa decisão\".",
  ],
  closingBody:
    "Da próxima vez que um requisito chegar numa bifurcação, não mande ele circulando pela organização de novo. Faça uma pergunta: quem tem o direito de escolher? Se ninguém sabe, o requisito ainda não tem dono.",
  closingTemplate: requirementOwnershipCheck,
  closingTemplateName: "Checagem de Responsabilidade do Requisito",
  hacks: [
    {
      number: 1,
      title: "Dono do Requisito",
      insight: "Responsável por como o comportamento de negócio deveria ser.",
      explanation: "Consegue aprovar uma mudança relevante e sustentar o resultado. Para o REQ-218, é o Head de Controles de Risco de Cliente.",
      whyItHelps: "Nomear esse papel impede que \"Dono: Negócio\" substitua uma pessoa de fato responsável.",
    },
    {
      number: 2,
      title: "Guardião do Requisito",
      insight: "Mantém o requisito claro, atualizado e testável — geralmente é o BA.",
      explanation: "O guardião garante que todo mundo entenda o requisito, mas não toma a decisão de negócio automaticamente.",
      whyItHelps: "Separar clareza de autoridade impede que o BA seja cobrado por decisões que não são dele para tomar.",
    },
    {
      number: 3,
      title: "Responsável pela Decisão",
      insight: "Toma uma decisão específica de especialista.",
      list: [
        "Risco → tratamento de risco",
        "Compliance → interpretação regulatória",
        "Operações → processo operacional",
        "Tecnologia → design técnico",
      ],
      whyItHelps: "Podem ser pessoas diferentes para o mesmo requisito — tudo bem, desde que todo mundo saiba qual papel pertence a quem.",
    },
  ],
};
