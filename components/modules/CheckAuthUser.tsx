"use client";

import { useAuthStore } from "@/stores/authStore";

export default function CheckAuthUser({ username }: { username: string }) {
  const signIn = useAuthStore((state) => state.signIn);

  signIn(username);

  return <></>;
}
