'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Search, Plus, Filter, FolderKanban } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const projetos = [
  { id:'1', nome:'Recapeamento Asfáltico — Zona Norte',  secretaria:'Obras',     responsavel:'João Silva',    status:'em_andamento', prioridade:'alta',  pct:68, dataFim:'30/08/2026', orcamento:2800000, executado:1900000 },
  { id:'2', nome:'UBS Jardim das Palmeiras',             secretaria:'Saúde',     responsavel:'Maria Souza',   status:'atencao',      prioridade:'alta',  pct:32, dataFim:'15/06/2026', orcamento:1500000, executado:480000  },
  { id:'3', nome:'Sistema de Monitoramento Escolar',     secretaria:'Educação',  responsavel:'Carlos Lima',   status:'em_andamento', prioridade:'media', pct:81, dataFim:'15/12/2026', orcamento:420000,  executado:340000  },
  { id:'4', nome:'Revitalização da Praça Central',       secretaria:'Urbanismo', responsavel:'Ana Costa',     status:'atrasado',     prioridade:'alta',  pct:15, dataFim:'01/04/2026', orcamento:680000,  executado:102000  },
  { id:'5', nome:'Programa Emprego e Renda 2026',        secretaria:'Trabalho',  responsavel:'Pedro Rocha',   status:'em_andamento', prioridade:'media', pct:55, dataFim:'31/12/2026', orcamento:350000,  executado:192500  },
  { id:'6', nome:'Pavimentação Distrito Industrial',     secretaria:'Obras',     responsavel:'João Silva',    status:'nao_iniciado', prioridade:'baixa', pct:0,  dataFim:'30/11/2026', orcamento:1200000, executado:0       },
  { id:'7', nome:'Ampliação do CRAS Norte',              secretaria:'Assistência',responsavel:'Lucia Alves',  status:'em_andamento', prioridade:'alta',  pct:47, dataFim:'30/09/2026', orcamento:280000,  executado:131600  },
  { id:'8', nome:'Iluminação LED — Centro Histórico',    secretaria:'Urbanismo', responsavel:'Ana Costa',     status:'concluido',    prioridade:'media', pct:100,dataFim:'15/03/2026', orcamento:520000,  executado:498000  },
]

const secretarias = ['Todas', 'Obras', 'Saúde', 'Educação', 'Urbanismo', 'Trabalho', 'Assistência']
const statusOpts  = ['Todos', 'em_andamento', 'atencao', 'atrasado', 'nao_iniciado', 'concluido']

export default function ProjetosPage() {
  const [busca, setBusca]         = useState('')
  const [secretaria, setSecretaria] = useState('Todas')
  const [status, setStatus]       = useState('Todos')

  const filtrados = projetos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       p.secretaria.toLowerCase().includes(busca.toLowerCase())
    const matchSec   = secretaria === 'Todas' || p.secretaria === secretaria
    const matchSt    = status === 'Todos' || p.status === status
    return matchBusca && matchSec && matchSt
  })

  return (
    <div className="flex flex-col flex-1">
      <Header title="Projetos" subtitle={`${projetos.length} projetos na carteira`} />

      <div className="p-8 space-y-6">

        {/* Filtros */}
        <div className="card flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-atlia-gray rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={16} className="text-atlia-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-atlia-muted"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-atlia-muted" />
            <select
              value={secretaria}
              onChange={e => setSecretaria(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
            >
              {secretarias.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none"
          >
            {statusOpts.map(s => (
              <option key={s} value={s}>{s === 'Todos' ? 'Todos os status' : s.replace('_',' ')}</option>
            ))}
          </select>

          <button className="btn-primary flex items-center gap-2 ml-auto">
            <Plus size={16} />
            Novo Projeto
          </button>
        </div>

        {/* Tabela */}
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-atlia-gray">
                <th className="text-left px-6 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Projeto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Secretaria</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider w-36">Progresso</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Prazo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Orçamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-atlia-muted">
                    <FolderKanban size={32} className="mx-auto mb-2 opacity-30" />
                    Nenhum projeto encontrado
                  </td>
                </tr>
              ) : filtrados.map(p => (
                <tr key={p.id} className="hover:bg-atlia-gray/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{p.nome}</p>
                    <p className="text-xs text-atlia-muted mt-0.5">{p.responsavel}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-600">{p.secretaria}</span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        value={p.pct}
                        color={p.status === 'atrasado' ? 'red' : p.status === 'atencao' ? 'yellow' : 'green'}
                        className="w-24"
                      />
                      <span className="text-xs text-atlia-muted w-8">{p.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{p.dataFim}</td>
                  <td className="px-4 py-4">
                    <p className="text-gray-800">{formatCurrency(p.orcamento)}</p>
                    <p className="text-xs text-atlia-muted">{formatCurrency(p.executado)} executado</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
