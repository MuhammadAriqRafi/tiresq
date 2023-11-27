import { create } from "zustand";
import { type OnProgressTripType } from "@/server/api/services/trip-service";

type Store = { trip: OnProgressTripType["data"] };
type Actions = { setTrip: (trip: OnProgressTripType["data"]) => void };

export const tripStore = create<Store & Actions>((set) => ({
  trip: null,
  setTrip: (trip) => set(() => ({ trip })),
}));
