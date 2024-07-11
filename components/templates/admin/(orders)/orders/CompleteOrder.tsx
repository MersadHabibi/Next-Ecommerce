import { Check } from "lucide-react";

import { completeOrderAction } from "@/actions/orderActions";
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
import { ORDER_STATUS } from "@/enums";
import { useState } from "react";

export default function CompleteOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: ORDER_STATUS;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onCompleteOrder = async () => {
    setIsLoading(true);
    const res = await completeOrderAction(orderId);
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
        className="flex-center size-9 rounded-md !bg-green-500 !text-white transition-opacity hover:opacity-80 disabled:opacity-70"
        disabled={isLoading || status !== ORDER_STATUS.SENDING}>
        {isLoading ? <Loader /> : <Check />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to complete this order?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={onCompleteOrder}
            className="bg-black dark:bg-white">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
