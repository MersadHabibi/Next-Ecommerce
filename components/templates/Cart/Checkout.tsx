"use client";

import Address from "./Checkout/Address";
import Tax from "./Checkout/Tax";
import Total from "./Checkout/Total";
import Pay from "./Checkout/Pay";

export default function Checkout() {
  return (
    <div className="sticky top-20 col-span-4  h-fit w-full rounded-lg border border-secondry bg-neutral-100 p-3 dark:border-secondry-dark dark:bg-neutral-950 lg:col-span-1">
      <Address />
      <div className="space-y-3 border-b border-secondry py-4 dark:border-secondry-dark">
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
      </div>
    </div>
  );
}
