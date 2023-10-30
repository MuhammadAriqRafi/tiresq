import "mapbox-gl/dist/mapbox-gl.css";

// Components
import HomeMap from "./_components/home-map";
import ActiveTripInformation from "./_components/active-trip-information";
import FindNearestTireRepairShopButton from "./_components/find-nearest-tire-repair-shop-button";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <HomeMap />
      <ActiveTripInformation />
      <FindNearestTireRepairShopButton />
    </main>
  );
}
