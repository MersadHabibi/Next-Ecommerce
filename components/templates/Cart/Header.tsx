"use client";

import { cn } from "@/lib/utils";
import { EllipsisVertical, Trash } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/stores/cartStore";
import { deleteAllCartItemsAction } from "@/actions/cartActions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/modules/Loader";

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
    <div className="flex items-center justify-between border-b border-secondry pb-3 dark:border-secondry-dark">
      <div className="flex h-6 items-center gap-x-4">
        <h2 className={cn("text-lg", notoSans.className)}>Cart </h2>
        <span className="h-full w-1 border-l border-secondry dark:border-secondry-dark"></span>
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
