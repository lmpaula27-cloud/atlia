'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProgressBar from '@/components/ui/ProgressBar'
import StatusBadge from '@/components/ui/StatusBadge'
import SlidePanel from '@/components/ui/SlidePanel'
import IndicadorForm from '@/components/forms/IndicadorForm'
import MedicaoForm, { type MedicaoEditavel } from '@/components/forms/MedicaoForm'
import { createClient } from '@/lib/supabase/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  ArrowLeft, CheckCircle2, TrendingUp, TrendingDown,
  Plus, Pencil, Trash2, Loader2,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts'

const MESES_CURTOS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function nomeCurto(nome: string): string {
  return nome
    .replace('Secretaria Municipal de ', '')
    .replace('Secretaria de ', '')
    .replace('Secretaria do ', '')
    .replace('Secretaria da ', '')
    .split(' e ')[0]
    .trim()
}

function formatValue(v: number, unidade: string) {
  if (unidade === 'R$') return `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  if (unidade === 'pts') return v.toFixed(1)
  return `${v.toLocaleString('pt-BR')} ${unidade}`
}

function calcPct(atual: number, meta: number, menorMelhor: boolean): number {
  if (meta === 0) return 0
  if (menorMelhor) return Math.round((meta / atual) * 100)
  return Math.min(150, Math.round((atual / meta) * 100))
}

function calcStatus(atual: number, meta: number, menorMelhor: boolean): string {
  const pct = calcPct(atual, meta, menorMelhor)
  if (pct >= 100) return 'no_prazo'
  if (pct >= 70)  return 'atencao'
  return 'critico'
}

export default function IndicadorDetalhePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const usuario = useCurrentUser()

  const [indicador, setIndicador]   = useState<any>(null)
  const [medicoes, setMedicoes]     = useState<any[]>([])
  const [carregando, setCarregando] = useState(true)
  const [naoEncontrado, setNaoEncontrado] = useState(false)
  const [sucesso, setSucesso]       = useState('')

  const [editAberto, setEditAberto] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deletando, setDeletando]   = useState(false)

  const [medicaoAberto, setMedicaoAberto] = useState(false)
  const [medicaoEditando, setMedicaoEditando] = useState<MedicaoEditavel | undefined>()
  const [confirmDeleteMedicao, setConfirmDeleteMedicao] = useState<string | null>(null)
  const [deletandoMedicao, setDeletandoMedicao] = useState(false)

  const podeEditar = !usuario.carregando && indicador && (
    usuario.perfil === 'admin' ||
    (usuario.perfil === 'gestor' && usuario.secretaria_ids.includes(indicador.secretaria_id))
  )
  const podeExcluir = !usuario.carregando && usuario.perfil === 'admin'

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()
    const [{ data: ind, error }, { data: med }] = await Promise.all([
      supabase
        .from('indicadores')
        .select('*, secretarias(nome)')
        .eq('id', params.id)
        .single(),
      supabase
        .from('medicoes_indicadores')
        .select('id, mes, ano, valor')
        .eq('indicador_id', params.id)
        .order('ano')
        .order('mes'),
    ])

    if (error || !ind) {
      setNaoEncontrado(true)
    } else {
      setIndicador(ind)
      setMedicoes(med ?? [])
    }
    setCarregando(false)
  }, [params.id])

  useEffect(() => { carregar() }, [carregar])

  useEffect(() => {
    if (!sucesso) return
    const t = setTimeout(() => setSucesso(''), 4000)
    return () => clearTimeout(t)
  }, [sucesso])

  async function handleDeleteIndicador() {
    setDeletando(true)
    const supabase = createClient()
    const { error } = await supabase.from('indicadores').delete().eq('id', params.id)
    if (error) { setDeletando(false); return }
    router.push('/dashboard/indicadores')
  }

  async function handleDeleteMedicao(medicaoId: string) {
    setDeletandoMedicao(true)
    const supabase = createClient()
    await supabase.from('medicoes_indicadores').delete().eq('id', medicaoId)
    setConfirmDeleteMedicao(null)
    setDeletandoMedicao(false)
    setSucesso('Medição excluída.')
    carregar()
  }

  // ── Estado de carregamento ─────────────────────────────────────
  if (carregando) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-atlia-muted">
        <Loader2 size={28} className="animate-spin mb-2 opacity-40" />
        <p className="text-sm">Carregando indicador…</p>
      </div>
    )
  }

  if (naoEncontrado || !indicador) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-atlia-muted">
        <p className="text-lg font-semibold">Indicador não encontrado</p>
        <Link href="/dashboard/indicadores" className="mt-3 text-sm text-atlia-blue hover:underline">
          ← Voltar para Indicadores
        </Link>
      </div>
    )
  }

  // ── Dados derivados ────────────────────────────────────────────
  const meta        = Number(indicador.meta)
  const atual       = Number(indicador.valor_atual)
  const menorMelhor = indicador.menor_melhor
  const pct         = calcPct(atual, meta, menorMelhor)
  const status      = calcStatus(atual, meta, menorMelhor)
  const acima       = pct >= 100
  const secretaria  = nomeCurto(indicador.secretarias?.nome ?? '')
  const corBar      = pct >= 100 ? 'green' as const : pct >= 70 ? 'yellow' as const : 'red' as const

  // Dados do gráfico: medicoes ordenadas por ano+mes
  const dadosGrafico = medicoes.map(m => ({
    label: `${MESES_CURTOS[m.mes - 1]}/${String(m.ano).slice(2)}`,
    valor: Number(m.valor),
    meta,
  }))

  // Agrupar por ano para a tabela
  const anosDisponiveis = Array.from(new Set(medicoes.map((m: any) => m.ano as number))).sort((a, b) => b - a)

  // Indicador para o form de edição
  const indicadorEditavel = {
    id:             indicador.id,
    nome:           indicador.nome,
    secretaria_id:  indicador.secretaria_id,
    unidade:        indicador.unidade,
    meta,
    valor_atual:    atual,
    menor_melhor:   menorMelhor,
    ano_referencia: indicador.ano_referencia ?? new Date().getFullYear(),
  }

  return (
    <div className="flex flex-col flex-1">

      {/* ── Header ── */}
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-start gap-4">
        <Link
          href="/dashboard/indicadores"
          className="flex items-center gap-1.5 text-atlia-muted hover:text-atlia-navy text-sm font-medium transition-colors mt-0.5"
        >
          <ArrowLeft size={16} />
          Indicadores
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-atlia-navy leading-tight">{indicador.nome}</h1>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-atlia-muted mt-1">{secretaria}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {podeEditar && (
            <button
              onClick={() => setEditAberto(true)}
              className="flex items-center gap-2 border border-atlia-blue text-atlia-blue font-medium py-2 px-3.5 rounded-lg hover:bg-atlia-blue/5 transition-colors text-sm"
            >
              <Pencil size={14} />
              Editar
            </button>
          )}
          {podeExcluir && (
            !confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 border border-gray-200 text-gray-500 font-medium py-2 px-3.5 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors text-sm"
              >
                <Trash2 size={14} />
                Excluir
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600 font-medium">Tem certeza?</span>
                <button
                  onClick={handleDeleteIndicador}
                  disabled={deletando}
                  className="flex items-center gap-1.5 bg-red-600 text-white font-medium py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-xs disabled:opacity-70"
                >
                  {deletando ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  Excluir definitivamente
                </button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500 py-2 px-2">
                  Cancelar
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">

        {sucesso && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            {sucesso}
          </div>
        )}

        {/* Cards de resumo */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Valor atual',    value: formatValue(atual, indicador.unidade), color: 'text-atlia-navy'  },
            { label: 'Meta',           value: formatValue(meta,  indicador.unidade), color: 'text-gray-500'   },
            { label: 'Atingimento',    value: `${pct}%`, color: acima ? 'text-atlia-green' : pct >= 70 ? 'text-yellow-600' : 'text-atlia-red' },
            { label: 'Medições',       value: medicoes.length.toString(), color: 'text-atlia-blue' },
          ].map(s => (
            <div key={s.label} className="card py-4 px-5">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-atlia-muted mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* ── Coluna principal: gráfico + tabela ── */}
          <div className="col-span-2 space-y-6">

            {/* Gráfico de evolução */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-4">Evolução Mensal</h2>
              {dadosGrafico.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-atlia-muted">
                  <p className="text-sm">Nenhuma medição registrada ainda.</p>
                  {podeEditar && (
                    <button
                      onClick={() => { setMedicaoEditando(undefined); setMedicaoAberto(true) }}
                      className="mt-3 text-sm text-atlia-blue hover:underline font-medium"
                    >
                      + Registrar primeira medição
                    </button>
                  )}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={dadosGrafico} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} width={52}
                      tickFormatter={v => indicador.unidade === 'R$' ? `R$${(v/1000).toFixed(0)}k` : String(v)} />
                    <Tooltip
                      formatter={(v: number, name: string) => [
                        formatValue(v, indicador.unidade),
                        name === 'valor' ? 'Medido' : 'Meta',
                      ]}
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
                    />
                    <Legend formatter={(v) => v === 'valor' ? 'Medido' : 'Meta'} wrapperStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={meta} stroke="#9CA3AF" strokeDasharray="5 4" strokeWidth={1.5} />
                    <Line
                      type="monotone" dataKey="valor" name="valor"
                      stroke="#2E75B6" strokeWidth={2.5}
                      dot={{ r: 4, fill: '#2E75B6' }} activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Tabela de medições */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-atlia-navy text-sm">
                  Histórico de Medições
                  <span className="ml-2 text-xs font-normal text-atlia-muted">({medicoes.length})</span>
                </h2>
                {podeEditar && (
                  <button
                    onClick={() => { setMedicaoEditando(undefined); setMedicaoAberto(true) }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-atlia-blue border border-atlia-blue/30 rounded-lg px-3 py-1.5 hover:bg-atlia-blue/5 transition-colors"
                  >
                    <Plus size={13} />
                    Nova medição
                  </button>
                )}
              </div>

              {medicoes.length === 0 ? (
                <p className="text-sm text-atlia-muted text-center py-8 italic">
                  Nenhuma medição registrada.
                </p>
              ) : (
                <div className="space-y-0 divide-y divide-gray-50">
                  {[...medicoes].reverse().map((m) => (
                    <div key={m.id} className="flex items-center gap-4 py-3">
                      <div className="w-20 shrink-0">
                        <p className="text-sm font-semibold text-gray-800">
                          {MESES_CURTOS[m.mes - 1]}/{m.ano}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-atlia-navy">{formatValue(Number(m.valor), indicador.unidade)}</p>
                      </div>
                      <div className="w-24 shrink-0">
                        <ProgressBar
                          value={Math.min(calcPct(Number(m.valor), meta, menorMelhor), 100)}
                          color={calcPct(Number(m.valor), meta, menorMelhor) >= 100 ? 'green' : calcPct(Number(m.valor), meta, menorMelhor) >= 70 ? 'yellow' : 'red'}
                        />
                      </div>
                      <div className="w-10 text-right shrink-0">
                        <span className="text-xs font-semibold text-atlia-muted">
                          {calcPct(Number(m.valor), meta, menorMelhor)}%
                        </span>
                      </div>
                      {podeEditar && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setMedicaoEditando({ id: m.id, mes: m.mes, ano: m.ano, valor: Number(m.valor) })
                              setMedicaoAberto(true)
                            }}
                            className="p-1 rounded hover:bg-black/5 text-gray-400 hover:text-atlia-blue transition-colors"
                            title="Editar"
                          >
                            <Pencil size={13} />
                          </button>
                          {confirmDeleteMedicao === m.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDeleteMedicao(m.id)}
                                disabled={deletandoMedicao}
                                className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                              >
                                {deletandoMedicao ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteMedicao(null)}
                                className="p-1 text-gray-400 text-xs"
                              >✕</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteMedicao(m.id)}
                              className="p-1 rounded hover:bg-black/5 text-gray-400 hover:text-red-500 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ── Coluna lateral ── */}
          <div className="space-y-5">

            {/* Detalhes */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Detalhes</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-atlia-muted">Unidade de medida</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{indicador.unidade}</p>
                </div>
                <div>
                  <p className="text-xs text-atlia-muted">Critério</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">
                    {menorMelhor ? 'Menor é melhor' : 'Maior é melhor'}
                  </p>
                </div>
                {indicador.descricao && (
                  <div>
                    <p className="text-xs text-atlia-muted">Descrição</p>
                    <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{indicador.descricao}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Atingimento visual */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Atingimento da Meta</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold" style={{ color: acima ? '#70AD47' : pct >= 70 ? '#FFC000' : '#C00000' }}>
                  {pct}%
                </span>
                {acima
                  ? <TrendingUp  size={20} className="text-atlia-green" />
                  : <TrendingDown size={20} className="text-atlia-red" />
                }
              </div>
              <ProgressBar value={Math.min(pct, 100)} color={corBar} />
              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-base font-bold text-atlia-navy">{formatValue(atual, indicador.unidade)}</p>
                  <p className="text-xs text-atlia-muted">Atual</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-400">{formatValue(meta, indicador.unidade)}</p>
                  <p className="text-xs text-atlia-muted">Meta</p>
                </div>
              </div>
            </div>

            {/* Resumo por ano */}
            {anosDisponiveis.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-atlia-navy text-sm mb-3">Medições por Ano</h3>
                <div className="space-y-2">
                  {anosDisponiveis.map(ano => {
                    const doAno = medicoes.filter(m => m.ano === ano)
                    return (
                      <div key={ano} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{ano}</span>
                        <span className="text-xs text-atlia-muted">{doAno.length} medição{doAno.length !== 1 ? 'ões' : ''}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* SlidePanel de medição */}
      <SlidePanel
        aberto={medicaoAberto}
        titulo={medicaoEditando?.id ? 'Editar Medição' : 'Nova Medição'}
        onFechar={() => { setMedicaoAberto(false); setMedicaoEditando(undefined) }}
      >
        <MedicaoForm
          medicaoInicial={medicaoEditando}
          indicadorId={params.id}
          onSuccess={(msg) => {
            setMedicaoAberto(false)
            setMedicaoEditando(undefined)
            setSucesso(msg)
            carregar()
          }}
          onCancelar={() => { setMedicaoAberto(false); setMedicaoEditando(undefined) }}
        />
      </SlidePanel>

      {/* SlidePanel de edição do indicador */}
      <SlidePanel
        aberto={editAberto}
        titulo="Editar Indicador"
        onFechar={() => setEditAberto(false)}
      >
        <IndicadorForm
          indicadorInicial={indicadorEditavel}
          secretariasPermitidas={usuario.perfil === 'gestor' ? usuario.secretaria_ids : undefined}
          onSuccess={(msg) => {
            setEditAberto(false)
            setSucesso(msg)
            carregar()
          }}
          onCancelar={() => setEditAberto(false)}
        />
      </SlidePanel>

    </div>
  )
}
