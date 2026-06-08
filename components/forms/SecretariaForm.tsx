'use client'
import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface SecretariaEditavel {
  id?: string
  nome: string
  sigla: string
  responsavel: string
  cor: string
  ativa: boolean
}

interface Props {
  secretariaInicial?: SecretariaEditavel
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

const coresSugeridas = [
  '#1F3864', '#C00000', '#2E75B6', '#70AD47',
  '#FFC000', '#538135', '#7030A0', '#843C0C',
  '#0070C0', '#FF6600', '#197A3E', '#C07B00',
]

export default function SecretariaForm({ secretariaInicial, onSuccess, onCancelar }: Props) {
  const editando = !!secretariaInicial?.id

  const [nome,        setNome]        = useState(secretariaInicial?.nome        ?? '')
  const [sigla,       setSigla]       = useState(secretariaInicial?.sigla       ?? '')
  const [responsavel, setResponsavel] = useState(secretariaInicial?.responsavel ?? '')
  const [cor,         setCor]         = useState(secretariaInicial?.cor         ?? '#2E75B6')
  const [ativa,       setAtiva]       = useState(secretariaInicial?.ativa       ?? true)

  const [salvando, setSalvando] = useState(false)
  const [erro,     setErro]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) { setErro('O nome da secretaria é obrigatório.'); return }

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
      sigla:        sigla.trim() || null,
      responsavel:  responsavel.trim() || null,
      cor,
      ativa,
    }

    let erroMsg: string | null = null
    if (editando && secretariaInicial?.id) {
      const { error } = await supabase.from('secretarias').update(dados).eq('id', secretariaInicial.id)
      erroMsg = error?.message ?? null
    } else {
      const { error } = await supabase.from('secretarias').insert(dados)
      erroMsg = error?.message ?? null
    }

    setSalvando(false)
    if (erroMsg) setErro(erroMsg)
    else onSuccess(editando ? 'Secretaria atualizada!' : 'Secretaria criada com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Identificação</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nome completo <span className="text-red-500">*</span></label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Secretaria Municipal de Educação" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Sigla</label>
              <input type="text" value={sigla} onChange={e => setSigla(e.target.value)}
                placeholder="Ex.: SME" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Responsável</label>
              <input type="text" value={responsavel} onChange={e => setResponsavel(e.target.value)}
                placeholder="Nome do secretário(a)" className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Aparência</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Cor identificadora</label>
            <div className="flex items-center gap-3 flex-wrap">
              {coresSugeridas.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${cor === c ? 'border-atlia-navy scale-125' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <div className="flex items-center gap-2 ml-2">
                <input
                  type="color"
                  value={cor}
                  onChange={e => setCor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200"
                />
                <span className="text-xs text-atlia-muted font-mono">{cor}</span>
              </div>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className="relative">
                <input type="checkbox" checked={ativa} onChange={e => setAtiva(e.target.checked)} className="sr-only" />
                <div className={`w-10 h-6 rounded-full transition-colors ${ativa ? 'bg-atlia-blue' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${ativa ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">Secretaria ativa</span>
            </label>
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
            : <><Save size={15} />{editando ? 'Salvar alterações' : 'Criar secretaria'}</>
          }
        </button>
      </div>
    </form>
  )
}
