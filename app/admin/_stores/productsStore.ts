"use client";

import { Product } from "@/types/Product";
import { create } from "zustand";

export type State = {
  products: Product[];
};

export type Actions = {
  setProducts: (products: Product[]) => void;
};

export const useProducts = create<State & Actions>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
