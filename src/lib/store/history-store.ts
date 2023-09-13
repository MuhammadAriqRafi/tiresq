import { create } from "zustand";

type TripStatus = "completed" | "cancelled" | "onprogress" | "none";

type Store = { filterHistoryStatusBy: TripStatus };
type Actions = { setFilterStatusBy: (status: TripStatus) => void };

export const historyStore = create<Store & Actions>((set) => ({
  filterHistoryStatusBy: "none",
  setFilterStatusBy: (filterHistoryStatusBy: TripStatus) =>
    set(() => ({ filterHistoryStatusBy })),
}));
