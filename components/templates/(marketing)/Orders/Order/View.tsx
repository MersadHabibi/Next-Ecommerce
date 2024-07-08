import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { TOrderItem } from "@/types";
import { Eye } from "lucide-react";
import { useState } from "react";
import OrderItemProduct from "./OrderItemProduct";

export default function View({
  orderItems: orderItemsEntry,
}: {
  orderItems: string;
}) {
  const [orderItems, setOrderItems] = useState(
    JSON.parse(orderItemsEntry) as TOrderItem[],
  );

  return (
    <Dialog>
      <DialogTrigger className="flex-center size-9 rounded-md bg-black !text-white transition-opacity  hover:opacity-90 dark:bg-white dark:!text-black">
        <Eye />
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Products</DialogTitle>
        </DialogHeader>
        <div>
          {orderItems.map((orderItem) => (
            <OrderItemProduct key={orderItem.id} orderItem={orderItem} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
