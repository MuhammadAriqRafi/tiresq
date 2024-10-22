'use server'

import getOnProgressTripUseCase from '@/src/application/use-cases/get-on-progress-trip.use-case'

export type OnProgressTrip = {
  tripId: number
  status: 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
  createdAt: string
  expiredAt: Date
  destination: {
    name: string
    rating: number
    coordinate: { lat: number; lng: number }
  }
}

export default async function getOnProgressTrip() {
  // TODO: Change all dates to use epoch time
  return getOnProgressTripUseCase()
}
