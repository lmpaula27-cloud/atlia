import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atlia — Gestão Estratégica Municipal',
  description: 'Plataforma de planejamento e gestão estratégica para prefeituras',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
