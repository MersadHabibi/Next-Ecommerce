import CancelBtn from "@/components/templates/(marketing)/Orders/Order/CancelBtn";
import View from "@/components/templates/(marketing)/Orders/Order/View";
import { notoSans } from "@/config/fonts";
import { ORDER_STATUS } from "@/enums";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types";
import RejectOrder from "./RejectOrder";
import AcceptOrder from "./AcceptOrder";
import CompleteOrder from "./CompleteOrder";

export default function OrderItem({
  order,
  index,
}: {
  order: TOrder;
  index: number;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-4 rounded-lg border border-secondary p-2 dark:border-secondary-dark dark:bg-neutral-950 md:h-16 md:flex-row md:items-center md:justify-between md:space-y-0 md:p-0",
        order.status === ORDER_STATUS.COMPLETED && "border-2 !border-green-500",
        order.status === ORDER_STATUS.CANCELED && "opacity-70",
        order.status === ORDER_STATUS.REJECTED && "border-2 !border-red-500",
      )}>
      <div className="flex flex-col gap-x-6 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <div className="sm:flex-center md:pl-2">
          <span
            className={cn(
              "flex-center size-12 rounded-md bg-neutral-200/80 text-lg font-bold dark:bg-black",
              notoSans.className,
            )}>
            {index + 1}
          </span>
        </div>
        <div className="flex gap-x-6 pl-1">
          <p>
            <span className="font-medium">Status : </span>
            <span className="text-gray-700 dark:text-gray-300">
              {order.status === ORDER_STATUS.CANCELED
                ? "Canceled"
                : order.status === ORDER_STATUS.SENDING
                  ? "Sending"
                  : order.status === ORDER_STATUS.REJECTED
                    ? "Rejected"
                    : order.status === ORDER_STATUS.COMPLETED
                      ? "Completed"
                      : "Pending"}
            </span>
          </p>
          <p>
            <span className="font-medium">Date : </span>
            <span className="text-gray-700 dark:text-gray-300">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p>
            <span className="font-medium">TotalPrice : </span>
            <span className="text-gray-700 dark:text-gray-300">
              ${order.totalPrice}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-2 self-end md:self-auto md:pr-3.5">
        <View orderItems={order.OrderItems} address={order.address} />
        <RejectOrder orderId={order.id} status={order.status as ORDER_STATUS} />
        <AcceptOrder orderId={order.id} status={order.status as ORDER_STATUS} />
        <CompleteOrder
          orderId={order.id}
          status={order.status as ORDER_STATUS}
        />
      </div>
    </div>
  );
}
