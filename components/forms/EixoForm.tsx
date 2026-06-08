'use client'
import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface EixoEditavel {
  id?: string
  nome: string
  descricao: string
  cor: string
  ordem: number
}

interface Props {
  eixoInicial?: EixoEditavel
  ordemSugerida?: number
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

const coresSugeridas = [
  '#1F3864', '#C00000', '#2E75B6', '#70AD47',
  '#FFC000', '#538135', '#7030A0', '#E36C09',
]

export default function EixoForm({ eixoInicial, ordemSugerida = 1, onSuccess, onCancelar }: Props) {
  const editando = !!eixoInicial?.id

  const [nome,      setNome]      = useState(eixoInicial?.nome      ?? '')
  const [descricao, setDescricao] = useState(eixoInicial?.descricao ?? '')
  const [cor,       setCor]       = useState(eixoInicial?.cor       ?? '#1F3864')
  const [ordem,     setOrdem]     = useState(eixoInicial?.ordem     ?? ordemSugerida)

  const [salvando, setSalvando] = useState(false)
  const [erro,     setErro]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) { setErro('O nome do eixo é obrigatório.'); return }

    setSalvando(true)
    setErro('')

    const supabase = createClient()
    const { data: municipio } = await supabase.from('municipios').select('id').single()

    if (!municipio) {
      setErro('Não foi possível identificar o município.')
      setSalvando(false)
      return
    }

    const dados = {
      municipio_id: municipio.id,
      nome:         nome.trim(),
      descricao:    descricao.trim() || null,
      cor,
      ordem,
    }

    let erroMsg: string | null = null
    if (editando && eixoInicial?.id) {
      const { error } = await supabase.from('eixos').update(dados).eq('id', eixoInicial.id)
      erroMsg = error?.message ?? null
    } else {
      const { error } = await supabase.from('eixos').insert(dados)
      erroMsg = error?.message ?? null
    }

    setSalvando(false)
    if (erroMsg) setErro(erroMsg)
    else onSuccess(editando ? 'Eixo atualizado!' : 'Eixo criado com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Identificação</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nome do eixo <span className="text-red-500">*</span></label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Uberlândia Sustentável" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Descrição</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)}
              placeholder="Descreva o foco estratégico deste eixo..." rows={3}
              className={inputCls + ' resize-none'} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Ordem de exibição</label>
              <input type="number" min={1} max={20} value={ordem}
                onChange={e => setOrdem(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cor</label>
              <div className="flex items-center gap-2 flex-wrap">
                {coresSugeridas.map(c => (
                  <button key={c} type="button" onClick={() => setCor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${cor === c ? 'border-atlia-navy scale-125' : 'border-transparent hover:scale-110'}`}
                    style={{ backgroundColor: c }} />
                ))}
                <input type="color" value={cor} onChange={e => setCor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">{erro}</div>
      )}

      <div className="flex gap-3 pt-2 pb-4">
        <button type="button" onClick={onCancelar}
          className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Cancelar
        </button>
        <button type="submit" disabled={salvando}
          className="flex-1 flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 rounded-lg hover:bg-atlia-blue transition-colors text-sm disabled:opacity-70">
          {salvando
            ? <><Loader2 size={15} className="animate-spin" />Salvando…</>
            : <><Save size={15} />{editando ? 'Salvar alterações' : 'Criar eixo'}</>
          }
        </button>
      </div>
    </form>
  )
}
