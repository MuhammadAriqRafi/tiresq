import { api } from "@/app/_trpc/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function useExperience() {
  const router = useRouter();
  const { mutate: createExperience, isLoading: isCreatingExperience } =
    api.experiences.create.useMutation({
      onSuccess() {
        router.replace("/histories");
        setTimeout(
          () =>
            toast.success(
              "Terima kasih udah luangin waktunya buat bagi pengalamannya!",
              { duration: 2000 },
            ),
          1000,
        );
      },
    });

  return { createExperience, isCreatingExperience };
}
