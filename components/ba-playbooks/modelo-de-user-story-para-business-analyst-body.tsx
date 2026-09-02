import { Checklist } from "@/components/ba-playbooks/checklist";

// Tradução da versão em inglês em business-analyst-user-story-template-body.tsx.
// Este playbook é um modelo + dois exemplos completos trabalhados, não uma
// lista de dicas independentes — por isso, como os outros playbooks
// narrativos, renderiza como um corpo bespoke em vez de cards numerados.
// Veja o registro customPlaybookBodies em app/pt-br/ba-playbooks/[slug]/page.tsx.
// Reusa a mesma linguagem visual FieldLabel / not-prose dos sub-componentes
// do HackCard (Checklist, SideBySide, CopyTemplate) em vez de prosa corrida,
// já que um guia de modelo precisa ser escaneado, não lido do início ao fim.
// Omite o bloco final de DownloadCard só em inglês do original.

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-brand/40 pl-3 text-sm font-medium text-foreground/90 italic">
      {children}
    </p>
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

function Gwt({ lines }: { lines: { keyword: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line, index) => (
        <p key={index}>
          <span className="font-semibold text-foreground">{line.keyword}</span> {line.text}
        </p>
      ))}
    </div>
  );
}

function DataTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">
          Requisitos de dado para o exemplo de classificação de risco do Trade Surveillance
        </caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Dado
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Fonte
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Obrigatório?
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Notas
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-foreground/90">
          <tr>
            <td className="px-3 py-2 font-medium">ID do Cliente</td>
            <td className="px-3 py-2">Alerta de surveillance</td>
            <td className="px-3 py-2">Sim</td>
            <td className="px-3 py-2">Identifica o cliente</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Classificação de risco</td>
            <td className="px-3 py-2">Sistema de risco</td>
            <td className="px-3 py-2">Sim</td>
            <td className="px-3 py-2">Valor ativo mais recente</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Data da classificação</td>
            <td className="px-3 py-2">Sistema de risco</td>
            <td className="px-3 py-2">Sim</td>
            <td className="px-3 py-2">Determina se está desatualizada</td>
          </tr>
          <tr>
            <td className="px-3 py-2 font-medium">Motivo do risco</td>
            <td className="px-3 py-2">Sistema de risco</td>
            <td className="px-3 py-2">Não</td>
            <td className="px-3 py-2">Escopo futuro</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function DecisionLogTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="sr-only">Exemplo de registro de decisão para o exemplo UPI</caption>
        <thead className="bg-muted/40 text-xs text-muted-foreground uppercase">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Decisão
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
          <tr>
            <td className="px-3 py-2 font-medium">
              Mostrar uma mensagem amigável ao cliente em vez do erro de pagamento bruto
            </td>
            <td className="px-3 py-2">Payments Product</td>
            <td className="px-3 py-2">
              Clientes não deveriam precisar entender códigos bancários internos
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ModeloDeUserStoryParaBusinessAnalystBody() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-foreground/90">
        <p>Você abre o Jira.</p>
        <p>
          Clica em <strong className="font-semibold text-foreground">Create</strong>.
        </p>
        <p>E de repente essa caixinha vazia parece uma prova.</p>
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          Summary · Description · Acceptance Criteria
        </p>
        <p>O que exatamente você deveria colocar ali?</p>
        <p>Uma user story não precisa ser longa. Ela precisa tornar a próxima conversa mais fácil.</p>
        <p>Aqui está um modelo que você consegue realmente usar.</p>
        <KeyInsight>
          Você não vai precisar de toda seção em toda story. Pense nisso como uma caixa de
          ferramentas, não um formulário.
        </KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Comece com a versão simples
        </h2>
        <LabeledPanel label="O esqueleto">
          <p>
            <span className="font-semibold text-foreground">Como</span> [usuário / papel]
          </p>
          <p>
            <span className="font-semibold text-foreground">Eu quero</span> [capacidade / ação]
          </p>
          <p>
            <span className="font-semibold text-foreground">Para que</span> [resultado de negócio / motivo]
          </p>
        </LabeledPanel>
        <TwoPanel>
          <LabeledPanel label="Exemplo da Índia — Pagamentos UPI">
            <p>
              <span className="font-semibold text-foreground">Como</span> cliente
            </p>
            <p>
              <span className="font-semibold text-foreground">Eu quero</span> ver por que meu
              pagamento UPI falhou
            </p>
            <p>
              <span className="font-semibold text-foreground">Para que</span> eu saiba se devo
              tentar de novo, usar outra conta ou contatar meu banco.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Exemplo de Capital Markets — Trade Surveillance">
            <p>
              <span className="font-semibold text-foreground">Como</span> Analista de Trade
              Surveillance
            </p>
            <p>
              <span className="font-semibold text-foreground">Eu quero</span> que os alertas
              mostrem a classificação de risco mais recente do cliente
            </p>
            <p>
              <span className="font-semibold text-foreground">Para que</span> eu possa priorizar
              casos de alto risco.
            </p>
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          As duas são válidas. Mas nenhuma está pronta para ser construída ainda.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Primeiro, olhe uma story ruim
        </h2>
        <LabeledPanel label="Story ruim">
          <p>Como usuário, eu quero informação de risco, para que eu possa usá-la.</p>
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          Ela segue o formato. Mas o que ela realmente nos diz? Qual usuário? Qual informação?
          Onde deveria aparecer? Quão recente ela precisa ser? O que acontece se ela estiver
          indisponível?
        </p>
        <KeyInsight>Uma story pode parecer completa e ainda assim conter muita ambiguidade.</KeyInsight>
        <p className="text-sm text-foreground/80">Vamos consertar isso.</p>
      </div>

      <PhaseDivider label="Entender" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={1} title="Contexto" />
        <p className="text-sm text-foreground/80">Explique o que acontece hoje.</p>
        <TwoPanel>
          <LabeledPanel label="Índia — UPI">
            <p>
              Clientes podem receber uma mensagem genérica quando um pagamento UPI falha e não
              entender o que deu errado.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>
              Analistas atualmente abrem outro sistema para checar a classificação de risco do
              cliente enquanto investigam um alerta.
            </p>
          </LabeledPanel>
        </TwoPanel>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={2} title="Problema" />
        <p className="text-sm text-foreground/80">Explique por que isso importa.</p>
        <TwoPanel>
          <LabeledPanel label="Índia — UPI">
            <p>
              Clientes podem tentar de novo desnecessariamente ou contatar o suporte porque não
              sabem que ação tomar.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>Analistas gastam tempo extra trocando de sistema e podem perder informação de risco relevante.</p>
          </LabeledPanel>
        </TwoPanel>
        <KeyInsight>Contexto = o que acontece. Problema = por que a gente se importa.</KeyInsight>
      </div>

      <PhaseDivider label="Definir" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={3} title="Comportamento Esperado" />
        <p className="text-sm text-foreground/80">Descreva o que deveria acontecer depois da mudança.</p>
        <TwoPanel>
          <LabeledPanel label="Índia — UPI">
            <p>
              Quando um pagamento falha, mostre um motivo compreensível e, onde apropriado,
              orientação sobre o que fazer a seguir.
            </p>
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <p>
              Quando um analista abre um alerta, mostre a classificação de risco mais recente
              disponível do cliente junto com a informação do cliente.
            </p>
          </LabeledPanel>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Note o que não escrevemos: &ldquo;Chamar a API X usando o endpoint Y e popular a coluna
          Z.&rdquo; Isso pode ser parte da implementação. Mas primeiro descreva o comportamento.
        </p>
        <KeyInsight>Não confunda a solução com o requisito.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={4} title="Critérios de Aceitação" />
        <p className="text-sm text-foreground/80">
          Agora torne o comportamento testável, usando{" "}
          <span className="font-semibold text-foreground">Dado</span> /{" "}
          <span className="font-semibold text-foreground">Quando</span> /{" "}
          <span className="font-semibold text-foreground">Então</span>.
        </p>
        <TwoPanel>
          <div className="flex flex-col gap-3">
            <LabeledPanel label="Índia — Saldo insuficiente">
              <Gwt
                lines={[
                  { keyword: "Dado", text: "que o cliente inicia um pagamento UPI" },
                  { keyword: "E", text: "a conta vinculada tem saldo insuficiente" },
                  { keyword: "Quando", text: "a transação falha" },
                  { keyword: "Então", text: "o cliente deveria ver um motivo claro." },
                ]}
              />
            </LabeledPanel>
            <LabeledPanel label="Índia — Banco indisponível">
              <Gwt
                lines={[
                  { keyword: "Dado", text: "que o banco está temporariamente indisponível" },
                  { keyword: "Quando", text: "a transação não pode ser completada" },
                  { keyword: "Então", text: "o cliente deveria ser informado" },
                  { keyword: "E", text: "aconselhado a tentar de novo mais tarde." },
                ]}
              />
            </LabeledPanel>
          </div>
          <div className="flex flex-col gap-3">
            <LabeledPanel label="Capital Markets — Risco disponível">
              <Gwt
                lines={[
                  { keyword: "Dado", text: "que a informação de risco do cliente está disponível" },
                  { keyword: "Quando", text: "o analista abre o alerta" },
                  { keyword: "Então", text: "a classificação de risco mais recente deveria ser exibida." },
                ]}
              />
            </LabeledPanel>
            <LabeledPanel label="Capital Markets — Risco indisponível">
              <Gwt
                lines={[
                  { keyword: "Dado", text: "que a informação de risco do cliente não pode ser recuperada" },
                  { keyword: "Quando", text: "o analista abre o alerta" },
                  { keyword: "Então", text: "mostre &ldquo;Informação de risco indisponível&rdquo;" },
                  { keyword: "E", text: "não apresente uma classificação antiga como atual." },
                ]}
              />
            </LabeledPanel>
          </div>
        </TwoPanel>
        <p className="text-sm text-foreground/80">
          Agora: o QA sabe o que testar. O desenvolvimento sabe qual comportamento importa. O
          negócio pode desafiar a regra antes do código existir. Esse é o ponto.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={5} title="Regras de Negócio" />
        <p className="text-sm text-foreground/80">Algumas regras se aplicam a vários cenários. Mantenha-as visíveis.</p>
        <TwoPanel>
          <LabeledPanel label="Índia — UPI">
            <BulletList
              items={[
                "BR-01: Um pagamento com falha nunca deve aparecer como bem-sucedido.",
                "BR-02: Mensagens ao cliente deveriam usar linguagem compreensível, não códigos de erro internos.",
              ]}
            />
          </LabeledPanel>
          <LabeledPanel label="Capital Markets — Trade Surveillance">
            <BulletList
              items={[
                "BR-01: Só a classificação de risco ativa mais recente deveria ser mostrada.",
                "BR-02: Classificações expiradas não devem aparecer como atuais.",
                "BR-03: Se nenhuma classificação existir, deixe isso claro.",
              ]}
            />
          </LabeledPanel>
        </TwoPanel>
      </div>

      <PhaseDivider label="Reduzir Risco" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={6} title="Requisitos de Dado" />
        <p className="text-sm text-foreground/80">Se o comportamento depende de dado, torne o dado visível.</p>
        <DataTable />
        <p className="text-sm text-foreground/80">
          Você não precisa de um documento de mapeamento enorme para toda story. Mas pergunte:
        </p>
        <KeyInsight>
          O que acontece se o dado estiver faltando, desatualizado, atrasado, duplicado, ou
          inconsistente?
        </KeyInsight>
        <p className="text-sm text-foreground/80">Essa pergunta costuma expor requisitos importantes.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={7} title="Dependências" />
        <p className="text-sm text-foreground/80">Pergunte: o que precisa funcionar antes dessa story conseguir funcionar?</p>
        <LabeledPanel label="Índia — UPI">
          <BulletList
            items={[
              "A plataforma de pagamento retorna um status de falha significativo.",
              "Status de falha são mapeados para mensagens amigáveis ao cliente.",
              "O app mobile suporta as respostas novas.",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">Stories simples costumam travar aqui. Encontre dependências cedo.</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={8} title="Suposições" />
        <p className="text-sm text-foreground/80">Escreva o que o time está atualmente tratando como verdade.</p>
        <LabeledPanel label="Capital Markets — Trade Surveillance">
          <BulletList
            items={[
              "Um cliente tem uma classificação de risco ativa.",
              "O sistema de risco é dono da classificação.",
              "Usuários de surveillance conseguem visualizá-la.",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">
          Suposições são perigosas quando todo mundo as tem, mas ninguém as escreve.
        </p>
        <KeyInsight>Uma suposição não é uma decisão.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={9} title="Fora de Escopo" />
        <p className="text-sm text-foreground/80">Torne a fronteira visível.</p>
        <LabeledPanel label="Índia — UPI, fora de escopo">
          <BulletList
            items={[
              "Mudanças de roteamento de pagamento",
              "Mudanças de processamento do lado do banco",
              "Tratamento de reembolso",
              "Falhas de pagamento com cartão",
            ]}
          />
        </LabeledPanel>
        <p className="text-sm text-foreground/80">Escopo claro evita discussões depois.</p>
      </div>

      <PhaseDivider label="Preservar" />

      <div className="flex flex-col gap-4">
        <SectionHeading number={10} title="Perguntas em Aberto" />
        <p className="text-sm text-foreground/80">
          Não esconda perguntas não resolvidas em notas de reunião. Coloque-as na story.
        </p>
        <LabeledPanel label="Capital Markets — Trade Surveillance">
          <BulletList
            items={[
              "O que acontece se o serviço de risco der timeout?",
              "Quão antiga a classificação pode ser antes de ficar desatualizada?",
              "Analistas deveriam ver o timestamp da classificação?",
              "Quem é dono da decisão sobre dado desatualizado?",
            ]}
          />
        </LabeledPanel>
        <KeyInsight>Uma pergunta em aberto é normal. Uma pergunta em aberto escondida não é.</KeyInsight>
      </div>

      <div className="flex flex-col gap-4">
        <SectionHeading number={11} title="Registro de Decisões" />
        <p className="text-sm text-foreground/80">Quando uma pergunta importante é respondida, preserve isso.</p>
        <DecisionLogTable />
        <p className="text-sm text-foreground/80">
          Três semanas depois, alguém vai perguntar: &ldquo;Por que fizemos assim?&rdquo; Agora a
          resposta não fica presa na memória de alguém.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <h2 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
          Antes de Mover para Ready
        </h2>
        <Checklist
          label="Checagem de prontidão"
          items={[
            "A gente sabe quem precisa disso?",
            "A gente entende por quê?",
            "O comportamento esperado está claro?",
            "O QA consegue testar?",
            "As regras de negócio estão visíveis?",
            "A gente conhece os sistemas e dados relevantes?",
            "Dependências e suposições estão visíveis?",
            "O fora-de-escopo está claro?",
            "Perguntas em aberto estão visíveis?",
            "A gente sabe quem é dono das decisões-chave?",
          ]}
        />
        <p className="text-sm text-foreground/80">
          Se várias respostas forem não, a story provavelmente não está pronta. E tudo bem. O
          objetivo não é fazer o Jira parecer completo. O objetivo é garantir que o time entenda o
          que está concordando em construir.
        </p>
      </div>
    </div>
  );
}

export { ModeloDeUserStoryParaBusinessAnalystBody };
