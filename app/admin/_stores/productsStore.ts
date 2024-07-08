"use client";

import { TProduct } from "@/types";
import { create } from "zustand";

export type State = {
  products: TProduct[];
};

export type Actions = {
  setProducts: (products: TProduct[]) => void;
};

export const useProducts = create<State & Actions>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
