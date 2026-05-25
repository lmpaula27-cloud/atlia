import Header from '@/components/Header'
import StatCard from '@/components/ui/StatCard'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { FolderKanban, Target, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

// Dados de exemplo — serão substituídos por dados reais do Supabase
const stats = [
  { title: 'Total de Projetos',   value: 47,  subtitle: 'em carteira',        icon: FolderKanban, iconColor: 'text-atlia-blue'  },
  { title: 'No Prazo',            value: 31,  subtitle: '66% da carteira',     icon: CheckCircle2, iconColor: 'text-atlia-green' },
  { title: 'Requerem Atenção',    value: 10,  subtitle: 'acompanhar de perto', icon: AlertTriangle,iconColor: 'text-yellow-500'  },
  { title: 'Atrasados',           value: 6,   subtitle: 'ação imediata',       icon: Clock,        iconColor: 'text-atlia-red'   },
]

const projetosDestaque = [
  { id: '1', nome: 'Recapeamento Asfáltico — Zona Norte',  secretaria: 'Obras',        status: 'em_andamento', pct: 68, prazo: '30/08/2026' },
  { id: '2', nome: 'UBS Jardim das Palmeiras',             secretaria: 'Saúde',        status: 'atencao',      pct: 32, prazo: '15/06/2026' },
  { id: '3', nome: 'Sistema de Monitoramento Escolar',     secretaria: 'Educação',     status: 'em_andamento', pct: 81, prazo: '15/12/2026' },
  { id: '4', nome: 'Revitalização da Praça Central',       secretaria: 'Urbanismo',    status: 'atrasado',     pct: 15, prazo: '01/04/2026' },
  { id: '5', nome: 'Programa Emprego e Renda 2026',        secretaria: 'Trabalho',     status: 'em_andamento', pct: 55, prazo: '31/12/2026' },
]

const objetivosPrincipais = [
  { titulo: 'Infraestrutura e Mobilidade Urbana',  projetos: 14, concluidos: 4 },
  { titulo: 'Saúde de Qualidade para Todos',       projetos: 11, concluidos: 3 },
  { titulo: 'Educação Inovadora',                  projetos: 9,  concluidos: 5 },
  { titulo: 'Desenvolvimento Econômico',           projetos: 8,  concluidos: 2 },
  { titulo: 'Meio Ambiente e Sustentabilidade',    projetos: 5,  concluidos: 1 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Painel Executivo"
        subtitle="Visão geral da gestão estratégica municipal"
      />

      <div className="p-8 space-y-8">

        {/* Cards de resumo */}
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">

          {/* Projetos em destaque */}
          <div className="col-span-2 card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-atlia-navy">Projetos em Destaque</h2>
              <Link href="/dashboard/projetos" className="text-sm text-atlia-blue hover:underline font-medium">
                Ver todos
              </Link>
            </div>
            <div className="space-y-4">
              {projetosDestaque.map((p) => (
                <div key={p.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.nome}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-atlia-muted">{p.secretaria}</span>
                      <span className="text-xs text-atlia-muted">•</span>
                      <span className="text-xs text-atlia-muted">Prazo: {p.prazo}</span>
                    </div>
                  </div>
                  <div className="w-32 shrink-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-atlia-muted">{p.pct}%</span>
                    </div>
                    <ProgressBar
                      value={p.pct}
                      color={p.status === 'atrasado' ? 'red' : p.status === 'atencao' ? 'yellow' : 'green'}
                    />
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objetivos estratégicos */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-atlia-navy">Eixos Estratégicos</h2>
              <Link href="/dashboard/objetivos" className="text-sm text-atlia-blue hover:underline font-medium">
                Ver todos
              </Link>
            </div>
            <div className="space-y-4">
              {objetivosPrincipais.map((o) => (
                <div key={o.titulo} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 leading-tight">{o.titulo}</p>
                    <span className="text-xs text-atlia-muted ml-2 shrink-0">
                      {o.concluidos}/{o.projetos}
                    </span>
                  </div>
                  <ProgressBar
                    value={o.concluidos}
                    max={o.projetos}
                    color="blue"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-atlia-green" />
                <p className="text-xs text-atlia-muted">
                  <span className="font-semibold text-atlia-green">15 projetos</span> concluídos no total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Semáforo geral */}
        <div className="card">
          <h2 className="font-semibold text-atlia-navy mb-5">Semáforo por Secretaria</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { nome: 'Obras',        verde: 8, amarelo: 2, vermelho: 1 },
              { nome: 'Saúde',        verde: 5, amarelo: 3, vermelho: 2 },
              { nome: 'Educação',     verde: 7, amarelo: 1, vermelho: 0 },
              { nome: 'Urbanismo',    verde: 3, amarelo: 2, vermelho: 2 },
              { nome: 'Trabalho',     verde: 4, amarelo: 1, vermelho: 0 },
            ].map((s) => (
              <div key={s.nome} className="bg-atlia-gray rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-atlia-navy mb-3">{s.nome}</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-atlia-green mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-700">{s.verde}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-atlia-yellow mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-700">{s.amarelo}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-4 h-4 rounded-full bg-atlia-red mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-700">{s.vermelho}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
