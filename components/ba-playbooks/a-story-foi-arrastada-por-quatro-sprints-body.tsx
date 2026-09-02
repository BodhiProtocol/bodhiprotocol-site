import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";

// Tradução da versão em inglês em story-carried-over-body.tsx. Este playbook
// percorre um único ticket, não dicas independentes — por isso, como os
// outros playbooks narrativos, renderiza como prosa corrida em vez de cards
// numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx.
function AStoryFoiArrastadaPorQuatroSprintsBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Sprint 1: arrastada.</p>
      <p>Sprint 2: arrastada.</p>
      <p>Sprint 3: arrastada.</p>
      <p>Segunda de manhã.</p>
      <p>Sprint 4.</p>
      <p>E lá está ela de novo.</p>
      <p>
        <strong>ABC-142.</strong>
      </p>
      <p>Mesmo título.</p>
      <p>Mesma pontuação de story.</p>
      <p>Mesma sensação levemente incômoda quando alguém pergunta:</p>
      <blockquote>&ldquo;O que falta nessa aí?&rdquo;</blockquote>
      <p>Alguém diz:</p>
      <blockquote>&ldquo;Está quase pronta.&rdquo;</blockquote>
      <p>O que é interessante.</p>
      <p>Porque também estava quase pronta há três semanas.</p>
      <p>Nesse ponto, eu não perguntaria:</p>
      <p>
        <strong>&ldquo;Como a gente termina essa story?&rdquo;</strong>
      </p>
      <p>Eu perguntaria:</p>
      <p>
        <strong>&ldquo;Por que essa story sobreviveu quatro sprints?&rdquo;</strong>
      </p>
      <p>Porque uma story que fica sendo arrastada geralmente está te dizendo alguma coisa.</p>
      <p>O erro é tratar o próprio arrasto como o problema.</p>
      <p>Vamos abrir o ticket.</p>

      <h2>Primeiro, pare de chamar de &ldquo;quase pronta&rdquo;</h2>
      <p>A ABC-142 diz:</p>
      <p>
        <strong>Status:</strong> In Progress
      </p>
      <p>O último comentário diz:</p>
      <blockquote>&ldquo;Desenvolvimento quase completo. Aguardando validação final.&rdquo;</blockquote>
      <p>Parece razoável.</p>
      <p>Mas &ldquo;quase pronta&rdquo; não é particularmente útil.</p>
      <p>Então pergunte:</p>
      <p>
        <strong>O que exatamente está inacabado?</strong>
      </p>
      <p>Não:</p>
      <p>&ldquo;Quanto falta?&rdquo;</p>
      <p>Não:</p>
      <p>&ldquo;Que porcentagem está completa?&rdquo;</p>
      <p>Nomeie de verdade o que resta.</p>
      <p>A gente pergunta ao desenvolvedor.</p>
      <p>Acontece que:</p>
      <ul>
        <li>A UI está pronta.</li>
        <li>As mudanças de backend estão prontas.</li>
        <li>A integração de API está pronta.</li>
        <li>O teste unitário está pronto.</li>
      </ul>
      <p>Então o desenvolvimento não é realmente o problema.</p>
      <p>O QA está esperando.</p>
      <p>Certo.</p>
      <p>Agora temos onde procurar.</p>

      <h2>A story não está bloqueada por tudo</h2>
      <p>Essa é uma distinção útil.</p>
      <p>Uma story pode parecer travada como um objeto único.</p>
      <p>
        Mas geralmente só <strong>uma parte</strong> está realmente travada.
      </p>
      <p>A ABC-142 está sentada em &ldquo;In Progress&rdquo; há semanas.</p>
      <p>Isso dá a impressão de que a story inteira está inacabada.</p>
      <p>Não está.</p>
      <p>A maior parte está pronta.</p>
      <p>O problema que resta é:</p>
      <blockquote>O QA não consegue completar um cenário de teste.</blockquote>
      <p>Bem melhor.</p>
      <p>Agora pergunte:</p>
      <p>
        <strong>Por quê?</strong>
      </p>

      <h2>O QA diz que o comportamento esperado não está claro</h2>
      <p>O cenário é simples.</p>
      <p>Um serviço upstream normalmente retorna dados de risco do cliente.</p>
      <p>Mas às vezes o serviço não retorna nenhum registro.</p>
      <p>O QA pergunta:</p>
      <blockquote>&ldquo;O que deveria acontecer quando nenhum registro de risco é retornado?&rdquo;</blockquote>
      <p>Os critérios de aceitação dizem:</p>
      <blockquote>O sistema deve tratar a resposta de forma apropriada.</blockquote>
      <p>Essa palavra ali.</p>
      <p>
        <strong>Apropriada.</strong>
      </p>
      <p>O desenvolvimento interpretou isso como:</p>
      <blockquote>Continuar o processamento.</blockquote>
      <p>O QA interpretou como:</p>
      <blockquote>Parar o processamento e mostrar um erro.</blockquote>
      <p>O negócio não confirmou nenhuma das duas.</p>
      <p>Então agora sabemos algo importante.</p>
      <p>A ABC-142 não está realmente esperando o QA.</p>
      <p>O QA está esperando um requisito.</p>

      <h2>Então a gente checa o requisito</h2>
      <p>Talvez a resposta já esteja em algum lugar.</p>
      <p>A gente olha o ticket inteiro.</p>
      <p>Descrição.</p>
      <p>Nada.</p>
      <p>Critérios de aceitação.</p>
      <p>Nada.</p>
      <p>Página do Confluence linkada.</p>
      <p>Nada.</p>
      <p>Depois chegamos nos comentários.</p>
      <p>Comentário #38:</p>
      <blockquote>
        &ldquo;Precisa de confirmação do negócio sobre o comportamento esperado quando nenhum
        registro de risco é retornado.&rdquo;
      </blockquote>
      <p>Postado há 13 dias.</p>
      <p>Sem resposta.</p>
      <p>Ali está.</p>
      <p>Quatro sprints de arrasto.</p>
      <p>E o bloqueio real é uma pergunta sem resposta dentro de um comentário do Jira.</p>
      <p>A story não estava bloqueada pelo desenvolvimento.</p>
      <p>Também não estava realmente bloqueada pelo QA.</p>
      <p>
        <strong>Estava bloqueada por uma decisão que ninguém tinha tornado visível.</strong>
      </p>

      <h2>É por isso que o arrasto é uma informação útil</h2>
      <p>É tentador tratar o arrasto como um problema de planejamento.</p>
      <p>Talvez a estimativa tenha sido ruim.</p>
      <p>Talvez o time tenha assumido trabalho demais.</p>
      <p>Talvez a velocidade esteja caindo.</p>
      <p>Às vezes é exatamente isso que aconteceu.</p>
      <p>Mas o arrasto repetido merece uma pergunta diferente.</p>
      <p>Não:</p>
      <blockquote>Por que estamos lentos?</blockquote>
      <p>Pergunte:</p>
      <p>
        <strong>Que tipo de trabalho inacabado continua sobrevivendo ao limite do sprint?</strong>
      </p>
      <p>Porque &ldquo;inacabado&rdquo; pode significar coisas muito diferentes.</p>

      <h2>Existem pelo menos seis tipos de inacabado</h2>
      <p>Quando vejo uma story sendo arrastada repetidamente, tento classificar o bloqueio.</p>

      <h3>1. Inacabado técnico</h3>
      <p>Genuinamente ainda falta trabalho de implementação.</p>
      <p>O código está incompleto.</p>
      <p>A integração está incompleta.</p>
      <p>Um problema técnico não foi resolvido.</p>
      <p>Direto ao ponto.</p>

      <h3>2. Inacabado de requisito</h3>
      <p>O time não sabe de verdade o que o sistema deveria fazer.</p>
      <p>Talvez:</p>
      <ul>
        <li>os critérios de aceitação não estão claros</li>
        <li>uma exceção não foi definida</li>
        <li>uma regra está faltando</li>
        <li>dois stakeholders interpretam o requisito de formas diferentes</li>
      </ul>
      <p>O código pode estar esperando por entendimento.</p>

      <h3>3. Inacabado de dependência</h3>
      <p>Seu time terminou a parte dele.</p>
      <p>Mas vocês estão esperando por:</p>
      <ul>
        <li>outro time</li>
        <li>uma API</li>
        <li>infraestrutura</li>
        <li>ambiente de teste</li>
        <li>fornecedor</li>
        <li>dado de referência</li>
        <li>aprovação</li>
      </ul>
      <p>A story está tecnicamente &ldquo;em andamento&rdquo;, mas o trabalho que resta está em outro lugar.</p>

      <h3>4. Inacabado de teste</h3>
      <p>O desenvolvimento pode estar completo.</p>
      <p>Mas o comportamento ainda não foi comprovado.</p>
      <p>Talvez:</p>
      <ul>
        <li>falta dado de teste</li>
        <li>o ambiente de QA está quebrado</li>
        <li>os casos de teste não estão claros</li>
        <li>defeitos permanecem</li>
        <li>a validação do negócio não aconteceu</li>
      </ul>
      <p>Problema diferente.</p>
      <p>Responsável diferente.</p>

      <h3>5. Inacabado de escopo</h3>
      <p>Esse é traiçoeiro.</p>
      <p>Toda vez que alguém mexe na story, mais alguma coisa é adicionada.</p>
      <blockquote>&ldquo;Já que estamos aqui, dá pra gente também&hellip;&rdquo;</blockquote>
      <p>Depois:</p>
      <blockquote>&ldquo;Esse caso extremo provavelmente deveria estar incluído.&rdquo;</blockquote>
      <p>Depois:</p>
      <blockquote>&ldquo;A gente deveria dar suporte para outro mercado também.&rdquo;</blockquote>
      <p>A story não termina porque a linha de chegada continua se movendo.</p>

      <h3>6. Inacabado de decisão</h3>
      <p>Alguém precisa escolher.</p>
      <p>Opção A ou B.</p>
      <p>Aprovar ou rejeitar.</p>
      <p>Incluir ou excluir.</p>
      <p>Falhar ou continuar.</p>
      <p>Mas ninguém decidiu isso claramente.</p>
      <p>Foi o que aconteceu com a ABC-142.</p>
      <p>E isso é incrivelmente comum.</p>

      <blockquote>Se uma story continua voltando, isso é a primeira coisa que eu tentaria identificar.</blockquote>

      <h2>Voltando à ABC-142</h2>
      <p>Agora que sabemos o bloqueio, o próximo passo fica óbvio.</p>
      <p>Em vez de dizer:</p>
      <blockquote>&ldquo;Ainda pendente de QA.&rdquo;</blockquote>
      <p>a gente atualiza a story:</p>

      <h4>Bloqueio</h4>
      <p>O comportamento esperado não está definido para quando o Serviço de Risco upstream não retorna nenhum registro do cliente.</p>

      <h4>Decisão necessária</h4>
      <p>A transação deveria:</p>
      <p>A. Continuar o processamento sem dado de risco?</p>
      <p>ou</p>
      <p>B. Parar o processamento e mostrar um erro?</p>

      <h4>Responsável pela decisão</h4>
      <p>Operação de Risco</p>

      <h4>Impacto</h4>
      <p>O QA não consegue completar o Cenário AC-07 até o comportamento esperado ser confirmado.</p>

      <h4>Responsável</h4>
      <p>Business Analyst</p>

      <p>Agora o problema está visível.</p>
      <p>Isso sozinho já é uma melhoria.</p>
      <p>Um status vermelho vago virou uma decisão específica.</p>

      <h2>Depois pergunte se isso ainda deveria ser uma story só</h2>
      <p>Existe outra pergunta que vale a pena fazer depois de vários arrastos:</p>
      <p>
        <strong>Isso ainda é de verdade um único pedaço coerente de trabalho?</strong>
      </p>
      <p>Imagine que a ABC-142 contém:</p>
      <ul>
        <li>UI nova</li>
        <li>serviço de backend</li>
        <li>integração de API</li>
        <li>migração de dados</li>
        <li>mudança de relatório</li>
        <li>log de auditoria</li>
        <li>cinco regras específicas por mercado</li>
      </ul>
      <p>E seis dessas coisas estão prontas.</p>
      <p>Em algum momento, manter tudo dentro de uma story só para de ajudar.</p>
      <p>Talvez o escopo concluído possa ser separado.</p>
      <p>Talvez a parte inacabada mereça o próprio ticket.</p>
      <p>Talvez a story original fosse simplesmente grande demais.</p>
      <p>O ponto não é dividir stories só para melhorar métricas.</p>
      <p>A pergunta é:</p>
      <p>
        <strong>Manter tudo isso junto ainda nos ajuda a entender e entregar o trabalho?</strong>
      </p>
      <p>Se não, reestruture.</p>

      <h2>Verifique se a story mudou enquanto as pessoas estavam construindo ela</h2>
      <p>Agora olhe o histórico.</p>
      <p>Como era a ABC-142 no Sprint 1?</p>
      <p>Como ela é agora?</p>
      <p>Talvez critérios de aceitação tenham sido adicionados durante o Sprint 2.</p>
      <p>Outro mercado foi adicionado no Sprint 3.</p>
      <p>Uma exceção apareceu durante o QA.</p>
      <p>Uma mudança de relatório foi adicionada semana passada.</p>
      <p>Isso é útil porque às vezes uma story não &ldquo;levou quatro sprints&rdquo;.</p>
      <p>
        <strong>Quatro versões diferentes da story levaram quatro sprints.</strong>
      </p>
      <p>Isso é um problema diferente.</p>
      <p>Olhe:</p>
      <ul>
        <li>histórico da descrição</li>
        <li>mudanças nos critérios de aceitação</li>
        <li>escopo recém-adicionado</li>
        <li>comentários contendo decisões</li>
        <li>defeitos linkados</li>
        <li>novas dependências</li>
      </ul>
      <p>Se o requisito continua mudando depois que a implementação começa, aponte isso.</p>
      <p>Não esconda dentro do número de arrasto.</p>

      <h2>Pergunte se o QA encontrou um defeito ou um requisito faltando</h2>
      <p>Essa distinção importa.</p>
      <p>Suponha que o QA diga:</p>
      <blockquote>&ldquo;O sistema não mostra um aviso quando a resposta upstream vem vazia.&rdquo;</blockquote>
      <p>O aviso era obrigatório?</p>
      <p>Se sim:</p>
      <p>
        <strong>Defeito.</strong>
      </p>
      <p>A implementação não atendeu a um requisito acordado.</p>
      <p>Se ninguém nunca decidiu o que deveria acontecer:</p>
      <p>
        <strong>Lacuna de requisito.</strong>
      </p>
      <p>Isso não deveria ser tratado como a mesma coisa.</p>
      <p>Do contrário os times acabam registrando defeitos contra um comportamento que ninguém nunca especificou.</p>
      <p>E isso cria um ciclo estranho:</p>
      <MiniDiagram
        label="O ciclo"
        steps={[
          "Requisito faltando",
          "Registrado como defeito",
          "Desenvolvedor pergunta qual é o comportamento correto",
          "Decisão de negócio necessária",
          "A story é arrastada de novo",
        ]}
      />
      <p>Nomeie o problema real.</p>

      <h2>Encontre o responsável pelo bloqueio</h2>
      <p>&ldquo;Esperando o negócio&rdquo; não é responsabilidade.</p>
      <p>&ldquo;Bloqueado por outro time&rdquo; não é responsabilidade.</p>
      <p>&ldquo;Pendente de esclarecimento&rdquo; não é responsabilidade.</p>
      <p>Pergunte:</p>
      <p>
        <strong>Quem é a pessoa responsável por conseguir a próxima resposta ou ação?</strong>
      </p>
      <p>Não necessariamente a pessoa que precisa tomar a decisão.</p>
      <p>Para a ABC-142:</p>
      <p>A Operação de Risco é dona da decisão.</p>
      <p>Mas o BA pode ser dono de conseguir essa decisão.</p>
      <p>Isso significa:</p>
      <dl>
        <dt>Responsável pela decisão</dt>
        <dd>Operação de Risco</dd>
        <dt>Responsável pela próxima ação</dt>
        <dd>BA</dd>
        <dt>Próxima ação</dt>
        <dd>Marcar a decisão com a Operação de Risco</dd>
        <dt>Prazo</dt>
        <dd>Terça-feira</dd>
      </dl>
      <p>Agora alguma coisa consegue andar.</p>

      <h2>O teste de arrasto de cinco minutos</h2>
      <p>Da próxima vez que uma story chegar em outro sprint, faça essas cinco perguntas.</p>

      <h3>1. O que exatamente está inacabado?</h3>
      <p>Seja específico.</p>
      <p>Não:</p>
      <blockquote>&ldquo;Teste.&rdquo;</blockquote>
      <p>Em vez disso:</p>
      <blockquote>
        &ldquo;O QA não consegue completar o AC-07 porque o comportamento esperado para resposta
        vazia não está definido.&rdquo;
      </blockquote>

      <h3>2. Por que está inacabado?</h3>
      <p>Encontre o tipo de bloqueio.</p>
      <p>Técnico?</p>
      <p>Requisito?</p>
      <p>Dependência?</p>
      <p>Teste?</p>
      <p>Escopo?</p>
      <p>Decisão?</p>

      <h3>3. Quem ou o que estamos esperando?</h3>
      <p>Nomeie.</p>
      <p>Pessoa.</p>
      <p>Time.</p>
      <p>Sistema.</p>
      <p>Ambiente.</p>
      <p>Decisão.</p>

      <h3>4. A parte concluída pode ser separada?</h3>
      <p>Talvez sim.</p>
      <p>Talvez não.</p>
      <p>Mas pergunte.</p>
      <p>Manter trabalho concluído preso dentro de uma story enorme pode não ajudar ninguém.</p>

      <h3>5. Qual é a próxima ação concreta?</h3>
      <p>Não:</p>
      <blockquote>&ldquo;Fazer follow-up.&rdquo;</blockquote>
      <p>Algo real.</p>
      <blockquote>&ldquo;Operação de Risco confirma o comportamento de falha-vs-continuação até terça-feira.&rdquo;</blockquote>
      <p>Agora dá pra gerenciar isso de verdade.</p>

      <h2>O que aconteceu com a ABC-142?</h2>
      <p>A Operação de Risco eventualmente confirma:</p>
      <blockquote>
        Se nenhum registro de risco do cliente for retornado, o processamento deve parar e a
        transação deve entrar em Revisão Manual.
      </blockquote>
      <p>Ótimo.</p>
      <p>Agora atualizamos o requisito.</p>

      <h4>Regra de Negócio</h4>
      <p>Transações sem um registro de risco do cliente disponível não devem prosseguir automaticamente.</p>

      <h4>Critério de Aceitação</h4>
      <p>
        <strong>Dado</strong> que nenhum registro de risco do cliente é retornado
        <br />
        <strong>Quando</strong> a validação da transação roda
        <br />
        <strong>Então</strong> o processamento para
        <br />
        <strong>E</strong> a transação entra em status de Revisão Manual.
      </p>

      <p>O QA testa.</p>
      <p>Passa.</p>
      <p>A ABC-142 fecha.</p>
      <p>O trabalho de desenvolvimento não foi o que levou quatro sprints.</p>
      <p>O comportamento sem resposta foi.</p>
      <p>Essa distinção importa.</p>

      <h2>Uma story pode estar verde e ainda estar travada</h2>
      <p>Essa é outra armadilha.</p>
      <p>Times costumam usar o status do Jira como atalho para saúde.</p>
      <p>To Do.</p>
      <p>In Progress.</p>
      <p>Testing.</p>
      <p>Done.</p>
      <p>Mas o status não diz se o entendimento está avançando.</p>
      <p>Uma story pode ficar em &ldquo;In Progress&rdquo; enquanto absolutamente nada útil acontece por dez dias.</p>
      <p>Então, quando alguma coisa é arrastada repetidamente, ignore o status por um minuto.</p>
      <p>Pergunte:</p>
      <p>
        <strong>O que mudou nessa story durante o último sprint?</strong>
      </p>
      <p>Uma decisão foi tomada?</p>
      <p>Um bloqueio foi removido?</p>
      <p>Uma dependência foi entregue?</p>
      <p>Algo foi testado?</p>
      <p>O escopo foi esclarecido?</p>
      <p>Se a resposta é basicamente nada, mover para outro sprint não vai mudar isso magicamente.</p>

      <h2>Não culpe a estimativa automaticamente</h2>
      <p>Às vezes o time simplesmente subestimou o trabalho.</p>
      <p>Claro.</p>
      <p>Mas o arrasto repetido também pode ser sintoma de:</p>
      <ul>
        <li>requisitos vagos</li>
        <li>dependências escondidas</li>
        <li>decisões atrasadas</li>
        <li>aumento de escopo</li>
        <li>divisão ruim de stories</li>
        <li>dado de teste faltando</li>
        <li>problemas de ambiente</li>
        <li>responsabilidade pouco clara</li>
      </ul>
      <p>
        Se você tratar todo arrasto como &ldquo;estimativa ruim&rdquo;, pode acabar gastando horas
        ajustando pontos de story enquanto o bloqueio real fica intocado.
      </p>
      <p>Por isso o diagnóstico vem primeiro.</p>
    </div>
  );
}

export { AStoryFoiArrastadaPorQuatroSprintsBody };
