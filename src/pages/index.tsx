import Navbar from "@/components/navbar";
import useTrip from "@/lib/hooks/useTrip";
import ActiveTrip from "@/components/home/active-trip";
import useGeolocation from "@/lib/hooks/useGeolocation";
import HomeMap from "@/components/home/map";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { toast } from "react-hot-toast";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  const {
    isGeolocationError,
    isGeolocationPermitted,
    userCurrentCoordinate,
    setUserCurrentCoordinate,
  } = useGeolocation();
  const {
    isOnTrip,
    setIsOnTrip,
    destination,
    destinationError,
    isFetchingDestination,
    isErrorFetchingDestination,
  } = useTrip(userCurrentCoordinate);

  const handleFindNearestTambalBan = () => setIsOnTrip(true);
  const handleCancelFindNearestTambalBan = useCallback(
    () => setIsOnTrip(false),
    [setIsOnTrip]
  );

  if (isErrorFetchingDestination && destinationError?.data?.httpStatus === 500)
    toast.error("Yah, lagi ada gangguan :(, coba lagi nanti yaa", {
      duration: Infinity,
      position: "top-center",
    });

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <HomeMap
        isOnTrip={isOnTrip}
        onGeolocate={setUserCurrentCoordinate}
        userCurrentCoordinate={userCurrentCoordinate}
        isGeolocationPermitted={isGeolocationPermitted}
        isFetchingDestination={isFetchingDestination}
        isGeolocationError={isGeolocationError}
        destination={
          destination
            ? {
                coords: destination.coords,
                latitude: destination.latitude,
                longitude: destination.longitude,
              }
            : undefined
        }
      />

      {isOnTrip && !isFetchingDestination ? (
        <ActiveTrip
          tambalBanName={destination?.name}
          distance={destination?.distance}
          duration={destination?.duration}
          onCancel={handleCancelFindNearestTambalBan}
        />
      ) : null}

      {!isOnTrip && isGeolocationPermitted ? (
        <Button
          className="fixed bottom-24 flex gap-2"
          onClick={handleFindNearestTambalBan}
          size="lg"
        >
          {isFetchingDestination ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
          Cari Tambal Ban
        </Button>
      ) : null}

      {isOnTrip && isFetchingDestination ? (
        <Button className="fixed bottom-24" variant="outline" size="icon">
          <Loader2 className="animate-spin" size={20} />
        </Button>
      ) : null}

      <section onClick={() => toast.dismiss()}>
        <Navbar />
      </section>
    </main>
  );
}
