import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { ComparisonTable } from "@/components/ba-playbooks/comparison-table";

// Tradução da versão em inglês em
// release-tomorrow-requirement-changed-today-body.tsx. Este playbook percorre
// uma decisão de dia de release, não dicas independentes — por isso, como os
// outros playbooks narrativos, renderiza como prosa corrida em vez de cards
// numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx.
function ReleaseEAmanhaORequisitoMudouHojeBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;Dá pra encaixar uma mudancinha?&rdquo;</h2>
      <p>Amanhã é dia de release.</p>
      <p>O build está pronto. O QA terminou os testes. As release notes estão sendo preparadas.</p>
      <p>Aí, às 16h37:</p>
      <blockquote>&ldquo;Precisamos de uma pequena mudança de requisito antes de amanhã.&rdquo;</blockquote>
      <p>Todo mundo olha para o BA.</p>
      <p>Você diz sim? Não? Adia a release?</p>
      <p>Nenhuma dessas deveria ser sua primeira reação.</p>
      <blockquote>
        <strong>Pause. Entenda a mudança. Deixe o risco visível.</strong>
      </blockquote>
      <p>Porque quando a release é amanhã, você não está mais gerenciando só um requisito.</p>
      <p>Você está gerenciando uma decisão de release.</p>

      <h2>Aqui está a situação</h2>
      <p>Imagine um fluxo de checkout de e-commerce programado para ir ao ar amanhã.</p>
      <p>O requisito aprovado diz:</p>
      <blockquote>Clientes novos podem fazer um pedido depois da verificação de e-mail e celular.</blockquote>
      <p>Hoje, o negócio adiciona:</p>
      <blockquote>&ldquo;A gente também precisa de verificação de endereço para todo cliente novo.&rdquo;</blockquote>
      <p>Parece pequeno.</p>
      <p>Mas o desenvolvimento e a regressão já terminaram, e a Operação está pronta.</p>
      <p>Essa mudança &ldquo;pequena&rdquo; pode tocar:</p>
      <blockquote>
        <strong>UI &rarr; API &rarr; dado do cliente &rarr; serviço de verificação &rarr; tratamento de erro &rarr; testes &rarr; suporte</strong>
      </blockquote>
      <p>O calendário diz um dia.</p>
      <p>O sistema não liga para isso.</p>

      <h2>O primeiro erro: editar o Jira imediatamente</h2>
      <p>Alguém pergunta:</p>
      <blockquote>&ldquo;Você consegue atualizar rapidinho os critérios de aceitação?&rdquo;</blockquote>
      <p>Não. Ainda não.</p>
      <p>Atualizar o Jira não torna o sistema seguro para liberar.</p>
      <p>Primeiro pergunte:</p>
      <blockquote>
        <strong>O que mudou, o que isso toca e o que acontece se a gente errar?</strong>
      </blockquote>

      <h2>1. Pause — não se comprometa sob pressão</h2>
      <p>Uma resposta útil é:</p>
      <blockquote>&ldquo;Vamos avaliar rapidamente o impacto antes de comprometer isso na release de amanhã.&rdquo;</blockquote>
      <p>Isso não é resistência.</p>
      <p>É entrega responsável.</p>
      <blockquote>
        <strong>A urgência deveria aumentar a disciplina, não removê-la.</strong>
      </blockquote>

      <h2>2. Entenda — o que realmente mudou?</h2>
      <p>&ldquo;Adicionar verificação de endereço&rdquo; não basta.</p>
      <p>Esclareça:</p>
      <ComparisonTable
        columns={["Pergunte", "Confirme"]}
        rows={[
          { cells: ["Escopo", "Quem/o que é afetado? O que exatamente mudou?"] },
          { cells: ["Comportamento", "Sucesso, falha, retry e comportamento de exceção"] },
          { cells: ["Momento", "Por que agora? É obrigatório para esta release?"] },
          { cells: ["Risco", "O que acontece se não incluirmos?"] },
        ]}
      />
      <p>Uma frase vaga pode esconder várias decisões de negócio.</p>
      <p>Amanhã é um péssimo dia para descobri-las.</p>

      <h2>3. Impacto rápido — o que isso toca?</h2>
      <p>Você pode não ter dias para uma análise.</p>
      <p>Você ainda precisa de uma análise.</p>
      <p>Rastreie o caminho útil mais curto:</p>
      <blockquote>
        <strong>Requisito &rarr; UI &rarr; API &rarr; Dados &rarr; Regras &rarr; Integrações &rarr; Testes &rarr; Operações</strong>
      </blockquote>
      <p>Pergunte para quem está mais perto do impacto:</p>
      <ul>
        <li>
          <strong>Engenharia:</strong> Quais componentes mudam?
        </li>
        <li>
          <strong>QA:</strong> Quais cenários precisam ser reexecutados?
        </li>
        <li>
          <strong>Operações:</strong> O processo de amanhã muda?
        </li>
        <li>
          <strong>Produto:</strong> O que acontece se deixarmos de fora?
        </li>
        <li>
          <strong>Risco/Compliance:</strong> É opcional, orientado a risco ou obrigatório?
        </li>
      </ul>
      <p>Rápido não significa descuidado.</p>
      <p>
        Significa <strong>focado</strong>.
      </p>

      <h2>4. Realidade do esforço — quanto tempo até estar pronto para release?</h2>
      <p>&ldquo;A gente codifica isso em duas horas&rdquo; não é o mesmo que:</p>
      <blockquote>&ldquo;A gente consegue liberar isso com segurança em duas horas.&rdquo;</blockquote>
      <p>Uma mudança pode precisar de:</p>
      <blockquote>
        <strong>desenvolvimento + revisão + build + deploy + teste de integração + regressão + aprovação final</strong>
      </blockquote>
      <p>Pergunte:</p>
      <blockquote>
        <strong>&ldquo;Quanto tempo até isso estar pronto para release, não só codificado?&rdquo;</strong>
      </blockquote>
      <p>Uma mudança de código de duas horas pode virar uma mudança de release de oito horas.</p>

      <h2>5. Opções — não force uma decisão binária</h2>
      <p>Traga alternativas.</p>

      <h3>Opção A — Absorver</h3>
      <p>Inclua a mudança amanhã quando o impacto for pequeno, a implementação for entendida, os testes puderem terminar e o risco for aceitável.</p>

      <h3>Opção B — Trocar escopo</h3>
      <p>Se a mudança importa, mas o tempo é fixo, remova ou reduza outra coisa.</p>
      <blockquote>
        <strong>Troque escopo em vez de fingir que capacidade apareceu do nada.</strong>
      </blockquote>

      <h3>Opção C — Feature flag / configuração</h3>
      <p>Implemente a capacidade, mas mantenha-a controlada ou desabilitada até estar pronta.</p>
      <p>Só use isso quando a arquitetura já suporta.</p>

      <h3>Opção D — Adiar</h3>
      <p>Mantenha a release de amanhã estável e mova a mudança para a próxima release, com os testes devidos.</p>
      <p>Às vezes a mudança mais segura é a que você não apressa.</p>

      <h3>Opção E — Não incluir</h3>
      <p>Se o tempo não sustenta implementação e testes seguros, diga isso claramente:</p>
      <blockquote>&ldquo;Não conseguimos demonstrar que essa mudança pode ser implementada e testada com segurança antes da release de amanhã.&rdquo;</blockquote>
      <p>Isso não é &ldquo;o BA rejeitou&rdquo;.</p>
      <p>É uma recomendação baseada em risco.</p>

      <h2>6. Comunique — reúna quem decide</h2>
      <p>Essa não é uma decisão só do BA.</p>
      <p>Reúna quem entende de:</p>
      <ul>
        <li>
          <strong>Prioridade de negócio</strong> &rarr; Produto / Negócio
        </li>
        <li>
          <strong>Impacto técnico</strong> &rarr; Engenharia
        </li>
        <li>
          <strong>Risco de qualidade</strong> &rarr; QA
        </li>
        <li>
          <strong>Impacto na release</strong> &rarr; Entrega / Release Management
        </li>
        <li>
          <strong>Impacto operacional</strong> &rarr; Operações / Suporte
        </li>
        <li>
          <strong>Obrigações de controle</strong> &rarr; Risco / Compliance, quando relevante
        </li>
      </ul>
      <p>O trabalho do BA é garantir que todo mundo esteja decidindo a partir dos mesmos fatos.</p>
      <p>E um ponto importa:</p>
      <blockquote>
        <strong>O BA informa a decisão. O responsável de negócio/release toma a decisão final de ir ou não ir.</strong>
      </blockquote>

      <h2>7. Decida — deixe a decisão explícita</h2>
      <p>Registre:</p>
      <blockquote>
        <strong>motivo &rarr; impacto &rarr; responsável &rarr; resultado</strong>
      </blockquote>
      <p>Por exemplo:</p>
      <blockquote>
        A verificação de endereço foi pedida um dia antes da release. A Engenharia estima quatro
        horas para implementação e revisão. O QA precisa de três horas para a regressão impactada. O
        time concordou em adiar porque não é possível completar testes suficientes antes da janela
        de release.
      </blockquote>
      <p>Ou:</p>
      <blockquote>
        A mudança afeta só configuração. O QA confirmou que os cenários impactados podem ser
        reexecutados antes da janela de release. Produto, Engenharia e QA concordaram em incluí-la.
      </blockquote>
      <p>Muito melhor do que:</p>
      <blockquote>&ldquo;O negócio disse que era urgente.&rdquo;</blockquote>

      <h2>Antes de dar o sinal verde</h2>
      <p>Se a mudança vai entrar na release de amanhã, verifique:</p>
      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <Checklist
          label="Requisito e build"
          items={[
            "Requisito e critérios de aceitação estão atualizados",
            "O build final foi gerado",
            "Os testes impactados foram atualizados e executados",
            "Defeitos críticos/altos estão resolvidos ou explicitamente aceitos",
            "Sistemas e dados downstream foram verificados",
          ]}
        />
        <Checklist
          label="Operações e aprovação"
          items={[
            "Operações e Suporte sabem o que mudou",
            "A abordagem de rollback ou recuperação está entendida",
            "Negócio/Produto aceita a decisão de release",
            "O responsável pela decisão e qualquer exceção de risco estão registrados",
          ]}
        />
      </div>
      <p>Se você não consegue explicar a <strong>mudança, o impacto e a decisão</strong> com clareza, provavelmente você não está pronto para liberar.</p>

      <h2>E se o Compliance disser que é obrigatório?</h2>
      <p>Aí a restrição muda.</p>
      <p>Imagine um banco liberando um fluxo de onboarding de cliente amanhã.</p>
      <p>O Compliance descobre que uma regra obrigatória de triagem foi esquecida.</p>
      <p>Você pode não conseguir liberar sem ela.</p>
      <p>Mas isso não significa:</p>
      <blockquote>&ldquo;Pula os testes porque o Compliance disse que é urgente.&rdquo;</blockquote>
      <p>As opções podem virar:</p>
      <blockquote>
        <strong>corrigir e testar &rarr; atrasar a release &rarr; desabilitar a funcionalidade afetada</strong>
      </blockquote>
      <p>A restrição mudou.</p>
      <p>A necessidade de análise de impacto não mudou.</p>

      <h2>E se o CEO perguntar?</h2>
      <p>Mesmo processo.</p>
      <p>Hierarquia muda prioridade.</p>
      <p>
        <strong>Não muda a física.</strong>
      </p>
      <p>O código ainda precisa funcionar. As integrações ainda precisam se comportar. Os testes ainda precisam passar.</p>
      <p>Uma resposta útil continua sendo:</p>
      <blockquote>
        <strong>&ldquo;A gente consegue avaliar, sim. Aqui estão os impactos, riscos e opções.&rdquo;</strong>
      </blockquote>

      <h2>O que fica</h2>
      <p>Mudanças de última hora vão acontecer.</p>
      <p>O objetivo não é eliminá-las.</p>
      <p>É impedir que a urgência vire caos.</p>
      <blockquote>
        <strong>Quanto mais perto da release, mais caras ficam as suposições.</strong>
      </blockquote>
      <p>Então, quando alguém disser:</p>
      <blockquote>&ldquo;A release é amanhã. Dá pra só adicionar isso?&rdquo;</blockquote>
      <p>Não entre em pânico. Não diga não de cara. E não fique atualizando o Jira em silêncio.</p>
      <blockquote>
        <strong>Entenda a mudança. Exponha o risco. Dê opções ao time. Deixe a decisão visível.</strong>
      </blockquote>
      <p>Um bom BA não impede a mudança.</p>
      <blockquote>
        <strong>Um bom BA ajuda o time a mudar com segurança.</strong>
      </blockquote>
    </div>
  );
}

export { ReleaseEAmanhaORequisitoMudouHojeBody };
