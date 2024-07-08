import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { useNewProduct } from "@/app/admin/_stores/newProduct";
import { inputResetStyles } from "./Details";

export default function Quantity() {
  const quantity = useNewProduct((state) => state.quantity);
  const setQuantity = useNewProduct((state) => state.setQuantity);

  return (
    <div className="mt-5 xl:mt-7">
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        Quantity of inventory
      </span>
      <div className="mt-3 grid grid-cols-3 sm:h-12 xl:grid-cols-4">
        <div className="col-span-5 mb-2 h-10 w-24 sm:col-span-1 sm:mb-0 sm:h-full sm:w-auto sm:p-1 sm:pr-2">
          <div className="flex h-full items-center justify-around bg-gray-200/40 text-lg text-gray-700 dark:bg-neutral-900 dark:text-gray-300">
            <button
              type="button"
              className="flex-center w-full"
              onClick={() =>
                setQuantity(quantity ? (quantity as number) - 1 : 0)
              }>
              <Minus className="size-4" />
            </button>
            <input
              className={cn(
                "w-full !appearance-none text-center",
                inputResetStyles,
              )}
              type="number"
              value={quantity}
              onChange={(event) => {
                if (event.currentTarget.value.startsWith("-")) {
                  setQuantity("");
                  return;
                }

                setQuantity(event.currentTarget.value);
              }}
              maxLength={4}
            />
            <button
              type="button"
              className="flex-center w-full"
              onClick={() => setQuantity(Number(quantity as number) + 1)}>
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
