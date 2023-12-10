"use client";

import { Fragment } from "react";
import { tripStore } from "@/lib/store/trip-store";
import { Loader2, Search } from "lucide-react";
import { geolocationStore } from "@/lib/store/geolocation-store";
import useFindNearestTireRepairShop from "../_hooks/use-find-nearest-tire-repair-shop";

// Component
import { Button } from "@/components/ui/button";

export default function FindNearestTireRepairShopButton() {
  const [trip] = tripStore(({ trip }) => [trip]);
  const { isGeolocationPermitted, userCurrentCoordinate } = geolocationStore(
    ({ isGeolocationPermitted, userCurrentCoordinate }) => ({
      isGeolocationPermitted,
      userCurrentCoordinate,
    }),
  );
  const { isFindingNearestTireRepairShop, handleFindNearestTireRepairShop } =
    useFindNearestTireRepairShop({ userCurrentCoordinate });

  return (
    <Fragment>
      {isGeolocationPermitted &&
      !isFindingNearestTireRepairShop &&
      trip === null ? (
        <Button
          size="lg"
          onClick={handleFindNearestTireRepairShop}
          className="fixed bottom-24 flex gap-2"
        >
          <Search size={20} />
          Cari Tambal Ban
        </Button>
      ) : null}

      {isFindingNearestTireRepairShop ? (
        <Button className="fixed bottom-24 px-3" variant="default" size="lg">
          <Loader2 size={24} strokeWidth={3} className="animate-spin" />
        </Button>
      ) : null}
    </Fragment>
  );
}
