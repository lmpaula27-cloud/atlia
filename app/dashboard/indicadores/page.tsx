'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Plus, TrendingUp, TrendingDown, Filter, BarChart3, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const indicadores = [
  { id:'1',  nome:'Taxa de cobertura vacinação infantil',        secretaria:'Saúde',        unidade:'%',    meta:95,   atual:88,   status:'atencao',  periodicidade:'Mensal'     },
  { id:'2',  nome:'Índice de alfabetização — 3º ano EF',         secretaria:'Educação',     unidade:'%',    meta:90,   atual:94,   status:'no_prazo', periodicidade:'Anual'      },
  { id:'3',  nome:'Km de vias pavimentadas (acumulado)',          secretaria:'Obras',        unidade:'km',   meta:120,  atual:87,   status:'atencao',  periodicidade:'Trimestral' },
  { id:'4',  nome:'Tempo médio de espera em UBS',                secretaria:'Saúde',        unidade:'min',  meta:30,   atual:48,   status:'critico',  periodicidade:'Mensal'     },
  { id:'5',  nome:'Empregos formais gerados',                    secretaria:'Trabalho',     unidade:'empr', meta:2000, atual:1420, status:'atencao',  periodicidade:'Trimestral' },
  { id:'6',  nome:'Cobertura de coleta seletiva por bairros',    secretaria:'Meio Amb.',    unidade:'%',    meta:80,   atual:65,   status:'atencao',  periodicidade:'Mensal'     },
  { id:'7',  nome:'Nota de satisfação serviços digitais (1–5)',  secretaria:'Adm. Digital', unidade:'pts',  meta:4.5,  atual:4.7,  status:'no_prazo', periodicidade:'Mensal'     },
  { id:'8',  nome:'Receita própria per capita',                  secretaria:'Finanças',     unidade:'R$',   meta:1800, atual:1920, status:'no_prazo', periodicidade:'Anual'      },
  { id:'9',  nome:'Crianças matriculadas em tempo integral',     secretaria:'Educação',     unidade:'%',    meta:60,   atual:54,   status:'atencao',  periodicidade:'Semestral'  },
  { id:'10', nome:'Índice de arrecadação de ISSQN',              secretaria:'Finanças',     unidade:'%',    meta:100,  atual:92,   status:'atencao',  periodicidade:'Mensal'     },
  { id:'11', nome:'Leitos de UTI por 10 mil hab.',               secretaria:'Saúde',        unidade:'lts',  meta:2.5,  atual:1.8,  status:'critico',  periodicidade:'Anual'      },
  { id:'12', nome:'Obras entregues no prazo',                    secretaria:'Obras',        unidade:'%',    meta:75,   atual:62,   status:'atencao',  periodicidade:'Trimestral' },
]

const secretariasOpts = ['Todas', ...Array.from(new Set(indicadores.map(i => i.secretaria)))]

function formatValue(v: number, unidade: string) {
  if (unidade === 'R$') return `R$ ${v.toLocaleString('pt-BR')}`
  if (unidade === 'pts') return v.toFixed(1)
  return `${v.toLocaleString('pt-BR')} ${unidade}`
}

// Para o gráfico: menor é melhor quando unidade é 'min'
function calcPct(atual: number, meta: number, unidade: string) {
  if (unidade === 'min') return Math.round((meta / atual) * 100) // menor é melhor
  return Math.min(150, Math.round((atual / meta) * 100))
}

export default function IndicadoresPage() {
  const [filtroSec, setFiltroSec] = useState('Todas')

  const filtrados = filtroSec === 'Todas'
    ? indicadores
    : indicadores.filter(i => i.secretaria === filtroSec)

  const acimaMeta  = filtrados.filter(i => calcPct(i.atual, i.meta, i.unidade) >= 100).length
  const atencao    = filtrados.filter(i => { const p = calcPct(i.atual, i.meta, i.unidade); return p >= 70 && p < 100 }).length
  const critico    = filtrados.filter(i => calcPct(i.atual, i.meta, i.unidade) < 70).length

  // Dados para gráfico: % atingimento por indicador
  const dadosGrafico = filtrados.slice(0, 8).map(i => ({
    nome: i.nome.length > 28 ? i.nome.slice(0, 28) + '…' : i.nome,
    pct: calcPct(i.atual, i.meta, i.unidade),
    fill: calcPct(i.atual, i.meta, i.unidade) >= 100 ? '#70AD47'
        : calcPct(i.atual, i.meta, i.unidade) >= 70  ? '#FFC000'
        : '#C00000',
  }))

  return (
    <div className="flex flex-col flex-1">
      <Header title="Indicadores de Desempenho" subtitle="Monitoramento de KPIs estratégicos por secretaria" />

      <div className="p-8 space-y-6">

        {/* Resumo + filtro */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle2 size={16} className="text-atlia-green" />
              <div>
                <p className="text-xl font-bold text-atlia-green">{acimaMeta}</p>
                <p className="text-xs text-green-700">Acima da meta</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <AlertTriangle size={16} className="text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-700">{atencao}</p>
                <p className="text-xs text-yellow-700">Em atenção</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <XCircle size={16} className="text-atlia-red" />
              <div>
                <p className="text-xl font-bold text-atlia-red">{critico}</p>
                <p className="text-xs text-red-700">Críticos</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-atlia-muted" />
            <select value={filtroSec} onChange={e => setFiltroSec(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none">
              {secretariasOpts.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <Plus size={15} />
            Novo Indicador
          </button>
        </div>

        {/* Gráfico de atingimento */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-atlia-blue" />
            <h3 className="font-semibold text-atlia-navy text-sm">% de Atingimento das Metas</h3>
            <span className="text-xs text-atlia-muted ml-1">(linha = 100% = meta)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dadosGrafico} barSize={28} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis dataKey="nome" tick={{ fontSize: 10, fill: '#6B7280' }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 140]} />
              <Tooltip
                formatter={(v: number) => [`${v}%`, 'Atingimento']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
              />
              <ReferenceLine y={100} stroke="#1F3864" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Meta', position: 'right', fontSize: 10, fill: '#1F3864' }} />
              <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                {dadosGrafico.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cards de indicadores */}
        <div className="grid grid-cols-2 gap-5">
          {filtrados.map((ind) => {
            const pct = calcPct(ind.atual, ind.meta, ind.unidade)
            const acima = pct >= 100
            const corBarra = pct >= 100 ? 'green' as const : pct >= 70 ? 'yellow' as const : 'red' as const
            return (
              <div key={ind.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <p className="font-medium text-gray-800 text-sm leading-tight">{ind.nome}</p>
                    <p className="text-xs text-atlia-muted mt-0.5">{ind.secretaria} • {ind.periodicidade}</p>
                  </div>
                  <StatusBadge status={ind.status} />
                </div>

                <div className="flex items-end gap-5 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-atlia-navy">
                      {formatValue(ind.atual, ind.unidade)}
                    </p>
                    <p className="text-xs text-atlia-muted">Valor atual</p>
                  </div>
                  <div className="pb-0.5">
                    <p className="text-sm font-medium text-gray-400">
                      Meta: <span className="text-gray-600">{formatValue(ind.meta, ind.unidade)}</span>
                    </p>
                  </div>
                  <div className="ml-auto pb-0.5 flex items-center gap-1">
                    {acima
                      ? <TrendingUp  size={15} className="text-atlia-green" />
                      : <TrendingDown size={15} className="text-atlia-red" />
                    }
                    <span className={`text-sm font-bold ${acima ? 'text-atlia-green' : 'text-atlia-red'}`}>
                      {pct}%
                    </span>
                  </div>
                </div>

                <ProgressBar value={Math.min(pct, 100)} color={corBarra} />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
