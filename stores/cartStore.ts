"use client";

import { TCartItem } from "@/types";
import { create } from "zustand";

export type State = {
  cartItems: TCartItem[];
  totalPrice: string;
};

export type Actions = {
  setCartItems: (cartItems: TCartItem[]) => void;
};

export const useCartStore = create<State & Actions>()((set) => ({
  cartItems: [],
  totalPrice: "0",
  setCartItems: (cartItems) =>
    set((state) => {
      let totalPrice = 0;
      cartItems.map((cartItem) => {
        totalPrice += cartItem.quantity * Number(cartItem.Product.price);
      });
      return { cartItems, totalPrice: totalPrice.toFixed(2) };
    }),
}));
