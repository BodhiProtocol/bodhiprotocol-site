import type { Playbook } from "@/types/content";

// A narrativa completa + os dois exemplos trabalhados vivem em
// components/ba-playbooks/modelo-de-analise-de-impacto-body.tsx (renderizada
// via o registro customPlaybookBodies, não a partir de `hacks`). Este é um
// espelho em texto simples usado só para calcular o tempo de leitura — veja
// a documentação do campo `bodyText` em types/content.ts.
const bodyText = `O requisito mudou uma frase. De alguma forma cinco times agora estão na reunião. Isso é análise de impacto. Uma mudança pode parecer minúscula no Jira e ainda assim tocar processos, sistemas, dado, usuários, controles e relatórios ao redor dela. Seu trabalho como BA não é prever tudo. É tornar o raio de impacto visível antes da produção fazer isso por você.

Vamos usar duas mudanças que soam simples. Índia, reembolso de e-commerce: se um pedido é cancelado antes do despacho, reembolse o cliente instantaneamente. Global, onboarding de funcionário: dê aos novos funcionários acesso automático ao sistema na data de entrada deles. Uma frase cada. Muita coisa escondida por baixo.

O que é análise de impacto? Ela pergunta: se a gente mudar isso, o que mais pode se mover? Não só qual tela muda, mas também qual processo muda, quais sistemas e integrações estão envolvidos, algum dado muda, quem trabalha de forma diferente, controles estão sendo adicionados ou contornados, quem consome o resultado downstream, o que poderia falhar, o que precisa de teste, monitoramento ou comunicação. Uma boa análise de impacto transforma "isso parece simples" em "aqui está o que a gente checou antes de chamar isso de simples."

Comece pela mudança. Antes de rastrear o impacto, escreva quatro coisas: o que acontece hoje, o que deveria acontecer depois da mudança, por que a mudança é necessária, o que está explicitamente fora de escopo. Para o exemplo de reembolso: hoje, o cliente cancela, uma solicitação de reembolso é criada e o provedor de pagamento a processa depois. Depois da mudança, um cancelamento elegível dispara o reembolso imediatamente. Essa palavra — elegível — já nos dá perguntas. Quais pedidos se qualificam? O que significa "antes do despacho"? E se o status da transportadora estiver atrasado? "Instantâneo" significa iniciado instantaneamente ou creditado instantaneamente? A análise de impacto costuma começar descobrindo que uma frase não está tão resolvida quanto parece. Agora rastreie isso em dez áreas.

A Checagem de Impacto em 10 Áreas.

1. Processo de negócio. Entenda o processo antes dos sistemas. Reembolso hoje: cancelamento, reembolso solicitado, reembolso processado, cliente espera. Depois: cancelamento, elegibilidade checada, reembolso disparado, cliente notificado. Isso poderia mudar a elegibilidade de reembolso, filas de reembolso manual, o atendimento ao cliente, os acertos com vendedores, a reconciliação financeira. Onboarding hoje: RH cria o funcionário, gestor solicita acesso, TI aprova, acesso é criado. Depois: RH cria o funcionário, o papel é avaliado, o acesso é criado na data de entrada. Agora aprovações de gestor, suporte de TI e controles de segurança podem funcionar de forma diferente. O requisito não só mudou um sistema — mudou um processo.

2. Usuários e times. Pergunte: quem faz algo diferente depois dessa mudança? Para a mudança de reembolso, não é só o cliente — pode afetar o atendimento ao cliente, as operações de reembolso, o financeiro, os vendedores, os times de fraude. Para o onboarding, pode afetar novos funcionários, RH, gestores, suporte de TI, segurança, donos de aplicação. Para cada grupo, cheque se o trabalho, as permissões, o treinamento ou a comunicação precisam mudar. Usuários secundários são fáceis de esquecer — até encontrarem a mudança em produção.

3. Sistemas e integrações. Pergunte quais aplicações participam da jornada, não só qual aplicação é dona da tela. O caminho do reembolso pode ser App do Cliente até Gestão de Pedidos até Serviço de Reembolso até Gateway de Pagamento até Reconciliação Financeira. Notificações, relatórios e ferramentas de suporte também podem consumir o resultado. Para cada integração, pergunte: a requisição ou a resposta muda, um campo novo é obrigatório, consumidores existentes são afetados, o que acontece no timeout, a requisição pode ser tentada de novo com segurança, a mudança é retrocompatível. O requisito talvez nunca mencione uma API. A mudança ainda pode depender de uma.

4. Dado. Mudanças costumam criar requisitos de dado que ninguém mencionou. Pergunte: a gente precisa de um campo novo, um campo existente muda de significado, quem cria e é dono do dado, quem o consome, o que acontece quando ele está atrasado, faltando ou errado. O onboarding automático pode depender do ID do funcionário, data de entrada, cargo, departamento, gestor, localização e status de emprego. O requisito diz "criar acesso automaticamente." A pergunta real é: que dado confiável nos diz qual acesso criar?

5. Regras de negócio, controles e segurança. Pergunte: uma aprovação está mudando, um controle poderia ser contornado, permissões estão envolvidas, dado sensível está exposto, uma trilha de auditoria é necessária, regras regulatórias ou de retenção se aplicam. Imagine fazer onboarding de funcionários em Mumbai, Londres e Nova York. Localização, tipo de emprego e cargo podem mudar quais sistemas e dados eles conseguem acessar. Um contratado não deveria receber acesso privilegiado simplesmente porque um cargo foi digitado errado. Você pode precisar de regras como: acesso padrão segue o cargo aprovado do funcionário, acesso privilegiado sempre exige aprovação separada, contratados recebem acesso com prazo definido, o acesso não pode começar antes da data de entrada, o acesso é cancelado se o funcionário não entrar. Automação não remove controles — ela muda onde eles acontecem.

6. Downstream, relatórios e reconciliação. Uma das melhores perguntas de BA é: quem consome isso depois da gente? Para a mudança de reembolso: o financeiro pode receber reembolsos mais cedo, o suporte pode ver novos status, os relatórios podem calcular o tempo de retorno de forma diferente, a fraude pode precisar de alertas novos, os vendedores podem ver ajustes de acerto mais cedo. Suponha que o Financeiro rastreia reembolso solicitado, reembolso em processamento, reembolso concluído. Um reembolso instantâneo pode encurtar ou remover um estado. Dashboards, cálculos de SLA e regras de reconciliação poderiam então mudar também. Seu sistema pode funcionar perfeitamente e ainda assim quebrar o processo de outra pessoa. Não pare em "nossa parte funciona." Siga o resultado mais um passo adiante.

7. Falha e recuperação. Caminhos felizes são fáceis. As falhas são onde a análise de impacto ganha seu valor. Para a mudança de reembolso, o que acontece se o pedido é cancelado, mas o reembolso falha, o reembolso funciona, mas a notificação falha, o gateway de pagamento dá timeout, o sistema tenta de novo a mesma requisição, uma parte funciona e a outra não? O cliente poderia receber dois reembolsos? Para o onboarding, e se o acesso for criado, mas a data de entrada do funcionário for mudada depois, ou o funcionário nunca entrar? Essas não são só perguntas técnicas. Elas definem o comportamento de negócio.

8. Dado histórico e migração. Um comportamento novo levanta uma pergunta fácil de esquecer: o que acontece com as coisas já em andamento? Solicitações de reembolso existentes usam o fluxo novo? Reembolsos pendentes deveriam ser reprocessados? Funcionários atuais precisam ter o acesso deles recalculado? Um campo novo precisa ser preenchido para registros antigos? Versões antigas e novas conseguem coexistir durante o rollout? Às vezes a funcionalidade é simples. Migrar com segurança do mundo antigo para o novo não é.

9. Performance e limites operacionais. "Funciona" é diferente de "funciona sob carga real." Pergunte: quantas requisições poderiam chegar de uma vez, existe uma expectativa de tempo de resposta, existem limites de taxa do provedor de pagamento ou da API, a automação poderia criar uma fila grande no dia de entrada, que monitoramento ou alerta é necessário, quem trata exceções. Um fluxo de reembolso que funciona para dez requisições pode se comportar de forma muito diferente durante uma liquidação de festival. Um fluxo de onboarding pode enfrentar centenas de novos contratados depois de uma aquisição. Volume é parte do requisito, mesmo quando o Jira esquece de mencionar isso.

10. Teste, release e rollback. A análise de impacto dá ao QA o mapa. O teste explora o mapa. Para o onboarding, os cenários podem incluir um funcionário entrando hoje, entrando semana que vem, uma mudança de data de entrada, um registro cancelado, um cargo ou gestor faltando, uma mudança de departamento antes da entrada, uma falha parcial de provisionamento, acesso privilegiado exigindo aprovação, o mesmo evento recebido duas vezes. Também decida o que exige teste de regressão, se teste de integração, segurança ou performance é necessário, se a mudança pode ser lançada gradualmente, como a gente vai saber que está funcionando, qual é o plano de rollback e quem dá suporte depois do release. O release não é a última linha do ticket. Ele é parte da mudança.

Leve isso com você. Baixe o checklist para impressão, o modelo editável e dois exemplos completos abaixo.

Antes de dizer "sem impacto", percorra processo de negócio, usuários e times, sistemas e integrações, dado, regras e controles, downstream e reconciliação, falha e recuperação, dado histórico e migração, performance e operações, teste e release e suposições, dependências e perguntas em aberto. Se você checou tudo isso e não encontrou nada, ótimo. Agora "sem impacto" realmente significa alguma coisa.

Uma pergunta para levar para sua próxima reunião: quem descobre sobre essa mudança depois que nosso sistema estiver pronto? Essa pergunta costuma revelar um sistema downstream, um time de operações, um relatório, um controle ou alguém que ninguém convidou para a primeira reunião. Análise de impacto não é sobre fazer a mudança parecer complicada. É sobre encontrar a complexidade antes dos seus usuários encontrarem.`;

export const modeloDeAnaliseDeImpacto: Omit<Playbook, "readingTime"> = {
  slug: "modelo-de-analise-de-impacto",
  title: "Modelo de Análise de Impacto",
  description: "Encontre o raio de impacto antes da produção fazer isso.",
  summary:
    "Um framework prático de análise de impacto em 10 áreas — processo de negócio, usuários, sistemas, dado, controles, downstream, falha, migração, performance e teste — trabalhado numa mudança de reembolso na Índia e numa mudança global de onboarding, mais um checklist, modelo editável e dois exemplos completos gratuitos para baixar.",
  category: "Templates",
  tags: ["Requisitos", "análise-de-impacto", "modelos"],
  author: "Surya",
  date: "2026-08-13",
  audience: [
    "Recém-formados e aspirantes a Business Analyst aprendendo a dimensionar uma mudança corretamente",
    "Business Analysts escrevendo análise de impacto para um refinamento ou pedido de mudança",
    "QAs e desenvolvedores que precisam saber o que mais uma mudança pequena poderia tocar",
    "Times de produto tentando fazer \"sem impacto\" significar alguma coisa antes da produção provar o contrário",
  ],
  bodyText,
  seoTitle: "Modelo de Análise de Impacto para Business Analysts | BodhiProtocol",
  seoDescription:
    "Um framework prático de análise de impacto em 10 áreas e um modelo gratuito para Business Analysts — processo de negócio, usuários, sistemas, dado, controles, efeitos downstream, falha, migração, performance e teste.",
  closingHeading: ["Quem descobre sobre essa mudança", "depois que nosso sistema estiver pronto?"],
  closingBody:
    "Essa pergunta costuma revelar um sistema downstream, um time de Operações, um relatório, um controle — ou alguém que ninguém convidou para a primeira reunião. Análise de impacto não é sobre fazer a mudança parecer complicada. É sobre encontrar a complexidade antes dos seus usuários encontrarem.",
  relatedPlaybookSlugs: [
    "modelo-de-user-story-para-business-analyst",
    "como-escrever-criterios-de-aceitacao",
    "o-que-front-office-middle-office-e-back-office-fazem",
  ],
  hacks: [
    {
      number: 1,
      title: "Processo de negócio",
      insight: "Entenda o processo antes dos sistemas.",
      whyItHelps: "O requisito não só mudou um sistema — mudou um processo.",
    },
    {
      number: 2,
      title: "Usuários e times",
      insight: "Quem faz algo diferente depois dessa mudança?",
      whyItHelps: "Usuários secundários são fáceis de esquecer — até encontrarem a mudança em produção.",
    },
    {
      number: 3,
      title: "Sistemas e integrações",
      insight: "Pergunte quais aplicações participam da jornada, não só qual é dona da tela.",
      whyItHelps: "O requisito talvez nunca mencione uma API. A mudança ainda pode depender de uma.",
    },
    {
      number: 4,
      title: "Dado",
      insight: "Mudanças costumam criar requisitos de dado que ninguém mencionou.",
      whyItHelps: "\"Criar acesso automaticamente\" não é a pergunta real — dado confiável é.",
    },
    {
      number: 5,
      title: "Regras, controles e segurança",
      insight: "Uma aprovação está mudando, ou um controle poderia ser contornado?",
      whyItHelps: "Automação não remove controles. Ela muda onde eles acontecem.",
    },
    {
      number: 6,
      title: "Downstream, relatórios e reconciliação",
      insight: "Quem consome isso depois da gente?",
      whyItHelps: "Seu sistema pode funcionar perfeitamente e ainda assim quebrar o processo de outra pessoa.",
    },
    {
      number: 7,
      title: "Falha e recuperação",
      insight: "Caminhos felizes são fáceis. As falhas são onde a análise de impacto ganha seu valor.",
      whyItHelps: "Essas não são só perguntas técnicas. Elas definem o comportamento de negócio.",
    },
    {
      number: 8,
      title: "Dado histórico e migração",
      insight: "O que acontece com as coisas já em andamento?",
      whyItHelps: "Às vezes a funcionalidade é simples. Migrar com segurança do mundo antigo para o novo não é.",
    },
    {
      number: 9,
      title: "Performance e limites operacionais",
      insight: "\"Funciona\" é diferente de \"funciona sob carga real.\"",
      whyItHelps: "Volume é parte do requisito — mesmo quando o Jira esquece de mencionar isso.",
    },
    {
      number: 10,
      title: "Teste, release e rollback",
      insight: "A análise de impacto dá ao QA o mapa. O teste explora o mapa.",
      whyItHelps: "O release não é a última linha do ticket. Ele é parte da mudança.",
    },
    {
      number: 11,
      title: "Suposições, dependências e perguntas em aberto",
      insight: "Escreva no que você está confiando e o que ainda está sem resolver.",
      whyItHelps: "Uma pergunta em aberto é normal. Uma pergunta em aberto escondida não é.",
    },
  ],
};
