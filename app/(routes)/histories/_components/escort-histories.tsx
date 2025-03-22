'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import EscortHistoryItem from '@/app/(routes)/histories/_components/escort-history-item'
import getEscorts from '@/utils/actions/histories/get-escorts.action'

export default function EscortHistories({
  initialEscortHistories,
  filterByStatus,
}: {
  initialEscortHistories: EscortHistories
  filterByStatus?: string
}) {
  const [cursorBasedOnEscortCreationDate, setCursorBasedOnEscortCreationDate] =
    useState<number | undefined>(undefined)
  const [isOnTheLastPage, setIsOnTheLastPage] = useState(false)
  const [escortHistories, setEscortHistories] = useState<EscortHistories>(
    initialEscortHistories
  )
  const { ref: cursorTriggerRef, inView } = useInView()

  useEffect(() => {
    if (initialEscortHistories.length > 0) {
      setEscortHistories(initialEscortHistories)
      setCursorBasedOnEscortCreationDate(
        initialEscortHistories.at(-1)!.createdAtRaw
      )
      setIsOnTheLastPage(false)
    }
  }, [initialEscortHistories, filterByStatus])

  useEffect(() => {
    async function fetchMoreHistories() {
      const [escorts] = await getEscorts({
        createdAt: cursorBasedOnEscortCreationDate,
        status: filterByStatus,
      })

      if (escorts === null) setIsOnTheLastPage(true)
      if (escorts !== null) {
        setEscortHistories((prevHistories) => [...prevHistories, ...escorts])
        setCursorBasedOnEscortCreationDate(escorts.at(-1)!.createdAtRaw)
      }
    }

    if (inView && !isOnTheLastPage) fetchMoreHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isOnTheLastPage])

  return (
    <div className="space-y-3">
      {escortHistories.map((escortHistory) => (
        <EscortHistoryItem
          key={escortHistory.id}
          escortHistory={escortHistory}
        />
      ))}

      <div ref={cursorTriggerRef} className="flex items-center justify-center">
        {inView && !isOnTheLastPage && (
          <Loader2 className="mb-3 size-5 animate-spin stroke-muted-foreground" />
        )}
      </div>
    </div>
  )
}
