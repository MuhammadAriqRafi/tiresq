"use client";

import useTrip from "@/lib/hooks/useTrip";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { Loader2, Search } from "lucide-react";
import { tripStore } from "@/lib/store/trip-store";
import { Button } from "@/components/ui/button";

export default function FindButton() {
  const { isGeolocationPermitted } = useGeolocation();
  const { isCancellingTrip, isCompletingTrip } = useTrip();
  const { isOnTrip, isFetchingTrip, setFindNearestTambalBanRoute } = tripStore(
    ({ isOnTrip, isFetchingTrip, setFindNearestTambalBanRoute }) => ({
      isOnTrip,
      isFetchingTrip,
      setFindNearestTambalBanRoute,
    }),
  );

  const handleFindNearestTambalBan = () => setFindNearestTambalBanRoute(true);

  return (
    <>
      {!isOnTrip &&
      !isCancellingTrip &&
      !isCompletingTrip &&
      isGeolocationPermitted ? (
        <Button
          className="fixed bottom-24 flex gap-2"
          onClick={handleFindNearestTambalBan}
          size="lg"
        >
          {isFetchingTrip ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
          Cari Tambal Ban
        </Button>
      ) : null}

      {(isOnTrip && isFetchingTrip) || isCompletingTrip || isCancellingTrip ? (
        <Button
          className="fixed bottom-24 bg-white"
          variant="outline"
          size="icon"
        >
          <Loader2 className="animate-spin" size={20} />
        </Button>
      ) : null}
    </>
  );
}
