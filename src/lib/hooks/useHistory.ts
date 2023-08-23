import { api } from "@/utils/api";
import { useEffect } from "react";
import { historyStore } from "../store/history-store";

export default function useHistory() {
  const setHistories = historyStore((state) => state.setHistories);
  const { data, isLoading, isError } = api.trips.index.useQuery(null);

  useEffect(() => {
    if (data) setHistories(data);
  }, [data, setHistories]);

  return { data, isLoading, isError };
}
