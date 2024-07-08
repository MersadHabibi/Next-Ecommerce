"use client";

import { cn } from "@/lib/utils";
import { EllipsisVertical, Trash } from "lucide-react";

import { deleteAllCartItemsAction } from "@/actions/cartActions";
import Loader from "@/components/modules/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

export default function Header({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const { toast } = useToast();

  const onDeleteAllCartItems = async () => {
    setIsLoading(true);
    const res = await deleteAllCartItemsAction(userId);
    setIsLoading(false);

    if (res.status === 204) {
      setCartItems([]);
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
    <div className="border-secondary dark:border-secondary-dark flex items-center justify-between border-b pb-3">
      <div className="flex h-6 items-center gap-x-4">
        <h2 className={cn("text-lg font-bold", notoSans.className)}>Cart </h2>
        <span className="border-secondary dark:border-secondary-dark h-full w-1 border-l"></span>
        <p className="text-sm text-gray-700/70 dark:text-gray-300/70">
          {cartItems.length} Product
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isLoading}
          className="flex-center disabled:opacity-70">
          {isLoading ? <Loader /> : <EllipsisVertical />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-x-2"
            onClick={onDeleteAllCartItems}>
            <Trash className="size-5" />
            Delete all
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
