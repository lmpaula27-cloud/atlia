'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Target, FolderKanban, BarChart3, FileText,
  CheckCircle2, Users,
  ArrowRight, Mail,
  TrendingUp, Clock, AlertTriangle,
  Star, Menu, X, Layers,
} from 'lucide-react'

/* ─── dados ─── */
const funcionalidades = [
  {
    icon: Target,
    titulo: 'Mapa Estratégico',
    descricao: 'Visualize missão, visão, valores e os 4 eixos temáticos do mandato com % de atingimento em tempo real.',
    cor: 'bg-atlia-navy',
  },
  {
    icon: FolderKanban,
    titulo: 'Carteira de Projetos',
    descricao: 'Gerencie centenas de projetos com semáforo, prioridades, responsáveis, marcos e orçamento executado.',
    cor: 'bg-atlia-blue',
  },
  {
    icon: BarChart3,
    titulo: 'Indicadores de Desempenho',
    descricao: 'KPIs por secretaria com meta vs. resultado atual, alertas automáticos e gráficos de evolução.',
    cor: 'bg-atlia-green',
  },
  {
    icon: FileText,
    titulo: 'Relatórios em PDF',
    descricao: 'Gere relatórios gerenciais com um clique — projetos atrasados, execução orçamentária, atingimento de metas.',
    cor: 'bg-amber-500',
  },
  {
    icon: Layers,
    titulo: 'Drill-down Completo',
    descricao: 'Do eixo estratégico ao marco individual: cada projeto com timeline, histórico e gráfico de orçamento.',
    cor: 'bg-purple-600',
  },
  {
    icon: Users,
    titulo: 'Multi-usuário',
    descricao: 'Perfis por secretaria: prefeito vê tudo, secretário gerencia sua pasta, gestor registra avanços.',
    cor: 'bg-teal-600',
  },
]

// Depoimentos reais (Prefeitura de Uberlândia / UFU) serão adicionados aqui.
// Enquanto isso a seção fica oculta — mude para true quando os depoimentos chegarem.
const MOSTRAR_DEPOIMENTOS = false

const depoimentos = [
  {
    texto: 'Finalmente consigo mostrar para a câmara municipal onde está cada projeto. Antes era uma planilha que ninguém entendia.',
    autor: 'Secretário de Planejamento',
    municipio: 'Município — 28 mil hab. — MG',
  },
  {
    texto: 'Em 3 dias já tínhamos todos os projetos cadastrados. A equipe aprendeu sem treinamento especial.',
    autor: 'Prefeito',
    municipio: 'Município — 15 mil hab. — SP',
  },
  {
    texto: 'O relatório automático nos economiza 2 dias de trabalho por mês. Vale muito mais do que o investimento.',
    autor: 'Assessora de Gestão',
    municipio: 'Município — 42 mil hab. — GO',
  },
]

export default function LandingPage() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [formEnviado, setFormEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erroForm, setErroForm] = useState('')
  const [form, setForm] = useState({ nome: '', municipio: '', cargo: '', email: '', telefone: '', interesse: 'demo' })

  async function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEnviando(true)
    setErroForm('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.erro ?? 'Erro ao enviar. Tente novamente.')
      setFormEnviado(true)
    } catch (err: any) {
      setErroForm(err.message ?? 'Erro ao enviar. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-atlia-navy font-bold text-xl tracking-tight">atlia</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#funcionalidades" className="text-sm text-gray-500 hover:text-atlia-navy transition-colors">Funcionalidades</a>
            <a href="#como-funciona"   className="text-sm text-gray-500 hover:text-atlia-navy transition-colors">Como funciona</a>
            <a href="#planos"          className="text-sm text-gray-500 hover:text-atlia-navy transition-colors">Planos</a>
            <a href="#contato"         className="text-sm text-gray-500 hover:text-atlia-navy transition-colors">Contato</a>
            <Link href="/login" className="text-sm font-medium text-atlia-navy hover:text-atlia-blue transition-colors">Entrar</Link>
            <a href="#contato" className="bg-atlia-navy text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-atlia-blue transition-colors">
              Solicitar demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuAberto(!menuAberto)}>
            {menuAberto ? <X size={22} className="text-atlia-navy" /> : <Menu size={22} className="text-atlia-navy" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuAberto && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {['#funcionalidades', '#como-funciona', '#planos', '#contato'].map(h => (
              <a key={h} href={h} onClick={() => setMenuAberto(false)}
                className="block text-sm text-gray-600 py-1">{h.replace('#','').replace(/-/g,' ')}</a>
            ))}
            <Link href="/login" className="block text-sm font-medium text-atlia-navy py-1">Entrar</Link>
            <a href="#contato" onClick={() => setMenuAberto(false)}
              className="block bg-atlia-navy text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">
              Solicitar demo gratuita
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-atlia-navy via-[#1a3570] to-[#2E75B6] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                <Star size={11} fill="currentColor" />
                Plataforma de Gestão Estratégica Municipal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Do plano de governo<br />
                <span className="text-[#7BBFEA]">à entrega real.</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Atlia conecta objetivos estratégicos, projetos e indicadores em um painel único — para que o prefeito saiba exatamente onde está cada compromisso assumido com a população.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#contato"
                  className="flex items-center gap-2 bg-white text-atlia-navy font-semibold px-6 py-3 rounded-lg hover:bg-atlia-light transition-colors">
                  Solicitar demonstração gratuita
                  <ArrowRight size={16} />
                </a>
                <Link href="/login"
                  className="flex items-center gap-2 border border-white/25 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  Ver plataforma
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Sem licitação</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Implantação em 5 dias</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Suporte incluso</div>
              </div>
            </div>

            {/* Mockup do dashboard */}
            <div className="relative mt-8 md:mt-0">
              <div className="bg-white/10 backdrop-blur rounded-t-2xl border border-white/20 overflow-hidden shadow-2xl">
                {/* Barra do browser */}
                <div className="bg-black/20 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <span className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 bg-black/20 rounded text-white/40 text-xs px-3 py-1 ml-2">
                    atlia.com.br/dashboard
                  </div>
                </div>

                {/* Mini dashboard */}
                <div className="flex" style={{ height: '340px' }}>
                  {/* Sidebar mini */}
                  <div className="w-16 bg-atlia-navy/90 flex flex-col items-center py-4 gap-4 shrink-0">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-atlia-navy font-bold text-xs">A</span>
                    </div>
                    {[Target, FolderKanban, BarChart3, FileText, Users].map((Icon, i) => (
                      <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i===0 ? 'bg-white/20' : ''}`}>
                        <Icon size={15} className="text-white/70" />
                      </div>
                    ))}
                  </div>

                  {/* Conteúdo mini */}
                  <div className="flex-1 bg-[#F5F7FA] p-4 overflow-hidden">
                    <p className="text-atlia-navy font-bold text-sm mb-3">Painel Executivo</p>

                    {/* Stats mini */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { v:'47', l:'Projetos',    c:'text-atlia-blue'  },
                        { v:'31', l:'No prazo',    c:'text-green-600'   },
                        { v:'10', l:'Atenção',     c:'text-yellow-600'  },
                        { v:'6',  l:'Atrasados',   c:'text-red-600'     },
                      ].map(s => (
                        <div key={s.l} className="bg-white rounded-lg p-2 text-center shadow-sm">
                          <p className={`font-bold text-base ${s.c}`}>{s.v}</p>
                          <p className="text-gray-400 text-[9px]">{s.l}</p>
                        </div>
                      ))}
                    </div>

                    {/* Eixos mini */}
                    <div className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                      <p className="text-[10px] font-semibold text-gray-500 mb-2">Eixos Estratégicos</p>
                      {[
                        { nome:'Uberlândia Sustentável', pct:44, cor:'#1F3864' },
                        { nome:'Vida em Uberlândia',     pct:56, cor:'#2E75B6' },
                        { nome:'Espaço Uberlândia',      pct:51, cor:'#C07B00' },
                        { nome:'Uberlândia Humana',      pct:38, cor:'#538135' },
                      ].map(e => (
                        <div key={e.nome} className="mb-1.5">
                          <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                            <span>{e.nome}</span>
                            <span className="font-bold" style={{ color: e.cor }}>{e.pct}%</span>
                          </div>
                          <div className="bg-gray-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full" style={{ width:`${e.pct}%`, backgroundColor: e.cor }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Semaforo mini */}
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <p className="text-[10px] font-semibold text-gray-500 mb-1.5">Semáforo por Secretaria</p>
                      <div className="grid grid-cols-3 gap-1">
                        {['Obras','Saúde','Educação'].map(s => (
                          <div key={s} className="text-center">
                            <p className="text-[9px] text-gray-400">{s}</p>
                            <div className="flex justify-center gap-1 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="w-2 h-2 rounded-full bg-yellow-400" />
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NÚMEROS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { valor: '100%',     label: 'na nuvem, sem instalação' },
            { valor: 'Ilimitados', label: 'projetos e indicadores' },
            { valor: '5 dias',   label: 'para implantar'           },
            { valor: 'PDF',      label: 'relatórios em 1 clique'   },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-atlia-navy">{s.valor}</p>
              <p className="text-sm text-atlia-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-atlia-red uppercase tracking-wider">O problema atual</span>
            <h2 className="text-3xl font-bold text-atlia-navy mt-2">Gestão pública ainda é feita em planilhas</h2>
            <p className="text-atlia-muted mt-3 max-w-xl mx-auto">Sem visibilidade, sem rastreabilidade, sem responsabilização. O prefeito perde o controle — e o cidadão perde a confiança.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: AlertTriangle, titulo: 'Projetos se perdem', descricao: 'Sem sistema centralizado, projetos ficam em planilhas desatualizadas e e-mails. Ninguém sabe o status real.', cor: 'text-red-500', bg: 'bg-red-50 border-red-100' },
              { icon: Clock,         titulo: 'Prazos sem controle', descricao: 'Sem alertas automáticos, os atrasos só aparecem nas notícias — quando já é tarde para agir.', cor: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
              { icon: TrendingUp,    titulo: 'Prestação de contas difícil', descricao: 'Montar um relatório para a câmara consome dias. Com Atlia, são gerados em segundos.', cor: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
            ].map(({ icon: CardIcon, titulo, descricao, cor, bg }) => (
              <div key={titulo} className={`rounded-xl border p-6 ${bg}`}>
                <CardIcon size={24} className={`${cor} mb-3`} />
                <h3 className="font-bold text-gray-800 mb-2">{titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ── */}
      <section id="funcionalidades" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-atlia-blue uppercase tracking-wider">Funcionalidades</span>
            <h2 className="text-3xl font-bold text-atlia-navy mt-2">Tudo que sua gestão precisa</h2>
            <p className="text-atlia-muted mt-3 max-w-xl mx-auto">Simples o suficiente para qualquer secretário usar. Completo o suficiente para o prefeito confiar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {funcionalidades.map(({ icon: Icon, titulo, descricao, cor }) => (
              <div key={titulo} className="group rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-atlia-blue/30 hover:-translate-y-0.5 transition-all">
                <div className={`w-10 h-10 ${cor} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-atlia-navy mb-2">{titulo}</h3>
                <p className="text-sm text-atlia-muted leading-relaxed">{descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-20 px-6 bg-gradient-to-br from-atlia-navy to-[#2E75B6] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Como funciona</span>
          <h2 className="text-3xl font-bold mt-2 mb-12">Do contrato à gestão ativa em 5 dias</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num:'01', titulo:'Contratação', desc:'Dispensa de licitação. Assinatura do contrato direto com a Atlia.' },
              { num:'02', titulo:'Configuração', desc:'Nossa equipe configura o sistema com os dados do seu município.' },
              { num:'03', titulo:'Cadastro',     desc:'Equipe registra eixos, objetivos e projetos do plano de governo.' },
              { num:'04', titulo:'Gestão ativa', desc:'Prefeito e secretários acompanham tudo em tempo real.' },
            ].map((p, i) => (
              <div key={p.num} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-white/20 -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-sm">{p.num}</span>
                  </div>
                  <h4 className="font-bold mb-2">{p.titulo}</h4>
                  <p className="text-sm text-white/65 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEI 14.133 ── */}
      <section className="py-14 px-6 bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Lei 14.133/2021 — Art. 75, inciso II</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Contratação direta, sem processo licitatório</h3>
            <p className="text-gray-600 leading-relaxed">
              O Atlia é enquadrado como serviço de tecnologia abaixo do limite de <strong>R$ 57.200/ano</strong> — permitindo contratação por <strong>dispensa de licitação</strong> em qualquer município brasileiro. Processo simples, rápido e totalmente legal.
            </p>
          </div>
          <a href="#contato"
            className="shrink-0 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            Solicitar proposta
          </a>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      {MOSTRAR_DEPOIMENTOS && (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-atlia-blue uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-3xl font-bold text-atlia-navy mt-2">O que dizem os gestores</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((d, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="#FFC000" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{d.texto}"</p>
                <div>
                  <p className="font-semibold text-atlia-navy text-sm">{d.autor}</p>
                  <p className="text-xs text-atlia-muted mt-0.5">{d.municipio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── PLANOS ── */}
      <section id="planos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-atlia-blue uppercase tracking-wider">Planos</span>
            <h2 className="text-3xl font-bold text-atlia-navy mt-2">Planos sem surpresas</h2>
            <p className="text-atlia-muted mt-3">Contratação direta — sem processo licitatório para municípios.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                porte:'Starter', hab:'Até 30 mil hab.', preco:'R$ 2.500',
                recursos:['Projetos ilimitados','Até 15 usuários','Relatórios em PDF','Suporte por e-mail'],
                destaque:false,
              },
              {
                porte:'Plus', hab:'30 a 100 mil hab.', preco:'R$ 3.500',
                recursos:['Projetos ilimitados','Até 30 usuários','Relatórios em PDF','Suporte prioritário','Indicadores avançados'],
                destaque:true,
              },
              {
                porte:'Pro', hab:'Acima de 100 mil hab.', preco:'R$ 4.500',
                recursos:['Projetos ilimitados','Usuários ilimitados','Relatórios em PDF','Suporte dedicado','Indicadores avançados','Treinamento in loco'],
                destaque:false,
              },
            ].map(p => (
              <div key={p.porte}
                className={`rounded-xl p-7 flex flex-col ${
                  p.destaque
                    ? 'bg-atlia-navy text-white shadow-xl scale-105'
                    : 'bg-white border border-gray-200'
                }`}>
                {p.destaque && (
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                    Mais popular
                  </span>
                )}
                <h3 className={`text-xl font-bold ${p.destaque ? 'text-white' : 'text-atlia-navy'}`}>{p.porte}</h3>
                <p className={`text-xs mt-0.5 mb-4 ${p.destaque ? 'text-white/60' : 'text-atlia-muted'}`}>{p.hab}</p>
                <p className={`text-4xl font-bold mb-1 ${p.destaque ? 'text-white' : 'text-atlia-navy'}`}>{p.preco}</p>
                <p className={`text-xs mb-6 ${p.destaque ? 'text-white/60' : 'text-atlia-muted'}`}>/mês · contrato anual</p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {p.recursos.map(r => (
                    <li key={r} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 size={14} className={p.destaque ? 'text-green-400' : 'text-atlia-green'} />
                      <span className={p.destaque ? 'text-white/85' : 'text-gray-600'}>{r}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contato"
                  className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    p.destaque
                      ? 'bg-white text-atlia-navy hover:bg-atlia-light'
                      : 'bg-atlia-navy text-white hover:bg-atlia-blue'
                  }`}>
                  Solicitar proposta
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-atlia-muted mt-6">
            Todos os planos incluem: implantação em 5 dias úteis + suporte + atualizações automáticas
          </p>

          {/* Consultoria de Planejamento Estratégico */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-atlia-navy to-[#2E75B6] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <Target size={11} />
                Serviço complementar
              </span>
              <h3 className="text-2xl font-bold mb-3">Consultoria: criação do Planejamento Estratégico</h3>
              <p className="text-white/75 leading-relaxed mb-5">
                Seu município ainda não tem um plano estratégico estruturado? Nossa equipe constrói com a sua gestão:
                missão, visão e valores, eixos temáticos, objetivos estratégicos, metas e indicadores — tudo já
                cadastrado e funcionando na plataforma ao final do trabalho.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Oficinas com prefeito e secretários</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Alinhado ao PPA e plano de governo</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-400" /> Entregue pronto na plataforma</div>
              </div>
            </div>
            <div className="shrink-0 text-center md:text-right w-full md:w-auto">
              <p className="text-sm text-white/60 mb-1">Investimento</p>
              <p className="text-2xl font-bold mb-4">Sob consulta</p>
              <p className="text-xs text-white/50 mb-4 max-w-[200px] md:ml-auto">Proposta personalizada conforme o porte e a maturidade do município</p>
              <a href="#contato"
                className="inline-block bg-white text-atlia-navy font-semibold px-6 py-3 rounded-lg hover:bg-atlia-light transition-colors">
                Solicitar proposta
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section id="contato" className="py-20 px-6 bg-atlia-navy">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Demonstração gratuita</span>
            <h2 className="text-3xl font-bold text-white mt-2">Agende uma apresentação</h2>
            <p className="text-white/60 mt-3">Em 30 minutos você vê o Atlia com os dados da sua prefeitura. Sem custo, sem compromisso.</p>
          </div>

          {formEnviado ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
              <CheckCircle2 size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Solicitação enviada!</h3>
              <p className="text-white/70">Entraremos em contato em até 1 dia útil para agendar sua demonstração.</p>
            </div>
          ) : (
            <form onSubmit={handleForm} className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { id:'nome',      label:'Seu nome',          placeholder:'João da Silva',                    type:'text'  },
                  { id:'municipio', label:'Município',         placeholder:'Ex: Uberlândia — MG',              type:'text'  },
                  { id:'cargo',     label:'Cargo / Função',    placeholder:'Ex: Secretário de Planejamento',   type:'text'  },
                  { id:'email',     label:'E-mail institucional', placeholder:'joao@prefeitura.mg.gov.br',      type:'email' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={(form as any)[f.id]}
                      onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/20 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="(34) 99999-0000"
                    value={form.telefone}
                    onChange={e => setForm(prev => ({ ...prev, telefone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">Tenho interesse em</label>
                  <select
                    value={form.interesse}
                    onChange={e => setForm(prev => ({ ...prev, interesse: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-2 focus:ring-atlia-blue/20 transition-all bg-white"
                  >
                    <option value="demo">Demonstração da plataforma</option>
                    <option value="consultoria">Consultoria de planejamento estratégico</option>
                    <option value="ambos">Plataforma + Consultoria</option>
                  </select>
                </div>
              </div>
              {erroForm && (
                <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{erroForm}</p>
              )}
              <button type="submit" disabled={enviando}
                className="mt-6 w-full bg-atlia-navy text-white font-bold py-3.5 rounded-xl hover:bg-atlia-blue transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70">
                {enviando ? 'Enviando…' : 'Quero saber mais'}
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-xs text-atlia-muted mt-3">
                Seus dados são usados apenas para contato. Sem spam.
              </p>
            </form>
          )}

          {/* Contato direto */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <a href="mailto:contato@atlia.com.br" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
              <Mail size={15} />
              contato@atlia.com.br
            </a>
            {/* WhatsApp: reativar quando o número oficial + bot estiverem prontos
            <a href="https://wa.me/55XXXXXXXXXXX" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
              <Phone size={15} />
              (XX) X XXXX-XXXX
            </a> */}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-white/40 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-white/70 font-bold text-lg">atlia</span>
            <span className="text-white/30 text-sm ml-2">gestão municipal</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#funcionalidades" className="hover:text-white/70 transition-colors">Funcionalidades</a>
            <a href="#planos"          className="hover:text-white/70 transition-colors">Planos</a>
            <a href="#contato"         className="hover:text-white/70 transition-colors">Contato</a>
            <Link href="/login"        className="hover:text-white/70 transition-colors">Entrar</Link>
          </div>
          <p className="text-xs text-center">© 2026 Atlia — Todos os direitos reservados</p>
        </div>
      </footer>

    </div>
  )
}
