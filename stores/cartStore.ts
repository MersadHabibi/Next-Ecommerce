"use client";

import { CartItem as CartItemType } from "@/types/CartItem";
import { create } from "zustand";

export type State = {
  cartItems: CartItemType[] ;
};

export type Actions = {
  setCartItems: (cartItems: CartItemType[]) => void;
};

export const useCartStore = create<State & Actions>()((set) => ({
  cartItems: [],
  setCartItems: (cartItems) => set({ cartItems }),
}));
