import { api } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { tripStore } from "../store/trip-store";

export default function useTrip() {
  const apiUtils = api.useContext();
  const { setIsOnTrip, setDestination } = tripStore(
    ({ setIsOnTrip, setDestination }) => ({
      setIsOnTrip,
      setDestination,
    }),
  );

  const { mutate: cancelTrip, isLoading: isCancellingTrip } =
    api.trips.cancelTrip.useMutation({
      onSuccess: () => {
        toast.success("Perjalanan kamu berhasil dibatalin", {
          position: "top-center",
        });
      },
      onSettled: () => {
        void apiUtils.trips.invalidate();
        localStorage.removeItem("tiresq.publicUserDestination");
        setDestination(undefined);
        setIsOnTrip(false);
      },
    });

  const { mutate: completeTrip, isLoading: isCompletingTrip } =
    api.trips.completeTrip.useMutation({
      onSuccess: () => {
        toast.success("Yay!, kamu sudah sampai ditujuan", {
          position: "top-center",
        });
      },
      onSettled: () => {
        void apiUtils.trips.invalidate();
        localStorage.removeItem("tiresq.publicUserDestination");
        setDestination(undefined);
        setIsOnTrip(false);
      },
    });

  return {
    cancelTrip,
    completeTrip,
    isCancellingTrip,
    isCompletingTrip,
  };
}
