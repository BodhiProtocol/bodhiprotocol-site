import { Checklist } from "@/components/ba-playbooks/checklist";
import { FieldLabel } from "@/components/ba-playbooks/field-label";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

// Tradução da versão em inglês em new-project-discovery-playbook-body.tsx.
// Narrativa dos primeiros 30 dias (um projeto fictício de seguros, um
// exemplo global) em vez de uma lista de dicas independentes — por isso,
// como os outros playbooks narrativos, renderiza como um corpo bespoke em
// vez de cards numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx. O DiscoveryMapDiagram é o visual
// bespoke deste playbook — segue a regra "bespoke, não templatizado" do
// CLAUDE.md, ancorado no próprio mapa de seis perguntas do artigo. Omite o
// bloco final de DownloadCard só em inglês do original.

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-brand/40 pl-3 text-sm font-medium text-foreground/90 italic">
      {children}
    </p>
  );
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
        {String(number).padStart(2, "0")}
      </span>
      <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

function PhaseDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-4">
      <span className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-brand uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

function LabeledPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 px-3.5 py-3 text-sm">
      <p className="font-mono text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-col gap-1.5 text-foreground/90">{children}</div>
    </div>
  );
}

function TwoPanel({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-brand/20 bg-brand/[0.04] px-3.5 py-2.5 text-sm font-medium text-foreground/90">
      {children}
    </p>
  );
}

function DecisionMapTable() {
  const rows = [
    { decision: "O que torna um sinistro completo?", owner: "Operação de Sinistros" },
    { decision: "Quais sinistros exigem revisão de fraude?", owner: "Risco de Fraude" },
    { decision: "O que os clientes conseguem ver?", owner: "Produto + Compliance" },
    { decision: "Quando o pagamento pode ser liberado?", owner: "Sinistros + Financeiro" },
    { decision: "Como a solução será implementada?", owner: "Tecnologia" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[460px] text-left text-sm">
        <caption className="sr-only">Mapa de decisão da AaravCare — decisão e o papel responsável</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decisão
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Pessoa ou papel responsável
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.decision}>
              <td className="px-3 py-2">{row.decision}</td>
              <td className="px-3 py-2 font-medium">{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurrentVsProposedTable() {
  const rows = [
    { statement: "Clientes atualmente enviam documentos por e-mail", type: "Estado atual" },
    { statement: "Clientes deveriam enviar documentos por um portal", type: "Mudança proposta" },
    {
      statement: "O portal deve suportar arquivos PDF e JPEG até o limite de tamanho aprovado",
      type: "Requisito — uma vez confirmado",
    },
    { statement: "A IA vai checar todo documento médico automaticamente", type: "Ideia ou suposição" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <caption className="sr-only">
          Afirmações da AaravCare classificadas em estado atual, proposta, requisito ou suposição
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Afirmação
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              O que ela realmente é
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.statement}>
              <td className="px-3 py-2">{row.statement}</td>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DecisionLogTable() {
  const rows = [
    {
      decision: "Sinistros podem ser salvos como rascunho",
      status: "Aprovada",
      owner: "Product Owner",
      reason: "Clientes podem não ter todo documento disponível",
    },
    {
      decision: "A IA vai classificar documentos",
      status: "Proposta",
      owner: "Sem responsável",
      reason: "Esperado reduzir triagem manual — nenhuma aprovação encontrada",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">Exemplos de entradas do registro de decisões da AaravCare</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decisão
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Responsável
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Motivo
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.decision}>
              <td className="px-3 py-2 font-medium">{row.decision}</td>
              <td className="px-3 py-2">{row.status}</td>
              <td className="px-3 py-2">{row.owner}</td>
              <td className="px-3 py-2">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlobalExampleTable() {
  const rows = [
    { area: "Por quê", reveals: "Novos contratados esperam demais por contas e equipamentos" },
    { area: "Pessoas", reveals: "RH, gestores, TI, Segurança, Folha de Pagamento, Facilities e novos funcionários" },
    {
      area: "Processo",
      reveals: "Oferta aceita → funcionário criado → checagens concluídas → acesso e equipamento fornecidos",
    },
    { area: "Sistemas", reveals: "Plataforma de RH, provedor de identidade, folha de pagamento, service desk e gestão de dispositivos" },
    { area: "Dado", reveals: "Nome legal, localização, data de entrada, tipo de emprego, gestor e perfil de acesso" },
    { area: "Decisões", reveals: "Quem aprova acesso privilegiado? O que acontece quando uma data de entrada muda?" },
    { area: "Fronteira", reveals: "O primeiro release cria contas, encomenda equipamento ou os dois?" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[540px] text-left text-sm">
        <caption className="sr-only">
          Onboarding de funcionário de SaaS global — mesmo mapa de descoberta, projeto diferente
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Área
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              O que a descoberta revela
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.area}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{row.area}</td>
              <td className="px-3 py-2">{row.reveals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// O único visual bespoke deste playbook: as seis perguntas que a descoberta
// precisa responder, organizadas como um mapa irradiando a partir do
// próprio projeto — não um flywheel ou funil reaproveitado, ancorado na
// estrutura "Por quê / Quem / Como / O quê / Qual / Onde" do próprio artigo.
function DiscoveryMapDiagram() {
  const dimensions = [
    { letter: "Por quê", label: "o projeto existe" },
    { letter: "Quem", label: "é afetado, quem decide" },
    { letter: "Como", label: "o processo funciona hoje" },
    { letter: "O quê", label: "se espera que mude" },
    { letter: "Qual", label: "sistema e dado fazem isso funcionar" },
    { letter: "Onde", label: "estão os riscos e perguntas em aberto" },
  ];

  return (
    <div className="not-prose flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/20 px-4 py-7 sm:px-8 sm:py-9">
      <FieldLabel>O mapa de descoberta</FieldLabel>
      <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
        O projeto novo
      </span>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {dimensions.map((dimension) => (
          <div
            key={dimension.letter}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-3 py-3 text-center"
          >
            <span className="font-heading text-sm font-semibold text-brand">{dimension.letter}</span>
            <span className="text-[0.7rem] leading-snug text-muted-foreground">{dimension.label}</span>
          </div>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-muted-foreground">
        Isso já basta para começar a contribuir sem fingir que você sabe tudo.
      </p>
    </div>
  );
}

function MistakeCard({ number, title, body }: { number: number; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 font-mono text-[0.65rem] font-semibold text-destructive">
          {number}
        </span>
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
      <p className="pl-7 text-sm text-foreground/80">{body}</p>
    </div>
  );
}

function GuiaDeDescobertaDeNovoProjetoBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <p>É sua primeira semana num projeto novo.</p>
        <p>
          Você tem acesso ao Jira, um documento de requisitos de 74 páginas e uma agenda cheia de
          reuniões cujos títulos contêm palavras que você ainda não entende.
        </p>
        <p>Depois seu gestor pergunta:</p>
        <Quote>&ldquo;Você já está confortável com o projeto?&rdquo;</Quote>
        <p>Você conheceu doze pessoas, abriu seis sistemas e coletou dezessete documentos.</p>
        <p>Mas ainda não consegue explicar com confiança por que o projeto existe.</p>
        <KeyInsight>
          Isso é normal. O problema raramente é falta de informação — é que a informação chega em
          pedaços, e ninguém te conta como eles se conectam.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Primeiro, não tente entender tudo
        </h2>
        <p className="text-sm text-foreground/80">
          &ldquo;Entender o projeto&rdquo; é grande demais para ser útil. Comece com um alvo
          menor. Ao final da descoberta, você deveria conseguir explicar:
        </p>
      </div>

      <DiscoveryMapDiagram />

      <p className="text-sm text-foreground/80">
        Descoberta não é sobre virar o especialista em dez dias. É sobre construir o mapa que te
        ajuda a fazer perguntas melhores no dia onze.
      </p>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Conheça nosso projeto
        </h2>
        <p className="text-sm text-foreground/80">
          Vamos usar uma empresa de seguros indiana fictícia chamada{" "}
          <span className="font-semibold text-foreground">AaravCare</span>.
        </p>
        <p className="text-sm text-foreground/80">
          Hoje, clientes enviam sinistros de seguro saúde por e-mail. Times de Operações baixam os
          documentos, digitam os detalhes num sistema de sinistros e contatam os clientes quando
          algo está faltando.
        </p>
        <p className="text-sm text-foreground/80">O briefing do projeto diz:</p>
        <Quote>&ldquo;Construir uma jornada digital de sinistros para reduzir o tempo de processamento.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">Parece claro. Não é.</p>
        <p className="text-sm text-foreground/80">
          &ldquo;Jornada digital de sinistros&rdquo; significa um formulário para enviar
          documentos&mdash;ou validação de apólice, checagens de fraude, rastreamento de status,
          aprovação automática e integração hospitalar também? E &ldquo;reduzir o tempo de
          processamento&rdquo; significa envio, revisão, aprovação ou pagamento mais rápidos?
        </p>
        <KeyInsight>
          Uma descrição de projeto te diz o que as pessoas querem construir. Ela pode não te dizer
          qual problema elas estão tentando resolver.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Comece por por que o projeto existe" />
        <p className="text-sm text-foreground/80">
          Antes de estudar telas, stories ou APIs, entenda o motivo pelo qual dinheiro e pessoas
          foram alocados nesse trabalho. Pergunte que problema estamos tentando resolver, quem
          sente esse problema, que evidência nos diz que vale a pena resolver, por que agora, o
          que acontece se não fizermos nada e como vamos saber que o projeto funcionou.
        </p>
        <p className="text-sm text-foreground/80">
          Na AaravCare, pessoas diferentes dão respostas diferentes:
        </p>
        <TwoPanel>
          <LabeledPanel label="Atendimento ao Cliente">
            <p>&ldquo;Os clientes continuam ligando porque não sabem o status do sinistro.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Operação">
            <p>&ldquo;A gente gasta tempo demais checando envios incompletos.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Financeiro">
            <p>&ldquo;O processamento manual torna a previsão de pagamento pouco confiável.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="Compliance">
            <p>&ldquo;A gente precisa de um registro melhor do que foi enviado, mudado e aprovado.&rdquo;</p>
          </LabeledPanel>
        </TwoPanel>
        <KeyInsight>
          O projeto tem vários problemas relacionados usando o mesmo nome de projeto. Seu trabalho
          é tornar esses problemas visíveis antes que o time trate uma funcionalidade como a
          resposta para todos eles.
        </KeyInsight>
        <p className="text-sm text-foreground/80">Escreva um propósito de projeto de uma frase:</p>
        <LabeledPanel label="A fórmula">
          <p>
            Estamos melhorando <span className="font-semibold text-foreground">[processo]</span>{" "}
            para <span className="font-semibold text-foreground">[usuários]</span> porque{" "}
            <span className="font-semibold text-foreground">[problema atual]</span>, para que{" "}
            <span className="font-semibold text-foreground">[resultado mensurável]</span>.
          </p>
        </LabeledPanel>
        <LabeledPanel label="AaravCare">
          <p>
            Estamos melhorando o envio e a validação inicial de sinistros para segurados e a
            Operação de Sinistros porque envios incompletos por e-mail criam atrasos evitáveis,
            para que mais sinistros cheguem prontos para avaliação e os clientes consigam ver o
            que acontece a seguir.
          </p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">Essa frase pode mudar conforme você aprende mais.</p>
        <KeyInsight>Ótimo. A descoberta deveria mudar seu entendimento.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Encontre as pessoas por trás do organograma" />
        <p className="text-sm text-foreground/80">
          Uma lista de stakeholders te dá nomes e papéis. Ela não te diz como o projeto realmente
          toma decisões. Para cada área importante, identifique quem sente o problema, quem faz o
          trabalho hoje, quem é dono do resultado de negócio, quem toma decisões de política ou
          controle, quem é dono dos sistemas afetados, quem pode bloquear a mudança, quem vai dar
          suporte depois do release e quem está faltando na conversa.
        </p>
        <p className="text-sm text-foreground/80">
          Na AaravCare, o patrocinador do projeto é o Head de Transformação de Sinistros. Mas as
          regras para aceitar um sinistro pertencem à Operação de Sinistros. A Fraude decide quais
          envios precisam de checagens adicionais. O Financeiro é dono dos controles de pagamento.
          A Tecnologia é dona da plataforma de sinistros. O Atendimento ao Cliente lida com as
          ligações quando a jornada não está clara.
        </p>
        <KeyInsight>Um patrocinador não significa um único tomador de decisão.</KeyInsight>
        <p className="text-sm text-foreground/80">Crie um mapa de decisão simples:</p>
        <DecisionMapTable />
        <p className="text-sm text-foreground/80">
          Se a resposta é só &ldquo;o negócio,&rdquo; continue perguntando.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Siga o trabalho como ele acontece hoje" />
        <p className="text-sm text-foreground/80">
          Documentos descrevem o processo oficial. As pessoas te mostram o real. Peça para alguém
          que faz o trabalho te guiar por um exemplo recente do início ao fim&mdash;não uma
          apresentação ou um processo ideal. Um caso real.
        </p>
        <MiniDiagram
          label="O sinistro da AaravCare, hoje"
          steps={[
            "E-mail + anexos",
            "Número de apólice checado",
            "Arquivos baixados, renomeados",
            "Detalhes digitados manualmente",
            "Info faltando solicitada",
            "Checagens de fraude (talvez)",
            "Avaliador decide",
            "Pagamento liberado",
            "Cliente atualizado",
          ]}
        />
        <p className="text-sm text-foreground/80">Depois pergunte:</p>
        <BulletList
          items={[
            "Onde o trabalho espera?",
            "O que é copiado manualmente?",
            "O que é checado duas vezes?",
            "Qual passo depende do conhecimento de uma pessoa só?",
            "Onde as pessoas saem do sistema oficial e usam e-mail ou planilhas?",
            "O que acontece quando informação está faltando?",
            "Como o cliente é informado?",
          ]}
        />
        <KeyInsight>
          Aquela planilha que alguém chama de &ldquo;temporária&rdquo; pode estar carregando
          metade do processo. Não a ignore só porque ela está faltando no diagrama de arquitetura.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Separe o estado atual do futuro prometido" />
        <p className="text-sm text-foreground/80">
          Projetos novos costumam misturar três coisas diferentes: o que acontece hoje, o que
          alguém propôs e o que realmente foi aprovado. Mantenha-as separadas.
        </p>
        <CurrentVsProposedTable />
        <p className="text-sm text-foreground/80">
          Um slide impressionante não é uma decisão. Um protótipo não é necessariamente
          comportamento aprovado. Uma linha num documento antigo pode não ser mais verdade.
        </p>
        <p className="text-sm text-foreground/80">Para toda afirmação importante, pergunte:</p>
        <Quote>Isso é comportamento atual, um requisito aprovado, uma proposta ou uma suposição?</Quote>
        <p className="text-sm text-foreground/80">
          Você vai evitar uma quantidade surpreendente de confusão com essa única pergunta.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Desenhe a jornada de sistemas e dado" />
        <p className="text-sm text-foreground/80">
          Você não precisa de um diagrama de arquitetura perfeito no primeiro dia. Comece com uma
          jornada simples: quem cria a informação, onde ela entra, quais sistemas a usam, o que
          sai.
        </p>
        <MiniDiagram
          label="AaravCare — jornada de sistemas e dado"
          steps={[
            "Cliente",
            "Portal de Sinistros",
            "Sistema de Apólices",
            "Plataforma de Sinistros",
            "Serviço de Fraude",
            "Sistema Financeiro",
            "Portal do Cliente",
          ]}
        />
        <p className="text-sm text-foreground/80">Agora pergunte sobre as conexões:</p>
        <BulletList
          items={[
            "Qual sistema é dono de cada campo importante?",
            "Quais integrações são em tempo real e quais são atrasadas?",
            "Qual identificador liga o mesmo sinistro através dos sistemas?",
            "O que acontece se um sistema não responde?",
            "Mensagens podem chegar duas vezes ou fora de ordem?",
            "Onde erros de validação são armazenados?",
            "Quem reconcilia divergências?",
            "Quais relatórios consomem o dado depois?",
          ]}
        />
        <KeyInsight>
          A tela é só onde o usuário encontra o processo. O requisito costuma viver no que
          acontece antes e depois dela.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Encontre as decisões já tomadas — e as que fingem ter sido tomadas" />
        <p className="text-sm text-foreground/80">
          Novos membros do time costumam reabrir questões já resolvidas porque não conseguem
          encontrar a decisão original. Eles também herdam suposições que todo mundo trata como
          resolvidas porque ninguém lembra de tê-las questionado.
        </p>
        <p className="text-sm text-foreground/80">Crie um registro de decisões com cinco campos:</p>
        <DecisionLogTable />
        <p className="text-sm text-foreground/80">
          Status úteis são Proposta, Aprovada, Rejeitada, Substituída e Precisa confirmação.
        </p>
        <KeyInsight>
          Se ninguém consegue identificar quem aprovou algo, registre essa incerteza. Não a
          converta silenciosamente num fato.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Torne a fronteira de entrega visível" />
        <p className="text-sm text-foreground/80">
          Um projeto pode ter uma visão clara e ainda assim ter um release pouco claro. Pergunte:
        </p>
        <BulletList
          items={[
            "O que está incluído no próximo release?",
            "O que está explicitamente fora de escopo?",
            "O que já está comprometido?",
            "Quais datas são fixas — e por quê?",
            "O que depende de outro time, fornecedor ou aprovação?",
            "O que precisa ser verdade antes do desenvolvimento começar?",
            "O que impediria a UAT ou o release em produção?",
            "Que trabalho continua manual depois do lançamento?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Na AaravCare, &ldquo;sinistros digitais&rdquo; é a visão. O primeiro release pode
          incluir só:
        </p>
        <BulletList
          items={["Envio de sinistro", "Upload de documento", "Validação básica de apólice", "Confirmação e rastreamento de status"]}
        />
        <p className="text-sm text-foreground/80">
          Automação de fraude e aprovação automática podem vir depois.
        </p>
        <KeyInsight>Isso não é uma falha de ambição. É uma fronteira de entrega usável.</KeyInsight>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          O plano de descoberta dos primeiros 30 dias
        </h2>
        <p className="text-sm text-foreground/80">
          Você não precisa completar a descoberta antes de contribuir. Use três passadas.
        </p>
      </div>

      <PhaseDivider label="Dias 1–5 · Oriente-se" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">
          Entenda por que o projeto existe e aprenda sua linguagem.
        </p>
        <BulletList
          items={[
            "Leia o briefing do projeto, decisões recentes e o backlog atual",
            "Conheça o patrocinador, o Product Owner, o SME operacional, o líder de tecnologia e o líder de QA",
            "Escreva sua primeira versão da declaração de propósito do projeto",
            "Comece um glossário",
            "Capture contradições e perguntas em aberto",
          ]}
        />
        <LabeledPanel label="Resultado">
          <p>Declaração de propósito, mapa de stakeholders e glossário.</p>
        </LabeledPanel>
      </div>

      <PhaseDivider label="Dias 6–15 · Rastreie" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">Siga uma jornada real através de pessoas, sistemas e dado.</p>
        <BulletList
          items={[
            "Observe o processo atual",
            "Percorra um caso normal e um caso com falha",
            "Desenhe a jornada de processo e sistema",
            "Identifique donos de dado, integrações e workarounds manuais",
            "Separe decisões aprovadas de propostas e suposições",
          ]}
        />
        <LabeledPanel label="Resultado">
          <p>Fluxo do estado atual, mapa de sistema/dado e registro de decisões.</p>
        </LabeledPanel>
      </div>

      <PhaseDivider label="Dias 16–30 · Teste seu entendimento" />
      <div className="flex flex-col gap-3">
        <p className="text-sm text-foreground/80">Devolva seu entendimento para o time.</p>
        <BulletList
          items={[
            "Confirme o resultado alvo e as medidas de sucesso",
            "Valide o escopo e as fronteiras de release",
            "Exponha dependências e riscos de entrega",
            "Priorize perguntas sem resposta",
            "Cheque se o QA, a Operação e o Suporte veem algo faltando",
            "Combine o que você vai investigar a seguir",
          ]}
        />
        <LabeledPanel label="Resultado">
          <p>Canvas de descoberta validado, lista de riscos e plano de próximas ações.</p>
        </LabeledPanel>
        <KeyInsight>
          Trinta dias não é um prazo para saber tudo. É tempo suficiente para parar de depender de
          qualquer que seja a última pessoa que falou com você.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Um exemplo global: as mesmas perguntas, projeto diferente
        </h2>
        <p className="text-sm text-foreground/80">
          Imagine entrar numa empresa global de SaaS que quer &ldquo;automatizar o onboarding de
          funcionários.&rdquo; O mesmo mapa funciona:
        </p>
        <GlobalExampleTable />
        <p className="text-sm text-foreground/80">
          País diferente, indústria diferente, mesmo problema: o nome do projeto é menor que o
          sistema de trabalho por trás dele.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Perguntas que BAs experientes fazem cedo
        </h2>
        <p className="text-sm text-foreground/80">
          Uma vez que você entende a jornada básica, faça as perguntas menos confortáveis:
        </p>
        <BulletList
          items={[
            "Quais medidas de sucesso poderiam melhorar enquanto a experiência do cliente piora?",
            "Qual stakeholder se beneficia dessa mudança — e quem ganha mais trabalho?",
            "Que atividade manual a solução está silenciosamente dependendo?",
            "Qual regra existe por causa de regulação e qual existe porque \"sempre fizemos assim\"?",
            "O que acontece com os casos já em andamento quando a mudança entra no ar?",
            "Quem trata exceções depois do lançamento?",
            "Qual time downstream fica sabendo da mudança por último?",
            "O que precisa ser monitorado no primeiro dia?",
            "Qual é o rollback ou fallback se a jornada nova falhar?",
            "Qual suposição seria mais cara se estivesse errada?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Você não vai precisar de toda pergunta em todo projeto. Escolha as que podem mudar
          escopo, design, teste ou responsabilidade.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Cinco erros de descoberta para evitar
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <MistakeCard
            number={1}
            title="Ler tudo antes de falar com alguém"
            body="Documentos te dão histórico. Pessoas te dão contexto. Use os dois."
          />
          <MistakeCard
            number={2}
            title="Reunir só com stakeholders sêniores"
            body="Líderes explicam o processo pretendido. As pessoas que fazem o trabalho te mostram onde ele se dobra."
          />
          <MistakeCard
            number={3}
            title="Tratar acesso como entendimento"
            body="Ter acesso a Jira, Confluence e sistemas não significa que você entende como um caso se move através deles. Rastreie um exemplo real."
          />
          <MistakeCard
            number={4}
            title="Esconder o que você não sabe"
            body="Perguntas visíveis tornam a descoberta mais segura. Suposições silenciosas fazem ela parecer terminada antes de estar."
          />
          <MistakeCard
            number={5}
            title="Transformar a descoberta em análise permanente"
            body="Você nunca vai remover todo desconhecido. Exponha os que poderiam mudar a próxima decisão."
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Antes de Dizer, &ldquo;Eu Entendo o Projeto&rdquo;
        </h2>
        <p className="text-sm text-foreground/80">Cheque se você consegue responder:</p>
        <Checklist
          label="A checagem de entendimento"
          items={[
            "Por que esse projeto existe?",
            "Quem sente o problema?",
            "Como o processo funciona hoje?",
            "O que se espera que mude?",
            "Quais sistemas e dado estão envolvidos?",
            "Quem é dono das decisões importantes?",
            "O que está incluído no próximo release?",
            "Quais suposições ainda não foram verificadas?",
            "Onde a mudança poderia falhar?",
            "O que você deveria investigar a seguir?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Se você não consegue responder uma dessas, você não falhou na descoberta.
        </p>
        <p className="text-sm text-foreground/80">Você encontrou para onde a descoberta precisa ir a seguir.</p>
      </div>
    </div>
  );
}

export { GuiaDeDescobertaDeNovoProjetoBody };
