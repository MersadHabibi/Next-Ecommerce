"use client";

import { create } from "zustand";

export type State = {
  id: string;
  username: string | null;
  role: "ADMIN" | "USER";
  isLogin: boolean;
};

export type Actions = {
  signIn: (id: string, username: string, role?: "ADMIN" | "USER") => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()((set) => ({
  id: "",
  username: null,
  role: "USER",
  isLogin: false,
  signIn: (id, username, role) => {
    set((state) => ({
      id,
      username,
      role: role ? role : "USER",
      isLogin: true,
    }));
  },
  logout: () => set((state) => ({ isLogin: false, username: null })),
}));
