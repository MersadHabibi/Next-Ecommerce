"use client";

import { TOrder } from "@/types";
import { create } from "zustand";

export type State = {
  orders: TOrder[];
};

export type Actions = {
  setOrders: (orders: TOrder[]) => void;
};

export const useOrdersStore = create<State & Actions>()((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
}));
