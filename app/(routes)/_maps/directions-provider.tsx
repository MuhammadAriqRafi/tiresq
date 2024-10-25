import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserLocationContext } from '@/routes/user-location-provider'
import { UserOnProgressTripContext } from '@/routes/user-on-progress-trip-provider'

export const DirectionsContext = createContext<{
  duration?: string
  distance?: string
  directionsRenderer?: google.maps.DirectionsRenderer
}>({})

export default function DirectionsProvider({
  children,
}: {
  children: ReactNode
}) {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const userLocation = useContext(UserLocationContext)
  const { onProgressTrip } = useContext(UserOnProgressTripContext)

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
    if (
      !directionsService ||
      !directionsRenderer ||
      userLocation === null ||
      onProgressTrip === null
    )
      return

    directionsService
      .route({
        origin: userLocation.coordinate,
        destination: onProgressTrip.destination.coordinate,
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
  }, [directionsService, directionsRenderer, onProgressTrip, userLocation])

  return (
    <DirectionsContext.Provider
      value={{ distance, duration, directionsRenderer }}
    >
      {children}
    </DirectionsContext.Provider>
  )
}
