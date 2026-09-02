import type { Playbook } from "@/types/content";

const discoveryCanvas = `CANVAS DE DESCOBERTA DE NOVO PROJETO

1. PROPÓSITO DO PROJETO

Estamos melhorando:

Para:

Porque:

Para que:

Por que agora?

O que acontece se não fizermos nada?

Como o sucesso será medido?

2. PESSOAS E DECISÕES

Patrocinador:

Responsável pelo resultado de negócio:

Product owner:

SMEs operacionais:

Donos de tecnologia:

Responsáveis por QA / UAT:

Risco / Compliance / Segurança:

Responsável pelo suporte depois do release:

Quem toma a decisão final quando as pessoas discordam?

3. PROCESSO ATUAL

Gatilho:

Passos principais:

Pessoas envolvidas:

Workarounds manuais:

Pontos de espera:

Falhas comuns:

4. MUDANÇA ALVO

O que deveria mudar?

O que deveria permanecer inalterado?

Resultado esperado para o usuário:

Resultado esperado para o negócio:

5. SISTEMAS E DADO

Sistemas envolvidos:

Sistema de referência:

Dado importante:

Donos do dado:

Integrações:

Relatórios / consumidores downstream:

Comportamento de falha e recuperação:

6. ESCOPO E ENTREGA

Dentro do escopo:

Fora do escopo:

Fronteira do release:

Datas fixas e motivos:

Dependências:

Condições de prontidão:

Fallback / rollback:

7. DECISÕES E SUPOSIÇÕES

Decisões confirmadas:

Propostas aguardando aprovação:

Suposições:

Informação conflitante:

8. RISCOS E PERGUNTAS EM ABERTO

Risco ou pergunta:

Por que isso importa:

Responsável:

Próxima ação:

Prazo:

9. PRIORIDADES DOS PRIMEIROS 30 DIAS

O que eu preciso entender primeiro?

Qual jornada eu vou rastrear?

Quais decisões precisam de confirmação?

Quais riscos precisam de atenção antecipada?

O que eu vou devolver para o time?
`;

// A narrativa completa + os exemplos trabalhados da AaravCare / SaaS global
// vivem em components/ba-playbooks/guia-de-descoberta-de-novo-projeto-body.tsx
// (renderizada via o registro customPlaybookBodies, não a partir de `hacks`).
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `É sua primeira semana num projeto novo. Você tem acesso ao Jira, um documento de requisitos de 74 páginas e uma agenda cheia de reuniões cujos títulos contêm palavras que você ainda não entende. Depois seu gestor pergunta: você já está confortável com o projeto? Você conheceu doze pessoas, abriu seis sistemas e coletou dezessete documentos. Mas ainda não consegue explicar com confiança por que o projeto existe. Isso é normal. O problema raramente é falta de informação. É que a informação chega em pedaços, e ninguém te conta como eles se conectam.

"Entender o projeto" é grande demais para ser útil. Comece com um alvo menor. Ao final da descoberta, você deveria conseguir explicar por que o projeto existe, quem é afetado e quem decide, como o processo funciona hoje, o que se espera que mude, quais sistemas e dados fazem isso funcionar e onde estão os riscos, dependências e perguntas sem resposta. Isso já basta para começar a contribuir sem fingir que você sabe tudo. Descoberta não é sobre virar o especialista em dez dias. É sobre construir o mapa que te ajuda a fazer perguntas melhores no dia onze.

Vamos usar uma empresa de seguros indiana fictícia chamada AaravCare. Hoje, clientes enviam sinistros de seguro saúde por e-mail. Times de Operações baixam os documentos, digitam os detalhes num sistema de sinistros e contatam os clientes quando algo está faltando. O briefing do projeto diz: construir uma jornada digital de sinistros para reduzir o tempo de processamento. Parece claro. Não é. "Jornada digital de sinistros" significa um formulário para enviar documentos ou validação de apólice, checagens de fraude, rastreamento de status, aprovação automática e integração hospitalar também? E "reduzir o tempo de processamento" significa envio, revisão, aprovação ou pagamento mais rápidos? Uma descrição de projeto te diz o que as pessoas querem construir. Ela pode não te dizer qual problema elas estão tentando resolver.

Comece por por que o projeto existe. Antes de estudar telas, stories ou APIs, entenda o motivo pelo qual dinheiro e pessoas foram alocados nesse trabalho. Pergunte que problema estamos tentando resolver, quem sente esse problema, que evidência nos diz que vale a pena resolver, por que estamos resolvendo agora, o que acontece se não fizermos nada e como vamos saber que o projeto funcionou. Na AaravCare, o Atendimento ao Cliente diz que os clientes continuam ligando porque não sabem o status do sinistro. A Operação diz que gasta tempo demais checando envios incompletos. O Financeiro diz que o processamento manual torna a previsão de pagamento pouco confiável. O Compliance diz que precisa de um registro melhor do que foi enviado, mudado e aprovado. O projeto tem vários problemas relacionados usando o mesmo nome de projeto. Seu trabalho é tornar esses problemas visíveis antes que o time trate uma funcionalidade como a resposta para todos eles.

Escreva um propósito de projeto de uma frase: estamos melhorando [processo] para [usuários] porque [problema atual], para que [resultado mensurável]. Para a AaravCare: estamos melhorando o envio e a validação inicial de sinistros para segurados e a Operação de Sinistros porque envios incompletos por e-mail criam atrasos evitáveis, para que mais sinistros cheguem prontos para avaliação e os clientes consigam ver o que acontece a seguir. Essa frase pode mudar conforme você aprende mais. Ótimo. A descoberta deveria mudar seu entendimento.

Encontre as pessoas por trás do organograma. Uma lista de stakeholders te dá nomes e papéis. Ela não te diz como o projeto realmente toma decisões. Para cada área importante, identifique quem sente o problema, quem faz o trabalho hoje, quem é dono do resultado de negócio, quem toma decisões de política ou controle, quem é dono dos sistemas afetados, quem pode bloquear a mudança, quem vai dar suporte depois do release e quem está faltando na conversa. Na AaravCare, o patrocinador do projeto é o Head de Transformação de Sinistros, mas as regras para aceitar um sinistro pertencem à Operação de Sinistros, a Fraude decide quais envios precisam de checagens adicionais, o Financeiro é dono dos controles de pagamento, a Tecnologia é dona da plataforma de sinistros e o Atendimento ao Cliente lida com as ligações quando a jornada não está clara. Um patrocinador não significa um único tomador de decisão. Construa um mapa de decisão simples e, se a resposta é só "o negócio", continue perguntando.

Siga o trabalho como ele acontece hoje. Documentos descrevem o processo oficial. As pessoas te mostram o real. Peça para alguém que faz o trabalho te guiar por um exemplo recente do início ao fim, não uma apresentação ou um processo ideal, um caso real. Para o sinistro da AaravCare: o cliente envia um e-mail com anexos, o Atendimento ao Cliente checa se o número da apólice está presente, a Operação baixa e renomeia os arquivos, um analista digita os detalhes do sinistro no sistema de sinistros, informação faltando é solicitada por e-mail, checagens de fraude podem ser disparadas, um avaliador aprova, rejeita ou pede mais evidência, o Financeiro libera o pagamento e o cliente recebe uma atualização. Depois pergunte onde o trabalho espera, o que é copiado manualmente, o que é checado duas vezes, qual passo depende do conhecimento de uma pessoa só, onde as pessoas saem do sistema oficial e usam e-mail ou planilhas, o que acontece quando informação está faltando e como o cliente é informado. Aquela planilha que alguém chama de temporária pode estar carregando metade do processo. Não a ignore só porque ela está faltando no diagrama de arquitetura.

Separe o estado atual do futuro prometido. Projetos novos costumam misturar três coisas diferentes: o que acontece hoje, o que alguém propôs e o que realmente foi aprovado. Na AaravCare: "clientes atualmente enviam documentos por e-mail" é estado atual, "clientes deveriam enviar documentos por um portal" é uma mudança proposta, "o portal deve suportar arquivos PDF e JPEG até o limite de tamanho aprovado" é um requisito uma vez confirmado e "a IA vai checar todo documento médico automaticamente" é uma ideia ou suposição. Um slide impressionante não é uma decisão. Um protótipo não é necessariamente comportamento aprovado. Uma linha num documento antigo pode não ser mais verdade. Para toda afirmação importante, pergunte: isso é comportamento atual, um requisito aprovado, uma proposta ou uma suposição? Você vai evitar uma quantidade surpreendente de confusão com essa única pergunta.

Desenhe a jornada de sistemas e dado. Você não precisa de um diagrama de arquitetura perfeito no primeiro dia. Comece com uma jornada simples: quem cria a informação, onde ela entra, quais sistemas a usam, o que sai. Para a AaravCare: o cliente digita os detalhes de apólice e sinistro no Portal de Sinistros, que valida a apólice através do Sistema de Apólices, envia o envio para a Plataforma de Sinistros, envia casos selecionados para o Serviço de Fraude, envia instruções de pagamento aprovadas para o Sistema Financeiro e retorna atualizações de status para o Portal do Cliente. Agora pergunte sobre as conexões: qual sistema é dono de cada campo importante, quais integrações são em tempo real e quais são atrasadas, qual identificador liga o mesmo sinistro através dos sistemas, o que acontece se um sistema não responde, mensagens podem chegar duas vezes ou fora de ordem, onde erros de validação são armazenados, quem reconcilia divergências e quais relatórios consomem o dado depois. A tela é só onde o usuário encontra o processo. O requisito costuma viver no que acontece antes e depois dela.

Encontre as decisões já tomadas e as que fingem ter sido tomadas. Novos membros do time costumam reabrir questões já resolvidas porque não conseguem encontrar a decisão original. Eles também herdam suposições que todo mundo trata como resolvidas porque ninguém lembra de tê-las questionado. Crie um registro de decisões com cinco campos: decisão, status, responsável, motivo, evidência. Status úteis são Proposta, Aprovada, Rejeitada, Substituída e Precisa confirmação. Se ninguém consegue identificar quem aprovou algo, registre essa incerteza. Não a converta silenciosamente num fato.

Torne a fronteira de entrega visível. Um projeto pode ter uma visão clara e ainda assim ter um release pouco claro. Pergunte o que está incluído no próximo release, o que está explicitamente fora de escopo, o que já está comprometido, quais datas são fixas e por quê, o que depende de outro time, fornecedor ou aprovação, o que precisa ser verdade antes do desenvolvimento começar, o que impediria a UAT ou o release em produção e que trabalho continua manual depois do lançamento. Na AaravCare, "sinistros digitais" é a visão. O primeiro release pode incluir só envio de sinistro, upload de documento, validação básica de apólice e confirmação e rastreamento de status. Automação de fraude e aprovação automática podem vir depois. Isso não é uma falha de ambição. É uma fronteira de entrega usável.

Você não precisa completar a descoberta antes de contribuir. Use três passadas ao longo dos primeiros 30 dias. Dias 1-5, oriente-se: entenda por que o projeto existe e aprenda sua linguagem, leia o briefing do projeto, decisões recentes e o backlog atual, conheça o patrocinador, o product owner, o SME operacional, o líder de tecnologia e o líder de QA, escreva sua primeira versão da declaração de propósito do projeto, comece um glossário, capture contradições e perguntas em aberto. Resultado: declaração de propósito, mapa de stakeholders e glossário. Dias 6-15, rastreie: siga uma jornada real através de pessoas, sistemas e dado, observe o processo atual, percorra um caso normal e um caso com falha, desenhe a jornada de processo e sistema, identifique donos de dado, integrações e workarounds manuais, separe decisões aprovadas de propostas e suposições. Resultado: fluxo do estado atual, mapa de sistema/dado e registro de decisões. Dias 16-30, teste seu entendimento: devolva seu entendimento para o time, confirme o resultado alvo e as medidas de sucesso, valide o escopo e as fronteiras de release, exponha dependências e riscos de entrega, priorize perguntas sem resposta, cheque se o QA, a Operação e o Suporte veem algo faltando, combine o que você vai investigar a seguir. Resultado: canvas de descoberta validado, lista de riscos e plano de próximas ações. Trinta dias não é um prazo para saber tudo. É tempo suficiente para parar de depender de qualquer que seja a última pessoa que falou com você.

O mesmo mapa funciona num projeto completamente diferente. Imagine entrar numa empresa global de SaaS que quer automatizar o onboarding de funcionários. Por quê: novos contratados esperam demais por contas e equipamentos. Pessoas: RH, gestores, TI, Segurança, Folha de Pagamento, Facilities e novos funcionários. Processo: oferta aceita, funcionário criado, checagens concluídas, acesso e equipamento fornecidos. Sistemas: plataforma de RH, provedor de identidade, folha de pagamento, service desk e gestão de dispositivos. Dado: nome legal, localização, data de entrada, tipo de emprego, gestor e perfil de acesso. Decisões: quem aprova acesso privilegiado, o que acontece quando uma data de entrada muda. Fronteira: o primeiro release cria contas, encomenda equipamento ou os dois. País diferente, indústria diferente, mesmo problema: o nome do projeto é menor que o sistema de trabalho por trás dele.

Uma vez que você entende a jornada básica, faça as perguntas menos confortáveis: quais medidas de sucesso poderiam melhorar enquanto a experiência do cliente piora, qual stakeholder se beneficia dessa mudança e quem ganha mais trabalho, que atividade manual a solução está silenciosamente dependendo, qual regra existe por causa de regulação e qual existe porque "sempre fizemos assim", o que acontece com os casos já em andamento quando a mudança entra no ar, quem trata exceções depois do lançamento, qual time downstream fica sabendo da mudança por último, o que precisa ser monitorado no primeiro dia, qual é o rollback ou fallback se a jornada nova falhar e qual suposição seria mais cara se estivesse errada. Você não vai precisar de toda pergunta em todo projeto. Escolha as que podem mudar escopo, design, teste ou responsabilidade.

Cinco erros de descoberta para evitar. Ler tudo antes de falar com alguém: documentos te dão histórico, pessoas te dão contexto, use os dois. Reunir só com stakeholders sêniores: líderes explicam o processo pretendido, as pessoas que fazem o trabalho te mostram onde ele se dobra. Tratar acesso como entendimento: ter acesso a Jira, Confluence e sistemas não significa que você entende como um caso se move através deles, rastreie um exemplo real. Esconder o que você não sabe: perguntas visíveis tornam a descoberta mais segura, suposições silenciosas fazem ela parecer terminada antes de estar. Transformar a descoberta em análise permanente: você nunca vai remover todo desconhecido, exponha os que poderiam mudar a próxima decisão.

Antes de dizer "eu entendo o projeto", cheque se você consegue responder: por que esse projeto existe, quem sente o problema, como o processo funciona hoje, o que se espera que mude, quais sistemas e dado estão envolvidos, quem é dono das decisões importantes, o que está incluído no próximo release, quais suposições ainda não foram verificadas, onde a mudança poderia falhar e o que você deveria investigar a seguir. Se você não consegue responder uma dessas, você não falhou na descoberta. Você encontrou para onde a descoberta precisa ir a seguir. Você não entende um projeto quando coletou todos os seus documentos. Você entende quando consegue explicar como o problema, as pessoas, o processo, os sistemas e as decisões dele se conectam.`;

export const guiaDeDescobertaDeNovoProjeto: Omit<Playbook, "readingTime"> = {
  slug: "guia-de-descoberta-de-novo-projeto",
  title: "Guia de Descoberta de Novo Projeto",
  description: "Você entrou num projeto novo. O que você deveria perguntar primeiro?",
  summary:
    "Um guia prático de descoberta para os primeiros 30 dias para Business Analysts — as perguntas que conectam o problema, as pessoas, o processo, os sistemas, o dado e as decisões de um projeto, trabalhado num projeto fictício de sinistros de seguro e num exemplo global de onboarding, mais um canvas de descoberta copiar-colar.",
  category: "Business Analysis",
  tags: ["Descoberta", "Stakeholders", "onboarding"],
  author: "Surya",
  date: "2026-08-13",
  audience: [
    "Business Analysts nas primeiras semanas de um projeto novo",
    "BAs que têm documentos e acesso, mas ainda não conseguem explicar por que o projeto existe",
    "Líderes de entrega recebendo um novo membro de time num projeto em andamento",
    "Qualquer um que já ouviu \"você já está confortável com o projeto?\" cedo demais",
  ],
  bodyText,
  seoTitle: "Guia de Descoberta de Novo Projeto para Business Analysts | BodhiProtocol",
  seoDescription:
    "Um guia prático de descoberta para os primeiros 30 dias para Business Analysts — as perguntas que revelam por que um projeto existe, quem realmente decide, como o processo funciona hoje e quais sistemas e dado o fazem funcionar.",
  closingHeading: [
    "Você não entende um projeto quando coletou todos os seus documentos.",
    "Você entende quando consegue explicar como as peças dele se conectam.",
  ],
  closingBody:
    "Problema, pessoas, processo, sistemas, dado e decisões — trinta dias não é um prazo para saber tudo. É tempo suficiente para parar de depender de qualquer que seja a última pessoa que falou com você.",
  closingTemplate: discoveryCanvas,
  closingTemplateName: "Canvas de Descoberta de Novo Projeto",
  relatedPlaybookSlugs: [
    "guia-de-levantamento-de-requisitos",
    "quem-e-o-dono-do-requisito",
    "modelo-de-analise-de-impacto",
  ],
  hacks: [
    {
      number: 1,
      title: "Por quê",
      insight: "Entenda por que o projeto existe antes de estudar telas, stories ou APIs.",
      whyItHelps: "Uma descrição de projeto te diz o que as pessoas querem construir. Ela pode não te dizer qual problema elas estão resolvendo.",
    },
    {
      number: 2,
      title: "Quem",
      insight: "Uma lista de stakeholders te dá nomes. Ela não te diz como as decisões realmente são tomadas.",
      whyItHelps: "Um patrocinador não significa um único tomador de decisão — construa um mapa de decisão em vez disso.",
    },
    {
      number: 3,
      title: "Como",
      insight: "Documentos descrevem o processo oficial. As pessoas te mostram o real.",
      whyItHelps: "O workaround que alguém chama de \"temporário\" costuma estar carregando metade do processo.",
    },
    {
      number: 4,
      title: "O quê",
      insight: "Separe o comportamento atual de uma proposta, um requisito e uma suposição.",
      whyItHelps: "Um slide impressionante não é uma decisão. Um protótipo não é comportamento aprovado.",
    },
    {
      number: 5,
      title: "Qual",
      insight: "Rastreie quem cria a informação, onde ela entra e quais sistemas a usam.",
      whyItHelps: "A tela é só onde o usuário encontra o processo — o requisito costuma viver antes e depois dela.",
    },
    {
      number: 6,
      title: "Onde",
      insight: "Encontre as decisões já tomadas e os riscos e perguntas em aberto ainda sem resposta.",
      whyItHelps: "Se ninguém consegue identificar quem aprovou algo, registre essa incerteza em vez de silenciosamente tratá-la como fato.",
    },
  ],
};
