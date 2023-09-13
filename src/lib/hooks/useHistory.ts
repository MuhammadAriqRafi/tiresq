import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { type RouterInputs, api } from "@/utils/api";

type UseHistoryProps = RouterInputs["trips"]["index"];

export default function useHistory(props: UseHistoryProps = null) {
  const {
    error,
    isError,
    isLoading,
    data: histories,
  } = api.trips.index.useQuery(props);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [isError, error]);

  return {
    isError,
    isLoading,
    histories,
  };
}
