import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-atlia-gray">
      <Sidebar municipio="Prefeitura Municipal de Uberlândia" />
      <main className="ml-64 min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  )
}
