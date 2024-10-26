import getOnProgressTrip from '@/routes/_actions/get-on-progress-trip.action'
import Maps from '@/routes/_maps'
import FindNearestTireRepairShopButton from '@/routes/find-nearest-tire-repair-shop-button'
import OnProgressTripConfirmationBanner from '@/routes/on-progress-trip-confirmation-banner'
import UserLocationProvider from '@/routes/user-location-provider'
import UserOnProgressTripProvider from '@/routes/user-on-progress-trip-provider'

export default async function Home() {
  const onProgressTrip = await getOnProgressTrip()

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
