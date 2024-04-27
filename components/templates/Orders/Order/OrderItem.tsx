import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CancelBtn from "./CancelBtn";
import { Noto_Sans } from "next/font/google";
import { Order as Ordertype } from "@/types/OrderItem";
import View from "./View";
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function OrderItem({
  order,
  index,
}: {
  order: Ordertype;
  index: number;
}) {
  return (
    <div className="flex w-full flex-col space-y-4 rounded-lg border border-secondry p-2 dark:border-secondry-dark dark:bg-neutral-950 md:h-16 md:flex-row md:items-center md:justify-between md:space-y-0 md:p-0">
      <div className="flex flex-col gap-x-6 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <div className="sm:flex-center md:pl-2">
          <span
            className={cn(
              "flex-center size-12 rounded-md bg-neutral-200/80 text-lg dark:bg-black",
              notoSans.className,
            )}>
            {index + 1}
          </span>
        </div>
        <p>
          <span className="font-medium">Status : </span>
          <span className="text-gray-700 dark:text-gray-300">
            {order.isCanceled
              ? "Canceled"
              : order.isDone
                ? "Accepted"
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
      <div className="flex items-center gap-x-2 self-end md:self-auto md:pr-3.5">
        <View orderItems={JSON.stringify(order.OrderItems)} />
        <CancelBtn
          orderId={order.id}
          isDone={order.isDone}
          isCanceled={order.isCanceled}
        />
      </div>
    </div>
  );
}
