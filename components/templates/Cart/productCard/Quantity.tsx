import {
  changeCartItemQuantityAction,
  deleteCartItemAction,
} from "@/actions/cartActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { CartItem } from "@/types/CartItem";
import { Check, Minus, Plus, Trash } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import { useEffect, useState } from "react";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export default function Quantity({
  cartItem,
  maxQuantity,
}: {
  cartItem: CartItem;
  maxQuantity: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isChanged, setIsChenged] = useState(false);
  const [isZero, setIsZero] = useState(false);

  const setCartItems = useCartStore((state) => state.setCartItems);

  useEffect(() => {
    if (quantity !== cartItem.quantity) {
      setIsChenged(true);
      if (quantity === 0) setIsZero(true);
    } else {
      setIsChenged(false);
    }
  }, [quantity, cartItem.quantity]);

  const increaseQuantity = () => {
    if (maxQuantity < quantity) return;
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

      <div className="flex h-24 flex-col items-center justify-between rounded-md border border-secondry p-1 dark:border-secondry-dark">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-full text-gray-700 dark:text-gray-300"
          onClick={increaseQuantity}>
          <Plus className="size-5" />
        </Button>
        <span
          className={cn(
            "text-gray-900 dark:text-gray-200",
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
