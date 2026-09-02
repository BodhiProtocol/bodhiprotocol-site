import type { ReactNode } from "react";

import { Checklist } from "@/components/ba-playbooks/checklist";

function ChecklistGroup({ label, items }: { label: string; items: string[] }) {
  return <Checklist label={label} items={items} />;
}

// Tradução da versão em inglês em
// nobody-can-reproduce-the-production-issue-body.tsx. Jornada narrativa (um
// pagamento com falha rastreado através de oito estágios de investigação),
// não dicas independentes — mesmo padrão bespoke dos outros playbooks
// narrativos. Veja o registro customPlaybookBodies em
// app/pt-br/ba-playbooks/[slug]/page.tsx. Omite o infográfico e o
// DownloadCard só em inglês do original.
function NinguemConsegueReproduzirOProblemaEmProducaoBody(): ReactNode {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <h2>&ldquo;Funciona para a gente&rdquo;</h2>
      <p>Um usuário relata:</p>
      <blockquote>&ldquo;Pagamentos falham aleatoriamente.&rdquo;</blockquote>
      <p>O Desenvolvimento tenta. Funciona.</p>
      <p>O QA tenta. Funciona.</p>
      <p>UAT? Funciona lá também.</p>
      <p>Depois vem a frase que pode matar uma investigação silenciosamente:</p>
      <blockquote>
        <strong>&ldquo;A gente não consegue reproduzir.&rdquo;</strong>
      </blockquote>
      <p>
        Isso <strong>não</strong> significa que o problema não existe.
      </p>
      <p>Significa:</p>
      <blockquote>
        <strong>Ainda não reproduzimos as condições que o criam.</strong>
      </blockquote>
      <p>É aí que a investigação começa.</p>

      <h2>Aqui está a situação</h2>
      <p>Imagine uma plataforma de e-commerce.</p>
      <p>Alguns clientes dizem que pagamentos às vezes falham depois que clicam em <strong>Pagar Agora</strong>.</p>
      <p>Nenhum padrão óbvio.</p>
      <p>O QA roda vinte pagamentos com sucesso na UAT.</p>
      <p>O Desenvolvimento tenta localmente. Sucesso.</p>
      <p>O monitoramento de produção não mostra nenhuma queda importante.</p>
      <p>Então, e agora?</p>
      <p>O erro é rodar <strong>o mesmo teste de novo e de novo</strong>.</p>
      <p>A pergunta melhor é:</p>
      <blockquote>
        <strong>O que foi diferente quando a falha aconteceu?</strong>
      </blockquote>
      <p>Vamos seguir um pagamento que falhou e descobrir.</p>

      <h2>1. Escute &amp; Capture — consiga a história de verdade</h2>
      <p>Não comece com:</p>
      <blockquote>&ldquo;Você consegue reproduzir de novo?&rdquo;</blockquote>
      <p>Comece com o que realmente aconteceu. Pergunte:</p>
      <ul>
        <li>O que você estava tentando fazer?</li>
        <li>Quando aconteceu?</li>
        <li>O que você esperava?</li>
        <li>O que aconteceu em vez disso?</li>
        <li>Já aconteceu antes?</li>
        <li>Tentar de novo funcionou?</li>
      </ul>
      <p>Capture qualquer evidência disponível:</p>
      <blockquote>timestamp &rarr; ID de usuário/referência &rarr; ID de transação/pedido &rarr; erro &rarr; screenshot &rarr; sequência</blockquote>
      <p>Compare esses dois relatos:</p>
      <blockquote>&ldquo;O pagamento falhou ontem.&rdquo;</blockquote>
      <p>versus:</p>
      <blockquote>&ldquo;O Pedido 78431 falhou às 14:07 depois da verificação de OTP.&rdquo;</blockquote>
      <p>O segundo dá ao time por onde começar.</p>
      <p>
        <strong>No nosso caso de pagamento</strong> — capturamos: pedido <strong>78431</strong>, horário{" "}
        <strong>14:07</strong>, dispositivo <strong>Android</strong>, pagamento{" "}
        <strong>cartão internacional</strong>, falha <strong>depois da verificação de OTP</strong>.
      </p>
      <p>Já ali, &ldquo;aleatório&rdquo; ficou um pouco menos aleatório.</p>

      <h2>2. Colete Evidências — antes que elas desapareçam</h2>
      <p>Problemas intermitentes são mais fáceis de investigar enquanto a evidência ainda existe. Procure por:</p>
      <ul>
        <li>logs da aplicação</li>
        <li>respostas de API</li>
        <li>IDs de correlação ou trace</li>
        <li>timestamps</li>
        <li>histórico de auditoria</li>
        <li>monitoramento</li>
        <li>detalhes de requisição/resposta onde for apropriado</li>
      </ul>
      <p>Não colete dado sensível de produção sem cuidado. Use acesso aprovado, mascaramento e controles de segurança.</p>
      <p>O objetivo não é <strong>mais logs</strong>. O objetivo é seguir <strong>uma jornada com falha</strong>.</p>
      <p>
        <strong>No nosso caso de pagamento</strong> — o time rastreia o pedido 78431. A requisição de
        pagamento chegou na aplicação. Passou pela verificação de OTP. Depois um serviço de
        pagamento downstream rejeitou a requisição. Agora sabemos onde olhar a seguir.
      </p>

      <h2>3. Entenda o Contexto — o que foi diferente?</h2>
      <p>A mesma funcionalidade pode se comportar de forma diferente dependendo do que a cerca. Confira as condições ao redor da falha:</p>
      <ul>
        <li>
          <strong>Usuário</strong> — papel, permissões, tipo de cliente
        </li>
        <li>
          <strong>Dispositivo</strong> — navegador, versão do app, sistema operacional
        </li>
        <li>
          <strong>Localização</strong> — região, rede, fuso horário
        </li>
        <li>
          <strong>Dado</strong> — estado da conta, valor, moeda, produto
        </li>
        <li>
          <strong>Timing</strong> — período de pico, jobs agendados, janelas de batch
        </li>
        <li>
          <strong>Sequência</strong> — o que aconteceu imediatamente antes da falha?
        </li>
      </ul>
      <p>Talvez o problema afete só:</p>
      <blockquote>Usuários Android numa versão mais antiga do app.</blockquote>
      <p>Ou:</p>
      <blockquote>Clientes com dois endereços.</blockquote>
      <p>Ou:</p>
      <blockquote>Transações acima de um certo valor.</blockquote>
      <p>Ou:</p>
      <blockquote>Requisições chegando enquanto um batch agendado trava um registro.</blockquote>
      <p>Você está procurando um padrão escondido dentro da palavra <strong>&ldquo;aleatório.&rdquo;</strong></p>
      <p>
        <strong>No nosso caso de pagamento</strong> — o time compara transações com sucesso e com
        falha. Uma pista aparece: a maioria das falhas envolve <strong>cartões internacionais</strong>.
        Essa vira a próxima hipótese.
      </p>

      <h2>4. Compare Ambientes — não compare só código</h2>
      <p>Uma suposição comum é:</p>
      <blockquote>&ldquo;Mesmo código, então deveria se comportar do mesmo jeito.&rdquo;</blockquote>
      <p>Mas a produção pode diferir da UAT em:</p>
      <ul>
        <li>dado</li>
        <li>configuração</li>
        <li>feature flags</li>
        <li>permissões</li>
        <li>integrações</li>
        <li>versões de serviço</li>
        <li>tráfego</li>
        <li>comportamento de rede</li>
        <li>agendamentos</li>
        <li>infraestrutura</li>
      </ul>
      <p>Então compare <strong>UAT vs Produção</strong>, não só <strong>código vs código</strong>. Pergunte:</p>
      <blockquote>
        <strong>O que existe na produção que nosso ambiente de teste não reproduz?</strong>
      </blockquote>
      <p>
        <strong>No nosso caso de pagamento</strong> — a UAT usa um provedor de pagamento de teste. A
        produção roteia certos pagamentos internacionais através de outro provedor. Mesma
        aplicação. Caminho diferente. Agora a investigação está ficando mais estreita.
      </p>

      <h2>5. Replique de Forma Mais Inteligente — recrie condições, não só passos</h2>
      <p>O usuário seguiu:</p>
      <blockquote>Login &rarr; Selecionar produto &rarr; Pagar &rarr; Falha</blockquote>
      <p>Repetir esses passos pode não recriar o problema. Tente combinar as condições ao redor:</p>
      <ul>
        <li>mesmo dado</li>
        <li>mesmo tipo de usuário</li>
        <li>mesmo dispositivo/versão do app</li>
        <li>mesma configuração</li>
        <li>mesmo caminho de integração</li>
        <li>mesma sequência</li>
        <li>timing/carga parecidos onde for seguro</li>
      </ul>
      <p>
        O objetivo não é copiar a produção de forma irresponsável. É recriar o{" "}
        <strong>menor conjunto de condições</strong> que dispara a falha.
      </p>
      <p>
        <strong>No nosso caso de pagamento</strong> — o QA agora testa: cartão internacional &rarr;
        mesma rota de pagamento &rarr; payload parecido. A falha aparece. Pela primeira vez, o time
        consegue reproduzir.
      </p>

      <h2>6. Aumente a Visibilidade — quando o sistema não está te contando o suficiente</h2>
      <p>Às vezes você não consegue reproduzir um problema porque o sistema não expõe evidência suficiente. Essa ausência já é uma informação útil. O time pode precisar de:</p>
      <ul>
        <li>logging mais estruturado</li>
        <li>IDs de correlação</li>
        <li>métricas</li>
        <li>alertas</li>
        <li>eventos de auditoria</li>
        <li>diagnósticos temporários</li>
        <li>monitoramento mais seguro no nível da funcionalidade</li>
      </ul>
      <p>Um BA não precisa desenhar a plataforma de observabilidade. Mas um BA pode perguntar:</p>
      <blockquote>
        <strong>&ldquo;Se isso acontecer de novo, que evidência a gente vai precisar para provar onde falhou?&rdquo;</strong>
      </blockquote>
      <p>Isso pode virar um requisito.</p>

      <h2>7. Isole &amp; Estreite — mude uma coisa por vez</h2>
      <p>Uma vez que você tem uma hipótese, estreite ela. Suponha que pagamentos internacionais pareçam suspeitos. Compare:</p>
      <ul>
        <li>Doméstico vs internacional.</li>
        <li>Uma moeda vs outra.</li>
        <li>Mobile vs web.</li>
        <li>Cliente existente vs cliente novo.</li>
        <li>Provedor de pagamento A vs provedor B.</li>
        <li>Uma configuração vs outra.</li>
      </ul>
      <p>Não mude cinco variáveis juntas. Você está tentando transformar:</p>
      <blockquote>&ldquo;Falha às vezes.&rdquo;</blockquote>
      <p>em:</p>
      <blockquote>
        <strong>&ldquo;Falha quando essas condições são verdadeiras.&rdquo;</strong>
      </blockquote>
      <p>
        <strong>No nosso caso de pagamento</strong> — o time eventualmente isola isto: cartão
        internacional + provedor de pagamento específico + endereço contendo um caractere
        especial. Agora a falha não é mais aleatória.
      </p>

      <h2>8. Prove &amp; Corrija — não pare em &ldquo;provavelmente&rdquo;</h2>
      <p>
        A causa raiz é encontrada. Um serviço de pagamento downstream rejeita certos caracteres de
        endereço por causa de um problema de codificação. Agora temos:
      </p>
      <blockquote>gatilho &rarr; ponto de falha &rarr; causa raiz</blockquote>
      <p>O time corrige. Mas não pare aí. Verifique se:</p>
      <ol>
        <li>a condição de falha original agora funciona</li>
        <li>os cenários relacionados continuam funcionando</li>
        <li>a correção se comporta corretamente sob condições parecidas com a produção</li>
        <li>o monitoramento consegue detectar recorrência onde for apropriado</li>
      </ol>
      <blockquote>
        <strong>&ldquo;O desenvolvedor disse que corrigiu&rdquo; não é encerramento.</strong>
      </blockquote>
      <p>
        <strong>Evidência é encerramento.</strong>
      </p>

      <h2>Lugares comuns para investigar</h2>
      <p>Quando você ainda não tem uma hipótese forte, olhe algumas áreas amplas.</p>
      <ul>
        <li>
          <strong>Dado</strong> — nulos, formatos inesperados, valores de fronteira, registros
          antigos ou migrados
        </li>
        <li>
          <strong>Configuração</strong> — feature flags, variáveis de ambiente, limites, regras de
          roteamento
        </li>
        <li>
          <strong>Código / Lógica</strong> — casos extremos, condições de corrida, tratamento de
          erro, transições de estado
        </li>
        <li>
          <strong>Dependências</strong> — serviços de terceiros, timeouts, problemas de rede,
          diferenças de versão
        </li>
        <li>
          <strong>Usuário / Acesso</strong> — permissões, papéis, direitos, segmentos de cliente
        </li>
        <li>
          <strong>Timing / Carga</strong> — tráfego de pico, jobs agendados, processamento
          assíncrono, concorrência
        </li>
      </ul>
      <p>Não marque caixas cegamente. Use essas áreas para gerar <strong>hipóteses melhores</strong>.</p>

      <h2>O erro de BA a evitar</h2>
      <p>Um usuário diz:</p>
      <blockquote>&ldquo;Falhou.&rdquo;</blockquote>
      <p>O time diz:</p>
      <blockquote>&ldquo;A gente testou e funciona.&rdquo;</blockquote>
      <p>As duas afirmações podem ser verdadeiras.</p>
      <p>Não transforme a investigação num debate sobre quem está certo. Pergunte:</p>
      <blockquote>
        <strong>&ldquo;O que foi diferente quando falhou?&rdquo;</strong>
      </blockquote>
      <p>Fique curioso. Não defensivo.</p>

      <h2>Antes de fechar o problema</h2>

      <div className="not-prose my-6 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
        <ChecklistGroup
          label="Prontidão"
          items={[
            "A gente consegue explicar a causa raiz?",
            "A gente consegue reproduzir o gatilho ou provar pela evidência?",
            "A condição de falha original foi verificada depois da correção?",
            "Os cenários relacionados foram checados?",
            "O monitoramento é suficiente se acontecer de novo?",
            "Os usuários ou times de negócio afetados foram informados?",
            "O aprendizado foi documentado?",
          ]}
        />
      </div>

      <p>Às vezes um problema intermitente não pode ser tornado perfeitamente determinístico. Tudo bem.</p>
      <p>
        O encerramento deveria ainda assim se basear em <strong>evidência — não exaustão</strong>.
      </p>

      <h2>O Playbook de Investigação de Problema em Produção</h2>
      <ul>
        <li>
          <strong>Escute &amp; Capture</strong> &rarr; Consiga a história exata.
        </li>
        <li>
          <strong>Colete Evidências</strong> &rarr; Preserve a jornada com falha.
        </li>
        <li>
          <strong>Entenda o Contexto</strong> &rarr; Encontre as condições ao redor.
        </li>
        <li>
          <strong>Compare Ambientes</strong> &rarr; Identifique o que difere.
        </li>
        <li>
          <strong>Replique de Forma Mais Inteligente</strong> &rarr; Recrie condições, não só passos.
        </li>
        <li>
          <strong>Aumente a Visibilidade</strong> &rarr; Capture a evidência que está faltando.
        </li>
        <li>
          <strong>Isole &amp; Estreite</strong> &rarr; Encontre o gatilho.
        </li>
        <li>
          <strong>Prove &amp; Corrija</strong> &rarr; Confirme, corrija e verifique.
        </li>
      </ul>

      <h2>Checklist de Investigação de Problema em Produção</h2>
      <p>Copie isso para o Jira, Confluence ou suas notas de incidente.</p>

      <div className="not-prose my-6 grid gap-6 rounded-2xl border border-border bg-muted/20 p-5 sm:grid-cols-2 sm:p-6">
        <ChecklistGroup
          label="Escute e capture"
          items={[
            "O que o usuário estava tentando fazer capturado",
            "Timestamp, ID de usuário/referência e ID de transação/pedido registrados",
            "Comportamento esperado vs real anotado",
            "Screenshot ou erro capturado",
          ]}
        />
        <ChecklistGroup
          label="Colete evidências"
          items={[
            "Logs da aplicação extraídos",
            "Respostas de API capturadas",
            "IDs de correlação ou trace encontrados",
            "Uma jornada com falha seguida do início ao fim",
          ]}
        />
        <ChecklistGroup
          label="Entenda o contexto"
          items={[
            "Papel e permissões do usuário checados",
            "Dispositivo, navegador e versão do app checados",
            "Localização, rede e fuso horário checados",
            "Dado e estado da conta checados",
            "Timing (período de pico, batch, agendamento) checado",
            "Sequência imediatamente anterior à falha revisada",
          ]}
        />
        <ChecklistGroup
          label="Compare ambientes"
          items={[
            "Dado de UAT vs Produção comparado",
            "Configuração e feature flags comparadas",
            "Integrações e versões de serviço comparadas",
            "Tráfego, infraestrutura e agendamento comparados",
          ]}
        />
        <ChecklistGroup
          label="Replique de forma mais inteligente"
          items={[
            "Mesmo dado, tipo de usuário e dispositivo recriados",
            "Mesma configuração e caminho de integração recriados",
            "Mesma sequência e timing recriados",
            "Menor condição de falha reproduzida",
          ]}
        />
        <ChecklistGroup
          label="Isole & estreite"
          items={[
            "Uma variável mudada por vez",
            "Condição de gatilho documentada",
            "“Falha às vezes” virou “falha quando X é verdadeiro”",
          ]}
        />
        <ChecklistGroup
          label="Prove & corrija"
          items={[
            "Causa raiz explicada",
            "Condição de falha original verificada depois da correção",
            "Cenários relacionados checados",
            "Monitoramento atualizado para detectar recorrência",
          ]}
        />
        <ChecklistGroup
          label="Feche corretamente"
          items={["Usuários ou times de negócio afetados informados", "Aprendizado documentado"]}
        />
      </div>

      <h2>O que fica</h2>
      <p>&ldquo;Não conseguimos reproduzir&rdquo; não é uma causa raiz.</p>
      <p>É um status de investigação.</p>
      <blockquote>
        <strong>Se o usuário está enfrentando isso, o problema é real — mesmo quando seu teste passa.</strong>
      </blockquote>
      <p>Não fique repetindo o mesmo teste esperando que o bug apareça.</p>
      <p>Capture a jornada com falha. Compare as condições. Encontre o que mudou. Estreite o gatilho. Depois prove.</p>
      <blockquote>
        <strong>
          Uma boa investigação transforma &ldquo;aleatório&rdquo; num padrão — e um padrão numa
          correção.
        </strong>
      </blockquote>
    </div>
  );
}

export { NinguemConsegueReproduzirOProblemaEmProducaoBody };
