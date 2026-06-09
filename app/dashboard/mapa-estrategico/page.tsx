'use client'
import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { Target, Eye, Heart, ChevronRight, TrendingUp, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// ── Missão/Visão/Valores — editáveis na aba Município das Configurações no futuro
const identidade = {
  missao: 'Promover uma cidade com foco na cidadania, inovação, inclusão social e desenvolvimento com sustentabilidade, transformando o município em referência nacional de gestão pública.',
  visao:  'Consolidar, até 2035, o município como uma cidade inteligente, sustentável, acolhedora e comprometida com o cuidado das pessoas, por meio de políticas públicas integradas, eficientes e inovadoras.',
  valores: ['Inovação', 'Ética e Transparência', 'Sustentabilidade', 'Cuidado com Pessoas', 'Compromisso com Resultados'],
}

interface ObjetivoUI {
  id: string
  nome: string
  pct_atual: number
  totalProjetos: number
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
  if (v >= 60) return 'green' as const
  if (v >= 40) return 'blue'  as const
  if (v >= 20) return 'yellow' as const
  return 'red' as const
}

export default function MapaEstrategicoPage() {
  const [eixos, setEixos]         = useState<EixoUI[]>([])
  const [carregando, setCarregando] = useState(true)

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
      const objs: ObjetivoUI[] = (ex.objetivos ?? []).map((ob: any) => ({
        id:            ob.id,
        nome:          ob.nome,
        pct_atual:     ob.pct_atual,
        totalProjetos: projs.filter((p: any) => p.objetivo_id === ob.id).length,
      }))

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
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  const totalObjetivos = eixos.reduce((s, e) => s + e.objetivos.length, 0)
  const totalProjetos  = eixos.reduce((s, e) => s + e.totalProjetos, 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Mapa Estratégico"
        subtitle="Arquitetura do Plano de Governo — Missão, Visão, Valores e Eixos Temáticos"
      />

      <div className="p-8 space-y-8">

        {/* Missão, Visão, Valores */}
        <div className="grid grid-cols-3 gap-5">
          <div className="card border-l-4 border-atlia-navy">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
                <Target size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-navy uppercase tracking-wide text-xs">Missão</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{identidade.missao}</p>
          </div>

          <div className="card border-l-4 border-atlia-blue">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-blue rounded-lg flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-blue uppercase tracking-wide text-xs">Visão 2035</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{identidade.visao}</p>
          </div>

          <div className="card border-l-4 border-atlia-green">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-green rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-green uppercase tracking-wide text-xs">Valores</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {identidade.valores.map(v => (
                <span key={v} className="bg-green-50 text-green-800 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-full">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-2 text-atlia-muted text-xs font-medium uppercase tracking-wider">
            <ChevronRight size={14} />
            Eixos Temáticos e Objetivos Estratégicos
            <ChevronRight size={14} />
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Eixos */}
        {carregando ? (
          <div className="py-16 flex flex-col items-center gap-3 text-atlia-muted">
            <Loader2 size={28} className="animate-spin opacity-40" />
            <span className="text-sm">Carregando mapa estratégico…</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {eixos.map((eixo) => (
              <div key={eixo.id} className="rounded-xl border-2 overflow-hidden"
                style={{ borderColor: eixo.cor }}>

                {/* Cabeçalho */}
                <div className="p-4" style={{ backgroundColor: eixo.cor }}>
                  <h3 className="font-bold text-white text-sm leading-tight mb-1">{eixo.nome}</h3>
                  {eixo.descricao && (
                    <p className="text-white/70 text-xs leading-tight">{eixo.descricao}</p>
                  )}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{eixo.atingimento}%</p>
                      <p className="text-white/60 text-xs">atingimento</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{eixo.totalProjetos}</p>
                      <p className="text-white/60 text-xs">projetos</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-white/20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: `${eixo.atingimento}%` }} />
                  </div>
                </div>

                {/* Objetivos */}
                <div className="divide-y divide-gray-100"
                  style={{ backgroundColor: hexToRgba(eixo.cor, 0.06) }}>
                  {eixo.objetivos.map((obj) => (
                    <div key={obj.id} className="p-3">
                      <p className="text-xs font-medium text-gray-800 leading-tight mb-2">{obj.nome}</p>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-atlia-muted">{obj.totalProjetos} proj.</span>
                        <span className="text-xs font-semibold" style={{ color: eixo.cor }}>{obj.pct_atual}%</span>
                      </div>
                      <ProgressBar value={obj.pct_atual} color={getCorAtingimento(obj.pct_atual)} />
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Rodapé com totais reais */}
        {!carregando && (
          <div className="card bg-atlia-navy border-0">
            <div className="grid grid-cols-4 gap-6 text-center">
              {[
                { label: 'Eixos Temáticos',       value: eixos.length.toString()       },
                { label: 'Objetivos Estratégicos', value: totalObjetivos.toString()     },
                { label: 'Projetos vinculados',    value: totalProjetos.toString()      },
                { label: 'Atingimento médio',      value: eixos.length > 0
                    ? `${Math.round(eixos.reduce((s, e) => s + e.atingimento, 0) / eixos.length)}%`
                    : '—' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-white font-bold text-3xl">{s.value}</p>
                  <p className="text-white/60 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
