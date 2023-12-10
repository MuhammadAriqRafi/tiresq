import { create } from "zustand";
import { type OnProgressTripOutputType } from "@/app/_actions/get-on-progress-trip";

type Store = { trip: OnProgressTripOutputType["data"] };
type Actions = { setTrip: (trip: OnProgressTripOutputType["data"]) => void };

export const tripStore = create<Store & Actions>((set) => ({
  trip: null,
  setTrip: (trip) => set(() => ({ trip })),
}));
