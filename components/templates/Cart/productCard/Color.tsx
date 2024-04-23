import { SquarePen, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Loader from "@/components/modules/Loader";
import { cn } from "@/lib/utils";
import { changeCartItemColorAction } from "@/actions/cartActions";
import { useCartStore } from "@/stores/cartStore";

export default function Color({
  cartItemId,
  color,
  productColors,
}: {
  cartItemId: string;
  color: string;
  productColors: string[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const setCartItems = useCartStore((state) => state.setCartItems);

  const onChangeColor = async (color: string) => {
    setIsLoading(true);
    const res = await changeCartItemColorAction(cartItemId, color);
    setIsLoading(false);

    console.log(res);

    if (res.status === 202) {
      setCartItems(res.cart);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="font-medium">Color :</span>
      <div className="flex items-center gap-x-2">
        <div
          className="size-5 rounded-full border-2 border-neutral-400 dark:border-secondry-dark"
          style={{ backgroundColor: color }}></div>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={isLoading}
            className="flex-center disabled:opacity-70">
            {isLoading ? (
              <Loader />
            ) : (
              <SquarePen className="size-5 opacity-90" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-wrap gap-x-2 p-2">
            {productColors.map((productColor) => (
              <DropdownMenuItem key={productColor} className="w-fit p-0">
                <button
                  className={cn(
                    "size-7 rounded-full border-2 border-neutral-400 dark:border-secondry-dark [&.active]:outline [&.active]:outline-offset-2 [&.active]:outline-green-500",
                    productColor === color && "active",
                  )}
                  style={{ backgroundColor: productColor }}
                  onClick={() => onChangeColor(productColor)}
                  disabled={productColor === color}></button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
