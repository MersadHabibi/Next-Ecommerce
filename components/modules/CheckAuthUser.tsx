"use client";

import { useAuthStore } from "@/stores/authStore";

export default function CheckAuthUser({
  id,
  username,
  role,
}: {
  id: string;
  username: string;
  role?: "ADMIN" | "USER";
}) {
  const signIn = useAuthStore((state) => state.signIn);

  signIn(id, username, role);

  return <></>;
}
