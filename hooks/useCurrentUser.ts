'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface CurrentUser {
  id: string
  nome: string
  perfil: 'admin' | 'gestor' | 'visualizador'
  secretaria_id: string | null
  carregando: boolean
}

const defaultUser: CurrentUser = {
  id: '', nome: '', perfil: 'visualizador', secretaria_id: null, carregando: true,
}

export function useCurrentUser(): CurrentUser {
  const [user, setUser] = useState<CurrentUser>(defaultUser)

  useEffect(() => {
    async function carregar() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (!authUser) {
        setUser({ ...defaultUser, carregando: false })
        return
      }

      const { data } = await supabase
        .from('usuarios')
        .select('id, nome, perfil, secretaria_id')
        .eq('id', authUser.id)
        .single()

      if (data) {
        setUser({
          id:           data.id,
          nome:         data.nome,
          perfil:       data.perfil,
          secretaria_id: data.secretaria_id,
          carregando:   false,
        })
      } else {
        setUser({ ...defaultUser, id: authUser.id, carregando: false })
      }
    }
    carregar()
  }, [])

  return user
}
