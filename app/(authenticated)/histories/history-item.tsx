import { ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import RatingBadge from '@/components/ui/rating-badge'
import { Separator } from '@/components/ui/separator'
import { cn, mapHistoryStatusLabel } from '@/lib/utils'

export default function HistoryItem({
  history,
}: {
  history: ArrayElement<Histories>
}) {
  return (
    <div className="px-6 py-3 shadow-md">
      {history.status !== 'ONPROGRESS' && <HistoryItemInfo {...history} />}
      {history.status === 'ONPROGRESS' && (
        <Link href="/">
          <HistoryItemInfo {...history} />
        </Link>
      )}

      {history.status === 'COMPLETED' && (
        <>
          <Separator className="my-4" />
          <HistoryItemAction history={history} />
        </>
      )}
    </div>
  )
}

function HistoryItemInfo({
  name,
  status,
  createdAt,
}: {
  name: string
  status: HistoryStatus
  createdAt: string
}) {
  return (
    <div className="flex items-start justify-start gap-4">
      <div className="min-h-20 min-w-20 rounded-md bg-muted-foreground"></div>

      <div className="flex flex-col gap-1">
        <p className="line-clamp-1 text-base font-bold">{name}</p>
        <span className="text-xs">{createdAt}</span>
      </div>

      <Badge
        className={cn('ml-auto', {
          'bg-destructive hover:bg-destructive/80': status === 'CANCELLED',
          'flex items-center gap-1 bg-yellow-300 text-black hover:bg-yellow-300/80':
            status === 'ONPROGRESS',
        })}
      >
        {mapHistoryStatusLabel(status)}
        {status === 'ONPROGRESS' && (
          <ChevronRight
            size={14}
            strokeWidth={3}
            className="stroke-yellow-700"
          />
        )}
      </Badge>
    </div>
  )
}

function HistoryItemAction({ history }: { history: ArrayElement<Histories> }) {
  if (history.rating !== null && history.review !== null)
    return <HistoryItemRatedAndReviewed history={history} />

  if (history.rating !== null && history.isExpired)
    return <HistoryItemRatedButReviewSessionExpires rating={history.rating} />

  return (
    <Link href={`/experiences/${history.id}`}>
      {history.rating === null && <HistoryItemNotRated />}
      {history.rating !== null && (
        <HistoryItemRatedButNotReviewed rating={history.rating} />
      )}
    </Link>
  )
}

function HistoryItemNotRated() {
  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Berikan rating</p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Star className="fill-muted-foreground" size={16} />
          <Star className="fill-muted-foreground" size={16} />
          <Star className="fill-muted-foreground" size={16} />
          <Star className="fill-muted-foreground" size={16} />
          <Star className="fill-muted-foreground" size={16} />
        </div>
      </div>
    </div>
  )
}

function HistoryItemRatedButNotReviewed({ rating }: { rating: number }) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center">
        <RatingBadge rating={rating} />

        <div className="ml-4 flex flex-col gap-[2px] border-l pl-4">
          <p className="text-xs font-medium text-destructive">
            Belum ada ulasan
          </p>
          <span className="text-xs font-light">
            Bagaimana pelayanan tambal bannya?
          </span>
        </div>

        <ChevronRight size={16} className="ml-auto stroke-muted-foreground" />
      </div>
    </div>
  )
}

function HistoryItemRatedAndReviewed({
  history,
}: {
  history: ArrayElement<Histories>
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="rounded-md border p-4">
          <div className="flex items-center">
            <RatingBadge rating={history.rating!} />

            <div className="ml-4 flex flex-col gap-[2px] border-l pl-4">
              <p className="text-xs font-medium">Ulasanmu</p>
              <span className="line-clamp-1 text-xs font-light">
                {history.review}
              </span>
            </div>

            <ChevronRight
              size={16}
              className="ml-auto stroke-muted-foreground"
            />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex gap-4">
          <div className="size-16 rounded-md bg-muted-foreground"></div>
          <div className="flex flex-col gap-1">
            <DrawerTitle className="text-sm font-semibold">
              {history.name}
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              {history.createdAt} •{' '}
              <span
                className={cn(
                  'ml-1 font-semibold',
                  history.status === 'COMPLETED' && 'text-success'
                )}
              >
                {history.status}
              </span>
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <div className="mx-4 my-2 rounded-md border border-muted px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Ulasanmu</p>
            <RatingBadge rating={history.rating!} />
          </div>
          <Separator className="my-3" />
          <p className="text-xs font-light">{history.review}</p>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// TODO: Add expiration date for experience
function HistoryItemRatedButReviewSessionExpires({
  rating,
}: {
  rating: number
}) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center">
        <RatingBadge rating={rating} />
        <p className="ml-4 border-l pl-4 text-xs font-medium text-muted-foreground">
          Periode kasih ulasan sudah berakhir
        </p>
      </div>
    </div>
  )
}
