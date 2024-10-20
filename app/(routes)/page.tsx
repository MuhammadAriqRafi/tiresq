import getOnProgressTrip from '@/routes/_actions/get-on-progress-trip.action'
import FindNearestTireRepairShopButton from '@/routes/find-nearest-tire-repair-shop-button'
import Maps from '@/routes/maps'
import OnProgressTripConfirmationBanner from '@/routes/on-progress-trip-confirmation-banner'
import UserLocationProvider from '@/routes/user-location-provider'
import UserOnProgressTripProvider from '@/routes/user-on-progress-trip-provider'

// TODO: Add isExpired attribute in trip table

export default async function Home() {
  // TODO: (1) Get on progress trip
  const onProgressTrip = await getOnProgressTrip()

  return (
    <main className="h-dvh">
      {/* <OnProgressTripConfirmationBanner /> */}

      {/* TODO: (2) Pass on progress trip to <UserOnProgressTripProvider /> component */}
      <UserOnProgressTripProvider trip={onProgressTrip}>
        <UserLocationProvider>
          <Maps />
          <FindNearestTireRepairShopButton />
        </UserLocationProvider>
      </UserOnProgressTripProvider>
    </main>
  )
}
