import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    nao_iniciado: 'Não iniciado',
    em_andamento: 'Em andamento',
    concluido: 'Concluído',
    cancelado: 'Cancelado',
    atencao: 'Atenção',
    atrasado: 'Atrasado',
    no_prazo: 'No prazo',
    critico: 'Crítico',
  }
  return labels[status] ?? status
}

export function getStatusColor(status: string): 'green' | 'yellow' | 'red' | 'gray' {
  const colors: Record<string, 'green' | 'yellow' | 'red' | 'gray'> = {
    em_andamento: 'green',
    concluido: 'green',
    no_prazo: 'green',
    atencao: 'yellow',
    nao_iniciado: 'gray',
    atrasado: 'red',
    cancelado: 'gray',
    critico: 'red',
  }
  return colors[status] ?? 'gray'
}

export function calcularSemaforo(projeto: {
  status: string
  percentual_conclusao: number
  data_fim_prevista: string | null
}): 'green' | 'yellow' | 'red' | 'gray' {
  if (projeto.status === 'concluido') return 'green'
  if (projeto.status === 'cancelado') return 'gray'
  if (projeto.status === 'atrasado') return 'red'
  if (projeto.status === 'atencao') return 'yellow'

  if (projeto.data_fim_prevista) {
    const hoje = new Date()
    const fim = new Date(projeto.data_fim_prevista)
    const diasRestantes = Math.ceil((fim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

    if (diasRestantes < 0) return 'red'
    if (diasRestantes < 30) return 'yellow'
  }

  return 'green'
}
