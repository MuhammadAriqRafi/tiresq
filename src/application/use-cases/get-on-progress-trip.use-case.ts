import { OnProgressTrip } from '@/routes/_actions/get-on-progress-trip.action'

export default function getOnProgressTripUseCase() {
  return {
    tripId: 1,
    status: 'ONPROGRESS',
    createdAt: '22 Okt. 20:10',
    expiredAt: new Date(),
    destination: {
      name: 'Tambal Ban Ujang',
      rating: 5,
      coordinate: { lat: -5.36122722040926, lng: 105.31364286741777 },
    },
  } satisfies OnProgressTrip
}
