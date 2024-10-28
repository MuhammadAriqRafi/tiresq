type LayoutProps = Readonly<{
  children: React.ReactNode
}>

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type HistoryStatus = 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
type Histories = Readonly<
  {
    id: number
    name: string
    createdAt: string
    status: HistoryStatus
    rating: number | null
    review: string | null
    expired: boolean
  }[]
>

type OnProgressTrip = {
  tripId: string
  status: 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
  createdAt: string
  expiredAt: number
  isExpired: boolean
  destination: {
    name: string
    rating: number
    coordinate: { lat: number; lng: number }
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
