import { Checklist } from "@/components/ba-playbooks/checklist";
import { ComparisonTable } from "@/components/ba-playbooks/comparison-table";

// Tradução da versão em inglês em
// everyone-wants-something-different-body.tsx. Este playbook percorre uma
// reunião de requisitos, não dicas independentes — por isso, como os outros
// playbooks narrativos, renderiza como prosa corrida em vez de cards
// numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx.
function TodoMundoQuerUmaCoisaDiferenteBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Você está numa reunião de requisitos.</p>
      <p>O Comercial diz:</p>
      <blockquote>&ldquo;A gente precisa de mais flexibilidade.&rdquo;</blockquote>
      <p>A Operação diz:</p>
      <blockquote>&ldquo;A gente precisa de controles mais rígidos.&rdquo;</blockquote>
      <p>O Compliance diz:</p>
      <blockquote>&ldquo;A gente precisa de menos exceções.&rdquo;</blockquote>
      <p>A Tecnologia finalmente pergunta:</p>
      <blockquote>&ldquo;Alguém pode simplesmente dizer o que a gente vai construir?&rdquo;</blockquote>
      <p>Todo mundo olha para o BA.</p>
      <p>Essa não é necessariamente uma reunião ruim.</p>
      <p>Pode simplesmente significar que cada stakeholder está protegendo uma coisa diferente.</p>
      <p>Seu trabalho não é encontrar a frase que todo mundo desgosta igualmente.</p>
      <p>Seu trabalho é descobrir:</p>
      <blockquote>
        <strong>Que resultado estamos tentando alcançar, quais restrições são reais e quais trocas estamos dispostos a fazer?</strong>
      </blockquote>

      <h2>Aqui está a situação</h2>
      <p>Imagine uma empresa de e-commerce mudando seu processo de reembolso.</p>
      <p>O Comercial quer que os agentes aprovem reembolsos rapidamente.</p>
      <p>A Operação quer controles porque erros de reembolso saem caro.</p>
      <p>O Risco quer que reembolsos grandes sejam revisados.</p>
      <p>A Tecnologia quer um fluxo único e claro.</p>
      <p>Então qual é o requisito?</p>
      <p>&ldquo;Deixar os reembolsos flexíveis&rdquo;? &ldquo;Exigir aprovação&rdquo;? &ldquo;Reduzir exceções&rdquo;?</p>
      <p>Nenhuma dessas frases basta.</p>
      <p>São posições de stakeholders.</p>
      <p>
        <strong>O requisito de verdade está por baixo delas.</strong>
      </p>

      <h2>1. ESCUTE — o que cada stakeholder está realmente protegendo?</h2>
      <p>Comece entendendo cada perspectiva.</p>
      <p>
        Pergunte ao Comercial: &ldquo;Que problema mais flexibilidade resolveria?&rdquo; Talvez clientes esperem
        dois dias por reembolsos simples.
      </p>
      <p>
        Pergunte à Operação: &ldquo;De que risco os controles estão nos protegendo?&rdquo; Talvez os agentes às
        vezes reembolsem o valor errado.
      </p>
      <p>
        Pergunte ao Risco: &ldquo;Quais reembolsos realmente precisam de revisão adicional?&rdquo; Talvez só os
        reembolsos acima de um certo valor.
      </p>
      <p>Agora a discordância fica mais precisa.</p>
      <p>
        O Comercial talvez não queira <strong>nenhum controle</strong>. A Operação talvez não queira{" "}
        <strong>aprovação em tudo</strong>.
      </p>
      <p>Essas eram posições. As necessidades por baixo delas podem ser compatíveis.</p>

      <h2>2. SEPARE — necessidade ou solução proposta?</h2>
      <p>Stakeholders costumam descrever soluções como requisitos.</p>
      <blockquote>&ldquo;Adiciona uma tela de aprovação.&rdquo;</blockquote>
      <blockquote>&ldquo;Dá um botão de override para os gestores.&rdquo;</blockquote>
      <blockquote>&ldquo;Deixa tudo automático.&rdquo;</blockquote>
      <p>Antes de aceitar a solução, pergunte:</p>
      <blockquote>
        <strong>&ldquo;Que problema isso resolveria?&rdquo;</strong>
      </blockquote>
      <p>Talvez &ldquo;tela de aprovação&rdquo; signifique de verdade: reembolsos de alto valor precisam de revisão independente.</p>
      <p>Talvez &ldquo;botão de override&rdquo; signifique: casos urgentes precisam de um caminho de exceção.</p>
      <p>Talvez &ldquo;automatizar tudo&rdquo; signifique: reembolsos de baixo risco não deveriam esperar por revisão manual.</p>
      <p>Agora você consegue desenhar em torno da <strong>necessidade</strong>, não da primeira solução que alguém sugeriu.</p>

      <h2>3. CONFLITO — onde as necessidades realmente colidem?</h2>
      <p>Escreva as necessidades claramente.</p>
      <p>
        <strong>Comercial:</strong> reduzir o tempo de espera do cliente.
        <br />
        <strong>Operação:</strong> reduzir erros de reembolso.
        <br />
        <strong>Risco:</strong> controlar a exposição de alto valor.
        <br />
        <strong>Tecnologia:</strong> manter o fluxo sustentável.
      </p>
      <p>Depois pergunte:</p>
      <blockquote>
        <strong>&ldquo;Onde essas necessidades realmente entram em conflito?&rdquo;</strong>
      </blockquote>
      <p>Talvez todo mundo concorde que reembolsos abaixo de um limite baixo deveriam ser rápidos.</p>
      <p>A discordância só existe acima desse limite.</p>
      <p>Uma discussão de quatro lados acabou de virar uma decisão só.</p>
      <p>
        <strong>Isso é trabalho de BA.</strong>
      </p>

      <h2>4. RESTRIÇÕES — o que não pode ser negociado?</h2>
      <p>Algumas preferências são flexíveis. Algumas restrições não são.</p>
      <p>Procure por:</p>
      <ul>
        <li>regulação</li>
        <li>política interna</li>
        <li>compromissos contratuais</li>
        <li>segurança</li>
        <li>orçamento</li>
        <li>arquitetura</li>
        <li>disponibilidade de dados</li>
        <li>datas de entrega</li>
        <li>capacidade operacional</li>
      </ul>
      <p>Suponha que o Risco diga que reembolsos grandes exigem aprovação independente por causa de uma política da empresa.</p>
      <p>Isso é diferente de:</p>
      <blockquote>&ldquo;A gente prefere que os gestores aprovem.&rdquo;</blockquote>
      <p>Deixe as restrições explícitas. Senão os times discutem opções que nunca foram viáveis.</p>

      <h2>5. PRIORIZE — o que importa mais?</h2>
      <p>Quando tudo é &ldquo;crítico&rdquo;, nada é.</p>
      <p>Pergunte:</p>
      <p>
        O que é indispensável? O que cria mais valor de negócio? O que evita o maior risco? O que pode
        esperar? O que acontece se a gente não fizer isso?
      </p>
      <p>Ordene os resultados em vez da hierarquia dos stakeholders. Por exemplo:</p>
      <ol>
        <li>Impedir reembolsos de alto valor não autorizados.</li>
        <li>Reduzir a espera do cliente para reembolsos de baixo risco.</li>
        <li>Reduzir trabalho manual.</li>
        <li>Melhorar os relatórios.</li>
      </ol>
      <p>Agora as decisões de design têm algo para se ancorar.</p>

      <h2>6. TROCAS — mostre o que cada opção ganha e custa</h2>
      <p>Não pergunte:</p>
      <blockquote>&ldquo;Qual opção você prefere?&rdquo;</blockquote>
      <p>Mostre as consequências.</p>

      <ComparisonTable
        columns={["Opção", "Ganho", "Custo"]}
        rows={[
          {
            cells: [
              "A — Aprovação para todo reembolso",
              "Controle mais forte.",
              "Experiência do cliente mais lenta e mais trabalho operacional.",
            ],
          },
          {
            cells: [
              "B — Sem aprovação",
              "Processo mais rápido.",
              "Maior exposição a erros e fraude.",
            ],
          },
          {
            cells: [
              "C — Aprovação baseada em risco",
              "Velocidade onde o risco é baixo, controle onde o risco é alto.",
              "Abaixo de um limite baixo → automático. Faixa do meio → aprovação do agente. Acima de um limite alto → revisão do gestor.",
            ],
          },
        ]}
      />

      <p>Agora o time não está discutindo opiniões.</p>
      <p>
        <strong>Está escolhendo uma troca.</strong>
      </p>

      <h2>7. DECIDA — não persiga o consenso perfeito</h2>
      <p>Uma armadilha comum do BA é tentar deixar todo mundo completamente feliz.</p>
      <p>Às vezes isso não é possível.</p>
      <p>O objetivo não é:</p>
      <blockquote>
        <strong>Todo mundo ganha tudo.</strong>
      </blockquote>
      <p>O objetivo é:</p>
      <blockquote>
        <strong>A decisão certa é tomada com as trocas entendidas.</strong>
      </blockquote>
      <p>Se os stakeholders não conseguem concordar, identifique o responsável pela decisão. Apresente:</p>
      <p>
        <strong>problema &rarr; opções &rarr; restrições &rarr; impacto &rarr; recomendação</strong>
      </p>
      <p>Depois consiga uma decisão.</p>
      <p>Consenso é útil.</p>
      <p>
        <strong>Decisão é essencial.</strong>
      </p>

      <h2>8. DOCUMENTE — transforme a decisão em comportamento construível</h2>
      <p>Suponha que o time escolha aprovação baseada em risco. Agora deixe isso preciso.</p>
      <blockquote>
        Reembolsos abaixo do limite baixo podem ser processados por um agente de atendimento
        autorizado sem aprovação adicional.
      </blockquote>
      <blockquote>Reembolsos na faixa do meio exigem confirmação do agente e registro do motivo.</blockquote>
      <blockquote>Reembolsos acima do limite alto exigem aprovação do gestor antes de processar.</blockquote>
      <p>Depois defina:</p>
      <ul>
        <li>papéis de usuário</li>
        <li>limites</li>
        <li>exceções</li>
        <li>comportamento de erro</li>
        <li>requisitos de auditoria</li>
        <li>notificações</li>
        <li>relatórios</li>
        <li>critérios de aceitação</li>
      </ul>
      <p>E não mande:</p>
      <blockquote>&ldquo;Por favor revise os requisitos.&rdquo;</blockquote>
      <p>Mande:</p>
      <blockquote>
        &ldquo;Concordamos em aprovação baseada em risco. Por favor confirme esses limites, papéis e regras
        de exceção.&rdquo;
      </blockquote>
      <p>Confirmação específica gera feedback melhor.</p>

      <h2>E se o stakeholder mais sênior discordar?</h2>
      <p>Hierarquia pode determinar quem decide. Isso não remove a necessidade de mostrar as consequências.</p>
      <p>Se quem decide escolhe aprovação para todo reembolso, documente o impacto:</p>
      <blockquote>
        Aprovação em todo reembolso aumenta o controle, mas deve aumentar o tempo de atendimento e a
        carga de trabalho operacional.
      </blockquote>
      <p>Seu trabalho não é sobrepor a decisão de quem decide.</p>
      <p>
        <strong>É garantir que essa pessoa consiga ver o que está escolhendo.</strong>
      </p>

      <h2>E se todo mundo estiver certo?</h2>
      <p>Frequentemente estão.</p>
      <p>
        O Comercial está certo sobre a experiência do cliente. A Operação está certa sobre controle. O
        Risco está certo sobre exposição. A Tecnologia está certa sobre complexidade.
      </p>
      <p>A resposta pode não ser escolher um vencedor.</p>
      <p>Pode ser:</p>
      <p>
        <strong>limites</strong> &middot; <strong>fluxos diferentes</strong> &middot; <strong>permissões</strong>{" "}
        &middot; <strong>exceções</strong> &middot; <strong>entrega faseada</strong> &middot;{" "}
        <strong>regras configuráveis</strong>
      </p>
      <p>Necessidades conflitantes às vezes precisam de um design melhor, não de compromisso.</p>

      <h2>Armadilhas comuns</h2>
      <h3>Escolher um lado</h3>
      <blockquote>&ldquo;O Negócio quer isso, então a Tecnologia precisa construir.&rdquo;</blockquote>
      <p>Você vira um mensageiro, não um analista.</p>
      <h3>Pular direto para soluções</h3>
      <blockquote>&ldquo;Vamos adicionar um botão de aprovação.&rdquo;</blockquote>
      <p>Você pode resolver o problema errado.</p>
      <h3>Concordar com tudo</h3>
      <p>Todo pedido de stakeholder vira escopo. O produto fica caro e contraditório.</p>
      <h3>Ignorar suposições</h3>
      <p>Todo mundo acha que concordou porque ninguém disse em voz alta o que estava presumindo.</p>
      <h3>Perseguir consenso para sempre</h3>
      <p>As reuniões continuam porque ninguém identifica quem é responsável pela decisão.</p>
      <h3>Esquecer a troca</h3>
      <p>Três meses depois:</p>
      <blockquote>&ldquo;Por que escolhemos isso?&rdquo;</blockquote>
      <p>Ninguém lembra.</p>

      <h2>Antes de encerrar a reunião</h2>
      <Checklist
        label="Dez checagens"
        items={[
          "O problema de negócio de fundo está claro.",
          "A necessidade real de cada stakeholder está entendida.",
          "As soluções propostas estão separadas das necessidades.",
          "Os conflitos genuínos estão visíveis.",
          "As restrições estão documentadas.",
          "Os indispensáveis estão separados das preferências.",
          "As opções e trocas estão entendidas.",
          "O responsável pela decisão está claro.",
          "A abordagem escolhida está documentada.",
          "Os requisitos e critérios de aceitação refletem a decisão.",
        ]}
      />
      <p>
        Se você tem dez sins, a Tecnologia não deveria mais precisar perguntar: &ldquo;Então&hellip; o que
        exatamente a gente vai construir?&rdquo;
      </p>

      <h2>O que fica</h2>
      <p>A discordância entre stakeholders costuma ser onde o requisito de verdade está escondido.</p>
      <p>
        Quando o Comercial pede flexibilidade, a Operação pede controle e o Risco pede menos exceções,
        não vá direto pro meio-termo.
      </p>
      <p>Pergunte o que cada pessoa está tentando proteger. Exponha o conflito real. Deixe as restrições visíveis.</p>
      <p>Mostre as trocas. Consiga a decisão.</p>
      <blockquote>
        <strong>
          O trabalho do BA não é encontrar o meio-termo. É encontrar o requisito que melhor serve o
          resultado dentro das restrições reais.
        </strong>
      </blockquote>
      <p>Um bom BA não faz todo mundo concordar.</p>
      <p>
        <strong>Um bom BA garante que todo mundo entenda o que foi decidido — e por quê.</strong>
      </p>
    </div>
  );
}

export { TodoMundoQuerUmaCoisaDiferenteBody };
