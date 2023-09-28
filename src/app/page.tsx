import "mapbox-gl/dist/mapbox-gl.css";

// Components
import HomeMap from "./_components/home-map";
import ActiveTrip from "./_components/active-trip";
import FindButton from "./_components/find-button";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <HomeMap />
      <ActiveTrip />
      <FindButton />
    </main>
  );
}
