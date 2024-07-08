"use client";

import { TCategory } from "@/types";
import { create } from "zustand";

export type State = {
  categories: TCategory[] | null;
};

export type Actions = {
  setCategories: (categories: TCategory[]) => void;
};

export const useCategoriesStore = create<State & Actions>()((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
}));
