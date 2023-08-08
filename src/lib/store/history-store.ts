import { type RouterOutputs } from "@/utils/api";
import { create } from "zustand";

type Histories = RouterOutputs["trips"]["getTrip"];

type Store = {
  histories: Histories | [];
};

type Actions = {
  setHistories: (histories: Histories) => void;
};

export const historyStore = create<Store & Actions>((set) => ({
  histories: [],
  setHistories: (histories: Histories) => set(() => ({ histories })),
}));
