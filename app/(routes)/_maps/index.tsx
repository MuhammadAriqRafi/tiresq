'use client'

import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import { useContext } from 'react'
import DirectionsProvider from '@/routes/_maps/directions-provider'
import GeolocateButton from '@/routes/_maps/geolocate-button'
import OnProgressTripBanner from '@/routes/on-progress-trip-banner'
import { UserLocationContext } from '@/routes/user-location-provider'

export default function Maps() {
  const userLocation = useContext(UserLocationContext)
  if (userLocation === null) return null

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-dvh w-screen max-w-md">
        <Map
          minZoom={9}
          defaultZoom={14}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          defaultCenter={userLocation.coordinate}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          <DirectionsProvider>
            <OnProgressTripBanner />
          </DirectionsProvider>

          <AdvancedMarker position={userLocation.coordinate} />
          <GeolocateButton position={userLocation.coordinate} />
        </Map>
      </div>
    </APIProvider>
  )
}
