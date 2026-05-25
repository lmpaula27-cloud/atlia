'use client'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: { value: number; label: string }
  className?: string
}

export default function StatCard({
  title, value, subtitle, icon: Icon, iconColor = 'text-atlia-blue',
  trend, className
}: StatCardProps) {
  return (
    <div className={cn('card', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-atlia-muted font-medium">{title}</p>
          <p className="text-3xl font-bold text-atlia-navy mt-1">{value}</p>
          {subtitle && <p className="text-xs text-atlia-muted mt-1">{subtitle}</p>}
        </div>
        <div className={cn('p-3 rounded-xl bg-atlia-gray', iconColor)}>
          <Icon size={22} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span className={cn(
            'text-xs font-medium',
            trend.value >= 0 ? 'text-atlia-green' : 'text-atlia-red'
          )}>
            {trend.value >= 0 ? '▲' : '▼'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-atlia-muted">{trend.label}</span>
        </div>
      )}
    </div>
  )
}
