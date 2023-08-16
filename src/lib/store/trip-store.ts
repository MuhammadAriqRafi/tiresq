import { type RouterOutputs } from "@/utils/api";
import { create } from "zustand";

type Destination = RouterOutputs["trips"]["findNearestTambalBan"];

type Store = {
  destination?: Destination;
  isOnTrip: boolean;
};

type Actions = {
  setIsOnTrip: (isOnTrip: boolean) => void;
  setDestination: (destination: Destination) => void;
};

export const tripStore = create<Store & Actions>((set) => ({
  isOnTrip: false,
  destination: undefined,
  setIsOnTrip: (isOnTrip: boolean) => set(() => ({ isOnTrip })),
  setDestination: (destination: Destination) => set(() => ({ destination })),
}));
