import FiltereByStatusSelect from '@/routes/histories/filter-by-status-select'
import HistoryItem from '@/routes/histories/history-item'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

export default function HistoriesPage({
  searchParams,
}: {
  searchParams: { status: string }
}) {
  let histories: Histories = [
    {
      id: 1,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'ONPROGRESS',
      rating: null,
      review: null,
      expired: false,
    },
    {
      id: 2,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'COMPLETED',
      rating: 5,
      review: 'Mantep',
      expired: false,
    },
    {
      id: 3,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'COMPLETED',
      rating: 5,
      review: null,
      expired: false,
    },
    {
      id: 4,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'COMPLETED',
      rating: 5,
      review: null,
      expired: true,
    },
    {
      id: 5,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'COMPLETED',
      rating: null,
      review: null,
      expired: false,
    },
    {
      id: 6,
      name: 'Tambal Ban John',
      createdAt: '8 Apr. 20:10',
      status: 'CANCELLED',
      rating: null,
      review: null,
      expired: false,
    },
  ]

  histories = histories.filter((history) => {
    if (searchParams.status === 'all') return true
    if (!['COMPLETED', 'CANCELLED', 'ONPROGRESS'].includes(searchParams.status))
      return true

    return history.status === searchParams.status
  })

  return (
    <main className="h-dvh py-6">
      <div className="mb-6 space-y-4 px-6">
        <h1 className="text-2xl font-bold">Riwayat</h1>
        <FiltereByStatusSelect />
      </div>

      <ScrollArea className="h-[calc(100%-160px)] w-full">
        <div className="space-y-3">
          {histories.map((history) => (
            <HistoryItem key={history.id} history={history} />
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}
