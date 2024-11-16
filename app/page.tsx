import getOnProgressTrip from '@/app/_actions/get-on-progress-trip.action'
import Maps from '@/app/_maps'
import FindNearestTireRepairShopButton from '@/app/find-nearest-tire-repair-shop-button'
import OnProgressTripConfirmationBanner from '@/app/on-progress-trip-confirmation-banner'
import UserLocationProvider from '@/providers/user-location-provider'
import UserOnProgressTripProvider from '@/providers/user-on-progress-trip-provider'

export default async function Home() {
  const [onProgressTrip] = await getOnProgressTrip()

  return (
    <main className="h-dvh">
      <UserOnProgressTripProvider trip={onProgressTrip}>
        <OnProgressTripConfirmationBanner />

        <UserLocationProvider>
          <Maps />
          <FindNearestTireRepairShopButton />
        </UserLocationProvider>
      </UserOnProgressTripProvider>
    </main>
  )
}
