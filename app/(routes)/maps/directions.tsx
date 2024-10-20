import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react'
import OnProgressTripBanner from '@/routes/on-progress-trip-banner'

export default function Directions({
  origin,
  destination,
}: {
  origin: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral
}) {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()
  const [distance, setDistance] = useState<string | undefined>('0')
  const [duration, setDuration] = useState<string | undefined>('0')

  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return
    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response)
        const duration = response.routes[0].legs[0].duration?.text
        const distance = response.routes[0].legs[0].distance?.text
        setDistance(distance)
        setDuration(duration)
      })
  }, [directionsService, directionsRenderer, destination, origin])

  return <OnProgressTripBanner distance={distance} duration={duration} />
}