import type { Playbook } from "@/types/content";

const preUatReadinessChecklistTemplate = `ANTES DE DIZER "COMEÇAR A UAT"

[ ] Escopo e build verificados.
[ ] Casos e resultados esperados prontos.
[ ] Dado de teste validado.
[ ] Ambiente estável.
[ ] Usuários e acesso funcionando.
[ ] Integrações disponíveis.
[ ] Configuração correta.
[ ] Testadores de negócio alinhados.
[ ] Processo de defeito/triagem claro.
[ ] Critérios de saída acordados.
[ ] Contatos de suporte conhecidos.

A ÚNICA PERGUNTA
O que poderia impedir um teste significativo amanhã? Encontre isso hoje.

REGRA DE OURO
Teste a coisa certa, com o dado certo, nas condições certas.`;

// A prosa narrativa completa (incluindo o exemplo de verificação de
// beneficiário) vive em
// components/ba-playbooks/o-que-o-ba-deve-checar-antes-da-uat-body.tsx,
// renderizada via o registro customPlaybookBodies, não a partir de `hacks`.
// Este é um espelho em texto simples usado só para calcular o tempo de
// leitura — veja a documentação do campo `bodyText` em types/content.ts.
const bodyText = `O calendário diz que a UAT começa amanhã. Os casos de teste estão escritos. Os usuários de negócio bloquearam a agenda. Todo mundo diz "a gente está pronto". Segunda de manhã chega. O primeiro testador faz login — a conta dele não funciona. Outro testador descobre que o cliente de teste não existe. A API aponta para o serviço errado. Uma feature flag ainda está desligada. Na hora do almoço, ninguém está testando o requisito. Estão testando se a configuração de teste funciona. Essa é a diferença entre UAT agendada e UAT pronta.

User Acceptance Testing não é mais uma rodada de teste do desenvolvedor. Ela responde uma pergunta de negócio: essa solução sustenta a necessidade de negócio real o suficiente para a gente aceitá-la? Isso precisa de mais do que um build funcionando — o escopo certo, os cenários certos, o dado certo, o ambiente certo, os usuários certos, as integrações certas e a configuração certa. Se um desses estiver errado, a UAT pode contar a história errada.

Imagine um banco lançando um novo fluxo de verificação de beneficiário. O requisito diz que transferências acima de ₹2 lakh para um beneficiário novo exigem verificação adicional. O desenvolvimento está completo, o teste de sistema passou, a UAT começa amanhã. Antes de dizer "pode ir", o que o BA deveria checar?

Escopo e build: confirme se o escopo do requisito e o build implantado realmente batem. Se o QA testou a versão 4.8 e a UAT recebe a 4.7 por acidente, toda falha depois disso cria ruído.

Casos de teste: bons cenários de UAT representam como as pessoas realmente usam o sistema, não só o fluxo principal. Além de "beneficiário novo, ₹3 lakh, verificação aparece", teste também a fronteira em exatamente ₹2 lakh, logo abaixo do limite em ₹1,99,999, se a verificação se aplica a um beneficiário existente, o que acontece quando o serviço de verificação está indisponível, um retry depois de uma verificação falhada, se o usuário certo tem permissão para realizar a ação e se a transferência continua corretamente depois. Uma pergunta útil: o que faria o negócio recusar aceitar essa funcionalidade?

Dado de teste: o cenário existe, mas o dado existe? Mapeie cada cenário para o dado que ele exige — um cliente sem beneficiário anterior, uma conta com saldo suficiente, um cliente com um beneficiário salvo, uma identidade de teste que dispara uma verificação falhada, um usuário com papel restrito — e realmente valide se esse dado funciona, em vez de confiar que "alguém disse que estava carregado".

Ambiente: um ambiente ruim pode fazer uma boa funcionalidade parecer quebrada. Para o fluxo de verificação de beneficiário, isso significa confirmar que o build da UAT realmente bate com a release que o QA aprovou, que o endpoint de UAT do serviço de verificação chama o motor de regras de verdade em vez de um stub que sempre retorna "verificado" e que a atualização de dado de ontem à noite não apagou as contas de cliente das quais os casos de teste dependem. De forma mais geral, verifique se o build correto está implantado, o ambiente está acessível, o banco de dados está disponível, os serviços necessários estão rodando, não há queda bloqueante conhecida, o dado de teste foi atualizado corretamente, as URLs e endpoints estão corretos e nenhuma mudança não coordenada está acontecendo durante os testes críticos. Não precisa ser perfeito — precisa ser estável o suficiente para que a falha signifique alguma coisa, não que a transferência de ₹2 lakh falhou porque o ambiente resetou durante a noite.

Acesso e papéis: os testadores desse fluxo são gerentes de relacionamento de agência e equipe de operações, não desenvolvedores. Nunca presuma que eles tinham acesso da última vez. Verifique se as contas de UAT deles realmente conseguem originar uma transferência acima de ₹2 lakh, não só visualizar uma, se o fluxo de maker-checker está configurado para esse valor e se o papel deles inclui a permissão específica ligada a esse passo novo. De forma mais geral, confirme se os usuários estão criados, conseguem fazer login, os papéis e permissões estão corretos, conseguem acessar os sistemas dependentes, o MFA e o VPN funcionam e as regras de segregação de funções são respeitadas. Oito gerentes de relacionamento descobrindo que o login deles não consegue originar uma transferência durante a chamada de UAT não é teste — é troubleshooting.

Integrações: sua funcionalidade pode funcionar perfeitamente, mas a UAT geralmente testa uma jornada. Para o fluxo de verificação de beneficiário, essa jornada vai de Início da Transferência para API de Verificação, Ledger do Core Bancário, Triagem de Fraude/Risco, Gateway de SMS/Notificação. Se o gateway de SMS na UAT for um mock que nunca dispara de verdade, um testador consegue "passar" num cenário que deixaria um cliente real esperando por um OTP que nunca chega. Pergunte que outro sistema precisa funcionar para esse cenário terminar e verifique as dependências upstream e downstream críticas antes de os testadores chegarem.

Configuração: feature flags, limites, regras de negócio, configuração de produto, dado de referência, roteamento, moedas, datas e direitos do usuário podem invalidar silenciosamente um teste que, de resto, seria perfeito. Se o requisito diz verificação acima de ₹2 lakh, mas a UAT está configurada para ₹5 lakh, o código pode estar perfeito e o teste ainda vai contar a história errada — o mesmo vale para uma feature flag ainda desligada, um limite de retry de OTP diferente da produção ou um limite de conta NRI que ninguém atualizou para bater com a regra nova.

Stakeholders: a tecnologia pode estar pronta enquanto a UAT ainda falha operacionalmente. Para esse fluxo especificamente, o líder de operações de agência, o responsável por fraude e risco, o release manager e o BA todos precisam concordar, antes do Dia 1, sobre como é um cenário aprovado, quem levanta um defeito se uma transferência real de ₹2 lakh pular a verificação por engano e quem tem autoridade para chamar um No-Go se o serviço de verificação não se mostrar confiável o suficiente. De forma mais geral, todo mundo deveria saber o que está sendo testado, quem está testando o quê, onde os resultados são registrados, como os defeitos são levantados, quem os triagem, o que conta como bloqueador e quem decide a aceitação — além do caminho de suporte entre engenharia, QA, BA, ambiente, dados e times de integração.

Não pergunte se está pronto — pergunte o que prova isso. "Login testado", "build verificado", "endpoint checado", "dado de teste validado", "cenário crítico executado" é evidência. "Alguém confirmou" é garantia. E combine como é uma "UAT completa" antes de o teste começar: cenários críticos de negócio executados, nenhum defeito de Severidade 1 em aberto, tratamento acordado para os defeitos restantes, aprovação de negócio necessária obtida, evidência armazenada, limitações conhecidas aceitas.

O BA não deveria virar pessoalmente o engenheiro de ambiente, o engenheiro de dado de teste, o administrador de acesso, o líder de QA e o release manager. O trabalho é tornar a prontidão visível — coordenar, verificar, expor lacunas, não fazer tudo pessoalmente.

Reúna as pessoas-chave para uma revisão de prontidão curta, percorra escopo e build, cenários, dado, ambiente, acesso, integrações, configuração, usuários de negócio, caminho de suporte e critérios de saída e responda uma pergunta: o que poderia impedir um teste significativo amanhã? Encontre isso hoje.

Depois decida. GO: os pré-requisitos críticos estão prontos, comece a UAT. CONDITIONAL GO: existe uma lacuna conhecida, mas um teste significativo consegue continuar com segurança em volta dela — documente a limitação e continue. NO-GO: um pré-requisito impede um teste significativo — build errado, dado de teste inutilizável, uma integração crítica indisponível, testadores que não conseguem acessar o sistema. Adiar a UAT em um dia pode sair mais barato do que desperdiçar o dia de dez pessoas fingindo testar.

Uma boa UAT não começa porque o calendário diz Dia 1. Ela começa quando os usuários de negócio conseguem executar cenários significativos e confiar no que os resultados estão dizendo. Então, antes de perguntar "os usuários de negócio estão prontos para testar?", pergunte: a gente tornou possível para eles testarem direito? A UAT não está pronta porque o plano de teste existe. Ela está pronta quando o negócio consegue testar a coisa certa, com o dado certo, nas condições certas — e o time tem evidência para provar isso.`;

export const oQueOBaDeveChecarAntesDaUat: Omit<Playbook, "readingTime"> = {
  slug: "o-que-o-ba-deve-checar-antes-da-uat",
  title: "O Que Exatamente um BA Deveria Checar Antes da UAT Começar?",
  description:
    "UAT agendada não é UAT pronta. Um guia de campo com as oito coisas que valem a pena verificar antes de alguém dizer \"Começar a UAT\".",
  summary:
    "Um exemplo real — o novo fluxo de verificação de beneficiário de um banco — percorrendo as oito coisas que um BA deveria verificar antes de a UAT começar: escopo e build, casos de teste, dado de teste, ambiente, acesso, integrações, configuração e prontidão dos stakeholders, terminando numa decisão GO / Conditional Go / No-Go.",
  category: "UAT",
  tags: ["UAT", "Prontidão", "Checklist"],
  author: "Surya",
  date: "2026-08-14",
  itemLabel: "Checagem",
  bodyText,
  audience: [
    "Business Analysts prestes a aprovar o início da UAT",
    "Líderes de QA e gestores de entrega rodando uma revisão de prontidão pré-UAT",
    "Recém-formados e aspirantes a BA aprendendo o que \"pronto\" realmente significa além do plano de teste",
    "Qualquer um que já viu uma manhã de UAT virar troubleshooting em vez de teste",
  ],
  seoTitle: "Checklist de Prontidão Pré-UAT para Business Analysts | BodhiProtocol",
  seoDescription:
    "O que exatamente um BA deveria checar antes de a UAT começar? Um framework de prontidão pré-UAT em 8 pontos — escopo, casos de teste, dado, ambiente, acesso, integrações, configuração e stakeholders.",
  closingHeading: ["Não pergunte se está pronto.", "Pergunte o que prova que está pronto."],
  closingBody:
    "A UAT não está pronta porque o plano de teste existe. Ela está pronta quando o negócio consegue testar a coisa certa, com o dado certo, nas condições certas — e o time tem evidência para provar isso.",
  closingTemplate: preUatReadinessChecklistTemplate,
  closingTemplateName: "Checklist de Prontidão Pré-UAT",
  hacks: [
    {
      number: 1,
      title: "Escopo & Build",
      insight: "Confirme se o escopo do requisito e o build implantado realmente batem.",
      whyItHelps: "Se a UAT recebe o build errado, toda falha depois disso cria ruído em vez de sinal.",
    },
    {
      number: 2,
      title: "Casos de Teste",
      insight: "Cubra cenários felizes, negativos, de fronteira, de exceção e ponta a ponta — não só o fluxo principal.",
      whyItHelps: "A pergunta útil é: o que faria o negócio recusar aceitar essa funcionalidade?",
    },
    {
      number: 3,
      title: "Dado de Teste",
      insight: "Mapeie cada cenário para o dado que ele precisa, depois valide de verdade se esse dado funciona.",
      whyItHelps: "O cenário existir não significa que o dado existe — esse é um dos maiores assassinos de UAT.",
    },
    {
      number: 4,
      title: "Ambiente",
      insight: "Acessível, estável, build e endpoints corretos, com os serviços necessários disponíveis.",
      whyItHelps: "Um ambiente ruim pode fazer uma boa funcionalidade parecer quebrada — precisa ser estável o suficiente para que a falha signifique alguma coisa.",
    },
    {
      number: 5,
      title: "Acesso & Papéis",
      insight: "Nunca presuma que os testadores ainda têm o acesso que tinham da última vez.",
      whyItHelps: "Oito usuários de negócio descobrindo um problema de acesso na chamada de UAT não é teste — é troubleshooting.",
    },
    {
      number: 6,
      title: "Integrações",
      insight: "A UAT geralmente testa uma jornada, não só sua funcionalidade — verifique as dependências upstream e downstream.",
      whyItHelps: "Sua funcionalidade pode funcionar perfeitamente enquanto a jornada da qual ela depende não está pronta.",
    },
    {
      number: 7,
      title: "Configuração",
      insight: "Feature flags, limites, regras de negócio e dado de referência podem invalidar silenciosamente um teste perfeito.",
      whyItHelps: "Código perfeito testado contra a configuração errada ainda conta a história errada.",
    },
    {
      number: 8,
      title: "Stakeholders",
      insight: "Todo mundo deveria saber o que está sendo testado, quem é dono do quê e o que conta como bloqueador.",
      whyItHelps: "A tecnologia pode estar pronta enquanto a UAT ainda falha operacionalmente.",
    },
  ],
};
