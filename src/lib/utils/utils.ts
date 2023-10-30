import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const ratingFeedback = new Map<number, RatingFeedback>()
  .set(1, { text: "Kecewa.", color: "text-red-600" })
  .set(2, { text: "Kurang Memuaskan.", color: "text-red-600" })
  .set(3, { text: "Biasa.", color: "" })
  .set(4, { text: "Puaaas!", color: "text-green-600" })
  .set(5, { text: "Puas Banget!", color: "text-green-600" });

export const statusColor = new Map<string, string>();
statusColor.set("completed", "bg-green-300 text-green-700");
statusColor.set("onprogress", "bg-yellow-300 text-yellow-700");
statusColor.set("cancelled", "bg-red-300 text-red-700");

export const statusTranslated = new Map<string, string>();
statusTranslated.set("completed", "Selesai");
statusTranslated.set("onprogress", "Aktif");
statusTranslated.set("cancelled", "Batal");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateResponse<T>(action: () => Promise<T>) {
  try {
    const response = await action();
    return response;
  } catch (error) {
    console.log(error);
    return {
      isError: true,
      message: "Maaf, terjadi kesalahan pada server, coba lagi nanti ya",
      data: null,
    };
  }
}
