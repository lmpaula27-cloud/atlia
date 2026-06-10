'use client'
import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface MarcoEditavel {
  id?: string
  titulo: string
  descricao: string
  status: 'pendente' | 'em_andamento' | 'concluido' | 'atrasado'
  pct: number
  data_prevista: string
  data_conclusao: string
  ordem: number
}

interface Props {
  marcoInicial?: MarcoEditavel
  projetoId: string
  ordemSugerida?: number
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls  = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls  = 'block text-sm font-medium text-gray-700 mb-1.5'
const selectCls = `${inputCls} bg-white cursor-pointer`

const STATUS_OPTS = [
  { value: 'pendente',     label: 'Pendente'     },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido',    label: 'Concluído'    },
  { value: 'atrasado',     label: 'Atrasado'     },
]

export default function MarcoForm({ marcoInicial, projetoId, ordemSugerida = 1, onSuccess, onCancelar }: Props) {
  const editando = !!marcoInicial?.id

  const [titulo,       setTitulo]       = useState(marcoInicial?.titulo        ?? '')
  const [descricao,    setDescricao]    = useState(marcoInicial?.descricao     ?? '')
  const [status,       setStatus]       = useState<MarcoEditavel['status']>(marcoInicial?.status ?? 'pendente')
  const [pct,          setPct]          = useState(marcoInicial?.pct           ?? 0)
  const [dataPrevista, setDataPrevista] = useState(marcoInicial?.data_prevista ?? '')
  const [dataConclusao,setDataConclusao]= useState(marcoInicial?.data_conclusao ?? '')
  const [ordem,        setOrdem]        = useState(marcoInicial?.ordem         ?? ordemSugerida)
  const [salvando,     setSalvando]     = useState(false)
  const [erro,         setErro]         = useState('')

  // Quando muda para concluído: pct → 100. Quando muda para pendente: pct → 0
  useEffect(() => {
    if (status === 'concluido') setPct(100)
    if (status === 'pendente')  setPct(0)
  }, [status])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!titulo.trim()) { setErro('Informe o título do marco.'); return }
    setSalvando(true)
    setErro('')

    const supabase = createClient()
    const payload = {
      titulo:         titulo.trim(),
      descricao:      descricao.trim() || null,
      status,
      pct:            status === 'concluido' ? 100 : status === 'pendente' ? 0 : pct,
      data_prevista:  dataPrevista  || null,
      data_conclusao: status === 'concluido' && dataConclusao ? dataConclusao : null,
      ordem,
    }

    let error
    if (editando) {
      ;({ error } = await supabase.from('marcos').update(payload).eq('id', marcoInicial!.id!))
    } else {
      ;({ error } = await supabase.from('marcos').insert({ ...payload, projeto_id: projetoId }))
    }

    if (error) {
      setErro('Erro ao salvar. Tente novamente.')
      setSalvando(false)
      return
    }

    onSuccess(editando ? 'Marco atualizado com sucesso.' : 'Marco criado com sucesso.')
  }

  const mostrarPct        = status === 'em_andamento' || status === 'atrasado'
  const mostrarConclusao  = status === 'concluido'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Título */}
      <div>
        <label className={labelCls}>Título <span className="text-red-500">*</span></label>
        <input
          className={inputCls}
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Ex: Entrega do projeto executivo"
        />
      </div>

      {/* Descrição */}
      <div>
        <label className={labelCls}>Descrição</label>
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          placeholder="Detalhe o que será entregue neste marco…"
        />
      </div>

      {/* Status + Ordem */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Status</label>
          <select className={selectCls} value={status} onChange={e => setStatus(e.target.value as MarcoEditavel['status'])}>
            {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Ordem</label>
          <input
            type="number"
            min={1}
            className={inputCls}
            value={ordem}
            onChange={e => setOrdem(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Progresso — só exibe se em_andamento ou atrasado */}
      {mostrarPct && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelCls + ' mb-0'}>Progresso</label>
            <span className="text-sm font-bold text-atlia-blue">{pct}%</span>
          </div>
          <input
            type="range" min={0} max={100} step={5}
            className="w-full accent-atlia-blue"
            value={pct}
            onChange={e => setPct(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-atlia-muted mt-1">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>
      )}

      {/* Datas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Data prevista</label>
          <input
            type="date"
            className={inputCls}
            value={dataPrevista}
            onChange={e => setDataPrevista(e.target.value)}
          />
        </div>
        {mostrarConclusao && (
          <div>
            <label className={labelCls}>Data de conclusão</label>
            <input
              type="date"
              className={inputCls}
              value={dataConclusao}
              onChange={e => setDataConclusao(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Erro */}
      {erro && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{erro}</p>
      )}

      {/* Ações */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={salvando}
          className="flex-1 flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-atlia-navy/90 transition-colors disabled:opacity-70 text-sm"
        >
          {salvando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {editando ? 'Salvar alterações' : 'Criar marco'}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
