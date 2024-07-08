"use client";

import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

export default function Total() {
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="flex items-center justify-between">
      <span className="gap-x-1 font-medium text-gray-700 dark:text-gray-300">
        Total
      </span>
      <span
        className={cn(
          "font-bold text-gray-700 opacity-70 dark:text-gray-300",
          notoSans.className,
        )}>
        ${((Number(totalPrice) / 100) * 91).toFixed(2)}
      </span>
    </div>
  );
}
