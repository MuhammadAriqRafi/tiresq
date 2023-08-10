import { type RouterOutputs } from "@/utils/api";
import { create } from "zustand";

type Trip = RouterOutputs["trips"]["startTrip"];

type Store = {
  trip?: Trip;
  onTrip: boolean;
};

type Actions = {
  setTrip: (trip: Trip) => void;
  setOnTrip: (onTrip: boolean) => void;
};

export const tripStore = create<Store & Actions>((set) => ({
  onTrip: false,
  trip: undefined,
  setTrip: (trip: Trip) => set(() => ({ trip })),
  setOnTrip: (onTrip: boolean) => set(() => ({ onTrip })),
}));
