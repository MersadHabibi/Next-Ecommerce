import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidColor(strColor: string) {
  var s = new Option().style;
  s.color = strColor;

  let isValid: boolean = true;

  isValid = /^#([0-9a-f]{3}){1,2}$/i.test(strColor);

  if (isValid) {
    return true;
  }

  // return 'false' if color wasn't assigned
  return s.color == strColor.toLowerCase();
}
