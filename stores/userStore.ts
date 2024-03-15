import { create } from "zustand";

export type State = {
  username: string;
  isLogin: boolean;
};

export type Actions = {
  signIn: (username: string) => any;
};

export const useAuthStore = create<State & Actions>()((set) => ({
  username: "",
  isLogin: false,
  signIn: (username) => {
    set((state) => ({ username, isLogin: true }));
  },
}));
