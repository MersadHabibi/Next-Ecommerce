"use client";

import { CategoryType } from "@/app/admin/_components/categories/CategoryList";
import { create } from "zustand";

export type State = {
  categories: CategoryType[] | null;
};

export type Actions = {
  setCategories: (categories: CategoryType[]) => void;
};

export const useCategoriesStore = create<State & Actions>()((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
}));
