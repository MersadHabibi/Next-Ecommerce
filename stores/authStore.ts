"use client";

import { TUser } from "@/types";
import { create } from "zustand";

export type State = {
  user: TUser | null;
  isLogin: boolean;
};

export type Actions = {
  signIn: (user: TUser) => void;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()((set) => ({
  user: null,
  isLogin: false,
  signIn: (user) => {
    set((state) => ({
      user,
      isLogin: true,
    }));
  },
  logout: () => set((state) => ({ isLogin: false, user: null })),
}));
