'use client'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'green' | 'blue' | 'yellow' | 'red'
}

export default function ProgressBar({ value, max = 100, className, color = 'blue' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const barColor = {
    green:  'bg-atlia-green',
    blue:   'bg-atlia-blue',
    yellow: 'bg-atlia-yellow',
    red:    'bg-atlia-red',
  }[color]

  return (
    <div className={cn('w-full bg-gray-100 rounded-full h-2', className)}>
      <div
        className={cn('h-2 rounded-full transition-all duration-300', barColor)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
