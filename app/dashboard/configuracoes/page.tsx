'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import SlidePanel from '@/components/ui/SlidePanel'
import SecretariaForm, { type SecretariaEditavel } from '@/components/forms/SecretariaForm'
import EixoForm, { type EixoEditavel } from '@/components/forms/EixoForm'
import ObjetivoForm, { type ObjetivoEditavel } from '@/components/forms/ObjetivoForm'
import {
  Building2, Users, CreditCard, Layers, Compass, Target,
  Save, Plus, Pencil, Trash2, CheckCircle2,
  Crown, Phone, Mail, Globe, Calendar,
  AlertCircle, Loader2, XCircle,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Aba = 'municipio' | 'secretarias' | 'eixos' | 'objetivos' | 'usuarios' | 'plano'

// ── Tipos ──────────────────────────────────────────────────────
interface SecretariaRow {
  id: string; nome: string; sigla: string | null; responsavel: string | null
  cor: string; ativa: boolean; projetos?: number
}
interface EixoRow {
  id: string; nome: string; descricao: string | null; cor: string; ordem: number
}
interface ObjetivoRow {
  id: string; nome: string; descricao: string | null
  eixo_id: string; eixo_nome: string; eixo_cor: string; pct_atual: number
}
interface UsuarioRow {
  id: string; nome: string; cargo: string | null
  perfil: 'admin' | 'gestor' | 'visualizador'; ativo: boolean
  secretaria_nome: string | null; email?: string
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-atlia-blue focus:ring-1 focus:ring-atlia-blue/20 transition-all'
const labelCls = 'block text-xs font-semibold text-atlia-muted uppercase tracking-wider mb-1.5'

const perfilInfo = {
  admin:        { label: 'Administrador', cor: 'bg-atlia-navy text-white'  },
  gestor:       { label: 'Gestor',        cor: 'bg-blue-100 text-blue-800' },
  visualizador: { label: 'Visualizador',  cor: 'bg-gray-100 text-gray-600' },
}

function AbaBtn({ id, label, icon: Icon, ativa, onClick }: {
  id: Aba; label: string; icon: React.ElementType; ativa: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2.5 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
        ${ativa ? 'border-atlia-navy text-atlia-navy' : 'border-transparent text-atlia-muted hover:text-atlia-navy hover:border-gray-200'}`}>
      <Icon size={15} />{label}
    </button>
  )
}

// ── Componente principal ───────────────────────────────────────
export default function ConfiguracoesPage() {
  const [aba, setAba] = useState<Aba>('municipio')
  const [sucesso, setSucesso] = useState('')

  useEffect(() => {
    if (!sucesso) return
    const t = setTimeout(() => setSucesso(''), 4000)
    return () => clearTimeout(t)
  }, [sucesso])

  // ── Municipio ─────────────────────────────────────────────
  const [municipio, setMunicipio] = useState<Record<string, string>>({})
  const [salvandoMun, setSalvandoMun] = useState(false)
  const [municipioId, setMunicipioId] = useState('')

  const carregarMunicipio = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase.from('municipios').select('*').single()
    if (data) {
      setMunicipioId(data.id)
      setMunicipio({
        nome:           data.nome ?? '',
        estado:         data.estado ?? '',
        populacao:      data.populacao?.toString() ?? '',
        prefeito:       data.prefeito ?? '',
        site:           data.site ?? '',
        email_contato:  data.email_contato ?? '',
        telefone:       data.telefone ?? '',
        endereco:       data.endereco ?? '',
        mandato_inicio: data.mandato_inicio ?? '',
        mandato_fim:    data.mandato_fim ?? '',
        missao:         data.missao ?? '',
        visao:          data.visao ?? '',
        valores:        (data.valores ?? []).join(', '),
      })
    }
  }, [])

  async function salvarMunicipio() {
    setSalvandoMun(true)
    const supabase = createClient()
    await supabase.from('municipios').update({
      nome:           municipio.nome,
      estado:         municipio.estado,
      populacao:      municipio.populacao ? Number(municipio.populacao) : null,
      prefeito:       municipio.prefeito || null,
      site:           municipio.site || null,
      email_contato:  municipio.email_contato || null,
      telefone:       municipio.telefone || null,
      endereco:       municipio.endereco || null,
      mandato_inicio: municipio.mandato_inicio || null,
      mandato_fim:    municipio.mandato_fim || null,
      missao:         municipio.missao || null,
      visao:          municipio.visao || null,
      valores:        municipio.valores
                        ? municipio.valores.split(',').map(v => v.trim()).filter(Boolean)
                        : [],
    }).eq('id', municipioId)
    setSalvandoMun(false)
    setSucesso('Dados do município salvos!')
  }

  // ── Secretarias ───────────────────────────────────────────
  const [secretarias, setSecretarias]         = useState<SecretariaRow[]>([])
  const [carregandoSec, setCarregandoSec]     = useState(true)
  const [formSecAberto, setFormSecAberto]     = useState(false)
  const [secretariaEdit, setSecretariaEdit]   = useState<SecretariaEditavel | undefined>()
  const [confirmDelSec, setConfirmDelSec]     = useState<string | null>(null)

  const carregarSecretarias = useCallback(async () => {
    setCarregandoSec(true)
    const supabase = createClient()
    const [{ data: secs }, { data: projs }] = await Promise.all([
      supabase.from('secretarias').select('*').order('nome'),
      supabase.from('projetos').select('secretaria_id'),
    ])
    const contagem: Record<string, number> = {}
    ;(projs ?? []).forEach((p: any) => { if (p.secretaria_id) contagem[p.secretaria_id] = (contagem[p.secretaria_id] ?? 0) + 1 })
    setSecretarias((secs ?? []).map((s: any) => ({ ...s, projetos: contagem[s.id] ?? 0 })))
    setCarregandoSec(false)
  }, [])

  async function excluirSecretaria(id: string) {
    const supabase = createClient()
    await supabase.from('secretarias').delete().eq('id', id)
    setConfirmDelSec(null)
    carregarSecretarias()
    setSucesso('Secretaria excluída.')
  }

  // ── Eixos ─────────────────────────────────────────────────
  const [eixos, setEixos]                   = useState<EixoRow[]>([])
  const [carregandoEix, setCarregandoEix]   = useState(true)
  const [formEixAberto, setFormEixAberto]   = useState(false)
  const [eixoEdit, setEixoEdit]             = useState<EixoEditavel | undefined>()
  const [confirmDelEix, setConfirmDelEix]   = useState<string | null>(null)

  const carregarEixos = useCallback(async () => {
    setCarregandoEix(true)
    const supabase = createClient()
    const { data } = await supabase.from('eixos').select('*').order('ordem')
    setEixos(data ?? [])
    setCarregandoEix(false)
  }, [])

  async function excluirEixo(id: string) {
    const supabase = createClient()
    await supabase.from('eixos').delete().eq('id', id)
    setConfirmDelEix(null)
    carregarEixos()
    setSucesso('Eixo excluído.')
  }

  // ── Objetivos ─────────────────────────────────────────────
  const [objetivos, setObjetivos]             = useState<ObjetivoRow[]>([])
  const [carregandoObj, setCarregandoObj]     = useState(true)
  const [formObjAberto, setFormObjAberto]     = useState(false)
  const [objetivoEdit, setObjetivoEdit]       = useState<ObjetivoEditavel | undefined>()
  const [confirmDelObj, setConfirmDelObj]     = useState<string | null>(null)

  const carregarObjetivos = useCallback(async () => {
    setCarregandoObj(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('objetivos')
      .select('id, nome, descricao, pct_atual, eixo_id, eixos(nome, cor)')
      .order('eixo_id')
    setObjetivos((data ?? []).map((o: any) => ({
      id:        o.id,
      nome:      o.nome,
      descricao: o.descricao,
      eixo_id:   o.eixo_id,
      eixo_nome: o.eixos?.nome ?? '—',
      eixo_cor:  o.eixos?.cor  ?? '#ccc',
      pct_atual: o.pct_atual,
    })))
    setCarregandoObj(false)
  }, [])

  async function excluirObjetivo(id: string) {
    const supabase = createClient()
    await supabase.from('objetivos').delete().eq('id', id)
    setConfirmDelObj(null)
    carregarObjetivos()
    setSucesso('Objetivo excluído.')
  }

  // ── Usuários ──────────────────────────────────────────────
  const [usuarios, setUsuarios]           = useState<UsuarioRow[]>([])
  const [carregandoUsr, setCarregandoUsr] = useState(true)
  const [convidando, setConvidando]       = useState(false)
  const [emailConvite, setEmailConvite]   = useState('')
  const [nomeConvite, setNomeConvite]     = useState('')
  const [perfilConvite, setPerfilConvite] = useState<'admin' | 'gestor' | 'visualizador'>('gestor')
  const [secConvite, setSecConvite]       = useState('')
  const [erroConvite, setErroConvite]     = useState('')

  const carregarUsuarios = useCallback(async () => {
    setCarregandoUsr(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('usuarios')
      .select('id, nome, cargo, perfil, ativo, secretaria_id, secretarias(nome)')
      .order('nome')
    setUsuarios((data ?? []).map((u: any) => ({
      id:             u.id,
      nome:           u.nome,
      cargo:          u.cargo,
      perfil:         u.perfil,
      ativo:          u.ativo,
      secretaria_nome: u.secretarias?.nome ?? null,
    })))
    setCarregandoUsr(false)
  }, [])

  async function convidarUsuario(e: React.FormEvent) {
    e.preventDefault()
    if (!emailConvite.trim() || !nomeConvite.trim()) {
      setErroConvite('E-mail e nome são obrigatórios.')
      return
    }
    setConvidando(true)
    setErroConvite('')
    try {
      const res = await fetch('/api/convite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:        emailConvite.trim(),
          nome:         nomeConvite.trim(),
          perfil:       perfilConvite,
          secretaria_id: perfilConvite === 'gestor' ? secConvite || null : null,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.erro ?? 'Erro ao convidar usuário')
      setEmailConvite('')
      setNomeConvite('')
      setPerfilConvite('gestor')
      setSecConvite('')
      carregarUsuarios()
      setSucesso(`Convite enviado para ${emailConvite}!`)
    } catch (err: any) {
      setErroConvite(err.message)
    } finally {
      setConvidando(false)
    }
  }

  async function toggleUsuario(id: string, ativo: boolean) {
    const supabase = createClient()
    await supabase.from('usuarios').update({ ativo }).eq('id', id)
    carregarUsuarios()
  }

  // ── Carrega ao trocar de aba ─────────────────────────────
  useEffect(() => {
    if (aba === 'municipio')   carregarMunicipio()
    if (aba === 'secretarias') carregarSecretarias()
    if (aba === 'eixos')       carregarEixos()
    if (aba === 'objetivos')  { carregarObjetivos(); carregarEixos() }
    if (aba === 'usuarios')   { carregarUsuarios();  carregarSecretarias() }
  }, [aba, carregarMunicipio, carregarSecretarias, carregarEixos, carregarObjetivos, carregarUsuarios])

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="flex flex-col flex-1">
      <Header title="Configurações" subtitle="Gestão do município, secretarias e usuários" />

      {/* Banner de sucesso */}
      {sucesso && (
        <div className="mx-8 mt-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
          <CheckCircle2 size={16} className="text-green-500 shrink-0" />{sucesso}
        </div>
      )}

      {/* Abas */}
      <div className="bg-white border-b border-gray-100 px-8 flex gap-1 mt-2">
        <AbaBtn id="municipio"   label="Município"   icon={Building2} ativa={aba==='municipio'}   onClick={() => setAba('municipio')}   />
        <AbaBtn id="secretarias" label="Secretarias" icon={Layers}    ativa={aba==='secretarias'} onClick={() => setAba('secretarias')} />
        <AbaBtn id="eixos"       label="Eixos"       icon={Compass}   ativa={aba==='eixos'}       onClick={() => setAba('eixos')}       />
        <AbaBtn id="objetivos"   label="Objetivos"   icon={Target}    ativa={aba==='objetivos'}   onClick={() => setAba('objetivos')}   />
        <AbaBtn id="usuarios"    label="Usuários"    icon={Users}     ativa={aba==='usuarios'}    onClick={() => setAba('usuarios')}    />
        <AbaBtn id="plano"       label="Plano"       icon={CreditCard} ativa={aba==='plano'}      onClick={() => setAba('plano')}       />
      </div>

      <div className="p-8 flex-1 overflow-y-auto">

        {/* ── ABA MUNICÍPIO ── */}
        {aba === 'municipio' && (
          <div className="max-w-2xl space-y-6">
            <div className="card space-y-5">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Building2 size={16} /> Identidade do Município
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {([
                  { key: 'nome',      label: 'Nome oficial',       full: true,  placeholder: 'Prefeitura Municipal de...' },
                  { key: 'estado',    label: 'Estado (UF)',         full: false, placeholder: 'MG' },
                  { key: 'populacao', label: 'População estimada',  full: false, placeholder: '0' },
                  { key: 'prefeito',  label: 'Prefeito(a)',         full: true,  placeholder: 'Nome completo' },
                  { key: 'mandato_inicio', label: 'Início do mandato', full: false, type: 'date' },
                  { key: 'mandato_fim',    label: 'Fim do mandato',    full: false, type: 'date' },
                ] as const).map(f => (
                  <div key={f.key} className={f.full ? 'col-span-2' : ''}>
                    <label className={labelCls}>{f.label}</label>
                    <input
                      type={(f as any).type ?? 'text'}
                      value={municipio[f.key] ?? ''}
                      onChange={e => setMunicipio(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={(f as any).placeholder}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="card space-y-4">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Phone size={16} /> Contato
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {([
                  { key: 'site',          label: 'Site oficial',    icon: Globe,  placeholder: 'www.municipio.mg.gov.br' },
                  { key: 'email_contato', label: 'E-mail geral',    icon: Mail,   placeholder: 'contato@municipio.mg.gov.br' },
                  { key: 'telefone',      label: 'Telefone',        icon: Phone,  placeholder: '(00) 0000-0000' },
                  { key: 'endereco',      label: 'Endereço sede',   icon: Globe,  placeholder: 'Rua, número, bairro' },
                ] as const).map(f => (
                  <div key={f.key}>
                    <label className={labelCls}>{f.label}</label>
                    <div className="relative">
                      <f.icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-atlia-muted" />
                      <input
                        value={municipio[f.key] ?? ''}
                        onChange={e => setMunicipio(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className={inputCls + ' pl-8'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={salvarMunicipio} disabled={salvandoMun}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-atlia-navy text-white hover:bg-atlia-blue transition-colors disabled:opacity-70">
                {salvandoMun ? <><Loader2 size={15} className="animate-spin" />Salvando…</> : <><Save size={15} />Salvar alterações</>}
              </button>
            </div>
          </div>

          {/* Plano de governo — identidade estratégica */}
          <div className="card space-y-5">
            <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
              <Calendar size={16} /> Identidade Estratégica
            </h2>
            <p className="text-xs text-atlia-muted -mt-2">Exibidos no Mapa Estratégico do sistema.</p>
            <div>
              <label className={labelCls}>Missão</label>
              <textarea
                value={municipio.missao ?? ''}
                onChange={e => setMunicipio(prev => ({ ...prev, missao: e.target.value }))}
                rows={3}
                placeholder="Promover uma cidade com foco na cidadania, inovação..."
                className={inputCls + ' resize-none'}
              />
            </div>
            <div>
              <label className={labelCls}>Visão</label>
              <textarea
                value={municipio.visao ?? ''}
                onChange={e => setMunicipio(prev => ({ ...prev, visao: e.target.value }))}
                rows={3}
                placeholder="Consolidar, até 2035, o município como uma cidade inteligente..."
                className={inputCls + ' resize-none'}
              />
            </div>
            <div>
              <label className={labelCls}>
                Valores <span className="text-xs text-gray-400 font-normal">(separe por vírgula)</span>
              </label>
              <input
                type="text"
                value={municipio.valores ?? ''}
                onChange={e => setMunicipio(prev => ({ ...prev, valores: e.target.value }))}
                placeholder="Inovação, Ética e Transparência, Sustentabilidade"
                className={inputCls}
              />
              {municipio.valores && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {municipio.valores.split(',').map(v => v.trim()).filter(Boolean).map(v => (
                    <span key={v} className="bg-green-50 text-green-800 border border-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end pt-1">
              <button onClick={salvarMunicipio} disabled={salvandoMun}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-atlia-navy text-white hover:bg-atlia-blue transition-colors disabled:opacity-70">
                {salvandoMun ? <><Loader2 size={15} className="animate-spin" />Salvando…</> : <><Save size={15} />Salvar alterações</>}
              </button>
            </div>
          </div>
        )}

        {/* ── ABA SECRETARIAS ── */}
        {aba === 'secretarias' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-atlia-muted">
                {secretarias.filter(s => s.ativa).length} ativas · {secretarias.filter(s => !s.ativa).length} inativas
              </p>
              <button onClick={() => { setSecretariaEdit(undefined); setFormSecAberto(true) }}
                className="btn-primary flex items-center gap-2">
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
                  {carregandoSec ? (
                    <tr><td colSpan={5} className="py-12 text-center text-atlia-muted">
                      <Loader2 size={20} className="mx-auto mb-2 animate-spin opacity-40" />Carregando…
                    </td></tr>
                  ) : secretarias.map(s => (
                    <tr key={s.id} className={`hover:bg-atlia-gray/40 transition-colors ${!s.ativa ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.cor }} />
                          <div>
                            <p className="font-medium text-gray-800">{s.nome}</p>
                            {s.sigla && <p className="text-xs text-atlia-muted">{s.sigla}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{s.responsavel ?? '—'}</td>
                      <td className="px-4 py-3.5 text-center font-semibold text-atlia-navy">{s.projetos}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${s.ativa ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {s.ativa ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {confirmDelSec === s.id ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-xs text-red-600">Confirmar?</span>
                            <button onClick={() => excluirSecretaria(s.id)} className="text-xs text-red-600 font-semibold hover:underline">Sim</button>
                            <button onClick={() => setConfirmDelSec(null)} className="text-xs text-gray-500 hover:underline">Não</button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => {
                              setSecretariaEdit({ id: s.id, nome: s.nome, sigla: s.sigla ?? '', responsavel: s.responsavel ?? '', cor: s.cor, ativa: s.ativa })
                              setFormSecAberto(true)
                            }} className="p-1.5 rounded-lg hover:bg-atlia-light text-atlia-muted hover:text-atlia-navy transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => setConfirmDelSec(s.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-atlia-muted hover:text-atlia-red transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={16} className="text-atlia-blue shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">Secretarias inativas não aparecem nos filtros, mas os projetos vinculados são preservados.</p>
            </div>
          </div>
        )}

        {/* ── ABA EIXOS ── */}
        {aba === 'eixos' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-atlia-muted">{eixos.length} eixo(s) estratégico(s)</p>
              <button onClick={() => { setEixoEdit(undefined); setFormEixAberto(true) }}
                className="btn-primary flex items-center gap-2">
                <Plus size={15} /> Novo Eixo
              </button>
            </div>

            {carregandoEix ? (
              <div className="py-12 text-center text-atlia-muted"><Loader2 size={20} className="mx-auto mb-2 animate-spin opacity-40" />Carregando…</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {eixos.map(ex => (
                  <div key={ex.id} className="card border-l-4 hover:shadow-md transition-shadow"
                    style={{ borderLeftColor: ex.cor }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ex.cor }} />
                          <span className="text-xs text-atlia-muted font-medium">Eixo {ex.ordem}</span>
                        </div>
                        <p className="font-semibold text-atlia-navy">{ex.nome}</p>
                        {ex.descricao && <p className="text-xs text-atlia-muted mt-1 line-clamp-2">{ex.descricao}</p>}
                      </div>
                      <div className="flex items-center gap-1 ml-3">
                        {confirmDelEix === ex.id ? (
                          <>
                            <button onClick={() => excluirEixo(ex.id)} className="text-xs text-red-600 font-semibold hover:underline px-1">Sim</button>
                            <button onClick={() => setConfirmDelEix(null)} className="text-xs text-gray-500 hover:underline px-1">Não</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => {
                              setEixoEdit({ id: ex.id, nome: ex.nome, descricao: ex.descricao ?? '', cor: ex.cor, ordem: ex.ordem })
                              setFormEixAberto(true)
                            }} className="p-1.5 rounded-lg hover:bg-atlia-light text-atlia-muted hover:text-atlia-navy transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => setConfirmDelEix(ex.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-atlia-muted hover:text-atlia-red transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ABA OBJETIVOS ── */}
        {aba === 'objetivos' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-atlia-muted">{objetivos.length} objetivo(s) estratégico(s)</p>
              <button onClick={() => { setObjetivoEdit(undefined); setFormObjAberto(true) }}
                className="btn-primary flex items-center gap-2">
                <Plus size={15} /> Novo Objetivo
              </button>
            </div>

            {carregandoObj ? (
              <div className="py-12 text-center text-atlia-muted"><Loader2 size={20} className="mx-auto mb-2 animate-spin opacity-40" />Carregando…</div>
            ) : (
              <div className="card p-0 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-atlia-gray border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Objetivo</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Eixo</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider w-28">Progresso</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {objetivos.map(ob => (
                      <tr key={ob.id} className="hover:bg-atlia-gray/40 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-gray-800">{ob.nome}</p>
                          {ob.descricao && <p className="text-xs text-atlia-muted mt-0.5 line-clamp-1">{ob.descricao}</p>}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ob.eixo_cor }} />
                            <span className="text-gray-600 text-xs">{ob.eixo_nome}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`text-sm font-bold ${ob.pct_atual >= 70 ? 'text-atlia-green' : ob.pct_atual >= 40 ? 'text-yellow-600' : 'text-atlia-red'}`}>
                            {ob.pct_atual}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          {confirmDelObj === ob.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-xs text-red-600">Confirmar?</span>
                              <button onClick={() => excluirObjetivo(ob.id)} className="text-xs text-red-600 font-semibold hover:underline">Sim</button>
                              <button onClick={() => setConfirmDelObj(null)} className="text-xs text-gray-500 hover:underline">Não</button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => {
                                setObjetivoEdit({ id: ob.id, nome: ob.nome, descricao: ob.descricao ?? '', eixo_id: ob.eixo_id, pct_atual: ob.pct_atual })
                                setFormObjAberto(true)
                              }} className="p-1.5 rounded-lg hover:bg-atlia-light text-atlia-muted hover:text-atlia-navy transition-colors">
                                <Pencil size={14} />
                              </button>
                              <button onClick={() => setConfirmDelObj(ob.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-atlia-muted hover:text-atlia-red transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── ABA USUÁRIOS ── */}
        {aba === 'usuarios' && (
          <div className="space-y-6">

            {/* Formulário de convite */}
            <div className="card space-y-4">
              <h2 className="font-semibold text-atlia-navy flex items-center gap-2">
                <Plus size={16} /> Convidar novo usuário
              </h2>
              <form onSubmit={convidarUsuario}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className={labelCls}>E-mail <span className="text-red-500">*</span></label>
                    <input type="email" value={emailConvite} onChange={e => setEmailConvite(e.target.value)}
                      placeholder="usuario@municipio.gov.br" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nome completo <span className="text-red-500">*</span></label>
                    <input type="text" value={nomeConvite} onChange={e => setNomeConvite(e.target.value)}
                      placeholder="Nome Sobrenome" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Perfil de acesso</label>
                    <select value={perfilConvite} onChange={e => setPerfilConvite(e.target.value as any)} className={inputCls + ' bg-white'}>
                      <option value="admin">Administrador — acesso total</option>
                      <option value="gestor">Gestor — edita sua secretaria</option>
                      <option value="visualizador">Visualizador — somente leitura</option>
                    </select>
                  </div>
                  {perfilConvite === 'gestor' && (
                    <div>
                      <label className={labelCls}>Secretaria</label>
                      <select value={secConvite} onChange={e => setSecConvite(e.target.value)} className={inputCls + ' bg-white'}>
                        <option value="">— Selecionar —</option>
                        {secretarias.filter(s => s.ativa).map(s => (
                          <option key={s.id} value={s.id}>{s.nome}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {erroConvite && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-3">
                    <XCircle size={14} className="shrink-0" />{erroConvite}
                  </div>
                )}
                <button type="submit" disabled={convidando}
                  className="flex items-center gap-2 px-5 py-2 bg-atlia-navy text-white text-sm font-semibold rounded-lg hover:bg-atlia-blue transition-colors disabled:opacity-70">
                  {convidando ? <><Loader2 size={14} className="animate-spin" />Enviando…</> : <><Mail size={14} />Enviar convite</>}
                </button>
              </form>
            </div>

            {/* Lista */}
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-atlia-gray border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Usuário</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Secretaria</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Perfil</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-atlia-muted uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {carregandoUsr ? (
                    <tr><td colSpan={4} className="py-12 text-center text-atlia-muted">
                      <Loader2 size={20} className="mx-auto mb-2 animate-spin opacity-40" />Carregando…
                    </td></tr>
                  ) : usuarios.map(u => {
                    const pi = perfilInfo[u.perfil]
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
                              {u.cargo && <p className="text-xs text-atlia-muted">{u.cargo}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs">{u.secretaria_nome ?? '—'}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${pi.cor}`}>{pi.label}</span>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button onClick={() => toggleUsuario(u.id, !u.ativo)}
                            className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${u.ativo ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                            {u.ativo ? 'Ativo' : 'Inativo'}
                          </button>
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
                  <p className="text-sm text-atlia-muted">/mês</p>
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
            <div className="card">
              <h3 className="font-semibold text-atlia-navy text-sm mb-4">Recursos incluídos</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Projetos ilimitados','Indicadores ilimitados','Usuários ilimitados','Relatórios em PDF','Mapa estratégico','Drill-down de projetos','Suporte prioritário','Atualizações automáticas'].map(r => (
                  <div key={r} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-atlia-green shrink-0" />
                    <span className="text-sm text-gray-700">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Slide panels */}
      <SlidePanel aberto={formSecAberto} titulo={secretariaEdit?.id ? 'Editar Secretaria' : 'Nova Secretaria'} onFechar={() => setFormSecAberto(false)}>
        <SecretariaForm
          secretariaInicial={secretariaEdit}
          onSuccess={msg => { setFormSecAberto(false); setSucesso(msg); carregarSecretarias() }}
          onCancelar={() => setFormSecAberto(false)}
        />
      </SlidePanel>

      <SlidePanel aberto={formEixAberto} titulo={eixoEdit?.id ? 'Editar Eixo' : 'Novo Eixo'} onFechar={() => setFormEixAberto(false)}>
        <EixoForm
          eixoInicial={eixoEdit}
          ordemSugerida={eixos.length + 1}
          onSuccess={msg => { setFormEixAberto(false); setSucesso(msg); carregarEixos() }}
          onCancelar={() => setFormEixAberto(false)}
        />
      </SlidePanel>

      <SlidePanel aberto={formObjAberto} titulo={objetivoEdit?.id ? 'Editar Objetivo' : 'Novo Objetivo'} onFechar={() => setFormObjAberto(false)}>
        <ObjetivoForm
          objetivoInicial={objetivoEdit}
          onSuccess={msg => { setFormObjAberto(false); setSucesso(msg); carregarObjetivos() }}
          onCancelar={() => setFormObjAberto(false)}
        />
      </SlidePanel>

    </div>
  )
}
