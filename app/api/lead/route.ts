import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const interesseLabel: Record<string, string> = {
  demo:        'Demonstração da plataforma',
  consultoria: 'Consultoria de planejamento estratégico',
  ambos:       'Plataforma + Consultoria',
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nome, municipio, cargo, email, telefone, interesse } = body

  if (!nome || !municipio || !email) {
    return NextResponse.json({ erro: 'Nome, município e e-mail são obrigatórios.' }, { status: 400 })
  }

  const url        = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return NextResponse.json({ erro: 'Configuração de servidor incompleta.' }, { status: 500 })
  }

  const supabaseAdmin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // 1. Grava o lead no banco
  const { error: insertError } = await supabaseAdmin.from('leads').insert({
    nome:      String(nome).trim(),
    municipio: String(municipio).trim(),
    cargo:     cargo ? String(cargo).trim() : null,
    email:     String(email).trim().toLowerCase(),
    telefone:  telefone ? String(telefone).trim() : null,
    interesse: ['demo', 'consultoria', 'ambos'].includes(interesse) ? interesse : 'demo',
  })

  if (insertError) {
    return NextResponse.json({ erro: insertError.message }, { status: 500 })
  }

  // 2. Notifica por e-mail (Resend) — opcional: só roda se a chave estiver configurada
  const resendKey   = process.env.RESEND_API_KEY
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL
  let emailEnviado  = false

  if (resendKey && notifyEmail) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization:  `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    process.env.LEAD_FROM_EMAIL ?? 'Atlia <onboarding@resend.dev>',
          to:      [notifyEmail],
          subject: `Novo lead: ${nome} — ${municipio}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:520px">
              <h2 style="color:#1F3864">Novo interessado pela landing page</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:6px 0;color:#6B7280">Nome</td><td style="padding:6px 0"><strong>${nome}</strong></td></tr>
                <tr><td style="padding:6px 0;color:#6B7280">Município</td><td style="padding:6px 0">${municipio}</td></tr>
                <tr><td style="padding:6px 0;color:#6B7280">Cargo</td><td style="padding:6px 0">${cargo || '—'}</td></tr>
                <tr><td style="padding:6px 0;color:#6B7280">E-mail</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:6px 0;color:#6B7280">Telefone</td><td style="padding:6px 0">${telefone || '—'}</td></tr>
                <tr><td style="padding:6px 0;color:#6B7280">Interesse</td><td style="padding:6px 0">${interesseLabel[interesse] ?? interesseLabel.demo}</td></tr>
              </table>
              <p style="font-size:12px;color:#9CA3AF;margin-top:16px">
                Gerencie em Configurações → Leads no painel Atlia.
              </p>
            </div>
          `,
        }),
      })
      emailEnviado = res.ok
    } catch {
      // E-mail é melhor-esforço: o lead já está salvo no banco
    }
  }

  return NextResponse.json({ sucesso: true, emailEnviado })
}
