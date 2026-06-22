'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProgressBar from '@/components/ui/ProgressBar'
import StatusBadge from '@/components/ui/StatusBadge'
import SlidePanel from '@/components/ui/SlidePanel'
import ProjetoForm, { type ProjetoEditavel } from '@/components/forms/ProjetoForm'
import MarcoForm, { type MarcoEditavel } from '@/components/forms/MarcoForm'
import { formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  ArrowLeft, CheckCircle2, Circle, Clock, AlertTriangle,
  Tag, Target, Layers, FileText, Building2, Loader2, Pencil, Trash2, Plus,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'

// ── Estilos ───────────────────────────────────────────────────
const prioridadeStyle: Record<string, string> = {
  alta:  'bg-red-50 text-red-600 border-red-200',
  media: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  baixa: 'bg-gray-50 text-gray-500 border-gray-200',
}
const prioridadeLabel: Record<string, string> = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }

const tipoGanhoStyle: Record<string, string> = {
  'N/A':         'bg-gray-100 text-gray-500 border-gray-200',
  'Operacional': 'bg-blue-50 text-blue-700 border-blue-200',
  'Financeiro':  'bg-green-50 text-green-700 border-green-200',
  'Econômico':   'bg-amber-50 text-amber-700 border-amber-200',
}

const marcoLinhaStyle: Record<string, string> = {
  concluido:    'border-atlia-green bg-green-50',
  em_andamento: 'border-atlia-blue  bg-blue-50',
  pendente:     'border-gray-200    bg-white',
  atrasado:     'border-atlia-red   bg-red-50',
}

const tipoHistoricoIcon: Record<string, string> = {
  marco: '🏁', contrato: '📄', status: '🔄', alerta: '⚠️', relatorio: '📊',
}

function marcoIconFor(status: string) {
  if (status === 'concluido')    return <CheckCircle2  size={18} className="text-atlia-green" />
  if (status === 'em_andamento') return <Clock         size={18} className="text-atlia-blue"  />
  if (status === 'atrasado')     return <AlertTriangle size={18} className="text-atlia-red"   />
  return <Circle size={18} className="text-gray-300" />
}

function marcoBorderColor(status: string): string {
  if (status === 'concluido')    return '#70AD47'
  if (status === 'em_andamento') return '#2E75B6'
  if (status === 'atrasado')     return '#C00000'
  return '#E5E7EB'
}

function corBarra(status: string) {
  if (status === 'atrasado') return '#C00000'
  if (status === 'atencao')  return '#FFC000'
  return '#70AD47'
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

function fmtData(d: string | null | undefined): string {
  if (!d) return '—'
  const part     = d.split('T')[0]
  const [y, m, day] = part.split('-')
  return `${day}/${m}/${y}`
}

// ── Página ────────────────────────────────────────────────────
export default function ProjetoDetalhePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [projeto, setProjeto]               = useState<any>(null)
  const [carregando, setCarregando]         = useState(true)
  const [naoEncontrado, setNaoEncontrado]   = useState(false)
  const [editAberto, setEditAberto]         = useState(false)
  const [confirmDelete, setConfirmDelete]   = useState(false)
  const [deletando, setDeletando]           = useState(false)
  const [sucesso, setSucesso]               = useState('')

  // ── CRUD de marcos ────────────────────────────────────────────
  const [marcoAberto, setMarcoAberto]       = useState(false)
  const [marcoEditando, setMarcoEditando]   = useState<MarcoEditavel | undefined>()
  const [confirmDeleteMarco, setConfirmDeleteMarco] = useState<string | null>(null)
  const [deletandoMarco, setDeletandoMarco] = useState(false)
  const usuario = useCurrentUser()

  // Um usuário pode editar se for admin, ou se for gestor com acesso à secretaria do projeto
  const podeEditar = !usuario.carregando && projeto && (
    usuario.perfil === 'admin' ||
    (usuario.perfil === 'gestor' && usuario.secretaria_ids.includes(projeto.secretaria_id))
  )
  const podeExcluir = !usuario.carregando && usuario.perfil === 'admin'

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('projetos')
      .select(`
        *,
        secretarias(nome, sigla, responsavel),
        objetivos(nome, eixos(nome, cor)),
        marcos(id, titulo, descricao, data_prevista, data_conclusao, status, pct, ordem),
        historico_projetos(id, tipo, descricao, created_at)
      `)
      .eq('id', params.id)
      .single()

    if (error || !data) {
      setNaoEncontrado(true)
    } else {
      setProjeto(data)
    }
    setCarregando(false)
  }, [params.id])

  useEffect(() => { carregar() }, [carregar])

  // Auto-oculta sucesso após 4s
  useEffect(() => {
    if (!sucesso) return
    const t = setTimeout(() => setSucesso(''), 4000)
    return () => clearTimeout(t)
  }, [sucesso])

  async function handleDelete() {
    setDeletando(true)
    const supabase = createClient()
    const { error } = await supabase.from('projetos').delete().eq('id', params.id)
    if (error) { setDeletando(false); return }
    router.push('/dashboard/projetos')
  }

  async function handleDeleteMarco(marcoId: string) {
    setDeletandoMarco(true)
    const supabase = createClient()
    await supabase.from('marcos').delete().eq('id', marcoId)
    setConfirmDeleteMarco(null)
    setDeletandoMarco(false)
    setSucesso('Marco excluído.')
    carregar()
  }

  function abrirNovoMarco() {
    setMarcoEditando(undefined)
    setMarcoAberto(true)
  }

  function abrirEditarMarco(marco: any) {
    setMarcoEditando({
      id:             marco.id,
      titulo:         marco.titulo,
      descricao:      marco.descricao ?? '',
      status:         marco.status,
      pct:            marco.pct,
      data_prevista:  marco.data_prevista  ?? '',
      data_conclusao: marco.data_conclusao ?? '',
      ordem:          marco.ordem,
    })
    setMarcoAberto(true)
  }

  // Converte dados do projeto para o formato do form
  function projetoParaEditavel(): ProjetoEditavel | undefined {
    if (!projeto) return undefined
    return {
      id:            projeto.id,
      nome:          projeto.nome,
      descricao:     projeto.descricao ?? '',
      secretaria_id: projeto.secretaria_id,
      objetivo_id:   projeto.objetivo_id,
      meta_id:       projeto.meta_id ?? null,
      status:        projeto.status,
      prioridade:    projeto.prioridade,
      tipo_ganho:    projeto.tipo_ganho,
      pct:           projeto.pct,
      peso:          projeto.peso ?? 1,
      data_inicio:   projeto.data_inicio,
      data_fim:      projeto.data_fim,
      orcamento:     Number(projeto.orcamento),
      executado:     Number(projeto.executado),
      tags:          projeto.tags ?? [],
      bairro:        projeto.bairro ?? '',
      lat:           projeto.lat ?? null,
      lng:           projeto.lng ?? null,
    }
  }


  // ── Estados de carregamento ───────────────────────────────────
  if (carregando) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-atlia-muted">
        <Loader2 size={28} className="animate-spin mb-2 opacity-40" />
        <p className="text-sm">Carregando projeto…</p>
      </div>
    )
  }

  if (naoEncontrado || !projeto) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-atlia-muted">
        <p className="text-lg font-semibold">Projeto não encontrado</p>
        <Link href="/dashboard/projetos" className="mt-3 text-sm text-atlia-blue hover:underline">
          ← Voltar para Projetos
        </Link>
      </div>
    )
  }

  // ── Dados derivados ───────────────────────────────────────────
  const marcos   = [...(projeto.marcos ?? [])].sort((a: any, b: any) => a.ordem - b.ordem)
  const historico = [...(projeto.historico_projetos ?? [])].sort((a: any, b: any) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  const secretariaNome = nomeCurto(projeto.secretarias?.nome ?? '')
  const responsavel    = projeto.secretarias?.responsavel ?? '—'
  const eixoNome       = projeto.objetivos?.eixos?.nome ?? '—'
  const objetivoNome   = projeto.objetivos?.nome ?? '—'
  const orcamento      = Number(projeto.orcamento)
  const executado      = Number(projeto.executado)
  const saldo          = orcamento - executado
  const pctExecucao    = orcamento > 0 ? Math.round((executado / orcamento) * 100) : 0

  const dadosOrc = [
    { name: 'Orçado',    valor: orcamento, fill: '#D6E4F0' },
    { name: 'Executado', valor: executado, fill: corBarra(projeto.status) },
    { name: 'Saldo',     valor: saldo,     fill: '#E5E7EB' },
  ]

  return (
    <div className="flex flex-col flex-1">

      {/* ── Header ── */}
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
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${prioridadeStyle[projeto.prioridade] ?? ''}`}>
              {prioridadeLabel[projeto.prioridade] ?? projeto.prioridade} prioridade
            </span>
          </div>
          <p className="text-sm text-atlia-muted mt-1">{secretariaNome} · Responsável: {responsavel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <FileText size={15} />
            Gerar PDF
          </button>
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
                  onClick={handleDelete}
                  disabled={deletando}
                  className="flex items-center gap-1.5 bg-red-600 text-white font-medium py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-xs disabled:opacity-70"
                >
                  {deletando ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  Excluir definitivamente
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 py-2 px-2"
                >
                  Cancelar
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">

        {/* Banner de sucesso */}
        {sucesso && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            {sucesso}
          </div>
        )}

        {/* ── Cards de resumo ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              label: 'Progresso geral',
              value: `${projeto.pct}%`,
              sub:   `${marcos.filter((m: any) => m.status === 'concluido').length} de ${marcos.length} marcos concluídos`,
              color: projeto.pct >= 70 ? 'text-atlia-green' : projeto.pct >= 40 ? 'text-atlia-blue' : 'text-atlia-red',
            },
            {
              label: 'Orçamento',
              value: formatCurrency(orcamento),
              sub:   `${formatCurrency(executado)} executado (${pctExecucao}%)`,
              color: 'text-atlia-navy',
            },
            {
              label: 'Prazo',
              value: fmtData(projeto.data_fim),
              sub:   `Início: ${fmtData(projeto.data_inicio)}`,
              color: projeto.status === 'atrasado' ? 'text-atlia-red' : 'text-atlia-navy',
            },
            {
              label: 'Tipo de Ganho',
              value: projeto.tipo_ganho,
              sub:   secretariaNome,
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

          {/* ── Coluna principal ── */}
          <div className="col-span-2 space-y-6">

            {/* Descrição */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-2">Descrição do Projeto</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{projeto.descricao}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {(projeto.tags ?? []).map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-atlia-light text-atlia-navy px-2.5 py-1 rounded-full font-medium">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Progresso */}
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
                <span>Início: {fmtData(projeto.data_inicio)}</span>
                <span>Prazo: {fmtData(projeto.data_fim)}</span>
              </div>
            </div>

            {/* Marcos */}
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-atlia-navy text-sm">
                  Marcos do Projeto
                  <span className="ml-2 text-xs font-normal text-atlia-muted">({marcos.length})</span>
                </h2>
                {podeEditar && (
                  <button
                    onClick={abrirNovoMarco}
                    className="flex items-center gap-1.5 text-xs font-semibold text-atlia-blue border border-atlia-blue/30 rounded-lg px-3 py-1.5 hover:bg-atlia-blue/5 transition-colors"
                  >
                    <Plus size={13} />
                    Novo marco
                  </button>
                )}
              </div>

              {marcos.length === 0 ? (
                <p className="text-sm text-atlia-muted text-center py-8 italic">
                  Nenhum marco cadastrado ainda.{podeEditar ? ' Clique em "Novo marco" para começar.' : ''}
                </p>
              ) : (
                <div className="relative">
                  <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-gray-100" />
                  <div className="space-y-3">
                    {marcos.map((marco: any) => (
                      <div key={marco.id} className="relative flex gap-4">
                        <div
                          className="relative z-10 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center shrink-0 shadow-sm"
                          style={{ borderColor: marcoBorderColor(marco.status) }}
                        >
                          {marcoIconFor(marco.status)}
                        </div>
                        <div className={`flex-1 rounded-xl border p-3.5 mb-1 ${marcoLinhaStyle[marco.status] ?? 'border-gray-200 bg-white'}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-atlia-muted">
                                {String(marco.ordem).padStart(2, '0')}
                              </span>
                              <h4 className="font-semibold text-gray-800 text-sm leading-snug">{marco.titulo}</h4>
                              {marco.descricao && (
                                <p className="text-xs text-atlia-muted mt-0.5 leading-relaxed">{marco.descricao}</p>
                              )}
                            </div>
                            <div className="flex items-start gap-2 shrink-0">
                              <div className="text-right">
                                {marco.data_conclusao
                                  ? <p className="text-xs text-atlia-green font-semibold">✓ {fmtData(marco.data_conclusao)}</p>
                                  : <p className="text-xs text-atlia-muted">{fmtData(marco.data_prevista)}</p>
                                }
                                {marco.status !== 'concluido' && marco.status !== 'pendente' && (
                                  <p className="text-xs font-bold mt-1" style={{ color: corBarra(marco.status) }}>{marco.pct}%</p>
                                )}
                              </div>
                              {podeEditar && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => abrirEditarMarco(marco)}
                                    className="p-1 rounded hover:bg-black/5 text-gray-400 hover:text-atlia-blue transition-colors"
                                    title="Editar marco"
                                  >
                                    <Pencil size={13} />
                                  </button>
                                  {confirmDeleteMarco === marco.id ? (
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => handleDeleteMarco(marco.id)}
                                        disabled={deletandoMarco}
                                        className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                        title="Confirmar exclusão"
                                      >
                                        {deletandoMarco ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                      </button>
                                      <button
                                        onClick={() => setConfirmDeleteMarco(null)}
                                        className="p-1 rounded hover:bg-black/5 text-gray-400 text-xs transition-colors"
                                        title="Cancelar"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setConfirmDeleteMarco(marco.id)}
                                      className="p-1 rounded hover:bg-black/5 text-gray-400 hover:text-red-500 transition-colors"
                                      title="Excluir marco"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {(marco.status === 'em_andamento' || marco.status === 'atrasado') && (
                            <div className="mt-2.5">
                              <ProgressBar value={marco.pct} color={marco.status === 'atrasado' ? 'red' : 'blue'} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Histórico */}
            <div className="card">
              <h2 className="font-semibold text-atlia-navy text-sm mb-4">Histórico de Atividades</h2>
              <div className="space-y-3">
                {[...historico].reverse().map((h: any, i: number) => (
                  <div key={h.id ?? i} className="flex gap-3 text-sm">
                    <span className="text-xs text-atlia-muted w-24 shrink-0 pt-0.5">
                      {fmtData(h.created_at)}
                    </span>
                    <div className="flex-1 border-l border-gray-100 pl-3">
                      <div className="flex items-start gap-1.5 mb-0.5">
                        <span className="text-base leading-none mt-0.5">
                          {tipoHistoricoIcon[h.tipo] ?? '📌'}
                        </span>
                        <p className="font-medium text-gray-700">{h.descricao}</p>
                      </div>
                      <p className="text-xs text-atlia-muted capitalize">{h.tipo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coluna lateral ── */}
          <div className="space-y-5">

            {/* Responsável */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Responsável</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-atlia-navy rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {responsavel.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{responsavel}</p>
                  <p className="text-xs text-atlia-muted leading-snug">{projeto.secretarias?.nome ?? '—'}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-atlia-muted">
                <Building2 size={13} />
                <span>{secretariaNome}</span>
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
                    <p className="text-sm font-medium text-gray-700">{eixoNome}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Target size={14} className="text-atlia-green mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-atlia-muted">Objetivo Estratégico</p>
                    <p className="text-sm font-medium text-gray-700 leading-snug">{objetivoNome}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Tag size={14} className="text-atlia-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-atlia-muted">Tipo de Ganho</p>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border inline-block mt-0.5 ${tipoGanhoStyle[projeto.tipo_ganho] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {projeto.tipo_ganho}
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
                  <YAxis tick={{ fontSize: 9, fill: '#6B7280' }} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
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
                  <span className="font-semibold text-atlia-navy">{formatCurrency(orcamento)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-atlia-muted">Executado</span>
                  <span className="font-semibold text-atlia-green">{formatCurrency(executado)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-atlia-muted">Saldo disponível</span>
                  <span className="font-semibold text-atlia-blue">{formatCurrency(saldo)}</span>
                </div>
              </div>
            </div>

            {/* Resumo marcos */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Resumo dos Marcos</h3>
              <div className="space-y-2">
                {[
                  { label: 'Concluídos',   status: 'concluido',    color: 'text-atlia-green' },
                  { label: 'Em andamento', status: 'em_andamento', color: 'text-atlia-blue'  },
                  { label: 'Atrasados',    status: 'atrasado',     color: 'text-atlia-red'   },
                  { label: 'Pendentes',    status: 'pendente',     color: 'text-gray-400'    },
                ].map(({ label, status, color }) => {
                  const qty = marcos.filter((m: any) => m.status === status).length
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-xs text-atlia-muted">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{qty}</span>
                    </div>
                  )
                })}
                <div className="pt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-xs text-atlia-muted font-medium">Total</span>
                  <span className="text-sm font-bold text-atlia-navy">{marcos.length}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Formulário de marco */}
      <SlidePanel
        aberto={marcoAberto}
        titulo={marcoEditando?.id ? 'Editar Marco' : 'Novo Marco'}
        onFechar={() => { setMarcoAberto(false); setMarcoEditando(undefined) }}
      >
        <MarcoForm
          marcoInicial={marcoEditando}
          projetoId={params.id}
          ordemSugerida={(projeto?.marcos?.length ?? 0) + 1}
          onSuccess={(msg) => {
            setMarcoAberto(false)
            setMarcoEditando(undefined)
            setSucesso(msg)
            carregar()
          }}
          onCancelar={() => { setMarcoAberto(false); setMarcoEditando(undefined) }}
        />
      </SlidePanel>

      {/* Formulário de edição */}
      <SlidePanel
        aberto={editAberto}
        titulo="Editar Projeto"
        onFechar={() => setEditAberto(false)}
      >
        <ProjetoForm
          projetoInicial={projetoParaEditavel()}
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
