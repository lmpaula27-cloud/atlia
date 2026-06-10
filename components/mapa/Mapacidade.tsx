'use client'
import { useEffect, useRef } from 'react'

export interface ProjetoMapa {
  id: string
  nome: string
  secretaria: string
  status: string
  pct: number
  lat: number
  lng: number
  bairro: string
}

const statusCor: Record<string, string> = {
  em_andamento: '#70AD47',
  concluido:    '#70AD47',
  atencao:      '#FFC000',
  atrasado:     '#C00000',
  nao_iniciado: '#9CA3AF',
}

const statusLabel: Record<string, string> = {
  em_andamento: 'Em andamento',
  concluido:    'Concluído',
  atencao:      'Atenção',
  atrasado:     'Atrasado',
  nao_iniciado: 'Não iniciado',
}

interface Props {
  projetos: ProjetoMapa[]
  centroLat?: number
  centroLng?: number
}

export default function MapaCidade({ projetos, centroLat = -18.9186, centroLng = -48.2772 }: Props) {
  const mapRef         = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  // Inicializa o mapa uma única vez
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!mapRef.current) return

      const map = L.map(mapRef.current, {
        center:      [centroLat, centroLng],
        zoom:        13,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom:     19,
      }).addTo(map)

      mapInstanceRef.current = map
      renderMarkers(L, map, projetos)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-renderiza marcadores quando projetos mudam
  useEffect(() => {
    if (!mapInstanceRef.current) return
    import('leaflet').then((L) => {
      renderMarkers(L, mapInstanceRef.current, projetos)
    })
  }, [projetos])

  function renderMarkers(L: any, map: any, lista: ProjetoMapa[]) {
    // Remove marcadores anteriores
    map.eachLayer((layer: any) => {
      if (layer instanceof L.CircleMarker) map.removeLayer(layer)
    })

    lista.forEach(p => {
      const cor = statusCor[p.status] ?? '#9CA3AF'
      const marker = L.circleMarker([p.lat, p.lng], {
        radius:      10,
        fillColor:   cor,
        color:       '#fff',
        weight:      2,
        opacity:     1,
        fillOpacity: 0.9,
      }).addTo(map)

      marker.bindPopup(`
        <div style="min-width:220px;font-family:Inter,sans-serif">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:${cor};display:inline-block;flex-shrink:0"></span>
            <strong style="font-size:13px;color:#1F3864;line-height:1.3">${p.nome}</strong>
          </div>
          <div style="font-size:12px;color:#6B7280;margin-bottom:4px">📍 ${p.bairro || '—'}</div>
          <div style="font-size:12px;color:#6B7280;margin-bottom:8px">🏛 ${p.secretaria}</div>
          <div style="background:#F5F7FA;border-radius:6px;padding:8px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:12px;color:#6B7280">Progresso</span>
              <span style="font-size:12px;font-weight:600;color:#1F3864">${p.pct}%</span>
            </div>
            <div style="background:#E5E7EB;border-radius:4px;height:6px">
              <div style="background:${cor};width:${p.pct}%;height:6px;border-radius:4px"></div>
            </div>
          </div>
          <div style="margin-top:8px;font-size:11px;font-weight:600;color:${cor};text-transform:uppercase;letter-spacing:0.05em">
            ${statusLabel[p.status] ?? p.status}
          </div>
        </div>
      `, { maxWidth: 280 })
    })
  }

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} className="w-full h-full rounded-xl" />
    </>
  )
}
