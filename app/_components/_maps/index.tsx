'use client'

import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import GeolocateButton from '@/app/_components/_maps/geolocate-button'
import OnProgressEscortBanner from '@/app/_components/on-progress-escort-banner'
import DirectionsProvider from '@/utils/providers/directions-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

export default function Maps() {
  const userLocation = useUserLocation()
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
            <OnProgressEscortBanner />
          </DirectionsProvider>

          <AdvancedMarker position={userLocation.coordinate} />
          <GeolocateButton position={userLocation.coordinate} />
        </Map>
      </div>
    </APIProvider>
  )
}
