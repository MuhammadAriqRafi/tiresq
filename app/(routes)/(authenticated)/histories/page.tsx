import FiltereByStatusSelect from '@/routes/(authenticated)/histories/filter-by-status-select'
import HistoryItem from '@/routes/(authenticated)/histories/history-item'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { histories } from '@/lib/data'

export default function HistoriesPage({
  searchParams,
}: {
  searchParams: { status: string }
}) {
  const filteredHistories = histories.filter((history) => {
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
          {filteredHistories.map((history) => (
            <HistoryItem key={history.id} history={history} />
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}