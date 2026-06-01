export type Status     = 'em_andamento' | 'atencao' | 'atrasado' | 'concluido' | 'nao_iniciado'
export type Prioridade = 'alta' | 'media' | 'baixa'
export type TipoGanho  = 'N/A' | 'Operacional' | 'Financeiro' | 'Econômico'
export type StatusMarco = 'concluido' | 'em_andamento' | 'pendente' | 'atrasado'

export interface Marco {
  id: string
  titulo: string
  descricao: string
  data_prevista: string
  data_conclusao?: string
  status: StatusMarco
  pct: number
}

export interface HistoricoItem {
  data: string
  autor: string
  acao: string
  detalhe?: string
}

export interface Projeto {
  id: string
  nome: string
  descricao: string
  secretaria: string
  responsavel: string
  responsavel_cargo: string
  status: Status
  prioridade: Prioridade
  tipoGanho: TipoGanho
  pct: number
  dataInicio: string
  dataFim: string
  orcamento: number
  executado: number
  eixo: string
  objetivo: string
  marcos: Marco[]
  historico: HistoricoItem[]
  tags: string[]
}

export const projetos: Projeto[] = [
  {
    id: '1',
    nome: 'Recapeamento Asfáltico — Zona Norte',
    descricao: 'Recuperação e recapeamento da malha viária da Zona Norte, contemplando 42 km de vias em estado crítico de conservação. O projeto abrange os bairros Tibery, Planalto, Dom Almir e Joana Darc, com impacto direto em 85.000 habitantes.',
    secretaria: 'Obras',
    responsavel: 'João Silva',
    responsavel_cargo: 'Secretário de Obras e Infraestrutura',
    status: 'em_andamento',
    prioridade: 'alta',
    tipoGanho: 'Operacional',
    pct: 68,
    dataInicio: '01/03/2025',
    dataFim: '30/08/2026',
    orcamento: 2800000,
    executado: 1900000,
    eixo: 'Uberlândia Sustentável',
    objetivo: 'Transformar a mobilidade urbana e a infraestrutura',
    marcos: [
      { id:'1.1', titulo:'Levantamento e projeto executivo',        descricao:'Mapeamento de todas as vias e elaboração do projeto técnico',                    data_prevista:'28/02/2025', data_conclusao:'20/02/2025', status:'concluido',    pct:100 },
      { id:'1.2', titulo:'Licitação e contratação de empresa',      descricao:'Processo licitatório e assinatura de contrato com empresa executora',            data_prevista:'30/04/2025', data_conclusao:'15/04/2025', status:'concluido',    pct:100 },
      { id:'1.3', titulo:'Execução — Fase 1 (Tibery e Planalto)',   descricao:'Recapeamento de 18 km nos bairros Tibery e Planalto',                           data_prevista:'31/08/2025', data_conclusao:'10/09/2025', status:'concluido',    pct:100 },
      { id:'1.4', titulo:'Execução — Fase 2 (Dom Almir e Joana D.)',descricao:'Recapeamento de 24 km nos bairros Dom Almir e Joana Darc',                      data_prevista:'28/02/2026', data_conclusao:undefined,   status:'em_andamento', pct: 55 },
      { id:'1.5', titulo:'Sinalização horizontal e vertical',       descricao:'Pintura de faixas, instalação de placas e demarcações de segurança',            data_prevista:'30/06/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
      { id:'1.6', titulo:'Vistoria final e entrega',                descricao:'Inspeção técnica, relatório final e cerimônia de entrega à comunidade',         data_prevista:'30/08/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
    ],
    historico: [
      { data:'20/02/2025', autor:'João Silva',       acao:'Projeto executivo aprovado',       detalhe:'Projeto aprovado pelo Conselho Municipal de Obras'  },
      { data:'15/04/2025', autor:'Ana Costa',        acao:'Contrato assinado',                detalhe:'Construtora Vias Ltda. — R$ 2.800.000'              },
      { data:'10/09/2025', autor:'João Silva',       acao:'Fase 1 concluída',                 detalhe:'18 km recapeados com 3 dias de atraso'              },
      { data:'15/01/2026', autor:'Pedro Rocha',      acao:'Status atualizado para Em andamento' },
      { data:'01/06/2026', autor:'Sistema',          acao:'Relatório mensal gerado automaticamente' },
    ],
    tags: ['Mobilidade', 'Infraestrutura', 'Zona Norte', 'Obras'],
  },
  {
    id: '2',
    nome: 'UBS Jardim das Palmeiras',
    descricao: 'Construção de nova Unidade Básica de Saúde no bairro Jardim das Palmeiras, com capacidade para 400 atendimentos diários. A unidade contará com consultórios médicos, odontológicos, sala de vacinas, farmácia básica e área de observação.',
    secretaria: 'Saúde',
    responsavel: 'Maria Souza',
    responsavel_cargo: 'Secretária Municipal de Saúde',
    status: 'atencao',
    prioridade: 'alta',
    tipoGanho: 'Operacional',
    pct: 32,
    dataInicio: '15/06/2025',
    dataFim: '15/06/2026',
    orcamento: 1500000,
    executado: 480000,
    eixo: 'Vida em Uberlândia',
    objetivo: 'Ampliar o acesso a serviços de saúde, educação e assistência',
    marcos: [
      { id:'2.1', titulo:'Projeto arquitetônico aprovado',     descricao:'Aprovação do projeto pela Vigilância Sanitária e CREA',         data_prevista:'30/07/2025', data_conclusao:'25/07/2025', status:'concluido',    pct:100 },
      { id:'2.2', titulo:'Terraplanagem e fundação',           descricao:'Preparação do terreno, demolição de estrutura existente e fundação', data_prevista:'30/09/2025', data_conclusao:'15/10/2025', status:'concluido',    pct:100 },
      { id:'2.3', titulo:'Estrutura e alvenaria',              descricao:'Levantamento da estrutura de concreto e alvenaria',              data_prevista:'31/01/2026', data_conclusao:undefined,   status:'atrasado',     pct: 45 },
      { id:'2.4', titulo:'Instalações e acabamento',          descricao:'Instalações elétricas, hidráulicas e revestimentos',             data_prevista:'30/04/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
      { id:'2.5', titulo:'Equipamentos e mobiliário',         descricao:'Compra e instalação de equipamentos médicos e mobiliário',       data_prevista:'31/05/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
      { id:'2.6', titulo:'Vistoria e inauguração',            descricao:'Vistoria sanitária, habilitação e inauguração da UBS',           data_prevista:'15/06/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
    ],
    historico: [
      { data:'15/06/2025', autor:'Maria Souza',      acao:'Projeto iniciado',                 detalhe:'Ordem de serviço emitida'                           },
      { data:'25/07/2025', autor:'Vigilância San.',  acao:'Projeto aprovado',                 detalhe:'Alvará de construção emitido'                       },
      { data:'20/10/2025', autor:'João Silva',       acao:'Alerta de atraso registrado',      detalhe:'Marco 2.3 com 15 dias de atraso — chuvas intensas' },
      { data:'10/01/2026', autor:'Maria Souza',      acao:'Status alterado para Atenção',     detalhe:'Ritmo de obra abaixo do previsto'                   },
    ],
    tags: ['Saúde', 'UBS', 'Zona Sul', 'Construção'],
  },
  {
    id: '3',
    nome: 'Sistema de Monitoramento Escolar',
    descricao: 'Implantação de sistema digital integrado de monitoramento de frequência, desempenho e alertas em todas as 87 escolas da rede municipal. Inclui painéis de gestão para diretores, secretários e Secretaria de Educação.',
    secretaria: 'Educação',
    responsavel: 'Carlos Lima',
    responsavel_cargo: 'Secretário Municipal de Educação',
    status: 'em_andamento',
    prioridade: 'media',
    tipoGanho: 'Econômico',
    pct: 81,
    dataInicio: '02/01/2025',
    dataFim: '15/12/2026',
    orcamento: 420000,
    executado: 340000,
    eixo: 'Vida em Uberlândia',
    objetivo: 'Valorizar a cultura, o esporte, o lazer e a segurança',
    marcos: [
      { id:'3.1', titulo:'Definição de requisitos e RFP',    descricao:'Levantamento de necessidades e publicação de RFP para contratação', data_prevista:'31/01/2025', data_conclusao:'28/01/2025', status:'concluido',    pct:100 },
      { id:'3.2', titulo:'Contratação e kickoff',             descricao:'Seleção de fornecedor e reunião de início do projeto',              data_prevista:'28/02/2025', data_conclusao:'05/03/2025', status:'concluido',    pct:100 },
      { id:'3.3', titulo:'Desenvolvimento do sistema',        descricao:'Desenvolvimento das funcionalidades principais pela equipe de TI',  data_prevista:'31/07/2025', data_conclusao:'20/07/2025', status:'concluido',    pct:100 },
      { id:'3.4', titulo:'Piloto em 10 escolas',              descricao:'Implantação e validação em 10 escolas selecionadas',                data_prevista:'30/09/2025', data_conclusao:'28/09/2025', status:'concluido',    pct:100 },
      { id:'3.5', titulo:'Rollout em todas as 87 escolas',    descricao:'Implantação completa e treinamento de gestores e professores',      data_prevista:'31/08/2026', data_conclusao:undefined,   status:'em_andamento', pct: 65 },
      { id:'3.6', titulo:'Relatório de impacto e encerramento',descricao:'Avaliação de resultados e documentação do projeto',               data_prevista:'15/12/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
    ],
    historico: [
      { data:'02/01/2025', autor:'Carlos Lima',  acao:'Projeto iniciado'                                           },
      { data:'05/03/2025', autor:'Fábio Torres', acao:'Contrato assinado com TechEdu Ltda.',  detalhe:'R$ 420.000' },
      { data:'28/09/2025', autor:'Carlos Lima',  acao:'Piloto concluído com sucesso',         detalhe:'98% de aprovação pelos diretores' },
      { data:'15/01/2026', autor:'Carlos Lima',  acao:'Rollout iniciado',                     detalhe:'Treinamento de 340 gestores' },
    ],
    tags: ['Educação', 'Tecnologia', 'Digital', 'Gestão Escolar'],
  },
  {
    id: '4',
    nome: 'Revitalização da Praça Central',
    descricao: 'Reforma completa da Praça Tubal Vilela (Centro), incluindo nova pavimentação, paisagismo, iluminação LED, coreto, playground inclusivo, área fitness e wi-fi público. A praça é frequentada por 12.000 pessoas por semana.',
    secretaria: 'Urbanismo',
    responsavel: 'Ana Costa',
    responsavel_cargo: 'Secretária de Urbanismo e Planejamento',
    status: 'atrasado',
    prioridade: 'alta',
    tipoGanho: 'N/A',
    pct: 15,
    dataInicio: '01/09/2025',
    dataFim: '01/04/2026',
    orcamento: 680000,
    executado: 102000,
    eixo: 'Uberlândia Sustentável',
    objetivo: 'Tornar os espaços públicos modernos e atrativos',
    marcos: [
      { id:'4.1', titulo:'Projeto paisagístico e aprovação',  descricao:'Elaboração e aprovação do projeto pela Câmara de Vereadores',     data_prevista:'31/10/2025', data_conclusao:'28/10/2025', status:'concluido',    pct:100 },
      { id:'4.2', titulo:'Demolição e preparação do terreno', descricao:'Retirada de estruturas antigas e nivelamento',                     data_prevista:'30/11/2025', data_conclusao:'20/12/2025', status:'concluido',    pct:100 },
      { id:'4.3', titulo:'Pavimentação e drenagem',           descricao:'Execução de novo piso, sarjetas e sistema de drenagem pluvial',   data_prevista:'31/01/2026', data_conclusao:undefined,   status:'atrasado',     pct: 20 },
      { id:'4.4', titulo:'Paisagismo e mobiliário urbano',    descricao:'Plantio de mudas, gramado, bancos e lixeiras',                    data_prevista:'15/03/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
      { id:'4.5', titulo:'Iluminação, playground e wi-fi',   descricao:'Instalação de luminárias LED, playground inclusivo e rede wi-fi', data_prevista:'31/03/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
      { id:'4.6', titulo:'Inauguração',                       descricao:'Evento de entrega para a comunidade',                             data_prevista:'01/04/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
    ],
    historico: [
      { data:'01/09/2025', autor:'Ana Costa',      acao:'Projeto iniciado'                                              },
      { data:'10/11/2025', autor:'Ana Costa',      acao:'Empresa contratada',              detalhe:'UrbanVerde Obras'   },
      { data:'05/01/2026', autor:'Sistema',        acao:'Alerta de atraso automático',     detalhe:'Marco 4.3 está 5 dias atrasado' },
      { data:'20/01/2026', autor:'Ana Costa',      acao:'Status alterado para Atrasado',   detalhe:'Problemas com fornecedor de materiais' },
    ],
    tags: ['Urbanismo', 'Praça', 'Centro', 'Lazer'],
  },
  {
    id: '5',
    nome: 'Programa Emprego e Renda 2026',
    descricao: 'Programa integrado de qualificação profissional e geração de emprego, com oferta de 3.200 vagas em cursos técnicos, feiras de emprego mensais, conexão com empresas parceiras e apoio ao microempreendedorismo.',
    secretaria: 'Trabalho',
    responsavel: 'Pedro Rocha',
    responsavel_cargo: 'Secretário do Trabalho e Geração de Renda',
    status: 'em_andamento',
    prioridade: 'media',
    tipoGanho: 'Econômico',
    pct: 55,
    dataInicio: '15/01/2026',
    dataFim: '31/12/2026',
    orcamento: 350000,
    executado: 192500,
    eixo: 'Espaço Uberlândia',
    objetivo: 'Explorar oportunidades de qualificação e trabalho',
    marcos: [
      { id:'5.1', titulo:'Mapeamento de demandas do mercado',  descricao:'Pesquisa com 200 empresas sobre vagas e perfil profissional',     data_prevista:'31/01/2026', data_conclusao:'28/01/2026', status:'concluido',    pct:100 },
      { id:'5.2', titulo:'Parceria com instituições de ensino',descricao:'Termos de cooperação com SENAI, SENAC e UFU',                     data_prevista:'28/02/2026', data_conclusao:'25/02/2026', status:'concluido',    pct:100 },
      { id:'5.3', titulo:'1ª rodada de cursos (jan–abr)',       descricao:'800 vagas em 12 cursos técnicos + 2 feiras de emprego',          data_prevista:'30/04/2026', data_conclusao:'28/04/2026', status:'concluido',    pct:100 },
      { id:'5.4', titulo:'2ª rodada de cursos (mai–ago)',       descricao:'1.200 vagas em 18 cursos + programa de microempreendedorismo',   data_prevista:'31/08/2026', data_conclusao:undefined,   status:'em_andamento', pct: 45 },
      { id:'5.5', titulo:'3ª rodada e encerramento (set–dez)', descricao:'1.200 vagas e relatório de impacto final',                       data_prevista:'31/12/2026', data_conclusao:undefined,   status:'pendente',     pct:  0 },
    ],
    historico: [
      { data:'15/01/2026', autor:'Pedro Rocha',  acao:'Programa iniciado'                                              },
      { data:'28/04/2026', autor:'Pedro Rocha',  acao:'1ª rodada concluída',             detalhe:'783 pessoas empregadas até junho' },
      { data:'01/05/2026', autor:'Sistema',      acao:'Relatório trimestral gerado'                                    },
    ],
    tags: ['Trabalho', 'Emprego', 'Qualificação', 'Renda'],
  },
]

export function getProjetoById(id: string): Projeto | undefined {
  return projetos.find(p => p.id === id)
}
