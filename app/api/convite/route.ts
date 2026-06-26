import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
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
  const anonKey      = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey || !anonKey) {
    return NextResponse.json({ erro: 'Configuração de servidor incompleta.' }, { status: 500 })
  }

  // Identifica quem está chamando a rota via cookie de sessão (client com RLS, não service role)
  const supabaseAuth = createServerClient(url, anonKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll() { /* não precisa persistir cookies nesta rota */ },
    },
  })

  const { data: { user: chamador } } = await supabaseAuth.auth.getUser()
  if (!chamador) {
    return NextResponse.json({ erro: 'Não autenticado.' }, { status: 401 })
  }

  const { data: perfilChamador } = await supabaseAuth
    .from('usuarios')
    .select('perfil, municipio_id')
    .eq('id', chamador.id)
    .single()

  if (!perfilChamador || perfilChamador.perfil !== 'admin') {
    return NextResponse.json({ erro: 'Apenas administradores podem convidar usuários.' }, { status: 403 })
  }

  // Município do usuário que está convidando — nunca de uma busca "às cegas" na tabela inteira
  // (importante: este endpoint usa service role abaixo, que ignora RLS; sem isso, com mais de
  // um município cadastrado o convite poderia vincular o novo usuário ao município errado)
  const municipio = { id: perfilChamador.municipio_id }

  // Cliente com service role — só disponível server-side
  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // 2. Convidar via Supabase Auth (envia e-mail com link de acesso)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { nome },
  })

  let userId: string
  let jaExistia = false

  if (authError) {
    if (authError.message.toLowerCase().includes('already been registered') || authError.status === 422) {
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
      const existing = existingUsers?.users?.find(u => u.email === email)
      if (!existing) {
        return NextResponse.json({ erro: 'Usuário já registrado mas não encontrado.' }, { status: 400 })
      }

      if (!existing.email_confirmed_at) {
        // Nunca definiu senha → apaga e reenvida convite limpo
        await supabaseAdmin.auth.admin.deleteUser(existing.id)
        await supabaseAdmin.from('usuarios').delete().eq('id', existing.id)

        const { data: reInvite, error: reErr } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
          data: { nome },
        })
        if (reErr) return NextResponse.json({ erro: reErr.message }, { status: 400 })
        userId = reInvite.user.id
      } else {
        // Já tem conta ativa → envia link de redefinição de senha
        userId = existing.id
        jaExistia = true
        await supabaseAdmin.auth.resetPasswordForEmail(email, {
          redirectTo: `${origin}/auth/confirm?type=recovery&next=/dashboard/alterar-senha`,
        })
      }
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
