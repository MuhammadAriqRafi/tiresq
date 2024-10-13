type RootLayoutProps = Readonly<{
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