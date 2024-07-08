"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Address from "./Checkout/Address";
import Pay from "./Checkout/Pay";
import Tax from "./Checkout/Tax";
import Total from "./Checkout/Total";

export default function Checkout() {
  return (
    <div className="border-secondary dark:border-secondary-dark sticky  top-20 col-span-4 h-fit w-full rounded-lg border bg-neutral-100 p-3 dark:bg-neutral-950 lg:col-span-1">
      <Address />
      <div className="border-secondary dark:border-secondary-dark space-y-3 border-b py-4">
        {/* <div className=" flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">
            Shipping cost
          </span>
          <span
            className={cn(
              "text-gray-700 opacity-70 dark:text-gray-300",
              notoSans.className,
            )}>
            $128.2
          </span>
        </div> */}
        <Tax />
      </div>
      <div className="space-y-3 pt-4">
        <Total />
        <Pay />
        <Link href="/orders" className="mt-2 block">
          <Button
            variant="outline"
            className="w-full shadow-none disabled:opacity-70">
            Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}
