'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import StatCard from '@/components/ui/StatCard'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { FolderKanban, CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts'
import { createClient } from '@/lib/supabase/client'

// Gráfico de execução orçamentária — histórico ainda não está no banco
const evolucaoMensal = [
  { mes: 'Jan', previsto: 4.2, executado: 3.8 },
  { mes: 'Fev', previsto: 4.5, executado: 4.1 },
  { mes: 'Mar', previsto: 5.0, executado: 4.6 },
  { mes: 'Abr', previsto: 5.2, executado: 4.9 },
  { mes: 'Mai', previsto: 5.8, executado: 5.1 },
  { mes: 'Jun', previsto: 6.0, executado: 5.5 },
]

function nomeCurto(nome: string): string {
  return nome
    .replace('Secretaria Municipal de ', '')
    .replace('Secretaria de ', '')
    .replace('Secretaria do ', '')
    .replace('Secretaria da ', '')
    .split(' e ')[0]
    .trim()
}

function fmtData(d: string | null): string {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

type ProjetoItem = {
  id: string
  nome: string
  secretaria: string
  status: string
  pct: number
  data_fim: string | null
}

type EixoItem = {
  nome: string
  cor: string
  objetivos: { pct_atual: number }[]
}

export default function DashboardPage() {
  const [projetos, setProjetos]     = useState<ProjetoItem[]>([])
  const [eixos, setEixos]           = useState<EixoItem[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const supabase = createClient()

      const [{ data: projData }, { data: eixosData }] = await Promise.all([
        supabase
          .from('projetos')
          .select('id, nome, status, pct, data_fim, secretarias(nome)')
          .order('created_at', { ascending: false }),
        supabase
          .from('eixos')
          .select('nome, cor, ordem, objetivos(pct_atual)')
          .order('ordem'),
      ])

      setProjetos(
        (projData ?? []).map((p: any) => ({
          id:         p.id,
          nome:       p.nome,
          secretaria: nomeCurto(p.secretarias?.nome ?? ''),
          status:     p.status,
          pct:        p.pct,
          data_fim:   p.data_fim,
        }))
      )
      setEixos(eixosData ?? [])
      setCarregando(false)
    }
    carregar()
  }, [])

  // ── Estatísticas ─────────────────────────────────────────────
  const total     = projetos.length
  const noPrazo   = projetos.filter(p => p.status === 'em_andamento' || p.status === 'concluido').length
  const atencao   = projetos.filter(p => p.status === 'atencao').length
  const atrasados = projetos.filter(p => p.status === 'atrasado').length

  const stats = [
    { title: 'Total de Projetos', value: total,     subtitle: 'em carteira',          icon: FolderKanban,  iconColor: 'text-atlia-blue'  },
    { title: 'No Prazo',          value: noPrazo,   subtitle: total > 0 ? `${Math.round(noPrazo / total * 100)}% da carteira` : '—', icon: CheckCircle2, iconColor: 'text-atlia-green' },
    { title: 'Requerem Atenção',  value: atencao,   subtitle: 'acompanhar de perto',  icon: AlertTriangle, iconColor: 'text-yellow-500'  },
    { title: 'Atrasados',         value: atrasados, subtitle: 'ação imediata',         icon: Clock,         iconColor: 'text-atlia-red'   },
  ]

  // ── Projetos em destaque: mais críticos primeiro ──────────────
  const ordemStatus: Record<string, number> = { atrasado: 0, atencao: 1, em_andamento: 2, nao_iniciado: 3, concluido: 4 }
  const projetosDestaque = [...projetos]
    .sort((a, b) => (ordemStatus[a.status] ?? 5) - (ordemStatus[b.status] ?? 5))
    .slice(0, 5)

  // ── Eixos: média dos objetivos ───────────────────────────────
  const eixosProgresso = eixos.map(e => {
    const objs   = e.objetivos ?? []
    const media  = objs.length > 0 ? Math.round(objs.reduce((s, o) => s + o.pct_atual, 0) / objs.length) : 0
    return { titulo: e.nome, atingimento: media, cor: e.cor }
  })
  const mediaGeral = eixosProgresso.length > 0
    ? Math.round(eixosProgresso.reduce((s, e) => s + e.atingimento, 0) / eixosProgresso.length)
    : 0

  // ── Semáforo por secretaria ───────────────────────────────────
  const secMap = new Map<string, { verde: number; amarelo: number; vermelho: number }>()
  projetos.forEach(p => {
    if (!secMap.has(p.secretaria)) secMap.set(p.secretaria, { verde: 0, amarelo: 0, vermelho: 0 })
    const s = secMap.get(p.secretaria)!
    if (p.status === 'atrasado')   s.vermelho++
    else if (p.status === 'atencao') s.amarelo++
    else                             s.verde++
  })
  const semaforo = Array.from(secMap.entries())
    .map(([nome, s]) => ({ nome, ...s, total: s.verde + s.amarelo + s.vermelho }))
    .filter(s => s.total > 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Painel Executivo"
        subtitle="Visão geral da gestão estratégica municipal"
      />

      <div className="p-8 space-y-6">

        {/* Cards de resumo */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s) => <StatCard key={s.title} {...s} />)}
        </div>

        {/* Projetos + Eixos */}
        <div className="grid grid-cols-3 gap-5">

          {/* Projetos em destaque */}
          <div className="col-span-2 card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-atlia-navy">Projetos em Destaque</h2>
              <Link href="/dashboard/projetos" className="text-sm text-atlia-blue hover:underline font-medium">Ver todos</Link>
            </div>
            {carregando ? (
              <div className="h-32 flex items-center justify-center text-atlia-muted text-sm">Carregando…</div>
            ) : (
              <div className="space-y-0 divide-y divide-gray-50">
                {projetosDestaque.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.nome}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-atlia-muted">{p.secretaria}</span>
                        <span className="text-xs text-atlia-muted">·</span>
                        <span className="text-xs text-atlia-muted">Prazo: {fmtData(p.data_fim)}</span>
                      </div>
                    </div>
                    <div className="w-28 shrink-0">
                      <div className="flex justify-between text-xs text-atlia-muted mb-1">
                        <span>{p.pct}%</span>
                      </div>
                      <ProgressBar
                        value={p.pct}
                        color={p.status === 'atrasado' ? 'red' : p.status === 'atencao' ? 'yellow' : 'green'}
                      />
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Eixos estratégicos */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-atlia-navy">Eixos Estratégicos</h2>
              <Link href="/dashboard/mapa-estrategico" className="text-sm text-atlia-blue hover:underline font-medium">Ver mapa</Link>
            </div>
            <div className="space-y-4">
              {(carregando ? [] : eixosProgresso).map((e) => (
                <div key={e.titulo} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 leading-tight truncate mr-2">{e.titulo}</p>
                    <span className="text-sm font-bold shrink-0" style={{ color: e.cor }}>{e.atingimento}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${e.atingimento}%`, backgroundColor: e.cor }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
              <TrendingUp size={15} className="text-atlia-green" />
              <p className="text-xs text-atlia-muted">
                Atingimento médio: <span className="font-semibold text-atlia-navy">{mediaGeral}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-2 gap-5">

          {/* Execução orçamentária */}
          <div className="card">
            <h2 className="font-semibold text-atlia-navy mb-4">Execução Orçamentária Mensal (R$ mi)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={evolucaoMensal} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[3, 7]} />
                <Tooltip
                  formatter={(v: number, name: string) => [`R$ ${v.toFixed(1)}mi`, name === 'previsto' ? 'Previsto' : 'Executado']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
                />
                <Legend formatter={(v) => v === 'previsto' ? 'Previsto' : 'Executado'} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="previsto"  stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 4" dot={false} />
                <Line type="monotone" dataKey="executado" stroke="#2E75B6" strokeWidth={2.5} dot={{ r: 4, fill: '#2E75B6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Semáforo por secretaria */}
          <div className="card">
            <h2 className="font-semibold text-atlia-navy mb-4">Semáforo por Secretaria</h2>
            <div className="space-y-3">
              {(carregando ? [] : semaforo).map((s) => (
                <div key={s.nome} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-28 shrink-0 truncate">{s.nome}</span>
                  <div className="flex-1 flex rounded-full overflow-hidden h-5">
                    {s.verde > 0 && (
                      <div className="flex items-center justify-center text-xs font-bold text-white"
                        style={{ width: `${(s.verde / s.total) * 100}%`, backgroundColor: '#70AD47' }}>
                        {s.verde}
                      </div>
                    )}
                    {s.amarelo > 0 && (
                      <div className="flex items-center justify-center text-xs font-bold text-white"
                        style={{ width: `${(s.amarelo / s.total) * 100}%`, backgroundColor: '#FFC000' }}>
                        {s.amarelo}
                      </div>
                    )}
                    {s.vermelho > 0 && (
                      <div className="flex items-center justify-center text-xs font-bold text-white"
                        style={{ width: `${(s.vermelho / s.total) * 100}%`, backgroundColor: '#C00000' }}>
                        {s.vermelho}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-atlia-muted w-8 text-right">{s.total}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              {[{ cor: '#70AD47', label: 'No prazo' }, { cor: '#FFC000', label: 'Atenção' }, { cor: '#C00000', label: 'Atrasado' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.cor }} />
                  <span className="text-xs text-atlia-muted">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
