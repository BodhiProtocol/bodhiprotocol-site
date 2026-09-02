import { Checklist } from "@/components/ba-playbooks/checklist";
import { CopyTemplate } from "@/components/ba-playbooks/copy-template";
import { FieldLabel } from "@/components/ba-playbooks/field-label";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

// Tradução da versão em inglês em impact-analysis-template-body.tsx. Este
// playbook é um framework percorrido em dois exemplos completos trabalhados,
// não uma lista de dicas independentes — por isso, como os outros playbooks
// narrativos, renderiza como um corpo bespoke em vez de cards numerados.
// Veja o registro customPlaybookBodies em app/pt-br/ba-playbooks/[slug]/page.tsx.
// Omite os dois blocos ToolkitCard (zip/PDF só em inglês) do original.

const copyPasteTemplate = `## Resumo da mudança

[Descreva a mudança em uma frase.]

## Motivo de negócio

[Por que a mudança é necessária?]

## Comportamento atual

[O que acontece hoje?]

## Comportamento esperado

[O que deveria acontecer depois da mudança?]

## Escopo

- Dentro do escopo:
- Fora do escopo:

## 1. Impacto no processo de negócio

- Processo atual:
- Processo novo:
- Passos adicionados, mudados ou removidos:

## 2. Impacto em usuários e times

- Usuários primários:
- Usuários secundários:
- Times afetados:
- Mudanças de fluxo de trabalho, treinamento ou comunicação:

## 3. Impacto em sistemas e integrações

- Sistemas / integrações tocados:
- Mudanças na requisição ou resposta:
- Tratamento de erro:
- Comportamento de retry:
- Consumidores existentes afetados:

## 4. Impacto no dado

- Elementos de dado (atual / novo / fonte / consumidor):
- Dono do dado:
- Validação:
- Comportamento para dado faltando ou incorreto:

## 5. Regras, controles e segurança

- Regra ou controle existente:
- Regra ou controle novo:
- Impacto na aprovação:
- Impacto em permissões ou privacidade:
- Impacto de auditoria ou regulatório:

## 6. Downstream, relatórios e reconciliação

- Sistema ou time downstream:
- Relatórios ou dashboards:
- Mudanças de reconciliação ou SLA:
- Ação necessária:

## 7. Falha e recuperação

- Fonte indisponível:
- Timeout:
- Sucesso parcial:
- Requisição duplicada:
- Recuperação ou tratamento manual:

## 8. Dado histórico e migração

- Itens em andamento existentes:
- Atualização de dado histórico:
- Backfill ou migração:
- Considerações de compatibilidade:

## 9. Performance e operações

- Volume esperado:
- Expectativa de tempo de resposta:
- Limites operacionais:
- Monitoramento e alertas:
- Responsável pelo suporte:

## 10. Teste, release e rollback

- Cenários novos:
- Áreas de regressão:
- Teste de integração / segurança / performance:
- UAT:
- Abordagem de release:
- Plano de rollback:

## Dependências

-

## Suposições

-

## Perguntas em aberto

- Pergunta:
- Responsável:
- Prazo:

## Decisões

- Decisão:
- Responsável pela decisão:
- Motivo:
- Data:`;

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

function DataTable() {
  const rows: { element: string; why: string }[] = [
    { element: "ID do funcionário", why: "Identifica o funcionário" },
    { element: "Data de entrada", why: "Determina quando o acesso começa" },
    { element: "Cargo", why: "Define os direitos de acesso" },
    { element: "Departamento", why: "Ajuda a selecionar as aplicações" },
    { element: "Gestor", why: "Pode ser necessário para aprovação" },
    { element: "Localização", why: "Aplica regras específicas do país" },
    { element: "Status de emprego", why: "Impede acesso para entradas canceladas" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[420px] text-left text-sm">
        <caption className="sr-only">
          Elementos de dado dos quais o onboarding automático pode depender, e por que cada um importa
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Elemento de dado
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Por que importa
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          {rows.map((row) => (
            <tr key={row.element}>
              <td className="px-3 py-2 font-medium">{row.element}</td>
              <td className="px-3 py-2">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Recriação sóbria, alinhada à marca, da ideia de "raio de impacto" — uma
// mudança, dez lugares para checar — usando a linguagem de badge numerado
// do próprio site em vez de um infográfico ilustrado, para ficar consistente
// com o resto da página (nenhum asset de arte importado para este playbook).
function BlastRadiusDiagram() {
  const areas = [
    "Processo de negócio",
    "Usuários e times",
    "Sistemas e integrações",
    "Dado",
    "Regras e controles",
    "Downstream e relatórios",
    "Falha e recuperação",
    "Histórico e migração",
    "Performance e ops",
    "Teste e release",
  ];

  return (
    <div className="not-prose flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/20 px-4 py-7 sm:px-8 sm:py-9">
      <FieldLabel>O raio de impacto</FieldLabel>
      <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
        A mudança
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2.5">
        {areas.map((area, index) => (
          <span
            key={area}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground/85"
          >
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[0.6rem] font-semibold text-brand">
              {index + 1}
            </span>
            {area}
          </span>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-muted-foreground">
        Um ticket. Dez lugares onde o impacto poderia aparecer — antes da produção encontrá-los por
        você.
      </p>
    </div>
  );
}

function ModeloDeAnaliseDeImpactoBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          O requisito mudou uma frase.
        </h2>
        <p>De alguma forma cinco times agora estão na reunião.</p>
        <p>Isso é análise de impacto.</p>
        <p>
          Uma mudança pode parecer minúscula no Jira e ainda assim tocar processos, sistemas,
          dado, usuários, controles e relatórios ao redor dela.
        </p>
        <p>Seu trabalho como BA não é prever tudo.</p>
        <KeyInsight>É tornar o raio de impacto visível antes da produção fazer isso.</KeyInsight>
        <p>Vamos usar duas mudanças que soam simples:</p>
        <TwoPanel>
          <LabeledPanel label="🇮🇳 Índia — Reembolso de e-commerce">
            <p>&ldquo;Se um pedido é cancelado antes do despacho, reembolse o cliente instantaneamente.&rdquo;</p>
          </LabeledPanel>
          <LabeledPanel label="🌍 Global — Onboarding de funcionário">
            <p>&ldquo;Dê aos novos funcionários acesso automático ao sistema na data de entrada deles.&rdquo;</p>
          </LabeledPanel>
        </TwoPanel>
        <p>Uma frase cada. Muita coisa escondida por baixo.</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          O que é análise de impacto?
        </h2>
        <p className="text-sm text-foreground/80">A análise de impacto pergunta:</p>
        <Quote>Se a gente mudar isso, o que mais pode se mover?</Quote>
        <p className="text-sm text-foreground/80">Não só:</p>
        <Quote>Qual tela muda?</Quote>
        <p className="text-sm text-foreground/80">Mas também:</p>
        <BulletList
          items={[
            "Qual processo muda?",
            "Quais sistemas e integrações estão envolvidos?",
            "Algum dado muda?",
            "Quem trabalha de forma diferente?",
            "Controles estão sendo adicionados ou contornados?",
            "Quem consome o resultado downstream?",
            "O que poderia falhar?",
            "O que precisa de teste, monitoramento ou comunicação?",
          ]}
        />
        <p className="text-sm text-foreground/80">Uma boa análise de impacto transforma:</p>
        <Quote>&ldquo;Isso parece simples.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">em:</p>
        <Quote>&ldquo;Aqui está o que a gente checou antes de chamar isso de simples.&rdquo;</Quote>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Comece pela mudança
        </h2>
        <p className="text-sm text-foreground/80">
          Antes de rastrear o impacto, escreva quatro coisas:
        </p>
        <ol className="flex flex-col gap-1.5 text-sm text-foreground/80">
          <li>1. O que acontece hoje?</li>
          <li>2. O que deveria acontecer depois da mudança?</li>
          <li>3. Por que a mudança é necessária?</li>
          <li>4. O que está explicitamente fora de escopo?</li>
        </ol>
        <p className="text-sm text-foreground/80">Para o exemplo de reembolso:</p>
        <LabeledPanel label="Hoje">
          <p>
            O cliente cancela, uma solicitação de reembolso é criada e o provedor de pagamento a
            processa depois.
          </p>
        </LabeledPanel>
        <LabeledPanel label="Depois da mudança">
          <p>Um cancelamento elegível dispara o reembolso imediatamente.</p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          Essa palavra&mdash;<span className="font-semibold text-foreground">elegível</span>
          &mdash;já nos dá perguntas.
        </p>
        <p className="text-sm text-foreground/80">
          Quais pedidos se qualificam? O que significa &ldquo;antes do despacho&rdquo;? E se o
          status da transportadora estiver atrasado? &ldquo;Instantâneo&rdquo; significa iniciado
          instantaneamente ou creditado instantaneamente?
        </p>
        <KeyInsight>
          A análise de impacto costuma começar descobrindo que uma frase não está tão resolvida
          quanto parece.
        </KeyInsight>
        <p className="text-sm text-foreground/80">Agora rastreie isso em dez áreas.</p>
      </div>

      <BlastRadiusDiagram />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          A Checagem de Impacto em 10 Áreas
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Processo de negócio" />
        <p className="text-sm text-foreground/80">Entenda o processo antes dos sistemas.</p>
        <TwoPanel>
          <div className="flex flex-col gap-2.5">
            <MiniDiagram
              label="🇮🇳 Reembolso — Hoje"
              steps={["Cancelamento", "Reembolso solicitado", "Reembolso processado", "Cliente espera"]}
            />
            <MiniDiagram
              label="🇮🇳 Reembolso — Depois"
              steps={["Cancelamento", "Elegibilidade checada", "Reembolso disparado", "Cliente notificado"]}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <MiniDiagram
              label="🌍 Onboarding — Hoje"
              steps={["RH cria funcionário", "Gestor solicita acesso", "TI aprova", "Acesso criado"]}
            />
            <MiniDiagram
              label="🌍 Onboarding — Depois"
              steps={["RH cria funcionário", "Papel é avaliado", "Acesso criado na data de entrada"]}
            />
          </div>
        </TwoPanel>
        <p className="text-sm text-foreground/80">Isso poderia mudar:</p>
        <BulletList
          items={[
            "a elegibilidade de reembolso",
            "as filas de reembolso manual",
            "o atendimento ao cliente",
            "os acertos com vendedores",
            "a reconciliação financeira",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Agora aprovações de gestor, suporte de TI e controles de segurança podem funcionar de
          forma diferente.
        </p>
        <KeyInsight>
          O requisito não só mudou um sistema. Mudou um processo.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Usuários e times" />
        <p className="text-sm text-foreground/80">Pergunte:</p>
        <Quote>Quem faz algo diferente depois dessa mudança?</Quote>
        <TwoPanel>
          <LabeledPanel label="Reembolso — pode afetar">
            <BulletList
              items={["atendimento ao cliente", "operações de reembolso", "financeiro", "vendedores", "times de fraude"]}
            />
          </LabeledPanel>
          <LabeledPanel label="Onboarding — pode afetar">
            <BulletList
              items={["novos funcionários", "RH", "gestores", "suporte de TI", "segurança", "donos de aplicação"]}
            />
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Para cada grupo, cheque se o trabalho, as permissões, o treinamento ou a comunicação
          precisam mudar.
        </p>
        <KeyInsight>
          Usuários secundários são fáceis de esquecer. Até encontrarem a mudança em produção.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Sistemas e integrações" />
        <p className="text-sm text-foreground/80">
          Pergunte quais aplicações participam da jornada&mdash;não só qual aplicação é dona da
          tela.
        </p>
        <p className="text-sm text-foreground/80">O caminho do reembolso pode ser:</p>
        <MiniDiagram
          label="Caminho do reembolso"
          steps={["App do Cliente", "Gestão de Pedidos", "Serviço de Reembolso", "Gateway de Pagamento", "Reconciliação Financeira"]}
        />
        <p className="text-sm text-foreground/80">
          Notificações, relatórios e ferramentas de suporte também podem consumir o resultado.
        </p>
        <p className="text-sm text-foreground/80">Para cada integração, pergunte:</p>
        <BulletList
          items={[
            "A requisição ou a resposta muda?",
            "Um campo novo é obrigatório?",
            "Consumidores existentes são afetados?",
            "O que acontece no timeout?",
            "A requisição pode ser tentada de novo com segurança?",
            "A mudança é retrocompatível?",
          ]}
        />
        <KeyInsight>
          O requisito talvez nunca mencione uma API. A mudança ainda pode depender de uma.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Dado" />
        <p className="text-sm text-foreground/80">
          Mudanças costumam criar requisitos de dado que ninguém mencionou.
        </p>
        <p className="text-sm text-foreground/80">Pergunte:</p>
        <BulletList
          items={[
            "A gente precisa de um campo novo?",
            "Um campo existente muda de significado?",
            "Quem cria e é dono do dado?",
            "Quem o consome?",
            "O que acontece quando ele está atrasado, faltando ou errado?",
          ]}
        />
        <p className="text-sm text-foreground/80">O onboarding automático pode depender de:</p>
        <DataTable />
        <p className="text-sm text-foreground/80">O requisito diz:</p>
        <Quote>&ldquo;Criar acesso automaticamente.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">A pergunta real é:</p>
        <Quote>Que dado confiável nos diz qual acesso criar?</Quote>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Regras de negócio, controles e segurança" />
        <p className="text-sm text-foreground/80">Pergunte:</p>
        <BulletList
          items={[
            "Uma aprovação está mudando?",
            "Um controle poderia ser contornado?",
            "Permissões estão envolvidas?",
            "Dado sensível está exposto?",
            "Uma trilha de auditoria é necessária?",
            "Regras regulatórias ou de retenção se aplicam?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Imagine fazer onboarding de funcionários em Mumbai, Londres e Nova York.
        </p>
        <p className="text-sm text-foreground/80">
          Localização, tipo de emprego e cargo podem mudar quais sistemas e dados eles conseguem
          acessar. Um contratado não deveria receber acesso privilegiado simplesmente porque um
          cargo foi digitado errado.
        </p>
        <p className="text-sm text-foreground/80">Você pode precisar de regras como:</p>
        <BulletList
          items={[
            "Acesso padrão segue o cargo aprovado do funcionário.",
            "Acesso privilegiado sempre exige aprovação separada.",
            "Contratados recebem acesso com prazo definido.",
            "O acesso não pode começar antes da data de entrada.",
            "O acesso é cancelado se o funcionário não entrar.",
          ]}
        />
        <KeyInsight>Automação não remove controles. Ela muda onde eles acontecem.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Downstream, relatórios e reconciliação" />
        <p className="text-sm text-foreground/80">Uma das melhores perguntas de BA é:</p>
        <Quote>Quem consome isso depois da gente?</Quote>
        <p className="text-sm text-foreground/80">Para a mudança de reembolso:</p>
        <BulletList
          items={[
            "O financeiro pode receber reembolsos mais cedo.",
            "O suporte pode ver novos status.",
            "Os relatórios podem calcular o tempo de retorno de forma diferente.",
            "A fraude pode precisar de alertas novos.",
            "Os vendedores podem ver ajustes de acerto mais cedo.",
          ]}
        />
        <p className="text-sm text-foreground/80">Suponha que o Financeiro rastreia:</p>
        <MiniDiagram
          label="Rastreamento do Financeiro"
          steps={["Reembolso Solicitado", "Reembolso em Processamento", "Reembolso Concluído"]}
        />
        <p className="text-sm text-foreground/80">
          Um reembolso instantâneo pode encurtar ou remover um estado. Dashboards, cálculos de
          SLA e regras de reconciliação poderiam então mudar também.
        </p>
        <KeyInsight>Seu sistema pode funcionar perfeitamente e ainda assim quebrar o processo de outra pessoa.</KeyInsight>
        <p className="text-sm text-foreground/80">Não pare em:</p>
        <Quote>&ldquo;Nossa parte funciona.&rdquo;</Quote>
        <p className="text-sm text-foreground/80">Siga o resultado mais um passo adiante.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Falha e recuperação" />
        <p className="text-sm text-foreground/80">
          Caminhos felizes são fáceis. As falhas são onde a análise de impacto ganha seu valor.
        </p>
        <p className="text-sm text-foreground/80">Para a mudança de reembolso, o que acontece se:</p>
        <BulletList
          items={[
            "o pedido é cancelado, mas o reembolso falha?",
            "o reembolso funciona, mas a notificação falha?",
            "o gateway de pagamento dá timeout?",
            "o sistema tenta de novo a mesma requisição?",
            "uma parte funciona e a outra não?",
          ]}
        />
        <p className="text-sm text-foreground/80">O cliente poderia receber dois reembolsos?</p>
        <p className="text-sm text-foreground/80">
          Para o onboarding, e se o acesso for criado, mas a data de entrada do funcionário for
          mudada depois&mdash;ou o funcionário nunca entrar?
        </p>
        <KeyInsight>Essas não são só perguntas técnicas. Elas definem o comportamento de negócio.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={8} title="Dado histórico e migração" />
        <p className="text-sm text-foreground/80">
          Um comportamento novo levanta uma pergunta fácil de esquecer:
        </p>
        <Quote>O que acontece com as coisas já em andamento?</Quote>
        <p className="text-sm text-foreground/80">Por exemplo:</p>
        <BulletList
          items={[
            "Solicitações de reembolso existentes usam o fluxo novo?",
            "Reembolsos pendentes deveriam ser reprocessados?",
            "Funcionários atuais precisam ter o acesso deles recalculado?",
            "Um campo novo precisa ser preenchido para registros antigos?",
            "Versões antigas e novas conseguem coexistir durante o rollout?",
          ]}
        />
        <KeyInsight>
          Às vezes a funcionalidade é simples. Migrar com segurança do mundo antigo para o novo não é.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={9} title="Performance e limites operacionais" />
        <p className="text-sm text-foreground/80">
          &ldquo;Funciona&rdquo; é diferente de &ldquo;funciona sob carga real.&rdquo;
        </p>
        <p className="text-sm text-foreground/80">Pergunte:</p>
        <BulletList
          items={[
            "Quantas requisições poderiam chegar de uma vez?",
            "Existe uma expectativa de tempo de resposta?",
            "Existem limites de taxa do provedor de pagamento ou da API?",
            "A automação poderia criar uma fila grande no dia de entrada?",
            "Que monitoramento ou alerta é necessário?",
            "Quem trata exceções?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Um fluxo de reembolso que funciona para dez requisições pode se comportar de forma muito
          diferente durante uma liquidação de festival.
        </p>
        <p className="text-sm text-foreground/80">
          Um fluxo de onboarding pode enfrentar centenas de novos contratados depois de uma
          aquisição.
        </p>
        <KeyInsight>Volume é parte do requisito&mdash;mesmo quando o Jira esquece de mencionar isso.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={10} title="Teste, release e rollback" />
        <p className="text-sm text-foreground/80">
          A análise de impacto dá ao QA o mapa. O teste explora o mapa.
        </p>
        <p className="text-sm text-foreground/80">Para o onboarding, os cenários podem incluir:</p>
        <BulletList
          items={[
            "funcionário entra hoje",
            "funcionário entra semana que vem",
            "a data de entrada muda",
            "o registro do funcionário é cancelado",
            "cargo ou gestor está faltando",
            "o departamento muda antes da entrada",
            "o provisionamento falha parcialmente",
            "acesso privilegiado exige aprovação",
            "o mesmo evento é recebido duas vezes",
          ]}
        />
        <p className="text-sm text-foreground/80">Também decida:</p>
        <BulletList
          items={[
            "O que exige teste de regressão?",
            "A gente precisa de teste de integração, segurança ou performance?",
            "A mudança pode ser lançada gradualmente?",
            "Como a gente vai saber que está funcionando?",
            "Qual é o plano de rollback?",
            "Quem dá suporte depois do release?",
          ]}
        />
        <KeyInsight>O release não é a última linha do ticket. Ele é parte da mudança.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-xl leading-snug font-medium text-balance sm:text-2xl">
          Modelo de Análise de Impacto para Copiar e Colar
        </h2>
        <CopyTemplate template={copyPasteTemplate} label="Copiar modelo" scrollable />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Antes de Dizer &ldquo;Sem Impacto&rdquo;
        </h2>
        <p className="text-sm text-foreground/80">Percorra isso uma vez:</p>
        <Checklist
          label="Checagem de sanidade sem-impacto"
          items={[
            "Processo de negócio",
            "Usuários e times",
            "Sistemas e integrações",
            "Dado",
            "Regras, controles e segurança",
            "Downstream, relatórios e reconciliação",
            "Falha e recuperação",
            "Dado histórico e migração",
            "Performance e operações",
            "Teste, release e rollback",
            "Suposições, dependências e perguntas em aberto",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Se você checou tudo isso e não encontrou nada, ótimo.
        </p>
        <p className="text-sm text-foreground/80">
          Agora <span className="font-semibold text-foreground">&ldquo;Sem impacto&rdquo;</span>{" "}
          realmente significa alguma coisa.
        </p>
      </div>
    </div>
  );
}

export { ModeloDeAnaliseDeImpactoBody };
