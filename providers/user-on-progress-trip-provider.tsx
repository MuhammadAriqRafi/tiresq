'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

export const UserOnProgressTripContext = createContext<{
  onProgressTrip: OnProgressTrip | null
  setOnProgressTrip: Dispatch<SetStateAction<OnProgressTrip | null>>
}>({ onProgressTrip: null, setOnProgressTrip: () => null })

export default function UserOnProgressTripProvider({
  trip,
  children,
}: {
  trip: OnProgressTrip | null
  children: ReactNode
}) {
  const [onProgressTrip, setOnProgressTrip] = useState<OnProgressTrip | null>(
    trip
  )

  return (
    <UserOnProgressTripContext.Provider
      value={{ onProgressTrip, setOnProgressTrip }}
    >
      {children}
    </UserOnProgressTripContext.Provider>
  )
}
