"use client";

import { Fragment } from "react";
import { Loader2, Search } from "lucide-react";
import useFindNearestTireRepairShop from "../_hooks/useFindNearestTireRepairShop";

import { Button } from "@/components/ui/button";

export default function FindNearestTireRepairShopButton() {
  const {
    destination,
    isGeolocationPermitted,
    isFetchingOnProgressTripDetails,
    isFindingNearestTireRepairShop,
    handleFindNearestTireRepairShop,
  } = useFindNearestTireRepairShop();

  return (
    <Fragment>
      {isGeolocationPermitted &&
      !isFetchingOnProgressTripDetails &&
      !isFindingNearestTireRepairShop &&
      !destination ? (
        <Button
          size="lg"
          onClick={handleFindNearestTireRepairShop}
          className="fixed bottom-24 flex gap-2"
        >
          <Search size={20} />
          Cari Tambal Ban
        </Button>
      ) : null}

      {isFetchingOnProgressTripDetails || isFindingNearestTireRepairShop ? (
        <Button className="fixed bottom-24 px-3" variant="default" size="lg">
          <Loader2 size={24} strokeWidth={3} className="animate-spin" />
        </Button>
      ) : null}
    </Fragment>
  );
}
