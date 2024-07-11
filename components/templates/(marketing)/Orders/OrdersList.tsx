"use client";

import { TOrder } from "@/types";
import NoHaveOrder from "./NoHaveOrder";
import OrderItem from "./Order/OrderItem";

export default function OrdersList({ orders }: { orders: TOrder[] }) {
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
