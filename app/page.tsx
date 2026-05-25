import Link from 'next/link'
import { Target, FolderKanban, BarChart3, FileText, CheckCircle2, Shield, Zap } from 'lucide-react'

const funcionalidades = [
  { icon: Target,        titulo: 'Plano de Governo',         descricao: 'Vincule cada projeto aos eixos estratégicos e objetivos do seu mandato.' },
  { icon: FolderKanban,  titulo: 'Carteira de Projetos',     descricao: 'Gerencie toda a carteira com semáforo, prioridades e responsáveis.' },
  { icon: BarChart3,     titulo: 'Indicadores de Desempenho',descricao: 'Monitore KPIs por secretaria e acompanhe o progresso em tempo real.' },
  { icon: FileText,      titulo: 'Relatório Mensal',         descricao: 'Gere relatórios de progresso automaticamente para prestação de contas.' },
]

const diferenciais = [
  { icon: CheckCircle2, texto: 'Sem necessidade de TI — qualquer secretário consegue usar' },
  { icon: Shield,       texto: 'Dados seguros em nuvem com acesso por perfil (prefeito, secretário, gestor)' },
  { icon: Zap,          texto: 'Implantação em até 5 dias úteis com suporte completo' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-atlia-navy font-bold text-xl">atlia</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#funcionalidades" className="text-sm text-gray-600 hover:text-atlia-navy">Funcionalidades</a>
          <a href="#planos" className="text-sm text-gray-600 hover:text-atlia-navy">Planos</a>
          <Link href="/login" className="btn-secondary text-sm">Entrar</Link>
          <a href="mailto:contato@atlia.com.br" className="btn-primary text-sm">Solicitar demonstração</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-atlia-navy text-white py-24 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
            Plataforma de Gestão Estratégica Municipal
          </span>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Do plano de governo<br />à entrega real.
          </h1>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Atlia conecta seus objetivos estratégicos, projetos e indicadores em um painel único — para que o prefeito saiba exatamente onde está cada compromisso assumido.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:contato@atlia.com.br" className="bg-white text-atlia-navy font-semibold px-8 py-3 rounded-lg hover:bg-atlia-light transition-colors">
              Solicitar demonstração gratuita
            </a>
            <Link href="/login" className="border border-white/30 text-white font-medium px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Acessar plataforma
            </Link>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 px-8 bg-atlia-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-atlia-navy text-center mb-3">Tudo que sua gestão precisa</h2>
          <p className="text-atlia-muted text-center mb-12 max-w-xl mx-auto">
            Simples o suficiente para qualquer secretário usar. Completo o suficiente para o prefeito confiar.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {funcionalidades.map(({ icon: Icon, titulo, descricao }) => (
              <div key={titulo} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-atlia-navy rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-atlia-navy mb-1">{titulo}</h3>
                    <p className="text-sm text-atlia-muted leading-relaxed">{descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-atlia-navy mb-10">Por que prefeituras escolhem a Atlia</h2>
          <div className="space-y-4">
            {diferenciais.map(({ icon: Icon, texto }) => (
              <div key={texto} className="flex items-center gap-4 bg-atlia-gray rounded-xl px-6 py-4 text-left">
                <Icon size={20} className="text-atlia-green shrink-0" />
                <p className="text-gray-700 font-medium">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 px-8 bg-atlia-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-atlia-navy text-center mb-3">Planos sem surpresas</h2>
          <p className="text-atlia-muted text-center mb-12">Contratação direta — sem processo licitatório para municípios.</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { porte:'Pequeno', hab:'até 20 mil hab.', preco:'R$ 2.500', usuarios:'Até 10 usuários', projetos:'Até 100 projetos' },
              { porte:'Médio',   hab:'20 a 50 mil hab.',preco:'R$ 3.500', usuarios:'Até 25 usuários', projetos:'Projetos ilimitados', destaque: true },
              { porte:'Grande',  hab:'50 a 80 mil hab.',preco:'R$ 4.500', usuarios:'Usuários ilimitados',projetos:'Projetos ilimitados' },
            ].map(p => (
              <div key={p.porte} className={`card text-center ${p.destaque ? 'border-2 border-atlia-blue ring-4 ring-atlia-blue/10' : ''}`}>
                {p.destaque && (
                  <span className="inline-block bg-atlia-blue text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                    Mais popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-atlia-navy">{p.porte}</h3>
                <p className="text-xs text-atlia-muted mb-4">{p.hab}</p>
                <p className="text-3xl font-bold text-atlia-navy">{p.preco}</p>
                <p className="text-xs text-atlia-muted mb-6">/mês • contrato anual</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-atlia-green" />{p.usuarios}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-atlia-green" />{p.projetos}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-atlia-green" />Suporte incluso</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-atlia-green" />Implantação em 5 dias</li>
                </ul>
                <a href="mailto:contato@atlia.com.br" className={`block w-full py-2.5 rounded-lg text-sm font-medium text-center transition-colors ${p.destaque ? 'btn-primary' : 'btn-secondary'}`}>
                  Solicitar proposta
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-atlia-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua gestão?</h2>
          <p className="text-white/70 mb-8">Solicite uma demonstração gratuita. Em 30 minutos você vê o Atlia funcionando com os dados da sua prefeitura.</p>
          <a href="mailto:contato@atlia.com.br" className="inline-block bg-white text-atlia-navy font-semibold px-10 py-3.5 rounded-lg hover:bg-atlia-light transition-colors">
            Quero uma demonstração
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white/50 text-sm py-8 px-8 text-center">
        <p>© 2026 Atlia — Gestão Estratégica Municipal. Todos os direitos reservados.</p>
        <p className="mt-1">contato@atlia.com.br</p>
      </footer>
    </div>
  )
}
