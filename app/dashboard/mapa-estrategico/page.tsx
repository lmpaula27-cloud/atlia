'use client'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { Target, Eye, Heart, ChevronRight, TrendingUp } from 'lucide-react'

const municipio = {
  missao: 'Promover uma cidade com foco na cidadania, inovação, inclusão social e desenvolvimento com sustentabilidade, transformando o município em referência nacional de gestão pública.',
  visao:  'Consolidar, até 2035, o município como uma cidade inteligente, sustentável, acolhedora e comprometida com o cuidado das pessoas, por meio de políticas públicas integradas, eficientes e inovadoras.',
  valores: ['Inovação', 'Ética e Transparência', 'Sustentabilidade', 'Cuidado com Pessoas', 'Compromisso com Resultados'],
}

const eixos = [
  {
    id: '1',
    nome: 'Uberlândia Sustentável',
    descricao: 'Infraestrutura, mobilidade, meio ambiente e desenvolvimento urbano',
    cor: '#1F3864',
    corBg: '#EEF2F9',
    atingimento: 44,
    projetos: 218,
    objetivos: [
      { nome: 'Transformar a mobilidade urbana e a infraestrutura',           atingimento: 33, projetos: 85 },
      { nome: 'Tornar os espaços públicos modernos e atrativos',              atingimento: 43, projetos: 36 },
      { nome: 'Planejar e estruturar o crescimento urbano sustentável',       atingimento: 0,  projetos: 25 },
      { nome: 'Aprimorar a governança, transparência e eficiência',           atingimento: 35, projetos: 72 },
    ],
  },
  {
    id: '2',
    nome: 'Vida em Uberlândia',
    descricao: 'Saúde, educação, assistência social e qualidade de vida',
    cor: '#2E75B6',
    corBg: '#EBF3FB',
    atingimento: 56,
    projetos: 194,
    objetivos: [
      { nome: 'Ampliar o acesso a serviços de saúde, educação e assistência', atingimento: 59, projetos: 90 },
      { nome: 'Garantir inclusão social e direitos para todos',                atingimento: 63, projetos: 36 },
      { nome: 'Valorizar a cultura, o esporte, o lazer e a segurança',        atingimento: 37, projetos: 60 },
      { nome: 'Valorizar e capacitar os servidores municipais',               atingimento: 34, projetos: 8  },
    ],
  },
  {
    id: '3',
    nome: 'Espaço Uberlândia',
    descricao: 'Desenvolvimento econômico, turismo, qualificação e emprego',
    cor: '#C07B00',
    corBg: '#FEF8EC',
    atingimento: 51,
    projetos: 119,
    objetivos: [
      { nome: 'Fomentar a economia criativa, o turismo e o desenvolvimento',  atingimento: 57, projetos: 46 },
      { nome: 'Fomentar o ambiente de negócios e o empreendedorismo',         atingimento: 58, projetos: 24 },
      { nome: 'Explorar oportunidades de qualificação e trabalho',            atingimento: 57, projetos: 25 },
      { nome: 'Transformar a gestão pública com inovação e tecnologia',       atingimento: 45, projetos: 24 },
    ],
  },
  {
    id: '4',
    nome: 'Uberlândia Humana',
    descricao: 'Cidadania, participação social, direitos e bem-estar coletivo',
    cor: '#538135',
    corBg: '#F0F7EC',
    atingimento: 38,
    projetos: 99,
    objetivos: [
      { nome: 'Valorizar a cultura, o esporte e o lazer na cidade',           atingimento: 37, projetos: 30 },
      { nome: 'Aprimorar a governança e a transparência pública',             atingimento: 18, projetos: 22 },
      { nome: 'Garantir inclusão social e equidade para todos',               atingimento: 43, projetos: 31 },
      { nome: 'Promover saúde integral e bem-estar da população',             atingimento: 53, projetos: 16 },
    ],
  },
]

function getCorAtingimento(v: number) {
  if (v >= 60) return 'green' as const
  if (v >= 40) return 'blue' as const
  if (v >= 20) return 'yellow' as const
  return 'red' as const
}

export default function MapaEstrategicoPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Mapa Estratégico"
        subtitle="Arquitetura do Plano de Governo — Missão, Visão, Valores e Eixos Temáticos"
      />

      <div className="p-8 space-y-8">

        {/* Missão, Visão, Valores */}
        <div className="grid grid-cols-3 gap-5">

          <div className="card border-l-4 border-atlia-navy">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
                <Target size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-navy uppercase tracking-wide text-xs">Missão</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{municipio.missao}</p>
          </div>

          <div className="card border-l-4 border-atlia-blue">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-blue rounded-lg flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-blue uppercase tracking-wide text-xs">Visão 2035</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{municipio.visao}</p>
          </div>

          <div className="card border-l-4 border-atlia-green">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-atlia-green rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-atlia-green uppercase tracking-wide text-xs">Valores</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {municipio.valores.map(v => (
                <span key={v} className="bg-green-50 text-green-800 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-full">
                  {v}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Divisor com seta */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-2 text-atlia-muted text-xs font-medium uppercase tracking-wider">
            <ChevronRight size={14} />
            Eixos Temáticos e Objetivos Estratégicos
            <ChevronRight size={14} />
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Eixos */}
        <div className="grid grid-cols-4 gap-5">
          {eixos.map((eixo) => (
            <div key={eixo.id} className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: eixo.cor }}>

              {/* Cabeçalho do eixo */}
              <div className="p-4" style={{ backgroundColor: eixo.cor }}>
                <h3 className="font-bold text-white text-sm leading-tight mb-1">{eixo.nome}</h3>
                <p className="text-white/70 text-xs leading-tight">{eixo.descricao}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{eixo.atingimento}%</p>
                    <p className="text-white/60 text-xs">atingimento</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{eixo.projetos}</p>
                    <p className="text-white/60 text-xs">projetos</p>
                  </div>
                </div>
                <div className="mt-2 bg-white/20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${eixo.atingimento}%` }} />
                </div>
              </div>

              {/* Objetivos do eixo */}
              <div className="divide-y divide-gray-100" style={{ backgroundColor: eixo.corBg }}>
                {eixo.objetivos.map((obj, i) => (
                  <div key={i} className="p-3">
                    <p className="text-xs font-medium text-gray-800 leading-tight mb-2">{obj.nome}</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-atlia-muted">{obj.projetos} proj.</span>
                      <span className="text-xs font-semibold" style={{ color: eixo.cor }}>{obj.atingimento}%</span>
                    </div>
                    <ProgressBar value={obj.atingimento} color={getCorAtingimento(obj.atingimento)} />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Rodapé com totais */}
        <div className="card bg-atlia-navy border-0">
          <div className="grid grid-cols-4 gap-6 text-center">
            {[
              { label: 'Eixos Temáticos',         value: '4'   },
              { label: 'Objetivos Estratégicos',   value: '16'  },
              { label: 'Metas Estratégicas',       value: '331' },
              { label: 'Projetos',                 value: '630' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-white font-bold text-3xl">{s.value}</p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
