import type { Playbook } from "@/types/content";

const firstDraftStory = `Como cliente de banco de varejo,
eu quero baixar meus extratos mensais da conta,
para que eu possa guardar cópias para meus registros pessoais.`;

const contextParagraph = `Atualmente, os clientes conseguem ver a movimentação recente da conta online, mas extratos mensais mais antigos precisam ser solicitados via atendimento ao cliente.

Isso gera chamados de suporte desnecessários e atrasa clientes que precisam dos extratos para guardar registros.`;

const completeJiraStory = `TÍTULO
Permitir que clientes baixem extratos mensais da conta

CONTEXTO
Atualmente, os clientes conseguem ver a movimentação recente da conta online, mas extratos mensais mais antigos precisam ser solicitados via atendimento ao cliente.

PROBLEMA DE NEGÓCIO
Clientes não conseguem acessar extratos mensais anteriores de forma independente, gerando chamados de suporte desnecessários e atrasos.

USER STORY
Como cliente de banco de varejo,
eu quero baixar meus extratos mensais da conta,
para que eu possa guardar cópias para meus registros pessoais.

REGRAS DE NEGÓCIO
1. Extratos ficam disponíveis para os últimos 24 meses.
2. Somente extratos pertencentes ao cliente autenticado podem ser acessados.
3. Extratos são disponibilizados em formato PDF.
4. Extratos são gerados mensalmente.

CRITÉRIOS DE ACEITAÇÃO
CA1
Dado que o cliente está logado
Quando ele abre a seção de Extratos
Então os extratos mensais disponíveis dos últimos 24 meses são exibidos.

CA2
Dado que um extrato está disponível
Quando o cliente seleciona Baixar
Então o PDF correspondente é baixado.

CA3
Dado que o extrato solicitado não pertence ao cliente autenticado
Quando a solicitação é feita
Então o acesso é negado.

REQUISITOS DE DADOS
ID do Cliente
ID da Conta
Período do extrato
ID do Documento
Status do extrato

DEPENDÊNCIAS
Serviço de Gestão de Documentos
Serviço de Autenticação
API de recuperação de extratos
Processo de geração de extratos

FORA DE ESCOPO
Envio por e-mail
Extratos com mais de 24 meses
Redesenho do PDF
Geração de extratos avulsa

QUESTÕES EM ABERTO
Contas conjuntas estão incluídas?
O extrato deve continuar acessível após o encerramento da conta?
O período de 24 meses é configurável?
`;

const firstStoryChecklist = `MEU PRIMEIRO CHECKLIST DE USER STORY

[ ] Eu entendo o problema real, não só a solução pedida
[ ] Eu sei exatamente quem é o usuário
[ ] Eu entendo o resultado que ele precisa
[ ] A story descreve valor, não só uma funcionalidade
[ ] As regras de negócio estão registradas
[ ] Os critérios de aceitação são testáveis, com uma afirmação por critério, e incluem casos negativos
[ ] Caminhos de falha e exceções foram considerados
[ ] As expectativas de dados estão claras
[ ] As dependências estão visíveis
[ ] Os limites de escopo estão explícitos
[ ] As questões em aberto estão visíveis, não só na minha cabeça
[ ] Alguém consegue entender essa story sem mim na sala
`;

const starterStoryTemplate = `CONTEXTO
O que acontece hoje?
Por que essa mudança existe?

PROBLEMA DE NEGÓCIO
Qual problema estamos resolvendo?

USER STORY
Como...
Eu quero...
Para que...

REGRAS DE NEGÓCIO
1.
2.
3.

CRITÉRIOS DE ACEITAÇÃO
Dado...
Quando...
Então...
(inclua pelo menos um caso negativo ou de limite)

EXCEÇÕES
O que acontece quando o fluxo normal falha?

REQUISITOS DE DADOS
Qual informação é necessária?

DEPENDÊNCIAS
Quais sistemas, times ou serviços estão envolvidos?

FORA DE ESCOPO
O que estamos deliberadamente não fazendo?

QUESTÕES EM ABERTO
O que ainda precisa de resposta?
`;

const storySplitCompare = {
  leftLabel: "Uma story",
  left: "Clientes podem baixar extratos, visualizá-los no celular, e a equipe interna pode gerá-los sob demanda — tudo no mesmo card.",
  rightLabel: "Várias stories disfarçadas de uma só",
  right: "Um fluxo web, um fluxo mobile e um processo de exceção para a equipe interna são três interfaces diferentes e três conversas diferentes.",
};

export const primeiraUserStory: Omit<Playbook, "readingTime"> = {
  slug: "primeira-user-story",
  title: "Primeira User Story? Guia Completo do Pedido Vago até o Jira",
  description:
    "Como transformar um pedido vago em uma User Story que o time consegue construir e testar de verdade.",
  summary:
    "Um exemplo completo de como transformar \"precisamos de um botão de download\" em uma User Story pronta para o Jira — as perguntas que revelam o problema, o usuário, as regras de negócio, quando dividir a story, e tudo o que uma story de três linhas deixa de fora.",
  category: "Requirements",
  tags: ["Requisitos", "User Story", "Jira"],
  author: "Surya",
  date: "2026-08-15",
  itemLabel: "Passo",
  intro: [
    "Alguém diz: \"Você consegue criar uma story no Jira pra isso?\" Você diz que sim. Aí você abre o Jira. Caixa de descrição em branco. E uma pergunta muito simples fica surpreendentemente difícil: o que exatamente eu devo escrever aqui?",
    "Se essa é sua primeira User Story, comece por aqui. Porque o maior erro é achar que você precisa inventar algo brilhante. Você não precisa.",
    "Aqui vai a única coisa que você precisa lembrar antes de tudo: uma story está pronta quando outra pessoa consegue entendê-la sem você sentado do lado explicando. Tudo o que vem a seguir existe para te levar até esse ponto — é o teste que você está construindo, não só mais um item de checklist no final.",
    "E a parte mecânica — \"Como... eu quero... para que...\" — leva vinte segundos para escrever. Tudo o resto é o trabalho de verdade: descobrir o que essa frase deveria dizer. Uma User Story não é algo que você inventa. É algo que você descobre. Vamos fazer uma juntos, de um pedido vago até uma story completa que um desenvolvedor e um testador conseguem usar para trabalhar.",
  ],
  audience: [
    "BAs iniciantes escrevendo sua primeira User Story",
    "BAs júnior ainda encontrando seu processo",
    "Product Owners escrevendo suas próprias User Stories",
    "Membros do time de entrega aprendendo como requisitos são escritos",
  ],
  seoTitle: "Primeira User Story? Guia Prático para Analistas de Negócio (BA)",
  seoDescription:
    "Um guia prático passo a passo para Analistas de Negócio (BAs) transformarem um pedido vago em uma User Story clara, testável e pronta para o Jira — incluindo quando dividir a história.",
  closingHeading: [
    "A caixa em branco do Jira fica mais fácil quando você para de perguntar \"o que eu devo escrever?\"",
    "e passa a perguntar \"o que eu ainda preciso entender?\"",
  ],
  closingBody:
    "Uma User Story não é algo que você inventa. É algo que você descobre. Escrever \"Como... eu quero... para que...\" leva vinte segundos. Tudo antes disso é o trabalho de verdade.",
  closingTemplate: starterStoryTemplate,
  closingTemplateName: "Modelo Inicial de User Story",
  hacks: [
    {
      number: 1,
      title: "O pedido que já parece uma story",
      insight:
        "\"Precisamos de um botão de download para os extratos mensais\" é fácil de reescrever como story. Essa é a armadilha.",
      visual: {
        steps: [
          "Pedido de negócio",
          "Perguntas",
          "User Story",
          "Regras de negócio",
          "Critérios de aceitação",
          "Story completa no Jira",
        ],
      },
      compare: {
        leftLabel: "O que você poderia escrever de imediato",
        left: "Como cliente, eu quero um botão de download, para que eu possa baixar meu extrato.",
        rightLabel: "O que é verdade, na prática",
        right: "Ainda não entendemos o requisito — trate o pedido como uma pista, não como uma especificação.",
      },
      whyItHelps:
        "Tecnicamente, essa primeira versão até parece uma User Story. Só que ainda não é uma. Não escreva isso até ter feito algumas perguntas antes.",
    },
    {
      number: 2,
      title: "Separe o problema da solução",
      insight: "Um botão é uma solução proposta. Pergunte qual problema ele resolve antes de perguntar como ele deve funcionar.",
      before: "Não temos um botão de download.",
      after: "Clientes não conseguem acessar extratos anteriores sem entrar em contato com o suporte.",
      shiftLabel: "A mudança",
      whyItHelps:
        "Stakeholders propõem soluções porque é a linguagem que eles têm — \"precisamos de um botão\" é mais fácil de dizer do que \"precisamos de um processo.\" Seu trabalho é encontrar o problema por trás da proposta.",
    },
    {
      number: 3,
      title: "Nomeie o usuário específico",
      insight: "\"Clientes\" ainda é genérico demais para desenhar a solução. Não é \"usuários\" — é quais usuários.",
      list: [
        "Clientes de varejo?",
        "Clientes corporativos?",
        "Assessores de investimento?",
        "Usuários internos de operações?",
      ],
      whyItHelps:
        "Um cliente de varejo consultando o próprio extrato tem necessidades diferentes de um atendente de suporte consultando em nome de outra pessoa. Tipos de usuário vagos produzem stories vagas — suponha que a resposta seja \"clientes de varejo usando o internet banking\": agora você sabe para quem está desenhando.",
    },
    {
      number: 4,
      title: "Defina o resultado real",
      insight: "O que o usuário leva quando isso funciona?",
      explanation:
        "No caso do botão de download, não é \"um download\" — é \"uma cópia do meu extrato para os meus registros.\" Essa diferença molda formato, retenção e regras de acesso mais adiante. Talvez a resposta completa seja: \"Eles precisam guardar cópias dos extratos mensais para fins fiscais, de empréstimo e de registro pessoal.\" Agora você tem o valor — e a User Story básica praticamente se escreve sozinha.",
      whyItHelps:
        "Uma story sem um resultado real por trás dela é só um pedido de funcionalidade reescrito. É essa peça que torna a linha \"para que\" verdadeira, e não apenas decorativa.",
    },
    {
      number: 5,
      title: "Escreva a primeira versão — e saiba que ainda não terminou",
      insight: "A story de três linhas é a manchete. O requisito útil vive por baixo dela.",
      template: firstDraftStory,
      templateLabel: "Copiar o primeiro rascunho",
      whyItHelps:
        "Essa é uma User Story perfeitamente razoável. Só que ainda não está pronta. Tudo a partir daqui é o que transforma uma manchete em algo que o time realmente consegue construir e testar.",
    },
    {
      number: 6,
      title: "Adicione o contexto suficiente",
      insight: "Alguém que abrir esse card daqui a três meses deve entender por que ele existe.",
      template: contextParagraph,
      templateLabel: "Copiar contexto",
      whyItHelps:
        "Você não precisa escrever um ensaio. Só dê à próxima pessoa o suficiente para que ela não precise te procurar e perguntar \"por que estamos fazendo isso mesmo?\"",
    },
    {
      number: 7,
      title: "Registre as regras de negócio",
      insight: "As restrições operacionais que moldam a funcionalidade — independentes de qualquer critério de aceitação isolado.",
      list: [
        "Clientes podem acessar extratos dos últimos 24 meses.",
        "Extratos são gerados mensalmente.",
        "Somente extratos do cliente logado podem ser acessados.",
        "Extratos ficam disponíveis em arquivos PDF.",
      ],
      whyItHelps:
        "Nada disso apareceu em \"precisamos de um botão de download.\" É por isso que a conversa importa mais do que o formulário — um formulário só captura aquilo que você lembrou de perguntar.",
    },
    {
      number: 8,
      title: "Escreva critérios de aceitação que realmente se sustentam",
      insight: "É aqui que a maioria das stories falha na prática, então trate isso como uma disciplina própria, não como uma formalidade.",
      checklist: [
        "Uma afirmação por critério — se o \"Então\" junta dois resultados sem relação com um \"e\", divida em dois CAs",
        "Torne o \"Então\" observável e testável, não aspiracional",
        "Escreva os casos negativos e de limite, não só o caminho feliz",
        "Evite transformar decisões de interface em critério de aceitação, a menos que a própria interação seja o requisito",
      ],
      list: [
        "CA1 — Dado que o cliente está logado no internet banking, quando ele abre a seção de Extratos, então os extratos mensais disponíveis dos últimos 24 meses são exibidos.",
        "CA2 — Dado que um extrato está disponível, quando o cliente seleciona Baixar, então o extrato correspondente é baixado em PDF.",
        "CA3 — Dado que um cliente solicita um extrato que não pertence à sua conta, quando a solicitação é feita, então o acesso é negado.",
      ],
      whyItHelps:
        "Agora o time de desenvolvimento tem algo concreto, o QA tem algo testável, e você tem algo que realmente consegue validar.",
    },
    {
      number: 9,
      title: "Escreva os caminhos infelizes",
      insight: "É aqui que stories de iniciantes costumam parar cedo demais.",
      checklist: [
        "E se o extrato ainda não tiver sido gerado?",
        "E se o serviço de PDF estiver indisponível?",
        "E se não houver extratos para aquele mês?",
        "E se o cliente tiver múltiplas contas?",
        "E se o download do extrato falhar?",
      ],
      whyItHelps:
        "Você não vai precisar de um requisito para cada cenário imaginável. Mas você deve pelo menos saber quais importam antes que o desenvolvimento comece a chutar.",
    },
    {
      number: 10,
      title: "Documente os requisitos de dados",
      insight: "Qual informação essa funcionalidade realmente precisa?",
      list: [
        "ID do Cliente",
        "ID da Conta",
        "Mês do extrato",
        "Ano do extrato",
        "ID do Documento",
        "Formato do arquivo",
        "Status de disponibilidade do extrato",
      ],
      whyItHelps:
        "Você não está tentando desenhar o banco de dados. Você está garantindo que todo mundo concorde sobre quais informações a funcionalidade depende.",
    },
    {
      number: 11,
      title: "Exponha as dependências",
      insight: "A tela pode ser simples. A funcionalidade pode não ser.",
      list: [
        "Serviço de Gestão de Documentos",
        "Autenticação do cliente",
        "Processo de geração de extratos",
        "API de recuperação de extratos",
      ],
      whyItHelps:
        "Você não precisa resolver todas elas dentro da sua story. Mas precisa saber que elas existem antes que alguém se comprometa com uma data de entrega.",
    },
    {
      number: 12,
      title: "Desenhe o limite de escopo de forma explícita",
      insight: "Isso leva trinta segundos e evita uma quantidade surpreendente de confusão depois.",
      list: [
        "Envio de extratos por e-mail",
        "Extratos com mais de 24 meses",
        "Mudança no formato do PDF do extrato",
        "Geração de extratos avulsa",
      ],
      whyItHelps:
        "Agora, se alguém disser depois \"eu achei que também íamos enviar por e-mail\", você tem para onde apontar.",
    },
    {
      number: 13,
      title: "Saiba quando dividir a story",
      insight: "Uma story que não consegue ser entregue como uma única unidade de trabalho não é uma story só — são várias disfarçadas de uma.",
      compare: storySplitCompare,
      checklist: [
        "Por variação de regra — a mesma ação se comporta diferente sob regras de negócio diferentes?",
        "Por fonte de dados — se parte da story depende de um dado ou sistema que ainda não está pronto, essa parte é uma story separada",
        "Por interface — um fluxo web e um fluxo mobile para o mesmo resultado geralmente são duas stories",
        "Por caminho feliz vs. tratamento de exceção — tratamento de exceção complexo que precisa da sua própria conversa de design deveria ser separado",
      ],
      whyItHelps:
        "O teste rápido: se você não consegue descrever os critérios de aceitação em menos de um minuto, ou a story tem mais de cinco a sete CAs, é bem provável que sejam duas stories.",
    },
    {
      number: 14,
      title: "Mantenha suas questões em aberto visíveis",
      insight: "Não esconda questões não resolvidas no seu caderno. Escreva-as em vez de chutar.",
      list: [
        "Extratos de contas encerradas devem continuar acessíveis?",
        "Contas conjuntas estão incluídas?",
        "O período de retenção de 24 meses é configurável?",
      ],
      whyItHelps:
        "Um requisito com questões visíveis é muito mais seguro do que um requisito fingindo que tudo já está resolvido.",
    },
    {
      number: 15,
      title: "A story completa no Jira",
      insight: "Veja no que \"precisamos de um botão de download\" se transformou.",
      explanation:
        "A parte mais difícil não foi escrever Como... eu quero... para que... — isso levou uns vinte segundos. O trabalho de verdade foi entender tudo em volta disso.",
      template: completeJiraStory,
      templateLabel: "Copiar a story completa",
      whyItHelps:
        "O modelo ajuda. Mas são as perguntas que criam o requisito — essa é a diferença entre reescrever um pedido e realmente entendê-lo.",
    },
    {
      number: 16,
      title: "Seis erros que eu evitaria numa primeira story",
      insight: "Todos os seis aparecem o tempo todo, e todos os seis são fáceis de pegar antes de ir para produção.",
      list: [
        "Escrever a solução como se fosse o requisito — pare e pergunte o que eles realmente estão tentando alcançar.",
        "Deixar a story enorme — se ela não pode ser razoavelmente construída, testada e entendida como uma única mudança, divida.",
        "Escrever a implementação técnica cedo demais — descreva o comportamento de negócio, deixe a conversa de implementação acontecer com quem vai construir.",
        "Esquecer o caminho infeliz — uma story que só descreve o sucesso ainda não descreveu a funcionalidade.",
        "Assumir que todo mundo entende sua story — entregue para alguém que não estava na reunião e veja se a interpretação bate com a sua.",
        "Escrever critérios de aceitação que descrevem uma sensação — \"intuitivo\" ou \"fácil\" não é testável; descreva o resultado observável em vez disso.",
      ],
      whyItHelps:
        "A maioria desses erros não é difícil de corrigir. Eles só são fáceis de passar despercebidos nas suas primeiras stories, antes de pegá-los virar um hábito.",
    },
    {
      number: 17,
      title: "Monte seu próprio checklist de prontidão",
      insight: "Antes de considerar uma story pronta, confira essa lista.",
      checklist: [
        "Eu entendo o problema real, não só a solução pedida",
        "Eu sei exatamente quem é o usuário",
        "Eu entendo o resultado que ele precisa",
        "A story descreve valor, não só uma funcionalidade",
        "As regras de negócio estão registradas",
        "Os critérios de aceitação são testáveis, com uma afirmação por critério, e incluem casos negativos",
        "Caminhos de falha e exceções foram considerados",
        "As expectativas de dados estão claras",
        "As dependências estão visíveis",
        "Os limites de escopo estão explícitos",
        "As questões em aberto estão visíveis, não só na minha cabeça",
        "Alguém consegue entender essa story sem mim na sala",
      ],
      template: firstStoryChecklist,
      templateLabel: "Copiar Checklist",
      whyItHelps:
        "Uma story que passa por essa lista é uma story que qualquer pessoa consegue pegar, construir e testar sem precisar de você na sala.",
    },
  ],
};
