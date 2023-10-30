import { create } from "zustand";

type Store = { destination?: TripDetails | null };
type Actions = {
  setDestination: (destination?: TripDetails | null) => void;
};

export const tripStore = create<Store & Actions>((set) => ({
  destination: null,
  setDestination: (destination) => set(() => ({ destination })),
}));
