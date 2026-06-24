'use client'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import SlidePanel from '@/components/ui/SlidePanel'
import IndicadorForm from '@/components/forms/IndicadorForm'
import Link from 'next/link'
import { Plus, TrendingUp, TrendingDown, Filter, BarChart3, CheckCircle2, AlertTriangle, XCircle, Loader2, Clock } from 'lucide-react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts'
import { createClient } from '@/lib/supabase/client'
import { getStatusLabel } from '@/lib/utils'

const STATUS_ORDEM = ['nao_iniciado', 'em_andamento', 'atencao', 'atrasado', 'concluido']
const STATUS_COR: Record<string, string> = {
  nao_iniciado: '#9CA3AF',
  em_andamento: '#2E75B6',
  atencao:      '#FFC000',
  atrasado:     '#C00000',
  concluido:    '#70AD47',
}

interface ProjetoAnalise {
  id: string
  status: string
  secretaria: string
  data_fim: string | null
}

interface IndicadorUI {
  id: string
  nome: string
  secretaria: string
  unidade: string
  meta: number
  atual: number
  menorMelhor: boolean
  status: string
}

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
  if (unidade === 'R$') return `R$ ${v.toLocaleString('pt-BR')}`
  if (unidade === 'pts') return v.toFixed(1)
  return `${v.toLocaleString('pt-BR')} ${unidade}`
}

function calcPct(atual: number, meta: number, menorMelhor: boolean): number {
  if (menorMelhor) return Math.round((meta / atual) * 100)
  return Math.min(150, Math.round((atual / meta) * 100))
}

function calcStatus(atual: number, meta: number, menorMelhor: boolean): string {
  const pct = calcPct(atual, meta, menorMelhor)
  if (pct >= 100) return 'no_prazo'
  if (pct >= 70)  return 'atencao'
  return 'critico'
}

export default function IndicadoresPage() {
  const [indicadores, setIndicadores] = useState<IndicadorUI[]>([])
  const [carregando, setCarregando]   = useState(true)
  const [filtroSec, setFiltroSec]     = useState('Todas')
  const [formAberto, setFormAberto]   = useState(false)
  const [sucesso, setSucesso]         = useState('')
  const usuario = useCurrentUser()

  const [projetosAnalise, setProjetosAnalise] = useState<ProjetoAnalise[]>([])
  const [carregandoAnalise, setCarregandoAnalise] = useState(true)

  const carregarAnalise = useCallback(async () => {
    setCarregandoAnalise(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('projetos')
      .select('id, status, data_fim, secretarias(nome)')
    setProjetosAnalise((data ?? []).map((p: any) => ({
      id:         p.id,
      status:     p.status,
      secretaria: nomeCurto(p.secretarias?.nome ?? 'Sem secretaria'),
      data_fim:   p.data_fim,
    })))
    setCarregandoAnalise(false)
  }, [])

  useEffect(() => { carregarAnalise() }, [carregarAnalise])

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('indicadores')
      .select('id, nome, unidade, meta, valor_atual, menor_melhor, secretarias(nome)')
      .order('created_at')

    const mapped: IndicadorUI[] = (data ?? []).map((ind: any) => ({
      id:          ind.id,
      nome:        ind.nome,
      secretaria:  nomeCurto(ind.secretarias?.nome ?? ''),
      unidade:     ind.unidade,
      meta:        Number(ind.meta),
      atual:       Number(ind.valor_atual),
      menorMelhor: ind.menor_melhor,
      status:      calcStatus(Number(ind.valor_atual), Number(ind.meta), ind.menor_melhor),
    }))

    setIndicadores(mapped)
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  useEffect(() => {
    if (!sucesso) return
    const t = setTimeout(() => setSucesso(''), 4000)
    return () => clearTimeout(t)
  }, [sucesso])

  const secretariasOpts = ['Todas', ...Array.from(new Set(indicadores.map(i => i.secretaria)))]

  const filtrados = filtroSec === 'Todas'
    ? indicadores
    : indicadores.filter(i => i.secretaria === filtroSec)

  const acimaMeta = filtrados.filter(i => calcPct(i.atual, i.meta, i.menorMelhor) >= 100).length
  const emAtencao = filtrados.filter(i => { const p = calcPct(i.atual, i.meta, i.menorMelhor); return p >= 70 && p < 100 }).length
  const critico   = filtrados.filter(i => calcPct(i.atual, i.meta, i.menorMelhor) < 70).length

  // ── Análise da carteira de projetos ────────────────────────
  const totalProjetosAnalise = projetosAnalise.length

  const porStatus = STATUS_ORDEM.map(st => ({
    status: st,
    nome:   getStatusLabel(st),
    qtd:    projetosAnalise.filter(p => p.status === st).length,
    fill:   STATUS_COR[st],
  }))

  const porSecretaria = Array.from(new Set(projetosAnalise.map(p => p.secretaria)))
    .map(sec => ({ secretaria: sec, qtd: projetosAnalise.filter(p => p.secretaria === sec).length }))
    .sort((a, b) => b.qtd - a.qtd)

  const statusPorSecretaria = porSecretaria.map(({ secretaria }) => {
    const linha: Record<string, any> = { secretaria }
    STATUS_ORDEM.forEach(st => {
      linha[st] = projetosAnalise.filter(p => p.secretaria === secretaria && p.status === st).length
    })
    return linha
  })

  const anoAtual = new Date().getFullYear()
  const porAno = (() => {
    const contagem = new Map<string, number>()
    projetosAnalise.forEach(p => {
      const chave = p.data_fim ? String(new Date(p.data_fim + 'T00:00:00').getFullYear()) : 'Sem previsão'
      contagem.set(chave, (contagem.get(chave) ?? 0) + 1)
    })
    const anos = Array.from(contagem.keys()).filter(k => k !== 'Sem previsão').sort()
    const semPrevisao = contagem.get('Sem previsão')
    const resultado = anos.map(ano => ({ ano, qtd: contagem.get(ano)! }))
    if (semPrevisao) resultado.push({ ano: 'Sem previsão', qtd: semPrevisao })
    return resultado
  })()

  const projetosAtrasados = projetosAnalise.filter(p => p.status === 'atrasado')
  const pctAtrasados = totalProjetosAnalise > 0 ? Math.round((projetosAtrasados.length / totalProjetosAnalise) * 100) : 0
  const atrasadosPorSecretaria = Array.from(new Set(projetosAtrasados.map(p => p.secretaria)))
    .map(sec => ({ secretaria: sec, qtd: projetosAtrasados.filter(p => p.secretaria === sec).length }))
    .sort((a, b) => b.qtd - a.qtd)
    .slice(0, 6)

  const dadosGrafico = filtrados.slice(0, 8).map(i => {
    const pct = calcPct(i.atual, i.meta, i.menorMelhor)
    return {
      nome: i.nome.length > 28 ? i.nome.slice(0, 28) + '…' : i.nome,
      pct,
      fill: pct >= 100 ? '#70AD47' : pct >= 70 ? '#FFC000' : '#C00000',
    }
  })

  return (
    <div className="flex flex-col flex-1">
      <Header title="Indicadores de Desempenho" subtitle="Monitoramento de KPIs estratégicos por secretaria" />

      <div className="p-8 space-y-6">

        {/* Banner de sucesso */}
        {sucesso && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            {sucesso}
          </div>
        )}

        {/* ── Análise da Carteira de Projetos ── */}
        <div>
          <h2 className="font-semibold text-atlia-navy mb-1">Análise da Carteira de Projetos</h2>
          <p className="text-sm text-atlia-muted mb-4">Visão consolidada dos {totalProjetosAnalise} projetos cadastrados</p>
        </div>

        {carregandoAnalise ? (
          <div className="h-32 flex items-center justify-center text-atlia-muted">
            <Loader2 size={20} className="animate-spin opacity-40 mr-2" />
            Carregando…
          </div>
        ) : (
          <div className="space-y-5">

            {/* Linha 1: Projetos por status + Projetos atrasados */}
            <div className="grid grid-cols-3 gap-5">
              <div className="card col-span-2">
                <h3 className="font-semibold text-atlia-navy text-sm mb-4">Projetos por Status</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={porStatus} barSize={40} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                    <Tooltip formatter={(v: number) => [v, 'Projetos']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                    <Bar dataKey="qtd" radius={[4, 4, 0, 0]}>
                      {porStatus.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card border-2 border-red-100 bg-red-50/30 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-atlia-red" />
                  <h3 className="font-semibold text-atlia-red text-sm">Projetos Atrasados</h3>
                </div>
                <p className="text-4xl font-bold text-atlia-red">{projetosAtrasados.length}</p>
                <p className="text-xs text-atlia-muted mb-3">{pctAtrasados}% da carteira total</p>
                <div className="space-y-1.5 flex-1">
                  {atrasadosPorSecretaria.length === 0 ? (
                    <p className="text-xs text-atlia-muted italic">Nenhum projeto atrasado.</p>
                  ) : atrasadosPorSecretaria.map(s => (
                    <div key={s.secretaria} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate mr-2">{s.secretaria}</span>
                      <span className="font-bold text-atlia-red shrink-0">{s.qtd}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Linha 2: Status por Secretaria (stacked) */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-4">Status dos Projetos por Secretaria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusPorSecretaria} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="secretaria" tick={{ fontSize: 10, fill: '#6B7280' }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                  <Legend formatter={(v: string) => getStatusLabel(v)} wrapperStyle={{ fontSize: 12 }} />
                  {STATUS_ORDEM.map(st => (
                    <Bar key={st} dataKey={st} name={st} stackId="a" fill={STATUS_COR[st]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Linha 3: Projetos por Secretaria + Projetos por Data Fim */}
            <div className="grid grid-cols-2 gap-5">
              <div className="card">
                <h3 className="font-semibold text-atlia-navy text-sm mb-4">Projetos por Secretaria</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={porSecretaria} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="secretaria" tick={{ fontSize: 10, fill: '#6B7280' }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                    <Tooltip formatter={(v: number) => [v, 'Projetos']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                    <Bar dataKey="qtd" fill="#2E75B6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3 className="font-semibold text-atlia-navy text-sm mb-4">Projetos por Previsão de Encerramento</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={porAno} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="ano" tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                    <Tooltip formatter={(v: number) => [v, 'Projetos']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
                    <Bar dataKey="qtd" radius={[4, 4, 0, 0]}>
                      {porAno.map((entry, i) => (
                        <Cell key={i} fill={entry.ano === String(anoAtual) ? '#1F3864' : entry.ano === 'Sem previsão' ? '#9CA3AF' : '#538135'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-2" />

        {/* ── KPIs cadastrados manualmente ── */}
        <h2 className="font-semibold text-atlia-navy">Indicadores de Desempenho (KPIs)</h2>

        {/* Resumo + filtro */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle2 size={16} className="text-atlia-green" />
              <div>
                <p className="text-xl font-bold text-atlia-green">{acimaMeta}</p>
                <p className="text-xs text-green-700">Acima da meta</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <AlertTriangle size={16} className="text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-700">{emAtencao}</p>
                <p className="text-xs text-yellow-700">Em atenção</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <XCircle size={16} className="text-atlia-red" />
              <div>
                <p className="text-xl font-bold text-atlia-red">{critico}</p>
                <p className="text-xs text-red-700">Críticos</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-atlia-muted" />
            <select value={filtroSec} onChange={e => setFiltroSec(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none">
              {secretariasOpts.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {(usuario.perfil === 'admin' || usuario.perfil === 'gestor') && (
            <button
              onClick={() => setFormAberto(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={15} />
              Novo Indicador
            </button>
          )}
        </div>

        {/* Gráfico de atingimento */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-atlia-blue" />
            <h3 className="font-semibold text-atlia-navy text-sm">% de Atingimento das Metas</h3>
            <span className="text-xs text-atlia-muted ml-1">(linha = 100% = meta)</span>
          </div>
          {carregando ? (
            <div className="h-32 flex items-center justify-center text-atlia-muted">
              <Loader2 size={20} className="animate-spin opacity-40 mr-2" />
              Carregando…
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dadosGrafico} barSize={28} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="nome" tick={{ fontSize: 10, fill: '#6B7280' }} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 140]} />
                <Tooltip
                  formatter={(v: number) => [`${v}%`, 'Atingimento']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
                />
                <ReferenceLine y={100} stroke="#1F3864" strokeDasharray="4 4" strokeWidth={1.5}
                  label={{ value: 'Meta', position: 'right', fontSize: 10, fill: '#1F3864' }} />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {dadosGrafico.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Cards de indicadores */}
        <div className="grid grid-cols-2 gap-5">
          {filtrados.map((ind) => {
            const pct    = calcPct(ind.atual, ind.meta, ind.menorMelhor)
            const acima  = pct >= 100
            const corBar = pct >= 100 ? 'green' as const : pct >= 70 ? 'yellow' as const : 'red' as const
            return (
              <Link key={ind.id} href={`/dashboard/indicadores/${ind.id}`} className="card hover:shadow-md transition-shadow block">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <p className="font-medium text-gray-800 text-sm leading-tight">{ind.nome}</p>
                    <p className="text-xs text-atlia-muted mt-0.5">{ind.secretaria}</p>
                  </div>
                  <StatusBadge status={ind.status} />
                </div>

                <div className="flex items-end gap-5 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-atlia-navy">
                      {formatValue(ind.atual, ind.unidade)}
                    </p>
                    <p className="text-xs text-atlia-muted">Valor atual</p>
                  </div>
                  <div className="pb-0.5">
                    <p className="text-sm font-medium text-gray-400">
                      Meta: <span className="text-gray-600">{formatValue(ind.meta, ind.unidade)}</span>
                    </p>
                  </div>
                  <div className="ml-auto pb-0.5 flex items-center gap-1">
                    {acima
                      ? <TrendingUp  size={15} className="text-atlia-green" />
                      : <TrendingDown size={15} className="text-atlia-red" />
                    }
                    <span className={`text-sm font-bold ${acima ? 'text-atlia-green' : 'text-atlia-red'}`}>
                      {pct}%
                    </span>
                  </div>
                </div>

                <ProgressBar value={Math.min(pct, 100)} color={corBar} />
              </Link>
            )
          })}
        </div>

      </div>

      {/* Formulário — slide panel */}
      <SlidePanel
        aberto={formAberto}
        titulo="Novo Indicador"
        onFechar={() => setFormAberto(false)}
      >
        <IndicadorForm
          secretariasPermitidas={usuario.perfil === 'gestor' ? usuario.secretaria_ids : undefined}
          onSuccess={(msg) => {
            setFormAberto(false)
            setSucesso(msg)
            carregar()
          }}
          onCancelar={() => setFormAberto(false)}
        />
      </SlidePanel>

    </div>
  )
}
