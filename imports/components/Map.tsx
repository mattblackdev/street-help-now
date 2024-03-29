import { LatLng } from 'leaflet'
import React, { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'

const coords: [number, number] = [30.305229642031133, -81.65392577648164]

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        [{position.lat}, {position.lng}]
      </Popup>
    </Marker>
  )
}

export type Markers = Array<{
  key: string
  coords: { lat: number; lng: number }
  tooltip: string
}>
export type MapProps = { markers?: Markers }

export function Map({ markers = [] }: MapProps) {
  return (
    <MapContainer
      center={coords}
      zoom={10}
      style={{ height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(({ coords, tooltip, key }) => {
        return (
          <Marker key={key} position={coords}>
            <Popup>{tooltip}</Popup>
          </Marker>
        )
      })}
      <LocationMarker />
    </MapContainer>
  )
}
