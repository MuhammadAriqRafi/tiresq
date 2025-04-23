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

type TireRepairShop = {
  id: string
  name: string
  rating: number
  isOpen: boolean
}

type NearestTireRepairShop = {
  id: string
  lat: number
  lng: number
  name: string
  rating: number
  distance: string
  duration: string
}

type ServiceExperience = {
  id: string
  rating: number | null
  review: string | null
  isAnonymous: boolean
  escort: {
    destination: string
    createdAt: string
  }
}

type StarIndexInString = '1' | '2' | '3' | '4' | '5'
type StarIndexInNumber = 1 | 2 | 3 | 4 | 5
