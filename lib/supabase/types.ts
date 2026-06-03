// ============================================================
// ATLIA — Tipos do banco de dados (gerado manualmente)
// ============================================================

export type StatusProjeto  = 'nao_iniciado' | 'em_andamento' | 'atencao' | 'atrasado' | 'concluido'
export type Prioridade     = 'alta' | 'media' | 'baixa'
export type TipoGanho      = 'N/A' | 'Operacional' | 'Financeiro' | 'Econômico'
export type StatusMarco    = 'pendente' | 'em_andamento' | 'concluido' | 'atrasado'
export type PerfilUsuario  = 'admin' | 'gestor' | 'visualizador'
export type PlanoMunicipio = 'starter' | 'plus' | 'pro'

// ── Tabelas ──────────────────────────────────────────────────

export interface Municipio {
  id:          string
  nome:        string
  estado:      string
  populacao:   number | null
  plano:       PlanoMunicipio
  ativo:       boolean
  created_at:  string
  updated_at:  string
}

export interface Usuario {
  id:           string
  municipio_id: string
  nome:         string
  cargo:        string | null
  perfil:       PerfilUsuario
  ativo:        boolean
  created_at:   string
}

export interface Secretaria {
  id:           string
  municipio_id: string
  nome:         string
  sigla:        string | null
  responsavel:  string | null
  cor:          string
  ativa:        boolean
  created_at:   string
}

export interface Eixo {
  id:           string
  municipio_id: string
  nome:         string
  descricao:    string | null
  cor:          string
  ordem:        number
  created_at:   string
}

export interface Objetivo {
  id:           string
  municipio_id: string
  eixo_id:      string
  nome:         string
  descricao:    string | null
  pct_atual:    number
  created_at:   string
}

export interface Projeto {
  id:             string
  municipio_id:   string
  secretaria_id:  string | null
  objetivo_id:    string | null
  responsavel_id: string | null
  nome:           string
  descricao:      string | null
  status:         StatusProjeto
  prioridade:     Prioridade
  tipo_ganho:     TipoGanho
  orcamento:      number
  executado:      number
  pct:            number
  data_inicio:    string | null
  data_fim:       string | null
  tags:           string[]
  created_at:     string
  updated_at:     string
}

export interface Marco {
  id:              string
  projeto_id:      string
  titulo:          string
  descricao:       string | null
  data_prevista:   string | null
  data_conclusao:  string | null
  status:          StatusMarco
  pct:             number
  ordem:           number
  created_at:      string
}

export interface HistoricoProjeto {
  id:          string
  projeto_id:  string
  usuario_id:  string | null
  tipo:        string
  descricao:   string
  created_at:  string
}

export interface Indicador {
  id:              string
  municipio_id:    string
  secretaria_id:   string | null
  nome:            string
  descricao:       string | null
  unidade:         string
  meta:            number
  valor_atual:     number
  menor_melhor:    boolean
  ano_referencia:  number
  created_at:      string
  updated_at:      string
}

export interface MedicaoIndicador {
  id:           string
  indicador_id: string
  mes:          number
  ano:          number
  valor:        number
  created_at:   string
}

// ── Joins úteis ───────────────────────────────────────────────

export interface ProjetoCompleto extends Projeto {
  secretaria:  Pick<Secretaria, 'id' | 'nome' | 'sigla' | 'cor'> | null
  objetivo:    Pick<Objetivo, 'id' | 'nome'> | null
  responsavel: Pick<Usuario, 'id' | 'nome' | 'cargo'> | null
  marcos:      Marco[]
  historico:   HistoricoProjeto[]
}

export interface ObjetivoComEixo extends Objetivo {
  eixo: Pick<Eixo, 'id' | 'nome' | 'cor'>
}

export interface IndicadorComSecretaria extends Indicador {
  secretaria: Pick<Secretaria, 'id' | 'nome' | 'sigla'> | null
}
