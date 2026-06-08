import Sidebar from '@/components/Sidebar'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let municipioNome = 'Município'

  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('municipios')
      .select('nome')
      .single()
    if (data?.nome) municipioNome = data.nome
  } catch {
    // usa nome padrão se falhar
  }

  return (
    <div className="min-h-screen bg-atlia-gray">
      <Sidebar municipio={municipioNome} />
      <main className="ml-64 min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
