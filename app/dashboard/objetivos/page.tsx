'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { ChevronDown, ChevronRight, Target, FolderKanban, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

const eixos = [
  {
    id: '1',
    nome: 'Uberlândia Sustentável',
    descricao: 'Infraestrutura, mobilidade, meio ambiente e desenvolvimento urbano',
    cor: '#1F3864',
    corBg: '#EEF2F9',
    atingimento: 44,
    objetivos: [
      { id: '1.1', nome: 'Transformar a mobilidade urbana e a infraestrutura',     atingimento: 33, projetos: 85, concluidos: 12, emAndamento: 58, atrasados: 15 },
      { id: '1.2', nome: 'Tornar os espaços públicos modernos e atrativos',         atingimento: 43, projetos: 36, concluidos:  8, emAndamento: 22, atrasados:  6 },
      { id: '1.3', nome: 'Planejar e estruturar o crescimento urbano sustentável',  atingimento:  0, projetos: 25, concluidos:  0, emAndamento: 10, atrasados: 15 },
      { id: '1.4', nome: 'Aprimorar a governança, transparência e eficiência',      atingimento: 35, projetos: 72, concluidos: 18, emAndamento: 42, atrasados: 12 },
    ],
  },
  {
    id: '2',
    nome: 'Vida em Uberlândia',
    descricao: 'Saúde, educação, assistência social e qualidade de vida',
    cor: '#2E75B6',
    corBg: '#EBF3FB',
    atingimento: 56,
    objetivos: [
      { id: '2.1', nome: 'Ampliar o acesso a serviços de saúde, educação e assistência', atingimento: 59, projetos: 90, concluidos: 28, emAndamento: 48, atrasados: 14 },
      { id: '2.2', nome: 'Garantir inclusão social e direitos para todos',               atingimento: 63, projetos: 36, concluidos: 15, emAndamento: 18, atrasados:  3 },
      { id: '2.3', nome: 'Valorizar a cultura, o esporte, o lazer e a segurança',        atingimento: 37, projetos: 60, concluidos: 12, emAndamento: 32, atrasados: 16 },
      { id: '2.4', nome: 'Valorizar e capacitar os servidores municipais',               atingimento: 34, projetos:  8, concluidos:  2, emAndamento:  5, atrasados:  1 },
    ],
  },
  {
    id: '3',
    nome: 'Espaço Uberlândia',
    descricao: 'Desenvolvimento econômico, turismo, qualificação e emprego',
    cor: '#C07B00',
    corBg: '#FEF8EC',
    atingimento: 51,
    objetivos: [
      { id: '3.1', nome: 'Fomentar a economia criativa, o turismo e o desenvolvimento', atingimento: 57, projetos: 46, concluidos: 16, emAndamento: 24, atrasados:  6 },
      { id: '3.2', nome: 'Fomentar o ambiente de negócios e o empreendedorismo',         atingimento: 58, projetos: 24, concluidos:  9, emAndamento: 12, atrasados:  3 },
      { id: '3.3', nome: 'Explorar oportunidades de qualificação e trabalho',            atingimento: 57, projetos: 25, concluidos:  9, emAndamento: 14, atrasados:  2 },
      { id: '3.4', nome: 'Transformar a gestão pública com inovação e tecnologia',       atingimento: 45, projetos: 24, concluidos:  7, emAndamento: 14, atrasados:  3 },
    ],
  },
  {
    id: '4',
    nome: 'Uberlândia Humana',
    descricao: 'Cidadania, participação social, direitos e bem-estar coletivo',
    cor: '#538135',
    corBg: '#F0F7EC',
    atingimento: 38,
    objetivos: [
      { id: '4.1', nome: 'Valorizar a cultura, o esporte e o lazer na cidade',    atingimento: 37, projetos: 30, concluidos:  8, emAndamento: 16, atrasados:  6 },
      { id: '4.2', nome: 'Aprimorar a governança e a transparência pública',       atingimento: 18, projetos: 22, concluidos:  3, emAndamento: 12, atrasados:  7 },
      { id: '4.3', nome: 'Garantir inclusão social e equidade para todos',         atingimento: 43, projetos: 31, concluidos: 10, emAndamento: 18, atrasados:  3 },
      { id: '4.4', nome: 'Promover saúde integral e bem-estar da população',       atingimento: 53, projetos: 16, concluidos:  6, emAndamento:  8, atrasados:  2 },
    ],
  },
]

function getCorAtingimento(v: number) {
  if (v >= 60) return 'green' as const
  if (v >= 40) return 'blue'  as const
  if (v >= 20) return 'yellow' as const
  return 'red' as const
}

export default function ObjetivosPage() {
  const [abertos, setAbertos] = useState<string[]>(['1', '2', '3', '4'])

  function toggle(id: string) {
    setAbertos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const totalProjetos = eixos.reduce((sum, e) => sum + e.objetivos.reduce((s, o) => s + o.projetos, 0), 0)
  const totalConcluidos = eixos.reduce((sum, e) => sum + e.objetivos.reduce((s, o) => s + o.concluidos, 0), 0)
  const totalAtrasados = eixos.reduce((sum, e) => sum + e.objetivos.reduce((s, o) => s + o.atrasados, 0), 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Objetivos Estratégicos"
        subtitle="16 objetivos distribuídos em 4 eixos temáticos"
      />

      <div className="p-8 space-y-5">

        {/* Resumo global */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Eixos Temáticos',        value: '4',                       bg: 'bg-atlia-navy',   text: 'text-white' },
            { label: 'Objetivos Estratégicos',  value: '16',                      bg: 'bg-atlia-blue',   text: 'text-white' },
            { label: 'Projetos no total',        value: totalProjetos.toString(),  bg: 'bg-white',        text: 'text-atlia-navy', border: true },
            { label: 'Projetos atrasados',       value: totalAtrasados.toString(), bg: 'bg-red-50',       text: 'text-atlia-red',  border: true },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-4 ${s.bg} ${s.border ? 'border border-gray-200' : ''}`}>
              <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
              <p className={`text-sm mt-1 ${s.border ? 'text-atlia-muted' : 'text-white/70'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Eixos expansíveis */}
        {eixos.map((eixo) => {
          const open = abertos.includes(eixo.id)
          const totalProjetosEixo = eixo.objetivos.reduce((s, o) => s + o.projetos, 0)
          return (
            <div key={eixo.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">

              {/* Header do eixo */}
              <button
                onClick={() => toggle(eixo.id)}
                className="w-full flex items-center gap-5 px-6 py-5 text-left transition-opacity hover:opacity-95"
                style={{ backgroundColor: eixo.cor }}
              >
                <div className="flex-1">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Eixo {eixo.id} • {eixo.objetivos.length} objetivos</p>
                  <h3 className="font-bold text-white text-lg leading-tight">{eixo.nome}</h3>
                  <p className="text-white/65 text-sm mt-0.5">{eixo.descricao}</p>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl">{eixo.atingimento}%</p>
                    <p className="text-white/55 text-xs">atingimento</p>
                    <div className="mt-1.5 bg-white/20 rounded-full h-1 w-20">
                      <div className="bg-white h-1 rounded-full" style={{ width: `${eixo.atingimento}%` }} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl">{totalProjetosEixo}</p>
                    <p className="text-white/55 text-xs">projetos</p>
                  </div>
                  {open
                    ? <ChevronDown size={20} className="text-white/60" />
                    : <ChevronRight size={20} className="text-white/60" />
                  }
                </div>
              </button>

              {/* Objetivos */}
              {open && (
                <div style={{ backgroundColor: eixo.corBg }}>
                  {eixo.objetivos.map((obj, i) => (
                    <div
                      key={obj.id}
                      className={`px-6 py-4 flex items-start gap-4 hover:bg-black/[0.02] transition-colors cursor-pointer
                        ${i < eixo.objetivos.length - 1 ? 'border-b border-gray-200/50' : ''}`}
                    >
                      {/* Ícone */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: eixo.cor + '18', border: `1.5px solid ${eixo.cor}25` }}
                      >
                        <Target size={15} style={{ color: eixo.cor }} />
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span className="text-xs font-bold" style={{ color: eixo.cor }}>{obj.id}</span>
                            <h4 className="font-semibold text-gray-800 text-sm leading-snug mt-0.5">{obj.nome}</h4>
                          </div>
                          <span className="font-bold text-base shrink-0" style={{ color: eixo.cor }}>{obj.atingimento}%</span>
                        </div>

                        <div className="flex items-center gap-5 flex-wrap mb-2.5">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <FolderKanban size={12} className="text-gray-400" />
                            {obj.projetos} projetos
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CheckCircle2 size={12} className="text-atlia-green" />
                            {obj.concluidos} concluídos
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock size={12} className="text-atlia-blue" />
                            {obj.emAndamento} em andamento
                          </div>
                          {obj.atrasados > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-atlia-red font-medium">
                              <AlertTriangle size={12} />
                              {obj.atrasados} atrasados
                            </div>
                          )}
                        </div>

                        <ProgressBar value={obj.atingimento} color={getCorAtingimento(obj.atingimento)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
}
