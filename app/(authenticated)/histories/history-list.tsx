'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import getTrips from './_actions/get-trips.action'
import HistoryItem from './history-item'

export default function HistoryList({
  initialHistories,
  filterByStatus,
}: {
  initialHistories: Histories
  filterByStatus?: string
}) {
  const { inView, ref } = useInView()
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [histories, setHistories] = useState<Histories>(initialHistories)
  const [isOnTheLastPage, setIsOnTheLastPage] = useState(false)

  useEffect(() => {
    if (initialHistories.length > 0) {
      setHistories(initialHistories)
      setCursor(initialHistories.at(-1)!.createdAtRaw)
      setIsOnTheLastPage(false)
    }
  }, [initialHistories, filterByStatus])

  useEffect(() => {
    async function fetchMoreHistories() {
      const [trips] = await getTrips({
        createdAt: cursor,
        status: filterByStatus,
      })

      if (trips === null) setIsOnTheLastPage(true)
      if (trips !== null) {
        setHistories((prevHistories) => [...prevHistories, ...trips])
        setCursor(trips.at(-1)!.createdAtRaw)
      }
    }

    if (inView && !isOnTheLastPage) fetchMoreHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isOnTheLastPage])

  return (
    <div className="space-y-3">
      {histories.map((history) => (
        <HistoryItem key={history.id} history={history} />
      ))}

      <div ref={ref} className="flex items-center justify-center">
        {inView && !isOnTheLastPage && (
          <Loader2 className="mb-3 size-5 animate-spin stroke-muted-foreground" />
        )}
      </div>
    </div>
  )
}
