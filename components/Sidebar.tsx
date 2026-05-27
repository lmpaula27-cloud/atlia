'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FolderKanban, Target, BarChart3,
  FileText, Settings, LogOut, ChevronRight, Map, Compass
} from 'lucide-react'

const nav = [
  { href: '/dashboard',                    label: 'Painel Executivo',   icon: LayoutDashboard },
  { href: '/dashboard/mapa-estrategico',   label: 'Mapa Estratégico',   icon: Compass         },
  { href: '/dashboard/objetivos',          label: 'Objetivos',          icon: Target          },
  { href: '/dashboard/projetos',           label: 'Projetos',           icon: FolderKanban    },
  { href: '/dashboard/mapa',               label: 'Mapa da Cidade',     icon: Map             },
  { href: '/dashboard/indicadores',        label: 'Indicadores',        icon: BarChart3       },
  { href: '/dashboard/relatorios',         label: 'Relatórios',         icon: FileText        },
]

export default function Sidebar({ municipio }: { municipio: string }) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-atlia-navy flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <span className="text-atlia-navy font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">atlia</p>
            <p className="text-white/50 text-xs">gestão municipal</p>
          </div>
        </div>
      </div>

      {/* Município */}
      <div className="px-6 py-4 border-b border-white/10">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Município</p>
        <p className="text-white text-sm font-semibold truncate">{municipio}</p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <Icon size={18} className={cn(active ? 'text-white' : 'text-white/50 group-hover:text-white')} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="text-white/50" />}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link href="/dashboard/configuracoes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white transition-all">
          <Settings size={18} />
          <span>Configurações</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-red-500/20 hover:text-red-300 transition-all">
          <LogOut size={18} />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  )
}
