import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

// Processa links de e-mail (convite, recuperação de senha, magic link).
// Usa token_hash + verifyOtp — funciona em qualquer navegador/dispositivo,
// diferente do fluxo com code que exige o mesmo navegador que iniciou.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const tokenHash = searchParams.get('token_hash')
  const type      = searchParams.get('type') as EmailOtpType | null
  const next      = searchParams.get('next') ?? '/dashboard'

  if (tokenHash && type) {
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return response
  }

  // Link inválido ou expirado
  return NextResponse.redirect(`${origin}/login?error=link_expirado`)
}
