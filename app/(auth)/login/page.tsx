'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Eye, EyeOff, LogIn, CheckCircle2,
  Target, FolderKanban, BarChart3, FileText,
  ArrowLeft, Loader2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const beneficios = [
  { icon: Target,       texto: 'Mapa Estratégico com eixos e objetivos do mandato'   },
  { icon: FolderKanban, texto: 'Carteira de projetos com semáforo e progresso real'   },
  { icon: BarChart3,    texto: 'Indicadores de desempenho por secretaria'             },
  { icon: FileText,     texto: 'Relatórios gerenciais em PDF em um clique'            },
]

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail]           = useState('')
  const [senha, setSenha]           = useState('')
  const [mostrarSenha, setMostrar]  = useState(false)
  const [lembrar, setLembrar]       = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro]             = useState('')

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    if (!email || !senha) {
      setErro('Preencha e-mail e senha para continuar.')
      return
    }

    setCarregando(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErro('E-mail ou senha incorretos. Verifique e tente novamente.')
        } else if (error.message.includes('Email not confirmed')) {
          setErro('Confirme seu e-mail antes de acessar.')
        } else {
          setErro(`Erro: ${error.message}`)
        }
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setErro('Não foi possível conectar ao servidor. Verifique sua conexão.')
      console.error('Login error:', err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── ESQUERDA — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-atlia-navy via-[#1a3570] to-[#2E75B6] flex-col justify-between p-12 text-white">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-atlia-navy font-bold text-base">A</span>
          </div>
          <div>
            <p className="font-bold text-xl leading-tight">atlia</p>
            <p className="text-white/50 text-xs">gestão municipal</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            Gerencie o mandato<br />
            <span className="text-[#7BBFEA]">com visibilidade total.</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Do planejamento à entrega — acompanhe cada projeto, indicador e objetivo estratégico do seu município em tempo real.
          </p>

          <ul className="space-y-4">
            {beneficios.map(({ icon: BenIcon, texto }) => (
              <li key={texto} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <BenIcon size={17} className="text-white/80" />
                </div>
                <span className="text-white/80 text-sm">{texto}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-white/40 text-xs">
          <CheckCircle2 size={13} />
          <span>Implantação em 5 dias · Sem licitação (Lei 14.133/2021)</span>
        </div>
      </div>

      {/* ── DIREITA — formulário ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-atlia-navy font-bold text-xl tracking-tight">atlia</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Acesse sua conta</h1>
            <p className="text-sm text-gray-500">Entre com suas credenciais para acessar o painel municipal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail institucional</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@municipio.mg.gov.br"
                autoComplete="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <button type="button" className="text-xs text-atlia-blue hover:underline">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setMostrar(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={e => setLembrar(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-atlia-blue"
              />
              <span className="text-sm text-gray-600">Manter conectado</span>
            </label>

            {erro && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-4 py-2.5">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full flex items-center justify-center gap-2 bg-atlia-navy text-white font-semibold py-2.5 rounded-lg hover:bg-atlia-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {carregando ? (
                <><Loader2 size={16} className="animate-spin" />Entrando…</>
              ) : (
                <><LogIn size={16} />Entrar</>
              )}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">ou</span>
            </div>
          </div>

          <Link
            href="/#contato"
            className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm"
          >
            Solicitar acesso para meu município
          </Link>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-atlia-navy transition-colors">
              <ArrowLeft size={13} />
              Voltar para o site
            </Link>
          </div>
        </div>

        <p className="mt-auto pt-12 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Atlia · Gestão Municipal Estratégica
        </p>
      </div>

    </div>
  )
}
