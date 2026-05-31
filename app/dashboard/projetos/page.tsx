'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Search, Plus, Filter, FolderKanban } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

type TipoGanho = 'N/A' | 'Operacional' | 'Financeiro' | 'Econômico'
type Prioridade = 'alta' | 'media' | 'baixa'

interface Projeto {
  id: string
  nome: string
  secretaria: string
  responsavel: string
  status: string
  prioridade: Prioridade
  tipoGanho: TipoGanho
  pct: number
  dataFim: string
  orcamento: number
  executado: number
}

const projetos: Projeto[] = [
  { id:'1',  nome:'Recapeamento Asfáltico — Zona Norte',      secretaria:'Obras',       responsavel:'João Silva',    status:'em_andamento', prioridade:'alta',  tipoGanho:'Operacional', pct:68,  dataFim:'30/08/2026', orcamento:2800000, executado:1900000 },
  { id:'2',  nome:'UBS Jardim das Palmeiras',                  secretaria:'Saúde',       responsavel:'Maria Souza',   status:'atencao',      prioridade:'alta',  tipoGanho:'Operacional', pct:32,  dataFim:'15/06/2026', orcamento:1500000, executado:480000  },
  { id:'3',  nome:'Sistema de Monitoramento Escolar',          secretaria:'Educação',    responsavel:'Carlos Lima',   status:'em_andamento', prioridade:'media', tipoGanho:'Econômico',   pct:81,  dataFim:'15/12/2026', orcamento:420000,  executado:340000  },
  { id:'4',  nome:'Revitalização da Praça Central',            secretaria:'Urbanismo',   responsavel:'Ana Costa',     status:'atrasado',     prioridade:'alta',  tipoGanho:'N/A',         pct:15,  dataFim:'01/04/2026', orcamento:680000,  executado:102000  },
  { id:'5',  nome:'Programa Emprego e Renda 2026',             secretaria:'Trabalho',    responsavel:'Pedro Rocha',   status:'em_andamento', prioridade:'media', tipoGanho:'Econômico',   pct:55,  dataFim:'31/12/2026', orcamento:350000,  executado:192500  },
  { id:'6',  nome:'Pavimentação Distrito Industrial',          secretaria:'Obras',       responsavel:'João Silva',    status:'nao_iniciado', prioridade:'baixa', tipoGanho:'Econômico',   pct:0,   dataFim:'30/11/2026', orcamento:1200000, executado:0       },
  { id:'7',  nome:'Ampliação do CRAS Norte',                   secretaria:'Assistência', responsavel:'Lucia Alves',   status:'em_andamento', prioridade:'alta',  tipoGanho:'Operacional', pct:47,  dataFim:'30/09/2026', orcamento:280000,  executado:131600  },
  { id:'8',  nome:'Iluminação LED — Centro Histórico',         secretaria:'Urbanismo',   responsavel:'Ana Costa',     status:'concluido',    prioridade:'media', tipoGanho:'Financeiro',  pct:100, dataFim:'15/03/2026', orcamento:520000,  executado:498000  },
  { id:'9',  nome:'Ciclovia Avenida João Naves',               secretaria:'Obras',       responsavel:'Marcos Pinto',  status:'em_andamento', prioridade:'media', tipoGanho:'Operacional', pct:62,  dataFim:'30/10/2026', orcamento:780000,  executado:483600  },
  { id:'10', nome:'Reforma da Escola Municipal Bom Jesus',     secretaria:'Educação',    responsavel:'Carlos Lima',   status:'atencao',      prioridade:'alta',  tipoGanho:'Operacional', pct:40,  dataFim:'30/07/2026', orcamento:310000,  executado:124000  },
  { id:'11', nome:'UPA Zona Sul — Ampliação',                  secretaria:'Saúde',       responsavel:'Maria Souza',   status:'atrasado',     prioridade:'alta',  tipoGanho:'Operacional', pct:20,  dataFim:'01/05/2026', orcamento:2100000, executado:420000  },
  { id:'12', nome:'Parque Linear Córrego São Pedro',           secretaria:'Meio Amb.',   responsavel:'Rita Ferreira', status:'em_andamento', prioridade:'media', tipoGanho:'N/A',         pct:55,  dataFim:'28/02/2027', orcamento:460000,  executado:253000  },
  { id:'13', nome:'Portal de Transparência Municipal',         secretaria:'Adm. Digital',responsavel:'Fábio Torres',  status:'concluido',    prioridade:'alta',  tipoGanho:'Econômico',   pct:100, dataFim:'31/01/2026', orcamento:95000,   executado:91000   },
  { id:'14', nome:'Plano de Arborização Urbana',               secretaria:'Meio Amb.',   responsavel:'Rita Ferreira', status:'nao_iniciado', prioridade:'baixa', tipoGanho:'N/A',         pct:0,   dataFim:'31/12/2026', orcamento:180000,  executado:0       },
  { id:'15', nome:'Modernização do Mercado Municipal',         secretaria:'Urbanismo',   responsavel:'Ana Costa',     status:'atencao',      prioridade:'alta',  tipoGanho:'Econômico',   pct:38,  dataFim:'30/06/2026', orcamento:640000,  executado:243200  },
]

const secretarias = ['Todas', 'Obras', 'Saúde', 'Educação', 'Urbanismo', 'Trabalho', 'Assistência', 'Meio Amb.', 'Adm. Digital']
const statusOpts  = ['Todos', 'em_andamento', 'atencao', 'atrasado', 'nao_iniciado', 'concluido']
const tiposGanho: TipoGanho[] = ['N/A', 'Operacional', 'Financeiro', 'Econômico']

const tipoGanhoStyle: Record<TipoGanho, string> = {
  'N/A':         'bg-gray-100 text-gray-500',
  'Operacional': 'bg-blue-50 text-blue-700',
  'Financeiro':  'bg-green-50 text-green-700',
  'Econômico':   'bg-amber-50 text-amber-700',
}

const prioridadeStyle: Record<Prioridade, string> = {
  alta:  'bg-red-50 text-red-600',
  media: 'bg-yellow-50 text-yellow-700',
  baixa: 'bg-gray-50 text-gray-500',
}

const prioridadeLabel: Record<Prioridade, string> = {
  alta: 'Alta', media: 'Média', baixa: 'Baixa',
}

export default function ProjetosPage() {
  const [busca, setBusca]         = useState('')
  const [secretaria, setSecretaria] = useState('Todas')
  const [status, setStatus]       = useState('Todos')
  const [tipoGanho, setTipoGanho] = useState<TipoGanho | 'Todos'>('Todos')

  const filtrados = projetos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       p.secretaria.toLowerCase().includes(busca.toLowerCase())
    const matchSec   = secretaria === 'Todas' || p.secretaria === secretaria
    const matchSt    = status === 'Todos' || p.status === status
    const matchTipo  = tipoGanho === 'Todos' || p.tipoGanho === tipoGanho
    return matchBusca && matchSec && matchSt && matchTipo
  })

  const orcamentoTotal  = filtrados.reduce((s, p) => s + p.orcamento,  0)
  const executadoTotal  = filtrados.reduce((s, p) => s + p.executado, 0)
  const pctExecucao     = orcamentoTotal > 0 ? Math.round((executadoTotal / orcamentoTotal) * 100) : 0

  return (
    <div className="flex flex-col flex-1">
      <Header title="Projetos" subtitle={`${projetos.length} projetos na carteira`} />

      <div className="p-8 space-y-5">

        {/* Barra de resumo */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total na carteira',   value: projetos.length,     color: 'text-atlia-navy' },
            { label: 'Em andamento',        value: projetos.filter(p => p.status === 'em_andamento').length, color: 'text-atlia-green' },
            { label: 'Requerem atenção',    value: projetos.filter(p => p.status === 'atencao' || p.status === 'atrasado').length, color: 'text-atlia-red' },
            { label: `Execução orçamentária (filtrados)`, value: `${pctExecucao}%`, color: 'text-atlia-blue' },
          ].map(s => (
            <div key={s.label} className="card py-4 px-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-atlia-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
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

          <button className="btn-primary flex items-center gap-2 ml-auto">
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-atlia-muted">
                    <FolderKanban size={32} className="mx-auto mb-2 opacity-30" />
                    Nenhum projeto encontrado
                  </td>
                </tr>
              ) : filtrados.map(p => (
                <tr key={p.id} className="hover:bg-atlia-gray/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 shrink-0 text-xs px-1.5 py-0.5 rounded font-semibold uppercase ${prioridadeStyle[p.prioridade]}`}>
                        {prioridadeLabel[p.prioridade]}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800 leading-snug">{p.nome}</p>
                        <p className="text-xs text-atlia-muted mt-0.5">{p.responsavel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{p.secretaria}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoGanhoStyle[p.tipoGanho]}`}>
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
                </tr>
              ))}
            </tbody>
          </table>

          {filtrados.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-atlia-gray/50 flex items-center justify-between">
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
    </div>
  )
}
