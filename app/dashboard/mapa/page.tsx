'use client'
import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import { Filter, MapPin, Layers, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ProjetoMapa } from '@/components/mapa/Mapacidade'
import Link from 'next/link'

// Leaflet só funciona no browser — carregamento dinâmico obrigatório
const MapaCidade = dynamic(() => import('@/components/mapa/Mapacidade'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-atlia-gray rounded-xl">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-atlia-blue border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-atlia-muted">Carregando mapa...</p>
      </div>
    </div>
  ),
})

const statusOpts = [
  { value: 'todos',        label: 'Todos os status' },
  { value: 'em_andamento', label: 'Em andamento'    },
  { value: 'atencao',      label: 'Atenção'         },
  { value: 'atrasado',     label: 'Atrasado'        },
  { value: 'concluido',    label: 'Concluído'       },
  { value: 'nao_iniciado', label: 'Não iniciado'    },
]

const legenda = [
  { cor: 'bg-atlia-green',  label: 'No prazo / Concluído' },
  { cor: 'bg-yellow-400',   label: 'Atenção'              },
  { cor: 'bg-red-600',      label: 'Atrasado'             },
  { cor: 'bg-gray-400',     label: 'Não iniciado'         },
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

export default function MapaPage() {
  const [todos, setTodos]               = useState<ProjetoMapa[]>([])
  const [carregando, setCarregando]     = useState(true)
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroSec, setFiltroSec]       = useState('Todas')

  const carregar = useCallback(async () => {
    setCarregando(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('projetos')
      .select('id, nome, status, pct, lat, lng, bairro, secretarias(nome)')
      .not('lat', 'is', null)
      .not('lng', 'is', null)

    const mapped: ProjetoMapa[] = (data ?? []).map((p: any) => ({
      id:         p.id,
      nome:       p.nome,
      secretaria: nomeCurto(p.secretarias?.nome ?? ''),
      status:     p.status,
      pct:        p.pct ?? 0,
      lat:        Number(p.lat),
      lng:        Number(p.lng),
      bairro:     p.bairro ?? '',
    }))

    setTodos(mapped)
    setCarregando(false)
  }, [])

  useEffect(() => { carregar() }, [carregar])

  const secretariasOpts = ['Todas', ...Array.from(new Set(todos.map(p => p.secretaria))).sort()]

  const filtrados = todos.filter(p => {
    const matchStatus = filtroStatus === 'todos' || p.status === filtroStatus
    const matchSec    = filtroSec    === 'Todas' || p.secretaria === filtroSec
    return matchStatus && matchSec
  })

  return (
    <div className="flex flex-col flex-1">
      <Header title="Mapa da Cidade" subtitle="Projetos distribuídos pelo território municipal" />

      <div className="p-8 flex flex-col gap-5 flex-1">

        {/* Filtros */}
        <div className="card flex flex-wrap items-center gap-4 py-4">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-atlia-muted" />
            <span className="text-sm font-medium text-atlia-muted">Filtrar:</span>
          </div>

          <select
            value={filtroStatus}
            onChange={e => setFiltroStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            {statusOpts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          <select
            value={filtroSec}
            onChange={e => setFiltroSec(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            {secretariasOpts.map(s => <option key={s}>{s}</option>)}
          </select>

          <div className="flex items-center gap-4 ml-auto flex-wrap">
            {legenda.map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${l.cor}`} />
                <span className="text-xs text-atlia-muted">{l.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-atlia-light text-atlia-navy px-3 py-1.5 rounded-lg">
            <MapPin size={14} />
            <span className="text-xs font-semibold">{filtrados.length} projeto{filtrados.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Layout mapa + lista */}
        <div className="flex gap-5 flex-1 min-h-0" style={{ height: '560px' }}>

          {/* Mapa */}
          <div className="flex-1 card p-0 overflow-hidden">
            {carregando ? (
              <div className="w-full h-full flex items-center justify-center text-atlia-muted">
                <Loader2 size={24} className="animate-spin opacity-40 mr-2" />
                <span className="text-sm">Carregando projetos…</span>
              </div>
            ) : todos.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-atlia-muted text-center px-8">
                <MapPin size={32} className="opacity-20 mb-3" />
                <p className="text-sm font-medium">Nenhum projeto com localização cadastrada.</p>
                <p className="text-xs mt-1">
                  Edite um projeto e preencha Latitude e Longitude para que ele apareça aqui.
                </p>
                <Link href="/dashboard/projetos" className="mt-3 text-sm text-atlia-blue hover:underline font-medium">
                  Ir para Projetos →
                </Link>
              </div>
            ) : (
              <MapaCidade projetos={filtrados} />
            )}
          </div>

          {/* Lista lateral */}
          <div className="w-72 card p-0 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Layers size={15} className="text-atlia-muted" />
              <span className="text-sm font-semibold text-atlia-navy">
                {carregando ? 'Carregando…' : `${filtrados.length} projeto${filtrados.length !== 1 ? 's' : ''} no mapa`}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filtrados.map(p => (
                <Link
                  key={p.id}
                  href={`/dashboard/projetos/${p.id}`}
                  className="block px-4 py-3 hover:bg-atlia-gray/50 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <StatusBadge status={p.status} className="mt-0.5 shrink-0" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 mt-1.5 leading-tight">{p.nome}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-atlia-muted">{p.bairro || p.secretaria}</span>
                    <span className="text-xs font-semibold text-atlia-navy">{p.pct}%</span>
                  </div>
                  <div className="mt-1.5 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${p.pct}%`,
                        background: p.status === 'atrasado' ? '#C00000'
                          : p.status === 'atencao' ? '#FFC000' : '#70AD47'
                      }}
                    />
                  </div>
                </Link>
              ))}
              {!carregando && filtrados.length === 0 && (
                <div className="p-6 text-center text-atlia-muted text-sm">
                  Nenhum projeto encontrado
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
