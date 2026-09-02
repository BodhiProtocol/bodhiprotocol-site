import type { Playbook } from "@/types/content";

const investigationChecklist = `CHECKLIST DE INVESTIGAÇÃO DE PROBLEMA EM PRODUÇÃO

ESCUTE E CAPTURE
[ ] O que o usuário estava tentando fazer foi capturado
[ ] Timestamp, ID de usuário/referência e ID de transação/pedido registrados
[ ] Comportamento esperado vs real anotado
[ ] Screenshot ou erro capturado

COLETE EVIDÊNCIAS
[ ] Logs da aplicação extraídos
[ ] Respostas de API capturadas
[ ] IDs de correlação ou trace encontrados
[ ] Uma jornada com falha seguida do início ao fim

ENTENDA O CONTEXTO
[ ] Papel e permissões do usuário checados
[ ] Dispositivo, navegador e versão do app checados
[ ] Localização, rede e fuso horário checados
[ ] Dado e estado da conta checados
[ ] Timing (período de pico, batch, agendamento) checado
[ ] Sequência imediatamente anterior à falha revisada

COMPARE OS AMBIENTES
[ ] Dado de UAT vs Produção comparado
[ ] Configuração e feature flags comparadas
[ ] Integrações e versões de serviço comparadas
[ ] Tráfego, infraestrutura e agendamento comparados

REPLIQUE DE FORMA MAIS INTELIGENTE
[ ] Mesmo dado, tipo de usuário e dispositivo recriados
[ ] Mesma configuração e caminho de integração recriados
[ ] Mesma sequência e timing recriados
[ ] Menor condição de falha reproduzida

ISOLE E ESTREITE
[ ] Uma variável mudada por vez
[ ] Condição de gatilho documentada
[ ] "Falha às vezes" virou "falha quando X é verdadeiro"

PROVE E CORRIJA
[ ] Causa raiz explicada
[ ] Condição de falha original verificada depois da correção
[ ] Cenários relacionados checados
[ ] Monitoramento atualizado para detectar recorrência

FECHE CORRETAMENTE
[ ] Usuários ou times de negócio afetados informados
[ ] Aprendizado documentado
`;

// A prosa narrativa completa vive em
// components/ba-playbooks/ninguem-consegue-reproduzir-o-problema-em-producao-body.tsx,
// renderizada via o registro customPlaybookBodies em vez de a partir de
// `hacks` — mesmo padrão de uat-passou-mas-producao-falhou. Este é um
// espelho em texto simples usado só para calcular o tempo de leitura — veja
// a documentação do campo `bodyText` em types/content.ts.
const bodyText = `Um usuário relata que pagamentos falham aleatoriamente. O Desenvolvimento tenta e funciona. O QA tenta na UAT e funciona. Depois vem a frase que pode matar uma investigação silenciosamente: "a gente não consegue reproduzir." Isso não significa que o problema não existe. Significa que o time ainda não reproduziu as condições que o criam — e é aí que a investigação começa.

Imagine uma plataforma de e-commerce. Alguns clientes dizem que pagamentos às vezes falham depois que eles clicam em Pagar Agora. Nenhum padrão óbvio. O QA roda vinte pagamentos com sucesso na UAT. O Desenvolvimento tenta localmente e funciona. O monitoramento de produção não mostra nenhuma queda importante. O erro é rodar o mesmo teste de novo e de novo. A pergunta melhor é: o que foi diferente quando a falha aconteceu? Vamos seguir um pagamento que falhou e descobrir.

Passo um é escutar e capturar. Não comece com "você consegue reproduzir de novo?" Comece com o que realmente aconteceu: o que o usuário estava tentando fazer, quando aconteceu, o que ele esperava, o que aconteceu em vez disso, se já aconteceu antes, se tentar de novo funcionou. Capture qualquer evidência que exista — timestamp, ID de usuário ou referência, ID de transação ou pedido, erro, screenshot, sequência. "O pagamento falhou ontem" não dá ao time por onde começar; "O Pedido 78431 falhou às 14:07 depois da verificação de OTP" dá. No nosso caso, o time captura o pedido 78431, 14:07, Android, um cartão internacional, falha depois da verificação de OTP. Já ali, "aleatório" ficou um pouco menos aleatório.

Passo dois é coletar evidências, antes que elas desapareçam. Problemas intermitentes são mais fáceis de investigar enquanto a evidência ainda existe: logs da aplicação, respostas de API, IDs de correlação ou trace, timestamps, histórico de auditoria, monitoramento, detalhes de requisição/resposta onde for apropriado, sempre através de acesso aprovado e mascaramento. O objetivo não é mais logs — é seguir uma jornada com falha. O time rastreia o pedido 78431: a requisição de pagamento chegou na aplicação, passou pela verificação de OTP, e um serviço de pagamento downstream a rejeitou. Agora eles sabem onde olhar a seguir.

Passo três é entender o contexto — o que foi diferente? A mesma funcionalidade pode se comportar de forma diferente dependendo do que a cerca: papel e permissões do usuário, dispositivo e versão do app, localização e rede, estado da conta e valor, timing (períodos de pico, janelas de batch) e a sequência imediatamente anterior à falha. Você está procurando um padrão escondido dentro da palavra "aleatório." Comparando transações com sucesso e com falha, o time percebe que a maioria das falhas envolve cartões internacionais. Essa vira a próxima hipótese.

Passo quatro é comparar ambientes, não só código. "Mesmo código, então deveria se comportar do mesmo jeito" é uma suposição comum, mas falsa — a produção pode diferir da UAT em dado, configuração, feature flags, permissões, integrações, versões de serviço, tráfego, comportamento de rede, agendamentos e infraestrutura. A pergunta é o que existe na produção que o ambiente de teste não reproduz. Aqui, a UAT usa um provedor de pagamento de teste, enquanto a produção roteia certos pagamentos internacionais através de outro provedor inteiramente. Mesma aplicação, caminho diferente.

Passo cinco é replicar de forma mais inteligente — recriar condições, não só passos. Repetir login, selecionar produto, pagar, falha pode não recriar o problema. Em vez disso, combine as condições ao redor: mesmo dado, mesmo tipo de usuário, mesmo dispositivo e versão do app, mesma configuração, mesmo caminho de integração, mesma sequência, timing ou carga parecidos onde for seguro. O objetivo é o menor conjunto de condições que dispara a falha, não uma cópia irresponsável da produção. O QA testa um cartão internacional através da mesma rota de pagamento com um payload parecido, e a falha aparece — pela primeira vez, o time consegue reproduzir.

Passo seis é aumentar a visibilidade, para quando o sistema não está te contando o suficiente. Às vezes um problema não pode ser reproduzido porque o sistema não expõe evidência suficiente, e essa ausência já é uma informação útil. O time pode precisar de logging mais estruturado, IDs de correlação, métricas, alertas, eventos de auditoria, diagnósticos temporários ou monitoramento mais seguro no nível da funcionalidade. Um BA não precisa desenhar a plataforma de observabilidade, mas pode perguntar: se isso acontecer de novo, que evidência a gente vai precisar para provar onde falhou? Isso pode virar um requisito.

Passo sete é isolar e estreitar — mudar uma coisa por vez. Com uma hipótese em mãos, compare doméstico vs internacional, uma moeda vs outra, mobile vs web, cliente existente vs novo, um provedor de pagamento vs outro, uma configuração vs outra — sem mudar cinco variáveis juntas. O objetivo é transformar "falha às vezes" em "falha quando essas condições são verdadeiras." O time eventualmente isola o gatilho: um cartão internacional, um provedor de pagamento específico e um endereço contendo um caractere especial. A falha não é mais aleatória.

Passo oito é provar e corrigir — não pare em "provavelmente." A causa raiz: um serviço de pagamento downstream rejeita certos caracteres de endereço por causa de um problema de codificação. Agora o time tem gatilho, ponto de falha e causa raiz. Depois da correção, verifique se a condição de falha original agora funciona, se os cenários relacionados continuam funcionando, se a correção se comporta corretamente sob condições parecidas com a produção e se o monitoramento consegue detectar recorrência onde for apropriado. "O desenvolvedor disse que corrigiu" não é encerramento. Evidência é encerramento.

Quando ainda não há uma hipótese forte, olhe algumas áreas amplas em busca de uma melhor: dado (nulos, formatos inesperados, valores de fronteira, registros antigos ou migrados), configuração (feature flags, variáveis de ambiente, limites, regras de roteamento), código e lógica (casos extremos, condições de corrida, tratamento de erro, transições de estado), dependências (serviços de terceiros, timeouts, problemas de rede, diferenças de versão), usuário e acesso (permissões, papéis, direitos, segmentos de cliente) e timing e carga (tráfego de pico, jobs agendados, processamento assíncrono, concorrência). Não marque caixas cegamente — use essas áreas para gerar hipóteses melhores.

O erro de BA a evitar: um usuário diz que falhou, o time diz que testou e funciona, e as duas afirmações podem ser verdadeiras. Não transforme a investigação num debate sobre quem está certo. Pergunte o que foi diferente quando falhou. Fique curioso, não defensivo.

Antes de fechar o problema, confirme: a gente consegue explicar a causa raiz, a gente consegue reproduzir o gatilho ou provar pela evidência, a condição de falha original foi verificada depois da correção, os cenários relacionados foram checados, o monitoramento é suficiente se acontecer de novo, os usuários ou times de negócio afetados foram informados e o aprendizado foi documentado? Às vezes um problema intermitente não pode ser tornado perfeitamente determinístico — tudo bem. O encerramento deveria se basear em evidência, não em exaustão.

"Não conseguimos reproduzir" não é uma causa raiz. É um status de investigação. Se o usuário está enfrentando isso, o problema é real — mesmo quando seu teste passa. Não fique repetindo o mesmo teste esperando que o bug apareça. Capture a jornada com falha. Compare as condições. Encontre o que mudou. Estreite o gatilho. Depois prove. Uma boa investigação transforma "aleatório" num padrão — e um padrão numa correção.`;

export const ninguemConsegueReproduzirOProblemaEmProducao: Omit<Playbook, "readingTime"> = {
  slug: "ninguem-consegue-reproduzir-o-problema-em-producao",
  title: "Ninguém Consegue Reproduzir o Problema em Produção",
  description:
    "Um playbook prático de BA para investigar problemas intermitentes em produção que ninguém consegue reproduzir sob demanda.",
  summary:
    "Uma investigação real de falha de pagamento mostrando como capturar a história de verdade, preservar evidências, comparar UAT e produção, replicar as condições reais e isolar o gatilho antes de fechar um problema que ninguém consegue reproduzir sob demanda.",
  category: "UAT",
  tags: ["Produção", "UAT", "causa raiz"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Passo",
  bodyText,
  audience: [
    "Business Analysts investigando problemas intermitentes ou difíceis de reproduzir em produção",
    "Times de QA e Desenvolvimento triando um incidente do tipo \"funciona para a gente\"",
    "Times de Suporte e Operações coletando evidências de usuários afetados",
    "Qualquer um que já ouviu \"a gente não consegue reproduzir\" e precisa de um próximo passo",
  ],
  seoTitle: "Ninguém Consegue Reproduzir o Problema em Produção",
  seoDescription:
    "Um guia prático de Business Analyst para investigar problemas intermitentes e difíceis de reproduzir em produção — de capturar a história de verdade até isolar o gatilho, com um checklist de investigação gratuito.",
  closingHeading: ["“Não conseguimos reproduzir” não é uma causa raiz.", "É um status de investigação."],
  closingBody:
    "Se o usuário está enfrentando isso, o problema é real — mesmo quando seu teste passa. Capture a jornada com falha. Compare as condições. Encontre o que mudou. Estreite o gatilho. Depois prove. Uma boa investigação transforma “aleatório” num padrão — e um padrão numa correção.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Checklist de Investigação de Problema em Produção",
  relatedPlaybookSlugs: [
    "funcionou-na-uat-por-que-falhou-em-producao",
    "dois-sistemas-mostram-numeros-diferentes",
  ],
  hacks: [
    {
      number: 1,
      title: "Escute & Capture",
      insight: "Consiga a história de verdade, não \"você consegue reproduzir de novo?\"",
      explanation:
        "Pergunte o que o usuário estava tentando fazer, quando aconteceu, o que ele esperava e o que aconteceu em vez disso. Capture timestamp, ID de usuário/referência, ID de transação/pedido, erro e screenshot.",
      whyItHelps: "\"O Pedido 78431 falhou às 14:07 depois da verificação de OTP\" dá ao time por onde começar. \"Pagamentos falham aleatoriamente\" não dá.",
    },
    {
      number: 2,
      title: "Colete Evidências",
      insight: "Preserve a jornada com falha antes que ela desapareça.",
      explanation:
        "Logs da aplicação, respostas de API, IDs de correlação ou trace, timestamps, histórico de auditoria e monitoramento — coletados através de acesso aprovado e mascaramento.",
      whyItHelps: "O objetivo não é mais logs. É seguir uma jornada com falha do início ao fim.",
    },
    {
      number: 3,
      title: "Entenda o Contexto",
      insight: "Encontre o que foi diferente: usuário, dispositivo, localização, dado, timing, sequência.",
      explanation:
        "A mesma funcionalidade pode se comportar de forma diferente dependendo do que a cerca. Compare transações com sucesso e com falha para encontrar o padrão escondido dentro de \"aleatório.\"",
      whyItHelps: "A maioria das falhas não é aleatória — elas se agrupam em torno de uma condição que ninguém ainda nomeou.",
    },
    {
      number: 4,
      title: "Compare Ambientes",
      insight: "\"Mesmo código\" não significa o mesmo sistema.",
      explanation:
        "A produção pode diferir da UAT em dado, configuração, feature flags, permissões, integrações, versões de serviço, tráfego e infraestrutura.",
      whyItHelps: "Pergunte o que existe na produção que seu ambiente de teste não reproduz.",
    },
    {
      number: 5,
      title: "Replique de Forma Mais Inteligente",
      insight: "Recrie condições, não só passos.",
      explanation:
        "Combine o mesmo dado, tipo de usuário, dispositivo, configuração, caminho de integração, sequência e timing — o menor conjunto de condições que dispara a falha.",
      whyItHelps: "Repetir os passos clique a clique do usuário raramente recria um problema intermitente; recriar as condições ao redor recria.",
    },
    {
      number: 6,
      title: "Aumente a Visibilidade",
      insight: "Às vezes o sistema não está te contando o suficiente.",
      explanation:
        "Logging mais estruturado, IDs de correlação, métricas, alertas, eventos de auditoria ou diagnósticos temporários podem transformar uma falha invisível numa rastreável.",
      whyItHelps: "\"Se isso acontecer de novo, que evidência a gente vai precisar para provar onde falhou?\" pode virar um requisito.",
    },
    {
      number: 7,
      title: "Isole & Estreite",
      insight: "Mude uma coisa por vez.",
      explanation:
        "Doméstico vs internacional, um provedor vs outro, mobile vs web — estreite a hipótese sem mudar cinco variáveis juntas.",
      whyItHelps: "Transforma \"falha às vezes\" em \"falha quando essas condições são verdadeiras.\"",
    },
    {
      number: 8,
      title: "Prove & Corrija",
      insight: "Não pare em \"provavelmente.\"",
      explanation:
        "Verifique se a condição de falha original agora funciona, se os cenários relacionados continuam funcionando, se a correção se sustenta sob condições parecidas com a produção e se o monitoramento consegue detectar recorrência.",
      whyItHelps: "\"O desenvolvedor disse que corrigiu\" não é encerramento. Evidência é encerramento.",
    },
  ],
};
