"use client";

import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { notoSans } from "@/config/fonts";
import { UseFormRegister } from "react-hook-form";
import Category from "./Category";
import Colors from "./Colors";
import Gender from "./Gender";
import Quantity from "./Quantity";
import Sizes from "./Sizes";

export const inputResetStyles =
  "w-full border-none bg-transparent outline-none";

export default function AddProductDetails({
  formRegister,
}: {
  formRegister: UseFormRegister<{
    title: string;
    description: string;
    price: string;
  }>;
}) {
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
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400">
          <label htmlFor="product-title" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <input
          onFocus={deleteValueOnFocus}
          type="text"
          id="product-title"
          className={cn("text-2xl font-semibold sm:text-3xl", inputResetStyles)}
          defaultValue="Product Name"
          {...formRegister("title")}
          maxLength={33}
        />
      </div>

      <div className="flex items-center gap-x-2 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400">
          <label htmlFor="product-price" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <div
          className={cn(
            "flex font-semibold items-center text-xl text-gray-700 opacity-70 dark:text-gray-300",
            notoSans.className,
          )}>
          $
          <input
            {...formRegister("price")}
            type="number"
            id="product-price"
            defaultValue="100"
            className={cn("ap m-0 appearance-none", inputResetStyles)}
            onFocus={deleteValueOnFocus}
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-600 dark:text-gray-400">
          <label htmlFor="product-description" className="cursor-pointer">
            <Edit />
          </label>
        </Button>
        <textarea
          {...formRegister("description")}
          rows={3}
          onFocus={deleteValueOnFocus}
          defaultValue="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus aliquid mollitia deleniti saepe corrupti alias ea est, excepturi facere minus."
          id="product-description"
          className={cn(
            "resize-none overflow-y-hidden text-gray-700/80 dark:text-gray-300",
            inputResetStyles,
          )}
        />
      </div>

      <Category />

      <Gender />

      <Colors />

      <Sizes />

      <Quantity />

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
