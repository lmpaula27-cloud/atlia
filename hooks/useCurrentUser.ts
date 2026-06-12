'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface CurrentUser {
  id: string
  nome: string
  perfil: 'admin' | 'gestor' | 'visualizador'
  /** @deprecated use secretaria_ids — mantido por compatibilidade */
  secretaria_id: string | null
  /** Secretarias às quais o usuário tem acesso de gestão */
  secretaria_ids: string[]
  carregando: boolean
}

const defaultUser: CurrentUser = {
  id: '', nome: '', perfil: 'visualizador', secretaria_id: null, secretaria_ids: [], carregando: true,
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

      const [{ data }, { data: vinculos }] = await Promise.all([
        supabase
          .from('usuarios')
          .select('id, nome, perfil, secretaria_id')
          .eq('id', authUser.id)
          .single(),
        supabase
          .from('usuarios_secretarias')
          .select('secretaria_id')
          .eq('usuario_id', authUser.id),
      ])

      if (data) {
        const ids: string[] = (vinculos ?? []).map((v: any) => v.secretaria_id as string)
        // fallback: se a tabela de vínculos estiver vazia, usa o campo legado
        if (ids.length === 0 && data.secretaria_id) ids.push(data.secretaria_id)
        setUser({
          id:            data.id,
          nome:          data.nome,
          perfil:        data.perfil,
          secretaria_id: ids[0] ?? null,
          secretaria_ids: ids,
          carregando:    false,
        })
      } else {
        setUser({ ...defaultUser, id: authUser.id, carregando: false })
      }
    }
    carregar()
  }, [])

  return user
}
