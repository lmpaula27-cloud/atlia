'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const TIMEOUT_MS  = 30 * 60 * 1000  // 30 minutos sem ação → deslogar
const AVISO_MS    = 60 * 1000        // aviso aparece 60 s antes de deslogar

const EVENTOS = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll', 'click'] as const

export default function InactivityTimeout() {
  const router   = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const avisoRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mostrarAviso, setMostrarAviso] = useState(false)
  const [segundos, setSegundos]         = useState(60)
  const contagemRef                     = useRef<ReturnType<typeof setInterval> | null>(null)

  const deslogar = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login?motivo=inatividade')
  }, [router])

  const fecharAviso = useCallback(() => {
    setMostrarAviso(false)
    setSegundos(60)
    if (contagemRef.current) clearInterval(contagemRef.current)
  }, [])

  const reiniciarTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (avisoRef.current) clearTimeout(avisoRef.current)
    fecharAviso()

    avisoRef.current = setTimeout(() => {
      setMostrarAviso(true)
      setSegundos(60)
      let s = 60
      contagemRef.current = setInterval(() => {
        s -= 1
        setSegundos(s)
        if (s <= 0) {
          if (contagemRef.current) clearInterval(contagemRef.current)
        }
      }, 1000)
    }, TIMEOUT_MS - AVISO_MS)

    timerRef.current = setTimeout(() => {
      deslogar()
    }, TIMEOUT_MS)
  }, [deslogar, fecharAviso])

  useEffect(() => {
    reiniciarTimer()
    EVENTOS.forEach(e => window.addEventListener(e, reiniciarTimer, { passive: true }))
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (avisoRef.current) clearTimeout(avisoRef.current)
      if (contagemRef.current) clearInterval(contagemRef.current)
      EVENTOS.forEach(e => window.removeEventListener(e, reiniciarTimer))
    }
  }, [reiniciarTimer])

  if (!mostrarAviso) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-amber-500">{segundos}</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Sessão prestes a expirar</h2>
        <p className="text-sm text-gray-500 mb-6">
          Você está inativo há 29 minutos. Sua sessão será encerrada automaticamente em{' '}
          <strong className="text-amber-600">{segundos} segundo{segundos !== 1 ? 's' : ''}</strong>.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reiniciarTimer}
            className="w-full bg-atlia-navy text-white font-semibold py-2.5 rounded-xl hover:bg-atlia-navy/90 transition-colors text-sm"
          >
            Continuar conectado
          </button>
          <button
            onClick={deslogar}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            Sair agora
          </button>
        </div>
      </div>
    </div>
  )
}
