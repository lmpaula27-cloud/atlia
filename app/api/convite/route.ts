import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin') ?? 'https://www.atlia.com.br'

  const body = await request.json()
  const { email, nome, perfil, secretaria_id, secretaria_ids } = body

  if (!email || !nome || !perfil) {
    return NextResponse.json({ erro: 'E-mail, nome e perfil são obrigatórios.' }, { status: 400 })
  }

  // Aceita tanto o formato novo (array) quanto o legado (único)
  const idsSecretarias: string[] = Array.isArray(secretaria_ids)
    ? secretaria_ids.filter(Boolean)
    : secretaria_id ? [secretaria_id] : []

  const url         = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return NextResponse.json({ erro: 'Configuração de servidor incompleta.' }, { status: 500 })
  }

  // Cliente com service role — só disponível server-side
  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // 1. Buscar o municipio_id (single tenant — retorna apenas um)
  const { data: municipio } = await supabaseAdmin
    .from('municipios')
    .select('id')
    .single()

  if (!municipio) {
    return NextResponse.json({ erro: 'Município não encontrado.' }, { status: 500 })
  }

  // 2. Convidar via Supabase Auth (envia e-mail com link de acesso)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { nome },
  })

  let userId: string
  let jaExistia = false

  if (authError) {
    // Se o e-mail já existe, busca o usuário existente e reenvia o convite via generateLink
    if (authError.message.toLowerCase().includes('already been registered') || authError.status === 422) {
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
      const existing = existingUsers?.users?.find(u => u.email === email)
      if (!existing) {
        return NextResponse.json({ erro: 'Usuário já registrado mas não encontrado.' }, { status: 400 })
      }
      userId = existing.id
      jaExistia = true

      // Envia e-mail de redefinição de senha — única forma de enviar e-mail para usuário já existente.
      // O link aponta para /dashboard/alterar-senha, comportamento idêntico ao convite normal.
      await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/confirm?type=recovery&next=/dashboard/alterar-senha`,
      })
    } else {
      return NextResponse.json({ erro: authError.message }, { status: 400 })
    }
  } else {
    userId = authData.user.id
  }

  // 3. Criar perfil em usuarios se ainda não existe
  if (!jaExistia) {
    const { error: profileError } = await supabaseAdmin.from('usuarios').insert({
      id:           userId,
      municipio_id: municipio.id,
      nome,
      perfil,
      secretaria_id: idsSecretarias[0] ?? null,
      ativo:         true,
    })

    if (profileError) {
      // Reverte o invite se o perfil falhar
      await supabaseAdmin.auth.admin.deleteUser(userId)
      return NextResponse.json({ erro: profileError.message }, { status: 500 })
    }
  } else {
    // Atualiza perfil e nome para o usuário já existente
    await supabaseAdmin.from('usuarios').upsert({
      id:           userId,
      municipio_id: municipio.id,
      nome,
      perfil,
      secretaria_id: idsSecretarias[0] ?? null,
      ativo:         true,
    }, { onConflict: 'id' })
  }

  // 4. Vincula as secretarias (acesso múltiplo) — upsert para não duplicar
  if (idsSecretarias.length > 0) {
    await supabaseAdmin.from('usuarios_secretarias').upsert(
      idsSecretarias.map((sid: string) => ({ usuario_id: userId, secretaria_id: sid })),
      { onConflict: 'usuario_id,secretaria_id' }
    )
  }

  return NextResponse.json({ sucesso: true, userId, jaExistia })
}
