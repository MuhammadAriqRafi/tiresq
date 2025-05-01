import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type Coordinate = google.maps.LatLngLiteral

export default function RealTimeAdvanceMarker() {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null)
  const watchId = useRef(0)

  useEffect(() => {
    function getUserRealtimeLocation() {
      function handleOnSuccess(position: GeolocationPosition) {
        const { latitude, longitude } = position.coords
        setCoordinate({ lat: latitude, lng: longitude })
      }

      function handleOnError(error: GeolocationPositionError) {
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

      if ('geolocation' in navigator) {
        const options = {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true,
        }

        watchId.current = navigator.geolocation.watchPosition(
          handleOnSuccess,
          handleOnError,
          options
        )
      } else {
        toast.error('Warning', {
          description: 'Yah, geolokasi tidak disupport oleh browser ini',
        })
      }
    }

    getUserRealtimeLocation()
    return () => navigator.geolocation.clearWatch(watchId.current)
  }, [])

  return <AdvancedMarker position={coordinate} />
}
