import { serverClient } from "./_trpc/server";
import "mapbox-gl/dist/mapbox-gl.css";

// Components
import HomeMap from "./_components/home-map";
import ActiveTrip from "./_components/active-trip";
import FindButton from "./_components/find-button";

export default async function Home() {
  const isOnTrip = await serverClient.trips.isOnTrip();

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <HomeMap isOnTrip={isOnTrip} />
      <ActiveTrip />
      <FindButton />
    </main>
  );
}
