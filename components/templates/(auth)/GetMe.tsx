"use client";

import { getMeAction } from "@/actions/authActions";
import { useAuthStore } from "@/stores/authStore";
import { TUser } from "@/types";
import { useEffect, useState } from "react";

export default function GetMe({ children }: { children: React.ReactNode }) {
  const signIn = useAuthStore((state) => state.signIn);

  useEffect(() => {
    const getMe = async () => {
      const {
        isLogin,
        user,
      }: {
        isLogin: boolean;
        user: TUser;
      } = await getMeAction();

      isLogin && signIn(user);
    };

    getMe();
  }, [signIn]);

  return <>{children}</>;
}
