"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function CartBtn() {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) return <></>;

  return (
    <Link href="/cart">
      <Button
        className="!bg-transparent hover:!bg-secondry dark:hover:!bg-secondry-dark"
        variant="outline"
        size="icon">
        <ShoppingBasket size="20" />
      </Button>
    </Link>
  );
}
