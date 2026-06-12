'use client'
import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export interface IndicadorEditavel {
  id?: string
  nome: string
  secretaria_id: string | null
  unidade: string
  meta: number
  valor_atual: number
  menor_melhor: boolean
  ano_referencia: number
}

interface Props {
  indicadorInicial?: IndicadorEditavel
  /** Se informado, bloqueia o campo secretaria (para gestores) */
  secretariaInicial?: string
  /** Gestor: restringe o select às secretarias com acesso; se houver só 1, o campo fica travado */
  secretariasPermitidas?: string[]
  onSuccess: (mensagem: string) => void
  onCancelar: () => void
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all placeholder-gray-400'
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5'

const unidadesComuns = ['%', 'un', 'km', 'R$', 'min', 'h', 'pts', 'empr', 'lts', 'hab']

export default function IndicadorForm({ indicadorInicial, secretariaInicial, secretariasPermitidas, onSuccess, onCancelar }: Props) {
  const editando = !!indicadorInicial?.id
  const anoAtual = new Date().getFullYear()

  // Secretaria travada: prop legada OU gestor com acesso a uma única secretaria
  const secretariaTravada: string | undefined =
    secretariaInicial ?? (secretariasPermitidas?.length === 1 ? secretariasPermitidas[0] : undefined)

  const [nome,           setNome]           = useState(indicadorInicial?.nome ?? '')
  const [secretariaId,   setSecretariaId]   = useState(indicadorInicial?.secretaria_id ?? secretariaTravada ?? '')
  const [unidade,        setUnidade]        = useState(indicadorInicial?.unidade ?? '%')
  const [unidadeCustom,  setUnidadeCustom]  = useState('')
  const [meta,           setMeta]           = useState(indicadorInicial?.meta ?? 0)
  const [valorAtual,     setValorAtual]     = useState(indicadorInicial?.valor_atual ?? 0)
  const [menorMelhor,    setMenorMelhor]    = useState(indicadorInicial?.menor_melhor ?? false)
  const [anoReferencia,  setAnoReferencia]  = useState(indicadorInicial?.ano_referencia ?? anoAtual)

  const [secretarias,    setSecretarias]    = useState<{ id: string; nome: string }[]>([])
  const [carregandoOpts, setCarregandoOpts] = useState(true)
  const [salvando,       setSalvando]       = useState(false)
  const [erro,           setErro]           = useState('')

  useEffect(() => {
    async function carregar() {
      const supabase = createClient()
      const { data } = await supabase.from('secretarias').select('id, nome').order('nome')
      setSecretarias(data ?? [])
      setCarregandoOpts(false)
    }
    carregar()
  }, [])

  // Unidade efetiva (custom ou da lista)
  const unidadeEfetiva = unidade === '__custom__' ? unidadeCustom.trim() : unidade

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) { setErro('O nome do indicador é obrigatório.'); return }
    if (!unidadeEfetiva) { setErro('Informe a unidade de medida.'); return }
    if (meta <= 0) { setErro('A meta deve ser maior que zero.'); return }

    setSalvando(true)
    setErro('')

    const supabase = createClient()

    const { data: municipio } = await supabase
      .from('municipios')
      .select('id')
      .single()

    if (!municipio) {
      setErro('Não foi possível identificar o município.')
      setSalvando(false)
      return
    }

    const dados = {
      municipio_id:   municipio.id,
      nome:           nome.trim(),
      secretaria_id:  secretariaId || null,
      unidade:        unidadeEfetiva,
      meta,
      valor_atual:    valorAtual,
      menor_melhor:   menorMelhor,
      ano_referencia: anoReferencia,
    }

    let erroMsg: string | null = null

    if (editando && indicadorInicial?.id) {
      const { error } = await supabase.from('indicadores').update(dados).eq('id', indicadorInicial.id)
      erroMsg = error?.message ?? null
    } else {
      const { error } = await supabase.from('indicadores').insert(dados)
      erroMsg = error?.message ?? null
    }

    setSalvando(false)

    if (erroMsg) {
      setErro(erroMsg)
    } else {
      onSuccess(editando ? 'Indicador atualizado!' : 'Indicador criado com sucesso!')
    }
  }

  // Calcula atingimento em tempo real para preview
  const pctPreview = meta > 0
    ? menorMelhor
      ? Math.round((meta / valorAtual) * 100)
      : Math.min(150, Math.round((valorAtual / meta) * 100))
    : 0

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

      {/* Identificação */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Identificação</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nome do indicador <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Taxa de cobertura vacinação infantil"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Secretaria responsável</label>
            <select
              value={secretariaId}
              onChange={e => setSecretariaId(e.target.value)}
              disabled={carregandoOpts || !!secretariaTravada}
              className={inputCls + ' bg-white' + (secretariaTravada ? ' opacity-70 cursor-not-allowed' : '')}
            >
              <option value="">— Selecionar secretaria —</option>
              {secretarias
                .filter(s => !secretariasPermitidas || secretariasPermitidas.includes(s.id))
                .map(s => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
            </select>
            {secretariaTravada && (
              <p className="text-xs text-atlia-muted mt-1">Fixado pela sua secretaria.</p>
            )}
            {!secretariaTravada && secretariasPermitidas && secretariasPermitidas.length > 1 && (
              <p className="text-xs text-atlia-muted mt-1">Exibindo apenas as secretarias sob sua gestão.</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Métricas */}
      <div>
        <p className="text-xs font-bold text-atlia-muted uppercase tracking-wider mb-4">Métricas</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Unidade de medida <span className="text-red-500">*</span></label>
              <select
                value={unidade}
                onChange={e => setUnidade(e.target.value)}
                className={inputCls + ' bg-white'}
              >
                {unidadesComuns.map(u => <option key={u} value={u}>{u}</option>)}
                <option value="__custom__">Outra…</option>
              </select>
              {unidade === '__custom__' && (
                <input
                  type="text"
                  value={unidadeCustom}
                  onChange={e => setUnidadeCustom(e.target.value)}
                  placeholder="Ex.: ton, MW, m²"
                  className={inputCls + ' mt-2'}
                />
              )}
            </div>
            <div>
              <label className={labelCls}>Ano de referência</label>
              <input
                type="number"
                min={2020} max={2035}
                value={anoReferencia}
                onChange={e => setAnoReferencia(Number(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Meta <span className="text-red-500">*</span></label>
              <input
                type="number"
                step="any"
                value={meta || ''}
                onChange={e => setMeta(Number(e.target.value))}
                placeholder="0"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Valor atual</label>
              <input
                type="number"
                step="any"
                value={valorAtual || ''}
                onChange={e => setValorAtual(Number(e.target.value))}
                placeholder="0"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={menorMelhor}
                  onChange={e => setMenorMelhor(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${menorMelhor ? 'bg-atlia-blue' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${menorMelhor ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Menor é melhor</span>
                <p className="text-xs text-gray-400">Ative para indicadores como tempo de espera, taxa de evasão etc.</p>
              </div>
            </label>
          </div>

          {/* Preview do atingimento */}
          {meta > 0 && valorAtual > 0 && (
            <div className={`rounded-xl px-4 py-3 flex items-center justify-between text-sm ${
              pctPreview >= 100 ? 'bg-green-50 text-green-700' :
              pctPreview >= 70  ? 'bg-yellow-50 text-yellow-700' :
                                   'bg-red-50 text-red-700'
            }`}>
              <span>Atingimento atual:</span>
              <strong className="text-base">{pctPreview}%</strong>
            </div>
          )}
        </div>
      </div>

      {/* Erro */}
      {erro && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
          {erro}
        </div>
      )}

      {/* Rodapé */}
      <div className="flex gap-3 pt-2 pb-4">
        <button
          type="button"
          onClick={onCancelar}
          className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={salvando}
          className="flex-1 flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 rounded-lg hover:bg-atlia-blue transition-colors text-sm disabled:opacity-70"
        >
          {salvando
            ? <><Loader2 size={15} className="animate-spin" />Salvando…</>
            : <><Save size={15} />{editando ? 'Salvar alterações' : 'Criar indicador'}</>
          }
        </button>
      </div>
    </form>
  )
}
