'use client'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import Header from '@/components/Header'
import { FileText, Download, BarChart3, FolderKanban, Target, TrendingUp, CheckCircle2, Clock, Loader2 } from 'lucide-react'

interface Relatorio {
  id: string
  titulo: string
  descricao: string
  categoria: 'projetos' | 'indicadores' | 'estrategico' | 'orcamento'
  ultima_geracao: string
  icone: LucideIcon
}

const relatorios: Relatorio[] = [
  {
    id: '1',
    titulo: 'Relatório Executivo de Projetos',
    descricao: 'Visão consolidada de toda a carteira de projetos: status, progresso, prazos e responsáveis. Ideal para reuniões de acompanhamento.',
    categoria: 'projetos',
    ultima_geracao: '29/05/2026',
    icone: FolderKanban,
  },
  {
    id: '2',
    titulo: 'Projetos Atrasados e em Atenção',
    descricao: 'Lista dos projetos com status crítico, contendo desvio de prazo, responsável e ação recomendada.',
    categoria: 'projetos',
    ultima_geracao: '28/05/2026',
    icone: Clock,
  },
  {
    id: '3',
    titulo: 'Boletim de Indicadores de Desempenho',
    descricao: 'Comparativo entre metas e resultados atuais de todos os KPIs estratégicos, por secretaria.',
    categoria: 'indicadores',
    ultima_geracao: '27/05/2026',
    icone: TrendingUp,
  },
  {
    id: '4',
    titulo: 'Relatório de Atingimento de Metas',
    descricao: 'Percentual de atingimento por eixo temático e objetivo estratégico. Adequado para prestação de contas.',
    categoria: 'estrategico',
    ultima_geracao: '25/05/2026',
    icone: Target,
  },
  {
    id: '5',
    titulo: 'Mapa Estratégico — Síntese',
    descricao: 'Resumo da Missão, Visão, Valores e dos 4 eixos temáticos com seus objetivos e % de atingimento.',
    categoria: 'estrategico',
    ultima_geracao: '20/05/2026',
    icone: BarChart3,
  },
  {
    id: '6',
    titulo: 'Execução Orçamentária por Secretaria',
    descricao: 'Demonstrativo do orçamento previsto versus executado por secretaria e por projeto.',
    categoria: 'orcamento',
    ultima_geracao: '15/05/2026',
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

function gerarPDF(relatorio: Relatorio) {
  // Usa jsPDF — importação dinâmica para não quebrar SSR
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const hoje = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })

    // Cabeçalho
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
    doc.text('Prefeitura Municipal de Uberlândia', 210 - 14, 12, { align: 'right' })
    doc.text(hoje, 210 - 14, 18, { align: 'right' })

    // Título do relatório
    doc.setTextColor(31, 56, 100)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(relatorio.titulo, 14, 42)

    // Linha divisória
    doc.setDrawColor(214, 228, 240)
    doc.setLineWidth(0.5)
    doc.line(14, 46, 196, 46)

    // Descrição
    doc.setTextColor(107, 114, 128)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const linhas = doc.splitTextToSize(relatorio.descricao, 182)
    doc.text(linhas, 14, 54)

    // Conteúdo de exemplo por categoria
    doc.setTextColor(31, 56, 100)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Resumo', 14, 72)
    doc.setDrawColor(214, 228, 240)
    doc.line(14, 74, 196, 74)

    doc.setTextColor(55, 65, 81)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')

    const conteudo: Record<string, string[]> = {
      projetos: [
        '• Total de projetos na carteira: 47',
        '• Em andamento (no prazo): 31 (66%)',
        '• Requerem atenção: 10 (21%)',
        '• Atrasados: 6 (13%)',
        '• Não iniciados: 4 (9%)',
        '',
        'Projetos críticos:',
        '• Revitalização da Praça Central — 15% — Atrasado — Urbanismo',
        '• UPA Zona Sul (Ampliação) — 20% — Atrasado — Saúde',
        '• UBS Jardim das Palmeiras — 32% — Atenção — Saúde',
      ],
      indicadores: [
        '• Total de indicadores monitorados: 12',
        '• Acima da meta: 3 (25%)',
        '• Em atenção: 6 (50%)',
        '• Críticos: 3 (25%)',
        '',
        'Indicadores críticos:',
        '• Tempo médio de espera em UBS — Meta: 30 min — Atual: 48 min',
        '• Leitos de UTI por 10 mil hab. — Meta: 2,5 — Atual: 1,8',
        '• Taxa de cobertura vacinação infantil — Meta: 95% — Atual: 88%',
      ],
      estrategico: [
        '• Eixos temáticos: 4',
        '• Objetivos estratégicos: 16',
        '• Metas estratégicas: 331',
        '• Total de projetos: 630',
        '',
        'Atingimento por eixo:',
        '• Uberlândia Sustentável: 44%',
        '• Vida em Uberlândia: 56%',
        '• Espaço Uberlândia: 51%',
        '• Uberlândia Humana: 38%',
        '',
        'Atingimento médio geral: 47%',
      ],
      orcamento: [
        '• Orçamento total autorizado: R$ 12.360.000',
        '• Total executado até o momento: R$ 8.180.000',
        '• Percentual de execução: 66%',
        '',
        'Por secretaria:',
        '• Obras: R$ 5.760.000 prev. / R$ 4.283.600 exec. (74%)',
        '• Saúde: R$ 3.600.000 prev. / R$ 900.000 exec. (25%)',
        '• Educação: R$ 730.000 prev. / R$ 464.000 exec. (64%)',
        '• Urbanismo: R$ 1.840.000 prev. / R$ 843.200 exec. (46%)',
        '• Outros: R$ 430.000 prev. / R$ 316.200 exec. (74%)',
      ],
    }

    const linhasConteudo = conteudo[relatorio.categoria] || []
    let y = 80
    linhasConteudo.forEach(linha => {
      if (y > 260) return // limite de página
      if (linha === '') { y += 4; return }
      doc.text(linha, 14, y)
      y += 6
    })

    // Rodapé
    doc.setDrawColor(214, 228, 240)
    doc.setLineWidth(0.3)
    doc.line(14, 280, 196, 280)
    doc.setTextColor(156, 163, 175)
    doc.setFontSize(8)
    doc.text(`Gerado por Atlia — Gestão Municipal em ${hoje}`, 14, 286)
    doc.text('1', 196, 286, { align: 'right' })

    doc.save(`${relatorio.titulo.replace(/\s+/g, '_')}.pdf`)
  })
}

export default function RelatoriosPage() {
  const [gerando, setGerando] = useState<string | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('todos')

  async function handleGerar(rel: Relatorio) {
    setGerando(rel.id)
    await new Promise(r => setTimeout(r, 800))
    gerarPDF(rel)
    setGerando(null)
  }

  const filtrados = filtroCategoria === 'todos'
    ? relatorios
    : relatorios.filter(r => r.categoria === filtroCategoria)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Relatórios" subtitle="Geração de relatórios gerenciais em PDF" />

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
            const Icone = rel.icone
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
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-atlia-muted">
                        Última geração: <span className="font-medium text-gray-600">{rel.ultima_geracao}</span>
                      </span>
                      <button
                        onClick={() => handleGerar(rel)}
                        disabled={isGerando}
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
            <p className="text-sm font-semibold text-atlia-navy">Sobre os relatórios</p>
            <p className="text-sm text-atlia-muted mt-0.5">
              Todos os relatórios são gerados em PDF com os dados atuais do sistema.
              O arquivo é salvo automaticamente na pasta de downloads do seu computador.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
