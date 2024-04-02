"use client";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["600"] });

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Minus, Plus } from "lucide-react";
import { Noto_Sans } from "next/font/google";
import Colors from "./Colors";

const inputResetStyles = "w-full border-none bg-transparent outline-none";

export default function AddProductDetails() {
  function deleteValueOnFocus(
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>,
  ) {
    if (event.currentTarget.value === event.currentTarget.defaultValue) {
      event.currentTarget.value = "";
    }
  }

  return (
    <>
      <div className="flex gap-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400">
          <label htmlFor="product-title" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <input
          type="text"
          id="product-title"
          className={cn("text-2xl font-semibold sm:text-3xl", inputResetStyles)}
          defaultValue="Product Name"
          onFocus={deleteValueOnFocus}
          maxLength={33}
        />
      </div>

      <div className="flex items-center gap-x-2 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400">
          <label htmlFor="product-price" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <div
          className={cn(
            "flex items-center text-xl text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          $
          <input
            type="number"
            id="product-price"
            defaultValue="128.2"
            className={cn("ap m-0 appearance-none", inputResetStyles)}
            onFocus={deleteValueOnFocus}
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-600 dark:text-gray-400">
          <label htmlFor="product-description" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <textarea
          rows={3}
          onFocus={deleteValueOnFocus}
          id="product-description"
          defaultValue="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aliquid mollitia deleniti saepe corrupti alias ea est, excepturi facere minus."
          className={cn(
            "resize-none overflow-y-hidden text-gray-700/80 dark:text-gray-300",
            inputResetStyles,
          )}
        />
      </div>

      <Colors />

      <div className="mt-4">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Select Size:
        </span>
        <div className="select-size flex gap-x-2 pt-2">
          <Button
            variant="outline"
            className="size-9 rounded-none text-base text-gray-700 dark:text-gray-300">
            35
          </Button>
          <Button
            variant="outline"
            className="size-9 rounded-none text-base text-gray-700 dark:text-gray-300">
            35
          </Button>
          <Button
            variant="outline"
            className="size-9 rounded-none text-base text-gray-700 dark:text-gray-300">
            35
          </Button>
          <Button
            variant="outline"
            className="size-9 rounded-none text-base text-gray-700 dark:text-gray-300">
            35
          </Button>
        </div>
      </div>

      <div className="mt-5 xl:mt-7">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Quantity
        </span>
        <div className="mt-3 grid grid-cols-5 sm:h-12">
          <div className="col-span-5 mb-2 h-10 w-24 sm:col-span-1 sm:mb-0 sm:h-full sm:w-auto sm:p-1 sm:pr-2">
            <div className="flex h-full items-center justify-around bg-gray-200/40 text-lg text-gray-700 dark:bg-neutral-900 dark:text-gray-300">
              <button className="flex-center w-full">
                <Minus className="size-4" />
              </button>
              <span className="flex-center w-full">1</span>
              <button className="flex-center w-full">
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <Button
            variant="default"
            className="col-span-5 h-12 rounded-none bg-black text-base text-white/90 shadow-none sm:col-span-4 sm:h-full">
            Add to cart
          </Button>
        </div>
      </div>

      <div className="mt-10">
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
      </div>
    </>
  );
}
