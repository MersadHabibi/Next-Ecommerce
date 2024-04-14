"use client";

import { create } from "zustand";

export type State = {
  username: string | null;
  role: "ADMIN" | "USER";
  isLogin: boolean;
};

export type Actions = {
  signIn: (username: string, role?: "ADMIN" | "USER") => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()((set) => ({
  username: null,
  role: "USER",
  isLogin: false,
  signIn: (username, role) => {
    set((state) => ({ username, role: role ? role : "USER", isLogin: true }));
  },
  logout: () => set((state) => ({ isLogin: false, username: null })),
}));
