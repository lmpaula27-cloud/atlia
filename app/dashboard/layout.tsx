import Sidebar from '@/components/Sidebar'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let municipioNome = 'Município'
  let perfil = 'visualizador'

  try {
    const supabase = createClient()

    const [{ data: municipio }, { data: { user } }] = await Promise.all([
      supabase.from('municipios').select('nome').single(),
      supabase.auth.getUser(),
    ])

    if (municipio?.nome) municipioNome = municipio.nome

    if (user) {
      const { data: usuario } = await supabase
        .from('usuarios')
        .select('perfil')
        .eq('id', user.id)
        .single()
      if (usuario?.perfil) perfil = usuario.perfil
    }
  } catch {
    // usa valores padrão se falhar
  }

  return (
    <div className="min-h-screen bg-atlia-gray">
      <Sidebar municipio={municipioNome} perfil={perfil} />
      <main className="ml-64 min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
