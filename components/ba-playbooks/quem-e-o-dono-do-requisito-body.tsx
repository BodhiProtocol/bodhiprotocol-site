// Tradução da versão em inglês em who-owns-the-requirement-body.tsx.
// Este playbook é uma narrativa sobre um requisito específico, não uma lista
// de dicas independentes — por isso, como os outros playbooks narrativos,
// renderiza como prosa corrida em vez de cards numerados. Veja o registro
// customPlaybookBodies em app/pt-br/ba-playbooks/[slug]/page.tsx.
function QuemEODonoDoRequisitoBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Alguém pergunta:</p>
      <blockquote>&ldquo;Quem é dono desse requisito?&rdquo;</blockquote>
      <p>O Produto diz:</p>
      <blockquote>&ldquo;O Negócio é dono.&rdquo;</blockquote>
      <p>O Negócio diz:</p>
      <blockquote>&ldquo;O BA vem cuidando disso.&rdquo;</blockquote>
      <p>O BA diz:</p>
      <blockquote>&ldquo;O Risco tomou a decisão.&rdquo;</blockquote>
      <p>O Risco diz:</p>
      <blockquote>&ldquo;A Operação precisa confirmar.&rdquo;</blockquote>
      <p>A Operação diz:</p>
      <blockquote>&ldquo;O Compliance deveria decidir.&rdquo;</blockquote>
      <p>O Compliance diz:</p>
      <blockquote>&ldquo;Isso não é do Risco?&rdquo;</blockquote>
      <p>Seis respostas depois, ainda não temos um dono.</p>
      <p>Essa é a coisa estranha sobre requisitos.</p>
      <p>Um requisito pode ter um monte de gente em volta dele e ainda assim não pertencer a ninguém.</p>

      <h2>Aqui está o requisito</h2>
      <p>
        <strong>REQ-218 — Bloquear operações quando o dado de risco do cliente estiver indisponível</strong>
      </p>
      <p>O requisito diz:</p>
      <blockquote>Se a informação de risco do cliente não puder ser obtida, a operação não deve prosseguir.</blockquote>
      <p>O desenvolvimento começa.</p>
      <p>Aí o QA pergunta:</p>
      <blockquote>&ldquo;O que exatamente deveria acontecer?&rdquo;</blockquote>
      <p>A operação deveria:</p>
      <ul>
        <li>Falhar completamente?</li>
        <li>Ir para Revisão Manual?</li>
        <li>Continuar e ser sinalizada depois?</li>
      </ul>
      <p>Boa pergunta.</p>
      <p>Então o BA pergunta:</p>
      <p>
        <strong>Quem pode decidir?</strong>
      </p>
      <p>É aí que o problema de verdade começa.</p>

      <h2>&ldquo;Pergunta pro negócio&rdquo;</h2>
      <p>Você vai ouvir isso muito.</p>
      <blockquote>&ldquo;Pergunta pro negócio.&rdquo;</blockquote>
      <p>Certo.</p>
      <p>Qual negócio?</p>
      <p>Risco?</p>
      <p>Operações?</p>
      <p>Front Office?</p>
      <p>Compliance?</p>
      <p>Produto?</p>
      <p>&ldquo;Negócio&rdquo; não é um dono.</p>
      <p>É um grupo de pessoas que podem querer coisas bem diferentes.</p>
      <p>Se a resposta para &ldquo;quem decide?&rdquo; é o nome de um departamento, continue perguntando.</p>

      <h2>O BA não é dono automaticamente</h2>
      <p>Você pode ter:</p>
      <ul>
        <li>escrito a story</li>
        <li>conduzido os workshops</li>
        <li>documentado as regras</li>
        <li>atualizado o Jira</li>
        <li>explicado para o desenvolvimento</li>
        <li>apoiado o QA</li>
      </ul>
      <p>Isso ainda não significa que você deveria tomar a decisão de negócio.</p>
      <p>
        Um BA costuma ser dono da <strong>clareza</strong> do requisito.
      </p>
      <p>
        Não necessariamente da <strong>escolha</strong> por trás dele.
      </p>
      <p>Essa diferença importa.</p>

      <h2>O REQ-218 começa a viajar</h2>
      <p>Perguntamos ao Risco.</p>
      <p>O Risco diz:</p>
      <blockquote>&ldquo;A Operação precisa confirmar o fluxo.&rdquo;</blockquote>
      <p>A Operação diz:</p>
      <blockquote>&ldquo;O Compliance precisa confirmar se a Revisão Manual é aceitável.&rdquo;</blockquote>
      <p>O Compliance diz:</p>
      <blockquote>&ldquo;O Risco é dono da política.&rdquo;</blockquote>
      <p>Risco &rarr; Operação &rarr; Compliance &rarr; Risco.</p>
      <p>Todo mundo está envolvido.</p>
      <p>Ninguém está decidindo.</p>
      <p>É assim que costuma parecer uma responsabilidade não clara.</p>
      <p>Não é silêncio.</p>
      <p>
        <strong>É circulação.</strong>
      </p>

      <h2>Encontre a responsabilidade no ponto de decisão</h2>
      <p>Aqui está o teste mais simples:</p>
      <blockquote>Se dois stakeholders discordam, quem toma a decisão final?</blockquote>
      <p>Essa pergunta é muito mais útil do que:</p>
      <blockquote>&ldquo;Quem está envolvido?&rdquo;</blockquote>
      <p>Para o REQ-218, alguém eventualmente precisa escolher entre:</p>
      <p>
        <strong>Rejeitar</strong>, <strong>Revisão Manual</strong> ou <strong>Continuar</strong>.
      </p>
      <p>A pessoa com autoridade para fazer essa escolha está bem mais perto do dono de verdade.</p>
      <p>A responsabilidade fica visível quando uma decisão precisa ser tomada.</p>

      <h2>Três papéis que vale a pena separar</h2>
      <p>Boa parte da confusão desaparece se pararmos de chamar todo mundo de &ldquo;dono&rdquo;.</p>

      <h3>Dono do Requisito</h3>
      <p>Responsável por como o comportamento de negócio deveria ser.</p>
      <p>Consegue aprovar uma mudança relevante e sustentar o resultado.</p>

      <h3>Guardião do Requisito</h3>
      <p>Mantém o requisito claro, atualizado e testável.</p>
      <p>Geralmente é o BA.</p>
      <p>O guardião garante que todo mundo entenda o requisito, mas não toma a decisão de negócio automaticamente.</p>

      <h3>Responsável pela Decisão</h3>
      <p>Toma uma decisão específica de especialista. Por exemplo:</p>
      <ul>
        <li>
          <strong>Risco</strong> &rarr; tratamento de risco
        </li>
        <li>
          <strong>Compliance</strong> &rarr; interpretação regulatória
        </li>
        <li>
          <strong>Operações</strong> &rarr; processo operacional
        </li>
        <li>
          <strong>Tecnologia</strong> &rarr; design técnico
        </li>
      </ul>
      <p>Podem ser pessoas diferentes.</p>
      <p>Isso é perfeitamente normal.</p>
      <p>O problema é quando ninguém sabe qual papel pertence a quem.</p>

      <h2>Voltando ao REQ-218</h2>
      <p>Em vez de escrever:</p>
      <blockquote>Dono: Negócio</blockquote>
      <p>escrevemos:</p>

      <dl>
        <dt>Dono do requisito</dt>
        <dd>Head de Controles de Risco de Cliente</dd>
        <dt>Guardião do requisito</dt>
        <dd>Business Analyst</dd>
        <dt>Decisão em aberto</dt>
        <dd>O que acontece quando o dado de risco do cliente está indisponível?</dd>
        <dt>Responsável pela decisão</dt>
        <dd>Head de Controles de Risco de Cliente</dd>
        <dt>Consultados</dt>
        <dd>Operações, Compliance, Tecnologia</dd>
        <dt>Impacto se não resolvido</dt>
        <dd>O QA não consegue validar o fluxo de exceção.</dd>
      </dl>

      <p>Ainda precisamos da decisão.</p>
      <p>Mas agora sabemos quem precisa tomá-la.</p>
      <p>Isso sozinho já muda a conversa.</p>
      <p>
        Em vez de mandar o requisito circulando pela organização, o BA pode levar a pergunta direto
        para quem realmente tem autoridade para resolvê-la.
      </p>

      <h2>Não confunda conhecimento técnico com responsabilidade</h2>
      <p>O especialista pode conhecer o processo melhor que ninguém.</p>
      <p>Isso não significa automaticamente que ele pode mudá-lo.</p>
      <p>O especialista pode dizer:</p>
      <blockquote>&ldquo;É assim que o processo funciona hoje.&rdquo;</blockquote>
      <p>O dono precisa conseguir dizer:</p>
      <blockquote>&ldquo;É assim que o processo deveria funcionar amanhã.&rdquo;</blockquote>
      <p>Conhecimento e autoridade são coisas diferentes.</p>
      <p>Os dois importam.</p>
      <p>Mas não são a mesma coisa.</p>

      <h2>O teste de responsabilidade de 5 minutos</h2>
      <p>Escolha um requisito importante.</p>
      <p>Pergunte:</p>

      <h3>1. Quem consegue explicar por que ele existe?</h3>
      <h3>2. Quem consegue aprovar uma mudança relevante?</h3>
      <h3>3. Quem aceita o resultado de negócio?</h3>
      <h3>4. Se os stakeholders discordarem, quem toma a decisão final?</h3>

      <p>Essa última pergunta é a importante.</p>
      <p>Se ninguém consegue responder isso com clareza, você provavelmente ainda não encontrou o dono.</p>

      <h2>O que aconteceu com o REQ-218?</h2>
      <p>O Head de Controles de Risco de Cliente finalmente toma a decisão:</p>
      <blockquote>Se o dado de risco estiver indisponível, a operação não deve prosseguir automaticamente.</blockquote>
      <p>Em vez disso:</p>
      <blockquote>Mande para Revisão Manual.</blockquote>
      <p>Agora o requisito fica muito mais claro.</p>

      <h4>Regra de Negócio</h4>
      <p>Uma operação não deve prosseguir automaticamente quando o dado de risco do cliente exigido estiver indisponível.</p>

      <h4>Critério de Aceitação</h4>
      <p>
        <strong>Dado</strong> que o dado de risco do cliente não pode ser obtido
        <br />
        <strong>Quando</strong> a validação pré-operação roda
        <br />
        <strong>Então</strong> o processamento automático para
        <br />
        <strong>E</strong> a operação entra em Revisão Manual.
      </p>

      <p>Agora sabemos os dois lados:</p>
      <p>
        <strong>o que o sistema deveria fazer</strong>
      </p>
      <p>e</p>
      <p>
        <strong>quem sustenta a decisão.</strong>
      </p>
    </div>
  );
}

export { QuemEODonoDoRequisitoBody };
