'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SlidePanelProps {
  aberto: boolean
  titulo: string
  onFechar: () => void
  children: React.ReactNode
  largura?: string
}

export default function SlidePanel({
  aberto,
  titulo,
  onFechar,
  children,
  largura = 'w-[540px]',
}: SlidePanelProps) {
  useEffect(() => {
    if (!aberto) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onFechar() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [aberto, onFechar])

  if (!aberto) return null

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onFechar}
      />

      {/* Painel lateral */}
      <div className={cn(
        'fixed right-0 top-0 h-full bg-white shadow-2xl z-50 flex flex-col',
        largura,
      )}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="font-bold text-atlia-navy text-lg">{titulo}</h2>
          <button
            onClick={onFechar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}
