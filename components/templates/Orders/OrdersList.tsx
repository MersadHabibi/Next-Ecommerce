"use client";

import OrderItem from "./Order/OrderItem";
import NoHaveOrder from "./NoHaveOrder";
import { Order as OrderType } from "@/types/OrderItem";
import { useOrdersStore } from "@/stores/ordersStore";
import { useEffect, useState } from "react";

export default function OrdersList({
  orders: OrdersEntry,
}: {
  orders: OrderType[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const orders = useOrdersStore((state) => state.orders);
  const setOrders = useOrdersStore((state) => state.setOrders);

  useEffect(() => {
    setOrders(OrdersEntry);
    setIsLoading(false);
  }, [setOrders, OrdersEntry]);

  return (
    <div className="space-y-2 pt-5">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderItem key={order.id} order={order} index={index} />
        ))
      ) : (
        <NoHaveOrder />
      )}
    </div>
  );
}
