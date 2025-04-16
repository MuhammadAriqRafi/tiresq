import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'
import cancelEscortAction from '@/utils/actions/escorts/cancel-escort.action'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'
import { useUserLocation } from '@/utils/providers/user-location-provider'

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
  const userLocation = useUserLocation()
  const routesLibrary = useMapsLibrary('routes')
  const { onProgressEscort, resetOnProgressEscort } = useOnProgressEscort()

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
    // TODO: If start implementing live user location, make sure adding buffer for calling renderDirection
    function renderDirection() {
      if (
        directionsService &&
        directionsRenderer &&
        userLocation &&
        onProgressEscort &&
        !onProgressEscort.isExpired
      )
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
            const duration = response.routes[0].legs[0].duration
            const distance = response.routes[0].legs[0].distance

            if (distance && distance.value > 5000) {
              resetOnProgressEscort()
              cancelEscortAction({ escortId: onProgressEscort.escortId })
              return toast.error('Gagal', {
                description:
                  'Maaf, kami belum dapat menemukan tambal ban dalam radius 5 Km dari lokasi kamu',
              })
            }

            directionsRenderer.setDirections(response)
            setDistance(distance?.text)
            setDuration(duration?.text)
          })
    }

    if (directionsRenderer && onProgressEscort !== null) renderDirection()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsRenderer, onProgressEscort])

  return (
    <DirectionsContext.Provider
      value={{ distance, duration, directionsRenderer }}
    >
      {children}
    </DirectionsContext.Provider>
  )
}
