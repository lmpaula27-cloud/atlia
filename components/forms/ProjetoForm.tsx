'use client'
import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// ── Tipos ─────────────────────────────────────────────────────
export interface ProjetoEditavel {
  id?: string
  nome: string
  descricao: string | null
  secretaria_id: string | null
  objetivo_id: string | null
  meta_id: string | null
  status: string
  prioridade: string
  tipo_ganho: string
  pct: number
  peso: number
  data_inicio: string | null
  data_fim: string | null
  orcamento: number
  executado: number
  tags: string[]
  bairro?: string | null
  lat?: number | null
  lng?: number | null
}

interface Props {
  projetoInicial?: ProjetoEditavel
  /** Se informado, bloqueia o campo secretaria (para gestores) */
  secretariaInicial?: string
  /** Gestor: restringe o select às secretarias com acesso; se houver só 1, o campo fica travado */
  secretariasPermitidas?: string[]
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

// ── Opções dos selects ────────────────────────────────────────
const statusOpts = [
  { value: 'nao_iniciado', label: 'Não iniciado' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'atencao',      label: 'Atenção' },
  { value: 'atrasado',     label: 'Atrasado' },
  { value: 'concluido',    label: 'Concluído' },
]
const prioridadeOpts = [
  { value: 'alta',  label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
]
const tipoGanhoOpts = [
  { value: 'N/A',         label: 'N/A' },
  { value: 'Operacional', label: 'Operacional' },
  { value: 'Financeiro',  label: 'Financeiro' },
  { value: 'Econômico',   label: 'Econômico' },
]

// ── Helpers ───────────────────────────────────────────────────
const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function ProjetoForm({ projetoInicial, secretariaInicial, secretariasPermitidas, onSuccess, onCancelar }: Props) {
  const editando = !!projetoInicial?.id

  // Secretaria travada: prop legada OU gestor com acesso a uma única secretaria
  const secretariaTravada: string | undefined =
    secretariaInicial ?? (secretariasPermitidas?.length === 1 ? secretariasPermitidas[0] : undefined)

  // ── Estado do formulário ─────────────────────────────────────
  const [nome,         setNome]         = useState(projetoInicial?.nome ?? '')
  const [descricao,    setDescricao]    = useState(projetoInicial?.descricao ?? '')
  const [secretariaId, setSecretariaId] = useState(projetoInicial?.secretaria_id ?? secretariaTravada ?? '')
  const [objetivoId,   setObjetivoId]   = useState(projetoInicial?.objetivo_id ?? '')
  const [metaId,       setMetaId]       = useState(projetoInicial?.meta_id ?? '')
  const [status,       setStatus]       = useState(projetoInicial?.status ?? 'nao_iniciado')
  const [prioridade,   setPrioridade]   = useState(projetoInicial?.prioridade ?? 'media')
  const [tipoGanho,    setTipoGanho]    = useState(projetoInicial?.tipo_ganho ?? 'N/A')
  const [pct,          setPct]          = useState(projetoInicial?.pct ?? 0)
  const [peso,         setPeso]         = useState(projetoInicial?.peso ?? 1)
  const [dataInicio,   setDataInicio]   = useState(projetoInicial?.data_inicio ?? '')
  const [dataFim,      setDataFim]      = useState(projetoInicial?.data_fim ?? '')
  const [orcamento,    setOrcamento]    = useState(projetoInicial?.orcamento ?? 0)
  const [executado,    setExecutado]    = useState(projetoInicial?.executado ?? 0)
  const [tagsTexto,    setTagsTexto]    = useState((projetoInicial?.tags ?? []).join(', '))
  const [bairro,       setBairro]       = useState(projetoInicial?.bairro ?? '')
  const [lat,          setLat]          = useState(projetoInicial?.lat?.toString() ?? '')
  const [lng,          setLng]          = useState(projetoInicial?.lng?.toString() ?? '')

  // ── Dados para selects ───────────────────────────────────────
  const [secretarias, setSecretarias] = useState<{ id: string; nome: string }[]>([])
  const [objetivos,   setObjetivos]   = useState<{ id: string; nome: string }[]>([])
  const [metas,       setMetas]       = useState<{ id: string; nome: string; objetivo_id: string }[]>([])
  const [carregandoOpts, setCarregandoOpts] = useState(true)

  // ── Estado de envio ──────────────────────────────────────────
  const [salvando, setSalvando] = useState(false)
  const [erro,     setErro]     = useState('')

  // ── Carrega secretarias e objetivos ──────────────────────────
  useEffect(() => {
    async function carregar() {
      const supabase = createClient()
      const [{ data: secs }, { data: objs }, { data: mets }] = await Promise.all([
        supabase.from('secretarias').select('id, nome').order('nome'),
        supabase.from('objetivos').select('id, nome').order('nome'),
        supabase.from('metas').select('id, nome, objetivo_id').order('nome'),
      ])
      setSecretarias(secs ?? [])
      setObjetivos(objs ?? [])
      setMetas(mets ?? [])
      setCarregandoOpts(false)
    }
    carregar()
  }, [])

  // ── Submit ───────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) { setErro('O nome do projeto é obrigatório.'); return }
    if (orcamento <= 0) { setErro('O orçamento deve ser maior que zero.'); return }

    setSalvando(true)
    setErro('')

    const supabase = createClient()

    // Pega o municipio_id via RLS (retorna apenas o do usuário logado)
    const { data: municipio } = await supabase
      .from('municipios')
      .select('id')
      .single()

    if (!municipio) {
      setErro('Não foi possível identificar o município. Faça login novamente.')
      setSalvando(false)
      return
    }

    const dados = {
      municipio_id:  municipio.id,
      nome:          nome.trim(),
      descricao:     descricao.trim() || null,
      secretaria_id: secretariaId || null,
      objetivo_id:   objetivoId || null,
      meta_id:       metaId || null,
      status,
      prioridade,
      tipo_ganho:    tipoGanho,
      pct,
      peso,
      data_inicio:   dataInicio || null,
      data_fim:      dataFim || null,
      orcamento,
      executado,
      tags:          tagsTexto ? tagsTexto.split(',').map(t => t.trim()).filter(Boolean) : [],
      bairro:        bairro.trim() || null,
      lat:           lat  !== '' && !isNaN(parseFloat(lat))  ? parseFloat(lat)  : null,
      lng:           lng  !== '' && !isNaN(parseFloat(lng))  ? parseFloat(lng)  : null,
    }

    let erro: string | null = null

    if (editando && projetoInicial?.id) {
      const { error } = await supabase
        .from('projetos')
        .update(dados)
        .eq('id', projetoInicial.id)
      erro = error?.message ?? null
    } else {
      const { error } = await supabase
        .from('projetos')
        .insert(dados)
      erro = error?.message ?? null
    }

    setSalvando(false)

    if (erro) {
      setErro(erro)
    } else {
      onSuccess(editando ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!')
    }
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

      {/* ── Seção 1: Identificação ── */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">
          Identificação
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nome do projeto <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Recapeamento Asfáltico — Zona Sul"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Descrição</label>
            <textarea
              value={descricao ?? ''}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descreva o objetivo, abrangência e impacto esperado..."
              rows={3}
              className={inputCls + ' resize-none'}
            />
          </div>
          <div>
            <label className={labelCls}>Tags <span className="text-xs text-gray-400 font-normal">(separe por vírgula)</span></label>
            <input
              type="text"
              value={tagsTexto}
              onChange={e => setTagsTexto(e.target.value)}
              placeholder="Ex.: Mobilidade, Infraestrutura, Zona Norte"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* ── Seção 2: Classificação ── */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">
          Classificação
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Secretaria responsável</label>
            <select
              value={secretariaId}
              onChange={e => setSecretariaId(e.target.value)}
              disabled={carregandoOpts || !!secretariaTravada}
              className={inputCls + ' bg-white' + (secretariaTravada ? ' opacity-70 cursor-not-allowed' : '')}
            >
              <option value="">— Selecionar secretaria —</option>
              {secretarias
                .filter(s => !secretariasPermitidas || secretariasPermitidas.includes(s.id))
                .map(s => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
            </select>
            {secretariaTravada && (
              <p className="text-xs text-atlia-muted mt-1">Fixado pela sua secretaria.</p>
            )}
            {!secretariaTravada && secretariasPermitidas && secretariasPermitidas.length > 1 && (
              <p className="text-xs text-atlia-muted mt-1">Exibindo apenas as secretarias sob sua gestão.</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Objetivo estratégico <span className="text-xs text-gray-400 font-normal">(opcional)</span></label>
            <select
              value={objetivoId}
              onChange={e => { setObjetivoId(e.target.value); setMetaId('') }}
              disabled={carregandoOpts}
              className={inputCls + ' bg-white'}
            >
              <option value="">— Sem vinculação —</option>
              {objetivos.map(o => (
                <option key={o.id} value={o.id}>{o.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Meta estratégica <span className="text-xs text-gray-400 font-normal">(opcional)</span></label>
            <select
              value={metaId}
              onChange={e => setMetaId(e.target.value)}
              disabled={carregandoOpts || !objetivoId}
              className={inputCls + ' bg-white'}
            >
              <option value="">— Sem vinculação —</option>
              {metas.filter(m => m.objetivo_id === objetivoId).map(m => (
                <option key={m.id} value={m.id}>{m.nome}</option>
              ))}
            </select>
            {!objetivoId && (
              <p className="text-xs text-atlia-muted mt-1">Selecione um objetivo para escolher a meta.</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls + ' bg-white'}>
                {statusOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Prioridade</label>
              <select value={prioridade} onChange={e => setPrioridade(e.target.value)} className={inputCls + ' bg-white'}>
                {prioridadeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tipo de ganho</label>
              <select value={tipoGanho} onChange={e => setTipoGanho(e.target.value)} className={inputCls + ' bg-white'}>
                {tipoGanhoOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* ── Seção 3: Prazos e Progresso ── */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">
          Prazos e Progresso
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Data de início</label>
              <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Prazo de conclusão</label>
              <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>
              Progresso atual:&nbsp;
              <span className="font-bold text-atlia-blue">{pct}%</span>
            </label>
            <input
              type="range"
              min={0} max={100} step={1}
              value={pct}
              onChange={e => setPct(Number(e.target.value))}
              className="w-full accent-atlia-blue"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Peso deste projeto dentro da meta</label>
            <input type="number" min={1} value={peso}
              onChange={e => setPeso(Math.max(1, Number(e.target.value)))}
              className={inputCls} />
            <p className="text-xs text-atlia-muted mt-1">
              Quanto maior o peso, mais este projeto influencia o atingimento da meta vinculada.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* ── Seção 4: Financeiro ── */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">
          Financeiro
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Orçamento total (R$) <span className="text-red-500">*</span></label>
            <input
              type="number"
              min={0}
              step={1000}
              value={orcamento || ''}
              onChange={e => setOrcamento(Number(e.target.value))}
              placeholder="0"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Valor executado (R$)</label>
            <input
              type="number"
              min={0}
              step={1000}
              value={executado || ''}
              onChange={e => setExecutado(Number(e.target.value))}
              placeholder="0"
              className={inputCls}
            />
          </div>
        </div>
        {orcamento > 0 && (
          <p className="text-xs text-atlia-muted mt-2">
            Execução atual: <strong className="text-atlia-blue">
              {Math.round((executado / orcamento) * 100)}%
            </strong> · Saldo: R$ {(orcamento - executado).toLocaleString('pt-BR')}
          </p>
        )}
      </div>

      <div className="border-t border-gray-100" />

      {/* ── Seção 5: Localização ── */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-1">
          Localização <span className="font-normal normal-case text-gray-400">(opcional — exibido no mapa)</span>
        </p>
        <p className="text-xs text-atlia-muted mb-4">
          Abra o Google Maps, clique com o botão direito no local e copie as coordenadas.
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Bairro / Região</label>
            <input
              type="text"
              value={bairro}
              onChange={e => setBairro(e.target.value)}
              placeholder="Ex.: Centro, Zona Norte, Saraiva…"
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Latitude</label>
              <input
                type="text"
                inputMode="decimal"
                value={lat}
                onChange={e => setLat(e.target.value)}
                placeholder="Ex.: -18.9186"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Longitude</label>
              <input
                type="text"
                inputMode="decimal"
                value={lng}
                onChange={e => setLng(e.target.value)}
                placeholder="Ex.: -48.2772"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Erro ── */}
      {erro && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
          {erro}
        </div>
      )}

      {/* ── Rodapé ── */}
      <div className="flex gap-3 pt-2 pb-4">
        <button
          type="button"
          onClick={onCancelar}
          className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={salvando}
          className="flex-1 flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 rounded-lg hover:bg-atlia-blue transition-colors text-sm disabled:opacity-70"
        >
          {salvando
            ? <><Loader2 size={15} className="animate-spin" />Salvando…</>
            : <><Save size={15} />{editando ? 'Salvar alterações' : 'Criar projeto'}</>
          }
        </button>
      </div>
    </form>
  )
}
