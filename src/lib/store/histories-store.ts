import { create } from "zustand";

type TripStatus = "completed" | "cancelled" | "onprogress" | "none";

type Store = { filterHistoriesByStatus: TripStatus };
type Actions = { setFilterHistoriesByStatus: (status: TripStatus) => void };

export const historyStore = create<Store & Actions>((set) => ({
  filterHistoriesByStatus: "none",
  setFilterHistoriesByStatus: (filterHistoriesByStatus: TripStatus) =>
    set(() => ({ filterHistoriesByStatus })),
}));
