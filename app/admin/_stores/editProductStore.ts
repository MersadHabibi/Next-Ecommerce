"use client";

import { CategoryType } from "../_components/(categories)/categories/CategoryList";
import { create } from "zustand";

export type State = {
  sizes: number[];
  colors: string[];
};

export type Actions = {
  addSize: (size: number) => void;
  removeSize: (size: number) => void;
  setSizes: (sizes: number[]) => void;
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
  setColors: (colors: string[]) => void;
};

export const useEditProductStore = create<State & Actions>()((set) => ({
  sizes: [],
  colors: [],
  addSize: (size) => set((state) => ({ sizes: [...state.sizes, size] })),
  removeSize: (size) =>
    set((state) => {
      const newSizes = state.sizes.filter((item) => item !== size);

      return { sizes: newSizes };
    }),
  setSizes: (sizes) => set({ sizes }),
  addColor: (color) => set((state) => ({ colors: [...state.colors, color] })),
  removeColor: (color: string) =>
    set((state) => {
      const newColors = state.colors.filter((item) => item !== color);

      return { colors: newColors };
    }),
  setColors: (colors: string[]) => set({ colors }),
}));
