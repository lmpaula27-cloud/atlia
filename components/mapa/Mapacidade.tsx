'use client'
import { useEffect, useRef } from 'react'

interface Projeto {
  id: string
  nome: string
  secretaria: string
  status: 'em_andamento' | 'atencao' | 'atrasado' | 'concluido' | 'nao_iniciado'
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

// Projetos de exemplo com coordenadas em Uberlândia
const projetos: Projeto[] = [
  { id:'1',  nome:'Recapeamento Asfáltico — Zona Norte',  secretaria:'Obras',      status:'em_andamento', pct:68, lat:-18.8892, lng:-48.2557, bairro:'Tibery'          },
  { id:'2',  nome:'UBS Jardim das Palmeiras',             secretaria:'Saúde',      status:'atencao',      pct:32, lat:-18.9412, lng:-48.2981, bairro:'Jd. das Palmeiras'},
  { id:'3',  nome:'Sistema de Monitoramento Escolar',     secretaria:'Educação',   status:'em_andamento', pct:81, lat:-18.9186, lng:-48.2772, bairro:'Centro'           },
  { id:'4',  nome:'Revitalização da Praça Central',       secretaria:'Urbanismo',  status:'atrasado',     pct:15, lat:-18.9181, lng:-48.2769, bairro:'Centro'           },
  { id:'5',  nome:'Programa Emprego e Renda 2026',        secretaria:'Trabalho',   status:'em_andamento', pct:55, lat:-18.9250, lng:-48.2650, bairro:'Saraiva'          },
  { id:'6',  nome:'Pavimentação Distrito Industrial',     secretaria:'Obras',      status:'nao_iniciado', pct:0,  lat:-18.8750, lng:-48.2400, bairro:'Dist. Industrial'  },
  { id:'7',  nome:'Ampliação do CRAS Norte',              secretaria:'Assistência',status:'em_andamento', pct:47, lat:-18.8810, lng:-48.2620, bairro:'Marta Helena'     },
  { id:'8',  nome:'Iluminação LED — Centro Histórico',    secretaria:'Urbanismo',  status:'concluido',    pct:100,lat:-18.9195, lng:-48.2780, bairro:'Centro'           },
  { id:'9',  nome:'Ciclovia Avenida João Naves',          secretaria:'Obras',      status:'em_andamento', pct:62, lat:-18.9100, lng:-48.2500, bairro:'Martins'          },
  { id:'10', nome:'Reforma da Escola Municipal Bom Jesus',secretaria:'Educação',   status:'atencao',      pct:40, lat:-18.9350, lng:-48.3100, bairro:'Canaã'            },
  { id:'11', nome:'UPA Zona Sul — Ampliação',             secretaria:'Saúde',      status:'atrasado',     pct:20, lat:-18.9600, lng:-48.2900, bairro:'Luizote'          },
  { id:'12', nome:'Parque Linear Córrego São Pedro',      secretaria:'Meio Amb.',  status:'em_andamento', pct:55, lat:-18.9050, lng:-48.2850, bairro:'Segismundo Pereira'},
]

interface Props {
  filtroStatus?: string
  filtroSecretaria?: string
}

export default function MapaCidade({ filtroStatus = 'todos', filtroSecretaria = 'Todas' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstanceRef.current) return

    import('leaflet').then((L) => {
      // Fix ícone padrão do Leaflet no Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!mapRef.current) return

      const map = L.map(mapRef.current, {
        center:    [-18.9186, -48.2772],
        zoom:      13,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
      renderMarkers(L, map, filtroStatus, filtroSecretaria)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return
    import('leaflet').then((L) => {
      renderMarkers(L, mapInstanceRef.current, filtroStatus, filtroSecretaria)
    })
  }, [filtroStatus, filtroSecretaria])

  function renderMarkers(L: any, map: any, status: string, secretaria: string) {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer)
      }
    })

    const filtrados = projetos.filter(p => {
      const matchStatus = status === 'todos' || p.status === status
      const matchSec = secretaria === 'Todas' || p.secretaria === secretaria
      return matchStatus && matchSec
    })

    filtrados.forEach(p => {
      const cor = statusCor[p.status]
      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 10,
        fillColor: cor,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map)

      marker.bindPopup(`
        <div style="min-width:220px;font-family:Inter,sans-serif">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:${cor};display:inline-block;flex-shrink:0"></span>
            <strong style="font-size:13px;color:#1F3864;line-height:1.3">${p.nome}</strong>
          </div>
          <div style="font-size:12px;color:#6B7280;margin-bottom:4px">📍 ${p.bairro}</div>
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
            ${statusLabel[p.status]}
          </div>
        </div>
      `, { maxWidth: 280 })
    })
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} className="w-full h-full rounded-xl" />
    </>
  )
}
