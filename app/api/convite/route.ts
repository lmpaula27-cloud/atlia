import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, nome, perfil, secretaria_id } = body

  if (!email || !nome || !perfil) {
    return NextResponse.json({ erro: 'E-mail, nome e perfil são obrigatórios.' }, { status: 400 })
  }

  const url         = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return NextResponse.json({ erro: 'Configuração de servidor incompleta.' }, { status: 500 })
  }

  // Cliente com service role — só disponível server-side
  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // 1. Convidar via Supabase Auth (envia e-mail com link de acesso)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { nome },
  })

  if (authError) {
    return NextResponse.json({ erro: authError.message }, { status: 400 })
  }

  const userId = authData.user.id

  // 2. Buscar o municipio_id (single tenant — retorna apenas um)
  const { data: municipio } = await supabaseAdmin
    .from('municipios')
    .select('id')
    .single()

  if (!municipio) {
    return NextResponse.json({ erro: 'Município não encontrado.' }, { status: 500 })
  }

  // 3. Criar perfil em usuarios (RLS bypassed com service role)
  const { error: profileError } = await supabaseAdmin.from('usuarios').insert({
    id:           userId,
    municipio_id: municipio.id,
    nome,
    perfil,
    secretaria_id: secretaria_id || null,
    ativo:         true,
  })

  if (profileError) {
    // Reverte o invite se o perfil falhar
    await supabaseAdmin.auth.admin.deleteUser(userId)
    return NextResponse.json({ erro: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ sucesso: true, userId })
}
