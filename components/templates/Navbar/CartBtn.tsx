"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function CartBtn({ onClick }: { onClick?: () => void }) {
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isLogin) return <></>;

  return (
    <Link href="/cart">
      <Button
        className="!bg-transparent hover:!bg-secondary dark:hover:!bg-secondary-dark"
        variant="outline"
        size="icon"
        onClick={() => onClick && onClick()}>
        <ShoppingBasket size="20" />
      </Button>
    </Link>
  );
}
