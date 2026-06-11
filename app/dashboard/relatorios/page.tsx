'use client'
import { useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import Header from '@/components/Header'
import {
  FileText, Download, BarChart3, FolderKanban, Target,
  TrendingUp, CheckCircle2, Clock, Loader2, X, Eye,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

/* ═══════════════════════════════════════════════════════ Types */

interface Relatorio {
  id: string
  titulo: string
  descricao: string
  categoria: 'projetos' | 'indicadores' | 'estrategico' | 'orcamento'
  icone: LucideIcon
}

interface DadosRelatorio {
  municipioNome: string
  munData: {
    nome?:     string | null
    prefeito?: string | null
    missao?:   string | null
    visao?:    string | null
    valores?:  string | null
  }
  projetos:    any[]
  indicadores: any[]
  eixos:       any[]
}

/* ═══════════════════════════════════════════════════════ Constants */

const relatorios: Relatorio[] = [
  {
    id: '1',
    titulo:    'Relatório Executivo de Projetos',
    descricao: 'Visão consolidada de toda a carteira de projetos: status, progresso, prazos e responsáveis. Ideal para reuniões de acompanhamento.',
    categoria: 'projetos',
    icone:     FolderKanban,
  },
  {
    id: '2',
    titulo:    'Projetos Atrasados e em Atenção',
    descricao: 'Lista dos projetos com status crítico, contendo desvio de prazo, responsável e ação recomendada.',
    categoria: 'projetos',
    icone:     Clock,
  },
  {
    id: '3',
    titulo:    'Boletim de Indicadores de Desempenho',
    descricao: 'Comparativo entre metas e resultados atuais de todos os KPIs estratégicos, por secretaria.',
    categoria: 'indicadores',
    icone:     TrendingUp,
  },
  {
    id: '4',
    titulo:    'Relatório de Atingimento de Metas',
    descricao: 'Percentual de atingimento por eixo temático e objetivo estratégico. Adequado para prestação de contas.',
    categoria: 'estrategico',
    icone:     Target,
  },
  {
    id: '5',
    titulo:    'Mapa Estratégico — Síntese',
    descricao: 'Resumo da Missão, Visão, Valores e dos eixos temáticos com seus objetivos e % de atingimento.',
    categoria: 'estrategico',
    icone:     BarChart3,
  },
  {
    id: '6',
    titulo:    'Execução Orçamentária por Secretaria',
    descricao: 'Demonstrativo do orçamento previsto versus executado por secretaria e por projeto.',
    categoria: 'orcamento',
    icone:     CheckCircle2,
  },
]

const categoriaLabel: Record<string, string> = {
  projetos:    'Projetos',
  indicadores: 'Indicadores',
  estrategico: 'Estratégico',
  orcamento:   'Orçamento',
}

const categoriaStyle: Record<string, string> = {
  projetos:    'bg-blue-50 text-blue-700 border-blue-200',
  indicadores: 'bg-purple-50 text-purple-700 border-purple-200',
  estrategico: 'bg-atlia-light text-atlia-navy border-atlia-navy/20',
  orcamento:   'bg-green-50 text-green-700 border-green-200',
}

const statusLabel: Record<string, string> = {
  em_andamento: 'Em andamento',
  concluido:    'Concluído',
  atencao:      'Atenção',
  atrasado:     'Atrasado',
  nao_iniciado: 'Não iniciado',
}

const statusChipStyle: Record<string, string> = {
  em_andamento: 'bg-green-100 text-green-800',
  concluido:    'bg-green-100 text-green-800',
  atencao:      'bg-yellow-100 text-yellow-800',
  atrasado:     'bg-red-100 text-red-800',
  nao_iniciado: 'bg-gray-100 text-gray-600',
}

/* ═══════════════════════════════════════════════════════ Pure helpers */

function fmtReais(v: number): string {
  return v.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  })
}

function pctNum(valor: number, total: number): number {
  if (!total) return 0
  return Math.round((valor / total) * 100)
}

function calcAtingimento(ind: any): number {
  const meta: number  = ind.meta        ?? 0
  const valor: number = ind.valor_atual  ?? 0
  if (!meta) return 0
  if (ind.criterio === 'menor_melhor') {
    if (!valor) return 100
    return Math.min(100, Math.round((meta / valor) * 100))
  }
  return Math.min(100, Math.round((valor / meta) * 100))
}

function fmtData(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR')
}

function atingimentoCor(pct: number): string {
  if (pct >= 100) return '#166534'
  if (pct >= 80)  return '#1d4ed8'
  if (pct >= 60)  return '#92400e'
  return '#991b1b'
}

/* ═══════════════════════════════════════════════════════ Data fetch */

async function fetchDadosRelatorio(relId: string): Promise<DadosRelatorio> {
  const supabase = createClient()

  const { data: munRow } = await supabase
    .from('municipios')
    .select('nome, prefeito, missao, visao, valores')
    .single()
  const munData          = (munRow as any) ?? {}
  const municipioNome: string = munData.nome ?? 'Prefeitura Municipal'

  let projetos:    any[] = []
  let indicadores: any[] = []
  let eixos:       any[] = []

  if (relId === '1') {
    const { data } = await supabase
      .from('projetos')
      .select('nome, status, pct, orcamento, executado, prazo_fim, responsavel, secretarias(nome)')
      .order('nome')
    projetos = data ?? []
  } else if (relId === '2') {
    const { data } = await supabase
      .from('projetos')
      .select('nome, status, pct, prazo_fim, responsavel, secretarias(nome)')
      .in('status', ['atrasado', 'atencao'])
      .order('status')
    projetos = data ?? []
  } else if (relId === '3') {
    const { data } = await supabase
      .from('indicadores')
      .select('nome, valor_atual, meta, unidade, criterio, secretarias(nome)')
      .order('nome')
    indicadores = data ?? []
  } else if (relId === '4') {
    const { data } = await supabase
      .from('eixos')
      .select('nome, objetivos(nome, pct_atual)')
      .order('ordem')
    eixos = data ?? []
  } else if (relId === '5') {
    const { data } = await supabase
      .from('eixos')
      .select('nome, descricao, objetivos(nome, pct_atual)')
      .order('ordem')
    eixos = data ?? []
  } else if (relId === '6') {
    const { data } = await supabase
      .from('projetos')
      .select('nome, orcamento, executado, secretarias(nome)')
      .order('nome')
    projetos = data ?? []
  }

  return { municipioNome, munData, projetos, indicadores, eixos }
}

/* ═══════════════════════════════════════════════════════ PDF helpers */

function pdfCabecalho(doc: any, titulo: string, municipioNome: string, hoje: string): void {
  doc.setFillColor(31, 56, 100)
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18); doc.setFont('helvetica', 'bold')
  doc.text('atlia', 14, 12)
  doc.setFontSize(9); doc.setFont('helvetica', 'normal')
  doc.text('gestão municipal', 14, 18)
  doc.setFontSize(10)
  doc.text(municipioNome, 196, 12, { align: 'right' })
  doc.text(hoje,           196, 18, { align: 'right' })

  doc.setTextColor(31, 56, 100)
  doc.setFontSize(16); doc.setFont('helvetica', 'bold')
  doc.text(titulo, 14, 42)
  doc.setDrawColor(214, 228, 240); doc.setLineWidth(0.5)
  doc.line(14, 46, 196, 46)
}

function pdfRodape(doc: any, hoje: string): void {
  doc.setDrawColor(214, 228, 240); doc.setLineWidth(0.3)
  doc.line(14, 280, 196, 280)
  doc.setTextColor(156, 163, 175); doc.setFontSize(8)
  doc.text(`Gerado por Atlia — Gestão Municipal em ${hoje}`, 14, 286)
  doc.text('1', 196, 286, { align: 'right' })
}

function pdfSecao(doc: any, titulo: string, y: number): number {
  doc.setTextColor(31, 56, 100); doc.setFontSize(12); doc.setFont('helvetica', 'bold')
  doc.text(titulo, 14, y)
  doc.setDrawColor(214, 228, 240); doc.setLineWidth(0.3)
  doc.line(14, y + 2, 196, y + 2)
  return y + 8
}

function pdfLinha(doc: any, texto: string, y: number): number {
  doc.setTextColor(55, 65, 81); doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  doc.text(texto, 14, y)
  return y + 6
}

async function gerarPDF(rel: Relatorio, dados: DadosRelatorio): Promise<void> {
  const { jsPDF }   = await import('jspdf')
  const autoTable   = (await import('jspdf-autotable')).default
  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  pdfCabecalho(doc, rel.titulo, dados.municipioNome, hoje)

  doc.setTextColor(107, 114, 128); doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  const descLinhas = doc.splitTextToSize(rel.descricao, 182) as string[]
  doc.text(descLinhas, 14, 54)
  let y: number = 54 + descLinhas.length * 5 + 6

  /* ── 1: Executivo de Projetos ── */
  if (rel.id === '1') {
    const { projetos } = dados
    const counts: Record<string, number> = {}
    let totalOrc = 0; let totalExec = 0
    projetos.forEach(p => {
      counts[p.status] = (counts[p.status] ?? 0) + 1
      totalOrc  += p.orcamento ?? 0
      totalExec += p.executado  ?? 0
    })
    y = pdfSecao(doc, 'Resumo Executivo', y)
    y = pdfLinha(doc, `Total de projetos: ${projetos.length}   |   Em andamento: ${counts.em_andamento ?? 0}   |   Atenção: ${counts.atencao ?? 0}   |   Atrasados: ${counts.atrasado ?? 0}`, y)
    y = pdfLinha(doc, `Orçamento total: ${fmtReais(totalOrc)}   |   Executado: ${fmtReais(totalExec)} (${pctNum(totalExec, totalOrc)}%)`, y)
    y += 2; y = pdfSecao(doc, 'Carteira de Projetos', y)
    autoTable(doc, {
      startY: y,
      head: [['Projeto', 'Secretaria', 'Status', 'Prog.', 'Prazo']],
      body: projetos.map(p => [p.nome, (p.secretarias as any)?.nome ?? '—', statusLabel[p.status] ?? p.status, `${p.pct ?? 0}%`, fmtData(p.prazo_fim)]),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 40 }, 2: { cellWidth: 30 }, 3: { cellWidth: 16, halign: 'center' }, 4: { cellWidth: 26 } },
    })
  }

  /* ── 2: Atrasados e Atenção ── */
  else if (rel.id === '2') {
    const { projetos } = dados
    y = pdfSecao(doc, 'Projetos Críticos', y)
    y = pdfLinha(doc, `Total críticos: ${projetos.length}   |   Atrasados: ${projetos.filter(p => p.status === 'atrasado').length}   |   Atenção: ${projetos.filter(p => p.status === 'atencao').length}`, y)
    y += 2
    if (projetos.length === 0) {
      pdfLinha(doc, 'Nenhum projeto crítico no momento.', y)
    } else {
      autoTable(doc, {
        startY: y,
        head: [['Projeto', 'Secretaria', 'Status', 'Prog.', 'Prazo', 'Responsável']],
        body: projetos.map(p => [p.nome, (p.secretarias as any)?.nome ?? '—', statusLabel[p.status] ?? p.status, `${p.pct ?? 0}%`, fmtData(p.prazo_fim), p.responsavel ?? '—']),
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [192, 0, 0], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [255, 245, 245] },
        columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 32 }, 2: { cellWidth: 24 }, 3: { cellWidth: 14, halign: 'center' }, 4: { cellWidth: 24 }, 5: { cellWidth: 28 } },
      })
    }
  }

  /* ── 3: Boletim de Indicadores ── */
  else if (rel.id === '3') {
    const { indicadores } = dados
    const acimaMeta = indicadores.filter(i => calcAtingimento(i) >= 100).length
    const abaixo80  = indicadores.filter(i => calcAtingimento(i) < 80).length
    y = pdfSecao(doc, 'Resumo dos Indicadores', y)
    y = pdfLinha(doc, `Total monitorados: ${indicadores.length}   |   Atingindo meta (≥ 100%): ${acimaMeta}   |   Abaixo de 80%: ${abaixo80}`, y)
    y += 2
    autoTable(doc, {
      startY: y,
      head: [['Indicador', 'Secretaria', 'Atual', 'Meta', 'Unidade', 'Atingimento']],
      body: indicadores.map(ind => [ind.nome, (ind.secretarias as any)?.nome ?? '—', ind.valor_atual !== null && ind.valor_atual !== undefined ? String(ind.valor_atual) : '—', ind.meta !== null && ind.meta !== undefined ? String(ind.meta) : '—', ind.unidade ?? '—', `${calcAtingimento(ind)}%`]),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [88, 43, 140], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 245, 255] },
      columnStyles: { 0: { cellWidth: 58 }, 1: { cellWidth: 36 }, 2: { cellWidth: 18, halign: 'center' }, 3: { cellWidth: 18, halign: 'center' }, 4: { cellWidth: 22 }, 5: { cellWidth: 20, halign: 'center' } },
      didParseCell: (data: any) => {
        if (data.section !== 'body' || data.column.index !== 5) return
        const val = parseInt(data.cell.raw as string, 10)
        data.cell.styles.textColor = val >= 100 ? [0, 112, 0] : val < 80 ? [192, 0, 0] : [31, 56, 100]
        data.cell.styles.fontStyle = 'bold'
      },
    })
  }

  /* ── 4: Atingimento de Metas ── */
  else if (rel.id === '4') {
    const { eixos } = dados
    y = pdfSecao(doc, 'Atingimento por Eixo Estratégico', y)
    const tableBody: string[][] = []
    eixos.forEach((eixo: any) => {
      const objetivos: any[] = eixo.objetivos ?? []
      const mediaEixo: number = objetivos.length > 0
        ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length)
        : 0
      tableBody.push([eixo.nome, 'Média do eixo', `${mediaEixo}%`])
      objetivos.forEach((obj: any) => tableBody.push(['', obj.nome, `${obj.pct_atual ?? 0}%`]))
    })
    autoTable(doc, {
      startY: y,
      head: [['Eixo', 'Objetivo', 'Atingimento']],
      body: tableBody,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      columnStyles: { 0: { cellWidth: 52 }, 1: { cellWidth: 110 }, 2: { cellWidth: 20, halign: 'center' } },
      didParseCell: (data: any) => {
        if (data.section !== 'body') return
        if (data.column.index === 0 && (data.cell.raw as string) !== '') {
          data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = [31, 56, 100]; data.cell.styles.fillColor = [214, 228, 240]
        }
        if (data.column.index === 1 && (data.cell.raw as string) === 'Média do eixo') {
          data.cell.styles.fontStyle = 'bold'; data.cell.styles.textColor = [31, 56, 100]; data.cell.styles.fillColor = [214, 228, 240]
        }
        if (data.column.index === 2) {
          const val = parseInt(data.cell.raw as string, 10)
          data.cell.styles.textColor = val >= 100 ? [0, 112, 0] : val < 80 ? [192, 0, 0] : [55, 65, 81]
        }
      },
    })
  }

  /* ── 5: Mapa Estratégico ── */
  else if (rel.id === '5') {
    const { eixos, munData } = dados
    if (munData.missao || munData.visao || munData.valores) {
      y = pdfSecao(doc, 'Missão, Visão e Valores', y)
      const addCampo = (rotulo: string, texto: string, yC: number): number => {
        doc.setTextColor(31, 56, 100); doc.setFontSize(9); doc.setFont('helvetica', 'bold')
        doc.text(`${rotulo}:`, 14, yC)
        doc.setTextColor(55, 65, 81); doc.setFont('helvetica', 'normal')
        const linhas = doc.splitTextToSize(texto, 160) as string[]
        doc.text(linhas, 40, yC)
        return yC + linhas.length * 5 + 3
      }
      if (munData.missao)  y = addCampo('Missão',  munData.missao,  y)
      if (munData.visao)   y = addCampo('Visão',   munData.visao,   y)
      if (munData.valores) y = addCampo('Valores', munData.valores, y)
      y += 2
    }
    y = pdfSecao(doc, 'Eixos Estratégicos', y)
    autoTable(doc, {
      startY: y,
      head: [['Eixo Estratégico', 'Qtd. Objetivos', 'Atingimento Médio']],
      body: eixos.map((eixo: any) => {
        const objetivos: any[] = eixo.objetivos ?? []
        const media = objetivos.length > 0 ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length) : 0
        return [eixo.nome, String(objetivos.length), `${media}%`]
      }),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 40, halign: 'center' }, 2: { cellWidth: 42, halign: 'center' } },
    })
  }

  /* ── 6: Orçamento por Secretaria ── */
  else if (rel.id === '6') {
    const { projetos } = dados
    const secMap = new Map<string, { orcamento: number; executado: number }>()
    projetos.forEach(p => {
      const n: string = (p.secretarias as any)?.nome ?? 'Sem secretaria'
      if (!secMap.has(n)) secMap.set(n, { orcamento: 0, executado: 0 })
      const s = secMap.get(n)!
      s.orcamento += p.orcamento ?? 0
      s.executado  += p.executado ?? 0
    })
    const totalOrc: number  = projetos.reduce((s: number, p: any) => s + (p.orcamento ?? 0), 0)
    const totalExec: number = projetos.reduce((s: number, p: any) => s + (p.executado  ?? 0), 0)
    y = pdfSecao(doc, 'Resumo Orçamentário', y)
    y = pdfLinha(doc, `Orçamento total: ${fmtReais(totalOrc)}   |   Executado: ${fmtReais(totalExec)}   |   Execução: ${pctNum(totalExec, totalOrc)}%`, y)
    y += 2; y = pdfSecao(doc, 'Por Secretaria', y)
    autoTable(doc, {
      startY: y,
      head: [['Secretaria', 'Orçamento Previsto', 'Executado', 'Execução %']],
      body: Array.from(secMap.entries()).map(([nome, d]) => [nome, fmtReais(d.orcamento), fmtReais(d.executado), `${pctNum(d.executado, d.orcamento)}%`]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [0, 112, 0], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 255, 245] },
      columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 44, halign: 'right' }, 2: { cellWidth: 44, halign: 'right' }, 3: { cellWidth: 24, halign: 'center' } },
    })
    const finalY: number = (doc as any).lastAutoTable?.finalY ?? y
    if (finalY < 240) {
      let dy: number = finalY + 10
      dy = pdfSecao(doc, 'Detalhe por Projeto', dy)
      autoTable(doc, {
        startY: dy,
        head: [['Projeto', 'Secretaria', 'Orçamento', 'Executado', '%']],
        body: projetos.map(p => [p.nome, (p.secretarias as any)?.nome ?? '—', fmtReais(p.orcamento ?? 0), fmtReais(p.executado ?? 0), `${pctNum(p.executado ?? 0, p.orcamento ?? 0)}%`]),
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        columnStyles: { 0: { cellWidth: 58 }, 1: { cellWidth: 38 }, 2: { cellWidth: 32, halign: 'right' }, 3: { cellWidth: 32, halign: 'right' }, 4: { cellWidth: 12, halign: 'center' } },
      })
    }
  }

  pdfRodape(doc, hoje)
  doc.save(`${rel.titulo.replace(/\s+/g, '_')}.pdf`)
}

/* ═══════════════════════════════════════════════════════ HTML preview sub-components */

function SecTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-[#1F3864]">{children}</h2>
      <div className="h-px bg-[#D6E4F0] mt-1" />
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
      <div className="text-xl font-bold text-[#1F3864] leading-none">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
      {sub && <div className="text-xs font-medium text-atlia-muted mt-0.5">{sub}</div>}
    </div>
  )
}

function HtmlTable({
  headers, rows, headColor = '#1F3864',
}: {
  headers: string[]
  rows: ReactNode[][]
  headColor?: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr style={{ backgroundColor: headColor }}>
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2.5 text-left font-semibold text-white whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-3 py-6 text-center text-gray-400">
                Nenhum dado encontrado
              </td>
            </tr>
          ) : rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-700 border-b border-gray-100 align-middle">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusChip({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusChipStyle[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {statusLabel[status] ?? status}
    </span>
  )
}

function PctBar({ value, color = '#1F3864' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{value}%</span>
    </div>
  )
}

/* Content per report */
function Rel1({ dados }: { dados: DadosRelatorio }) {
  const { projetos } = dados
  const counts: Record<string, number> = {}
  let orc = 0; let exec = 0
  projetos.forEach(p => {
    counts[p.status] = (counts[p.status] ?? 0) + 1
    orc  += p.orcamento ?? 0
    exec += p.executado  ?? 0
  })
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SecTitle>Resumo Executivo</SecTitle>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total de projetos"    value={projetos.length} />
          <StatCard label="Em andamento"          value={counts.em_andamento ?? 0} />
          <StatCard label="Concluídos"            value={counts.concluido    ?? 0} />
          <StatCard label="Requerem atenção"      value={counts.atencao      ?? 0} />
          <StatCard label="Atrasados"             value={counts.atrasado     ?? 0} />
          <StatCard label="Não iniciados"         value={counts.nao_iniciado ?? 0} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="text-xs text-blue-600 font-medium">Orçamento total autorizado</div>
            <div className="text-lg font-bold text-[#1F3864] mt-0.5">{fmtReais(orc)}</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3">
            <div className="text-xs text-green-600 font-medium">Total executado · {pctNum(exec, orc)}%</div>
            <div className="text-lg font-bold text-green-700 mt-0.5">{fmtReais(exec)}</div>
            <div className="mt-2 bg-green-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-green-600" style={{ width: `${pctNum(exec, orc)}%` }} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <SecTitle>Carteira de Projetos</SecTitle>
        <HtmlTable
          headers={['Projeto', 'Secretaria', 'Status', 'Progresso', 'Prazo']}
          rows={projetos.map(p => [
            <span className="font-medium text-[#1F3864]">{p.nome}</span>,
            (p.secretarias as any)?.nome ?? '—',
            <StatusChip status={p.status} />,
            <PctBar value={p.pct ?? 0} color={p.status === 'atrasado' ? '#b91c1c' : p.status === 'atencao' ? '#d97706' : '#1F3864'} />,
            fmtData(p.prazo_fim),
          ])}
        />
      </div>
    </div>
  )
}

function Rel2({ dados }: { dados: DadosRelatorio }) {
  const { projetos } = dados
  const atrasados = projetos.filter(p => p.status === 'atrasado')
  const atencao   = projetos.filter(p => p.status === 'atencao')
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SecTitle>Projetos Críticos</SecTitle>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total críticos"    value={projetos.length}  />
          <StatCard label="Atrasados"          value={atrasados.length} />
          <StatCard label="Requerem atenção"   value={atencao.length}   />
        </div>
      </div>
      {projetos.length === 0 ? (
        <div className="text-center py-10 text-green-700 bg-green-50 rounded-xl border border-green-200">
          <div className="text-2xl mb-1">✓</div>
          <p className="font-semibold">Nenhum projeto crítico no momento!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <SecTitle>Lista de Projetos Críticos</SecTitle>
          <HtmlTable
            headColor="#c00000"
            headers={['Projeto', 'Secretaria', 'Status', 'Prog.', 'Prazo', 'Responsável']}
            rows={projetos.map(p => [
              <span className="font-medium text-[#1F3864]">{p.nome}</span>,
              (p.secretarias as any)?.nome ?? '—',
              <StatusChip status={p.status} />,
              <PctBar value={p.pct ?? 0} color={p.status === 'atrasado' ? '#b91c1c' : '#d97706'} />,
              fmtData(p.prazo_fim),
              p.responsavel ?? '—',
            ])}
          />
        </div>
      )}
    </div>
  )
}

function Rel3({ dados }: { dados: DadosRelatorio }) {
  const { indicadores } = dados
  const acima = indicadores.filter(i => calcAtingimento(i) >= 100).length
  const abaixo = indicadores.filter(i => calcAtingimento(i) < 80).length
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SecTitle>Resumo dos Indicadores</SecTitle>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total monitorados"  value={indicadores.length} />
          <StatCard label="Atingindo a meta"   value={acima}              />
          <StatCard label="Abaixo de 80%"      value={abaixo}             />
        </div>
      </div>
      <div className="space-y-3">
        <SecTitle>Indicadores por Secretaria</SecTitle>
        <HtmlTable
          headColor="#582b8c"
          headers={['Indicador', 'Secretaria', 'Valor atual', 'Meta', 'Unidade', 'Atingimento']}
          rows={indicadores.map(ind => {
            const at = calcAtingimento(ind)
            return [
              <span className="font-medium text-[#1F3864]">{ind.nome}</span>,
              (ind.secretarias as any)?.nome ?? '—',
              ind.valor_atual !== null && ind.valor_atual !== undefined ? String(ind.valor_atual) : '—',
              ind.meta !== null && ind.meta !== undefined ? String(ind.meta) : '—',
              ind.unidade ?? '—',
              <span className="font-bold" style={{ color: atingimentoCor(at) }}>{at}%</span>,
            ]
          })}
        />
      </div>
    </div>
  )
}

function Rel4({ dados }: { dados: DadosRelatorio }) {
  const { eixos } = dados
  if (eixos.length === 0) {
    return <p className="text-sm text-gray-400 py-6 text-center">Nenhum eixo estratégico cadastrado.</p>
  }
  return (
    <div className="space-y-6">
      <SecTitle>Atingimento por Eixo e Objetivo</SecTitle>
      <div className="space-y-4">
        {eixos.map((eixo: any) => {
          const objetivos: any[] = eixo.objetivos ?? []
          const media: number = objetivos.length > 0
            ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length)
            : 0
          return (
            <div key={eixo.nome} className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-[#1F3864] text-white px-4 py-2.5 flex items-center justify-between">
                <span className="font-semibold text-sm">{eixo.nome}</span>
                <span className="text-xs opacity-80">Média: <strong style={{ color: media >= 80 ? '#86efac' : media >= 60 ? '#fde68a' : '#fca5a5' }}>{media}%</strong></span>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  {objetivos.length === 0 ? (
                    <tr><td className="px-4 py-3 text-gray-400">Sem objetivos cadastrados</td></tr>
                  ) : objetivos.map((obj: any, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-gray-700 w-full">{obj.nome}</td>
                      <td className="px-4 py-2 min-w-[120px]">
                        <PctBar value={obj.pct_atual ?? 0} color={atingimentoCor(obj.pct_atual ?? 0)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Rel5({ dados }: { dados: DadosRelatorio }) {
  const { eixos, munData } = dados
  return (
    <div className="space-y-6">
      {(munData.missao || munData.visao || munData.valores) && (
        <div className="space-y-3">
          <SecTitle>Missão, Visão e Valores</SecTitle>
          <div className="space-y-3">
            {munData.missao && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-xs font-bold text-[#1F3864] uppercase tracking-wide mb-1">Missão</div>
                <p className="text-sm text-gray-700">{munData.missao}</p>
              </div>
            )}
            {munData.visao && (
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="text-xs font-bold text-purple-800 uppercase tracking-wide mb-1">Visão</div>
                <p className="text-sm text-gray-700">{munData.visao}</p>
              </div>
            )}
            {munData.valores && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="text-xs font-bold text-green-800 uppercase tracking-wide mb-1">Valores</div>
                <p className="text-sm text-gray-700">{munData.valores}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="space-y-4">
        <SecTitle>Eixos Estratégicos</SecTitle>
        {eixos.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">Nenhum eixo cadastrado.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {eixos.map((eixo: any) => {
              const objetivos: any[] = eixo.objetivos ?? []
              const media: number = objetivos.length > 0
                ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length)
                : 0
              return (
                <div key={eixo.nome} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="font-bold text-[#1F3864] text-sm mb-2">{eixo.nome}</div>
                  <PctBar value={media} color={atingimentoCor(media)} />
                  <div className="mt-2 text-xs text-gray-500">{objetivos.length} objetivo{objetivos.length !== 1 ? 's' : ''}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function Rel6({ dados }: { dados: DadosRelatorio }) {
  const { projetos } = dados
  const secMap = new Map<string, { orcamento: number; executado: number }>()
  projetos.forEach(p => {
    const n: string = (p.secretarias as any)?.nome ?? 'Sem secretaria'
    if (!secMap.has(n)) secMap.set(n, { orcamento: 0, executado: 0 })
    const s = secMap.get(n)!
    s.orcamento += p.orcamento ?? 0
    s.executado  += p.executado ?? 0
  })
  const totalOrc: number  = projetos.reduce((s: number, p: any) => s + (p.orcamento ?? 0), 0)
  const totalExec: number = projetos.reduce((s: number, p: any) => s + (p.executado  ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SecTitle>Resumo Orçamentário</SecTitle>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="text-xs text-blue-600 font-medium">Orçamento total autorizado</div>
            <div className="text-xl font-bold text-[#1F3864] mt-0.5">{fmtReais(totalOrc)}</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="text-xs text-green-600 font-medium">Total executado · {pctNum(totalExec, totalOrc)}%</div>
            <div className="text-xl font-bold text-green-700 mt-0.5">{fmtReais(totalExec)}</div>
            <div className="mt-2 bg-green-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-600" style={{ width: `${pctNum(totalExec, totalOrc)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SecTitle>Por Secretaria</SecTitle>
        <HtmlTable
          headColor="#007000"
          headers={['Secretaria', 'Orçamento Previsto', 'Executado', 'Execução']}
          rows={Array.from(secMap.entries()).map(([nome, d]) => [
            <span className="font-medium text-[#1F3864]">{nome}</span>,
            fmtReais(d.orcamento),
            fmtReais(d.executado),
            <PctBar value={pctNum(d.executado, d.orcamento)} color="#007000" />,
          ])}
        />
      </div>

      <div className="space-y-3">
        <SecTitle>Detalhe por Projeto</SecTitle>
        <HtmlTable
          headers={['Projeto', 'Secretaria', 'Orçamento', 'Executado', 'Execução']}
          rows={projetos.map(p => [
            p.nome,
            (p.secretarias as any)?.nome ?? '—',
            fmtReais(p.orcamento ?? 0),
            fmtReais(p.executado  ?? 0),
            <PctBar value={pctNum(p.executado ?? 0, p.orcamento ?? 0)} />,
          ])}
        />
      </div>
    </div>
  )
}

function RelatorioPreview({ rel, dados }: { rel: Relatorio; dados: DadosRelatorio }) {
  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header banner */}
      <div className="bg-[#1F3864] text-white px-8 py-5 flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold tracking-tight">atlia</div>
          <div className="text-xs opacity-60 mt-0.5">gestão municipal</div>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">{dados.municipioNome}</div>
          <div className="opacity-60 text-xs mt-0.5">{hoje}</div>
        </div>
      </div>

      {/* Title + description */}
      <div className="px-8 pt-6 pb-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#1F3864]">{rel.titulo}</h1>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{rel.descricao}</p>
      </div>

      {/* Report body */}
      <div className="px-8 py-6 space-y-8">
        {rel.id === '1' && <Rel1 dados={dados} />}
        {rel.id === '2' && <Rel2 dados={dados} />}
        {rel.id === '3' && <Rel3 dados={dados} />}
        {rel.id === '4' && <Rel4 dados={dados} />}
        {rel.id === '5' && <Rel5 dados={dados} />}
        {rel.id === '6' && <Rel6 dados={dados} />}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════ Page */

export default function RelatoriosPage() {
  const [gerando,    setGerando]    = useState<string | null>(null)
  const [gerandoPDF, setGerandoPDF] = useState(false)
  const [preview, setPreview]       = useState<{ rel: Relatorio; dados: DadosRelatorio } | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('todos')

  async function handleVisualizar(rel: Relatorio) {
    setGerando(rel.id)
    try {
      const dados = await fetchDadosRelatorio(rel.id)
      setPreview({ rel, dados })
    } finally {
      setGerando(null)
    }
  }

  async function handleGerarPDF() {
    if (!preview) return
    setGerandoPDF(true)
    try {
      await gerarPDF(preview.rel, preview.dados)
    } finally {
      setGerandoPDF(false)
    }
  }

  const filtrados = filtroCategoria === 'todos'
    ? relatorios
    : relatorios.filter(r => r.categoria === filtroCategoria)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Relatórios" subtitle="Visualize e exporte relatórios gerenciais com dados atualizados" />

      <div className="p-8 space-y-6">

        {/* Filtro por categoria */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { value: 'todos',       label: 'Todos'        },
            { value: 'projetos',    label: 'Projetos'     },
            { value: 'indicadores', label: 'Indicadores'  },
            { value: 'estrategico', label: 'Estratégico'  },
            { value: 'orcamento',   label: 'Orçamento'    },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setFiltroCategoria(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filtroCategoria === opt.value
                  ? 'bg-atlia-navy text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-atlia-navy hover:text-atlia-navy'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid de relatórios */}
        <div className="grid grid-cols-2 gap-5">
          {filtrados.map((rel) => {
            const Icone     = rel.icone
            const isGerando = gerando === rel.id
            return (
              <div key={rel.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-atlia-light rounded-xl flex items-center justify-center shrink-0">
                    <Icone size={20} className="text-atlia-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-atlia-navy text-sm leading-snug">{rel.titulo}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border shrink-0 ${categoriaStyle[rel.categoria]}`}>
                        {categoriaLabel[rel.categoria]}
                      </span>
                    </div>
                    <p className="text-sm text-atlia-muted leading-relaxed">{rel.descricao}</p>
                    <div className="flex items-center justify-end mt-4">
                      <button
                        onClick={() => handleVisualizar(rel)}
                        disabled={!!gerando}
                        className="flex items-center gap-2 bg-atlia-navy text-white text-xs font-semibold px-4 py-2 rounded-lg
                          hover:bg-atlia-navy/90 transition-colors disabled:opacity-60"
                      >
                        {isGerando
                          ? <><Loader2 size={13} className="animate-spin" /> Carregando...</>
                          : <><Eye size={13} /> Visualizar</>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Nota */}
        <div className="bg-atlia-light border border-atlia-navy/20 rounded-xl p-4 flex items-start gap-3">
          <FileText size={18} className="text-atlia-navy shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-atlia-navy">Dados em tempo real</p>
            <p className="text-sm text-atlia-muted mt-0.5">
              Clique em <strong>Visualizar</strong> para ver o relatório na tela com os dados atuais.
              Use <strong>Baixar PDF</strong> dentro da visualização para exportar.
            </p>
          </div>
        </div>
      </div>

      {/* ── Preview modal ── */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) setPreview(null) }}>
          <div className="min-h-full flex items-start justify-center p-6 pb-16">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* Toolbar */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-atlia-navy text-sm truncate">{preview.rel.titulo}</h3>
                  <p className="text-xs text-atlia-muted">Visualização com dados atuais · clique fora para fechar</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleGerarPDF}
                    disabled={gerandoPDF}
                    className="flex items-center gap-2 bg-atlia-navy text-white text-xs font-semibold px-4 py-2 rounded-lg
                      hover:bg-atlia-navy/90 transition-colors disabled:opacity-60"
                  >
                    {gerandoPDF
                      ? <><Loader2 size={13} className="animate-spin" /> Gerando...</>
                      : <><Download size={13} /> Baixar PDF</>
                    }
                  </button>
                  <button
                    onClick={() => setPreview(null)}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2
                      rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={13} /> Fechar
                  </button>
                </div>
              </div>

              {/* Report content */}
              <RelatorioPreview rel={preview.rel} dados={preview.dados} />

              {/* Bottom bar */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-end gap-2">
                <button
                  onClick={handleGerarPDF}
                  disabled={gerandoPDF}
                  className="flex items-center gap-2 bg-atlia-navy text-white text-xs font-semibold px-4 py-2 rounded-lg
                    hover:bg-atlia-navy/90 transition-colors disabled:opacity-60"
                >
                  {gerandoPDF
                    ? <><Loader2 size={13} className="animate-spin" /> Gerando...</>
                    : <><Download size={13} /> Baixar PDF</>
                  }
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
