"use client";

import { useAuthStore } from "@/stores/authStore";

export default function CheckAuthUser({
  username,
  role,
}: {
  username: string;
  role?: "ADMIN" | "USER";
}) {
  const signIn = useAuthStore((state) => state.signIn);

  signIn(username, role);

  return <></>;
}
