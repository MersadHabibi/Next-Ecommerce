"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { CircleHelp } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Tax() {
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-x-1 text-gray-700 dark:text-gray-300">
        Tax
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="flex-center size-4">
                <CircleHelp />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>9%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <span
        className={cn(
          "text-gray-700 opacity-70 dark:text-gray-300",
          notoSans.className,
        )}>
        ${((Number(totalPrice) / 100) * 9).toFixed(2)}
      </span>
    </div>
  );
}
