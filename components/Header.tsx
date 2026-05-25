'use client'
import { Bell, User } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  usuario?: string
}

export default function Header({ title, subtitle, usuario = 'Administrador' }: HeaderProps) {
  const hoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date())

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-atlia-navy">{title}</h1>
        {subtitle
          ? <p className="text-sm text-atlia-muted mt-0.5">{subtitle}</p>
          : <p className="text-sm text-atlia-muted mt-0.5 capitalize">{hoje}</p>
        }
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-atlia-navy hover:bg-atlia-gray rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-atlia-red rounded-full" />
        </button>
        <div className="flex items-center gap-2.5 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-atlia-navy rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{usuario}</p>
            <p className="text-xs text-atlia-muted">Prefeito(a)</p>
          </div>
        </div>
      </div>
    </header>
  )
}
