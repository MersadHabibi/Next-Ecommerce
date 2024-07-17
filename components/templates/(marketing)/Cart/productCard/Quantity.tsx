import {
  changeCartItemQuantityAction,
  deleteCartItemAction,
} from "@/actions/cartActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { TCartItem } from "@/types";
import { Check, Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Quantity({
  cartItem,
  maxQuantity,
}: {
  cartItem: TCartItem;
  maxQuantity: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isChanged, setIsChanged] = useState(false);
  const [isZero, setIsZero] = useState(false);

  const setCartItems = useCartStore((state) => state.setCartItems);

  const { toast } = useToast();

  useEffect(() => {
    if (quantity !== cartItem.quantity) {
      setIsChanged(true);
      if (quantity === 0) setIsZero(true);
      if (quantity !== 0) setIsZero(false);
    } else {
      setIsChanged(false);
    }
  }, [quantity, cartItem.quantity]);

  const increaseQuantity = () => {
    if (maxQuantity <= quantity) {
      toast({
        variant: "destructive",
        description: "Max quantity",
      });
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

  const onChangeQuantity = async () => {
    setIsLoading(true);
    const res = await changeCartItemQuantityAction(cartItem.id, quantity);
    setIsLoading(false);

    if (res.status === 204) {
      setCartItems(res.cart || []);
    }
  };

  const onDeleteCartItem = async () => {
    setIsLoading(true);
    const res = await deleteCartItemAction(cartItem.id);
    setIsLoading(false);

    if (res.status === 202) {
      setCartItems(res.cart || []);
    }
  };

  if (maxQuantity === 0) {
    return (
      <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
        <p className="text-sm text-red-500">End of inventory</p>
        <Button
          variant="destructive"
          size="icon"
          className="size-8 disabled:opacity-70"
          onClick={onDeleteCartItem}
          disabled={isLoading}>
          {isLoading ? (
            <Loader className="size-5" />
          ) : (
            <Trash className="size-5" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-auto w-9 space-y-2">
      {isChanged ? (
        <Button
          className={cn(
            "disabled:opacity-70",
            !isZero && "bg-black dark:bg-white",
          )}
          size="icon"
          variant={isZero ? "destructive" : "default"}
          onClick={() => (isZero ? onDeleteCartItem() : onChangeQuantity())}
          disabled={isLoading}>
          {isLoading ? <Loader /> : isZero ? <Trash /> : <Check />}
        </Button>
      ) : null}

      <div className="flex h-24 flex-col items-center justify-between rounded-md border border-secondary p-1 dark:border-secondary-dark">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-full text-gray-700 dark:text-gray-300"
          onClick={increaseQuantity}>
          <Plus className="size-5" />
        </Button>
        <span
          className={cn(
            "font-bold text-gray-900 dark:text-gray-200",
            notoSans.className,
          )}>
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-full text-gray-700 dark:text-gray-300"
          onClick={decreaseQuantity}>
          <Minus className="size-5" />
        </Button>
      </div>
    </div>
  );
}
