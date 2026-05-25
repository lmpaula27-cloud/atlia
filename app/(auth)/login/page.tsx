import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-atlia-navy flex">

      {/* Painel esquerdo — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-atlia-navy">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-atlia-navy font-bold text-lg">A</span>
            </div>
            <div>
              <p className="text-white font-bold text-2xl">atlia</p>
              <p className="text-white/50 text-xs tracking-wide">GESTÃO MUNICIPAL INTELIGENTE</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-6">
            Gestão estratégica<br />
            que transforma<br />
            cidades.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">
            Do plano de governo à entrega real — com visibilidade, indicadores e controle para quem governa.
          </p>
        </div>

        <div className="flex gap-8">
          {[
            { label: 'Municípios', value: '47+' },
            { label: 'Projetos monitorados', value: '2.800+' },
            { label: 'Satisfação', value: '98%' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-white text-2xl font-bold">{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Painel direito — Formulário */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-atlia-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <p className="text-atlia-navy font-bold text-xl">atlia</p>
          </div>

          <h1 className="text-2xl font-bold text-atlia-navy mb-1">Bem-vindo(a)</h1>
          <p className="text-atlia-muted mb-8">Acesse o painel da sua prefeitura</p>

          <form className="space-y-5" action="/dashboard">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-atlia-muted" />
                <input
                  type="email"
                  placeholder="seu@municipio.mg.gov.br"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <a href="#" className="text-xs text-atlia-blue hover:underline">Esqueci a senha</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-atlia-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/10 transition-all"
                />
              </div>
            </div>

            <Link href="/dashboard">
              <button type="button" className="w-full btn-primary py-2.5 text-base mt-2">
                Entrar no painel
              </button>
            </Link>
          </form>

          <p className="text-center text-xs text-atlia-muted mt-8">
            Problemas para acessar?{' '}
            <a href="mailto:suporte@atlia.com.br" className="text-atlia-blue hover:underline">
              suporte@atlia.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
