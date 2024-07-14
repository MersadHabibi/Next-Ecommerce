import { PrismaClient } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const prisma = new PrismaClient();

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

export function shuffleArray(array: any[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return shuffleArray;
}

export function checkSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
