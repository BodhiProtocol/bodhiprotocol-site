import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";

function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

// Tradução da versão em inglês em pre-uat-readiness-checklist-body.tsx. Como
// os outros playbooks narrativos, renderiza como prosa corrida em vez de
// cards numerados. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx.
function OQueOBaDeveChecarAntesDaUatBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>UAT agendada não é a mesma coisa que UAT pronta</h2>
      <p>O calendário diz que a UAT começa amanhã.</p>
      <p>Os casos de teste estão escritos.</p>
      <p>Os usuários de negócio bloquearam a agenda.</p>
      <p>Todo mundo diz:</p>
      <blockquote>&ldquo;A gente está pronto.&rdquo;</blockquote>
      <p>Segunda de manhã chega.</p>
      <p>O primeiro testador faz login. A conta dele não funciona.</p>
      <p>Outro testador descobre que o cliente de teste não existe.</p>
      <p>A API aponta para o serviço errado.</p>
      <p>Uma feature flag ainda está desligada.</p>
      <p>Na hora do almoço, ninguém está testando o requisito.</p>
      <p>Estão testando se a <strong>configuração de teste</strong> funciona.</p>
      <p>Essa é a diferença entre:</p>
      <blockquote>
        <strong>UAT agendada</strong>
      </blockquote>
      <p>e</p>
      <blockquote>
        <strong>UAT pronta.</strong>
      </blockquote>

      <h2>Primeiro: o que a UAT realmente prova?</h2>
      <p>User Acceptance Testing não é mais uma rodada de teste do desenvolvedor.</p>
      <p>Ela responde uma pergunta de negócio:</p>
      <blockquote>
        <strong>
          &ldquo;Essa solução sustenta a necessidade de negócio real o suficiente para a gente
          aceitá-la?&rdquo;
        </strong>
      </blockquote>
      <p>Isso precisa de mais do que um build funcionando.</p>
      <p>Você precisa do escopo certo, dos cenários certos, do dado certo, do ambiente certo, dos usuários certos, das integrações certas e da configuração certa.</p>
      <p>Se um desses estiver errado, a UAT pode te contar a história errada.</p>

      <h2>Aqui está a situação</h2>
      <p>Imagine um banco lançando um novo fluxo de verificação de beneficiário.</p>
      <p>O requisito diz:</p>
      <blockquote>Transferências acima de ₹2 lakh para um beneficiário novo exigem verificação adicional.</blockquote>
      <p>O desenvolvimento está completo. O teste de sistema passou. A UAT começa amanhã.</p>
      <p>Antes de dizer <strong>&ldquo;pode ir,&rdquo;</strong> o que o BA deveria checar?</p>

      <h2>1. Escopo &amp; Build — estamos testando a coisa certa?</h2>
      <p>Comece pelo requisito. Pergunte:</p>
      <ul>
        <li>O que exatamente está no escopo da UAT e o que está explicitamente fora?</li>
        <li>Quais stories ou requisitos estão incluídos?</li>
        <li>Mudanças tardias estão refletidas e o build implantado realmente as contém?</li>
        <li>As limitações conhecidas estão documentadas?</li>
      </ul>
      <p>
        Imagine que o QA testou a versão 4.8, mas a UAT recebe a 4.7 por acidente. Toda falha
        depois disso cria ruído.
      </p>
      <blockquote>
        <strong>Antes da UAT: confirme que o escopo do requisito e o build implantado batem.</strong>
      </blockquote>

      <h2>2. Casos de Teste — estamos testando o negócio, não só o fluxo principal?</h2>
      <p>Bons cenários de UAT representam como as pessoas realmente usam o sistema.</p>
      <p>No nosso exemplo de transferência, não teste só:</p>
      <blockquote>Beneficiário novo + ₹3 lakh &rarr; verificação aparece.</blockquote>
      <p>Teste também:</p>
      <ul>
        <li>
          <strong>Fronteira:</strong> exatamente ₹2 lakh.
        </li>
        <li>
          <strong>Abaixo do limite:</strong> ₹1,99,999.
        </li>
        <li>
          <strong>Beneficiário existente:</strong> a verificação deveria se aplicar?
        </li>
        <li>
          <strong>Falha:</strong> serviço de verificação indisponível.
        </li>
        <li>
          <strong>Retry:</strong> o usuário falha na verificação e tenta de novo.
        </li>
        <li>
          <strong>Permissões:</strong> o usuário certo consegue realizar a ação?
        </li>
        <li>
          <strong>Ponta a ponta:</strong> a transferência continua corretamente depois?
        </li>
      </ul>
      <p>Uma pergunta útil de BA:</p>
      <blockquote>
        <strong>&ldquo;O que faria o negócio recusar aceitar essa funcionalidade?&rdquo;</strong>
      </blockquote>
      <p>Transforme esses riscos em cenários.</p>

      <h2>3. Dado de Teste — esses cenários realmente conseguem ser executados?</h2>
      <p>Esse é um dos maiores assassinos de UAT. O cenário existe. O dado não.</p>
      <p>Mapeie os cenários importantes para o dado que eles exigem:</p>
      <ul>
        <li>Beneficiário novo &rarr; cliente sem beneficiário anterior</li>
        <li>Acima do limite &rarr; conta com saldo suficiente</li>
        <li>Beneficiário existente &rarr; cliente com um beneficiário salvo</li>
        <li>Verificação falhada &rarr; identidade de teste que dispara falha</li>
        <li>Checagem de permissão &rarr; usuário com papel restrito</li>
      </ul>
      <p>E verifique se o dado realmente funciona. Não:</p>
      <blockquote>&ldquo;Alguém disse que estava carregado.&rdquo;</blockquote>
      <p>Valide de verdade. Use dado mascarado ou sintético aprovado onde for exigido.</p>

      <h2>4. Ambiente — está estável o suficiente para confiar no resultado?</h2>
      <p>Um ambiente ruim pode fazer uma boa funcionalidade parecer quebrada.</p>
      <p>
        Para o fluxo de verificação de beneficiário, isso significa confirmar que o build da UAT
        realmente bate com a release que o QA aprovou — não um build dois commits atrás dela.
        Significa checar que o endpoint de UAT do serviço de verificação chama o motor de regras de
        verdade, não um stub que sempre retorna &ldquo;verificado&rdquo; independente do valor. E
        significa confirmar que a atualização de dado de ontem à noite não apagou silenciosamente as
        contas de cliente das quais os casos de teste dependem.
      </p>
      <p>De forma mais geral, verifique:</p>
      <ul>
        <li>Build correto implantado, ambiente acessível, banco de dados disponível</li>
        <li>Serviços necessários rodando, nenhuma queda bloqueante conhecida</li>
        <li>Dado de teste atualizado corretamente, URLs e endpoints corretos</li>
        <li>Nenhuma mudança não coordenada acontecendo durante os testes críticos</li>
      </ul>
      <p>O ambiente não precisa ser perfeito. Precisa ser estável o suficiente para que:</p>
      <blockquote>
        <strong>a falha signifique alguma coisa</strong> — não que a transferência de ₹2 lakh
        falhou porque o ambiente resetou durante a noite.
      </blockquote>

      <h2>5. Acesso &amp; Papéis — os testadores realmente conseguem testar?</h2>
      <p>
        Os testadores desse fluxo são gerentes de relacionamento de agência e equipe de operações —
        não desenvolvedores. Nunca presuma:
      </p>
      <blockquote>&ldquo;Eles tinham acesso da última vez.&rdquo;</blockquote>
      <p>
        Antes do Dia 1, verifique se as contas de UAT deles realmente conseguem originar uma
        transferência acima de ₹2 lakh — não só visualizar uma — se o fluxo de maker-checker está
        configurado para esse valor e se o papel deles inclui a permissão específica ligada a esse
        passo novo. De forma mais geral:
      </p>
      <ul>
        <li>Os usuários estão criados e conseguem fazer login?</li>
        <li>Os papéis e permissões estão corretos?</li>
        <li>Eles conseguem acessar os sistemas dependentes?</li>
        <li>O MFA/VPN está funcionando e as regras de segregação de funções são respeitadas?</li>
      </ul>
      <p>Oito gerentes de relacionamento descobrindo que o login deles não consegue originar uma transferência durante a chamada de UAT não é teste.</p>
      <p>É troubleshooting.</p>

      <h2>6. Integrações — a jornada inteira consegue terminar?</h2>
      <p>Sua funcionalidade pode funcionar perfeitamente. Mas a UAT geralmente testa uma <strong>jornada</strong>.</p>
      <p>Para o fluxo de verificação de beneficiário, essa jornada é assim:</p>
      <blockquote>
        Início da Transferência &rarr; API de Verificação &rarr; Ledger do Core Bancário &rarr;
        Triagem de Fraude/Risco &rarr; Gateway de SMS/Notificação
      </blockquote>
      <p>
        Se o gateway de SMS na UAT for um mock que nunca dispara de verdade, um testador pode
        &ldquo;passar&rdquo; num cenário que deixaria um cliente real esperando por um OTP que
        nunca chega.
      </p>
      <p>Pergunte:</p>
      <blockquote>
        <strong>&ldquo;Que outro sistema precisa funcionar para esse cenário terminar?&rdquo;</strong>
      </blockquote>
      <p>Verifique as dependências upstream e downstream críticas antes de os testadores chegarem.</p>

      <h2>7. Configuração — a UAT reflete a configuração de negócio pretendida?</h2>
      <p>A configuração pode invalidar silenciosamente um teste que, de resto, seria perfeito.</p>
      <p>
        Suponha que o requisito diga verificação acima de ₹2 lakh, mas a UAT esteja configurada
        para ₹5 lakh. O código pode estar perfeito. O teste ainda vai contar a história errada. O
        mesmo vale para uma feature flag ainda desligada, um limite de retry de OTP configurado
        diferente da produção ou um limite de conta NRI que nunca foi atualizado para bater com a
        regra nova.
      </p>
      <p>De forma mais geral, verifique:</p>
      <ul>
        <li>Feature flags, limites, regras de negócio</li>
        <li>Configuração de produto, dado de referência, roteamento</li>
        <li>Moedas/países, datas/calendários, direitos do usuário</li>
      </ul>

      <h2>8. Stakeholders — todo mundo sabe como a UAT vai funcionar?</h2>
      <p>A Tecnologia pode estar pronta enquanto a UAT ainda falha operacionalmente.</p>
      <p>
        Para esse fluxo especificamente, o líder de operações de agência, o responsável por
        fraude e risco, o release manager e o BA todos precisam concordar, antes do Dia 1, sobre
        como é um cenário aprovado, quem levanta um defeito se uma transferência real de ₹2 lakh
        pular a verificação por engano e quem tem autoridade para chamar um No-Go se o serviço de
        verificação não se mostrar confiável o suficiente. De forma mais geral, todo mundo deveria
        saber:
      </p>
      <ul>
        <li>O que estamos testando e quem está testando o quê?</li>
        <li>Onde os resultados são registrados e como os defeitos são levantados?</li>
        <li>Quem os triagem e o que conta como bloqueador?</li>
        <li>Quem decide a aceitação?</li>
      </ul>
      <p>Identifique também o caminho de suporte: engenharia, QA, BA, suporte de ambiente, suporte de dados e times de integração.</p>
      <p>Você não precisa de todo mundo em toda reunião.</p>
      <p>
        Você precisa saber <strong>para quem ligar quando algo quebrar.</strong>
      </p>

      <h2>Não pergunte se está pronto. Pergunte o que prova isso.</h2>
      <p>É aqui que o BA consegue fazer uma diferença grande.</p>
      <p>Em vez de:</p>
      <blockquote>&ldquo;O ambiente está pronto?&rdquo;</blockquote>
      <p>procure evidência:</p>
      <ul>
        <li>Login testado.</li>
        <li>Build verificado.</li>
        <li>Endpoint checado.</li>
        <li>Dado de teste validado.</li>
        <li>Cenário crítico executado.</li>
      </ul>
      <p>&ldquo;Alguém confirmou&rdquo; é garantia. &ldquo;Alguém demonstrou&rdquo; é evidência.</p>
      <p>Um hábito útil de BA:</p>
      <blockquote>
        <strong>Não pergunte se algo está pronto. Pergunte o que prova que está pronto.</strong>
      </blockquote>

      <h2>Defina a saída antes de entrar</h2>
      <p>Uma pergunta que os times costumam deixar tarde demais:</p>
      <blockquote>
        <strong>&ldquo;Como é uma UAT bem-sucedida?&rdquo;</strong>
      </blockquote>
      <p>Combine isso antes de o teste começar. Os critérios de saída podem incluir:</p>
      <ul>
        <li>Cenários críticos de negócio executados</li>
        <li>Nenhum defeito de Severidade 1 em aberto</li>
        <li>Tratamento acordado para os defeitos restantes</li>
        <li>Aprovação de negócio necessária obtida</li>
        <li>Evidência armazenada, limitações conhecidas aceitas</li>
      </ul>
      <p>As regras exatas variam por organização. Mas se ninguém sabe o que &ldquo;UAT completa&rdquo; significa, a aprovação final vira uma discussão no final.</p>

      <h2>O que o BA deveria assumir pessoalmente?</h2>
      <p>O BA não deveria virar:</p>
      <blockquote>engenheiro de ambiente + engenheiro de dado de teste + administrador de acesso + líder de QA + release manager</blockquote>
      <p>Esse não é o trabalho. O papel do BA é tornar a prontidão visível.</p>
      <p>Você pode não provisionar o ambiente. Mas deveria saber se ele está pronto.</p>
      <p>Você pode não criar contas de usuário. Mas deveria saber se os testadores conseguem fazer login.</p>
      <p>Você pode não configurar a API. Mas deveria saber se a jornada de negócio consegue rodar.</p>
      <p>Pense:</p>
      <blockquote>
        <strong>coordenar, verificar, expor lacunas.</strong>
      </blockquote>
      <p>Não:</p>
      <blockquote>
        <strong>fazer tudo pessoalmente.</strong>
      </blockquote>

      <h2>Rode uma checagem de prontidão para UAT</h2>
      <p>Antes da UAT, reúna as pessoas-chave para uma revisão de prontidão curta. Percorra Escopo &amp; Build, Cenários, Dado, Ambiente, Acesso, Integrações, Configuração, Usuários de negócio, Caminho de suporte e Critérios de saída.</p>
      <p>Não transforme isso numa reunião de status de duas horas.</p>
      <p>Você está tentando responder uma pergunta:</p>
      <blockquote>
        <strong>&ldquo;O que poderia impedir um teste significativo amanhã?&rdquo;</strong>
      </blockquote>
      <p>Encontre isso hoje.</p>

      <h2>Go / Conditional Go / No-Go</h2>
      <p>A prontidão não precisa sempre ser binária.</p>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-emerald-600 dark:text-emerald-400">
            GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            Os pré-requisitos críticos estão prontos. Comece a UAT.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-amber-600 dark:text-amber-400">
            CONDITIONAL GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            Existe uma lacuna conhecida, mas um teste significativo consegue continuar com
            segurança em volta dela. Documente a limitação e continue.
          </p>
        </div>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4">
          <p className="mb-1.5 font-mono text-xs font-bold tracking-[0.08em] text-red-600 dark:text-red-400">
            NO-GO
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            Um pré-requisito impede um teste significativo — build errado, dado de teste
            inutilizável, uma integração crítica indisponível, testadores que não conseguem
            acessar o sistema.
          </p>
        </div>
      </div>
      <p>
        Adiar a UAT em um dia pode sair mais barato do que desperdiçar o dia de dez pessoas
        fingindo testar.
      </p>

      <h2>Antes de dizer &ldquo;Começar a UAT&rdquo;</h2>
      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Escopo, cenários e dado"
          items={[
            "Escopo está claro e o build correto está implantado",
            "Cenários críticos de negócio estão cobertos",
            "Resultados esperados estão claros",
            "Dado de teste está disponível e validado",
          ]}
        />
        <ChecklistGroup
          label="Ambiente e acesso"
          items={[
            "Ambiente está acessível e estável",
            "Usuários de teste conseguem fazer login",
            "Papéis e permissões estão corretos",
            "Integrações críticas funcionam",
          ]}
        />
        <ChecklistGroup
          label="Configuração"
          items={["Configuração e feature flags estão corretas"]}
        />
        <ChecklistGroup
          label="Pessoas e processo"
          items={[
            "Testadores de negócio sabem suas responsabilidades",
            "Processo de defeito e triagem está entendido",
            "Critérios de saída da UAT estão acordados",
            "Contatos de suporte são conhecidos",
          ]}
        />
      </div>
      <p>Se várias respostas forem:</p>
      <blockquote>&ldquo;A gente acha que sim.&rdquo;</blockquote>
      <p>vocês provavelmente não estão prontos.</p>

      <h2>O que fica</h2>
      <p>Uma boa UAT não começa porque o calendário diz:</p>
      <blockquote>
        <strong>Dia 1</strong>
      </blockquote>
      <p>
        Ela começa quando os usuários de negócio conseguem executar cenários significativos e
        confiar no que os resultados estão dizendo.
      </p>
      <p>Então, antes de perguntar:</p>
      <blockquote>&ldquo;Os usuários de negócio estão prontos para testar?&rdquo;</blockquote>
      <p>pergunte:</p>
      <blockquote>
        <strong>&ldquo;A gente tornou possível para eles testarem direito?&rdquo;</strong>
      </blockquote>
      <p>Esse é o trabalho do BA aqui.</p>
      <p>Não consertar pessoalmente todo ambiente, conta, API ou dataset.</p>
      <p>Tornar a prontidão visível antes de essas lacunas desperdiçarem o tempo de todo mundo.</p>
      <blockquote>
        <strong>
          A UAT não está pronta porque o plano de teste existe. Ela está pronta quando o negócio
          consegue testar a coisa certa, com o dado certo, nas condições certas — e o time tem
          evidência para provar isso.
        </strong>
      </blockquote>
    </div>
  );
}

export { OQueOBaDeveChecarAntesDaUatBody };
