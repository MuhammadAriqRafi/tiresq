import { create } from "zustand";
import { type RouterOutputs } from "@/utils/api";

type Histories = RouterOutputs["trips"]["index"];
type TripStatus = "completed" | "cancelled" | "onprogress" | "none";

type Store = {
  histories: Histories | [];
  filterStatusBy: TripStatus;
};

type Actions = {
  setHistories: (histories: Histories) => void;
  setFilterStatusBy: (status: TripStatus) => void;
};

export const historyStore = create<Store & Actions>((set) => ({
  histories: [],
  filterStatusBy: "none",
  setHistories: (histories: Histories) => set(() => ({ histories })),
  setFilterStatusBy: (filterStatusBy: TripStatus) =>
    set(() => ({ filterStatusBy })),
}));
