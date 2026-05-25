import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import { Target, Plus, ChevronRight } from 'lucide-react'

const objetivos = [
  {
    id: '1', eixo: 'Infraestrutura', titulo: 'Infraestrutura e Mobilidade Urbana',
    descricao: 'Ampliar e melhorar a infraestrutura viária, saneamento e mobilidade urbana do município.',
    projetos: 14, concluidos: 4, emAndamento: 8, atrasados: 2,
  },
  {
    id: '2', eixo: 'Saúde', titulo: 'Saúde de Qualidade para Todos',
    descricao: 'Ampliar o acesso e a qualidade dos serviços de saúde pública municipal.',
    projetos: 11, concluidos: 3, emAndamento: 5, atrasados: 3,
  },
  {
    id: '3', eixo: 'Educação', titulo: 'Educação Inovadora',
    descricao: 'Modernizar a rede de ensino municipal com tecnologia e infraestrutura adequada.',
    projetos: 9, concluidos: 5, emAndamento: 4, atrasados: 0,
  },
  {
    id: '4', eixo: 'Desenvolvimento', titulo: 'Desenvolvimento Econômico e Geração de Emprego',
    descricao: 'Fomentar o desenvolvimento econômico local, atrair investimentos e gerar oportunidades.',
    projetos: 8, concluidos: 2, emAndamento: 5, atrasados: 1,
  },
  {
    id: '5', eixo: 'Meio Ambiente', titulo: 'Meio Ambiente e Sustentabilidade',
    descricao: 'Promover a gestão ambiental sustentável e a qualidade de vida da população.',
    projetos: 5, concluidos: 1, emAndamento: 3, atrasados: 1,
  },
]

const eixoColors: Record<string, string> = {
  'Infraestrutura': 'bg-blue-100 text-blue-800',
  'Saúde':          'bg-red-100 text-red-800',
  'Educação':       'bg-purple-100 text-purple-800',
  'Desenvolvimento':'bg-green-100 text-green-800',
  'Meio Ambiente':  'bg-teal-100 text-teal-800',
}

export default function ObjetivosPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Objetivos Estratégicos" subtitle="Eixos e diretrizes do Plano de Governo" />

      <div className="p-8 space-y-5">

        <div className="flex justify-end">
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Novo Objetivo
          </button>
        </div>

        {objetivos.map((o) => {
          const pct = Math.round((o.concluidos / o.projetos) * 100)
          return (
            <div key={o.id} className="card hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-atlia-navy rounded-xl flex items-center justify-center shrink-0">
                  <Target size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-semibold text-atlia-navy text-base">{o.titulo}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${eixoColors[o.eixo]}`}>
                      {o.eixo}
                    </span>
                  </div>
                  <p className="text-sm text-atlia-muted mb-4">{o.descricao}</p>

                  <div className="flex items-center gap-6 mb-3 flex-wrap">
                    <div className="text-center">
                      <p className="text-lg font-bold text-atlia-navy">{o.projetos}</p>
                      <p className="text-xs text-atlia-muted">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-atlia-green">{o.concluidos}</p>
                      <p className="text-xs text-atlia-muted">Concluídos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-atlia-blue">{o.emAndamento}</p>
                      <p className="text-xs text-atlia-muted">Em andamento</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-atlia-red">{o.atrasados}</p>
                      <p className="text-xs text-atlia-muted">Atrasados</p>
                    </div>
                    <div className="flex-1 min-w-48">
                      <div className="flex justify-between text-xs text-atlia-muted mb-1">
                        <span>Progresso geral</span>
                        <span className="font-medium">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} color={pct > 60 ? 'green' : pct > 30 ? 'blue' : 'yellow'} />
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-atlia-blue transition-colors shrink-0 mt-1" />
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
