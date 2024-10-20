import 'server-only'

export type OnProgressTrip = {
  tripId: number
  destination: {
    name: string
    rating: number
    coordinate: { lat: number; lng: number }
  }
}

export default async function getOnProgressTrip() {
  return {
    tripId: 1,
    destination: {
      name: 'Tambal Ban Ujang',
      rating: 5,
      coordinate: { lat: -5.36122722040926, lng: 105.31364286741777 },
    },
  }
}
