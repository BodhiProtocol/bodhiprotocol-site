import { ArrowDown } from "lucide-react";

function JourneyStep({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <p className="font-heading text-base font-medium text-foreground">{title}</p>
      {detail ? <p className="text-sm text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

function JourneyArrow() {
  return <ArrowDown className="size-4 shrink-0 text-brand/60" aria-hidden="true" />;
}

// Tradução da versão em inglês em front-office-middle-office-back-office-body.tsx.
// Este playbook acompanha uma operação da ordem até a liquidação em vez de
// listar dicas independentes — por isso, como os outros playbooks
// narrativos, renderiza como prosa corrida em vez de cards numerados. Omite
// o infográfico e o DownloadCard só em inglês do original. Veja o registro
// customPlaybookBodies em app/pt-br/ba-playbooks/[slug]/page.tsx.
function OQueFrontOfficeMiddleOfficeEBackOfficeFazemBody() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-brand">
      <p>Você entra no seu primeiro projeto de Capital Markets.</p>
      <p>Em poucas reuniões:</p>
      <blockquote>&ldquo;Isso é um problema do Front Office.&rdquo;</blockquote>
      <p>Depois:</p>
      <blockquote>&ldquo;O Middle Office deveria ter pego isso.&rdquo;</blockquote>
      <p>Mais tarde:</p>
      <blockquote>&ldquo;Confere com o Back Office.&rdquo;</blockquote>
      <p>Todo mundo segue em frente.</p>
      <p>Você ainda está pensando:</p>
      <p>
        <strong>O que exatamente são esses &ldquo;offices&rdquo;?</strong>
      </p>
      <p>
        E onde entram <strong>Market Data, Reference Data e Risk</strong>?
      </p>
      <p>Vamos usar:</p>
      <p>
        🇮🇳 <strong>a Reliance Industries na Índia</strong>
      </p>
      <p>e ocasionalmente:</p>
      <p>
        🌍 <strong>a Microsoft nos EUA</strong>
      </p>
      <p>para ver como a mesma jornada de operação funciona em mercados diferentes.</p>

      <h2>Primeiro, esqueça a palavra &ldquo;escritório&rdquo;</h2>
      <p>Eles não são necessariamente escritórios físicos.</p>
      <p>Pense neles como responsabilidades amplas ao longo do ciclo de vida da operação.</p>
      <p>Um modelo mental simples:</p>
      <p>
        <strong>Front Office</strong> &rarr; executa a operação
        <br />
        <strong>Middle Office</strong> &rarr; confere e controla
        <br />
        <strong>Back Office</strong> &rarr; processa até a liquidação
      </p>
      <p>E o <strong>Risk</strong>?</p>
      <p>Isso pode atravessar a jornada inteira.</p>
      <p>Uma coisa antes de começarmos:</p>
      <blockquote>
        <strong>Não decore o organograma. Decore a responsabilidade.</strong>
      </blockquote>
      <p>Firmas diferentes organizam esses times de formas diferentes.</p>
      <p>O ciclo de vida é o que importa.</p>
      <p>Agora vamos operar.</p>

      <h2>1. Market Data: O que está acontecendo?</h2>
      <p>Você está prestes a comprar Reliance na NSE.</p>
      <p>Primeira pergunta:</p>
      <blockquote>&ldquo;O que o mercado está fazendo?&rdquo;</blockquote>
      <p>Você precisa de coisas como:</p>
      <ul>
        <li>preço</li>
        <li>bid e ask</li>
        <li>volume</li>
        <li>dado do livro de ofertas</li>
        <li>índices</li>
        <li>taxas</li>
      </ul>
      <p>
        Isso é <strong>Market Data</strong>.
      </p>
      <p>Um trader comprando Microsoft precisa do mesmo tipo de informação do mercado americano correspondente.</p>
      <p>Uma forma fácil de lembrar:</p>
      <blockquote>
        <strong>Market Data = O que está acontecendo no mercado agora?</strong>
      </blockquote>
      <p>Sem isso, você basicamente está operando no escuro.</p>

      <h2>2. Reference Data: Com o que exatamente estamos operando?</h2>
      <p>Você diz:</p>
      <blockquote>&ldquo;Comprar Reliance.&rdquo;</blockquote>
      <p>Um humano entende.</p>
      <p>Um sistema precisa de mais.</p>
      <p>Qual instrumento?</p>
      <p>Qual bolsa?</p>
      <p>Qual moeda?</p>
      <p>Qual conta?</p>
      <p>Qual contraparte?</p>
      <p>
        Isso é <strong>Reference Data</strong>.
      </p>
      <p>Descreve coisas como:</p>
      <ul>
        <li>instrumentos</li>
        <li>bolsas</li>
        <li>moedas</li>
        <li>contas</li>
        <li>entidades legais</li>
        <li>instruções de liquidação</li>
      </ul>
      <p>A distinção é simples:</p>
      <p>
        <strong>Market Data</strong> &rarr; O que está acontecendo com ele?
      </p>
      <p>
        <strong>Reference Data</strong> &rarr; O que ele é?
      </p>
      <p>Essa distinção sozinha já vai evitar muita confusão depois.</p>

      <h2>3. Front Office: Vamos executar a ordem</h2>
      <p>Um cliente institucional diz:</p>
      <blockquote>
        <strong>Comprar 10.000 ações da Reliance.</strong>
      </blockquote>
      <p>
        A ordem chega ao <strong>Front Office</strong>.
      </p>
      <p>É aqui que você vai ouvir termos como:</p>
      <ul>
        <li>Sales</li>
        <li>Trading</li>
        <li>Execution</li>
        <li>OMS</li>
        <li>EMS</li>
      </ul>
      <p>
        O cliente envia uma <strong>ordem</strong>.
      </p>
      <p>Mas 10.000 ações podem não ser executadas de uma vez.</p>
      <p>Talvez:</p>
      <p>3.000 são executadas.</p>
      <p>Depois 4.000.</p>
      <p>Depois 3.000.</p>
      <p>
        Essas são <strong>execuções</strong>.
      </p>
      <p>A mesma ideia se aplica se o cliente estiver comprando Microsoft nos EUA.</p>
      <p>O Front Office está basicamente perguntando:</p>
      <blockquote>&ldquo;Certo, como a gente realmente executa essa ordem?&rdquo;</blockquote>

      <h2>4. A operação foi executada. Terminou?</h2>
      <p>Não.</p>
      <p>Essa é uma das coisas mais importantes de entender:</p>
      <blockquote>
        <strong>Executada não significa finalizada.</strong>
      </blockquote>
      <p>A ordem da Reliance pode mostrar:</p>
      <blockquote>
        <strong>FILLED</strong>
      </blockquote>
      <p>Ótimo.</p>
      <p>Mas a operação ainda pode ter:</p>
      <ul>
        <li>a conta errada</li>
        <li>instruções de liquidação faltando</li>
        <li>um descasamento de posição</li>
        <li>uma quebra de reconciliação</li>
        <li>uma falha de liquidação</li>
      </ul>
      <p>Imagine que a execução foi perfeita.</p>
      <p>Mas a instrução de liquidação aponta para a conta errada.</p>
      <p>O Front Office vê:</p>
      <blockquote>&ldquo;Operação feita.&rdquo;</blockquote>
      <p>Os times de pós-operação veem:</p>
      <blockquote>&ldquo;Temos um problema.&rdquo;</blockquote>
      <p>Então lembre:</p>
      <p>
        <strong>Sucesso na execução &ne; ciclo de vida completo</strong>
      </p>

      <h2>5. Middle Office: Capturamos isso corretamente?</h2>
      <p>O trader diz:</p>
      <blockquote>&ldquo;Feito.&rdquo;</blockquote>
      <p>O Middle Office diz:</p>
      <blockquote>&ldquo;Legal. Está tudo realmente certo?&rdquo;</blockquote>
      <p>As responsabilidades variam por firma, mas o Middle Office costuma lidar com coisas como:</p>
      <ul>
        <li>validação de operação</li>
        <li>posições</li>
        <li>checagens de P&amp;L</li>
        <li>reconciliação</li>
        <li>enriquecimento de operação</li>
        <li>exceções</li>
        <li>controles</li>
      </ul>
      <p>O modelo mental mais simples:</p>
      <p>
        <strong>Front Office</strong>
      </p>
      <blockquote>A gente operou.</blockquote>
      <p>
        <strong>Middle Office</strong>
      </p>
      <blockquote>A gente capturou e controlou isso corretamente?</blockquote>
      <p>Isso já basta para começar.</p>

      <h2>6. Risk: O que essa operação mudou?</h2>
      <p>Toda operação muda alguma coisa.</p>
      <p>Uma posição.</p>
      <p>Uma exposição.</p>
      <p>Um risco.</p>
      <p>Você pode ouvir:</p>

      <h3>Market Risk</h3>
      <p>E se o preço se mover contra a gente?</p>

      <h3>Credit / Counterparty Risk</h3>
      <p>E se a outra parte não conseguir cumprir a obrigação dela?</p>

      <h3>Liquidity Risk</h3>
      <p>A gente consegue financiar ou sair da posição?</p>

      <h3>Operational Risk</h3>
      <p>E se um sistema ou processo falhar?</p>

      <p>Aqui está o ponto importante:</p>
      <blockquote>
        <strong>O Risk não fica parado em um único ponto do ciclo de vida.</strong>
      </blockquote>
      <p>Uma checagem de limite pré-operação?</p>
      <p>Risk.</p>
      <p>Monitorar exposição depois da execução?</p>
      <p>Risk.</p>
      <p>Checar se uma contraparte está perto do limite de crédito?</p>
      <p>Também Risk.</p>
      <p>Então não pense:</p>
      <p>
        <strong>Front Office &rarr; Risk &rarr; Middle Office</strong>
      </p>
      <p>Pense:</p>
      <blockquote>
        <strong>O Risk pode atravessar a jornada inteira.</strong>
      </blockquote>

      <h2>7. Back Office: Agora conclua a operação</h2>
      <p>Você comprou as ações da Reliance.</p>
      <p>Eventualmente, duas coisas precisam acontecer:</p>
      <p>
        <strong>os títulos se movem</strong>
      </p>
      <p>e</p>
      <p>
        <strong>o dinheiro se move.</strong>
      </p>
      <p>
        É aí que entra o <strong>Back Office</strong>.
      </p>
      <p>Dependendo da firma, pode cobrir:</p>
      <ul>
        <li>confirmação</li>
        <li>clearing</li>
        <li>liquidação</li>
        <li>processamento de caixa</li>
        <li>processamento de títulos</li>
        <li>reconciliação</li>
        <li>eventos corporativos</li>
        <li>exceções de liquidação</li>
      </ul>
      <p>
        Na Índia, a jornada pode envolver bolsas, câmaras de compensação, corretoras, custodiantes
        e depositárias como a <strong>NSDL ou a CDSL</strong>.
      </p>
      <p>Nos EUA, a infraestrutura é diferente.</p>
      <p>Mas a pergunta é a mesma:</p>
      <blockquote>
        <strong>O comprador recebeu os títulos, e o vendedor recebeu o dinheiro?</strong>
      </blockquote>
      <p>Isso é liquidação da forma mais simples.</p>

      <h2>Agora olhe a jornada inteira</h2>
      <p>O que parecia:</p>
      <blockquote>
        <strong>COMPRAR RELIANCE</strong>
      </blockquote>
      <p>na verdade é mais parecido com isto:</p>

      <div className="not-prose my-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/20 px-6 py-8">
        <JourneyStep title="Market Data" detail="O que está acontecendo?" />
        <JourneyArrow />
        <JourneyStep title="Reference Data" detail="O que estamos operando?" />
        <JourneyArrow />
        <JourneyStep title="Front Office" detail="Ordem → Execução → Operação" />
        <JourneyArrow />
        <JourneyStep title="Middle Office" detail="Validar → Enriquecer → Controlar" />
        <JourneyArrow />
        <JourneyStep title="Back Office" detail="Confirmar → Compensar → Liquidar" />
        <JourneyArrow />
        <JourneyStep title="Caixa e títulos se movem" />
      </div>

      <p>E ao longo de toda a jornada:</p>
      <p>
        <strong>Risk</strong>
      </p>
      <blockquote>Que exposição existe, e estamos dentro dos nossos limites?</blockquote>
      <p>Agora essas param de parecer seis definições sem relação.</p>
      <p>
        Todas estão ajudando <strong>uma operação se mover através de um sistema</strong>.
      </p>

      <h2>Por que isso importa se você é BA, QA ou desenvolvedor</h2>
      <p>Imagine que o Desenvolvimento diz:</p>
      <blockquote>&ldquo;É só um campo novo.&rdquo;</blockquote>
      <p>Parece inofensivo. 😄</p>
      <p>Agora comece a perguntar:</p>
      <p>De onde vem esse campo?</p>
      <p>O Front Office o cria?</p>
      <p>O Reference Data o fornece?</p>
      <p>O Risk o usa?</p>
      <p>O Middle Office o valida?</p>
      <p>O Back Office precisa dele?</p>
      <p>Outro sistema downstream o consome?</p>
      <p>De repente:</p>
      <blockquote>
        <strong>Um campo não é só um campo.</strong>
      </blockquote>
      <p>É informação viajando através de uma cadeia.</p>
      <p>
        Para um <strong>BA</strong>, isso é análise de impacto.
      </p>
      <p>
        Para um <strong>QA</strong>, isso significa testar além de uma única tela.
      </p>
      <p>
        Para um <strong>desenvolvedor</strong>, isso explica por que uma mudança pequena pode afetar
        vários sistemas.
      </p>
      <p>
        E para um <strong>recém-formado ou analista</strong>, isso te dá o mapa antes de você
        começar a aprender cada rua.
      </p>

      <h2>As seis perguntas para lembrar</h2>
      <p>Quando você ver um novo processo de Capital Markets, pergunte:</p>
      <p>
        <strong>Market Data</strong> &mdash; O que está acontecendo?
      </p>
      <p>
        <strong>Reference Data</strong> &mdash; Com o que exatamente estamos lidando?
      </p>
      <p>
        <strong>Front Office</strong> &mdash; Como foi executada?
      </p>
      <p>
        <strong>Risk</strong> &mdash; Que exposição isso criou?
      </p>
      <p>
        <strong>Middle Office</strong> &mdash; Foi capturada e controlada corretamente?
      </p>
      <p>
        <strong>Back Office</strong> &mdash; A transação foi concluída?
      </p>
      <p>Você não precisa entender cada sistema no primeiro dia.</p>
      <p>Comece com:</p>
      <blockquote>
        <strong>Onde isso se encaixa na jornada da operação?</strong>
      </blockquote>

      <h2>A ideia para levar com você</h2>
      <p>Quando alguém disser:</p>
      <blockquote>&ldquo;Isso é um problema do Front Office.&rdquo;</blockquote>
      <p>ou:</p>
      <blockquote>&ldquo;O Middle Office deveria investigar.&rdquo;</blockquote>
      <p>Não pergunte imediatamente:</p>
      <p>
        <strong>&ldquo;Qual departamento é esse?&rdquo;</strong>
      </p>
      <p>Pergunte:</p>
      <blockquote>
        <strong>&ldquo;O que está acontecendo com a operação nesse ponto?&rdquo;</strong>
      </blockquote>
      <p>Essa pergunta geralmente vai te aproximar muito mais da resposta.</p>
      <p>Porque uma operação não é só uma compra e uma venda.</p>
      <blockquote>
        <strong>É uma jornada da intenção &rarr; execução &rarr; controle &rarr; liquidação.</strong>
      </blockquote>
      <p>
        E <strong>Market Data, Reference Data e Risk</strong> ajudam essa jornada a funcionar.
      </p>
      <p>Uma vez que você vê a jornada, o jargão começa a virar um mapa.</p>
    </div>
  );
}

export { OQueFrontOfficeMiddleOfficeEBackOfficeFazemBody };
