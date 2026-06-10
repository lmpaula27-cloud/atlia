'use client'
import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface MedicaoEditavel {
  id?: string
  mes: number
  ano: number
  valor: number
}

interface Props {
  medicaoInicial?: MedicaoEditavel
  indicadorId: string
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls  = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls  = 'block text-sm font-medium text-gray-700 mb-1.5'
const selectCls = `${inputCls} bg-white cursor-pointer`

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

const ANO_ATUAL = new Date().getFullYear()

export default function MedicaoForm({ medicaoInicial, indicadorId, onSuccess, onCancelar }: Props) {
  const editando = !!medicaoInicial?.id

  const [mes,     setMes]     = useState(medicaoInicial?.mes   ?? new Date().getMonth() + 1)
  const [ano,     setAno]     = useState(medicaoInicial?.ano   ?? ANO_ATUAL)
  const [valor,   setValor]   = useState(medicaoInicial?.valor?.toString() ?? '')
  const [salvando,setSalvando]= useState(false)
  const [erro,    setErro]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const num = parseFloat(valor.replace(',', '.'))
    if (isNaN(num)) { setErro('Informe um valor numérico válido.'); return }
    setSalvando(true)
    setErro('')

    const supabase = createClient()
    let error

    if (editando) {
      ;({ error } = await supabase
        .from('medicoes_indicadores')
        .update({ mes, ano, valor: num })
        .eq('id', medicaoInicial!.id!))
    } else {
      // upsert: se já existir (mesmo indicador + mes + ano) atualiza o valor
      ;({ error } = await supabase
        .from('medicoes_indicadores')
        .upsert(
          { indicador_id: indicadorId, mes, ano, valor: num },
          { onConflict: 'indicador_id,mes,ano' }
        ))
    }

    if (error) {
      setErro('Erro ao salvar. Tente novamente.')
      setSalvando(false)
      return
    }

    onSuccess(editando ? 'Medição atualizada.' : 'Medição registrada.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Mês + Ano */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Mês <span className="text-red-500">*</span></label>
          <select className={selectCls} value={mes} onChange={e => setMes(Number(e.target.value))}>
            {MESES.map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Ano <span className="text-red-500">*</span></label>
          <input
            type="number"
            min={2020} max={2100}
            className={inputCls}
            value={ano}
            onChange={e => setAno(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Valor */}
      <div>
        <label className={labelCls}>Valor medido <span className="text-red-500">*</span></label>
        <input
          className={inputCls}
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="Ex: 87.5"
          inputMode="decimal"
        />
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
          {editando ? 'Salvar alteração' : 'Registrar medição'}
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
