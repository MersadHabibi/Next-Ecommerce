"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

import { addToCartAction } from "@/actions/cartActions";
import Loader from "@/components/modules/Loader";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { useAuthStore } from "@/stores/authStore";
import { TProduct } from "@/types";
import { useRef, useState } from "react";
import Colors from "./(Details)/Colors";
import Sizes from "./(Details)/Sizes";

export default function Details({ product }: { product: TProduct }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const selectedColor = useRef(product.colors[0]);
  const selectedSize = useRef(product.sizes[0]);

  const userId = useAuthStore((state) => state.user?.id);

  const { toast } = useToast();

  function onChangeColor(color: string) {
    selectedColor.current = color;
  }
  function onChangeSize(size: number) {
    selectedSize.current = size;
  }

  function increaseQuantity() {
    if (quantity >= product.quantity) {
      toast({
        variant: "destructive",
        description: "Max quantity",
      });
      return;
    }
    setQuantity((prev) => prev + 1);
  }
  function decreaseQuantity() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  }

  async function onAddToCart() {
    setIsLoading(true);
    const res = await addToCartAction(
      userId || "",
      product.id,
      quantity,
      selectedColor.current,
      selectedSize.current,
    );
    setIsLoading(false);

    if (res.status === 200) {
      return toast({
        description: res.message,
      });
    }

    return toast({
      variant: "destructive",
      description: res.message,
    });
  }

  return (
    <>
      <h1 className="line-clamp-1 text-3xl font-semibold sm:text-4xl">
        {product.title}
      </h1>

      <div className="py-3 xl:py-4">
        <span
          className={cn(
            "text-2xl font-bold text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          ${product.price}
        </span>
      </div>
      <h2 className="text-gray-700/80 dark:text-gray-300">
        {product.description}
      </h2>

      <Colors colors={product.colors} onChangeColor={onChangeColor} />

      <Sizes sizes={product.sizes} onChangeSize={onChangeSize} />

      {product.quantity ? (
        <div className="mt-5 xl:mt-7">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </span>
          <div className="mt-3 grid grid-cols-5 sm:h-12">
            <div className="col-span-5 mb-2 h-10 w-24 sm:col-span-1 sm:mb-0 sm:h-full sm:w-auto sm:p-1 sm:pr-2">
              <div className="flex h-full items-center justify-around bg-gray-200/40 text-lg text-gray-700 dark:bg-neutral-900 dark:text-gray-300">
                <button
                  className="flex-center w-full"
                  onClick={decreaseQuantity}>
                  <Minus className={cn("size-4")} />
                </button>
                <span className="flex-center w-full">{quantity}</span>
                <button
                  className="flex-center w-full"
                  onClick={increaseQuantity}>
                  <Plus className={cn("size-4")} />
                </button>
              </div>
            </div>
            <Button
              variant="default"
              className={cn(
                "col-span-5 h-12 rounded-none bg-black text-base text-white/90 shadow-none disabled:opacity-70 sm:col-span-4 sm:h-full",
              )}
              onClick={onAddToCart}
              disabled={isLoading}>
              {isLoading ? <Loader /> : "Add to cart"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-5 h-12 xl:mt-7">
          <p className="text-center text-xl text-red-500">End of inventory</p>
        </div>
      )}

      {/* <div className="mt-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className={cn("text-lg font-medium")}>
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              at consectetur accusamus aspernatur ea nisi repudiandae qui
              nostrum, repellendus modi vero, architecto deleniti, autem
              inventore sunt quas! Odit, minima architecto?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}
    </>
  );
}
