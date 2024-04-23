import { SquarePen, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { changeCartItemSizeAction } from "@/actions/cartActions";
import { useCartStore } from "@/stores/cartStore";

export default function Size({
  cartItemId,
  size,
  productSizes,
}: {
  cartItemId: string;
  size: number;
  productSizes: number[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const setCartItems = useCartStore((state) => state.setCartItems);

  const onChangeSize = async (size: number) => {
    setIsLoading(true);
    const res = await changeCartItemSizeAction(cartItemId, size);
    setIsLoading(false);

    console.log(res);

    if (res.status === 202) {
      setCartItems(res.cart);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="font-medium">Size :</span>
      <div className="flex items-center gap-x-2">
        <span>{size}</span>
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
            {productSizes.map((productSize) => (
              <DropdownMenuItem key={productSize} className="w-fit p-0 ">
                <Button
                  size="icon"
                  variant="outline"
                  className={cn(
                    productSize === size &&
                      "!bg-neutral-200 dark:!bg-neutral-900",
                  )}
                  onClick={() => onChangeSize(productSize)}
                  disabled={productSize === size}>
                  {productSize}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
