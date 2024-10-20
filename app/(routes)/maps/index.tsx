'use client'

import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import { useContext } from 'react'
import Directions from '@/routes/maps/directions'
import GeolocateButton from '@/routes/maps/geolocate-button'
import { UserLocationContext } from '@/routes/user-location-provider'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'

export default function Maps() {
  const userLocation = useContext(UserLocationContext)
  const userOnProgressTrip = useContext(UserOnProgressTripContext)
  if (userLocation === null) return null

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-dvh w-screen max-w-md">
        <Map
          zoom={14}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          defaultCenter={userLocation.coordinate}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          {userOnProgressTrip !== null && (
            <Directions
              origin={userLocation.coordinate}
              destination={userOnProgressTrip.destination.coordinate}
            />
          )}

          <AdvancedMarker position={userLocation.coordinate} />
          <GeolocateButton position={userLocation.coordinate} />
        </Map>
      </div>
    </APIProvider>
  )
}
