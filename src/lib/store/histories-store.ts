import { create } from "zustand";

type TripStatus = "completed" | "cancelled" | "onprogress" | undefined;

type Store = { filterHistoriesByStatus: TripStatus };
type Actions = { setFilterHistoriesByStatus: (status: TripStatus) => void };

export const historiesStore = create<Store & Actions>((set) => ({
  filterHistoriesByStatus: undefined,
  setFilterHistoriesByStatus: (filterHistoriesByStatus: TripStatus) =>
    set(() => ({ filterHistoriesByStatus })),
}));
