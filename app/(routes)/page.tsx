import getOnProgressTrip from '@/routes/_actions/get-on-progress-trip.action'
import FindNearestTireRepairShopButton from '@/routes/find-nearest-tire-repair-shop-button'
import Maps from '@/routes/maps'
import OnProgressTripConfirmationBanner from '@/routes/on-progress-trip-confirmation-banner'
import UserLocationProvider from '@/routes/user-location-provider'
import UserOnProgressTripProvider from '@/routes/user-on-progress-trip-provider'

export default async function Home() {
  const onProgressTrip = null
  // const onProgressTrip = await getOnProgressTrip()

  return (
    <main className="h-dvh">
      {/* <OnProgressTripConfirmationBanner /> */}

      <UserOnProgressTripProvider trip={onProgressTrip}>
        <UserLocationProvider>
          {/* <Maps /> */}
          <FindNearestTireRepairShopButton />
        </UserLocationProvider>
      </UserOnProgressTripProvider>
    </main>
  )
}
