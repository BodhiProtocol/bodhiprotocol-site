import type { Playbook } from "@/types/content";

const investigationChecklist = `INVESTIGAÇÃO DE UAT PARA PRODUÇÃO

IMPACTO E CONTENÇÃO
[ ] Usuários, produtos, regiões e canais afetados identificados
[ ] Risco financeiro, de dado, regulatório e operacional avaliado
[ ] Workaround seguro, rollback ou controle de feature considerado

EXEMPLO COM FALHA
[ ] ID de transação ou registro capturado
[ ] Usuário, papel, canal e região registrados
[ ] Data e hora exatas registradas
[ ] Comportamento esperado escrito claramente
[ ] Comportamento real escrito claramente
[ ] Screenshot, resposta ou erro capturado

COMPARE OS AMBIENTES
[ ] Versão da aplicação
[ ] Configuração e feature flags
[ ] Dado de referência e mapeamentos
[ ] Permissões de usuário e serviço
[ ] Versões de API e integração
[ ] Stub de teste vs integração real
[ ] Jobs de batch, cache e timing
[ ] Formato, histórico e volume de dado

RASTREIE O FLUXO
[ ] Caminho da transação ponta a ponta mapeado
[ ] Primeiro ponto de divergência identificado
[ ] Impacto upstream e downstream checado
[ ] Transações relacionadas pesquisadas

CLASSIFIQUE
[ ] Defeito de código
[ ] Lacuna de requisito
[ ] Lacuna de cobertura de teste
[ ] Problema de configuração
[ ] Problema de dado
[ ] Problema de deploy

FECHE CORRETAMENTE
[ ] Decisão de negócio registrada
[ ] Requisito ou regra atualizados
[ ] Dado de UAT e testes de regressão atualizados
[ ] Cenário parecido com produção adicionado
[ ] Monitoramento ou alerta considerado
[ ] Funcionalidades relacionadas checadas para a mesma suposição
`;

// A prosa narrativa completa (incluindo as três tabelas de comparação) vive
// em components/ba-playbooks/funcionou-na-uat-por-que-falhou-em-producao-body.tsx,
// renderizada via o registro customPlaybookBodies em vez de a partir de
// `hacks`. Este é um espelho em texto simples usado só para calcular o
// tempo de leitura — veja a documentação do campo `bodyText` em
// types/content.ts.
const bodyText = `Segunda de manhã. Uma mensagem aparece no grupo do projeto: "Clientes não conseguem cancelar alguns pedidos. Isso funcionava na UAT. O que mudou?" O QA diz: "A gente testou o cancelamento. Passou." O Desenvolvimento diz: "O mesmo código foi para produção." A Operação diz: "Clientes reais ainda estão sendo afetados." Todo mundo pode estar dizendo a verdade. A funcionalidade pode passar na UAT e ainda assim falhar em produção, não porque a UAT foi inútil, mas porque a produção raramente é só a UAT com mais usuários. Ela tem dado, integrações, permissões, configuração, timing e volume diferentes. Mesmo código não significa o mesmo sistema.

Uma empresa indiana de e-commerce introduz o cancelamento de pedido self-service. O requisito diz que um cliente pode cancelar um pedido até ele ter sido despachado. Na UAT, o QA testa PLACED, READY_TO_PACK e DISPATCHED. Tudo passa. A funcionalidade vai ao ar. Depois um cliente tenta cancelar um pedido de tênis que ainda não foi despachado, mas o botão Cancelar pedido está faltando.

A UAT provou que a funcionalidade se comportou como esperado com o dado, as integrações, a configuração, os papéis e os cenários usados na UAT. Ela não provou que a produção enviaria o mesmo dado pelo mesmo caminho sob as mesmas condições. A UAT testa o comportamento esperado num mundo controlado. A produção introduz o mundo que você não controlou totalmente. Isso não torna isso automaticamente uma falha de teste — a investigação deveria começar pelas diferenças, não pela culpa.

Se a falha está causando perda financeira, expondo dado, bloqueando trabalho crítico ou afetando muitos usuários, a contenção vem primeiro: desative a funcionalidade, pause o processamento, faça rollback da release ou ofereça um workaround temporário.

Passo 1: preserve o exemplo com falha. Antes que alguém atualize dados ou mude configuração, capture o ID do pedido, cliente e tipo de conta, hora exata, canal, status mostrado ao cliente, status do sistema de armazém, comportamento esperado e real e a versão da release. Sem um exemplo específico, cada time investiga um problema ligeiramente diferente.

Passo 2: siga a transação, não as opiniões. O app pede os detalhes do pedido, o serviço de pedidos recupera o status de atendimento, o sistema de armazém retorna ALLOCATED, a regra de cancelamento checa se esse status é cancelável, ALLOCATED não está na lista permitida, o serviço retorna canCancel false, o app esconde o botão. A tela se comportou corretamente com base na resposta que recebeu. A primeira diferença significativa apareceu antes: o armazém de produção retornou um status que ninguém tinha usado na UAT. Pergunte onde o comportamento primeiro ficou diferente, não só onde a falha ficou visível.

Passo 3: compare a UAT e a produção lado a lado numa tabela — status do pedido, integração de armazém, regra de cancelamento, papel do cliente, canal, feature flag e versão da release. Isso muda a conversa de se o mesmo código foi implantado para as condições ao redor desse código.

Passo 4: cheque os sete lugares onde a produção costuma diferir. Dado — valores que nunca apareceram na UAT. Integrações — um stub ou simulador versus o sistema real. Configuração e feature flags — configurações que mudam o comportamento sem mudar o código. Papéis e permissões de usuário — o que um cliente real ou uma conta de serviço consegue ver e acessar. Timing — rodadas de batch, caches desatualizados, horários de corte, fusos horários, atualizações concorrentes. Volume e concorrência — filas, travamento, mensagens atrasadas, eventos duplicados. Deploy — confirmar o que realmente chegou em produção versus o que foi incluído na release.

Passo 5: volte para o requisito. "Cancelar até ser despachado" parece claro, mas o sistema implementou uma lista de status considerados como "não despachado", e essa lista não incluía ALLOCATED. A produção revelou uma suposição escondida dentro do requisito, não uma regra nova.

Passo 6: classifique o problema corretamente — defeito de código, lacuna de requisito, lacuna de cobertura de teste, problema de configuração, problema de dado ou problema de deploy. Um incidente pode ter várias causas contribuintes; a classificação melhora a correção em vez de atribuir a culpa a um time só.

Passo 7: corrija a regra, o teste e o ambiente. Adicione ALLOCATED ao mapeamento de cancelável, confirme a decisão com os donos de negócio, atualize a documentação, adicione o status ao dado de teste da UAT, substitua o stub simplificado pela lista completa de status de produção, adicione monitoramento para status desconhecidos e reteste em todos os canais.

O mesmo padrão aparece em toda indústria: bancos testam contas ACTIVE e BLOCKED enquanto a produção envia PENDING_REVIEW; a UAT de seguros tem uma apólice por cliente enquanto a produção tem clientes migrados com apólices sobrepostas; a UAT de saúde usa IDs de prestador atuais enquanto a produção ainda referencia IDs aposentados; a UAT de e-commerce internacional testa uma moeda e um armazém enquanto a produção adiciona moedas, regras fiscais e fusos horários; a UAT de capital markets testa operações limpas no horário de mercado enquanto a produção introduz eventos tardios e confirmações assíncronas. A pergunta útil não é quem deixou passar isso, mas qual condição de produção o modelo de UAT falhou em representar.

O trabalho do BA é manter a investigação conectada ao comportamento de negócio: transformar "está quebrado" num exemplo rastreável, declarar claramente o comportamento esperado e real, comparar as condições de UAT e produção, identificar o primeiro ponto de divergência, reunir os donos certos, expor regras e suposições faltando, registrar a decisão e garantir que o requisito e os testes de regressão sejam atualizados.

Oito perguntas para fazer durante o incidente: qual transação exata falhou, o que o usuário esperava versus o que aconteceu, o problema está limitado a certos usuários ou canais, esse cenário exato foi testado na UAT, a UAT usou os mesmos valores e integrações, onde a transação primeiro se comportou de forma diferente, isso é um defeito ou uma regra faltando e o que mais depende da mesma regra ou valor de dado.

Antes da próxima release, pergunte quais valores de produção não existem na UAT, quais integrações ou configurações diferem, quais papéis e casos extremos continuam sem teste e como o sistema vai sinalizar um valor desconhecido em vez de tratá-lo mal silenciosamente. Se o serviço de cancelamento tivesse sinalizado ALLOCATED como um status desconhecido, o time poderia ter encontrado a lacuna antes de um cliente encontrar.

A UAT não mentiu. Ela respondeu a pergunta que você fez. A produção expôs a pergunta que você esqueceu de fazer.`;

export const funcionouNaUatPorQueFalhouEmProducao: Omit<Playbook, "readingTime"> = {
  slug: "funcionou-na-uat-por-que-falhou-em-producao",
  title: "Funcionou na UAT. Por Que Falhou em Produção?",
  description:
    "Um playbook prático de BA para rastrear por que um comportamento testado muda depois do lançamento — e encontrar a primeira diferença real.",
  summary:
    "Um incidente real — uma funcionalidade de cancelamento de pedido que passou na UAT e falhou em produção — mostrando como preservar o exemplo com falha, rastrear a transação, comparar ambientes e encontrar a primeira diferença real antes de atribuir culpa.",
  category: "UAT",
  tags: ["UAT", "Produção", "causa raiz"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Passo",
  bodyText,
  audience: [
    "Business Analysts investigando uma funcionalidade que passou na UAT, mas falhou em produção",
    "Times de QA e Desenvolvimento triando um incidente pós-release",
    "Líderes de entrega e Product Owners lidando com defeitos de release",
    "Qualquer um que já ouviu \"mas a gente testou\" numa chamada de incidente",
  ],
  seoTitle: "Funcionou na UAT. Por Que Falhou em Produção?",
  seoDescription:
    "Um guia prático de Business Analyst para investigar por que uma funcionalidade passou na UAT, mas falhou em produção, com um canvas de investigação gratuito.",
  closingHeading: ["A UAT não mentiu.", "Ela respondeu a pergunta que você fez."],
  closingBody:
    "A produção expôs a pergunta que você esqueceu de fazer. Preserve uma falha. Rastreie a transação. Compare os ambientes. Encontre a primeira diferença. Volte para a regra de negócio.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Checklist de Investigação de UAT para Produção",
  relatedPlaybookSlugs: [
    "ninguem-consegue-reproduzir-o-problema-em-producao",
    "dois-sistemas-mostram-numeros-diferentes",
    "a-story-foi-arrastada-por-quatro-sprints",
  ],
  hacks: [
    {
      number: 1,
      title: "Dado",
      insight: "Procure valores que nunca apareceram na UAT.",
      explanation:
        "Campos faltando, registros históricos, duplicatas e formatos inesperados. ALLOCATED existia em produção, mas não no conjunto de teste da UAT.",
      whyItHelps: "A maioria dos incidentes \"funcionou na UAT\" remonta a um valor real de produção que o dado de teste nunca incluiu.",
    },
    {
      number: 2,
      title: "Integrações",
      insight: "A UAT pode usar um stub, simulador ou sistema downstream simplificado.",
      explanation:
        "Compare versões de API, campos, mapeamentos, autenticação, timeouts e retries. Um stub pode retornar três status limpos enquanto o sistema real retorna muitos mais.",
      whyItHelps: "Um stub que passa prova o contrato de integração como foi entendido — não a integração como ela realmente se comporta em produção.",
    },
    {
      number: 3,
      title: "Configuração e feature flags",
      insight: "O código pode ser idêntico enquanto as configurações mudam seu comportamento.",
      explanation: "Compare valores de regra de negócio, limites, configurações de país ou produto, feature flags e regras de roteamento.",
      whyItHelps: "\"O mesmo código foi para produção\" ainda pode ser verdade enquanto o comportamento é totalmente diferente, se uma configuração difere.",
    },
    {
      number: 4,
      title: "Papéis e permissões de usuário",
      insight: "Uma funcionalidade testada com uma conta de administrador pode se comportar de forma diferente para um cliente real.",
      explanation: "Cheque tanto o que o usuário consegue ver quanto o que a conta de serviço consegue acessar.",
      whyItHelps: "O comportamento restrito por papel é uma das diferenças mais fáceis de passar despercebida, porque o testador da UAT raramente tem o mesmo acesso que um usuário de produção.",
    },
    {
      number: 5,
      title: "Timing",
      insight: "Algumas falhas só existem num momento específico.",
      explanation:
        "Uma rodada de batch, cache desatualizado, horário de corte, conversão de fuso horário, problema de ordem de eventos ou atualização concorrente — a UAT comum durante o dia raramente toca nisso.",
      whyItHelps: "Um pagamento perto da meia-noite ou uma mudança de horário de verão pode expor suposições de timing que nenhum script de UAT nunca exercitou.",
    },
    {
      number: 6,
      title: "Volume e concorrência",
      insight: "Uma transação de teste limpa não é o mesmo que milhares de clientes agindo juntos.",
      explanation: "A produção pode introduzir filas, travamento, mensagens atrasadas, eventos duplicados ou timeouts.",
      whyItHelps: "Bugs de concorrência costumam ser invisíveis na UAT por construção — raramente há carga simultânea suficiente para disparar eles.",
    },
    {
      number: 7,
      title: "Deploy",
      insight: "\"Incluído na release\" e \"ativo em produção\" nem sempre são a mesma afirmação.",
      explanation: "Confirme a versão da aplicação, scripts de banco de dados, configuração, dado de referência, jobs agendados e releases dependentes que realmente chegaram em produção.",
      whyItHelps: "Uma atualização de dado de referência faltando ou uma release dependente inativa pode desfazer silenciosamente uma funcionalidade que foi lançada corretamente.",
    },
  ],
};
