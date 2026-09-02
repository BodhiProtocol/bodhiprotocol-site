import type { Playbook } from "@/types/content";

const investigationChecklist = `CHECKLIST DE INVESTIGAÇÃO DE DADOS FALTANTES / BATCH

Nome do batch / job:
Contagem esperada de registros:
Contagem real de registros:
Lacuna:

CONTAGENS POR PONTO DE CONTROLE
Origem:
Extração:
Transformação:
Validação:
Carga:
Relatório:

Primeiro ponto de controle onde esperado ≠ real:
Tipo de causa raiz (origem / seleção / transformação / validação / carga / consumo):

[ ] Causa raiz identificada e explicada
[ ] Contagens reconciliam em cada ponto de controle
[ ] Registros rejeitados ou pulados estão entendidos
[ ] Registros faltantes foram restaurados ou explicados
[ ] Saída downstream foi verificada
[ ] Controles de monitoramento ou reconciliação adicionados onde necessário
[ ] Stakeholders entendem o que aconteceu
[ ] O aprendizado está documentado
`;

export const oBatchRodouComSucessoPorQueOsDadosSumiram: Omit<Playbook, "readingTime"> = {
  slug: "o-batch-rodou-com-sucesso-por-que-os-dados-sumiram",
  title: "O Batch Rodou com Sucesso. Então Por Que os Dados Sumiram?",
  description: "Um status verde prova que o job terminou. Não prova que o resultado de negócio estava correto.",
  summary:
    "Um método de reconciliação em sete pontos de controle — Origem, Extração, Transformação, Validação, Carga, Reconciliação, Consumo — para achar exatamente onde um batch \"bem-sucedido\" perdeu registros em silêncio, trabalhado a partir de um batch de captura de operações de um banco que perdeu 2.000 operações.",
  category: "Business Analysis",
  tags: ["Dados", "Reconciliação", "Processamento em Lote"],
  author: "Surya",
  date: "2026-08-13",
  itemLabel: "Ponto de Controle",
  intro: [
    "São 8h30. A Operação abre o relatório diário. Ontem: 48.216 registros. Hoje: 46.193 registros. Mais de 2.000 registros faltando. Alguém verifica o batch da madrugada. Status: SUCESSO. O desenvolvedor diz que o job terminou com sucesso. A Operação pergunta onde estão os dados. Os dois podem estar certos — um job bem-sucedido prova que o processo terminou. Não prova que o resultado de negócio estava correto.",
    "Imagine um banco processando as operações de ontem durante a madrugada: Origem da Operação → Extração → Transformação → Validação → Carga → Reconciliação → Relatório. O batch normalmente processa cerca de 50.000 operações. Hoje o agendador está verde — nenhuma falha técnica óbvia — mas o relatório está faltando 2.000 operações. Não comece olhando fixo para o relatório final. Siga o dado.",
    "A solução não é discutir se o batch \"funcionou\". É rastrear a contagem de registros por cada estágio até você encontrar o ponto de controle exato onde esperado para de bater com real. É isso que transforma \"algum dado está faltando\" em \"2.000 registros esperados desapareceram entre Transformação e Validação\" — um problema que alguém realmente consegue resolver.",
  ],
  audience: [
    "Business Analysts e times de Operações investigando um batch que reporta SUCESSO mas está com dados faltando",
    "BAs apoiando funções de reconciliação, qualidade de dados ou controle",
    "QAs e desenvolvedores tentando isolar qual estágio do pipeline realmente perdeu registros",
    "Qualquer um que já teve que explicar \"o job está verde\" para alguém segurando o número errado",
  ],
  seoTitle: "O Batch Rodou com Sucesso — Então Por Que os Dados Sumiram? | BodhiProtocol",
  seoDescription:
    "Um guia de BA passo a passo para investigar dados faltantes depois de um batch bem-sucedido — rastreando contagens por Origem, Extração, Transformação, Validação, Carga, Reconciliação e Consumo para achar a primeira lacuna.",
  closingHeading: ["Um status verde prova que o processo terminou.", "Não prova que o resultado de negócio estava correto."],
  closingBody:
    "Da próxima vez que um batch reportar SUCESSO mas os números não baterem, não pare no agendador. Rastreie a contagem por Origem, Extração, Transformação, Validação, Carga, Reconciliação e Consumo e encontre o primeiro ponto de controle onde esperado para de bater com real. É aí que a investigação realmente começa — e reconciliar contagens em cada ponto de controle é como você garante que isso não vai acontecer de novo em silêncio.",
  closingTemplate: investigationChecklist,
  closingTemplateName: "Checklist de Investigação de Dados Faltantes / Batch",
  hacks: [
    {
      number: 1,
      title: "ORIGEM — O dado existia?",
      insight: "Antes de culpar o batch, verifique se a origem chegou a ter os registros faltantes.",
      list: [
        "Quantos registros eram esperados?",
        "Quantos estavam realmente disponíveis?",
        "Todo sistema de origem entregou?",
        "Alguma coisa chegou atrasada?",
        "Registros estavam incompletos, duplicados ou malformados?",
        "A janela de extração estava correta?",
      ],
      explanation:
        "Se a origem continha só 48.000 registros, o problema pode estar upstream, antes de o seu pipeline sequer tocar o dado. Se a origem tinha 50.000 mas só 48.000 foram extraídos, você já reduziu o problema para algo dentro do seu próprio processo.",
      whyItHelps: "Contagens transformam \"algum dado está faltando\" em \"2.000 registros esperados desapareceram entre Origem e Extração\" — algo bem mais fácil de investigar.",
    },
    {
      number: 2,
      title: "EXTRAÇÃO — Selecionamos tudo que deveríamos?",
      insight: "Um batch pode rodar com sucesso enquanto seleciona a população inteiramente errada.",
      list: [
        "A query diz trade_date = ontem, mas algumas operações chegaram depois da meia-noite.",
        "Um filtro exclui um status recém-introduzido.",
        "A extração usa created_date enquanto o negócio espera trade_date.",
      ],
      explanation: "A pergunta chave é: quais critérios de seleção foram realmente usados? Depois compare Esperado → Selecionado → Rejeitado.",
      whyItHelps: "Uma extração verde ainda pode estar incompleta — o job teve sucesso rodando a query errada.",
    },
    {
      number: 3,
      title: "TRANSFORMAÇÃO — A lógica de negócio removeu registros?",
      insight: "É aqui que o dado é mapeado, enriquecido, unido, agregado, convertido, deduplicado e classificado — e onde registros saem da população em silêncio.",
      before: "50.000 entraram na transformação.",
      after: "48.200 saíram da transformação.",
      shiftLabel: "A lacuna de 1.800 registros",
      list: [
        "Um join exige dados de referência que não existem para um produto novo.",
        "Uma moeda não mapeada derruba registros.",
        "A deduplicação remove operações válidas, não só as duplicadas.",
      ],
      whyItHelps: "Não pergunte só se a transformação teve sucesso. Pergunte qual regra fez esses registros específicos saírem da população esperada.",
    },
    {
      number: 4,
      title: "VALIDAÇÃO — Alguma coisa falhou em silêncio?",
      insight: "A maioria dos pipelines valida antes de carregar — mas o que acontece quando um registro falha na validação importa tanto quanto a validação em si.",
      list: ["Conta existe?", "Campos obrigatórios preenchidos?", "Moeda válida?", "Status permitido?", "Dado de referência disponível?"],
      explanation:
        "O batch inteiro para numa falha ou ele rejeita o registro e continua? Um job pode mostrar SUCESSO enquanto milhares de registros ficam parados numa tabela de rejeição, uma fila de erro, um arquivo de exceção ou uma dead-letter queue.",
      whyItHelps: "Não pergunte só se a validação rodou. Pergunte quantos registros passaram, falharam e foram pulados.",
    },
    {
      number: 5,
      title: "CARGA — Tudo realmente chegou?",
      insight: "Registros passarem na validação não é o mesmo que registros chegarem ao destino.",
      visual: { steps: ["Entrada", "Inserido", "Atualizado", "Rejeitado", "Confirmado"] },
      list: ["Falhas de restrição", "Erros de chave duplicada", "Problemas de permissão", "Problemas de armazenamento", "Rollbacks de transação", "Cargas parciais"],
      whyItHelps: "\"Carga concluída\" não basta sozinho — você precisa dos números em cada um desses cinco estados.",
    },
    {
      number: 6,
      title: "RECONCILIAÇÃO — Encontre a primeira lacuna",
      insight: "Esse costuma ser o jeito mais rápido de localizar o problema e é frequentemente pulado em favor de adivinhação.",
      explanation:
        "Pegue o batch noturno do banco: Origem 50.000, Extraído 50.000, Transformado 48.200, Validado 48.200, Carregado 48.200, Reportado 48.200. A primeira lacuna aparece durante a transformação — um novo tipo de instrumento foi introduzido ontem, a transformação junta toda operação a uma tabela de dados de referência, e esse novo tipo de instrumento não tem mapeamento de referência. O join derruba esses registros. O batch ainda completa. Tecnicamente SUCESSO. Resultado de negócio: 2.000 operações faltando.",
      whyItHelps: "Sem reconciliação, um time pode passar horas verificando o agendador, o banco de dados e o relatório. Com ela, a regra é simples: encontre o primeiro ponto de controle onde esperado ≠ real. É ali que a investigação geralmente deveria começar.",
      proTip: "Agora você consegue explicar o incidente com precisão: instrumento novo → mapeamento de referência faltando → join derruba registros → população downstream incompleta. Isso é muito mais útil do que \"problema no batch\".",
    },
    {
      number: 7,
      title: "CONSUMO — O dado está faltando ou só invisível?",
      insight: "Às vezes o dado chegou ao destino perfeitamente. O usuário simplesmente não consegue ver.",
      list: [
        "Filtros do relatório estão errados",
        "O cache do dashboard está desatualizado",
        "Datas de relatório diferem das datas de processamento",
        "Permissões escondem registros",
        "A extração downstream não foi atualizada",
        "O relatório lê uma tabela ou view diferente",
      ],
      whyItHelps: "\"Dado faltando no pipeline\" e \"dado faltando no que o usuário vê\" são problemas diferentes que precisam de correções diferentes.",
    },
    {
      number: 8,
      title: "O que SUCESSO realmente significa?",
      insight: "Essa é a pergunta que costuma mudar a investigação inteira.",
      compare: {
        leftLabel: "SUCESSO técnico",
        left: "Processo iniciou → nenhuma exceção fatal → processo terminou.",
        rightLabel: "SUCESSO de negócio",
        right: "Todos os registros esperados processados → exceções identificadas → totais reconciliados → dado downstream disponível.",
      },
      whyItHelps: "O desenvolvedor e a Operação não estão discordando sobre fatos — eles estão usando definições diferentes da mesma palavra. Um dos trabalhos do BA é transformar sucesso técnico em sucesso de negócio mensurável. Se SUCESSO pode significar a primeira definição enquanto um resultado importante está errado, o próprio critério de sucesso está incompleto.",
    },
    {
      number: 9,
      title: "Transforme o incidente num requisito melhor",
      insight: "Corrigir o problema é só metade do trabalho. Pergunte como isso vai ser detectado automaticamente amanhã.",
      list: [
        "Reconciliação origem-versus-destino",
        "Contagens de registros rejeitados",
        "Totais de controle",
        "Limiares de tolerância",
        "Alertas de dado faltante",
        "Monitoramento de exceções",
      ],
      explanation: "Por exemplo: \"Alertar a Operação se a contagem de registros carregados diferir da contagem extraída em mais de 0,5%.\"",
      whyItHelps: "Você não só ajudou a corrigir o problema de ontem. Você reduziu a chance de o problema de amanhã passar despercebido.",
      anchorLink: { label: "Use o checklist de fechamento antes de encerrar o incidente", href: "#closing-template" },
    },
  ],
};
