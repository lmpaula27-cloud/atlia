'use client'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { ChevronDown, ChevronRight, Target, FolderKanban, CheckCircle2, Clock, AlertTriangle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ObjetivoUI {
  id: string
  numero: string
  nome: string
  pct_atual: number
  totalProjetos: number
  concluidos: number
  emAndamento: number
  atrasados: number
}

interface EixoUI {
  id: string
  nome: string
  descricao: string | null
  cor: string
  ordem: number
  atingimento: number
  totalProjetos: number
  objetivos: ObjetivoUI[]
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

export default function ObjetivosPage() {
  const [eixos, setEixos]           = useState<EixoUI[]>([])
  const [carregando, setCarregando] = useState(true)
  const [abertos, setAbertos]       = useState<string[]>([])

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()

    const [{ data: eixosRaw }, { data: projRaw }] = await Promise.all([
      supabase
        .from('eixos')
        .select('id, nome, descricao, cor, ordem, objetivos(id, nome, pct_atual)')
        .order('ordem'),
      supabase
        .from('projetos')
        .select('objetivo_id, status')
        .not('objetivo_id', 'is', null),
    ])

    const projs = projRaw ?? []

    const mapped: EixoUI[] = (eixosRaw ?? []).map((ex: any) => {
      const objs: ObjetivoUI[] = (ex.objetivos ?? []).map((ob: any, i: number) => {
        const pObjs = projs.filter((p: any) => p.objetivo_id === ob.id)
        return {
          id:            ob.id,
          numero:        `${ex.ordem}.${i + 1}`,
          nome:          ob.nome,
          pct_atual:     ob.pct_atual,
          totalProjetos: pObjs.length,
          concluidos:    pObjs.filter((p: any) => p.status === 'concluido').length,
          emAndamento:   pObjs.filter((p: any) => p.status === 'em_andamento' || p.status === 'atencao').length,
          atrasados:     pObjs.filter((p: any) => p.status === 'atrasado').length,
        }
      })

      const atingimento = objs.length > 0
        ? Math.round(objs.reduce((s, o) => s + o.pct_atual, 0) / objs.length)
        : 0

      return {
        id:            ex.id,
        nome:          ex.nome,
        descricao:     ex.descricao,
        cor:           ex.cor,
        ordem:         ex.ordem,
        atingimento,
        totalProjetos: objs.reduce((s, o) => s + o.totalProjetos, 0),
        objetivos:     objs,
      }
    })

    setEixos(mapped)
    setAbertos(mapped.map(e => e.id)) // todos abertos por padrão
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  function toggle(id: string) {
    setAbertos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const totalObjetivos  = eixos.reduce((s, e) => s + e.objetivos.length, 0)
  const totalProjetos   = eixos.reduce((s, e) => s + e.totalProjetos, 0)
  const totalAtrasados  = eixos.reduce((s, e) => s + e.objetivos.reduce((ss, o) => ss + o.atrasados, 0), 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Objetivos Estratégicos"
        subtitle={carregando ? 'Carregando…' : `${totalObjetivos} objetivos distribuídos em ${eixos.length} eixos temáticos`}
      />

      <div className="p-8 space-y-5">

        {/* Resumo global */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Eixos Temáticos',       value: carregando ? '—' : eixos.length.toString(),         bg: 'bg-atlia-navy', text: 'text-white'      },
            { label: 'Objetivos Estratégicos', value: carregando ? '—' : totalObjetivos.toString(),       bg: 'bg-atlia-blue', text: 'text-white'      },
            { label: 'Projetos no total',      value: carregando ? '—' : totalProjetos.toString(),        bg: 'bg-white',      text: 'text-atlia-navy', border: true },
            { label: 'Projetos atrasados',     value: carregando ? '—' : totalAtrasados.toString(),       bg: 'bg-red-50',     text: 'text-atlia-red',  border: true },
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
            <span className="text-sm">Carregando objetivos…</span>
          </div>
        ) : (
          eixos.map((eixo) => {
            const open = abertos.includes(eixo.id)
            return (
              <div key={eixo.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">

                {/* Header do eixo */}
                <button
                  onClick={() => toggle(eixo.id)}
                  className="w-full flex items-center gap-5 px-6 py-5 text-left transition-opacity hover:opacity-95"
                  style={{ backgroundColor: eixo.cor }}
                >
                  <div className="flex-1">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                      Eixo {eixo.ordem} · {eixo.objetivos.length} objetivo{eixo.objetivos.length !== 1 ? 's' : ''}
                    </p>
                    <h3 className="font-bold text-white text-lg leading-tight">{eixo.nome}</h3>
                    {eixo.descricao && (
                      <p className="text-white/65 text-sm mt-0.5">{eixo.descricao}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-center">
                      <p className="text-white font-bold text-2xl">{eixo.atingimento}%</p>
                      <p className="text-white/55 text-xs">atingimento</p>
                      <div className="mt-1.5 bg-white/20 rounded-full h-1 w-20">
                        <div className="bg-white h-1 rounded-full" style={{ width: `${eixo.atingimento}%` }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-2xl">{eixo.totalProjetos}</p>
                      <p className="text-white/55 text-xs">projetos</p>
                    </div>
                    {open
                      ? <ChevronDown  size={20} className="text-white/60" />
                      : <ChevronRight size={20} className="text-white/60" />
                    }
                  </div>
                </button>

                {/* Objetivos */}
                {open && (
                  <div style={{ backgroundColor: hexToRgba(eixo.cor, 0.05) }}>
                    {eixo.objetivos.map((obj, i) => (
                      <div
                        key={obj.id}
                        className={`px-6 py-4 flex items-start gap-4 hover:bg-black/[0.02] transition-colors
                          ${i < eixo.objetivos.length - 1 ? 'border-b border-gray-200/50' : ''}`}
                      >
                        {/* Ícone */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: hexToRgba(eixo.cor, 0.1), border: `1.5px solid ${hexToRgba(eixo.cor, 0.2)}` }}
                        >
                          <Target size={15} style={{ color: eixo.cor }} />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <span className="text-xs font-bold" style={{ color: eixo.cor }}>{obj.numero}</span>
                              <h4 className="font-semibold text-gray-800 text-sm leading-snug mt-0.5">{obj.nome}</h4>
                            </div>
                            <span className="font-bold text-base shrink-0" style={{ color: eixo.cor }}>{obj.pct_atual}%</span>
                          </div>

                          <div className="flex items-center gap-5 flex-wrap mb-2.5">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FolderKanban size={12} className="text-gray-400" />
                              {obj.totalProjetos} projeto{obj.totalProjetos !== 1 ? 's' : ''}
                            </div>
                            {obj.concluidos > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <CheckCircle2 size={12} className="text-atlia-green" />
                                {obj.concluidos} concluído{obj.concluidos !== 1 ? 's' : ''}
                              </div>
                            )}
                            {obj.emAndamento > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock size={12} className="text-atlia-blue" />
                                {obj.emAndamento} em andamento
                              </div>
                            )}
                            {obj.atrasados > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-atlia-red font-medium">
                                <AlertTriangle size={12} />
                                {obj.atrasados} atrasado{obj.atrasados !== 1 ? 's' : ''}
                              </div>
                            )}
                            {obj.totalProjetos === 0 && (
                              <span className="text-xs text-atlia-muted italic">Sem projetos vinculados</span>
                            )}
                          </div>

                          <ProgressBar value={obj.pct_atual} color={getCorAtingimento(obj.pct_atual)} />
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
