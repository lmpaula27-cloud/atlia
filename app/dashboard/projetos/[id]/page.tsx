'use client'
import { notFound, useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import StatusBadge from '@/components/ui/StatusBadge'
import { getProjetoById } from '@/lib/data-projetos'
import { formatCurrency } from '@/lib/utils'
import {
  ArrowLeft, CheckCircle2, Circle, Clock, AlertTriangle,
  MapPin, User, Calendar, Tag, Target, Layers,
  TrendingUp, FileText, Building2,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'

const prioridadeStyle: Record<string, string> = {
  alta:  'bg-red-50 text-red-600 border-red-200',
  media: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  baixa: 'bg-gray-50 text-gray-500 border-gray-200',
}
const prioridadeLabel: Record<string, string> = {
  alta: 'Alta', media: 'Média', baixa: 'Baixa',
}

const tipoGanhoStyle: Record<string, string> = {
  'N/A':         'bg-gray-100 text-gray-500 border-gray-200',
  'Operacional': 'bg-blue-50 text-blue-700 border-blue-200',
  'Financeiro':  'bg-green-50 text-green-700 border-green-200',
  'Econômico':   'bg-amber-50 text-amber-700 border-amber-200',
}

const marcoIcon = {
  concluido:    <CheckCircle2 size={18} className="text-atlia-green" />,
  em_andamento: <Clock        size={18} className="text-atlia-blue"  />,
  pendente:     <Circle       size={18} className="text-gray-300"    />,
  atrasado:     <AlertTriangle size={18} className="text-atlia-red"  />,
}

const marcoLinhaStyle: Record<string, string> = {
  concluido:    'border-atlia-green bg-green-50',
  em_andamento: 'border-atlia-blue  bg-blue-50',
  pendente:     'border-gray-200    bg-white',
  atrasado:     'border-atlia-red   bg-red-50',
}

function corBarra(status: string) {
  if (status === 'atrasado') return '#C00000'
  if (status === 'atencao')  return '#FFC000'
  return '#70AD47'
}

export default function ProjetoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const projeto = getProjetoById(id)
  if (!projeto) notFound()

  const pctExecucao = Math.round((projeto.executado / projeto.orcamento) * 100)
  const saldo = projeto.orcamento - projeto.executado

  const dadosOrc = [
    { name: 'Orçado',    valor: projeto.orcamento, fill: '#D6E4F0' },
    { name: 'Executado', valor: projeto.executado, fill: corBarra(projeto.status) },
    { name: 'Saldo',     valor: saldo,              fill: '#E5E7EB' },
  ]

  return (
    <div className="flex flex-col flex-1">
      {/* Header customizado */}
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-start gap-4">
        <Link
          href="/dashboard/projetos"
          className="flex items-center gap-1.5 text-atlia-muted hover:text-atlia-navy text-sm font-medium transition-colors mt-0.5"
        >
          <ArrowLeft size={16} />
          Projetos
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-atlia-navy leading-tight">{projeto.nome}</h1>
            <StatusBadge status={projeto.status} />
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${prioridadeStyle[projeto.prioridade]}`}>
              {prioridadeLabel[projeto.prioridade]} prioridade
            </span>
          </div>
          <p className="text-sm text-atlia-muted mt-1">{projeto.secretaria} · Responsável: {projeto.responsavel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <FileText size={15} />
            Gerar PDF
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">

        {/* Cards de resumo */}
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              label: 'Progresso geral',
              value: `${projeto.pct}%`,
              sub: `${projeto.marcos.filter(m => m.status === 'concluido').length} de ${projeto.marcos.length} marcos concluídos`,
              color: projeto.pct >= 70 ? 'text-atlia-green' : projeto.pct >= 40 ? 'text-atlia-blue' : 'text-atlia-red',
            },
            {
              label: 'Orçamento',
              value: formatCurrency(projeto.orcamento),
              sub: `${formatCurrency(projeto.executado)} executado (${pctExecucao}%)`,
              color: 'text-atlia-navy',
            },
            {
              label: 'Prazo',
              value: projeto.dataFim,
              sub: `Início: ${projeto.dataInicio}`,
              color: projeto.status === 'atrasado' ? 'text-atlia-red' : 'text-atlia-navy',
            },
            {
              label: 'Tipo de Ganho',
              value: projeto.tipoGanho,
              sub: projeto.secretaria,
              color: 'text-atlia-blue',
            },
          ].map(s => (
            <div key={s.label} className="card py-4 px-5">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-atlia-muted mt-1 font-medium">{s.label}</p>
              <p className="text-xs text-atlia-muted mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* COLUNA PRINCIPAL — Descrição + Marcos */}
          <div className="col-span-2 space-y-6">

            {/* Descrição */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-2">Descrição do Projeto</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{projeto.descricao}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {projeto.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-atlia-light text-atlia-navy px-2.5 py-1 rounded-full font-medium">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Barra de progresso geral */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-atlia-navy text-sm">Progresso Geral</h2>
                <span className="font-bold text-lg" style={{ color: corBarra(projeto.status) }}>{projeto.pct}%</span>
              </div>
              <ProgressBar
                value={projeto.pct}
                color={projeto.status === 'atrasado' ? 'red' : projeto.status === 'atencao' ? 'yellow' : 'green'}
              />
              <div className="flex justify-between text-xs text-atlia-muted mt-2">
                <span>Início: {projeto.dataInicio}</span>
                <span>Prazo: {projeto.dataFim}</span>
              </div>
            </div>

            {/* Marcos / Timeline */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-5">Marcos do Projeto</h2>
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-gray-100" />

                <div className="space-y-3">
                  {projeto.marcos.map((marco, i) => (
                    <div key={marco.id} className="relative flex gap-4">
                      {/* Ícone */}
                      <div className="relative z-10 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center shrink-0
                        shadow-sm"
                        style={{ borderColor: marco.status === 'concluido' ? '#70AD47' : marco.status === 'em_andamento' ? '#2E75B6' : marco.status === 'atrasado' ? '#C00000' : '#E5E7EB' }}
                      >
                        {marcoIcon[marco.status]}
                      </div>

                      {/* Conteúdo */}
                      <div className={`flex-1 rounded-xl border p-3.5 mb-1 ${marcoLinhaStyle[marco.status]}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-bold text-atlia-muted">{marco.id}</span>
                            <h4 className="font-semibold text-gray-800 text-sm leading-snug">{marco.titulo}</h4>
                            <p className="text-xs text-atlia-muted mt-0.5 leading-relaxed">{marco.descricao}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {marco.data_conclusao
                              ? <p className="text-xs text-atlia-green font-semibold">✓ {marco.data_conclusao}</p>
                              : <p className="text-xs text-atlia-muted">{marco.data_prevista}</p>
                            }
                            {marco.status !== 'concluido' && marco.status !== 'pendente' && (
                              <p className="text-xs font-bold mt-1" style={{ color: corBarra(marco.status) }}>{marco.pct}%</p>
                            )}
                          </div>
                        </div>
                        {(marco.status === 'em_andamento' || marco.status === 'atrasado') && (
                          <div className="mt-2.5">
                            <ProgressBar
                              value={marco.pct}
                              color={marco.status === 'atrasado' ? 'red' : 'blue'}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-4">Histórico de Atividades</h2>
              <div className="space-y-3">
                {[...projeto.historico].reverse().map((h, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-xs text-atlia-muted w-24 shrink-0 pt-0.5">{h.data}</span>
                    <div className="flex-1 border-l border-gray-100 pl-3">
                      <p className="font-medium text-gray-700">{h.acao}</p>
                      {h.detalhe && <p className="text-xs text-atlia-muted mt-0.5">{h.detalhe}</p>}
                      <p className="text-xs text-atlia-muted mt-0.5">por {h.autor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUNA LATERAL */}
          <div className="space-y-5">

            {/* Responsável */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Responsável</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-atlia-navy rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {projeto.responsavel.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{projeto.responsavel}</p>
                  <p className="text-xs text-atlia-muted">{projeto.responsavel_cargo}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-atlia-muted">
                <Building2 size={13} />
                <span>{projeto.secretaria}</span>
              </div>
            </div>

            {/* Alinhamento estratégico */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Alinhamento Estratégico</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Layers size={14} className="text-atlia-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-atlia-muted">Eixo Temático</p>
                    <p className="text-sm font-medium text-gray-700">{projeto.eixo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Target size={14} className="text-atlia-green mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-atlia-muted">Objetivo Estratégico</p>
                    <p className="text-sm font-medium text-gray-700 leading-snug">{projeto.objetivo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Tag size={14} className="text-atlia-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-atlia-muted">Tipo de Ganho</p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border inline-block mt-0.5 ${tipoGanhoStyle[projeto.tipoGanho]}`}>
                      {projeto.tipoGanho}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link href="/dashboard/mapa-estrategico" className="text-xs text-atlia-blue hover:underline font-medium">
                  Ver Mapa Estratégico →
                </Link>
              </div>
            </div>

            {/* Orçamento */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-1">Execução Orçamentária</h3>
              <p className="text-xs text-atlia-muted mb-3">{pctExecucao}% executado</p>
              <ResponsiveContainer width="100%" height={130}>
                <BarChart data={dadosOrc} barSize={36} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#6B7280' }} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(v: number) => [formatCurrency(v), '']}
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E5E7EB' }}
                  />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                    {dadosOrc.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-atlia-muted">Orçamento total</span>
                  <span className="font-semibold text-atlia-navy">{formatCurrency(projeto.orcamento)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-atlia-muted">Executado</span>
                  <span className="font-semibold text-atlia-green">{formatCurrency(projeto.executado)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-atlia-muted">Saldo disponível</span>
                  <span className="font-semibold text-atlia-blue">{formatCurrency(saldo)}</span>
                </div>
              </div>
            </div>

            {/* Status dos marcos */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Resumo dos Marcos</h3>
              <div className="space-y-2">
                {[
                  { label: 'Concluídos',    status: 'concluido',    color: 'text-atlia-green' },
                  { label: 'Em andamento',  status: 'em_andamento', color: 'text-atlia-blue'  },
                  { label: 'Atrasados',     status: 'atrasado',     color: 'text-atlia-red'   },
                  { label: 'Pendentes',     status: 'pendente',     color: 'text-gray-400'    },
                ].map(({ label, status, color }) => {
                  const qty = projeto.marcos.filter(m => m.status === status).length
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-xs text-atlia-muted">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{qty}</span>
                    </div>
                  )
                })}
                <div className="pt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-xs text-atlia-muted font-medium">Total</span>
                  <span className="text-sm font-bold text-atlia-navy">{projeto.marcos.length}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
