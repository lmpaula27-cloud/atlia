'use client'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { ChevronDown, ChevronRight, Flag, FolderKanban, CheckCircle2, Clock, AlertTriangle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface MetaUI {
  id: string
  nome: string
  pct_atual: number
  peso: number
  totalProjetos: number
  concluidos: number
  emAndamento: number
  atrasados: number
  ods: { numero: number; cor: string }[]
}

interface ObjetivoUI {
  id: string
  nome: string
  eixo_nome: string
  eixo_cor: string
  atingimento: number
  totalProjetos: number
  metas: MetaUI[]
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getCorAtingimento(v: number) {
  if (v >= 60) return 'green'  as const
  if (v >= 40) return 'blue'   as const
  if (v >= 20) return 'yellow' as const
  return 'red' as const
}

export default function MetasPage() {
  const [objetivos, setObjetivos]   = useState<ObjetivoUI[]>([])
  const [carregando, setCarregando] = useState(true)
  const [abertos, setAbertos]       = useState<string[]>([])

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()

    const [{ data: objRaw }, { data: projRaw }] = await Promise.all([
      supabase
        .from('objetivos')
        .select('id, nome, eixos(nome, cor), metas(id, nome, pct_atual, peso, metas_ods(ods(numero, cor)))')
        .order('eixo_id'),
      supabase
        .from('projetos')
        .select('meta_id, status')
        .not('meta_id', 'is', null),
    ])

    const projs = projRaw ?? []

    const mapped: ObjetivoUI[] = (objRaw ?? [])
      .filter((ob: any) => (ob.metas ?? []).length > 0)
      .map((ob: any) => {
        const metas: MetaUI[] = (ob.metas ?? []).map((me: any) => {
          const pMetas = projs.filter((p: any) => p.meta_id === me.id)
          return {
            id:            me.id,
            nome:          me.nome,
            pct_atual:     me.pct_atual,
            peso:          me.peso ?? 1,
            ods:           (me.metas_ods ?? []).map((mo: any) => ({ numero: mo.ods?.numero, cor: mo.ods?.cor })),
            totalProjetos: pMetas.length,
            concluidos:    pMetas.filter((p: any) => p.status === 'concluido').length,
            emAndamento:   pMetas.filter((p: any) => p.status === 'em_andamento' || p.status === 'atencao').length,
            atrasados:     pMetas.filter((p: any) => p.status === 'atrasado').length,
          }
        })

        const pesoTotal = metas.reduce((s, m) => s + m.peso, 0)
        const atingimento = pesoTotal > 0
          ? Math.round(metas.reduce((s, m) => s + m.pct_atual * m.peso, 0) / pesoTotal)
          : 0

        return {
          id:            ob.id,
          nome:          ob.nome,
          eixo_nome:     ob.eixos?.nome ?? '—',
          eixo_cor:      ob.eixos?.cor  ?? '#1F3864',
          atingimento,
          totalProjetos: metas.reduce((s, m) => s + m.totalProjetos, 0),
          metas,
        }
      })

    setObjetivos(mapped)
    setAbertos(mapped.map(o => o.id))
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  function toggle(id: string) {
    setAbertos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const totalMetas     = objetivos.reduce((s, o) => s + o.metas.length, 0)
  const totalProjetos  = objetivos.reduce((s, o) => s + o.totalProjetos, 0)
  const totalAtrasados = objetivos.reduce((s, o) => s + o.metas.reduce((ss, m) => ss + m.atrasados, 0), 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Metas Estratégicas"
        subtitle={carregando ? 'Carregando…' : `${totalMetas} metas distribuídas em ${objetivos.length} objetivos estratégicos`}
      />

      <div className="p-8 space-y-5">

        {/* Resumo global */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Objetivos com metas', value: carregando ? '—' : objetivos.length.toString(), bg: 'bg-atlia-navy', text: 'text-white' },
            { label: 'Metas Estratégicas',  value: carregando ? '—' : totalMetas.toString(),        bg: 'bg-atlia-blue', text: 'text-white' },
            { label: 'Projetos vinculados', value: carregando ? '—' : totalProjetos.toString(),      bg: 'bg-white',      text: 'text-atlia-navy', border: true },
            { label: 'Projetos atrasados',  value: carregando ? '—' : totalAtrasados.toString(),     bg: 'bg-red-50',     text: 'text-atlia-red',  border: true },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-4 ${s.bg} ${(s as any).border ? 'border border-gray-200' : ''}`}>
              <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
              <p className={`text-sm mt-1 ${(s as any).border ? 'text-atlia-muted' : 'text-white/70'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Loading */}
        {carregando ? (
          <div className="py-16 flex flex-col items-center gap-3 text-atlia-muted">
            <Loader2 size={28} className="animate-spin opacity-40" />
            <span className="text-sm">Carregando metas…</span>
          </div>
        ) : objetivos.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-atlia-muted">
            <Flag size={28} className="opacity-20" />
            <span className="text-sm">Nenhuma meta cadastrada ainda. Crie em Configurações → Metas.</span>
          </div>
        ) : (
          objetivos.map((obj) => {
            const open = abertos.includes(obj.id)
            return (
              <div key={obj.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">

                {/* Header do objetivo */}
                <button
                  onClick={() => toggle(obj.id)}
                  className="w-full flex items-center gap-5 px-6 py-5 text-left transition-opacity hover:opacity-95"
                  style={{ backgroundColor: obj.eixo_cor }}
                >
                  <div className="flex-1">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                      {obj.eixo_nome} · {obj.metas.length} meta{obj.metas.length !== 1 ? 's' : ''}
                    </p>
                    <h3 className="font-bold text-white text-lg leading-tight">{obj.nome}</h3>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-center">
                      <p className="text-white font-bold text-2xl">{obj.atingimento}%</p>
                      <p className="text-white/55 text-xs">atingimento</p>
                      <div className="mt-1.5 bg-white/20 rounded-full h-1 w-20">
                        <div className="bg-white h-1 rounded-full" style={{ width: `${obj.atingimento}%` }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-2xl">{obj.totalProjetos}</p>
                      <p className="text-white/55 text-xs">projetos</p>
                    </div>
                    {open
                      ? <ChevronDown  size={20} className="text-white/60" />
                      : <ChevronRight size={20} className="text-white/60" />
                    }
                  </div>
                </button>

                {/* Metas */}
                {open && (
                  <div style={{ backgroundColor: hexToRgba(obj.eixo_cor, 0.05) }}>
                    {obj.metas.map((meta, i) => (
                      <div
                        key={meta.id}
                        className={`px-6 py-4 flex items-start gap-4 hover:bg-black/[0.02] transition-colors
                          ${i < obj.metas.length - 1 ? 'border-b border-gray-200/50' : ''}`}
                      >
                        {/* Ícone */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: hexToRgba(obj.eixo_cor, 0.1), border: `1.5px solid ${hexToRgba(obj.eixo_cor, 0.2)}` }}
                        >
                          <Flag size={15} style={{ color: obj.eixo_cor }} />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm leading-snug">{meta.nome}</h4>
                            <span className="font-bold text-base shrink-0" style={{ color: obj.eixo_cor }}>{meta.pct_atual}%</span>
                          </div>

                          <div className="flex items-center gap-5 flex-wrap mb-2.5">
                            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium" title="Peso dentro do objetivo">
                              peso {meta.peso}
                            </span>
                            {meta.ods.length > 0 && (
                              <div className="flex items-center gap-1">
                                {meta.ods.map(o => (
                                  <span key={o.numero} title={`ODS ${o.numero}`}
                                    className="w-4 h-4 rounded text-white text-[9px] font-bold flex items-center justify-center"
                                    style={{ backgroundColor: o.cor }}>
                                    {o.numero}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FolderKanban size={12} className="text-gray-400" />
                              {meta.totalProjetos} projeto{meta.totalProjetos !== 1 ? 's' : ''}
                            </div>
                            {meta.concluidos > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <CheckCircle2 size={12} className="text-atlia-green" />
                                {meta.concluidos} concluído{meta.concluidos !== 1 ? 's' : ''}
                              </div>
                            )}
                            {meta.emAndamento > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock size={12} className="text-atlia-blue" />
                                {meta.emAndamento} em andamento
                              </div>
                            )}
                            {meta.atrasados > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-atlia-red font-medium">
                                <AlertTriangle size={12} />
                                {meta.atrasados} atrasado{meta.atrasados !== 1 ? 's' : ''}
                              </div>
                            )}
                            {meta.totalProjetos === 0 && (
                              <span className="text-xs text-atlia-muted italic">Sem projetos vinculados</span>
                            )}
                          </div>

                          <ProgressBar value={meta.pct_atual} color={getCorAtingimento(meta.pct_atual)} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}

      </div>
    </div>
  )
}
