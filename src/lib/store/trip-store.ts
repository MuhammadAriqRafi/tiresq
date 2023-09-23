import { create } from "zustand";
import { type RouterOutputs } from "@/app/_trpc/client";

type Destination = RouterOutputs["trips"]["findNearestTambalBanRoute"];

type Store = {
  isOnTrip: boolean;
  isFetchingTrip: boolean;
  isErrorFetchingTrip: boolean;
  findNearestTambalBanRoute: boolean;
  destination?: Destination;
};

type Actions = {
  setIsOnTrip: (isOnTrip: boolean) => void;
  setDestination: (destination: Destination | undefined) => void;
  setIsFetchingTrip: (isFetchingTrip: boolean) => void;
  setIsErrorFetchingTrip: (isErrorFetchingTrip: boolean) => void;
  setFindNearestTambalBanRoute: (findNearestTambalBanRoute: boolean) => void;
};

export const tripStore = create<Store & Actions>((set) => ({
  isOnTrip: false,
  isFetchingTrip: false,
  isErrorFetchingTrip: false,
  findNearestTambalBanRoute: false,
  destination: undefined,
  setIsOnTrip: (isOnTrip) => set(() => ({ isOnTrip })),
  setIsFetchingTrip: (isFetchingTrip) => set(() => ({ isFetchingTrip })),
  setIsErrorFetchingTrip: (isErrorFetchingTrip) =>
    set(() => ({ isErrorFetchingTrip })),
  setFindNearestTambalBanRoute: (findNearestTambalBanRoute) =>
    set(() => ({ findNearestTambalBanRoute })),
  setDestination: (destination) => set(() => ({ destination })),
}));
