'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all'

export default function AlterarSenhaPage() {
  const router = useRouter()
  const [senha,     setSenha]     = useState('')
  const [confirma,  setConfirma]  = useState('')
  const [mostrar,   setMostrar]   = useState(false)
  const [salvando,  setSalvando]  = useState(false)
  const [erro,      setErro]      = useState('')
  const [sucesso,   setSucesso]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (senha.length < 8) {
      setErro('A senha precisa ter pelo menos 8 caracteres.')
      return
    }
    if (senha !== confirma) {
      setErro('As senhas não conferem. Digite a mesma senha nos dois campos.')
      return
    }

    setSalvando(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: senha })
    setSalvando(false)

    if (error) {
      if (error.message.includes('different from the old')) {
        setErro('A nova senha precisa ser diferente da atual.')
      } else {
        setErro('Não foi possível alterar a senha. Tente novamente.')
      }
      return
    }

    setSucesso(true)
    setTimeout(() => router.push('/dashboard'), 2500)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Alterar Senha" subtitle="Defina uma nova senha de acesso" />

      <div className="p-8">
        <div className="max-w-md">
          {sucesso ? (
            <div className="card text-center py-10">
              <CheckCircle2 size={44} className="text-atlia-green mx-auto mb-3" />
              <h2 className="font-bold text-atlia-navy text-lg">Senha alterada!</h2>
              <p className="text-sm text-atlia-muted mt-1">
                Sua nova senha já está valendo. Redirecionando para o painel…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <div className="w-10 h-10 bg-atlia-light rounded-xl flex items-center justify-center">
                  <KeyRound size={18} className="text-atlia-navy" />
                </div>
                <div>
                  <h2 className="font-semibold text-atlia-navy text-sm">Nova senha de acesso</h2>
                  <p className="text-xs text-atlia-muted">Mínimo de 8 caracteres</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova senha</label>
                <div className="relative">
                  <input
                    type={mostrar ? 'text' : 'password'}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {mostrar ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar nova senha</label>
                <input
                  type={mostrar ? 'text' : 'password'}
                  value={confirma}
                  onChange={e => setConfirma(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputCls}
                />
              </div>

              {erro && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{erro}</p>
              )}

              <button
                type="submit"
                disabled={salvando}
                className="w-full flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 rounded-xl hover:bg-atlia-navy/90 transition-colors disabled:opacity-70 text-sm"
              >
                {salvando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Salvar nova senha
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
