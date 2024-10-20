import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { ReactNode, useEffect, useState } from 'react'

export default function Directions({
  origin,
  destination,
  children,
}: {
  origin: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral
  children: ReactNode
}) {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()

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
      .then((response) => directionsRenderer.setDirections(response))
  }, [directionsService, directionsRenderer, destination, origin])

  return <>{children}</>
}
