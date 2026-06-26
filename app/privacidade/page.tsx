import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidade — Atlia',
}

export default function PrivacidadePage() {
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

        <h1 className="text-3xl font-bold text-atlia-navy mb-2">Política de Privacidade</h1>
        <p className="text-sm text-atlia-muted mb-10">Última atualização: {hoje}</p>

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-8">

          <section>
            <p>
              O <strong>Atlia</strong> ("nós", "nosso" ou "plataforma") é uma plataforma de gestão estratégica
              municipal. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos
              os dados pessoais de visitantes do nosso site e de usuários da plataforma, em conformidade com a
              Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">1. Quais dados coletamos</h2>
            <p className="font-semibold text-gray-800 mt-4 mb-1">a) Visitantes do site (formulário de contato)</p>
            <p>Quando você solicita uma demonstração ou consultoria pelo nosso formulário, coletamos:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Nome completo</li>
              <li>Município e cargo/função</li>
              <li>E-mail institucional</li>
              <li>Telefone (opcional)</li>
              <li>Tipo de interesse informado (demonstração, consultoria, ou ambos)</li>
            </ul>
            <p className="font-semibold text-gray-800 mt-4 mb-1">b) Usuários da plataforma</p>
            <p>Para quem utiliza o Atlia mediante convite de um município contratante, armazenamos:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Nome, e-mail e cargo</li>
              <li>Perfil de acesso e secretaria(s) vinculada(s)</li>
              <li>Dados de autenticação (senha criptografada, sessão de login)</li>
              <li>Registros de atividade realizados dentro da plataforma (ex.: atualizações de projetos)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">2. Para que usamos seus dados</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responder à sua solicitação de contato, demonstração ou consultoria;</li>
              <li>Criar e gerenciar contas de acesso à plataforma para municípios contratantes;</li>
              <li>Enviar comunicações operacionais (ex.: convite de acesso, redefinição de senha);</li>
              <li>Garantir a segurança e o funcionamento correto do serviço;</li>
              <li>Cumprir obrigações legais ou regulatórias, quando aplicável.</li>
            </ul>
            <p className="mt-3">Não utilizamos seus dados para envio de spam ou para venda a terceiros.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">3. Base legal para o tratamento</h2>
            <p>
              Tratamos os dados de contato comercial com base no <strong>legítimo interesse</strong> em responder
              a uma solicitação espontânea (art. 7º, IX, da LGPD). Os dados de usuários da plataforma são
              tratados com base na <strong>execução de contrato</strong> firmado entre o Atlia e o município
              contratante (art. 7º, V, da LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">4. Com quem compartilhamos dados</h2>
            <p>Utilizamos os seguintes prestadores de serviço para operar a plataforma, que atuam como operadores de dados:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Supabase</strong> — banco de dados e autenticação;</li>
              <li><strong>Vercel</strong> — hospedagem da aplicação;</li>
              <li><strong>Resend</strong> — envio de e-mails transacionais (convites, notificações).</li>
            </ul>
            <p className="mt-3">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">5. Armazenamento e segurança</h2>
            <p>
              Os dados são armazenados em infraestrutura com criptografia em trânsito e em repouso, com controle
              de acesso por perfil de usuário e isolamento dos dados de cada município contratante. O acesso à
              plataforma exige autenticação por senha.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">6. Cookies</h2>
            <p>
              Nosso site não utiliza cookies de rastreamento ou publicidade de terceiros. A plataforma utiliza
              apenas cookies essenciais de sessão, necessários para manter você autenticado durante o uso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">7. Seus direitos como titular dos dados</h2>
            <p>De acordo com o art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Confirmação da existência de tratamento dos seus dados;</li>
              <li>Acesso, correção ou atualização dos seus dados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Eliminação dos dados tratados com seu consentimento;</li>
              <li>Informação sobre os terceiros com quem compartilhamos seus dados.</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
              <a href="mailto:contato@atlia.com.br" className="text-atlia-blue hover:underline">contato@atlia.com.br</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">8. Retenção de dados</h2>
            <p>
              Dados de contato comercial (formulário do site) são mantidos por até 24 meses ou até que você
              solicite a exclusão. Dados de usuários da plataforma são mantidos durante a vigência do contrato
              com o município e excluídos ou anonimizados após seu término, salvo obrigação legal de retenção.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">9. Alterações desta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A data da última atualização está sempre
              indicada no topo desta página. Recomendamos revisitá-la com regularidade.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-atlia-navy mt-2 mb-3">10. Contato</h2>
            <p>
              Dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados podem ser enviadas
              para <a href="mailto:contato@atlia.com.br" className="text-atlia-blue hover:underline">contato@atlia.com.br</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
