import Maps from '@/app/_components/_maps'
import FindNearestTireRepairShopButton from '@/app/_components/find-nearest-tire-repair-shop-button'
import OnProgressEscortConfirmationBanner from '@/app/_components/on-progress-escort-confirmation-banner'
import getOnProgressEscort from '@/utils/actions/escorts/get-on-progress-escort.action'
import OnProgressEscortProvider from '@/utils/providers/on-progress-escort-provider'
import UserLocationProvider from '@/utils/providers/user-location-provider'

export default async function UserHomePage() {
  const [onProgressEscort] = await getOnProgressEscort()

  return (
    <OnProgressEscortProvider escort={onProgressEscort}>
      <OnProgressEscortConfirmationBanner />
      <UserLocationProvider>
        <Maps />
        <FindNearestTireRepairShopButton />
      </UserLocationProvider>
    </OnProgressEscortProvider>
  )
}
