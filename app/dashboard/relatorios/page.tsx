'use client'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import Header from '@/components/Header'
import { FileText, Download, BarChart3, FolderKanban, Target, TrendingUp, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Relatorio {
  id: string
  titulo: string
  descricao: string
  categoria: 'projetos' | 'indicadores' | 'estrategico' | 'orcamento'
  icone: LucideIcon
}

const relatorios: Relatorio[] = [
  {
    id: '1',
    titulo: 'Relatório Executivo de Projetos',
    descricao: 'Visão consolidada de toda a carteira de projetos: status, progresso, prazos e responsáveis. Ideal para reuniões de acompanhamento.',
    categoria: 'projetos',
    icone: FolderKanban,
  },
  {
    id: '2',
    titulo: 'Projetos Atrasados e em Atenção',
    descricao: 'Lista dos projetos com status crítico, contendo desvio de prazo, responsável e ação recomendada.',
    categoria: 'projetos',
    icone: Clock,
  },
  {
    id: '3',
    titulo: 'Boletim de Indicadores de Desempenho',
    descricao: 'Comparativo entre metas e resultados atuais de todos os KPIs estratégicos, por secretaria.',
    categoria: 'indicadores',
    icone: TrendingUp,
  },
  {
    id: '4',
    titulo: 'Relatório de Atingimento de Metas',
    descricao: 'Percentual de atingimento por eixo temático e objetivo estratégico. Adequado para prestação de contas.',
    categoria: 'estrategico',
    icone: Target,
  },
  {
    id: '5',
    titulo: 'Mapa Estratégico — Síntese',
    descricao: 'Resumo da Missão, Visão, Valores e dos eixos temáticos com seus objetivos e % de atingimento.',
    categoria: 'estrategico',
    icone: BarChart3,
  },
  {
    id: '6',
    titulo: 'Execução Orçamentária por Secretaria',
    descricao: 'Demonstrativo do orçamento previsto versus executado por secretaria e por projeto.',
    categoria: 'orcamento',
    icone: CheckCircle2,
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

function fmtReais(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function pctNum(valor: number, total: number): number {
  if (!total) return 0
  return Math.round((valor / total) * 100)
}

function calcAtingimento(ind: any): number {
  const meta: number  = ind.meta       ?? 0
  const valor: number = ind.valor_atual ?? 0
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

// ── PDF helpers ───────────────────────────────────────────────────────────────

function addCabecalho(doc: any, titulo: string, municipioNome: string, hoje: string): void {
  doc.setFillColor(31, 56, 100)
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('atlia', 14, 12)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('gestão municipal', 14, 18)
  doc.setFontSize(10)
  doc.text(municipioNome, 210 - 14, 12, { align: 'right' })
  doc.text(hoje, 210 - 14, 18, { align: 'right' })

  doc.setTextColor(31, 56, 100)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(titulo, 14, 42)
  doc.setDrawColor(214, 228, 240)
  doc.setLineWidth(0.5)
  doc.line(14, 46, 196, 46)
}

function addRodape(doc: any, hoje: string): void {
  doc.setDrawColor(214, 228, 240)
  doc.setLineWidth(0.3)
  doc.line(14, 280, 196, 280)
  doc.setTextColor(156, 163, 175)
  doc.setFontSize(8)
  doc.text(`Gerado por Atlia — Gestão Municipal em ${hoje}`, 14, 286)
  doc.text('1', 196, 286, { align: 'right' })
}

function secaoTitulo(doc: any, titulo: string, y: number): number {
  doc.setTextColor(31, 56, 100)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(titulo, 14, y)
  doc.setDrawColor(214, 228, 240)
  doc.setLineWidth(0.3)
  doc.line(14, y + 2, 196, y + 2)
  return y + 8
}

function addLinha(doc: any, texto: string, y: number): number {
  doc.setTextColor(55, 65, 81)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(texto, 14, y)
  return y + 6
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function RelatoriosPage() {
  const [gerando, setGerando] = useState<string | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('todos')

  async function handleGerar(rel: Relatorio) {
    setGerando(rel.id)
    try {
      const supabase = createClient()
      const { jsPDF }   = await import('jspdf')
      const autoTable   = (await import('jspdf-autotable')).default

      const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      const doc  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      // Fetch municipality name for header (used by all reports)
      const { data: munRow } = await supabase
        .from('municipios')
        .select('nome, prefeito, missao, visao, valores')
        .single()
      const munData: any         = munRow ?? {}
      const municipioNome: string = munData.nome ?? 'Prefeitura Municipal'

      addCabecalho(doc, rel.titulo, municipioNome, hoje)

      // Description block (common to all)
      doc.setTextColor(107, 114, 128)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const descLinhas = doc.splitTextToSize(rel.descricao, 182) as string[]
      doc.text(descLinhas, 14, 54)
      let y: number = 54 + descLinhas.length * 5 + 6

      // ── Report 1: Relatório Executivo de Projetos ────────────────────────────
      if (rel.id === '1') {
        const { data: raw } = await supabase
          .from('projetos')
          .select('nome, status, pct, orcamento, executado, prazo_fim, responsavel, secretarias(nome)')
          .order('nome')
        const projetos: any[] = raw ?? []

        const counts: Record<string, number> = {}
        let totalOrc  = 0
        let totalExec = 0
        projetos.forEach(p => {
          counts[p.status] = (counts[p.status] ?? 0) + 1
          totalOrc  += p.orcamento  ?? 0
          totalExec += p.executado  ?? 0
        })

        y = secaoTitulo(doc, 'Resumo Executivo', y)
        y = addLinha(doc, `Total de projetos na carteira: ${projetos.length}`, y)
        y = addLinha(doc,
          `Em andamento: ${counts.em_andamento ?? 0}   |   Atenção: ${counts.atencao ?? 0}   |   Atrasados: ${counts.atrasado ?? 0}`,
          y)
        y = addLinha(doc,
          `Concluídos: ${counts.concluido ?? 0}   |   Não iniciados: ${counts.nao_iniciado ?? 0}`,
          y)
        y = addLinha(doc,
          `Orçamento total: ${fmtReais(totalOrc)}   |   Executado: ${fmtReais(totalExec)} (${pctNum(totalExec, totalOrc)}%)`,
          y)
        y += 4

        y = secaoTitulo(doc, 'Carteira de Projetos', y)

        autoTable(doc, {
          startY: y,
          head: [['Projeto', 'Secretaria', 'Status', 'Prog.', 'Prazo']],
          body: projetos.map(p => [
            p.nome,
            (p.secretarias as any)?.nome ?? '—',
            statusLabel[p.status] ?? p.status,
            `${p.pct ?? 0}%`,
            fmtData(p.prazo_fim),
          ]),
          styles:              { fontSize: 8, cellPadding: 2 },
          headStyles:          { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
          alternateRowStyles:  { fillColor: [245, 247, 250] },
          columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 40 },
            2: { cellWidth: 30 },
            3: { cellWidth: 16, halign: 'center' },
            4: { cellWidth: 26 },
          },
        })
      }

      // ── Report 2: Projetos Atrasados e em Atenção ───────────────────────────
      else if (rel.id === '2') {
        const { data: raw } = await supabase
          .from('projetos')
          .select('nome, status, pct, prazo_fim, responsavel, secretarias(nome)')
          .in('status', ['atrasado', 'atencao'])
          .order('status')
        const projetos: any[] = raw ?? []

        y = secaoTitulo(doc, 'Projetos Críticos', y)
        y = addLinha(doc, `Total de projetos críticos: ${projetos.length}`, y)
        y = addLinha(doc,
          `Atrasados: ${projetos.filter(p => p.status === 'atrasado').length}   |   Requerem atenção: ${projetos.filter(p => p.status === 'atencao').length}`,
          y)
        y += 4

        if (projetos.length === 0) {
          y = addLinha(doc, 'Nenhum projeto crítico no momento. Ótimo resultado!', y)
        } else {
          autoTable(doc, {
            startY: y,
            head: [['Projeto', 'Secretaria', 'Status', 'Prog.', 'Prazo', 'Responsável']],
            body: projetos.map(p => [
              p.nome,
              (p.secretarias as any)?.nome ?? '—',
              statusLabel[p.status] ?? p.status,
              `${p.pct ?? 0}%`,
              fmtData(p.prazo_fim),
              p.responsavel ?? '—',
            ]),
            styles:             { fontSize: 8, cellPadding: 2 },
            headStyles:         { fillColor: [192, 0, 0], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [255, 245, 245] },
            columnStyles: {
              0: { cellWidth: 50 },
              1: { cellWidth: 32 },
              2: { cellWidth: 24 },
              3: { cellWidth: 14, halign: 'center' },
              4: { cellWidth: 24 },
              5: { cellWidth: 28 },
            },
          })
        }
      }

      // ── Report 3: Boletim de Indicadores de Desempenho ──────────────────────
      else if (rel.id === '3') {
        const { data: raw } = await supabase
          .from('indicadores')
          .select('nome, valor_atual, meta, unidade, criterio, secretarias(nome)')
          .order('nome')
        const indicadores: any[] = raw ?? []

        const acimaMeta = indicadores.filter(i => calcAtingimento(i) >= 100).length
        const abaixo80  = indicadores.filter(i => calcAtingimento(i) < 80).length

        y = secaoTitulo(doc, 'Resumo dos Indicadores', y)
        y = addLinha(doc, `Total de indicadores monitorados: ${indicadores.length}`, y)
        y = addLinha(doc,
          `Atingindo a meta (≥ 100%): ${acimaMeta}   |   Abaixo de 80%: ${abaixo80}`,
          y)
        y += 4

        if (indicadores.length === 0) {
          y = addLinha(doc, 'Nenhum indicador cadastrado.', y)
        } else {
          autoTable(doc, {
            startY: y,
            head: [['Indicador', 'Secretaria', 'Atual', 'Meta', 'Unidade', 'Atingimento']],
            body: indicadores.map(ind => [
              ind.nome,
              (ind.secretarias as any)?.nome ?? '—',
              ind.valor_atual !== null && ind.valor_atual !== undefined ? String(ind.valor_atual) : '—',
              ind.meta        !== null && ind.meta        !== undefined ? String(ind.meta)        : '—',
              ind.unidade ?? '—',
              `${calcAtingimento(ind)}%`,
            ]),
            styles:             { fontSize: 8, cellPadding: 2 },
            headStyles:         { fillColor: [88, 43, 140], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 245, 255] },
            columnStyles: {
              0: { cellWidth: 58 },
              1: { cellWidth: 36 },
              2: { cellWidth: 18, halign: 'center' },
              3: { cellWidth: 18, halign: 'center' },
              4: { cellWidth: 22 },
              5: { cellWidth: 20, halign: 'center' },
            },
          })
        }
      }

      // ── Report 4: Relatório de Atingimento de Metas ─────────────────────────
      else if (rel.id === '4') {
        const { data: rawEixos } = await supabase
          .from('eixos')
          .select('nome, objetivos(nome, pct_atual)')
          .order('ordem')
        const eixos: any[] = rawEixos ?? []

        y = secaoTitulo(doc, 'Atingimento por Eixo Estratégico', y)

        if (eixos.length === 0) {
          y = addLinha(doc, 'Nenhum eixo estratégico cadastrado.', y)
        } else {
          const tableBody: (string | number)[][] = []
          eixos.forEach((eixo: any) => {
            const objetivos: any[] = eixo.objetivos ?? []
            const mediaEixo: number = objetivos.length > 0
              ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length)
              : 0
            tableBody.push([eixo.nome, 'Média do eixo', `${mediaEixo}%`])
            objetivos.forEach((obj: any) => {
              tableBody.push(['', obj.nome, `${obj.pct_atual ?? 0}%`])
            })
          })

          autoTable(doc, {
            startY: y,
            head: [['Eixo', 'Objetivo', 'Atingimento']],
            body: tableBody,
            styles:             { fontSize: 8, cellPadding: 2 },
            headStyles:         { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            columnStyles: {
              0: { cellWidth: 52 },
              1: { cellWidth: 110 },
              2: { cellWidth: 20, halign: 'center' },
            },
            didParseCell: (data: any) => {
              if (data.section !== 'body') return
              if (data.column.index === 1 && (data.cell.raw as string) === 'Média do eixo') {
                data.cell.styles.fontStyle = 'bold'
                data.cell.styles.textColor = [31, 56, 100]
                data.cell.styles.fillColor = [214, 228, 240]
              }
              if (data.column.index === 0 && (data.cell.raw as string) !== '') {
                data.cell.styles.fontStyle = 'bold'
                data.cell.styles.textColor = [31, 56, 100]
                data.cell.styles.fillColor = [214, 228, 240]
              }
              if (data.column.index === 2) {
                const val = parseInt((data.cell.raw as string), 10)
                if (val >= 100)    data.cell.styles.textColor = [0, 112, 0]
                else if (val < 80) data.cell.styles.textColor = [192, 0, 0]
              }
            },
          })
        }
      }

      // ── Report 5: Mapa Estratégico — Síntese ────────────────────────────────
      else if (rel.id === '5') {
        const { data: rawEixos } = await supabase
          .from('eixos')
          .select('nome, descricao, objetivos(nome, pct_atual)')
          .order('ordem')
        const eixos: any[] = rawEixos ?? []

        // Missão / Visão / Valores
        if (munData.missao || munData.visao || munData.valores) {
          y = secaoTitulo(doc, 'Missão, Visão e Valores', y)

          const addCampo = (rotulo: string, texto: string, yAtual: number): number => {
            doc.setTextColor(31, 56, 100)
            doc.setFontSize(9)
            doc.setFont('helvetica', 'bold')
            doc.text(`${rotulo}:`, 14, yAtual)
            doc.setTextColor(55, 65, 81)
            doc.setFont('helvetica', 'normal')
            const linhas = doc.splitTextToSize(texto, 160) as string[]
            doc.text(linhas, 40, yAtual)
            return yAtual + linhas.length * 5 + 3
          }

          if (munData.missao)  y = addCampo('Missão',  munData.missao,  y)
          if (munData.visao)   y = addCampo('Visão',   munData.visao,   y)
          if (munData.valores) y = addCampo('Valores', munData.valores, y)
          y += 2
        }

        y = secaoTitulo(doc, 'Eixos Estratégicos', y)

        if (eixos.length === 0) {
          y = addLinha(doc, 'Nenhum eixo estratégico cadastrado.', y)
        } else {
          autoTable(doc, {
            startY: y,
            head: [['Eixo Estratégico', 'Qtd. Objetivos', 'Atingimento Médio']],
            body: eixos.map((eixo: any) => {
              const objetivos: any[] = eixo.objetivos ?? []
              const media: number = objetivos.length > 0
                ? Math.round(objetivos.reduce((s: number, o: any) => s + (o.pct_atual ?? 0), 0) / objetivos.length)
                : 0
              return [eixo.nome, String(objetivos.length), `${media}%`]
            }),
            styles:             { fontSize: 9, cellPadding: 3 },
            headStyles:         { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            columnStyles: {
              0: { cellWidth: 100 },
              1: { cellWidth: 40,  halign: 'center' },
              2: { cellWidth: 42,  halign: 'center' },
            },
          })
        }

        // Objetivos detalhe
        const finalY5: number = (doc as any).lastAutoTable?.finalY ?? y
        if (eixos.length > 0 && finalY5 < 230) {
          let detY: number = finalY5 + 10
          detY = secaoTitulo(doc, 'Objetivos por Eixo', detY)

          const detBody: string[][] = []
          eixos.forEach((eixo: any) => {
            const objetivos: any[] = eixo.objetivos ?? []
            objetivos.forEach((obj: any) => {
              detBody.push([eixo.nome, obj.nome, `${obj.pct_atual ?? 0}%`])
            })
          })

          if (detBody.length > 0) {
            autoTable(doc, {
              startY: detY,
              head: [['Eixo', 'Objetivo', 'Atingimento']],
              body: detBody,
              styles:             { fontSize: 8, cellPadding: 2 },
              headStyles:         { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
              alternateRowStyles: { fillColor: [245, 247, 250] },
              columnStyles: {
                0: { cellWidth: 52 },
                1: { cellWidth: 110 },
                2: { cellWidth: 20, halign: 'center' },
              },
            })
          }
        }
      }

      // ── Report 6: Execução Orçamentária por Secretaria ──────────────────────
      else if (rel.id === '6') {
        const { data: raw } = await supabase
          .from('projetos')
          .select('nome, orcamento, executado, secretarias(nome)')
          .order('nome')
        const projetos: any[] = raw ?? []

        // Group by secretaria
        const secMap = new Map<string, { orcamento: number; executado: number }>()
        projetos.forEach(p => {
          const secNome: string = (p.secretarias as any)?.nome ?? 'Sem secretaria'
          if (!secMap.has(secNome)) secMap.set(secNome, { orcamento: 0, executado: 0 })
          const sec = secMap.get(secNome)!
          sec.orcamento += p.orcamento ?? 0
          sec.executado += p.executado ?? 0
        })

        const totalOrc: number  = projetos.reduce((s: number, p: any) => s + (p.orcamento ?? 0), 0)
        const totalExec: number = projetos.reduce((s: number, p: any) => s + (p.executado  ?? 0), 0)

        y = secaoTitulo(doc, 'Resumo Orçamentário', y)
        y = addLinha(doc, `Orçamento total autorizado: ${fmtReais(totalOrc)}`, y)
        y = addLinha(doc, `Total executado: ${fmtReais(totalExec)}   |   Execução geral: ${pctNum(totalExec, totalOrc)}%`, y)
        y += 4

        y = secaoTitulo(doc, 'Por Secretaria', y)

        autoTable(doc, {
          startY: y,
          head: [['Secretaria', 'Orçamento Previsto', 'Executado', 'Execução %']],
          body: Array.from(secMap.entries()).map(([nome, dados]) => [
            nome,
            fmtReais(dados.orcamento),
            fmtReais(dados.executado),
            `${pctNum(dados.executado, dados.orcamento)}%`,
          ]),
          styles:             { fontSize: 9, cellPadding: 3 },
          headStyles:         { fillColor: [0, 112, 0], textColor: 255, fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 255, 245] },
          columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 44, halign: 'right' },
            2: { cellWidth: 44, halign: 'right' },
            3: { cellWidth: 24, halign: 'center' },
          },
        })

        // Detalhe por projeto
        const finalY6: number = (doc as any).lastAutoTable?.finalY ?? y
        if (finalY6 < 240) {
          let detY: number = finalY6 + 10
          detY = secaoTitulo(doc, 'Detalhe por Projeto', detY)

          autoTable(doc, {
            startY: detY,
            head: [['Projeto', 'Secretaria', 'Orçamento', 'Executado', '%']],
            body: projetos.map(p => [
              p.nome,
              (p.secretarias as any)?.nome ?? '—',
              fmtReais(p.orcamento ?? 0),
              fmtReais(p.executado  ?? 0),
              `${pctNum(p.executado ?? 0, p.orcamento ?? 0)}%`,
            ]),
            styles:             { fontSize: 7, cellPadding: 2 },
            headStyles:         { fillColor: [31, 56, 100], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            columnStyles: {
              0: { cellWidth: 58 },
              1: { cellWidth: 38 },
              2: { cellWidth: 32, halign: 'right' },
              3: { cellWidth: 32, halign: 'right' },
              4: { cellWidth: 12, halign: 'center' },
            },
          })
        }
      }

      addRodape(doc, hoje)
      doc.save(`${rel.titulo.replace(/\s+/g, '_')}.pdf`)

    } finally {
      setGerando(null)
    }
  }

  const filtrados = filtroCategoria === 'todos'
    ? relatorios
    : relatorios.filter(r => r.categoria === filtroCategoria)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Relatórios" subtitle="Geração de relatórios gerenciais em PDF com dados atualizados" />

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
            const Icone    = rel.icone
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
                        onClick={() => handleGerar(rel)}
                        disabled={!!gerando}
                        className="flex items-center gap-2 bg-atlia-navy text-white text-xs font-semibold px-4 py-2 rounded-lg
                          hover:bg-atlia-navy/90 transition-colors disabled:opacity-60"
                      >
                        {isGerando
                          ? <><Loader2 size={13} className="animate-spin" /> Gerando...</>
                          : <><Download size={13} /> Gerar PDF</>
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
              Todos os relatórios são gerados com os dados atuais do sistema e salvos automaticamente
              na pasta de downloads do seu computador.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
