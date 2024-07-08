"use client";

import { TImage } from "@/components/templates/admin/(products)/add-product/Images";
import { create } from "zustand";

export type State = {
  colors: string[];
  sizes: number[];
  quantity: number | string;
  mainImage: File | null;
  images: TImage[];
  gender: "men" | "women";
  category: string;
};

export type Actions = {
  setMainImage: (mainImage: File | null) => void;
  setImages: (images: TImage[]) => void;
  setColors: (color: string) => void;
  removeColor: (color: string) => void;
  setSizes: (size: number) => void;
  removeSize: (size: number) => void;
  setQuantity: (quantity: number | string) => void;
  reset: () => void;
  setGender: (gender: "men" | "women") => void;
  setCategory: (categoryId: string) => void;
};

export const useNewProduct = create<State & Actions>()((set) => ({
  mainImage: null,
  images: [],
  colors: [],
  sizes: [],
  quantity: 1,
  gender: "men",
  category: "",
  setMainImage: (newMainImage) => set({ mainImage: newMainImage }),
  setImages: (newImages) => set({ images: newImages }),
  setColors: (color) => set((state) => ({ colors: [...state.colors, color] })),
  removeColor: (color) =>
    set((state) => {
      const newColors = state.colors.filter((prevColor) => prevColor !== color);
      return { colors: newColors };
    }),
  setSizes: (size) => set((state) => ({ sizes: [...state.sizes, size] })),
  removeSize: (size) =>
    set((state) => {
      const newSizes = state.sizes.filter((prevSize) => prevSize !== size);
      return { sizes: newSizes };
    }),
  setQuantity: (quantity) => set({ quantity }),
  reset: () =>
    set({
      mainImage: null,
      images: [],
      colors: [],
      sizes: [],
      quantity: 1,
      category: "",
    }),
  setGender: (gender) => set({ gender }),
  setCategory: (categoryId) => set({ category: categoryId }),
}));
