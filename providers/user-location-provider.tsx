'use client'

import { Loader2, LocateOff } from 'lucide-react'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

type Coordinate = google.maps.LatLngLiteral

export const UserLocationContext = createContext<{
  coordinate: Coordinate
} | null>(null)

export default function UserLocationProvider({
  children,
}: {
  children: ReactNode
}) {
  const { toast } = useToast()
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
          toast({
            title: 'Yah, kami ga dapet izin lokasi kamu :(',
            variant: 'destructive',
            description: 'Coba izinin akses lokasi kamu di pengaturan',
          })

        if (error.code === error.TIMEOUT)
          toast({
            title:
              'Maaf, sepertinya terjadi kesalahan ketika mengakses lokasi kamu',
            variant: 'destructive',
            description:
              'Kami menunggu terlalu lama untuk mendapatkan lokasi kamu, coba lagi nanti',
          })

        console.error('Error getting user location: ', error)
      }

      if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(handleOnSuccess, handleOnError)
      else {
        toast({
          title: 'Warning',
          variant: 'destructive',
          description: 'Yah, geolokasi tidak disupport oleh browser ini',
        })
      }
    }

    getUserCurrentLocation()
  }, [toast])

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
