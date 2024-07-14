"use client";

import { TOrder } from "@/types";
import OrderItem from "./(orders)/orders/OrderItem";
import { cn } from "@/lib/utils";
import { notoSans } from "@/config/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LastOrders({ lastOrders }: { lastOrders: TOrder[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full rounded-md border-secondary dark:border-secondary-dark">
      <h3 className={cn("pb-3 pt-5 text-2xl font-bold", notoSans.className)}>
        Last orders:
      </h3>
      <div className="space-y-2">
        {lastOrders.map((order, index) => (
          <OrderItem key={index} index={index} order={order} />
        ))}
      </div>
      <Link href={"/admin/orders"}>
        <Button className="mt-3 h-14 w-full bg-black text-base font-semibold dark:bg-white">
          View all orders
        </Button>
      </Link>
    </div>
  );
}
