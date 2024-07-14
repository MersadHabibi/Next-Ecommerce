import { X } from "lucide-react";

import { cancelOrderAction, rejectOrderAction } from "@/actions/orderActions";
import Loader from "@/components/modules/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ORDER_STATUS } from "@/enums";

export default function RejectOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: ORDER_STATUS;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onRejectOrder = async () => {
    setIsLoading(true);
    const res = await rejectOrderAction(orderId);
    setIsLoading(false);

    if (res.status === 200) {
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
        disabled={isLoading || status !== ORDER_STATUS.PROGRESS}>
        {isLoading ? <Loader /> : <X />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to reject this order?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={onRejectOrder}
            className="bg-black dark:bg-white">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
