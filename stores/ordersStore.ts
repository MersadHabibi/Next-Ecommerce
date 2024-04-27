"use client";

import { Order } from "@/types/OrderItem";
import { create } from "zustand";

export type State = {
  orders: Order[];
};

export type Actions = {
  setOrders: (orders: Order[]) => void;
};

export const useOrdersStore = create<State & Actions>()((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
}));
