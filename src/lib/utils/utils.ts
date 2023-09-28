import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const statusTranslated: Map<string, string> = new Map();
statusTranslated.set("completed", "Selesai");
statusTranslated.set("onprogress", "Aktif");
statusTranslated.set("cancelled", "Batal");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
