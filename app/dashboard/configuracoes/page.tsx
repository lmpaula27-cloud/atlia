'use client'
import React, { useState } from 'react'
import Header from '@/components/Header'
import {
  Building2, Users, CreditCard, Layers,
  Save, Plus, Pencil, Trash2, CheckCircle2,
  Crown, MapPin, Phone, Mail, Globe, Calendar,
  AlertCircle,
} from 'lucide-react'

/* ─── tipos ─── */
type Aba = 'municipio' | 'secretarias' | 'usuarios' | 'plano'

interface Secretaria {
  id: string
  nome: string
  responsavel: string
  cor: string
  projetos: number
  ativa: boolean
}

interface Usuario {
  id: string
  nome: string
  email: string
  cargo: string
  perfil: 'admin' | 'gestor' | 'visualizador'
  secretaria: string
  ativo: boolean
  ultimoAcesso: string
}

/* ─── dados mock ─── */
const secretariasInit: Secretaria[] = [
  { id:'1', nome:'Obras e Infraestrutura',       responsavel:'João Silva',    cor:'#1F3864', projetos:11, ativa:true  },
  { id:'2', nome:'Saúde',                         responsavel:'Maria Souza',   cor:'#C00000', projetos:10, ativa:true  },
  { id:'3', nome:'Educação',                      responsavel:'Carlos Lima',   cor:'#2E75B6', projetos: 8, ativa:true  },
  { id:'4', nome:'Urbanismo e Planejamento',      responsavel:'Ana Costa',     cor:'#538135', projetos: 7, ativa:true  },
  { id:'5', nome:'Trabalho e Geração de Renda',   responsavel:'Pedro Rocha',   cor:'#C07B00', projetos: 5, ativa:true  },
  { id:'6', nome:'Assistência Social',            responsavel:'Lucia Alves',   cor:'#7B2D8B', projetos: 6, ativa:true  },
  { id:'7', nome:'Meio Ambiente',                 responsavel:'Rita Ferreira', cor:'#197A3E', projetos: 4, ativa:true  },
  { id:'8', nome:'Administração Digital',         responsavel:'Fábio Torres',  cor:'#0070C0', projetos: 3, ativa:false },
]

const usuariosInit: Usuario[] = [
  { id:'1', nome:'Administrador',       email:'admin@uberlandia.mg.gov.br',    cargo:'Prefeito(a)',              perfil:'admin',        secretaria:'Gabinete',        ativo:true,  ultimoAcesso:'01/06/2026' },
  { id:'2', nome:'João Silva',          email:'joao.silva@uberlandia.mg.gov.br',    cargo:'Secretário de Obras',     perfil:'gestor',       secretaria:'Obras',           ativo:true,  ultimoAcesso:'01/06/2026' },
  { id:'3', nome:'Maria Souza',         email:'maria.souza@uberlandia.mg.gov.br',   cargo:'Secretária de Saúde',     perfil:'gestor',       secretaria:'Saúde',           ativo:true,  ultimoAcesso:'31/05/2026' },
  { id:'4', nome:'Carlos Lima',         email:'carlos.lima@uberlandia.mg.gov.br',   cargo:'Secretário de Educação',  perfil:'gestor',       secretaria:'Educação',        ativo:true,  ultimoAcesso:'30/05/2026' },
  { id:'5', nome:'Ana Costa',           email:'ana.costa@uberlandia.mg.gov.br',     cargo:'Secretária de Urbanismo', perfil:'gestor',       secretaria:'Urbanismo',       ativo:true,  ultimoAcesso:'29/05/2026' },
  { id:'6', nome:'Lucia Alves',         email:'lucia.alves@uberlandia.mg.gov.br',   cargo:'Assessora de Projetos',   perfil:'visualizador', secretaria:'Assistência',     ativo:true,  ultimoAcesso:'28/05/2026' },
  { id:'7', nome:'Fábio Torres',        email:'fabio.torres@uberlandia.mg.gov.br',  cargo:'Coord. de TI',            perfil:'admin',        secretaria:'Adm. Digital',    ativo:false, ultimoAcesso:'15/04/2026' },
]

const perfilInfo = {
  admin:        { label:'Administrador', cor:'bg-atlia-navy text-white'  },
  gestor:       { label:'Gestor',        cor:'bg-blue-100 text-blue-800' },
  visualizador: { label:'Visualizador',  cor:'bg-gray-100 text-gray-600' },
}

/* ─── componentes auxiliares ─── */
function AbaBtn({ id, label, icon: Icon, ativa, onClick }: {
  id: Aba; label: string; icon: React.ElementType; ativa: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
        ${ativa
          ? 'border-atlia-navy text-atlia-navy'
          : 'border-transparent text-atlia-muted hover:text-atlia-navy hover:border-gray-200'
        }`}
    >
      <Icon size={15} />
      {label}
    </button>
  )
}

/* ─── página principal ─── */
export default function ConfiguracoesPage() {
  const [aba, setAba]                   = useState<Aba>('municipio')
  const [secretarias, setSecretarias]   = useState<Secretaria[]>(secretariasInit)
  const [usuarios]                      = useState<Usuario[]>(usuariosInit)
  const [salvando, setSalvando]         = useState(false)
  const [salvo, setSalvo]               = useState(false)

  async function handleSalvar() {
    setSalvando(true)
    await new Promise(r => setTimeout(r, 900))
    setSalvando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 3000)
  }

  function toggleSecretaria(id: string) {
    setSecretarias(prev => prev.map(s => s.id === id ? { ...s, ativa: !s.ativa } : s))
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Configurações" subtitle="Personalização do sistema para o seu município" />

      {/* Abas */}
      <div className="bg-white border-b border-gray-100 px-8 flex gap-1">
        <AbaBtn id="municipio"   label="Município"    icon={Building2}    ativa={aba==='municipio'}   onClick={() => setAba('municipio')}   />
        <AbaBtn id="secretarias" label="Secretarias"  icon={Layers}       ativa={aba==='secretarias'} onClick={() => setAba('secretarias')} />
        <AbaBtn id="usuarios"    label="Usuários"     icon={Users}        ativa={aba==='usuarios'}    onClick={() => setAba('usuarios')}    />
        <AbaBtn id="plano"       label="Plano"        icon={CreditCard}   ativa={aba==='plano'}       onClick={() => setAba('plano')}       />
      </div>

      <div className="p-8 flex-1 overflow-y-auto">

        {/* ── ABA MUNICÍPIO ── */}
        {aba === 'municipio' && (
          <div className="max-w-2xl space-y-6">

            {/* Identidade */}
            <div className="card space-y-5">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Building2 size={16} /> Identidade do Município
              </h2>

              {/* Logo */}
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl bg-atlia-light border-2 border-dashed border-atlia-navy/30 flex flex-col items-center justify-center cursor-pointer hover:bg-atlia-light/80 transition-colors">
                  <Building2 size={24} className="text-atlia-navy/40" />
                  <span className="text-xs text-atlia-muted mt-1">Brasão</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Logotipo / Brasão municipal</p>
                  <p className="text-xs text-atlia-muted mt-0.5">PNG ou SVG, máx. 2 MB</p>
                  <button className="mt-2 text-xs text-atlia-blue font-medium hover:underline">Carregar imagem</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Nome oficial do município', value:'Uberlândia', full:true  },
                  { label:'Estado (UF)',                value:'MG',         full:false },
                  { label:'Região',                    value:'Triângulo Mineiro', full:false },
                  { label:'População estimada',        value:'732.000',    full:false },
                  { label:'Prefeito(a)',               value:'Administrador', full:true },
                  { label:'Mandato',                   value:'2025–2028',  full:false },
                  { label:'CNPJ da Prefeitura',        value:'18.869.867/0001-30', full:false },
                ].map(f => (
                  <div key={f.label} className={f.full ? 'col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.value}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-1 focus:ring-atlia-blue/20 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contato */}
            <div className="card space-y-4">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Phone size={16} /> Contato e Endereço
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Site oficial',   value:'www.uberlandia.mg.gov.br', icon: Globe    },
                  { label:'E-mail geral',   value:'contato@uberlandia.mg.gov.br', icon: Mail },
                  { label:'Telefone',       value:'(34) 3239-2000',           icon: Phone    },
                  { label:'Endereço sede',  value:'Av. Anselmo Alves dos Santos, 600', icon: MapPin },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <div className="relative">
                      <f.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-atlia-muted" />
                      <input
                        defaultValue={f.value}
                        className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-1 focus:ring-atlia-blue/20 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Período do plano de governo */}
            <div className="card space-y-4">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Calendar size={16} /> Plano de Governo
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Início do mandato',     value:'01/01/2025' },
                  { label:'Fim do mandato',         value:'31/12/2028' },
                  { label:'Nome do plano',          value:'Plano de Governo 2025–2028' },
                  { label:'Ano base dos indicadores', value:'2024'    },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.value}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-1 focus:ring-atlia-blue/20 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={handleSalvar}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${salvo
                    ? 'bg-atlia-green text-white'
                    : 'bg-atlia-navy text-white hover:bg-atlia-blue'
                  }`}>
                {salvo ? <><CheckCircle2 size={15} /> Salvo!</> : salvando ? 'Salvando…' : <><Save size={15} /> Salvar alterações</>}
              </button>
            </div>
          </div>
        )}

        {/* ── ABA SECRETARIAS ── */}
        {aba === 'secretarias' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-atlia-muted">{secretarias.filter(s=>s.ativa).length} secretarias ativas · {secretarias.filter(s=>!s.ativa).length} inativas</p>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={15} /> Nova Secretaria
              </button>
            </div>

            <div className="card p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-atlia-gray border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Secretaria</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Responsável</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Projetos</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {secretarias.map(s => (
                    <tr key={s.id} className={`hover:bg-atlia-gray/40 transition-colors ${!s.ativa ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.cor }} />
                          <span className="font-medium text-gray-800">{s.nome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{s.responsavel}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="text-sm font-semibold text-atlia-navy">{s.projetos}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => toggleSecretaria(s.id)}
                          className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors
                            ${s.ativa
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                          {s.ativa ? 'Ativa' : 'Inativa'}
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-atlia-light text-atlia-muted hover:text-atlia-navy transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-atlia-muted hover:text-atlia-red transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={16} className="text-atlia-blue shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Secretarias inativas não aparecem nos filtros e relatórios, mas os projetos vinculados são preservados.
              </p>
            </div>
          </div>
        )}

        {/* ── ABA USUÁRIOS ── */}
        {aba === 'usuarios' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-atlia-muted">{usuarios.filter(u=>u.ativo).length} usuários ativos</p>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={15} /> Convidar Usuário
              </button>
            </div>

            {/* Legenda de perfis */}
            <div className="card py-3 flex items-center gap-6 flex-wrap">
              <span className="text-xs font-semibold text-atlia-muted uppercase tracking-wider">Perfis de acesso:</span>
              {([
                { key: 'admin',        label: 'Administrador', cor: 'bg-atlia-navy text-white',  desc: '— acesso total'           },
                { key: 'gestor',       label: 'Gestor',        cor: 'bg-blue-100 text-blue-800', desc: '— editar sua secretaria'  },
                { key: 'visualizador', label: 'Visualizador',  cor: 'bg-gray-100 text-gray-600', desc: '— somente leitura'        },
              ] as const).map(p => (
                <div key={p.key} className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${p.cor}`}>{p.label}</span>
                  <span className="text-xs text-atlia-muted">{p.desc}</span>
                </div>
              ))}
            </div>

            <div className="card p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-atlia-gray border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Usuário</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Secretaria</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Perfil</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Último acesso</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {usuarios.map(u => {
                    const perfil = perfilInfo[u.perfil]
                    const iniciais = u.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                    return (
                      <tr key={u.id} className={`hover:bg-atlia-gray/40 transition-colors ${!u.ativo ? 'opacity-50' : ''}`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-atlia-navy flex items-center justify-center shrink-0">
                              <span className="text-white text-xs font-bold">{iniciais}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{u.nome}</p>
                              <p className="text-xs text-atlia-muted">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-600">{u.secretaria}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${perfil.cor}`}>
                            {perfil.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-atlia-muted">{u.ultimoAcesso}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold
                            ${u.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {u.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-atlia-light text-atlia-muted hover:text-atlia-navy transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-atlia-muted hover:text-atlia-red transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ABA PLANO ── */}
        {aba === 'plano' && (
          <div className="max-w-3xl space-y-6">

            {/* Plano atual */}
            <div className="card border-2 border-atlia-navy">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown size={16} className="text-atlia-navy" />
                    <span className="text-xs font-bold text-atlia-navy uppercase tracking-wider">Plano atual</span>
                  </div>
                  <h2 className="text-2xl font-bold text-atlia-navy">Atlia Pro</h2>
                  <p className="text-atlia-muted text-sm mt-0.5">Municípios acima de 100 mil habitantes</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-atlia-navy">R$ 4.500</p>
                  <p className="text-sm text-atlia-muted">/mês · cobrado mensalmente</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-atlia-muted">
                  <CheckCircle2 size={14} className="text-atlia-green" />
                  Próxima cobrança: <strong className="text-gray-700 ml-1">01/07/2026</strong>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Ativo</span>
              </div>
            </div>

            {/* Recursos do plano */}
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-4">Recursos incluídos</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Projetos ilimitados',
                  'Indicadores ilimitados',
                  'Usuários ilimitados',
                  'Relatórios em PDF',
                  'Mapa estratégico',
                  'Drill-down de projetos',
                  'Suporte prioritário',
                  'Atualizações automáticas',
                ].map(r => (
                  <div key={r} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-atlia-green shrink-0" />
                    <span className="text-sm text-gray-700">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outros planos */}
            <div>
              <h3 className="font-semibold text-atlia-navy text-sm mb-3">Planos disponíveis</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { nome:'Atlia Starter', preco:'R$ 2.500', pop:'Até 30 mil hab.',  destaque:false },
                  { nome:'Atlia Plus',    preco:'R$ 3.500', pop:'Até 100 mil hab.', destaque:false },
                  { nome:'Atlia Pro',     preco:'R$ 4.500', pop:'Acima 100 mil',    destaque:true  },
                ].map(p => (
                  <div key={p.nome} className={`rounded-xl border-2 p-4 ${p.destaque ? 'border-atlia-navy bg-atlia-light/50' : 'border-gray-200'}`}>
                    <p className="font-bold text-atlia-navy text-sm">{p.nome}</p>
                    <p className="text-2xl font-bold text-atlia-navy mt-1">{p.preco}<span className="text-sm font-normal text-atlia-muted">/mês</span></p>
                    <p className="text-xs text-atlia-muted mt-1">{p.pop}</p>
                    {p.destaque
                      ? <span className="mt-3 block text-center text-xs bg-atlia-navy text-white py-1.5 rounded-lg font-semibold">Plano atual</span>
                      : <button className="mt-3 w-full text-xs border border-gray-200 text-gray-600 py-1.5 rounded-lg font-semibold hover:border-atlia-navy hover:text-atlia-navy transition-colors">Mudar plano</button>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Dados de cobrança */}
            <div className="card space-y-4">
              <h3 className="font-semibold text-atlia-navy text-sm flex items-center gap-2">
                <CreditCard size={15} /> Dados de Cobrança
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Razão social',   value:'Prefeitura Municipal de Uberlândia' },
                  { label:'CNPJ',           value:'18.869.867/0001-30'                 },
                  { label:'E-mail de nota', value:'financeiro@uberlandia.mg.gov.br'    },
                  { label:'Método',         value:'Boleto bancário'                    },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input defaultValue={f.value}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue transition-all" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={handleSalvar}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                    ${salvo ? 'bg-atlia-green text-white' : 'bg-atlia-navy text-white hover:bg-atlia-blue'}`}>
                  {salvo ? <><CheckCircle2 size={15} /> Salvo!</> : salvando ? 'Salvando…' : <><Save size={15} /> Salvar</>}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
