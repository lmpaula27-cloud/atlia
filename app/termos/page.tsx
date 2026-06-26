import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Termos de Uso — Atlia',
}

export default function TermosPage() {
  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-atlia-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-atlia-navy font-bold text-lg">atlia</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-atlia-blue hover:underline mb-8">
          <ArrowLeft size={14} /> Voltar para o site
        </Link>

        <h1 className="text-3xl font-bold text-atlia-navy mb-2">Termos de Uso</h1>
        <p className="text-sm text-atlia-muted mb-10">Última atualização: {hoje}</p>

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-8">

          <section>
            <p>
              Estes Termos de Uso regulam a utilização da plataforma <strong>Atlia</strong> (CNPJ
              45.593.862/0001-03), destinada à gestão estratégica municipal. Ao acessar ou utilizar a
              plataforma, você concorda com os termos abaixo. Caso não concorde, não utilize o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">1. Descrição do serviço</h2>
            <p>
              O Atlia é uma plataforma de software como serviço (SaaS) que permite a prefeituras e órgãos
              públicos municipais planejar, acompanhar e reportar projetos, indicadores de desempenho e
              objetivos estratégicos de gestão. O acesso à plataforma é fornecido mediante contratação pelo
              município e convite individual de usuários.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">2. Cadastro e acesso</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>O acesso à plataforma é feito por convite enviado por um administrador do município contratante;</li>
              <li>Cada usuário é responsável por manter a confidencialidade de sua senha e por todas as atividades realizadas em sua conta;</li>
              <li>O usuário deve fornecer informações verdadeiras no cadastro e mantê-las atualizadas;</li>
              <li>Suspeita de uso não autorizado da conta deve ser comunicada imediatamente ao administrador do município ou ao suporte do Atlia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">3. Perfis de acesso e responsabilidades</h2>
            <p>
              A plataforma define diferentes perfis de usuário (administrador, gestor e visualizador), cada um
              com permissões específicas de visualização e edição definidas pelo município contratante. O
              município é responsável por atribuir corretamente os perfis e secretarias de cada usuário convidado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">4. Uso permitido</h2>
            <p>Você se compromete a não:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Utilizar a plataforma para fins ilícitos ou não autorizados;</li>
              <li>Tentar acessar dados de outros municípios ou contas sem autorização;</li>
              <li>Realizar engenharia reversa, copiar ou redistribuir o software da plataforma;</li>
              <li>Inserir conteúdo ofensivo, falso ou que viole direitos de terceiros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">5. Planos e contratação</h2>
            <p>
              O acesso à plataforma é fornecido conforme o plano contratado pelo município junto ao Atlia,
              incluindo condições de cobrança, prazo de vigência e suporte, definidas em proposta comercial ou
              contrato específico. Informações de planos exibidas no site são meramente indicativas e podem ser
              ajustadas conforme negociação.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">6. Propriedade intelectual</h2>
            <p>
              Todo o software, marca, layout e conteúdo da plataforma Atlia são de propriedade exclusiva do
              Atlia ou de seus licenciantes. Os dados inseridos pelo município contratante (projetos,
              indicadores, planos estratégicos) permanecem de propriedade do município.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">7. Disponibilidade do serviço</h2>
            <p>
              Buscamos manter a plataforma disponível de forma contínua, mas não garantimos operação
              ininterrupta. Manutenções programadas, atualizações e eventos fora do nosso controle (ex.:
              indisponibilidade de provedores de infraestrutura) podem causar interrupções temporárias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">8. Limitação de responsabilidade</h2>
            <p>
              O Atlia não se responsabiliza por decisões administrativas tomadas pelo município com base nas
              informações registradas na plataforma, sendo de responsabilidade do município e de seus usuários
              a exatidão dos dados inseridos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">9. Rescisão e suspensão</h2>
            <p>
              O acesso de um usuário pode ser suspenso ou encerrado pelo administrador do município a qualquer
              momento. O contrato entre o Atlia e o município pode ser rescindido conforme condições acordadas
              na contratação. Ao final da vigência, os dados poderão ser exportados pelo município antes da
              exclusão definitiva.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">10. Alterações destes termos</h2>
            <p>
              Estes termos podem ser atualizados periodicamente. A data da última atualização está sempre
              indicada no topo desta página.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">11. Lei aplicável</h2>
            <p>
              Estes Termos de Uso são regidos pelas leis brasileiras. Eventuais controvérsias serão submetidas
              ao foro da comarca do município contratante, salvo disposição diversa em contrato específico.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">12. Contato</h2>
            <p>
              Dúvidas sobre estes Termos de Uso podem ser enviadas para{' '}
              <a href="mailto:contato@atlia.com.br" className="text-atlia-blue hover:underline">contato@atlia.com.br</a>.
              Para questões de privacidade, consulte nossa{' '}
              <Link href="/privacidade" className="text-atlia-blue hover:underline">Política de Privacidade</Link>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
