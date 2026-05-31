'use client'
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

const stats = [
  { title: 'Total de Projetos',  value: 47, subtitle: 'em carteira',        icon: FolderKanban,  iconColor: 'text-atlia-blue'  },
  { title: 'No Prazo',           value: 31, subtitle: '66% da carteira',     icon: CheckCircle2,  iconColor: 'text-atlia-green' },
  { title: 'Requerem Atenção',   value: 10, subtitle: 'acompanhar de perto', icon: AlertTriangle, iconColor: 'text-yellow-500'  },
  { title: 'Atrasados',          value: 6,  subtitle: 'ação imediata',       icon: Clock,         iconColor: 'text-atlia-red'   },
]

const projetosDestaque = [
  { id:'1', nome:'Recapeamento Asfáltico — Zona Norte', secretaria:'Obras',     status:'em_andamento', pct:68, prazo:'30/08/2026' },
  { id:'2', nome:'UBS Jardim das Palmeiras',            secretaria:'Saúde',     status:'atencao',      pct:32, prazo:'15/06/2026' },
  { id:'3', nome:'Sistema de Monitoramento Escolar',    secretaria:'Educação',  status:'em_andamento', pct:81, prazo:'15/12/2026' },
  { id:'4', nome:'Revitalização da Praça Central',      secretaria:'Urbanismo', status:'atrasado',     pct:15, prazo:'01/04/2026' },
  { id:'5', nome:'Programa Emprego e Renda 2026',       secretaria:'Trabalho',  status:'em_andamento', pct:55, prazo:'31/12/2026' },
]

const eixosProgresso = [
  { titulo: 'Uberlândia Sustentável', atingimento: 44, projetos: 218, cor: '#1F3864' },
  { titulo: 'Vida em Uberlândia',     atingimento: 56, projetos: 194, cor: '#2E75B6' },
  { titulo: 'Espaço Uberlândia',      atingimento: 51, projetos: 119, cor: '#C07B00' },
  { titulo: 'Uberlândia Humana',      atingimento: 38, projetos:  99, cor: '#538135' },
]

// Evolução mensal — execução orçamentária (R$ milhões)
const evolucaoMensal = [
  { mes: 'Jan', previsto: 4.2, executado: 3.8 },
  { mes: 'Fev', previsto: 4.5, executado: 4.1 },
  { mes: 'Mar', previsto: 5.0, executado: 4.6 },
  { mes: 'Abr', previsto: 5.2, executado: 4.9 },
  { mes: 'Mai', previsto: 5.8, executado: 5.1 },
  { mes: 'Jun', previsto: 6.0, executado: 5.5 },
]

// Projetos por status
const porStatus = [
  { name: 'Em andamento', value: 31, fill: '#70AD47' },
  { name: 'Atenção',      value: 10, fill: '#FFC000' },
  { name: 'Atrasado',     value: 6,  fill: '#C00000' },
  { name: 'Não iniciado', value: 4,  fill: '#9CA3AF' },
]

export default function DashboardPage() {
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
            <div className="space-y-0 divide-y divide-gray-50">
              {projetosDestaque.map((p) => (
                <div key={p.id} className="flex items-center gap-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.nome}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-atlia-muted">{p.secretaria}</span>
                      <span className="text-xs text-atlia-muted">·</span>
                      <span className="text-xs text-atlia-muted">Prazo: {p.prazo}</span>
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
          </div>

          {/* Eixos estratégicos */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-atlia-navy">Eixos Estratégicos</h2>
              <Link href="/dashboard/mapa-estrategico" className="text-sm text-atlia-blue hover:underline font-medium">Ver mapa</Link>
            </div>
            <div className="space-y-4">
              {eixosProgresso.map((e) => (
                <div key={e.titulo} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 leading-tight truncate mr-2">{e.titulo}</p>
                    <span className="text-sm font-bold shrink-0" style={{ color: e.cor }}>{e.atingimento}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${e.atingimento}%`, backgroundColor: e.cor }} />
                  </div>
                  <p className="text-xs text-atlia-muted">{e.projetos} projetos</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
              <TrendingUp size={15} className="text-atlia-green" />
              <p className="text-xs text-atlia-muted">
                Atingimento médio: <span className="font-semibold text-atlia-navy">47%</span>
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
              {[
                { nome: 'Obras',        verde: 8, amarelo: 2, vermelho: 1, total: 11 },
                { nome: 'Saúde',        verde: 5, amarelo: 3, vermelho: 2, total: 10 },
                { nome: 'Educação',     verde: 7, amarelo: 1, vermelho: 0, total: 8  },
                { nome: 'Urbanismo',    verde: 3, amarelo: 2, vermelho: 2, total: 7  },
                { nome: 'Trabalho',     verde: 4, amarelo: 1, vermelho: 0, total: 5  },
              ].map((s) => (
                <div key={s.nome} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-24 shrink-0">{s.nome}</span>
                  <div className="flex-1 flex rounded-full overflow-hidden h-5">
                    <div className="flex items-center justify-center text-xs font-bold text-white"
                      style={{ width: `${(s.verde / s.total) * 100}%`, backgroundColor: '#70AD47' }}>
                      {s.verde > 0 && s.verde}
                    </div>
                    <div className="flex items-center justify-center text-xs font-bold text-white"
                      style={{ width: `${(s.amarelo / s.total) * 100}%`, backgroundColor: '#FFC000' }}>
                      {s.amarelo > 0 && s.amarelo}
                    </div>
                    <div className="flex items-center justify-center text-xs font-bold text-white"
                      style={{ width: `${(s.vermelho / s.total) * 100}%`, backgroundColor: '#C00000' }}>
                      {s.vermelho > 0 && s.vermelho}
                    </div>
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
