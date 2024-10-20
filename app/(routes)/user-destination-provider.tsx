'use client'

import { ReactNode, createContext } from 'react'

type Coordinate = google.maps.LatLngLiteral

export const UserDestinationContext = createContext<{
  coordinate: Coordinate
} | null>(null)

export default function UserDestinationProvider({
  initialDestination,
  children,
}: {
  initialDestination: { coordinate: Coordinate }
  children: ReactNode
}) {
  // TODO: Add state for the destination data, and return both the setter and getter

  return (
    <UserDestinationContext.Provider value={initialDestination}>
      {children}
    </UserDestinationContext.Provider>
  )
}
