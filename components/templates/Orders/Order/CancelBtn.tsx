import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { cancelOrderAction } from "@/actions/orderActions";
import { useOrdersStore } from "@/stores/ordersStore";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/modules/Loader";

export default function CancelBtn({
  orderId,
  isDone,
  isCanceled,
}: {
  orderId: string;
  isDone: boolean;
  isCanceled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const setOrders = useOrdersStore((state) => state.setOrders);

  const { toast } = useToast();

  const onCancelOrder = async () => {
    setIsLoading(true);
    const res = await cancelOrderAction(orderId);
    setIsLoading(false);

    if (res.status === 200) {
      setOrders(res.orders);

      return toast({
        description: res.message,
      });
    }

    toast({
      variant: "destructive",
      description: res.message,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="flex-center size-9 rounded-md !bg-red-500 !text-white transition-opacity hover:opacity-80 disabled:opacity-70"
        disabled={isLoading || isDone || isCanceled}>
        {isLoading ? <Loader /> : <X />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to cancel this order?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={onCancelOrder}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
