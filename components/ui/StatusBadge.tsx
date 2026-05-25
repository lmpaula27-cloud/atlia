'use client'
import { cn, getStatusLabel, getStatusColor } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

const dotClass = {
  green:  'bg-atlia-green',
  yellow: 'bg-atlia-yellow',
  red:    'bg-atlia-red',
  gray:   'bg-gray-400',
}

const badgeClass = {
  green:  'bg-green-50 text-green-800 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  red:    'bg-red-50 text-red-800 border-red-200',
  gray:   'bg-gray-50 text-gray-700 border-gray-200',
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const color = getStatusColor(status)
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
      badgeClass[color],
      className
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dotClass[color])} />
      {getStatusLabel(status)}
    </span>
  )
}
