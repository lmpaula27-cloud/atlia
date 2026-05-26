'use client'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Plus, TrendingUp, TrendingDown } from 'lucide-react'

const indicadores = [
  { id:'1', nome:'Taxa de cobertura vacinação infantil',       secretaria:'Saúde',       unidade:'%',    meta:95,  atual:88,  status:'atencao',   periodicidade:'Mensal'     },
  { id:'2', nome:'Índice de alfabetização — 3º ano EF',        secretaria:'Educação',    unidade:'%',    meta:90,  atual:94,  status:'no_prazo',  periodicidade:'Anual'      },
  { id:'3', nome:'Km de vias pavimentadas (acumulado)',         secretaria:'Obras',       unidade:'km',   meta:120, atual:87,  status:'atencao',   periodicidade:'Trimestral' },
  { id:'4', nome:'Tempo médio de espera em UBS',               secretaria:'Saúde',       unidade:'min',  meta:30,  atual:48,  status:'critico',   periodicidade:'Mensal'     },
  { id:'5', nome:'Empregos formais gerados',                   secretaria:'Trabalho',    unidade:'empr', meta:2000,atual:1420,status:'atencao',   periodicidade:'Trimestral' },
  { id:'6', nome:'Coleta seletiva — cobertura de bairros',     secretaria:'Meio Amb.',   unidade:'%',    meta:80,  atual:65,  status:'atencao',   periodicidade:'Mensal'     },
  { id:'7', nome:'Notas de serviços digitais (1-5)',            secretaria:'Adm. Digital',unidade:'pts',  meta:4.5, atual:4.7, status:'no_prazo',  periodicidade:'Mensal'     },
  { id:'8', nome:'Receita própria per capita',                 secretaria:'Finanças',    unidade:'R$',   meta:1800,atual:1920,status:'no_prazo',  periodicidade:'Anual'      },
]

function formatValue(v: number, unidade: string) {
  if (unidade === 'R$') return `R$ ${v.toLocaleString('pt-BR')}`
  if (unidade === 'pts') return v.toFixed(1)
  return `${v.toLocaleString('pt-BR')} ${unidade}`
}

export default function IndicadoresPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Indicadores de Desempenho" subtitle="Monitoramento de KPIs por secretaria" />

      <div className="p-8 space-y-6">

        <div className="flex justify-end">
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Novo Indicador
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {indicadores.map((ind) => {
            const pct = Math.min(100, Math.round((ind.atual / ind.meta) * 100))
            const acima = ind.atual >= ind.meta
            return (
              <div key={ind.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <p className="font-medium text-gray-800 text-sm leading-tight">{ind.nome}</p>
                    <p className="text-xs text-atlia-muted mt-0.5">{ind.secretaria} • {ind.periodicidade}</p>
                  </div>
                  <StatusBadge status={ind.status} />
                </div>

                <div className="flex items-end gap-6 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-atlia-navy">
                      {formatValue(ind.atual, ind.unidade)}
                    </p>
                    <p className="text-xs text-atlia-muted">Valor atual</p>
                  </div>
                  <div className="pb-0.5">
                    <p className="text-base font-semibold text-gray-500">
                      Meta: {formatValue(ind.meta, ind.unidade)}
                    </p>
                  </div>
                  <div className="ml-auto pb-0.5 flex items-center gap-1">
                    {acima
                      ? <TrendingUp size={16} className="text-atlia-green" />
                      : <TrendingDown size={16} className="text-atlia-red" />
                    }
                    <span className={`text-sm font-semibold ${acima ? 'text-atlia-green' : 'text-atlia-red'}`}>
                      {pct}% da meta
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={pct}
                  color={pct >= 100 ? 'green' : pct >= 70 ? 'blue' : pct >= 50 ? 'yellow' : 'red'}
                />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
