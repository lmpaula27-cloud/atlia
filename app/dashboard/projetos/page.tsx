'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import SlidePanel from '@/components/ui/SlidePanel'
import ProjetoForm from '@/components/forms/ProjetoForm'
import { formatCurrency } from '@/lib/utils'
import { Search, Plus, Filter, FolderKanban, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type TipoGanho = 'N/A' | 'Operacional' | 'Financeiro' | 'Econômico'

interface ProjetoUI {
  id: string
  nome: string
  secretaria: string
  responsavel: string
  status: string
  prioridade: string
  tipoGanho: string
  pct: number
  dataFim: string
  orcamento: number
  executado: number
}

const tipoGanhoStyle: Record<string, string> = {
  'N/A':         'bg-gray-100 text-gray-500',
  'Operacional': 'bg-blue-50 text-blue-700',
  'Financeiro':  'bg-green-50 text-green-700',
  'Econômico':   'bg-amber-50 text-amber-700',
}

const prioridadeStyle: Record<string, string> = {
  alta:  'bg-red-50 text-red-600',
  media: 'bg-yellow-50 text-yellow-700',
  baixa: 'bg-gray-50 text-gray-500',
}

const prioridadeLabel: Record<string, string> = {
  alta: 'Alta', media: 'Média', baixa: 'Baixa',
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

function fmtData(d: string | null): string {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

const statusOpts  = ['Todos', 'em_andamento', 'atencao', 'atrasado', 'nao_iniciado', 'concluido']
const tiposGanho: TipoGanho[] = ['N/A', 'Operacional', 'Financeiro', 'Econômico']

export default function ProjetosPage() {
  const [projetos, setProjetos]       = useState<ProjetoUI[]>([])
  const [carregando, setCarregando]   = useState(true)
  const [formAberto, setFormAberto]   = useState(false)
  const [sucesso, setSucesso]         = useState('')
  const [busca, setBusca]             = useState('')
  const [secretaria, setSecretaria]   = useState('Todas')
  const [status, setStatus]           = useState('Todos')
  const [tipoGanho, setTipoGanho]     = useState<TipoGanho | 'Todos'>('Todos')

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('projetos')
      .select('id, nome, status, prioridade, tipo_ganho, pct, data_fim, orcamento, executado, secretarias(nome, responsavel)')
      .order('created_at', { ascending: false })

    const mapped: ProjetoUI[] = (data ?? []).map((p: any) => ({
      id:          p.id,
      nome:        p.nome,
      secretaria:  nomeCurto(p.secretarias?.nome ?? ''),
      responsavel: p.secretarias?.responsavel ?? '—',
      status:      p.status,
      prioridade:  p.prioridade,
      tipoGanho:   p.tipo_ganho,
      pct:         p.pct,
      dataFim:     fmtData(p.data_fim),
      orcamento:   Number(p.orcamento),
      executado:   Number(p.executado),
    }))

    setProjetos(mapped)
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  // Auto-oculta o banner de sucesso após 4s
  useEffect(() => {
    if (!sucesso) return
    const t = setTimeout(() => setSucesso(''), 4000)
    return () => clearTimeout(t)
  }, [sucesso])

  const secretarias = ['Todas', ...Array.from(new Set(projetos.map(p => p.secretaria)))]

  const filtrados = projetos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       p.secretaria.toLowerCase().includes(busca.toLowerCase())
    const matchSec   = secretaria === 'Todas' || p.secretaria === secretaria
    const matchSt    = status === 'Todos'     || p.status === status
    const matchTipo  = tipoGanho === 'Todos'  || p.tipoGanho === tipoGanho
    return matchBusca && matchSec && matchSt && matchTipo
  })

  const orcamentoTotal = filtrados.reduce((s, p) => s + p.orcamento, 0)
  const executadoTotal = filtrados.reduce((s, p) => s + p.executado, 0)
  const pctExecucao    = orcamentoTotal > 0 ? Math.round((executadoTotal / orcamentoTotal) * 100) : 0

  return (
    <div className="flex flex-col flex-1">
      <Header title="Projetos" subtitle={`${projetos.length} projetos na carteira`} />

      <div className="p-8 space-y-5">

        {/* Banner de sucesso */}
        {sucesso && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            {sucesso}
          </div>
        )}

        {/* Resumo */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total na carteira',     value: projetos.length,                                                                 color: 'text-atlia-navy'  },
            { label: 'Em andamento',          value: projetos.filter(p => p.status === 'em_andamento').length,                        color: 'text-atlia-green' },
            { label: 'Requerem atenção',      value: projetos.filter(p => p.status === 'atencao' || p.status === 'atrasado').length,  color: 'text-atlia-red'   },
            { label: 'Execução orçamentária', value: carregando ? '—' : `${pctExecucao}%`,                                           color: 'text-atlia-blue'  },
          ].map(s => (
            <div key={s.label} className="card py-4 px-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-atlia-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros + botão */}
        <div className="card flex flex-wrap items-center gap-3 py-3">
          <div className="flex items-center gap-2 bg-atlia-gray rounded-lg px-3 py-2 flex-1 min-w-52">
            <Search size={15} className="text-atlia-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-atlia-muted"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-atlia-muted" />
            <select value={secretaria} onChange={e => setSecretaria(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none">
              {secretarias.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none">
            {statusOpts.map(s => (
              <option key={s} value={s}>{s === 'Todos' ? 'Todos os status' : s.replace('_', ' ')}</option>
            ))}
          </select>
          <select value={tipoGanho} onChange={e => setTipoGanho(e.target.value as TipoGanho | 'Todos')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none">
            <option value="Todos">Tipo de ganho</option>
            {tiposGanho.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={() => setFormAberto(true)}
            className="btn-primary flex items-center gap-2 ml-auto"
          >
            <Plus size={15} />
            Novo Projeto
          </button>
        </div>

        {/* Tabela */}
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-atlia-gray">
                <th className="text-left px-5 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Projeto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Secretaria</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Tipo de Ganho</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider w-36">Progresso</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Prazo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Orçamento</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {carregando ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-atlia-muted">
                    <Loader2 size={24} className="mx-auto mb-2 animate-spin opacity-40" />
                    Carregando projetos…
                  </td>
                </tr>
              ) : filtrados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-atlia-muted">
                    <FolderKanban size={32} className="mx-auto mb-2 opacity-30" />
                    Nenhum projeto encontrado
                  </td>
                </tr>
              ) : filtrados.map(p => (
                <tr key={p.id} className="hover:bg-atlia-gray/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 shrink-0 text-xs px-1.5 py-0.5 rounded font-semibold uppercase ${prioridadeStyle[p.prioridade]}`}>
                        {prioridadeLabel[p.prioridade]}
                      </span>
                      <div>
                        <Link href={`/dashboard/projetos/${p.id}`}
                          className="font-medium text-gray-800 leading-snug hover:text-atlia-blue transition-colors">
                          {p.nome}
                        </Link>
                        <p className="text-xs text-atlia-muted mt-0.5">{p.responsavel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{p.secretaria}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoGanhoStyle[p.tipoGanho] ?? 'bg-gray-100 text-gray-500'}`}>
                      {p.tipoGanho}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        value={p.pct}
                        color={p.status === 'atrasado' ? 'red' : p.status === 'atencao' ? 'yellow' : 'green'}
                        className="w-20"
                      />
                      <span className="text-xs text-atlia-muted w-8">{p.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 text-sm">{p.dataFim}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-gray-800 font-medium">{formatCurrency(p.orcamento)}</p>
                    <p className="text-xs text-atlia-muted">{formatCurrency(p.executado)} exec.</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <Link href={`/dashboard/projetos/${p.id}`}>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-atlia-blue transition-colors" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!carregando && filtrados.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-atlia-gray/40 flex items-center justify-between">
              <span className="text-xs text-atlia-muted">{filtrados.length} projeto(s) exibido(s)</span>
              <div className="flex items-center gap-6 text-xs text-atlia-muted">
                <span>Total orçado: <strong className="text-atlia-navy">{formatCurrency(orcamentoTotal)}</strong></span>
                <span>Total executado: <strong className="text-atlia-blue">{formatCurrency(executadoTotal)}</strong></span>
                <span>Execução: <strong className="text-atlia-green">{pctExecucao}%</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Formulário — slide panel */}
      <SlidePanel
        aberto={formAberto}
        titulo="Novo Projeto"
        onFechar={() => setFormAberto(false)}
      >
        <ProjetoForm
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
