import { SearchX } from 'lucide-react'
import { redirect } from 'next/navigation'
import getTrips from '@/app/(authenticated)/histories/_actions/get-trips.action'
import getUser from '@/app/(authenticated)/histories/_actions/get-user.action'
import FilterByStatusSelect from '@/app/(authenticated)/histories/filter-by-status-select'
import HistoryItem from '@/app/(authenticated)/histories/history-item'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function HistoriesPage({
  searchParams,
}: {
  searchParams: { status: string }
}) {
  const [user] = await getUser()
  if (user === null) return redirect('/login')
  if (user.is_anonymous) return redirect('/register')

  const [trips] = await getTrips({ status: searchParams.status })

  return (
    <main className="h-dvh py-6">
      <div className="mb-6 space-y-4 px-6">
        <h1 className="text-2xl font-bold">Riwayat</h1>
        <FilterByStatusSelect />
      </div>

      <ScrollArea className="h-[calc(100%-160px)] w-full">
        {trips === null && (
          <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
            <SearchX
              strokeWidth={1}
              className="size-16 stroke-muted-foreground"
            />
            <h2 className="text-center text-sm font-normal text-muted-foreground">
              Kamu belum punya riwayat cari tambal ban
            </h2>
          </div>
        )}

        {trips !== null && (
          <div className="space-y-3">
            {trips.map((history) => (
              <HistoryItem key={history.id} history={history} />
            ))}
          </div>
        )}
      </ScrollArea>
    </main>
  )
}
