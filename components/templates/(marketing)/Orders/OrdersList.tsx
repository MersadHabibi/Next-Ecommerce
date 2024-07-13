"use client";

import { TOrder } from "@/types";
import NoHaveOrder from "./NoHaveOrder";
import OrderItem from "./Order/OrderItem";
import { useEffect, useState } from "react";
import Loader from "@/components/modules/Loader";

export default function OrdersList({ orders }: { orders: TOrder[] }) {
  const [isClient, setIsCLient] = useState(false);

  useEffect(() => {
    setIsCLient(true);
  }, []);

  if (!isClient)
    return (
      <div className="flex-center pt-5">
        <Loader />
      </div>
    );

  return (
    <div className="space-y-2 pt-5">
      {orders.length > 0 ? (
        orders
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((order, index) => (
            <OrderItem key={order.id} order={order} index={index} />
          ))
      ) : (
        <NoHaveOrder />
      )}
    </div>
  );
}
