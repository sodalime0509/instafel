import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleVersionInput = (
  value: string,
  setter: (value: string) => void
) => {
  const regex = /^[0-9.]*$/;
  if (regex.test(value)) {
    setter(value);
  }
};
