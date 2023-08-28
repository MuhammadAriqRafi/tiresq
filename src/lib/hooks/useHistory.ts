import { useEffect } from "react";
import { historyStore } from "../store/history-store";
import { type RouterInputs, api } from "@/utils/api";

type UseHistoryProps = RouterInputs["trips"]["index"];

export default function useHistory(props: UseHistoryProps = null) {
  const setHistories = historyStore((state) => state.setHistories);
  const {
    error,
    isError,
    isLoading,
    data: histories,
  } = api.trips.index.useQuery(props, {
    enabled: props !== null ? !isNaN(props?.historyId) : true,
  });

  useEffect(() => {
    if (histories) setHistories(histories);
  }, [histories, setHistories]);

  useEffect(() => {
    if (error) console.log(error.data);
  }, [isError, error]);

  return {
    isError,
    isLoading,
    histories,
  };
}
