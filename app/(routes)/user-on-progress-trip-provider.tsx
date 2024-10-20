'use client'

import { ReactNode, createContext } from 'react'
import { OnProgressTrip } from '@/routes/_actions/get-on-progress-trip.action'

export const UserOnProgressTripContext = createContext<OnProgressTrip | null>(
  null
)

export default function UserOnProgressTripProvider({
  trip,
  children,
}: {
  trip: OnProgressTrip
  children: ReactNode
}) {
  // TODO: Add state for the destination data, and return both the setter and getter

  return (
    <UserOnProgressTripContext.Provider value={trip}>
      {children}
    </UserOnProgressTripContext.Provider>
  )
}
