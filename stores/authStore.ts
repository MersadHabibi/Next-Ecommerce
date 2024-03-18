"use client";

import { create } from "zustand";

export type State = {
  username: string | null;
  isLogin: boolean;
};

export type Actions = {
  signIn: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()((set) => ({
  username: null,
  isLogin: false,
  signIn: (username) => {
    set((state) => ({ username, isLogin: true }));
  },
  logout: () => set((state) => ({ isLogin: false, username: null })),
}));
