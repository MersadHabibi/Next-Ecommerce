"use client";

import { create } from "zustand";

export type State = {
  isOpen: boolean;
};

export type Actions = {
  open: () => void;
  close: () => void;
};

export const useAdminNavbar = create<State & Actions>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
