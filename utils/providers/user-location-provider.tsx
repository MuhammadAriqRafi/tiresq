'use client'

import { Loader2, LocateOff } from 'lucide-react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

type Coordinate = google.maps.LatLngLiteral

export const useUserLocation = () => useContext(UserLocationContext)
export const UserLocationContext = createContext<{
  coordinate: Coordinate
} | null>(null)

export default function UserLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null)

  useEffect(() => {
    function getUserCurrentLocation() {
      function handleOnSuccess(position: GeolocationPosition) {
        const { latitude, longitude } = position.coords
        setCoordinate({ lat: latitude, lng: longitude })
        setIsLoading(false)
      }

      function handleOnError(error: GeolocationPositionError) {
        setIsLoading(false)

        if (error.code === error.PERMISSION_DENIED)
          toast.error('Yah, kami ga dapet izin lokasi kamu :(', {
            description: 'Coba izinin akses lokasi kamu di pengaturan',
          })

        if (error.code === error.TIMEOUT)
          toast.error(
            'Maaf, sepertinya terjadi kesalahan ketika mengakses lokasi kamu',
            {
              description:
                'Kami menunggu terlalu lama untuk mendapatkan lokasi kamu, coba lagi nanti',
            }
          )

        console.error('Error getting user location: ', error)
      }

      if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(handleOnSuccess, handleOnError)
      else {
        toast.error('Warning', {
          description: 'Yah, geolokasi tidak disupport oleh browser ini',
        })
      }
    }

    getUserCurrentLocation()
  }, [])

  if (coordinate === null)
    return (
      <section className="flex h-dvh flex-col items-center justify-center gap-6 p-6">
        {isLoading && (
          <Loader2
            strokeWidth={1}
            className="size-16 animate-spin stroke-muted-foreground"
          />
        )}
        {!isLoading && (
          <>
            <LocateOff
              strokeWidth={1}
              className="size-16 stroke-muted-foreground"
            />
            <p className="stroke-muted-foreground text-sm font-medium">
              Yah, kami gabisa dapet akses lokasi kamu :(
            </p>
          </>
        )}
      </section>
    )

  return (
    <UserLocationContext.Provider value={{ coordinate }}>
      {children}
    </UserLocationContext.Provider>
  )
}
