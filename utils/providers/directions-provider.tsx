import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { UserLocationContext } from '@/utils/providers/user-location-provider'

export const useDirections = () => useContext(DirectionsContext)
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
  const { onProgressEscort } = useOnProgressEscort()

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
    // TODO: If start implementing live user location, make sure adding buffer for these functionality
    if (
      !directionsService ||
      !directionsRenderer ||
      userLocation === null ||
      onProgressEscort === null ||
      onProgressEscort.isExpired
    )
      return

    directionsService
      .route({
        origin: userLocation.coordinate,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
        destination: {
          lat: onProgressEscort.destination.coordinate.latitude,
          lng: onProgressEscort.destination.coordinate.longitude,
        },
      })
      .then((response) => {
        directionsRenderer.setDirections(response)
        const duration = response.routes[0].legs[0].duration?.text
        const distance = response.routes[0].legs[0].distance?.text
        setDistance(distance)
        setDuration(duration)
      })
  }, [directionsService, directionsRenderer, onProgressEscort, userLocation])

  return (
    <DirectionsContext.Provider
      value={{ distance, duration, directionsRenderer }}
    >
      {children}
    </DirectionsContext.Provider>
  )
}
