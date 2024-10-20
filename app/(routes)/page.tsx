import FindNearestTireRepairShopButton from '@/routes/find-nearest-tire-repair-shop-button'
import Maps from '@/routes/maps'
import OnProgressTripConfirmationBanner from '@/routes/on-progress-trip-confirmation-banner'
import UserDestinationProvider from '@/routes/user-destination-provider'
import UserLocationProvider from '@/routes/user-location-provider'

// TODO: Add isExpired attribute in trip table

export default function Home() {
  // TODO: (1) Get on progress trip
  const initialDestination = {
    coordinate: { lat: -5.36122722040926, lng: 105.31364286741777 },
  }

  return (
    <main className="h-dvh">
      {/* <OnProgressTripConfirmationBanner /> */}

      {/* TODO: (2) Pass on progress trip to <UserDestinationProvider /> component */}
      <UserDestinationProvider initialDestination={initialDestination}>
        <UserLocationProvider>
          <Maps />
          <FindNearestTireRepairShopButton />
        </UserLocationProvider>
      </UserDestinationProvider>
    </main>
  )
}
