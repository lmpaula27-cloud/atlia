'use client'
import { useState, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import { Filter, MapPin, Layers } from 'lucide-react'

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

const projetos = [
  { id:'1',  nome:'Recapeamento Asfáltico — Zona Norte',  secretaria:'Obras',      status:'em_andamento', pct:68,  bairro:'Tibery'           },
  { id:'2',  nome:'UBS Jardim das Palmeiras',             secretaria:'Saúde',      status:'atencao',      pct:32,  bairro:'Jd. das Palmeiras' },
  { id:'3',  nome:'Sistema de Monitoramento Escolar',     secretaria:'Educação',   status:'em_andamento', pct:81,  bairro:'Centro'            },
  { id:'4',  nome:'Revitalização da Praça Central',       secretaria:'Urbanismo',  status:'atrasado',     pct:15,  bairro:'Centro'            },
  { id:'5',  nome:'Programa Emprego e Renda 2026',        secretaria:'Trabalho',   status:'em_andamento', pct:55,  bairro:'Saraiva'           },
  { id:'6',  nome:'Pavimentação Distrito Industrial',     secretaria:'Obras',      status:'nao_iniciado', pct:0,   bairro:'Dist. Industrial'  },
  { id:'7',  nome:'Ampliação do CRAS Norte',              secretaria:'Assistência',status:'em_andamento', pct:47,  bairro:'Marta Helena'      },
  { id:'8',  nome:'Iluminação LED — Centro Histórico',    secretaria:'Urbanismo',  status:'concluido',    pct:100, bairro:'Centro'            },
  { id:'9',  nome:'Ciclovia Avenida João Naves',          secretaria:'Obras',      status:'em_andamento', pct:62,  bairro:'Martins'           },
  { id:'10', nome:'Reforma da Escola Municipal Bom Jesus',secretaria:'Educação',   status:'atencao',      pct:40,  bairro:'Canaã'             },
  { id:'11', nome:'UPA Zona Sul — Ampliação',             secretaria:'Saúde',      status:'atrasado',     pct:20,  bairro:'Luizote'           },
  { id:'12', nome:'Parque Linear Córrego São Pedro',      secretaria:'Meio Amb.',  status:'em_andamento', pct:55,  bairro:'Seg. Pereira'      },
]

const secretarias = ['Todas', 'Obras', 'Saúde', 'Educação', 'Urbanismo', 'Trabalho', 'Assistência', 'Meio Amb.']
const statusOpts  = [
  { value: 'todos',        label: 'Todos os status' },
  { value: 'em_andamento', label: 'Em andamento'    },
  { value: 'atencao',      label: 'Atenção'         },
  { value: 'atrasado',     label: 'Atrasado'        },
  { value: 'concluido',    label: 'Concluído'       },
  { value: 'nao_iniciado', label: 'Não iniciado'    },
]

const legenda = [
  { cor: 'bg-atlia-green',  label: 'No prazo / Concluído' },
  { cor: 'bg-atlia-yellow', label: 'Atenção'              },
  { cor: 'bg-atlia-red',    label: 'Atrasado'             },
  { cor: 'bg-gray-400',     label: 'Não iniciado'         },
]

export default function MapaPage() {
  const [filtroStatus, setFiltroStatus]         = useState('todos')
  const [filtroSecretaria, setFiltroSecretaria] = useState('Todas')

  const filtrados = projetos.filter(p => {
    const matchStatus = filtroStatus === 'todos' || p.status === filtroStatus
    const matchSec    = filtroSecretaria === 'Todas' || p.secretaria === filtroSecretaria
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
            value={filtroSecretaria}
            onChange={e => setFiltroSecretaria(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            {secretarias.map(s => <option key={s}>{s}</option>)}
          </select>

          <div className="flex items-center gap-4 ml-auto">
            {legenda.map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${l.cor}`} />
                <span className="text-xs text-atlia-muted">{l.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-atlia-light text-atlia-navy px-3 py-1.5 rounded-lg">
            <MapPin size={14} />
            <span className="text-xs font-semibold">{filtrados.length} projetos</span>
          </div>
        </div>

        {/* Layout mapa + lista */}
        <div className="flex gap-5 flex-1 min-h-0" style={{ height: '560px' }}>

          {/* Mapa */}
          <div className="flex-1 card p-0 overflow-hidden">
            <MapaCidade
              filtroStatus={filtroStatus}
              filtroSecretaria={filtroSecretaria}
            />
          </div>

          {/* Lista lateral */}
          <div className="w-72 card p-0 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Layers size={15} className="text-atlia-muted" />
              <span className="text-sm font-semibold text-atlia-navy">
                Projetos no mapa
              </span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filtrados.map(p => (
                <div key={p.id} className="px-4 py-3 hover:bg-atlia-gray/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-2">
                    <StatusBadge status={p.status} className="mt-0.5 shrink-0" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 mt-1.5 leading-tight">{p.nome}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-atlia-muted">{p.bairro}</span>
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
                </div>
              ))}
              {filtrados.length === 0 && (
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
