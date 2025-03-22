import { Search, SearchX } from 'lucide-react'
import Link from 'next/link'
import EscortHistories from '@/app/(routes)/histories/_components/escort-histories'
import FilterByStatusSelect from '@/app/(routes)/histories/_components/filter-by-status-select'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import getEscorts from '@/utils/actions/histories/get-escorts.action'
import { GetEscortHistoriesSearchParamsDto } from '@/utils/dtos/histories/get-escort-histories-search-params.dto'

export default async function EscortHistoriesPage({
  searchParams,
}: {
  searchParams: GetEscortHistoriesSearchParamsDto
}) {
  const [escorts] = await getEscorts(searchParams)

  return (
    <main className="h-dvh py-6">
      <div className="space-y-3 px-6 pb-6 shadow-sm">
        <h1 className="text-2xl font-bold">Riwayat</h1>
        <FilterByStatusSelect />
      </div>

      <ScrollArea className="h-[calc(100%-160px)] w-full">
        {escorts !== null && (
          <EscortHistories
            initialEscortHistories={escorts}
            filterByStatus={searchParams.status}
          />
        )}

        {escorts === null && <EmptyEscortHistories />}
      </ScrollArea>
    </main>
  )
}

function EmptyEscortHistories() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-8">
      <SearchX strokeWidth={1} className="size-16 stroke-muted-foreground" />
      <h2 className="text-center text-sm font-normal text-muted-foreground">
        Kamu belum punya riwayat cari tambal ban
      </h2>
      <Button
        size="sm"
        variant="outline"
        className="border-primary text-primary"
        asChild
      >
        <Link href="/">
          <Search /> Cari Tambal Ban
        </Link>
      </Button>
    </div>
  )
}
