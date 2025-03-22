type LayoutProps = Readonly<{
  children: React.ReactNode
}>

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type EscortHistoryStatus = 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
type EscortHistories = {
  id: string
  name: string
  createdAt: string
  createdAtRaw: number
  status: HistoryStatus
  rating: number | null
  review: string | null
  isExpired: boolean
}[]

type OnProgressEscort = {
  escortId: string
  status: 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
  createdAt: string
  isExpired: boolean
  destination: {
    name: string
    rating: number
    coordinate: { latitude: number; longitude: number }
  }
}

type TripExperience = {
  id: string
  isAnonymous: boolean
  tripDestinationName: string
  tripCreatedAt: string
  rating: number | null
  review: string | null
}
