import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function useExperience() {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = api.experience.create.useMutation();

  useEffect(() => {
    if (isSuccess) {
      void router.replace("/histories");
      setTimeout(
        () =>
          toast.success(
            "Terima kasih udah luangin waktunya buat kasih rating!"
          ),
        1000
      );
    }
  }, [isSuccess, router]);

  return { mutate, isLoading };
}
