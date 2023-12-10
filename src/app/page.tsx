import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import {
  type OnProgressTripOutputType,
  getOnProgressTrip,
} from "./_actions/get-on-progress-trip";
import "mapbox-gl/dist/mapbox-gl.css";

// Components
import Maps from "./_components/maps";
import HomePageWrapper from "./_components/home-page-wrapper";
import OnProgressTripDetails from "./_components/on-progress-trip-details";
import FindNearestTireRepairShopButton from "./_components/find-nearest-tire-repair-shop-button";

export default async function HomePage() {
  noStore();
  const user = await currentUser();
  let onProgressTrip: OnProgressTripOutputType["data"] = null;

  if (user !== null) {
    const { data } = await getOnProgressTrip({ userId: user.id });
    onProgressTrip = data;
  }

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <HomePageWrapper onProgressTrip={onProgressTrip}>
        <Maps />
        <OnProgressTripDetails />
        <FindNearestTireRepairShopButton />
      </HomePageWrapper>
    </main>
  );
}
