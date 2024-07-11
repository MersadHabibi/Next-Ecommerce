"use client";

import { TOrder } from "@/types";
import OrderItem from "./OrderItem";
import { ORDER_STATUS } from "@/enums";

export default function OrdersList({ orders }: { orders: TOrder[] }) {
  console.log(orders);

  const completedOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.COMPLETED,
  );
  const canceledOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.CANCELED,
  );
  const rejectedOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.REJECTED,
  );
  const notCompletedOrders = orders.filter(
    (order) =>
      order.status !== ORDER_STATUS.COMPLETED &&
      order.status !== ORDER_STATUS.CANCELED &&
      order.status !== ORDER_STATUS.REJECTED,
  );

  return (
    <div className="space-y-2 pt-5">
      {orders.length > 0 ? (
        <>
          {notCompletedOrders
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((order, index) => (
              <OrderItem key={order.id} order={order} index={index} />
            ))}
          {completedOrders.map((order, index) => (
            <OrderItem
              key={order.id}
              order={order}
              index={notCompletedOrders.length + index}
            />
          ))}
          {rejectedOrders.map((order, index) => (
            <OrderItem
              key={order.id}
              order={order}
              index={notCompletedOrders.length + completedOrders.length + index}
            />
          ))}
          {canceledOrders.map((order, index) => (
            <OrderItem
              key={order.id}
              order={order}
              index={
                notCompletedOrders.length +
                completedOrders.length +
                rejectedOrders.length +
                index
              }
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
