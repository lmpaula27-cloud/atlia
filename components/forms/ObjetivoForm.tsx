'use client'
import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface ObjetivoEditavel {
  id?: string
  nome: string
  descricao: string
  eixo_id: string
  pct_atual: number
  peso: number
}

interface Props {
  objetivoInicial?: ObjetivoEditavel
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function ObjetivoForm({ objetivoInicial, onSuccess, onCancelar }: Props) {
  const editando = !!objetivoInicial?.id

  const [nome,      setNome]      = useState(objetivoInicial?.nome      ?? '')
  const [descricao, setDescricao] = useState(objetivoInicial?.descricao ?? '')
  const [eixoId,    setEixoId]    = useState(objetivoInicial?.eixo_id   ?? '')
  const [pctAtual,  setPctAtual]  = useState(objetivoInicial?.pct_atual ?? 0)
  const [peso,      setPeso]      = useState(objetivoInicial?.peso      ?? 1)

  const [eixos,          setEixos]          = useState<{ id: string; nome: string; cor: string }[]>([])
  const [carregandoOpts, setCarregandoOpts] = useState(true)
  const [salvando,       setSalvando]       = useState(false)
  const [erro,           setErro]           = useState('')

  useEffect(() => {
    async function carregar() {
      const supabase = createClient()
      const { data } = await supabase.from('eixos').select('id, nome, cor').order('ordem')
      setEixos(data ?? [])
      setCarregandoOpts(false)
    }
    carregar()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) { setErro('O nome do objetivo é obrigatório.'); return }
    if (!eixoId) { setErro('Selecione o eixo estratégico.'); return }

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
      eixo_id:      eixoId,
      pct_atual:    pctAtual,
      peso:         peso,
    }

    let erroMsg: string | null = null
    if (editando && objetivoInicial?.id) {
      const { error } = await supabase.from('objetivos').update(dados).eq('id', objetivoInicial.id)
      erroMsg = error?.message ?? null
    } else {
      const { error } = await supabase.from('objetivos').insert(dados)
      erroMsg = error?.message ?? null
    }

    setSalvando(false)
    if (erroMsg) setErro(erroMsg)
    else onSuccess(editando ? 'Objetivo atualizado!' : 'Objetivo criado com sucesso!')
  }

  const eixoSelecionado = eixos.find(e => e.id === eixoId)

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Identificação</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nome do objetivo <span className="text-red-500">*</span></label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Ampliar cobertura de saneamento básico" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Descrição</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)}
              placeholder="Contexto e impacto esperado..." rows={3}
              className={inputCls + ' resize-none'} />
          </div>
          <div>
            <label className={labelCls}>Eixo estratégico <span className="text-red-500">*</span></label>
            <select value={eixoId} onChange={e => setEixoId(e.target.value)}
              disabled={carregandoOpts} className={inputCls + ' bg-white'}>
              <option value="">— Selecionar eixo —</option>
              {eixos.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.nome}</option>
              ))}
            </select>
            {eixoSelecionado && (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: eixoSelecionado.cor }} />
                <span className="text-xs text-atlia-muted">{eixoSelecionado.nome}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Progresso e peso</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>
              Percentual atual:&nbsp;
              <span className="font-bold text-atlia-blue">{pctAtual}%</span>
            </label>
            <input type="range" min={0} max={100} step={1}
              value={pctAtual} onChange={e => setPctAtual(Number(e.target.value))}
              className="w-full accent-atlia-blue" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Peso deste objetivo na visão do município</label>
            <input type="number" min={1} value={peso}
              onChange={e => setPeso(Math.max(1, Number(e.target.value)))}
              className={inputCls} />
            <p className="text-xs text-atlia-muted mt-1">
              Quanto maior o peso, mais este objetivo influencia o atingimento geral da visão.
            </p>
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
            : <><Save size={15} />{editando ? 'Salvar alterações' : 'Criar objetivo'}</>
          }
        </button>
      </div>
    </form>
  )
}
