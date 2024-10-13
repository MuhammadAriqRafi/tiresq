import OnProgressTripBanner from '@/routes/on-progress-trip-banner'
import OnProgressTripConfirmationBanner from '@/routes/on-progress-trip-confirmation-banner'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="h-dvh">
      {/* <OnProgressTripBanner /> */}
      {/* <OnProgressTripConfirmationBanner /> */}

      <Button className="fixed bottom-24 left-1/2 w-[calc(100%-48px)] max-w-md -translate-x-1/2">
        Cari Tambal Ban
      </Button>
    </main>
  )
}
