"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Noto_Sans } from "next/font/google";
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@prisma/client";
import Colors from "./(Details)/Colors";
import Sizes from "./(Details)/Sizes";
import { useRef, useState } from "react";

export default function Details({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const selectedColor = useRef(product.colors[0]);
  const selectedSize = useRef(product.sizes[0]);

  function onChangeColor(color: string) {
    selectedColor.current = color;
  }
  function onChangeSize(size: number) {
    selectedSize.current = size;
  }

  function increaseQuantity() {
    if (quantity > product.quantity) {
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

  return (
    <>
      <h1 className="line-clamp-1 text-3xl font-semibold sm:text-4xl">
        {product.title}
      </h1>

      <div className="py-3 xl:py-4">
        <span
          className={cn(
            "text-2xl text-gray-700 opacity-70 dark:text-gray-300",
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

      <div className="mt-5 xl:mt-7">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Quantity
        </span>
        <div className="mt-3 grid grid-cols-5 sm:h-12">
          <div className="col-span-5 mb-2 h-10 w-24 sm:col-span-1 sm:mb-0 sm:h-full sm:w-auto sm:p-1 sm:pr-2">
            <div className="flex h-full items-center justify-around bg-gray-200/40 text-lg text-gray-700 dark:bg-neutral-900 dark:text-gray-300">
              <button className="flex-center w-full" onClick={decreaseQuantity}>
                <Minus className={cn("size-4")} />
              </button>
              <span className="flex-center w-full">{quantity}</span>
              <button className="flex-center w-full" onClick={increaseQuantity}>
                <Plus className={cn("size-4")} />
              </button>
            </div>
          </div>
          <Button
            variant="default"
            className={cn(
              "col-span-5 h-12 rounded-none bg-black text-base text-white/90 shadow-none sm:col-span-4 sm:h-full",
            )}>
            Add to cart
          </Button>
        </div>
      </div>

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
