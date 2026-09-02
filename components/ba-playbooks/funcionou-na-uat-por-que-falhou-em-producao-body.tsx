import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";
import { ComparisonTable } from "@/components/ba-playbooks/comparison-table";

// Tradução da versão em inglês em uat-passed-production-failed-body.tsx.
// Este playbook rastreia uma transação real através de tabelas de
// comparação reais, não dicas independentes — por isso, como os outros
// playbooks narrativos, renderiza como prosa corrida em vez de cards
// numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx. Omite o infográfico e o
// DownloadCard só em inglês do original.
function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

function FuncionouNaUatPorQueFalhouEmProducaoBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;Mas a gente testou&rdquo; é o começo da investigação, não o fim</h2>
      <p>Segunda de manhã.</p>
      <p>Uma mensagem aparece no grupo do projeto:</p>
      <blockquote>&ldquo;Clientes não conseguem cancelar alguns pedidos. Isso funcionava na UAT. O que mudou?&rdquo;</blockquote>
      <p>O QA diz:</p>
      <blockquote>&ldquo;A gente testou o cancelamento. Passou.&rdquo;</blockquote>
      <p>O Desenvolvimento diz:</p>
      <blockquote>&ldquo;O mesmo código foi para produção.&rdquo;</blockquote>
      <p>A Operação diz:</p>
      <blockquote>&ldquo;Clientes reais ainda estão sendo afetados.&rdquo;</blockquote>
      <p>Todo mundo pode estar dizendo a verdade.</p>
      <p>É isso que torna esse tipo de incidente confuso.</p>
      <p>
        A funcionalidade pode passar na UAT e ainda assim falhar em produção — não porque a UAT foi
        inútil, mas porque a produção raramente é só a UAT com mais usuários.
      </p>
      <p>Ela tem dado, integrações, permissões, configuração, timing e volume diferentes.</p>
      <blockquote>
        <strong>Mesmo código não significa o mesmo sistema.</strong>
      </blockquote>
      <p>Vamos investigar um incidente juntos.</p>

      <h2>Aqui está o requisito</h2>
      <p>Uma empresa indiana de e-commerce introduz o cancelamento de pedido self-service.</p>
      <p>O requisito diz:</p>
      <blockquote>Um cliente pode cancelar um pedido até ele ter sido despachado.</blockquote>
      <p>O time constrói a funcionalidade.</p>
      <p>Na UAT, o QA testa pedidos com esses status:</p>
      <ul>
        <li>
          <strong>PLACED</strong> &rarr; cancelamento permitido
        </li>
        <li>
          <strong>READY_TO_PACK</strong> &rarr; cancelamento permitido
        </li>
        <li>
          <strong>DISPATCHED</strong> &rarr; cancelamento bloqueado
        </li>
      </ul>
      <p>Tudo passa.</p>
      <p>A funcionalidade vai ao ar.</p>
      <p>
        Depois um cliente tenta cancelar um pedido de tênis de <strong>R$ 499,90</strong>. O pedido
        não foi despachado, mas o botão <strong>Cancelar pedido</strong> está faltando.
      </p>
      <p>Então o que aconteceu?</p>

      <h2>Primeiro, entenda o que a UAT realmente provou</h2>
      <p>A UAT provou que a funcionalidade se comportou como esperado:</p>
      <ul>
        <li>com o dado usado na UAT</li>
        <li>contra as integrações da UAT</li>
        <li>sob a configuração da UAT</li>
        <li>com os papéis de usuário testados</li>
        <li>para os cenários que o time sabia testar</li>
      </ul>
      <p>Isso importa.</p>
      <p>Mas não provou que a produção enviaria o mesmo dado pelo mesmo caminho sob as mesmas condições.</p>
      <blockquote>
        <strong>
          A UAT testa o comportamento esperado num mundo controlado. A produção introduz o mundo
          que você não controlou totalmente.
        </strong>
      </blockquote>
      <p>Isso não torna isso automaticamente uma falha de teste.</p>
      <p>Significa que a investigação deveria começar pelas diferenças, não pela culpa.</p>

      <h2>Antes da investigação: proteja o cliente</h2>
      <p>
        Se a falha está causando perda financeira, expondo dado, bloqueando trabalho crítico ou
        afetando muitos usuários, a contenção vem primeiro.
      </p>
      <p>O time pode precisar desativar a funcionalidade, pausar o processamento, fazer rollback da release ou oferecer um workaround temporário.</p>
      <p>O BA pode ajudar a estabelecer:</p>
      <ul>
        <li>quem é afetado</li>
        <li>quais produtos, regiões e canais estão envolvidos</li>
        <li>se dinheiro, dado, compliance ou compromissos com o cliente estão em risco</li>
        <li>que comportamento é seguro até a causa ser entendida</li>
      </ul>
      <p>Preserve a evidência, mas não mantenha uma funcionalidade prejudicial rodando só para facilitar a investigação.</p>

      <h2>Passo 1: Preserve o exemplo com falha</h2>
      <p>Antes que alguém atualize dado, tente de novo a transação ou mude a configuração, capture uma falha real.</p>
      <p>Para o nosso pedido, registre:</p>
      <ul>
        <li>ID do pedido</li>
        <li>cliente e tipo de conta</li>
        <li>data e hora exata</li>
        <li>canal: web, Android, iOS ou API</li>
        <li>status mostrado ao cliente</li>
        <li>status recebido do sistema de armazém</li>
        <li>comportamento esperado</li>
        <li>comportamento real</li>
        <li>screenshot ou mensagem de erro</li>
        <li>versão da release e configuração</li>
      </ul>
      <p>Não comece com:</p>
      <blockquote>&ldquo;O cancelamento está quebrado.&rdquo;</blockquote>
      <p>Comece com:</p>
      <blockquote>
        &ldquo;Para o pedido IN-48217, às 10:42 no horário de Brasília, o cliente não conseguiu
        cancelar pelo app Android mesmo com o pedido ainda não despachado.&rdquo;
      </blockquote>
      <p>Agora o time tem algo que consegue rastrear.</p>
      <p>Sem um exemplo específico, cada time investiga um problema ligeiramente diferente.</p>

      <h2>Passo 2: Siga a transação — não as opiniões</h2>
      <p>O cliente não vê nenhum botão de cancelamento.</p>
      <p>Isso não significa que a tela é o problema.</p>
      <p>O botão pode depender de uma decisão tomada vários sistemas antes.</p>
      <p>
        Para o pedido <strong>IN-48217</strong>, o time rastreia o caminho:
      </p>
      <ol>
        <li>O app pede os detalhes mais recentes do pedido.</li>
        <li>O serviço de pedidos recupera o status de atendimento.</li>
        <li>
          O sistema de armazém retorna <strong>ALLOCATED</strong>.
        </li>
        <li>A regra de cancelamento checa se esse status é cancelável.</li>
        <li>
          <strong>ALLOCATED</strong> não está na lista de status permitidos.
        </li>
        <li>
          O serviço retorna <code>canCancel: false</code>.
        </li>
        <li>O app esconde o botão.</li>
      </ol>
      <p>A tela se comportou corretamente com base na resposta que recebeu.</p>
      <p>A primeira diferença significativa apareceu antes: o armazém de produção retornou um status que ninguém tinha usado na UAT.</p>
      <blockquote>
        <strong>Não pergunte só onde a falha ficou visível. Pergunte onde o comportamento primeiro ficou diferente.</strong>
      </blockquote>

      <h2>Passo 3: Compare a UAT e a produção lado a lado</h2>
      <p>&ldquo;Os ambientes são iguais&rdquo; não é evidência.</p>
      <p>Construa uma pequena tabela de comparação.</p>
      <ComparisonTable
        columns={["Área", "UAT", "Produção", "Diferença?"]}
        rows={[
          { cells: ["Status do pedido", "READY_TO_PACK", "ALLOCATED", "Sim"] },
          { cells: ["Integração de armazém", "Stub de teste", "Plataforma de armazém real", "Sim"] },
          { cells: ["Regra de cancelamento", "Status conhecidos permitidos", "Mesma lista configurada", "Não"] },
          { cells: ["Papel do cliente", "Cliente de teste", "Cliente varejo", "Não"] },
          { cells: ["Canal", "Web e Android", "Android", "Não"] },
          { cells: ["Feature flag", "Habilitada", "Habilitada", "Não"] },
          { cells: ["Versão da release", "5.8.0", "5.8.0", "Não"] },
        ]}
      />
      <p>Isso muda a conversa.</p>
      <p>O time não está mais debatendo se &ldquo;o mesmo código&rdquo; foi implantado.</p>
      <p>Está olhando as condições ao redor desse código — porque o código é só uma parte do comportamento.</p>

      <h2>Passo 4: Cheque os sete lugares onde a produção costuma diferir</h2>
      <p>Você não precisa inspecionar tudo aleatoriamente. Percorra sete áreas.</p>

      <h3>1. Dado</h3>
      <p>
        Procure valores que nunca apareceram na UAT, campos faltando, registros históricos,
        duplicatas e formatos inesperados. No nosso exemplo, <strong>ALLOCATED</strong> existia em
        produção, mas não no conjunto de teste da UAT.
      </p>

      <h3>2. Integrações</h3>
      <p>
        A UAT pode usar um stub, simulador ou sistema downstream simplificado. Compare versões de
        API, campos, mapeamentos, autenticação, timeouts e retries. Aqui, o stub retornava três
        status limpos; o armazém real retornava mais.
      </p>

      <h3>3. Configuração e feature flags</h3>
      <p>
        O código pode ser idêntico enquanto as configurações mudam seu comportamento. Compare
        valores de regra de negócio, limites, configurações de país ou produto, feature flags e
        regras de roteamento.
      </p>

      <h3>4. Papéis e permissões de usuário</h3>
      <p>
        Uma funcionalidade testada com uma conta de administrador pode se comportar de forma
        diferente para um cliente real, usuário de operações ou funcionário de agência.
      </p>
      <p>Cheque tanto o que o usuário consegue ver quanto o que a conta de serviço consegue acessar.</p>

      <h3>5. Timing</h3>
      <p>
        Algumas falhas só existem num momento específico: uma rodada de batch, cache
        desatualizado, horário de corte, conversão de fuso horário, problema de ordem de eventos
        ou atualização concorrente.
      </p>
      <p>
        Um pagamento processado às 23:58 no horário de Brasília e um pagamento internacional
        processado perto de uma mudança de horário de verão podem expor suposições de timing que a
        UAT comum durante o dia nunca tocou.
      </p>

      <h3>6. Volume e concorrência</h3>
      <p>Uma transação de teste limpa não é o mesmo que milhares de clientes agindo juntos.</p>
      <p>A produção pode introduzir filas, travamento, mensagens atrasadas, eventos duplicados ou timeouts.</p>

      <h3>7. Deploy</h3>
      <p>
        Confirme a versão da aplicação, scripts de banco de dados, configuração, dado de
        referência, jobs agendados e releases dependentes que realmente chegaram em produção.
      </p>
      <p>&ldquo;Foi incluído na release&rdquo; e &ldquo;está ativo em produção&rdquo; nem sempre são a mesma afirmação.</p>

      <h2>Passo 5: Volte para o requisito</h2>
      <p>Agora releia a frase original:</p>
      <blockquote>Um cliente pode cancelar um pedido até ele ter sido despachado.</blockquote>
      <p>Parece claro.</p>
      <p>
        Mas o sistema não implementou a palavra <strong>despachado</strong>. Implementou uma lista
        de status considerados como &ldquo;não despachado.&rdquo;
      </p>
      <p>
        Essa lista não incluía <strong>ALLOCATED</strong>.
      </p>
      <p>Essa é a lacuna escondida:</p>
      <ComparisonTable
        columns={["Regra de negócio", "Interpretação do sistema"]}
        rows={[
          {
            cells: [
              "Permitir cancelamento antes do despacho",
              "Permitir cancelamento só para PLACED e READY_TO_PACK",
            ],
          },
        ]}
      />
      <p>Essas afirmações pareciam equivalentes na UAT.</p>
      <p>A produção revelou que não eram.</p>
      <p>A pergunta que faltou foi:</p>
      <blockquote>
        &ldquo;Quais são todos os status que um pedido pode ter antes do despacho — incluindo
        status retornados só pelo armazém real?&rdquo;
      </blockquote>
      <p>Às vezes a produção não invalida o requisito.</p>
      <p>Ela revela uma suposição escondida dentro dele.</p>

      <h2>Passo 6: Classifique o problema corretamente</h2>
      <p>Nem toda divergência de produção é simplesmente &ldquo;um bug.&rdquo;</p>
      <p>Classifique para que a ação certa venha a seguir.</p>
      <ComparisonTable
        columns={["Classificação", "O que significa", "Exemplo"]}
        rows={[
          {
            cells: [
              "Defeito de código",
              "O sistema viola uma regra acordada",
              "Pedidos DISPATCHED ainda podem ser cancelados",
            ],
          },
          {
            cells: [
              "Lacuna de requisito",
              "Um cenário ou regra nunca foi definido",
              "ALLOCATED não foi mapeado como cancelável ou não-cancelável",
            ],
          },
          {
            cells: [
              "Lacuna de cobertura de teste",
              "A regra existia, mas o cenário não foi testado",
              "ALLOCATED estava documentado, mas ausente da UAT",
            ],
          },
          {
            cells: [
              "Problema de configuração",
              "A regra correta está configurada de forma diferente",
              "A feature flag de produção está desabilitada",
            ],
          },
          {
            cells: [
              "Problema de dado",
              "Dado inesperado ou incorreto guia o comportamento",
              "O armazém envia um status inválido",
            ],
          },
          {
            cells: [
              "Problema de deploy",
              "Parte da release está faltando ou inativa",
              "A atualização de dado de referência não foi implantada",
            ],
          },
        ]}
      />
      <p>Para o nosso incidente, a falha imediata é um mapeamento de status faltando.</p>
      <p>Mas o problema mais profundo é compartilhado:</p>
      <ul>
        <li>o requisito não enumerou os estados de atendimento</li>
        <li>o stub da UAT não representava o conjunto real de status</li>
        <li>
          o pacote de teste não incluía <strong>ALLOCATED</strong>
        </li>
      </ul>
      <p>Chamar isso de só um &ldquo;bug de UI&rdquo; corrigiria o sintoma e preservaria as condições que o criaram.</p>
      <p>Um incidente pode ter várias causas contribuintes. A classificação existe para melhorar a correção, não para atribuir a culpa a um time só.</p>

      <h2>Passo 7: Corrija a regra, o teste e o ambiente</h2>
      <p>
        O time decide que <strong>ALLOCATED</strong> ainda significa &ldquo;não despachado.&rdquo;
      </p>
      <p>Então ele:</p>
      <ol>
        <li>
          adiciona <strong>ALLOCATED</strong> ao mapeamento de cancelável
        </li>
        <li>confirma a decisão com os donos de atendimento e atendimento ao cliente</li>
        <li>atualiza a documentação da regra de negócio</li>
        <li>adiciona o status ao dado de teste da UAT</li>
        <li>substitui o conjunto de respostas do stub simplificado pela lista completa de status de produção</li>
        <li>adiciona monitoramento para status de atendimento desconhecidos</li>
        <li>reteste o cancelamento nos canais web, Android, iOS e API</li>
      </ol>
      <p>Agora a correção faz mais do que restaurar um botão faltando.</p>
      <p>Ela torna essa classe de falha mais fácil de prevenir e detectar.</p>

      <h2>O mesmo padrão aparece em toda indústria</h2>
      <p>Os substantivos mudam. A investigação não.</p>
      <ul>
        <li>
          <strong>Bancos:</strong> a UAT testa contas ACTIVE e BLOCKED. A produção envia
          PENDING_REVIEW.
        </li>
        <li>
          <strong>Seguros:</strong> a UAT contém uma apólice por cliente. A produção contém
          clientes migrados com apólices sobrepostas.
        </li>
        <li>
          <strong>Saúde:</strong> a UAT usa IDs de prestador atuais. A produção ainda contém
          registros referenciando IDs aposentados.
        </li>
        <li>
          <strong>E-commerce internacional:</strong> a UAT testa uma moeda e um armazém. A
          produção adiciona moedas, regras fiscais, parceiros de atendimento e fusos horários.
        </li>
        <li>
          <strong>Capital markets:</strong> a UAT testa operações limpas no horário de mercado. A
          produção introduz eventos tardios, emendas, múltiplas praças e confirmações
          assíncronas.
        </li>
      </ul>
      <p>Em cada caso, a pergunta útil não é:</p>
      <blockquote>&ldquo;Quem deixou passar isso?&rdquo;</blockquote>
      <p>É:</p>
      <blockquote>&ldquo;Que condição de produção o nosso modelo de UAT falhou em representar?&rdquo;</blockquote>

      <h2>O que o BA deveria realmente fazer?</h2>
      <p>O BA não precisa ler cada log ou diagnosticar o código sozinho.</p>
      <p>O trabalho do BA é manter a investigação conectada ao comportamento de negócio.</p>
      <p>Isso significa:</p>
      <ul>
        <li>transformar &ldquo;está quebrado&rdquo; num exemplo rastreável</li>
        <li>declarar claramente o comportamento esperado e real</li>
        <li>comparar as condições de UAT e produção</li>
        <li>identificar o primeiro ponto de divergência</li>
        <li>reunir os donos certos de negócio e técnicos</li>
        <li>expor regras e suposições faltando</li>
        <li>registrar a decisão</li>
        <li>garantir que o requisito e os testes de regressão sejam atualizados</li>
      </ul>
      <p>O Desenvolvimento pode localizar a falha técnica.</p>
      <p>O QA pode reproduzir.</p>
      <p>A Operação pode fornecer a evidência de produção.</p>
      <p>O BA ajuda o time a concordar sobre o que o sistema deveria ter feito — e garante que a resposta sobreviva além da chamada de incidente.</p>

      <h2>Oito perguntas para fazer durante o incidente</h2>
      <ol>
        <li>Qual transação exata falhou?</li>
        <li>O que o usuário esperava, e o que aconteceu em vez disso?</li>
        <li>O problema está limitado a certos usuários, produtos, regiões ou canais?</li>
        <li>Esse cenário exato foi testado na UAT?</li>
        <li>A UAT usou os mesmos valores, mapeamentos e integrações?</li>
        <li>Onde a transação primeiro se comportou de forma diferente?</li>
        <li>Isso é um defeito, uma regra faltando ou um cenário novo?</li>
        <li>O que mais depende da mesma regra ou valor de dado?</li>
      </ol>

      <h2>Checklist de Investigação de UAT para Produção</h2>
      <p>Copie isso para o Jira, Confluence ou suas notas de incidente.</p>

      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Impacto e contenção"
          items={[
            "Usuários, produtos, regiões e canais afetados identificados",
            "Risco financeiro, de dado, regulatório e operacional avaliado",
            "Workaround seguro, rollback ou controle de feature considerado",
          ]}
        />
        <ChecklistGroup
          label="Exemplo com falha"
          items={[
            "ID de transação ou registro capturado",
            "Usuário, papel, canal e região registrados",
            "Data e hora exatas registradas",
            "Comportamento esperado escrito claramente",
            "Comportamento real escrito claramente",
            "Screenshot, resposta ou erro capturado",
          ]}
        />
        <ChecklistGroup
          label="Compare ambientes"
          items={[
            "Versão da aplicação",
            "Configuração e feature flags",
            "Dado de referência e mapeamentos",
            "Permissões de usuário e serviço",
            "Versões de API e integração",
            "Stub de teste vs integração real",
            "Jobs de batch, cache e timing",
            "Formato, histórico e volume de dado",
          ]}
        />
        <ChecklistGroup
          label="Rastreie o fluxo"
          items={[
            "Caminho da transação ponta a ponta mapeado",
            "Primeiro ponto de divergência identificado",
            "Impacto upstream e downstream checado",
            "Transações relacionadas pesquisadas",
          ]}
        />
        <ChecklistGroup
          label="Classifique"
          items={[
            "Defeito de código",
            "Lacuna de requisito",
            "Lacuna de cobertura de teste",
            "Problema de configuração",
            "Problema de dado",
            "Problema de deploy",
          ]}
        />
        <ChecklistGroup
          label="Feche corretamente"
          items={[
            "Decisão de negócio registrada",
            "Requisito ou regra atualizados",
            "Dado de UAT e testes de regressão atualizados",
            "Cenário parecido com produção adicionado",
            "Monitoramento ou alerta considerado",
            "Funcionalidades relacionadas checadas para a mesma suposição",
          ]}
        />
      </div>

      <h2>Antes da próxima release</h2>
      <p>Você não consegue tornar a UAT idêntica à produção.</p>
      <p>Você consegue torná-la mais representativa.</p>
      <p>
        Isso <strong>não</strong> significa copiar dado sensível de cliente, paciente ou
        financeiro para a UAT. Use dado mascarado ou sintético que preserve os status, formatos,
        relacionamentos e casos extremos importantes.
      </p>
      <p>Antes da release, pergunte:</p>
      <ol>
        <li>Quais valores de produção não existem na UAT?</li>
        <li>Quais integrações ou configurações diferem?</li>
        <li>Quais papéis, canais, regiões e casos extremos continuam sem teste?</li>
        <li>Como o sistema vai sinalizar um valor desconhecido em vez de tratá-lo mal silenciosamente?</li>
      </ol>
      <p>Essa última pergunta é especialmente útil.</p>
      <p>
        Se o serviço de cancelamento tivesse sinalizado <strong>ALLOCATED</strong> como um status
        desconhecido, o time poderia ter encontrado a lacuna antes de um cliente encontrar.
      </p>

      <h2>O que fica</h2>
      <p>Quando algo funciona na UAT e falha em produção, resista às explicações mais rápidas:</p>
      <blockquote>&ldquo;O QA deixou passar.&rdquo;</blockquote>
      <blockquote>&ldquo;O Desenvolvimento implantou o código errado.&rdquo;</blockquote>
      <blockquote>&ldquo;O dado de produção está ruim.&rdquo;</blockquote>
      <p>Qualquer uma dessas pode eventualmente ser verdade.</p>
      <p>Mas comece pela evidência.</p>
      <p>Preserve uma falha. Rastreie a transação. Compare os ambientes. Encontre a primeira diferença. Volte para a regra de negócio.</p>
      <p>Porque a UAT e a produção geralmente discordam por um motivo.</p>
      <p>Encontre o primeiro lugar onde as histórias delas pararam de ser as mesmas.</p>
      <blockquote>
        <strong>
          A UAT não mentiu. Ela respondeu a pergunta que você fez. A produção expôs a pergunta que
          você esqueceu de fazer.
        </strong>
      </blockquote>
    </div>
  );
}

export { FuncionouNaUatPorQueFalhouEmProducaoBody };
